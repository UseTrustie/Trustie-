/**
 * Button Component
 * 
 * Gold Standard: Fully accessible, composable, and type-safe.
 * Supports multiple variants, sizes, and states.
 * 
 * @module components/ui/Button
 */

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { BaseComponentProps, DisableableProps, LoadableProps } from '@/types'

// ============================================================================
// TYPES
// ============================================================================

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled'>,
    BaseComponentProps,
    DisableableProps,
    LoadableProps {
  /** Visual style variant */
  variant?: ButtonVariant
  /** Button size */
  size?: ButtonSize
  /** Full width button */
  fullWidth?: boolean
  /** Icon to show before text */
  leftIcon?: React.ReactNode
  /** Icon to show after text */
  rightIcon?: React.ReactNode
  /** Children elements */
  children: React.ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const baseStyles = `
  inline-flex items-center justify-center
  font-medium rounded-xl
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  disabled:cursor-not-allowed disabled:opacity-50
`

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-gray-700 text-gray-100 hover:bg-gray-600 border border-gray-600',
  ghost: 'bg-transparent hover:bg-gray-700/50 text-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      children,
      testId,
      ...props
    },
    ref
  ) {
    const isDisabled = disabled || loading
    
    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        data-testid={testId}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size={size} />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

// ============================================================================
// LOADING SPINNER
// ============================================================================

interface LoadingSpinnerProps {
  size: ButtonSize
}

function LoadingSpinner({ size }: LoadingSpinnerProps) {
  const sizeClass = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size]
  
  return (
    <svg
      className={cn(sizeClass, 'animate-spin')}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default Button
