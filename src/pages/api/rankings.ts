/**
 * Rankings API Route
 * 
 * Stores and retrieves AI verification rankings.
 * Note: In-memory storage resets on deploy. Use database for production.
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import type { RankingsResponse, AIRanking, APIError } from '@/types'

// In-memory storage (replace with database in production)
interface RankingData {
  name: string
  checksCount: number
  verified: number
  false: number
  unconfirmed: number
  opinions: number
}

const rankings: Record<string, RankingData> = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RankingsResponse | { success: boolean } | APIError>
) {
  // GET - Retrieve rankings
  if (req.method === 'GET') {
    const list: AIRanking[] = Object.values(rankings)
      .filter((ai) => ai.checksCount > 0)
      .map((ai) => {
        const factualClaims = ai.verified + ai.false + ai.unconfirmed
        const verifiedRate = factualClaims > 0 ? Math.round((ai.verified / factualClaims) * 100) : 0
        const falseRate = factualClaims > 0 ? Math.round((ai.false / factualClaims) * 100) : 0
        const avgScore = verifiedRate - (falseRate * 2)
        
        return {
          name: ai.name,
          checksCount: ai.checksCount,
          verifiedRate,
          falseRate,
          avgScore
        }
      })
      .sort((a, b) => b.avgScore - a.avgScore)

    return res.status(200).json({ rankings: list })
  }

  // POST - Add ranking data
  if (req.method === 'POST') {
    const { aiSource, verified = 0, false: falseCount = 0, unconfirmed = 0, opinions = 0 } = req.body
    
    if (!aiSource || typeof aiSource !== 'string') {
      return res.status(400).json({ error: 'AI source is required' })
    }

    const key = aiSource.trim()
    
    if (!rankings[key]) {
      rankings[key] = {
        name: key,
        checksCount: 0,
        verified: 0,
        false: 0,
        unconfirmed: 0,
        opinions: 0
      }
    }

    rankings[key].checksCount += 1
    rankings[key].verified += Number(verified) || 0
    rankings[key].false += Number(falseCount) || 0
    rankings[key].unconfirmed += Number(unconfirmed) || 0
    rankings[key].opinions += Number(opinions) || 0

    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
