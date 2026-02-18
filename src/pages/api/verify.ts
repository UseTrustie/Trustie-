/**
 * Verify API Route
 * 
 * Gold Standard: Robust verification with proper error handling,
 * source quality assessment, and logging.
 * 
 * FIXES FOR "CAN'T CONFIRM" ISSUE:
 * - More explicit search instructions
 * - Multiple search attempts for hard-to-find facts
 * - Better claim extraction
 * - Emphasis on finding sources, not giving up
 * 
 * @module api/verify
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import type { VerifyResponse, APIError, ClaimResult, VerificationSummary, TrustQuality } from '@/types'

// ============================================================================
// CONSTANTS
// ============================================================================

const HIGH_TRUST = [
  '.edu', '.gov', '.gov.uk', '.gc.ca', '.gov.au',
  'pubmed', 'ncbi.nlm.nih.gov', 'nature.com', 'sciencedirect.com',
  'scholar.google', 'jstor.org', 'springer.com', 'wiley.com',
  'ieee.org', 'acm.org', 'arxiv.org', 'researchgate.net',
  'who.int', 'cdc.gov', 'nih.gov', 'nasa.gov', 'fda.gov',
  'britannica.com', 'wolframalpha.com', 'worldbank.org', 'un.org'
]

const MEDIUM_TRUST = [
  'wikipedia.org', 'wiktionary.org',
  'reuters.com', 'apnews.com', 'afp.com',
  'bbc.com', 'bbc.co.uk', 'npr.org', 'pbs.org',
  'nytimes.com', 'washingtonpost.com', 'theguardian.com', 'wsj.com',
  'ft.com', 'economist.com', 'cnn.com', 'cbsnews.com', 'nbcnews.com',
  'forbes.com', 'bloomberg.com', 'cnbc.com',
  'wired.com', 'arstechnica.com', 'theverge.com',
  'espn.com', 'snopes.com', 'factcheck.org', 'politifact.com'
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getSourceQuality(domain: string): TrustQuality {
  const d = domain.toLowerCase()
  if (HIGH_TRUST.some(t => d.includes(t))) return 'high'
  if (MEDIUM_TRUST.some(t => d.includes(t))) return 'medium'
  return 'low'
}

async function verifyWithClaude(
  content: string, 
  aiSource: string, 
  apiKey: string
): Promise<{ claims: ClaimResult[]; summary: VerificationSummary; message?: string }> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{
        role: 'user',
        content: `You are an expert fact-checker. Your job is to verify factual claims from ${aiSource} output.

TEXT TO VERIFY:
"${content}"

CRITICAL INSTRUCTIONS:
1. Extract EVERY factual claim. Do not skip any. Count them.
2. For each claim, search thoroughly. Use multiple search queries if needed.
3. IMPORTANT: If a claim is about well-known facts (sports records, historical dates, famous people), search Wikipedia or official sources. These should almost NEVER be "unconfirmed".
4. Only mark as "unconfirmed" if you truly cannot find ANY relevant information after multiple searches.
5. Prefer "verified" or "false" over "unconfirmed" whenever possible.

SEARCH TIPS:
- For sports: Search "[team name] [achievement] history" or check Wikipedia
- For dates/years: Search "[event] when year" or "[event] wikipedia"
- For statistics: Search "[statistic] source" or "[statistic] study"
- If first search fails, try rephrasing and search again

For each claim, provide:
- claim: The exact factual statement
- type: "fact" (verifiable) or "opinion" (subjective)
- status: "verified" (sources confirm), "false" (sources contradict), "unconfirmed" (no sources found after thorough search), or "opinion" (not verifiable)
- explanation: WHY you reached this conclusion based on sources
- sources: At least 1-3 sources with url, title, snippet, domain

After ALL searches, respond with ONLY this JSON:
{
  "claims": [
    {
      "claim": "The exact claim text",
      "type": "fact",
      "status": "verified",
      "explanation": "According to [source], this is confirmed because...",
      "sources": [{"url": "https://...", "title": "Source Title", "snippet": "Relevant quote", "domain": "example.com"}],
      "sourceAgreement": 2
    }
  ],
  "summary": {
    "total": 5,
    "verified": 3,
    "false": 1,
    "unconfirmed": 0,
    "opinions": 1
  },
  "overallVerdict": "According to [X] sources, [Y] of [Z] claims are verified. [Summary of key findings]."
}

REMEMBER:
- Extract ALL claims, not just some
- Search thoroughly before marking "unconfirmed"
- Well-known facts (Champions League wins, historical dates, etc.) should be verifiable
- Show your work in the explanation

Return ONLY valid JSON, no other text.`
      }]
    })
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || 'API request failed')
  }

  const data = await response.json()
  
  let text = ''
  if (data.content && Array.isArray(data.content)) {
    for (const block of data.content) {
      if (block?.type === 'text' && block.text) text += block.text
    }
  }
  
  if (!text) {
    return {
      claims: [],
      summary: { total: 0, verified: 0, false: 0, unconfirmed: 0, opinions: 0 },
      message: 'No response from verification system. Please try again.'
    }
  }
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      
      // Add quality to sources
      if (parsed.claims && Array.isArray(parsed.claims)) {
        parsed.claims = parsed.claims.map((claim: ClaimResult) => ({
          ...claim,
          sources: (claim.sources || []).map((s) => ({
            ...s,
            quality: getSourceQuality(s.domain || s.url || '')
          }))
        }))
      }
      
      // Recalculate summary to ensure accuracy
      const claims = parsed.claims || []
      const summary = {
        total: claims.length,
        verified: claims.filter((c: ClaimResult) => c.status === 'verified').length,
        false: claims.filter((c: ClaimResult) => c.status === 'false').length,
        unconfirmed: claims.filter((c: ClaimResult) => c.status === 'unconfirmed').length,
        opinions: claims.filter((c: ClaimResult) => c.status === 'opinion' || c.type === 'opinion').length
      }
      
      return { 
        claims, 
        summary,
        message: parsed.overallVerdict
      }
    }
  } catch (e) {
    console.error('[Verify API] Parse error:', e)
    console.error('[Verify API] Raw text:', text.substring(0, 500))
  }
  
  return {
    claims: [],
    summary: { total: 0, verified: 0, false: 0, unconfirmed: 0, opinions: 0 },
    message: 'Could not parse verification results. Please try again.'
  }
}

async function logToRankings(aiSource: string, summary: VerificationSummary) {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    await fetch(`${baseUrl}/api/rankings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        aiSource,
        verified: summary.verified,
        false: summary.false,
        unconfirmed: summary.unconfirmed,
        opinions: summary.opinions,
        total: summary.total
      })
    })
  } catch (e) {
    console.error('[Verify API] Rankings log failed:', e)
  }
}

// ============================================================================
// HANDLER
// ============================================================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse | APIError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { content, aiSource } = req.body
  
  // Validation
  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ error: 'Content is required' })
  }
  
  if (content.length > 10000) {
    return res.status(400).json({ error: 'Content must be 10,000 characters or less' })
  }
  
  if (!aiSource || typeof aiSource !== 'string' || !aiSource.trim()) {
    return res.status(400).json({ error: 'AI source is required' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('[Verify API] Missing API key')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const { claims, summary, message } = await verifyWithClaude(content.trim(), aiSource.trim(), apiKey)
    
    // Log to rankings if we have results
    if (summary.total > 0) {
      await logToRankings(aiSource.trim(), summary)
    }

    return res.status(200).json({ 
      claims, 
      summary,
      message: claims.length === 0 ? 'No factual claims found to verify.' : message
    })
  } catch (error) {
    console.error('[Verify API] Error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Verification failed' 
    })
  }
}

export const config = { 
  api: { 
    responseLimit: false,
    bodyParser: { sizeLimit: '10mb' }
  } 
}
