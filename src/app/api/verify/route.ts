import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import Anthropic from '@anthropic-ai/sdk';

// ============================================================================
// CONFIG
// ============================================================================

const MODEL = 'claude-sonnet-4-20250514';

// Give the function room for the analysis call + parallel web searches on long
// resumes. (Vercel caps this by plan; extra is harmless.)
export const maxDuration = 60;

// Claude's context window is ~200k tokens; this (~50k tokens) handles a 38-page
// resume. This is OUR cap, not the model's. (Old code rejected anything over 10k.)
const MAX_INPUT_CHARS = 200_000;
const MIN_INPUT_CHARS = 10;

const MAX_CLAIMS_TO_VERIFY = 4;

// Skip the (paid) web layer when the resume is an obvious fake — saves money.
const SKIP_WEB_IF_REJECT_CONFIDENCE = 0.8;

// ============================================================================
// SOURCE TIERING (web layer)
// ============================================================================

const SOURCE_TIERS: Record<string, { tier: number; weight: number; label: string }> = {
  '.gov': { tier: 1, weight: 3, label: 'Government' },
  '.edu': { tier: 1, weight: 3, label: 'Educational' },
  'linkedin.com': { tier: 1, weight: 3, label: 'Professional Network' },
  'credly.com': { tier: 1, weight: 3, label: 'Credential Platform' },
  '.org': { tier: 2, weight: 2, label: 'Organization' },
  'github.com': { tier: 2, weight: 2, label: 'Developer Platform' },
  'bloomberg.com': { tier: 2, weight: 2, label: 'News' },
  'reuters.com': { tier: 2, weight: 2, label: 'News' },
  'nytimes.com': { tier: 2, weight: 2, label: 'News' },
  'wsj.com': { tier: 2, weight: 2, label: 'News' },
  'arxiv.org': { tier: 1, weight: 3, label: 'Academic' },
  'scholar.google': { tier: 1, weight: 3, label: 'Academic' },
  'default': { tier: 3, weight: 1, label: 'Web Source' },
};

function getSourceTier(url: string) {
  const urlLower = url.toLowerCase();
  for (const [domain, info] of Object.entries(SOURCE_TIERS)) {
    if (domain !== 'default' && urlLower.includes(domain)) return info;
  }
  return SOURCE_TIERS['default'];
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// ============================================================================
// HELPERS
// ============================================================================

function extractSourcesFromResponse(content: any[]): { url: string; title: string }[] {
  const sources: { url: string; title: string }[] = [];
  for (const block of content) {
    if (block.type === 'web_search_tool_result' && block.content) {
      for (const result of block.content) {
        if (result.type === 'web_search_result' && result.url) {
          sources.push({ url: result.url, title: result.title || '' });
        }
      }
    }
  }
  return sources;
}

function extractTextFromResponse(content: any[]): string {
  return content
    .filter((block: any) => block.type === 'text')
    .map((block: any) => block.text)
    .join('\n');
}

function normalizeConfidence(value: number): number {
  if (typeof value !== 'number' || isNaN(value)) return 0.5;
  if (value > 1) return value / 100;
  if (value < 0) return 0;
  return value;
}

function cleanInputText(text: string): string {
  return text
    .replace(/[\u200B\u200C\u200D\u200E\u200F\uFEFF\u00AD\u2060\u180E]/g, '')
    .replace(/\u00A0/g, ' ')
    .replace(/[^\x20-\x7E\n\xC0-\xFF]/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/ {2,}/g, ' ')
    .trim();
}

function parseJsonObject(text: string): any | null {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

// Retry a flaky async op (e.g. a model call) on transient failures, with backoff.
async function withRetry<T>(fn: () => Promise<T>, attempts = 3, baseDelayMs = 1500): Promise<T> {
  let lastErr: any;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, baseDelayMs * (i + 1)));
    }
  }
  throw lastErr;
}

// ============================================================================
// STEP 1 — INTERNAL ANALYSIS (the brain). No web search. Reads the WHOLE resume.
// ============================================================================

interface InternalAnalysis {
  verdict: 'PURSUE' | 'INVESTIGATE' | 'REJECT';
  confidence: number;
  recommendation: string;
  red_flags: { title: string; detail: string; severity: string }[];
  green_flags: { title: string; detail: string }[];
  claims_to_verify: { text: string; category: string }[];
}

async function analyzeResume(anthropic: Anthropic, resumeText: string): Promise<InternalAnalysis> {
  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2500,
    messages: [
      {
        role: 'user',
        content: `You are Trustie, a hiring decision-support tool for recruiters. Your job is NOT to make the hiring decision — it is to tell the recruiter which way to lean and exactly why, so a human can decide. Be rigorous, specific, and fair. Quote evidence from the resume for every flag.

Analyze the resume below for both AUTHENTICITY and QUALITY across these dimensions:

1. INTERNAL CONSISTENCY — Do the claims agree with each other? Add up dated roles and compare to the stated years of experience. Check whether tenure claims match the timeline. Flag contradictions (e.g., header says "8+ years" but summary says "7 years"; dated jobs only sum to ~5 years). These are HIGH severity.

2. IDENTITY COHERENCE — Does the candidate's name match their email, GitHub/LinkedIn handles, and any URLs? A name like "Sean Keller" with a GitHub handle "KobenjiSan" is a real red flag. Mismatched digital identity is HIGH severity.

3. AI-GENERATION / TEMPLATING TELLS — Keyword-stuffed skill lists (claiming expert-level mastery of 30+ unrelated technologies), duplicated keywords, generic templated project descriptions with no named products or verifiable metrics, repetitive padded bullets. Usually MEDIUM severity.

4. SPECIFICITY & VERIFIABILITY — Vague boilerplate, inflated unverifiable claims ("saved millions"). Usually LOW–MEDIUM severity.

5. GENUINE STRENGTHS — Identify what is actually impressive and credible. Surface real green flags too; do NOT only hunt for problems.

CALIBRATION:
- Do NOT declare a specific fact "impossible" based on your own knowledge (software versions, recent certs) — your training may be out of date. Put anything needing an external check into "claims_to_verify".
- A long, keyword-heavy resume is NOT automatically fraud. Use INVESTIGATE for "concerning but not conclusive." Reserve REJECT for clear hard signals (e.g., identity mismatch + experience math that doesn't add up).
- Use severity honestly: "high" only for hard fraud signals, "medium" for AI/templating tells, "low" for soft concerns. Be sparing with "high".
- If it's clean and strong, say PURSUE with green flags and few/no red flags.

VERDICTS: PURSUE (worth the recruiter's time) | INVESTIGATE (verify before investing) | REJECT (likely not real/qualified).

Respond with ONLY this JSON, no other text:
{
  "verdict": "PURSUE" | "INVESTIGATE" | "REJECT",
  "confidence": 0.0 to 1.0,
  "recommendation": "one clear sentence telling the recruiter which way to lean and why",
  "red_flags": [{ "title": "short label", "detail": "explanation with a short quote from the resume as evidence", "severity": "high" | "medium" | "low" }],
  "green_flags": [{ "title": "short label", "detail": "what is genuinely strong here" }],
  "claims_to_verify": [{ "text": "the most important factual claim worth checking on the web", "category": "education" | "employment" | "certification" | "achievement" }]
}

At most 4 claims_to_verify — the ones where external confirmation matters most.

RESUME:
${resumeText}`,
      },
    ],
  });

  const text = response.content[0]?.type === 'text' ? response.content[0].text : '';
  const parsed = parseJsonObject(text);

  return {
    verdict: parsed?.verdict === 'PURSUE' || parsed?.verdict === 'REJECT' ? parsed.verdict : 'INVESTIGATE',
    confidence: normalizeConfidence(parsed?.confidence ?? 0.5),
    recommendation: parsed?.recommendation || 'Manual review recommended — automated analysis was inconclusive.',
    red_flags: Array.isArray(parsed?.red_flags) ? parsed.red_flags : [],
    green_flags: Array.isArray(parsed?.green_flags) ? parsed.green_flags : [],
    claims_to_verify: Array.isArray(parsed?.claims_to_verify) ? parsed.claims_to_verify.slice(0, MAX_CLAIMS_TO_VERIFY) : [],
  };
}

// ============================================================================
// STEP 2 — WEB VERIFICATION (secondary layer)
// ============================================================================

async function verifyClaim(anthropic: Anthropic, claim: any, timeoutMs: number = 45000): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const verificationResponse = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1500,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 2 } as any],
      messages: [
        {
          role: 'user',
          content: `You are a fact-verification specialist. Verify this claim by searching the web.

CLAIM: "${claim.text}"
CATEGORY: ${claim.category}

Search for evidence, then respond with ONLY this JSON:
{
  "verdict": "VERIFIED" | "UNVERIFIED" | "PARTIAL" | "UNABLE_TO_VERIFY",
  "confidence": 0.0 to 1.0,
  "evidence": "2-3 sentence explanation",
  "key_findings": ["finding 1", "finding 2"],
  "red_flags": ["any concerns"]
}

GUIDELINES:
- VERIFIED: Credible sources confirm the claimed institution/company/credential is real and matches.
- PARTIAL: Some aspects confirmed but details differ.
- UNVERIFIED: Evidence actively contradicts the claim.
- UNABLE_TO_VERIFY: No public info found. Use sparingly.

If an institution offers the claimed degree or a certification program exists, that supports the claim existing. Don't require finding the specific individual.`,
        },
      ],
    });

    clearTimeout(timeout);

    const webSources = extractSourcesFromResponse(verificationResponse.content);
    const responseText = extractTextFromResponse(verificationResponse.content);

    let result = {
      verdict: 'UNABLE_TO_VERIFY',
      confidence: 0.4,
      evidence: 'Verification completed',
      key_findings: [] as string[],
      red_flags: [] as string[],
    };

    const parsed = parseJsonObject(responseText);
    if (parsed) result = { ...result, ...parsed };
    else result.evidence = responseText.slice(0, 500);

    result.confidence = normalizeConfidence(result.confidence);

    const sources = webSources
      .filter((s, i, arr) => arr.findIndex((x) => x.url === s.url) === i)
      .slice(0, 5)
      .map((s) => {
        const t = getSourceTier(s.url);
        return { url: s.url, title: s.title || getDomain(s.url), tier: t.tier, label: t.label };
      });

    return {
      claim: claim.text,
      category: claim.category,
      verdict: result.verdict,
      confidence: Math.round(result.confidence * 100) / 100,
      evidence: result.evidence,
      key_findings: result.key_findings || [],
      red_flags: result.red_flags || [],
      sources,
    };
  } catch (e: any) {
    clearTimeout(timeout);
    console.error('Verification error:', e?.message);
    return {
      claim: claim.text,
      category: claim.category,
      verdict: 'UNABLE_TO_VERIFY',
      confidence: 0.3,
      evidence: e?.name === 'AbortError'
        ? 'Verification timed out. This claim may require manual review.'
        : 'Could not complete web verification for this claim.',
      key_findings: [],
      red_flags: [],
      sources: [],
    };
  }
}

// ============================================================================
// MAPPING — produce the EXACT shape src/app/app/page.tsx reads.
// summary: { total_claims, verified, unverified, partial, unable_to_verify, confidence }
// claim:   { id, claim, category, verdict, confidence, evidence, key_findings, red_flags, sources[{url,tier,label}] }
// Severity drives verdict so the page's risk engine triages correctly:
//   high   -> UNVERIFIED ("Flagged", red)   => drives High Risk / Do Not Consider
//   medium -> PARTIAL    ("Partial", yellow) => drives Medium Risk / Consider w/ Follow-up
//   low    -> PARTIAL    (yellow)
//   green  -> VERIFIED   ("Confirmed", green) => clean resumes => Low Risk / Strong Consider
// ============================================================================

function redFlagToVerdict(severity: string): { verdict: string; confidence: number } {
  const s = (severity || '').toLowerCase();
  if (s === 'high') return { verdict: 'UNVERIFIED', confidence: 0.9 };
  if (s === 'low') return { verdict: 'PARTIAL', confidence: 0.45 };
  return { verdict: 'PARTIAL', confidence: 0.6 };
}

// Overall "Score" stat = a trust score (high = looks legit), independent of the
// page's count-based risk badge.
function trustScore(verdict: string): number {
  if (verdict === 'PURSUE') return 0.9;
  if (verdict === 'REJECT') return 0.15;
  return 0.5;
}

// ============================================================================
// POST
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 4 });

    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Please sign in to analyze resumes' }, { status: 401 });
    }

    let user;
    try {
      user = await clerkClient.users.getUser(userId);
    } catch (clerkError: any) {
      console.error('Clerk error:', clerkError?.message);
      return NextResponse.json({ error: 'Authentication error. Please sign out and sign in again.' }, { status: 401 });
    }

    const metadata = user.publicMetadata as any;
    const plan = metadata?.plan || 'free';
    const verificationsUsed = metadata?.verificationsUsed || 0;
    const limit = plan === 'business' ? Infinity : plan === 'professional' ? 500 : plan === 'starter' ? 100 : 5;

    if (verificationsUsed >= limit) {
      return NextResponse.json({ error: 'Verification limit reached. Upgrade to continue.', limitReached: true }, { status: 403 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    // The live page sends { text, mode }; accept `content` too for safety.
    const rawInput: string = body?.text ?? body?.content ?? '';

    if (!rawInput || typeof rawInput !== 'string') {
      return NextResponse.json({ error: 'Please paste a resume to analyze.' }, { status: 400 });
    }

    const cleanText = cleanInputText(rawInput);

    if (cleanText.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        { error: `Resume is very long (${cleanText.length.toLocaleString()} characters). Maximum is ${MAX_INPUT_CHARS.toLocaleString()}.` },
        { status: 400 }
      );
    }
    if (cleanText.length < MIN_INPUT_CHARS) {
      return NextResponse.json({ error: 'Text too short. Please paste a full resume.' }, { status: 400 });
    }

    const startTime = Date.now();

    // ---- STEP 1: Internal analysis (cheap, every resume) ----
    let analysis: InternalAnalysis;
    try {
      analysis = await withRetry(() => analyzeResume(anthropic, cleanText));
    } catch (aiError: any) {
      console.error('Internal analysis error:', aiError?.message);
      return NextResponse.json({ error: 'The analysis service is busy right now. Please click Verify again in a moment.' }, { status: 503 });
    }

    // ---- STEP 2: Web verification (skip on confident REJECT to save cost) ----
    let webResults: any[] = [];
    const skipWeb = analysis.verdict === 'REJECT' && analysis.confidence >= SKIP_WEB_IF_REJECT_CONFIDENCE;
    if (!skipWeb && analysis.claims_to_verify.length > 0) {
      const toVerify = analysis.claims_to_verify.slice(0, MAX_CLAIMS_TO_VERIFY);
      webResults = await Promise.all(toVerify.map((c) => verifyClaim(anthropic, c, 45000)));
    }

    // ---- Build claims in the live page's shape ----
    const claims: any[] = [];
    let id = 1;

    for (const f of analysis.red_flags) {
      const { verdict, confidence } = redFlagToVerdict(f.severity);
      claims.push({
        id: id++,
        claim: f.title || 'Red flag',
        category: 'authenticity',
        verdict,
        confidence,
        evidence: f.detail || '',
        key_findings: [],
        red_flags: f.detail ? [f.detail] : [],
        sources: [],
      });
    }

    for (const w of webResults) {
      claims.push({
        id: id++,
        claim: w.claim,
        category: w.category || 'verification',
        verdict: w.verdict,
        confidence: w.confidence,
        evidence: w.evidence,
        key_findings: w.key_findings || [],
        red_flags: w.red_flags || [],
        sources: w.sources || [],
      });
    }

    for (const g of analysis.green_flags) {
      claims.push({
        id: id++,
        claim: g.title || 'Strength',
        category: 'strength',
        verdict: 'VERIFIED',
        confidence: 0.85,
        evidence: g.detail || '',
        key_findings: [],
        red_flags: [],
        sources: [],
      });
    }

    const summary = {
      total_claims: claims.length,
      verified: claims.filter((c) => c.verdict === 'VERIFIED').length,
      unverified: claims.filter((c) => c.verdict === 'UNVERIFIED').length,
      partial: claims.filter((c) => c.verdict === 'PARTIAL').length,
      unable_to_verify: claims.filter((c) => c.verdict === 'UNABLE_TO_VERIFY').length,
      confidence: trustScore(analysis.verdict),
    };

    // Update usage
    try {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { ...metadata, verificationsUsed: verificationsUsed + 1 },
      });
    } catch {
      console.error('Failed to update usage count');
    }

    return NextResponse.json({
      success: true,
      summary,
      claims,
      // Extra fields (ignored by the page, handy for debugging/future UI):
      verdict: analysis.verdict,
      recommendation: analysis.recommendation,
      audit: {
        id: `ver_${Date.now()}`,
        timestamp: new Date().toISOString(),
        processing_time_ms: Date.now() - startTime,
      },
      usage: { used: verificationsUsed + 1, limit: limit === Infinity ? 'unlimited' : limit },
    });
  } catch (error: any) {
    console.error('Verify route error:', error);
    return NextResponse.json({ error: error?.message || 'Verification failed. Please try again.' }, { status: 500 });
  }
}
