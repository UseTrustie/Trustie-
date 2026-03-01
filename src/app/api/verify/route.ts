import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SOURCE_TIERS: Record<string, { tier: number; weight: number; label: string }> = {
  '.gov': { tier: 1, weight: 3, label: 'Government' },
  '.edu': { tier: 1, weight: 3, label: 'Educational' },
  'linkedin.com': { tier: 1, weight: 3, label: 'Professional Network' },
  'credly.com': { tier: 1, weight: 3, label: 'Credential Platform' },
  '.org': { tier: 2, weight: 2, label: 'Organization' },
  'github.com': { tier: 2, weight: 2, label: 'Developer Platform' },
  'bloomberg.com': { tier: 2, weight: 2, label: 'News' },
  'reuters.com': { tier: 2, weight: 2, label: 'News' },
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

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Please sign in to verify claims' }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const metadata = user.publicMetadata as any;
    
    const plan = metadata?.plan || 'free';
    const verificationsUsed = metadata?.verificationsUsed || 0;
    const limit = plan === 'pro' ? Infinity : (plan === 'starter' ? 50 : 5);

    if (verificationsUsed >= limit) {
      return NextResponse.json({ 
        error: 'Verification limit reached. Upgrade to continue.',
        limitReached: true,
      }, { status: 403 });
    }

    const { text, mode = 'resume' } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const extractionResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Extract all verifiable factual claims from this ${mode === 'resume' ? 'resume/CV' : 'text'}. Return ONLY valid JSON:
{
  "claims": [
    { "id": 1, "text": "claim text", "category": "education|employment|certification|achievement|other", "entities": ["entity1"] }
  ]
}
Maximum 10 claims. Skip opinions and soft skills.

TEXT:
${text}`
        }
      ],
    });

    let claims: any[] = [];
    const extractionText = extractionResponse.content[0].type === 'text' ? extractionResponse.content[0].text : '';
    
    try {
      const jsonMatch = extractionText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        claims = JSON.parse(jsonMatch[0]).claims || [];
      }
    } catch (e) {
      claims = [];
    }

    if (claims.length === 0) {
      return NextResponse.json({
        success: true,
        summary: { total_claims: 0, verified: 0, unverified: 0, partial: 0, confidence: 0 },
        claims: [],
        audit: { id: `ver_${Date.now()}`, timestamp: new Date().toISOString(), processing_time_ms: 0 },
        usage: { used: verificationsUsed, limit: limit === Infinity ? 'unlimited' : limit }
      });
    }

    const verifiedClaims = [];
    const startTime = Date.now();

    for (const claim of claims.slice(0, 5)) {
      try {
        const verificationResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages: [
            {
              role: 'user',
              content: `Verify this claim: "${claim.text}"
              
Return ONLY JSON:
{
  "verdict": "VERIFIED|UNVERIFIED|PARTIAL|UNABLE_TO_VERIFY",
  "confidence": 0.0 to 1.0,
  "evidence": "brief explanation",
  "sources": [{"url": "example.com", "snippet": "quote"}]
}`
            }
          ],
        });

        let result = { verdict: 'UNABLE_TO_VERIFY', confidence: 0.5, evidence: 'Could not verify', sources: [] };
        
        for (const block of verificationResponse.content) {
          if (block.type === 'text') {
            try {
              const jsonMatch = block.text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                result = { ...result, ...parsed };
              }
            } catch (e) {}
          }
        }

        verifiedClaims.push({
          id: claim.id,
          claim: claim.text,
          category: claim.category,
          verdict: result.verdict,
          confidence: result.confidence,
          evidence: result.evidence,
          sources: result.sources.map((s: any) => ({
            ...s,
            ...getSourceTier(s.url || ''),
          })),
        });
      } catch (e) {
        verifiedClaims.push({
          id: claim.id,
          claim: claim.text,
          category: claim.category,
          verdict: 'UNABLE_TO_VERIFY',
          confidence: 0.5,
          evidence: 'Error occurred',
          sources: [],
        });
      }
    }

    await clerkClient.users.updateUser(userId, {
      publicMetadata: { ...metadata, verificationsUsed: verificationsUsed + 1 }
    });

    const summary = {
      total_claims: verifiedClaims.length,
      verified: verifiedClaims.filter(c => c.verdict === 'VERIFIED').length,
      unverified: verifiedClaims.filter(c => c.verdict === 'UNVERIFIED').length,
      partial: verifiedClaims.filter(c => c.verdict === 'PARTIAL').length,
      confidence: verifiedClaims.reduce((sum, c) => sum + c.confidence, 0) / verifiedClaims.length,
    };

    return NextResponse.json({
      success: true,
      summary,
      claims: verifiedClaims,
      audit: { id: `ver_${Date.now()}`, timestamp: new Date().toISOString(), processing_time_ms: Date.now() - startTime },
      usage: { used: verificationsUsed + 1, limit: limit === Infinity ? 'unlimited' : limit },
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Verification failed' }, { status: 500 });
  }
}
