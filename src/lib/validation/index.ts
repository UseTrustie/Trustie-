/**
 * Validation and Sanitization Library
 * 
 * Gold Standard: Security-first approach. All user input MUST be validated
 * and sanitized before use. Prevents XSS, injection attacks, and data corruption.
 * 
 * @module validation
 */

import { INPUT_LIMITS } from '@/lib/constants'
import type { Result } from '@/types'
import { success, failure } from '@/types'

// ============================================================================
// SANITIZATION FUNCTIONS
// ============================================================================

/**
 * Sanitize a string by removing potentially dangerous HTML/script content
 * Prevents XSS attacks while preserving legitimate text
 * 
 * @param input - Raw user input
 * @returns Sanitized string safe for display
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }
  
  return input
    // Remove null bytes
    .replace(/\0/g, '')
    // Encode HTML entities to prevent XSS
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    // Remove control characters except newlines and tabs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize whitespace
    .trim()
}

/**
 * Sanitize string for display (decode for showing to users)
 * Use this when displaying previously sanitized content
 */
export function sanitizeForDisplay(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }
  
  return input
    .replace(/\0/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
}

/**
 * Sanitize URL to prevent javascript: and data: URI attacks
 * 
 * @param url - URL to sanitize
 * @returns Safe URL or empty string if malicious
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') {
    return ''
  }
  
  const trimmed = url.trim().toLowerCase()
  
  // Block dangerous protocols
  const dangerousProtocols = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
  ]
  
  for (const protocol of dangerousProtocols) {
    if (trimmed.startsWith(protocol)) {
      return ''
    }
  }
  
  // Ensure it starts with http:// or https://
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    // If no protocol, assume https
    if (trimmed.includes('.') && !trimmed.includes(' ')) {
      return `https://${url.trim()}`
    }
    return ''
  }
  
  return url.trim()
}

/**
 * Sanitize email address
 * Basic sanitization - validation is separate
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return ''
  }
  
  return email
    .trim()
    .toLowerCase()
    .slice(0, INPUT_LIMITS.maxEmailLength)
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validation error with specific field and message
 */
export interface ValidationError {
  readonly field: string
  readonly message: string
  readonly code: string
}

/**
 * Validate search query
 */
export function validateSearchQuery(query: unknown): Result<string, ValidationError> {
  if (typeof query !== 'string') {
    return failure({
      field: 'query',
      message: 'Search query must be a string',
      code: 'INVALID_TYPE',
    })
  }
  
  const sanitized = sanitizeForDisplay(query)
  
  if (sanitized.length === 0) {
    return failure({
      field: 'query',
      message: 'Please enter a search query',
      code: 'REQUIRED',
    })
  }
  
  if (sanitized.length > INPUT_LIMITS.maxSearchLength) {
    return failure({
      field: 'query',
      message: `Search query must be ${INPUT_LIMITS.maxSearchLength} characters or less`,
      code: 'TOO_LONG',
    })
  }
  
  return success(sanitized)
}

/**
 * Validate content for verification
 */
export function validateVerifyContent(content: unknown): Result<string, ValidationError> {
  if (typeof content !== 'string') {
    return failure({
      field: 'content',
      message: 'Content must be a string',
      code: 'INVALID_TYPE',
    })
  }
  
  const sanitized = sanitizeForDisplay(content)
  
  if (sanitized.length === 0) {
    return failure({
      field: 'content',
      message: 'Please paste some AI output to verify',
      code: 'REQUIRED',
    })
  }
  
  if (sanitized.length > INPUT_LIMITS.maxVerifyLength) {
    return failure({
      field: 'content',
      message: `Content must be ${INPUT_LIMITS.maxVerifyLength} characters or less`,
      code: 'TOO_LONG',
    })
  }
  
  return success(sanitized)
}

/**
 * Validate AI source selection
 */
export function validateAISource(source: unknown): Result<string, ValidationError> {
  if (typeof source !== 'string') {
    return failure({
      field: 'aiSource',
      message: 'AI source must be a string',
      code: 'INVALID_TYPE',
    })
  }
  
  const sanitized = sanitizeForDisplay(source)
  
  if (sanitized.length === 0) {
    return failure({
      field: 'aiSource',
      message: 'Please select which AI generated this output',
      code: 'REQUIRED',
    })
  }
  
  if (sanitized.length > INPUT_LIMITS.maxCustomAILength) {
    return failure({
      field: 'aiSource',
      message: `AI name must be ${INPUT_LIMITS.maxCustomAILength} characters or less`,
      code: 'TOO_LONG',
    })
  }
  
  return success(sanitized)
}

/**
 * Validate email address
 */
export function validateEmail(email: unknown): Result<string, ValidationError> {
  if (typeof email !== 'string') {
    return failure({
      field: 'email',
      message: 'Email must be a string',
      code: 'INVALID_TYPE',
    })
  }
  
  const sanitized = sanitizeEmail(email)
  
  if (sanitized.length === 0) {
    return failure({
      field: 'email',
      message: 'Please enter your email address',
      code: 'REQUIRED',
    })
  }
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(sanitized)) {
    return failure({
      field: 'email',
      message: 'Please enter a valid email address',
      code: 'INVALID_FORMAT',
    })
  }
  
  return success(sanitized)
}

/**
 * Validate feedback text
 */
export function validateFeedback(feedback: unknown): Result<string, ValidationError> {
  if (typeof feedback !== 'string') {
    return failure({
      field: 'feedback',
      message: 'Feedback must be a string',
      code: 'INVALID_TYPE',
    })
  }
  
  const sanitized = sanitizeForDisplay(feedback)
  
  if (sanitized.length === 0) {
    return failure({
      field: 'feedback',
      message: 'Please enter your feedback',
      code: 'REQUIRED',
    })
  }
  
  if (sanitized.length > INPUT_LIMITS.maxFeedbackLength) {
    return failure({
      field: 'feedback',
      message: `Feedback must be ${INPUT_LIMITS.maxFeedbackLength} characters or less`,
      code: 'TOO_LONG',
    })
  }
  
  return success(sanitized)
}

/**
 * Validate display name
 */
export function validateDisplayName(name: unknown): Result<string, ValidationError> {
  if (typeof name !== 'string') {
    return failure({
      field: 'displayName',
      message: 'Display name must be a string',
      code: 'INVALID_TYPE',
    })
  }
  
  // Display name can be empty
  const sanitized = sanitizeForDisplay(name)
  
  if (sanitized.length > INPUT_LIMITS.maxDisplayNameLength) {
    return failure({
      field: 'displayName',
      message: `Display name must be ${INPUT_LIMITS.maxDisplayNameLength} characters or less`,
      code: 'TOO_LONG',
    })
  }
  
  return success(sanitized)
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Check if value is a non-empty string
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

/**
 * Check if value is a valid number
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value)
}

/**
 * Check if value is a non-negative integer
 */
export function isNonNegativeInteger(value: unknown): value is number {
  return isValidNumber(value) && Number.isInteger(value) && value >= 0
}

/**
 * Check if value is a percentage (0-100)
 */
export function isPercentage(value: unknown): value is number {
  return isValidNumber(value) && value >= 0 && value <= 100
}

// ============================================================================
// RATE LIMITING (Client-side)
// ============================================================================

/**
 * Simple client-side rate limiting
 * Not a security measure, but prevents accidental spam
 */
export class RateLimiter {
  private timestamps: number[] = []
  
  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number
  ) {}
  
  /**
   * Check if a request is allowed
   * @returns true if allowed, false if rate limited
   */
  canMakeRequest(): boolean {
    const now = Date.now()
    
    // Remove timestamps outside the window
    this.timestamps = this.timestamps.filter(
      (timestamp) => now - timestamp < this.windowMs
    )
    
    if (this.timestamps.length >= this.maxRequests) {
      return false
    }
    
    this.timestamps.push(now)
    return true
  }
  
  /**
   * Get milliseconds until next request is allowed
   */
  getTimeUntilNextAllowed(): number {
    if (this.canMakeRequest()) {
      return 0
    }
    
    const oldestTimestamp = this.timestamps[0]
    if (!oldestTimestamp) {
      return 0
    }
    
    return Math.max(0, this.windowMs - (Date.now() - oldestTimestamp))
  }
  
  /**
   * Reset the rate limiter
   */
  reset(): void {
    this.timestamps = []
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const validators = {
  searchQuery: validateSearchQuery,
  verifyContent: validateVerifyContent,
  aiSource: validateAISource,
  email: validateEmail,
  feedback: validateFeedback,
  displayName: validateDisplayName,
} as const

export const sanitizers = {
  string: sanitizeString,
  forDisplay: sanitizeForDisplay,
  url: sanitizeUrl,
  email: sanitizeEmail,
} as const
