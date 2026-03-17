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
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: `You are a claim extraction engine for a ${mode === 'resume' ? 'resume/CV verification' : 'fact-checking'} tool.

Extract all verifiable factual claims from this text. Focus on claims that can be checked against public information:

- Education: degrees, institutions, graduation years, honors
- Employment: companies, job titles, dates, responsibilities
- Certifications: credential names, issuing bodies, dates
- Achievements: publications, speaking engagements, awards, open source contributions
- Quantitative claims: numbers, statistics, metrics

Return ONLY valid JSON with no other text:
{
  "claims": [
    {
      "id": 1,
      "text": "the exact claim to verify",
      "category": "education|employment|certification|achievement|quantitative",
      "search_queries": ["suggested search query 1", "suggested search query 2"]
    }
  ]
}

Maximum 8 claims. Prioritize the most important and verifiable ones. Skip opinions, soft skills, and vague statements.

TEXT TO ANALYZE:
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

    // STEP 2: Verify claims WITH web search
    const verifiedClaims = [];

    for (const claim of claims.slice(0, 5)) {
      try {
        const verificationResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          tools: [
            {
              type: "web_search_20250305",
              name: "web_search",
              max_uses: 3,
            } as any
          ],
          messages: [
            {
              role: 'user',
              content: `You are a fact-verification specialist. Your job is to verify the following claim by searching the web for evidence.

CLAIM TO VERIFY: "${claim.text}"
CATEGORY: ${claim.category}

INSTRUCTIONS:
1. Search the web to find evidence that supports or contradicts this claim.
2. Check multiple sources when possible.
3. For education claims: verify the institution exists, offers that program, and the graduation year is plausible.
4. For employment claims: verify the company exists, the role title is plausible, and check LinkedIn or company pages if possible.
5. For certifications: verify the certification program exists and is offered by the stated organization.
6. For achievements: search for the specific publication, conference talk, or contribution.
7. For quantitative claims: verify the numbers against official sources.

After searching, provide your verdict as ONLY valid JSON with no other text:
{
  "verdict": "VERIFIED|UNVERIFIED|PARTIAL|UNABLE_TO_VERIFY",
  "confidence": 0.0 to 1.0,
  "evidence": "2-3 sentence explanation of what you found and why you reached this verdict",
  "key_findings": ["finding 1", "finding 2"],
  "red_flags": ["any concerns or inconsistencies found"],
  "sources_checked": ["source name or url 1", "source name or url 2"]
}

VERDICT GUIDELINES:
- VERIFIED (0.8-1.0 confidence): Multiple credible sources confirm the claim, or official records support it.
- PARTIAL (0.5-0.7 confidence): Some aspects confirmed but details differ (e.g., different dates, different title).
- UNVERIFIED (0.7-1.0 confidence): Evidence contradicts the claim (e.g., person not listed, dates wrong, credential doesn't exist).
- UNABLE_TO_VERIFY (0.3-0.5 confidence): No public information found either way. This should be RARE — most claims about real institutions and companies will have some searchable evidence.

IMPORTANT: Do NOT default to UNABLE_TO_VERIFY. If Stanford has a CS program and awards B.S. degrees, that's evidence supporting a Stanford CS claim. If AWS Solutions Architect Professional is a real certification, that supports the certification claim. Use the web to check these things.`
            }
          ],
        });

        // Extract sources from web search results
        const webSources = extractSourcesFromResponse(verificationResponse.content);
        const responseText = extractTextFromResponse(verificationResponse.content);

        // Parse the JSON verdict from the response
        let result = {
          verdict: 'UNABLE_TO_VERIFY',
          confidence: 0.4,
          evidence: 'Verification in progress',
          key_findings: [] as string[],
          red_flags: [] as string[],
          sources_checked: [] as string[],
        };

        try {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            result = { ...result, ...parsed };
          }
        } catch (e) {
          // If we can't parse JSON, use the text response as evidence
          result.evidence = responseText.slice(0, 500);
        }

        // Combine web search sources with any sources mentioned in the response
        const allSources = webSources.map((s) => ({
          ...s,
          ...getSourceTier(s.url),
        }));

        verifiedClaims.push({
          id: claim.id,
          claim: claim.text,
          category: claim.category,
          verdict: result.verdict,
          confidence: Math.round(result.confidence * 100) / 100,
          evidence: result.evidence,
          key_findings: result.key_findings || [],
          red_flags: result.red_flags || [],
          sources: allSources.length > 0 ? allSources : (result.sources_checked || []).map((s: string) => ({
            url: s.startsWith('http') ? s : '',
            title: s,
            snippet: '',
            ...getSourceTier(s),
          })),
        });
      } catch (e: any) {
        console.error(`Verification error for claim ${claim.id}:`, e.message);
        verifiedClaims.push({
          id: claim.id,
          claim: claim.text,
          category: claim.category,
          verdict: 'UNABLE_TO_VERIFY',
          confidence: 0.3,
          evidence: 'An error occurred during verification. Please try again.',
          key_findings: [],
          red_flags: [],
          sources: [],
        });
      }
    }

    // Update usage count
    try {
      await clerkClient.users.updateUser(userId, {
        publicMetadata: { ...metadata, verificationsUsed: verificationsUsed + 1 }
      });
    } catch (e) {
      console.error('Failed to update usage count');
    }

    const summary = {
      total_claims: verifiedClaims.length,
      verified: verifiedClaims.filter(c => c.verdict === 'VERIFIED').length,
      unverified: verifiedClaims.filter(c => c.verdict === 'UNVERIFIED').length,
      partial: verifiedClaims.filter(c => c.verdict === 'PARTIAL').length,
      unable_to_verify: verifiedClaims.filter(c => c.verdict === 'UNABLE_TO_VERIFY').length,
      confidence: Math.round((verifiedClaims.reduce((sum, c) => sum + c.confidence, 0) / verifiedClaims.length) * 100),
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
