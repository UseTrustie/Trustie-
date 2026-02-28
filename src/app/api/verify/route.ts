import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// ============================================================================
// TRUSTIE VERIFICATION ENGINE v2.0
// Uses Claude API with web search for multi-source verification
// ============================================================================

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Source quality tiers
const SOURCE_TIERS: Record<string, { tier: number; weight: number; label: string }> = {
  // Tier 1: Highest trust (3x weight)
  '.gov': { tier: 1, weight: 3, label: 'Government' },
  '.edu': { tier: 1, weight: 3, label: 'Educational' },
  'linkedin.com': { tier: 1, weight: 3, label: 'Professional Network' },
  'credly.com': { tier: 1, weight: 3, label: 'Credential Platform' },
  
  // Tier 2: Medium trust (2x weight)
  '.org': { tier: 2, weight: 2, label: 'Organization' },
  'github.com': { tier: 2, weight: 2, label: 'Developer Platform' },
  'bloomberg.com': { tier: 2, weight: 2, label: 'News' },
  'reuters.com': { tier: 2, weight: 2, label: 'News' },
  'wsj.com': { tier: 2, weight: 2, label: 'News' },
  'nytimes.com': { tier: 2, weight: 2, label: 'News' },
  
  // Tier 3: Lower trust (1x weight)
  'wikipedia.org': { tier: 3, weight: 1, label: 'Encyclopedia' },
  'medium.com': { tier: 3, weight: 1, label: 'Blog Platform' },
  'default': { tier: 3, weight: 1, label: 'Web Source' },
};

function getSourceTier(url: string): { tier: number; weight: number; label: string } {
  const urlLower = url.toLowerCase();
  for (const [domain, info] of Object.entries(SOURCE_TIERS)) {
    if (domain !== 'default' && urlLower.includes(domain)) {
      return info;
    }
  }
  return SOURCE_TIERS['default'];
}

function isCommercialBias(url: string, claim: string): boolean {
  const commercialIndicators = [
    'resumebuilder', 'resume-builder', 'resumegenius', 'zety.com',
    'indeed.com/career', 'glassdoor.com/blog', 'theladders.com',
    'sponsored', 'affiliate', 'partner'
  ];
  const urlLower = url.toLowerCase();
  return commercialIndicators.some(indicator => urlLower.includes(indicator));
}

export async function POST(request: NextRequest) {
  try {
    const { text, mode = 'resume' } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    if (text.length > 50000) {
      return NextResponse.json({ error: 'Text too long. Maximum 50,000 characters.' }, { status: 400 });
    }

    // Step 1: Extract verifiable claims
    const extractionResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `You are a claim extraction expert. Extract all verifiable factual claims from this ${mode === 'resume' ? 'resume/CV' : 'text'}.

For each claim, identify:
1. The exact claim being made
2. The category (education, employment, certification, achievement, skill, other)
3. Key entities to verify (names, companies, institutions, dates)

Return ONLY valid JSON in this exact format:
{
  "claims": [
    {
      "id": 1,
      "text": "The exact claim text",
      "category": "education|employment|certification|achievement|skill|other",
      "entities": ["entity1", "entity2"],
      "verifiable": true
    }
  ]
}

Rules:
- Only extract factual, verifiable claims (not opinions or soft skills)
- Include employment history, education, certifications, specific achievements
- Skip generic statements like "team player" or "hard worker"
- Maximum 15 most important claims
- If no verifiable claims found, return {"claims": []}

TEXT TO ANALYZE:
${text}`
        }
      ],
    });

    let claims: any[] = [];
    const extractionText = extractionResponse.content[0].type === 'text' 
      ? extractionResponse.content[0].text 
      : '';
    
    try {
      // Extract JSON from response
      const jsonMatch = extractionText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        claims = parsed.claims || [];
      }
    } catch (e) {
      console.error('Failed to parse claims:', e);
      claims = [];
    }

    if (claims.length === 0) {
      return NextResponse.json({
        success: true,
        summary: {
          total_claims: 0,
          verified: 0,
          unverified: 0,
          partial: 0,
          confidence: 0,
        },
        claims: [],
        audit: {
          id: `ver_${Date.now()}`,
          timestamp: new Date().toISOString(),
          processing_time_ms: 0,
        }
      });
    }

    // Step 2: Verify each claim with web search
    const verifiedClaims = [];
    const startTime = Date.now();

    for (const claim of claims.slice(0, 10)) { // Limit to 10 claims per request
      try {
        const verificationResponse = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          tools: [
            {
              type: 'web_search_20250305',
              name: 'web_search',
            }
          ],
          messages: [
            {
              role: 'user',
              content: `Verify this claim by searching for evidence:

CLAIM: "${claim.text}"
CATEGORY: ${claim.category}
ENTITIES TO CHECK: ${claim.entities.join(', ')}

Instructions:
1. Search for authoritative sources that can confirm or deny this claim
2. Prioritize .edu, .gov, LinkedIn, and official company sources
3. Look for specific evidence (dates, titles, degrees, certifications)
4. Note any discrepancies between the claim and what sources say

After searching, respond with ONLY this JSON:
{
  "verdict": "VERIFIED|UNVERIFIED|PARTIAL|UNABLE_TO_VERIFY",
  "confidence": 0.0 to 1.0,
  "evidence": "Brief explanation of what you found",
  "discrepancies": "Any differences from the claim, or null",
  "sources": [
    {"url": "source url", "snippet": "relevant quote"}
  ]
}`
            }
          ],
        });

        // Parse verification response
        let verificationResult = {
          verdict: 'UNABLE_TO_VERIFY',
          confidence: 0.5,
          evidence: 'Could not verify',
          discrepancies: null,
          sources: [] as any[],
        };

        // Extract text content from response
        for (const block of verificationResponse.content) {
          if (block.type === 'text') {
            try {
              const jsonMatch = block.text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                verificationResult = {
                  verdict: parsed.verdict || 'UNABLE_TO_VERIFY',
                  confidence: parsed.confidence || 0.5,
                  evidence: parsed.evidence || 'No evidence found',
                  discrepancies: parsed.discrepancies || null,
                  sources: parsed.sources || [],
                };
              }
            } catch (e) {
              // Keep default values
            }
          }
        }

        // Process sources with tier information
        const processedSources = verificationResult.sources.map((source: any) => {
          const tierInfo = getSourceTier(source.url || '');
          const hasCommercialBias = isCommercialBias(source.url || '', claim.text);
          return {
            url: source.url,
            snippet: source.snippet,
            tier: tierInfo.tier,
            tier_label: tierInfo.label,
            weight: hasCommercialBias ? tierInfo.weight * 0.5 : tierInfo.weight,
            commercial_bias: hasCommercialBias,
          };
        });

        verifiedClaims.push({
          id: claim.id,
          claim: claim.text,
          category: claim.category,
          verdict: verificationResult.verdict,
          confidence: verificationResult.confidence,
          evidence: verificationResult.evidence,
          discrepancies: verificationResult.discrepancies,
          sources: processedSources,
        });

      } catch (e) {
        console.error('Error verifying claim:', e);
        verifiedClaims.push({
          id: claim.id,
          claim: claim.text,
          category: claim.category,
          verdict: 'UNABLE_TO_VERIFY',
          confidence: 0.5,
          evidence: 'Verification error occurred',
          discrepancies: null,
          sources: [],
        });
      }
    }

    // Calculate summary statistics
    const summary = {
      total_claims: verifiedClaims.length,
      verified: verifiedClaims.filter(c => c.verdict === 'VERIFIED').length,
      unverified: verifiedClaims.filter(c => c.verdict === 'UNVERIFIED').length,
      partial: verifiedClaims.filter(c => c.verdict === 'PARTIAL').length,
      unable_to_verify: verifiedClaims.filter(c => c.verdict === 'UNABLE_TO_VERIFY').length,
      confidence: verifiedClaims.length > 0 
        ? Math.round((verifiedClaims.reduce((sum, c) => sum + c.confidence, 0) / verifiedClaims.length) * 100) / 100
        : 0,
    };

    const processingTime = Date.now() - startTime;

    // Build audit trail
    const audit = {
      id: `ver_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      processing_time_ms: processingTime,
      model: 'claude-sonnet-4-20250514',
      mode: mode,
      claims_extracted: claims.length,
      claims_verified: verifiedClaims.length,
    };

    return NextResponse.json({
      success: true,
      summary,
      claims: verifiedClaims,
      audit,
    });

  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
