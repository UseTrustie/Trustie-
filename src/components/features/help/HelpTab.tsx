/**
 * Help Tab Component
 * 
 * Documentation and guidance for using Trustie.
 */

import React from 'react'
import { Card } from '@/components/ui'

export function HelpTab() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">How Trustie Works</h2>
        <p className="text-gray-400">
          Verify AI-generated content against trusted sources in seconds.
        </p>
      </div>
      
      {/* Search Help */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <span className="text-xl">🔍</span> Search
        </h3>
        <p className="text-gray-300 mb-3">
          Ask any question and get an answer backed by trusted sources. We search the web
          and prioritize high-quality sources like .edu, .gov, and peer-reviewed journals.
        </p>
        <div className="bg-gray-900 rounded-lg p-3 text-sm">
          <p className="text-gray-400 mb-1">Example queries:</p>
          <ul className="text-gray-300 space-y-1">
            <li>• What year was the first iPhone released?</li>
            <li>• How many planets are in our solar system?</li>
            <li>• What is the capital of Australia?</li>
          </ul>
        </div>
      </Card>
      
      {/* Check AI Help */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <span className="text-xl">✓</span> Check AI
        </h3>
        <p className="text-gray-300 mb-3">
          Paste AI-generated text to verify each factual claim. We extract claims,
          search for evidence, and tell you what is verified, false, or unconfirmed.
        </p>
        <div className="bg-gray-900 rounded-lg p-3 text-sm">
          <p className="text-gray-400 mb-2">How we classify claims:</p>
          <ul className="text-gray-300 space-y-2">
            <li><span className="text-emerald-400">✓ Verified</span> — Multiple trusted sources confirm this claim</li>
            <li><span className="text-red-400">✗ False</span> — Trusted sources contradict this claim</li>
            <li><span className="text-amber-400">? Unconfirmed</span> — Could not find sufficient evidence</li>
            <li><span className="text-blue-400">○ Opinion</span> — Not a factual claim</li>
          </ul>
        </div>
      </Card>
      
      {/* Trust Levels */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <span className="text-xl">📊</span> Source Trust Levels
        </h3>
        <div className="space-y-3">
          <div>
            <span className="inline-block px-2 py-1 bg-emerald-900/50 text-emerald-300 text-xs rounded mb-1">
              High Trust
            </span>
            <p className="text-gray-300 text-sm">
              .edu, .gov, peer-reviewed journals, official government sites, CDC, NIH, NASA
            </p>
          </div>
          <div>
            <span className="inline-block px-2 py-1 bg-amber-900/50 text-amber-300 text-xs rounded mb-1">
              Medium Trust
            </span>
            <p className="text-gray-300 text-sm">
              Wikipedia, major news outlets (Reuters, AP, BBC, NYT), established publications
            </p>
          </div>
          <div>
            <span className="inline-block px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded mb-1">
              Verify Manually
            </span>
            <p className="text-gray-300 text-sm">
              Other sources — may still be accurate but require additional verification
            </p>
          </div>
        </div>
      </Card>
      
      {/* Tips */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
          <span className="text-xl">💡</span> Pro Tips
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Use &ldquo;Make It Your Own&rdquo; to rephrase verified content in your own words while keeping facts intact.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Check specific claims that include dates, numbers, or statistics — these are most prone to AI hallucinations.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Multiple sources agreeing increases reliability — look for the &ldquo;sources agree&rdquo; indicator.</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span>Even &ldquo;verified&rdquo; claims should be double-checked for critical decisions.</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default HelpTab
