/**
 * Feedback Tab Component
 * 
 * Comprehensive feedback collection for improving Trustie.
 * Includes categorized feedback, feature requests, and bug reports.
 */

import React, { useState } from 'react'
import { Card, Button, Textarea, Input } from '@/components/ui'
import { validateFeedback, validateEmail } from '@/lib/validation'
import { cn } from '@/lib/utils'

type FeedbackCategory = 'general' | 'feature' | 'bug' | 'accuracy' | 'other'

interface FeedbackForm {
  category: FeedbackCategory
  message: string
  email: string
  rating: number | null
}

const CATEGORIES: { id: FeedbackCategory; label: string; icon: string }[] = [
  { id: 'general', label: 'General Feedback', icon: '💭' },
  { id: 'feature', label: 'Feature Request', icon: '✨' },
  { id: 'bug', label: 'Report a Bug', icon: '🐛' },
  { id: 'accuracy', label: 'Accuracy Issue', icon: '🎯' },
  { id: 'other', label: 'Other', icon: '📝' },
]

const RATINGS = [
  { value: 1, emoji: '😢', label: 'Very Unhappy' },
  { value: 2, emoji: '😕', label: 'Unhappy' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '🙂', label: 'Happy' },
  { value: 5, emoji: '😍', label: 'Love It!' },
]

export function FeedbackTab() {
  const [form, setForm] = useState<FeedbackForm>({
    category: 'general',
    message: '',
    email: '',
    rating: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Validate message
    const messageResult = validateFeedback(form.message)
    if (!messageResult.success) {
      setError(messageResult.error.message)
      return
    }
    
    // Validate email if provided
    if (form.email.trim()) {
      const emailResult = validateEmail(form.email)
      if (!emailResult.success) {
        setError(emailResult.error.message)
        return
      }
    }
    
    // Log feedback (replace with API call in production)
    console.log('Feedback submitted:', {
      ...form,
      timestamp: new Date().toISOString(),
    })
    
    setSubmitted(true)
  }
  
  const resetForm = () => {
    setForm({ category: 'general', message: '', email: '', rating: null })
    setSubmitted(false)
    setError(null)
  }
  
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Thank You!</h2>
          <p className="text-gray-400 mb-6">
            Your feedback helps us make Trustie better for everyone.
          </p>
          <Button variant="primary" onClick={resetForm}>
            Submit More Feedback
          </Button>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-100 mb-2">Share Your Feedback</h2>
        <p className="text-gray-400">
          Help us build the most reliable AI verification tool in the world.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <Card>
          <h3 className="font-semibold text-gray-100 mb-4">
            How would you rate your experience with Trustie?
          </h3>
          <div className="flex justify-center gap-4">
            {RATINGS.map(({ value, emoji, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, rating: value })}
                className={cn(
                  'flex flex-col items-center p-3 rounded-lg transition-all',
                  form.rating === value
                    ? 'bg-blue-600 text-white scale-110'
                    : 'bg-gray-700 hover:bg-gray-600'
                )}
                aria-label={label}
              >
                <span className="text-3xl">{emoji}</span>
                <span className="text-xs mt-1">{label}</span>
              </button>
            ))}
          </div>
        </Card>
        
        {/* Category */}
        <Card>
          <h3 className="font-semibold text-gray-100 mb-4">
            What type of feedback do you have?
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setForm({ ...form, category: id })}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm transition-all',
                  form.category === id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                )}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </Card>
        
        {/* Message */}
        <Card>
          <Textarea
            label="Your Feedback"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={
              form.category === 'feature'
                ? 'Describe the feature you would like to see...'
                : form.category === 'bug'
                ? 'Describe what happened and what you expected...'
                : form.category === 'accuracy'
                ? 'Describe the inaccurate result and the correct information...'
                : 'Share your thoughts with us...'
            }
            rows={6}
            error={error ?? undefined}
          />
        </Card>
        
        {/* Email (Optional) */}
        <Card>
          <Input
            type="email"
            label="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            helperText="If you would like us to follow up with you"
          />
        </Card>
        
        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={!form.message.trim()}
          size="lg"
        >
          Submit Feedback
        </Button>
      </form>
      
      {/* Additional Options */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <h3 className="font-semibold text-blue-300 mb-3">Other Ways to Help</h3>
        <ul className="text-gray-300 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span>⭐</span>
            <span>Rate us 5 stars if Trustie has helped you verify information</span>
          </li>
          <li className="flex items-start gap-2">
            <span>📢</span>
            <span>Tell a friend or colleague about Trustie</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🐦</span>
            <span>Share your experience on social media</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}

export default FeedbackTab
