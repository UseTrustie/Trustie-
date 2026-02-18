/**
 * Feedback Box Component
 * 
 * Collects user feedback throughout the app.
 */

import React, { useState } from 'react'
import { Button, Textarea } from '@/components/ui'
import { validateFeedback } from '@/lib/validation'

export function FeedbackBox() {
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = validateFeedback(feedback)
    if (!result.success) {
      setError(result.error.message)
      return
    }
    
    // Log feedback (replace with API call in production)
    console.log('Feedback submitted:', result.data)
    setSubmitted(true)
    setFeedback('')
    setError(null)
    
    setTimeout(() => setSubmitted(false), 3000)
  }
  
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <h4 className="font-medium text-gray-100 mb-2">Share Feedback</h4>
      {submitted ? (
        <p className="text-emerald-400 text-sm">
          ✓ Thank you for your feedback!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How can we improve Trustie?"
            rows={3}
            error={error ?? undefined}
          />
          <Button
            type="submit"
            variant="secondary"
            size="sm"
            disabled={!feedback.trim()}
          >
            Send Feedback
          </Button>
        </form>
      )}
    </div>
  )
}

export default FeedbackBox
