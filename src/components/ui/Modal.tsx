/**
 * Modal Component
 * 
 * Gold Standard: Accessible dialog with focus management,
 * keyboard navigation, and proper ARIA attributes.
 * 
 * @module components/ui/Modal
 */

import React, { useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { BaseComponentProps } from '@/types'

// ============================================================================
// TYPES
// ============================================================================

interface ModalProps extends BaseComponentProps {
  /** Whether modal is open */
  isOpen: boolean
  /** Close handler */
  onClose: () => void
  /** Modal title */
  title: string
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean
  /** Children content */
  children: React.ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Modal dialog component with accessibility support
 */
export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  className,
  testId,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)
  
  // Store previously focused element
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement
    }
  }, [isOpen])
  
  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return
    
    const modal = modalRef.current
    if (!modal) return
    
    // Focus first focusable element
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    firstElement?.focus()
    
    // Handle keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      
      // Focus trap
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    // Prevent body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      
      // Restore focus
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus()
      }
    }
  }, [isOpen, onClose])
  
  // Handle overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        onClose()
      }
    },
    [closeOnOverlayClick, onClose]
  )
  
  if (!isOpen) return null
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        data-testid={testId}
        className={cn(
          'relative w-full bg-gray-800 rounded-2xl shadow-2xl',
          'max-h-[80vh] overflow-y-auto',
          sizeStyles[size],
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 id="modal-title" className="text-xl font-bold text-gray-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl leading-none p-1"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal
