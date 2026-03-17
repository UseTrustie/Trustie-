import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import Anthropic from '@anthropic-ai/sdk';

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
    if (domain !== 'default' && urlLower.includes(domain)) {
      return info;
    }
  }
  return SOURCE_TIERS['default'];
}

function extractSourcesFromResponse(content: any[]): { url: string; title: string; snippet: string }[] {
  const sources: { url: string; title: string; snippet: string }[] = [];
  for (const block of content) {
    if (block.type === 'web_search_tool_result' && block.content) {
      for (const result of block.content) {
        if (result.type === 'web_search_result' && result.url) {
          sources.push({
            url: result.url,
            title: result.title || '',
            snippet: '',
          });
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

// Normalize confidence to 0-1 range (Claude sometimes returns 0-100 instead of 0-1)
function normalizeConfidence(value: number): number {
  if (value > 1) return value / 100;
  return value;
}

// Verify a single claim with timeout
async function verifyClaim(
  anthropic: Anthropic,
  claim: any,
  timeoutMs: number = 45000
): Promise<any> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const verificationResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 2,
        } as any
      ],
      messages: [
        {
          role: 'user',
          content: `You are a fact-verification specialist. Verify this claim by searching the web.

CLAIM: "${claim.text}"
CATEGORY: ${claim.category}

Search for evidence, then respond with ONLY this JSON:
{
  "verdict": "VERIFIED|UNVERIFIED|PARTIAL|UNABLE_TO_VERIFY",
  "confidence": 0.0 to 1.0,
  "evidence": "2-3 sentence explanation",
  "key_findings": ["finding 1", "finding 2"],
  "red_flags": ["any concerns"]
}

GUIDELINES:
- VERIFIED (0.7-0.95): Credible sources confirm the claim exists (institution, program, certification is real and matches).
- PARTIAL (0.4-0.7): Some aspects confirmed but details differ (wrong dates, different title, etc).
- UNVERIFIED (0.7-0.95): Evidence actively contradicts the claim.
- UNABLE_TO_VERIFY (0.3-0.5): Truly no public info found. Use sparingly — most real institutions/companies/certs are searchable.

If an institution offers the claimed degree, or a certification program exists, that supports the claim. Don't require finding the specific individual.`
        }
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

    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        result = { ...result, ...parsed };
      }
    } catch (e) {
      result.evidence = responseText.slice(0, 500);
    }

    // Normalize confidence to 0-1 range
    result.confidence = normalizeConfidence(result.confidence);

    const allSources = webSources.map((s) => ({
      ...s,
      ...getSourceTier(s.url),
    }));

    // Deduplicate sources by URL
    const uniqueSources = allSources.filter((s, i, arr) =>
      arr.findIndex(x => x.url === s.url) === i
    ).slice(0, 8); // Max 8 sources per claim

    return {
      id: claim.id,
      claim: claim.text,
      category: claim.category,
      verdict: result.verdict,
      confidence: Math.round(result.confidence * 100) / 100,
      evidence: result.evidence,
      key_findings: result.key_findings || [],
      red_flags: result.red_flags || [],
      sources: uniqueSources,
    };
  } catch (e: any) {
    clearTimeout(timeout);
    console.error(`Verification error for claim ${claim.id}:`, e.message);
    return {
      id: claim.id,
      claim: claim.text,
      category: claim.category,
      verdict: 'UNABLE_TO_VERIFY',
      confidence: 0.3,
      evidence: e.name === 'AbortError'
        ? 'Verification timed out. This claim may require manual review.'
        : 'An error occurred during verification. Please try again.',
      key_findings: [],
      red_flags: [],
      sources: [],
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json({ error: 'Server configuration error. Please contact support.' }, { status: 500 });
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Please sign in to verify claims' }, { status: 401 });
    }

    let user;
    try {
      user = await clerkClient.users.getUser(userId);
    } catch (clerkError: any) {
      console.error('Clerk error:', clerkError.message);
      return NextResponse.json({ error: 'Authentication error. Please sign out and sign in again.' }, { status: 401 });
    }

    const metadata = user.publicMetadata as any;
    const plan = metadata?.plan || 'free';
    const verificationsUsed = metadata?.verificationsUsed || 0;
    const limit = plan === 'business' ? Infinity : (plan === 'professional' ? 500 : (plan === 'starter' ? 100 : 5));

    if (verificationsUsed >= limit) {
      return NextResponse.json({
        error: 'Verification limit reached. Upgrade to continue.',
        limitReached: true,
      }, { status: 403 });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { text, mode = 'resume' } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > 10000) {
      return NextResponse.json({ error: 'Text too long. Maximum 10,000 characters.' }, { status: 400 });
    }

    const startTime = Date.now();

    // STEP 1: Extract claims (no web search needed)
    let claims: any[] = [];
    try {
      const extractionResponse = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: `Extract all verifiable factual claims from this ${mode === 'resume' ? 'resume/CV' : 'text'}. Return ONLY valid JSON:
{
  "claims": [
    { "id": 1, "text": "claim text", "category": "education|employment|certification|achievement|quantitative" }
  ]
}
Maximum 6 claims. Prioritize the most important and verifiable. Skip opinions and soft skills.

TEXT:
${text}`
          }
        ],
      });

      const extractionText = extractionResponse.content[0].type === 'text' ? extractionResponse.content[0].text : '';

      try {
        const jsonMatch = extractionText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          claims = JSON.parse(jsonMatch[0]).claims || [];
        }
      } catch (e) {
        console.error('Failed to parse extraction response:', e);
        claims = [];
      }
    } catch (aiError: any) {
      console.error('Anthropic extraction error:', aiError.message);
      return NextResponse.json({ error: 'AI service temporarily unavailable. Please try again.' }, { status: 503 });
    }

    if (claims.length === 0) {
      return NextResponse.json({
        success: true,
        summary: { total_claims: 0, verified: 0, unverified: 0, partial: 0, unable_to_verify: 0, confidence: 0 },
        claims: [],
        audit: { id: `ver_${Date.now()}`, timestamp: new Date().toISOString(), processing_time_ms: 0 },
        usage: { used: verificationsUsed, limit: limit === Infinity ? 'unlimited' : limit }
      });
    }

    // STEP 2: Verify ALL claims in PARALLEL (not one at a time)
    const claimsToVerify = claims.slice(0, 5);
    const verificationPromises = claimsToVerify.map(claim =>
      verifyClaim(anthropic, claim, 45000)
    );

    const verifiedClaims = await Promise.all(verificationPromises);

    // Update usage count
    try {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { ...metadata, verificationsUsed: verificationsUsed + 1 }
      });
    } catch (e) {
      console.error('Failed to update usage count');
    }

    const validClaims = verifiedClaims.filter(c => c.confidence > 0);
    const avgConfidence = validClaims.length > 0
      ? Math.round((validClaims.reduce((sum, c) => sum + c.confidence, 0) / validClaims.length) * 100)
      : 0;

    const summary = {
      total_claims: verifiedClaims.length,
      verified: verifiedClaims.filter(c => c.verdict === 'VERIFIED').length,
      unverified: verifiedClaims.filter(c => c.verdict === 'UNVERIFIED').length,
      partial: verifiedClaims.filter(c => c.verdict === 'PARTIAL').length,
      unable_to_verify: verifiedClaims.filter(c => c.verdict === 'UNABLE_TO_VERIFY').length,
      confidence: avgConfidence / 100,
    };

    return NextResponse.json({
      success: true,
      summary,
      claims: verifiedClaims,
      audit: {
        id: `ver_${Date.now()}`,
        timestamp: new Date().toISOString(),
        processing_time_ms: Date.now() - startTime,
        model: 'claude-sonnet-4-20250514',
        web_search_enabled: true,
      },
      usage: { used: verificationsUsed + 1, limit: limit === Infinity ? 'unlimited' : limit },
    });

  } catch (error: any) {
    console.error('Verify route error:', error);
    return NextResponse.json({ error: error.message || 'Verification failed. Please try again.' }, { status: 500 });
  }
}
