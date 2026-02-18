/**
 * Input Component
 * 
 * Gold Standard: Accessible form input with proper labeling,
 * error states, and ARIA attributes.
 * 
 * @module components/ui/Input
 */

import React, { forwardRef, useId } from 'react'
import { cn } from '@/lib/utils'
import type { BaseComponentProps, DisableableProps } from '@/types'

// ============================================================================
// TYPES
// ============================================================================

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className' | 'disabled'>,
    BaseComponentProps,
    DisableableProps {
  /** Label text */
  label?: string
  /** Helper text below input */
  helperText?: string
  /** Error message */
  error?: string
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
  /** Icon on the left side */
  leftIcon?: React.ReactNode
  /** Icon on the right side */
  rightIcon?: React.ReactNode
}

// ============================================================================
// STYLES
// ============================================================================

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-4 py-4 text-lg',
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Input component with label, error, and helper text support
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      helperText,
      error,
      size = 'md',
      disabled,
      leftIcon,
      rightIcon,
      className,
      testId,
      id,
      ...props
    },
    ref
  ) {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`
    
    const hasError = Boolean(error)
    
    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium mb-2 text-gray-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={cn(
              error && errorId,
              helperText && !error && helperId
            )}
            data-testid={testId}
            className={cn(
              'w-full rounded-xl bg-gray-900 border',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'placeholder:text-gray-500',
              sizeStyles[size],
              !!leftIcon && 'pl-10',
              !!rightIcon && 'pr-10',
              hasError
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-700 focus:border-blue-500'
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
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

export default Input
