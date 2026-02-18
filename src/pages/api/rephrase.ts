/**
 * Rephrase API Route
 * 
 * Rephrases text while preserving all factual content.
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import type { RephraseResponse, APIError } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RephraseResponse | APIError>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { text } = req.body
  
  if (!text || typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' })
  }
  
  if (text.length > 5000) {
    return res.status(400).json({ error: 'Text must be 5,000 characters or less' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Rewrite this text in different words while keeping ALL the same facts:

"${text.trim()}"

RULES:
1. Keep ALL facts exactly the same
2. Change sentence structure and word choices
3. Use professional language
4. Keep approximately the same length

Return ONLY the rewritten text.`
        }]
      })
    })

    if (!response.ok) throw new Error('API request failed')

    const data = await response.json()
    
    let rephrased = ''
    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) {
        if (block?.type === 'text' && block.text) rephrased += block.text
      }
    }
    
    if (!rephrased) throw new Error('No response generated')

    return res.status(200).json({ rephrased: rephrased.trim() })
  } catch (error) {
    console.error('[Rephrase API] Error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Rephrase failed' 
    })
  }
}
