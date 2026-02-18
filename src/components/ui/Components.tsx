/**
 * Additional UI Components
 * 
 * Card, Badge, Textarea - reusable building blocks
 * 
 * @module components/ui
 */

import React, { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'
import type { BaseComponentProps, TrustQuality, ClaimStatus } from '@/types'
import { TRUST_COLORS, TRUST_LABELS } from '@/lib/constants'

// ============================================================================
// CARD COMPONENT
// ============================================================================

interface CardProps extends BaseComponentProps {
  children: React.ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  onClick?: () => void
}

export function Card({
  children,
  padding = 'md',
  hoverable = false,
  onClick,
  className,
  testId,
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }
  
  return (
    <div
      data-testid={testId}
      onClick={onClick}
      className={cn(
        'bg-gray-800 border border-gray-700 rounded-xl',
        paddingStyles[padding],
        hoverable && 'hover:border-blue-500/50 transition-colors cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================================================
// BADGE COMPONENT
// ============================================================================

interface BadgeProps extends BaseComponentProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
  testId,
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-700 text-gray-300',
    success: 'bg-emerald-900/50 text-emerald-300',
    warning: 'bg-amber-900/50 text-amber-300',
    danger: 'bg-red-900/50 text-red-300',
    info: 'bg-blue-900/50 text-blue-300',
  }
  
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }
  
  return (
    <span
      data-testid={testId}
      className={cn(
        'inline-flex items-center rounded font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  )
}

// ============================================================================
// TRUST BADGE COMPONENT
// ============================================================================

interface TrustBadgeProps extends BaseComponentProps {
  quality: TrustQuality
}

export function TrustBadge({ quality, className, testId }: TrustBadgeProps) {
  const colors = TRUST_COLORS[quality]
  const label = TRUST_LABELS[quality]
  
  return (
    <span
      data-testid={testId}
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        colors.bg,
        colors.text,
        className
      )}
    >
      {label}
    </span>
  )
}

// ============================================================================
// STATUS BADGE COMPONENT
// ============================================================================

interface StatusBadgeProps extends BaseComponentProps {
  status: ClaimStatus
}

export function StatusBadge({ status, className, testId }: StatusBadgeProps) {
  const config = {
    verified: { icon: '✓', label: 'Verified', variant: 'success' as const },
    false: { icon: '✗', label: 'False', variant: 'danger' as const },
    unconfirmed: { icon: '?', label: 'Unconfirmed', variant: 'warning' as const },
    opinion: { icon: '○', label: 'Opinion', variant: 'info' as const },
  }
  
  const { icon, label, variant } = config[status]
  
  return (
    <Badge variant={variant} className={className} testId={testId}>
      <span className="mr-1">{icon}</span>
      {label}
    </Badge>
  )
}

// ============================================================================
// TEXTAREA COMPONENT
// ============================================================================

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'className'>,
    BaseComponentProps {
  label?: string
  helperText?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      helperText,
      error,
      disabled,
      className,
      testId,
      id,
      ...props
    },
    ref
  ) {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const errorId = `${textareaId}-error`
    const helperId = `${textareaId}-helper`
    
    const hasError = Boolean(error)
    
    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={cn(
            error && errorId,
            helperText && !error && helperId
          )}
          data-testid={testId}
          className={cn(
            'w-full px-4 py-3 rounded-xl bg-gray-900 border',
            'transition-colors duration-200 resize-none',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'placeholder:text-gray-500',
            hasError
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-700 focus:border-blue-500'
          )}
          {...props}
        />
        
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

// ============================================================================
// LOADING SPINNER COMPONENT
// ============================================================================

interface SpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg'
}

export function Spinner({ size = 'md', className, testId }: SpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }
  
  return (
    <div
      data-testid={testId}
      className={cn(
        sizeStyles[size],
        'border-3 border-blue-500 border-t-transparent rounded-full animate-spin',
        className
      )}
      role="status"
      aria-label="Loading"
    />
  )
}

// ============================================================================
// TABS COMPONENT
// ============================================================================

interface Tab {
  id: string
  label: string
  ariaLabel?: string
}

interface TabsProps extends BaseComponentProps {
  tabs: readonly Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onTabChange, className, testId }: TabsProps) {
  return (
    <div
      role="tablist"
      data-testid={testId}
      className={cn(
        'flex gap-1 p-1 bg-gray-800 rounded-xl border border-gray-700',
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          aria-label={tab.ariaLabel}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all',
            activeTab === tab.id
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
              : 'text-gray-400 hover:text-blue-400 hover:bg-blue-500/10'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// ERROR BOUNDARY
// ============================================================================

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <Card padding="lg" className="text-center">
            <p className="text-red-400 mb-2">Something went wrong</p>
            <p className="text-gray-500 text-sm">
              Please refresh the page and try again
            </p>
          </Card>
        )
      )
    }
    
    return this.props.children
  }
}
