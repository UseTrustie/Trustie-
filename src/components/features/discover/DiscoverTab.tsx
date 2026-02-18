/**
 * Discover Tab Component
 * 
 * Browse AIs by category to find the best one for your needs.
 */

import React from 'react'
import { Card } from '@/components/ui'
import { AI_CATEGORIES } from '@/lib/constants'

export function DiscoverTab() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-100 mb-2">Discover AIs by Category</h2>
        <p className="text-gray-400">
          Find the best AI for your specific needs. Rankings update as users verify more content.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {AI_CATEGORIES.map((category) => (
          <Card
            key={category.name}
            hoverable
            className="transition-all hover:border-blue-500/50"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{category.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-100 mb-1">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.ais.map((ai, i) => (
                    <span
                      key={ai}
                      className={`px-2 py-1 text-xs rounded ${
                        i === 0
                          ? 'bg-emerald-900/50 text-emerald-300'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {i === 0 && '🏆 '}
                      {ai}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Card className="text-center bg-blue-900/20 border-blue-500/30">
        <p className="text-blue-300">
          💡 Rankings are based on user verifications. More verifications = more accurate rankings.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Use the Check AI tab to verify content and contribute to rankings.
        </p>
      </Card>
    </div>
  )
}

export default DiscoverTab
