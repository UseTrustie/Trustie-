/**
 * Search API Route
 * 
 * Gold Standard: Proper error handling, input validation,
 * structured logging, and type safety.
 * 
 * @module api/search
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import type { SearchResponse, APIError, Source, RawSource, TrustQuality } from '@/types'

// ============================================================================
// CONSTANTS
// ============================================================================

const HIGH_TRUST_DOMAINS = [
  '.edu', '.gov', 'pubmed', 'nature.com', 'sciencedirect',
  'scholar.google', 'who.int', 'cdc.gov', 'nih.gov', 'nasa.gov', 'britannica.com'
]

const MEDIUM_TRUST_DOMAINS = [
  'wikipedia.org', 'reuters.com', 'apnews.com', 'bbc.com', 'bbc.co.uk',
  'npr.org', 'pbs.org', 'nytimes.com', 'washingtonpost.com', 'theguardian.com',
  'wsj.com', 'cnn.com', 'cbsnews.com', 'nbcnews.com', 'abcnews.com',
  'espn.com', 'forbes.com', 'bloomberg.com'
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getSourceQuality(domain: string): TrustQuality {
  const domainLower = domain.toLowerCase()
  if (HIGH_TRUST_DOMAINS.some(t => domainLower.includes(t))) return 'high'
  if (MEDIUM_TRUST_DOMAINS.some(t => domainLower.includes(t))) return 'medium'
  return 'low'
}

function sortSourcesByQuality(sources: Source[]): Source[] {
  const order: Record<TrustQuality, number> = { high: 0, medium: 1, low: 2 }
  return sources.sort((a, b) => order[a.quality] - order[b.quality])
}

function calculateTrustScore(sources: Source[], agreementCount: number): number {
  if (sources.length === 0) return 0
  
  let score = 50
  const highQuality = sources.filter(s => s.quality === 'high').length
  const mediumQuality = sources.filter(s => s.quality === 'medium').length
  
  score += highQuality * 15
  score += mediumQuality * 8
  
  if (agreementCount >= 3) score += 20
  else if (agreementCount >= 2) score += 10
  
  if (highQuality === 0 && mediumQuality === 0) score -= 20
  
  return Math.max(0, Math.min(100, score))
}

function generateWarnings(sources: Source[], answer: string): string[] {
  const warnings: string[] = []
  const highQuality = sources.filter(s => s.quality === 'high').length
  
  if (highQuality === 0) {
    warnings.push('No high-trust sources (.edu, .gov, peer-reviewed) found. Consider verifying with additional sources.')
  }
  
  if (sources.length < 2) {
    warnings.push('Limited sources available. Cross-reference with additional searches.')
  }
  
  const hedging = ['may', 'might', 'could', 'possibly', 'reportedly', 'allegedly']
  if (hedging.some(w => answer.toLowerCase().includes(w))) {
    warnings.push('This topic contains uncertainty. Multiple perspectives may exist.')
  }
  
  return warnings
}

async function searchWithClaude(query: string, apiKey: string): Promise<{
  answer: string
  sources: Source[]
  agreementCount: number
}> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{
        role: 'user',
        content: `Search for accurate, factual information about: "${query}"

INSTRUCTIONS:
1. Search multiple sources for the most accurate answer
2. Prioritize .edu, .gov, and peer-reviewed sources over Wikipedia
3. Note if sources agree or disagree
4. Be factual and clear

After searching, respond with ONLY this JSON:
{
  "answer": "Your answer based on sources. Use professional language. Be clear and helpful.",
  "sources": [
    {"url": "URL", "title": "Title", "snippet": "Relevant quote", "domain": "domain.com"}
  ],
  "agreementCount": number
}

Return ONLY valid JSON.`
      }]
    })
  })

  if (!response.ok) {
    throw new Error('Search API request failed')
  }

  const data = await response.json()
  
  let text = ''
  if (data.content && Array.isArray(data.content)) {
    for (const block of data.content) {
      if (block?.type === 'text' && block.text) {
        text += block.text
      }
    }
  }
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      
      const sourcesWithQuality: Source[] = (parsed.sources || []).map((s: RawSource) => ({
        ...s,
        quality: getSourceQuality(s.domain || s.url || '')
      }))
      
      return {
        answer: parsed.answer || 'Unable to find a clear answer.',
        sources: sourcesWithQuality,
        agreementCount: parsed.agreementCount || sourcesWithQuality.length
      }
    }
  } catch (e) {
    console.error('[Search API] Parse error:', e)
  }
  
  return {
    answer: text || 'Unable to process search. Please try again.',
    sources: [],
    agreementCount: 0
  }
}

// ============================================================================
// HANDLER
// ============================================================================

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse | APIError>
) {
  // Method check
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Input validation
  const { query } = req.body
  
  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Search query is required' })
  }
  
  if (query.length > 500) {
    return res.status(400).json({ error: 'Query must be 500 characters or less' })
  }

  // API key check
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('[Search API] Missing API key')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const { answer, sources, agreementCount } = await searchWithClaude(query.trim(), apiKey)
    const sortedSources = sortSourcesByQuality(sources)
    const trustScore = calculateTrustScore(sources, agreementCount)
    const warnings = generateWarnings(sources, answer)
    
    return res.status(200).json({
      query: query.trim(),
      answer,
      trustScore,
      sources: sortedSources.slice(0, 5),
      sourceAgreement: agreementCount,
      warnings
    })
  } catch (error) {
    console.error('[Search API] Error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Search failed' 
    })
  }
}

export const config = { 
  api: { 
    responseLimit: false,
    bodyParser: { sizeLimit: '1mb' }
  } 
}
