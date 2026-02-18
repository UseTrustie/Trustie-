/**
 * Verify Tab Component
 * 
 * Check AI-generated content for factual accuracy.
 * Shows summary at top per Alex Herrera's feedback.
 */

import React from 'react'
import { useVerify, useCopyToClipboard, useRephrase, useTextToSpeech, useProfessionalMode } from '@/hooks'
import { Button, Card, StatusBadge, TrustBadge, Spinner, Textarea } from '@/components/ui'
import { POPULAR_AIS } from '@/lib/constants'
import { cn, truncate } from '@/lib/utils'
import type { ClaimResult, Source } from '@/types'

export function VerifyTab() {
  const {
    content,
    setContent,
    aiSource,
    setAiSource,
    customAiSource,
    setCustomAiSource,
    result,
    isLoading,
    error,
    currentStep,
    elapsedTime,
    currentFact,
    verify,
    reset,
  } = useVerify()
  
  const { copied, copy } = useCopyToClipboard()
  const { isSupported: ttsSupported, isSpeaking, speak, stop } = useTextToSpeech()
  const { transform: professionalTransform } = useProfessionalMode()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await verify()
  }
  
  // Generate verdict summary (Alex's feedback: summary at top)
  const getVerdictSummary = (): { text: string; type: 'success' | 'warning' | 'danger' } => {
    if (!result || result.claims.length === 0) {
      return { text: '', type: 'warning' }
    }
    
    const { summary } = result
    const totalVerifiable = summary.verified + summary.false + summary.unconfirmed
    
    if (totalVerifiable === 0) {
      return { text: 'This text contains only opinions or non-verifiable statements.', type: 'warning' }
    }
    
    const verifiedPercent = Math.round((summary.verified / totalVerifiable) * 100)
    const falsePercent = Math.round((summary.false / totalVerifiable) * 100)
    
    if (summary.false > 0) {
      return {
        text: `⚠️ Found ${summary.false} false claim${summary.false > 1 ? 's' : ''}. ${verifiedPercent}% of verifiable claims are accurate.`,
        type: 'danger'
      }
    }
    
    if (summary.unconfirmed > summary.verified) {
      return {
        text: `Unable to verify ${summary.unconfirmed} claim${summary.unconfirmed > 1 ? 's' : ''}. Consider rephrasing or checking original sources.`,
        type: 'warning'
      }
    }
    
    return {
      text: `✓ ${summary.verified} of ${totalVerifiable} claims verified by trusted sources.`,
      type: 'success'
    }
  }
  
  const getSummaryText = (): string => {
    if (!result) return ''
    const { summary } = result
    const parts: string[] = []
    
    if (summary.verified > 0) parts.push(`${summary.verified} Verified`)
    if (summary.false > 0) parts.push(`${summary.false} False`)
    if (summary.unconfirmed > 0) parts.push(`${summary.unconfirmed} Unconfirmed`)
    if (summary.opinions > 0) parts.push(`${summary.opinions} Opinions`)
    
    if (parts.length === 0) return 'No factual claims found.'
    return `Checked ${summary.total} claims: ${parts.join(', ')}`
  }
  
  const handleCopyResults = () => {
    if (!result) return
    const verdict = getVerdictSummary()
    let text = `Trustie Verification Results for ${aiSource || 'AI Output'}\n\n`
    text += verdict.text + '\n\n'
    text += getSummaryText() + '\n\n'
    result.claims.forEach((claim, i) => {
      text += `${i + 1}. [${claim.status.toUpperCase()}] ${claim.claim}\n`
      text += `   ${professionalTransform(claim.explanation)}\n\n`
    })
    copy(text)
  }
  
  const handleReadResults = () => {
    if (isSpeaking) {
      stop()
      return
    }
    if (!result) return
    
    const verdict = getVerdictSummary()
    let speech = `Verification results for ${aiSource}. ${verdict.text}. `
    result.claims.forEach((claim, i) => {
      speech += `Claim ${i + 1}: ${claim.claim}. Status: ${claim.status}. ${claim.explanation}. `
    })
    speak(speech)
  }
  
  return (
    <div className="space-y-6">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* AI Source Selector */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Which AI generated this output?
          </label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_AIS.map((ai) => (
              <button
                key={ai}
                type="button"
                onClick={() => setAiSource(ai)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm transition-all',
                  aiSource === ai
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                )}
              >
                {ai}
              </button>
            ))}
          </div>
          
          {aiSource === 'Other' && (
            <input
              type="text"
              value={customAiSource}
              onChange={(e) => setCustomAiSource(e.target.value)}
              placeholder="Enter AI name..."
              className="mt-2 w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
        
        {/* Content Input */}
        <Textarea
          label="Paste AI output to verify"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste the AI-generated text you want to fact-check..."
          rows={8}
          disabled={isLoading}
        />
        
        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          disabled={!content.trim() || (!aiSource || (aiSource === 'Other' && !customAiSource.trim()))}
        >
          Verify Claims
        </Button>
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
          {/* Verdict Banner (Alex's feedback: summary at top) */}
          {result.claims.length > 0 && (
            <Card className={cn(
              'border-l-4',
              getVerdictSummary().type === 'success' && 'border-l-emerald-500 bg-emerald-900/20',
              getVerdictSummary().type === 'warning' && 'border-l-amber-500 bg-amber-900/20',
              getVerdictSummary().type === 'danger' && 'border-l-red-500 bg-red-900/20'
            )}>
              <p className={cn(
                'text-lg font-medium',
                getVerdictSummary().type === 'success' && 'text-emerald-300',
                getVerdictSummary().type === 'warning' && 'text-amber-300',
                getVerdictSummary().type === 'danger' && 'text-red-300'
              )}>
                {getVerdictSummary().text}
              </p>
              {result.message && (
                <p className="text-gray-400 text-sm mt-2">{result.message}</p>
              )}
            </Card>
          )}
          
          {/* Summary Card */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg text-gray-100">Verification Details</h3>
              <div className="flex gap-2">
                {ttsSupported && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReadResults}
                    leftIcon={<span>{isSpeaking ? '⏹' : '🔊'}</span>}
                  >
                    {isSpeaking ? 'Stop' : 'Read'}
                  </Button>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCopyResults}
                  leftIcon={<span>{copied ? '✓' : '📋'}</span>}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            
            <p className="text-gray-300 mb-4">{getSummaryText()}</p>
            
            {/* Summary Stats */}
            <div className="flex gap-4 flex-wrap">
              <StatBadge label="Verified" count={result.summary.verified} color="emerald" />
              <StatBadge label="False" count={result.summary.false} color="red" />
              <StatBadge label="Unconfirmed" count={result.summary.unconfirmed} color="amber" />
              <StatBadge label="Opinions" count={result.summary.opinions} color="blue" />
            </div>
          </Card>
          
          {/* Claims List */}
          {result.claims.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-100">Claims Analyzed</h3>
              {result.claims.map((claim, i) => (
                <ClaimCard key={i} claim={claim} />
              ))}
            </div>
          )}
          
          {/* No Claims */}
          {result.claims.length === 0 && (
            <Card className="text-center py-8">
              <p className="text-gray-400">
                {result.message || 'No verifiable factual claims were found in this text.'}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Tip: Try text with specific dates, numbers, or factual statements.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

function StatBadge({ label, count, color }: { label: string; count: number; color: string }) {
  const colorStyles: Record<string, string> = {
    emerald: 'bg-emerald-900/50 text-emerald-300',
    red: 'bg-red-900/50 text-red-300',
    amber: 'bg-amber-900/50 text-amber-300',
    blue: 'bg-blue-900/50 text-blue-300',
  }
  
  return (
    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', colorStyles[color])}>
      {count} {label}
    </span>
  )
}

function ClaimCard({ claim }: { claim: ClaimResult }) {
  const borderColors: Record<string, string> = {
    verified: 'border-l-emerald-500',
    false: 'border-l-red-500',
    unconfirmed: 'border-l-amber-500',
    opinion: 'border-l-blue-500',
  }
  
  return (
    <Card className={cn('border-l-4', borderColors[claim.status])}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-gray-100 font-medium flex-1">&ldquo;{claim.claim}&rdquo;</p>
        <StatusBadge status={claim.status} />
      </div>
      
      <p className="text-gray-400 text-sm mb-3">{claim.explanation}</p>
      
      {claim.sources.length > 0 && (
        <div className="pt-3 border-t border-gray-700">
          <p className="text-gray-500 text-xs mb-2">Sources:</p>
          <div className="space-y-2">
            {claim.sources.slice(0, 3).map((source, i) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <TrustBadge quality={source.quality} />
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline truncate"
                >
                  {truncate(source.title, 60)}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default VerifyTab
