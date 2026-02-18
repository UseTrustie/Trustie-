/**
 * Email Capture Popup
 */

import React, { useState } from 'react'
import { Modal, Button, Input } from '@/components/ui'
import { validateEmail } from '@/lib/validation'

interface EmailPopupProps {
  isOpen: boolean
  onSubmit: (email: string) => void
  onDismiss: () => void
}

export function EmailPopup({ isOpen, onSubmit, onDismiss }: EmailPopupProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = validateEmail(email)
    if (!result.success) {
      setError(result.error.message)
      return
    }
    
    onSubmit(result.data)
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onDismiss}
      title="Stay Updated"
      size="sm"
      closeOnOverlayClick={false}
    >
      <p className="text-gray-300 mb-4">
        Get notified about new features and improvements to Trustie.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          error={error ?? undefined}
          autoFocus
        />
        
        <div className="flex gap-2">
          <Button type="submit" variant="primary" fullWidth>
            Subscribe
          </Button>
          <Button type="button" variant="ghost" onClick={onDismiss}>
            Later
          </Button>
        </div>
      </form>
      
      <p className="text-gray-500 text-xs mt-3 text-center">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </Modal>
  )
}

export default EmailPopup
