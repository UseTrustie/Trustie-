/**
 * Rankings Sidebar Component
 * 
 * Displays AI trustworthiness rankings based on user verifications.
 */

import React from 'react'
import { useRankings } from '@/hooks'
import { Card, Spinner } from '@/components/ui'
import { cn, formatPercentage } from '@/lib/utils'

export function RankingsSidebar() {
  const { rankings, isLoading, error, refresh } = useRankings()
  
  // Show top 5 or fewer
  const topRankings = rankings.slice(0, 5)
  
  return (
    <Card className="h-fit sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-100">🏆 Most Trusted AIs</h3>
        <button
          onClick={refresh}
          className="text-gray-400 hover:text-gray-200 text-sm"
          aria-label="Refresh rankings"
        >
          ↻
        </button>
      </div>
      
      {isLoading && rankings.length === 0 ? (
        <div className="flex justify-center py-4">
          <Spinner size="sm" />
        </div>
      ) : error && rankings.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          Unable to load rankings
        </p>
      ) : topRankings.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm mb-2">No rankings yet</p>
          <p className="text-gray-500 text-xs">
            Use Check AI to verify content and contribute to rankings
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {topRankings.map((ai, i) => (
            <RankingItem key={ai.name} rank={i + 1} ai={ai} />
          ))}
        </div>
      )}
      
      {topRankings.length > 0 && (
        <p className="text-gray-500 text-xs mt-4 pt-3 border-t border-gray-700">
          Rankings based on {rankings.reduce((sum, ai) => sum + ai.checksCount, 0)} verifications
        </p>
      )}
    </Card>
  )
}

interface RankingItemProps {
  rank: number
  ai: {
    name: string
    checksCount: number
    verifiedRate: number
    falseRate: number
    avgScore: number
  }
}

function RankingItem({ rank, ai }: RankingItemProps) {
  const medals = ['🥇', '🥈', '🥉']
  const medal = medals[rank - 1]
  
  return (
    <div className={cn(
      'flex items-center gap-3 p-2 rounded-lg',
      rank === 1 && 'bg-amber-900/20'
    )}>
      <span className="text-lg w-6 text-center">
        {medal || rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-100 truncate">{ai.name}</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-400">{formatPercentage(ai.verifiedRate)}</span>
          {ai.falseRate > 0 && (
            <span className="text-red-400">{formatPercentage(ai.falseRate)} false</span>
          )}
        </div>
      </div>
      <span className="text-gray-500 text-xs">{ai.checksCount} checks</span>
    </div>
  )
}

export default RankingsSidebar
