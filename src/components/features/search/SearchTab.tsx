/**
 * Search Tab Component
 * 
 * Gold Standard: Clean separation of concerns.
 * Uses custom hooks for logic, UI components for presentation.
 * 
 * Combines Google's accuracy with DuckDuckGo's transparency.
 */

import React from 'react'
import { useSearch, useCopyToClipboard, useRephrase, useTextToSpeech, useProfessionalMode, useQueryType } from '@/hooks'
import { Button, Card, TrustBadge, Spinner, Textarea } from '@/components/ui'
import { cn, formatPercentage, truncate } from '@/lib/utils'
import type { Source } from '@/types'

export function SearchTab() {
  const {
    query,
    setQuery,
    result,
    isLoading,
    error,
    currentStep,
    elapsedTime,
    currentFact,
    search,
    reset,
  } = useSearch()
  
  const { copied, copy } = useCopyToClipboard()
  const { rephrased, isLoading: isRephrasing, rephrase, reset: resetRephrase } = useRephrase()
  const { isSupported: ttsSupported, isSpeaking, speak, stop } = useTextToSpeech()
  const { transform: professionalTransform } = useProfessionalMode()
  const queryType = useQueryType(query)
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    await search()
  }
  
  const getDisplayAnswer = () => {
    const answer = rephrased || result?.answer || ''
    return professionalTransform(answer)
  }
  
  const handleCopy = () => {
    copy(getDisplayAnswer())
  }
  
  const handleRephrase = () => {
    if (result?.answer) {
      rephrase(result.answer)
    }
  }
  
  const handleReadAloud = () => {
    if (isSpeaking) {
      stop()
    } else {
      speak(getDisplayAnswer())
    }
  }
  
  // Query type specific warnings
  const getQueryTypeWarning = () => {
    switch (queryType) {
      case 'medical':
        return '⚕️ Medical information should not replace professional medical advice.'
      case 'legal':
        return '⚖️ Legal information should not replace professional legal advice.'
      case 'financial':
        return '💰 Financial information should not replace professional financial advice.'
      default:
        return null
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... e.g., 'What year was the iPhone released?'"
            className="flex-1 px-4 py-4 text-lg bg-gray-900 border border-gray-700 rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       disabled:opacity-50 placeholder:text-gray-500"
            disabled={isLoading}
            aria-label="Search query"
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={!query.trim()}
          >
            Search
          </Button>
        </div>
        
        {/* Query Type Indicator */}
        {query.trim() && queryType !== 'general' && (
          <p className="text-gray-500 text-xs mt-2">
            Detected: {queryType.charAt(0).toUpperCase() + queryType.slice(1)} query — using specialized verification
          </p>
        )}
      </form>
      
      {/* Loading State */}
      {isLoading && (
        <Card className="text-center">
          <Spinner size="lg" className="mx-auto mb-4" />
          <p className="text-blue-400 font-medium mb-2">{currentStep}</p>
          <p className="text-gray-500 text-sm mb-3">{elapsedTime}s elapsed</p>
          <p className="text-gray-400 text-sm italic">{currentFact}</p>
        </Card>
      )}
      
      {/* Error State */}
      {error && (
        <Card className="border-red-500/50">
          <p className="text-red-400">{error}</p>
          <Button variant="ghost" size="sm" onClick={reset} className="mt-2">
            Try again
          </Button>
        </Card>
      )}
      
      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-4">
          {/* Query Type Warning */}
          {getQueryTypeWarning() && (
            <Card className="bg-amber-900/20 border-amber-500/30">
              <p className="text-amber-300 text-sm">{getQueryTypeWarning()}</p>
            </Card>
          )}
          
          {/* Answer Card */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg text-gray-100">Answer</h3>
              <div className="flex items-center gap-2">
                <span className={cn(
                  'px-3 py-1 rounded-full text-sm font-medium',
                  result.trustScore >= 70 ? 'bg-emerald-900/50 text-emerald-300' :
                  result.trustScore >= 40 ? 'bg-amber-900/50 text-amber-300' :
                  'bg-red-900/50 text-red-300'
                )}>
                  {formatPercentage(result.trustScore)} Trust Score
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-4">
              {getDisplayAnswer()}
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                leftIcon={<span>{copied ? '✓' : '📋'}</span>}
              >
                {copied ? 'Copied!' : 'Copy Result'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRephrase}
                loading={isRephrasing}
                disabled={isRephrasing}
                leftIcon={<span>✨</span>}
              >
                Make It Your Own
              </Button>
              {rephrased && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetRephrase}
                >
                  ↺ Original
                </Button>
              )}
              {ttsSupported && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReadAloud}
                  leftIcon={<span>{isSpeaking ? '⏹' : '🔊'}</span>}
                >
                  {isSpeaking ? 'Stop' : 'Read Aloud'}
                </Button>
              )}
            </div>
            
            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                {result.warnings.map((warning, i) => (
                  <p key={i} className="text-amber-400 text-sm flex items-start gap-2">
                    <span>⚠️</span>
                    <span>{warning}</span>
                  </p>
                ))}
              </div>
            )}
          </Card>
          
          {/* Sources */}
          {result.sources.length > 0 && (
            <Card>
              <h3 className="font-semibold text-gray-100 mb-3">
                Sources ({result.sources.length})
                {result.sourceAgreement >= 2 && (
                  <span className="text-emerald-400 text-sm ml-2">
                    ✓ {result.sourceAgreement} sources agree
                  </span>
                )}
              </h3>
              
              <ul className="space-y-3">
                {result.sources.map((source, i) => (
                  <SourceItem key={i} source={source} />
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
      
      {/* Empty State */}
      {!result && !isLoading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Ask any question and get an answer verified by trusted sources.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Sources include .edu, .gov, peer-reviewed journals, and reputable news outlets.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              'What year was the iPhone released?',
              'How many planets are in our solar system?',
              'Who invented the internet?',
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-3 py-1 text-sm bg-gray-800 text-gray-400 rounded-full hover:bg-gray-700 hover:text-gray-300 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SourceItem({ source }: { source: Source }) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <TrustBadge quality={source.quality} />
      <div className="flex-1 min-w-0">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline font-medium block truncate"
        >
          {source.title}
        </a>
        <p className="text-gray-400 text-xs mt-1">
          {truncate(source.snippet, 150)}
        </p>
        <p className="text-gray-600 text-xs">{source.domain}</p>
      </div>
    </li>
  )
}

export default SearchTab
