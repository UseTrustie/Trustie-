/**
 * Utility Functions
 * 
 * Gold Standard: Pure functions with no side effects.
 * Each function does one thing well (UNIX philosophy).
 * All functions are documented and type-safe.
 * 
 * @module utils
 */

import { HIGH_TRUST_DOMAINS, MEDIUM_TRUST_DOMAINS } from '@/lib/constants'
import type { TrustQuality, Source, RawSource, ClaimStatus } from '@/types'

// ============================================================================
// TRUST CALCULATION
// ============================================================================

/**
 * Determine the trust quality level for a domain
 * 
 * @param domain - Domain name to evaluate
 * @returns Trust quality level
 * 
 * @example
 * getSourceQuality('harvard.edu') // 'high'
 * getSourceQuality('wikipedia.org') // 'medium'
 * getSourceQuality('random-blog.com') // 'low'
 */
export function getSourceQuality(domain: string): TrustQuality {
  if (!domain || typeof domain !== 'string') {
    return 'low'
  }
  
  const domainLower = domain.toLowerCase()
  
  // Check high trust domains
  for (const trusted of HIGH_TRUST_DOMAINS) {
    if (domainLower.includes(trusted)) {
      return 'high'
    }
  }
  
  // Check medium trust domains
  for (const trusted of MEDIUM_TRUST_DOMAINS) {
    if (domainLower.includes(trusted)) {
      return 'medium'
    }
  }
  
  return 'low'
}

/**
 * Add quality ratings to raw sources
 * 
 * @param sources - Array of sources without quality
 * @returns Array of sources with quality ratings
 */
export function enrichSourcesWithQuality(sources: readonly RawSource[]): Source[] {
  return sources.map((source) => ({
    ...source,
    quality: source.quality ?? getSourceQuality(source.domain || source.url || ''),
  }))
}

/**
 * Sort sources by trust quality (high first, then medium, then low)
 * 
 * @param sources - Array of sources to sort
 * @returns Sorted array (does not mutate original)
 */
export function sortSourcesByQuality<T extends { quality: TrustQuality }>(
  sources: readonly T[]
): T[] {
  const order: Record<TrustQuality, number> = { high: 0, medium: 1, low: 2 }
  return [...sources].sort((a, b) => order[a.quality] - order[b.quality])
}

/**
 * Calculate trust score based on sources and agreement
 * 
 * @param sources - Array of sources
 * @param agreementCount - Number of sources that agree
 * @returns Trust score from 0-100
 */
export function calculateTrustScore(
  sources: readonly Source[],
  agreementCount: number
): number {
  if (sources.length === 0) {
    return 0
  }
  
  let score = 50
  
  const highQualitySources = sources.filter((s) => s.quality === 'high').length
  const mediumQualitySources = sources.filter((s) => s.quality === 'medium').length
  
  // Boost for high-quality sources
  score += highQualitySources * 15
  // Smaller boost for medium-quality sources
  score += mediumQualitySources * 8
  
  // Boost for source agreement
  if (agreementCount >= 3) {
    score += 20
  } else if (agreementCount >= 2) {
    score += 10
  }
  
  // Penalty if no trusted sources
  if (highQualitySources === 0 && mediumQualitySources === 0) {
    score -= 20
  }
  
  // Clamp to 0-100
  return Math.max(0, Math.min(100, score))
}

/**
 * Generate warnings based on sources and answer
 * 
 * @param sources - Array of sources
 * @param answer - The answer text
 * @returns Array of warning messages
 */
export function generateWarnings(
  sources: readonly Source[],
  answer: string
): string[] {
  const warnings: string[] = []
  
  const highQualitySources = sources.filter((s) => s.quality === 'high').length
  
  if (highQualitySources === 0) {
    warnings.push(
      'No high-trust sources (.edu, .gov, peer-reviewed) found. Consider verifying with additional sources.'
    )
  }
  
  if (sources.length < 2) {
    warnings.push(
      'Limited sources available. Cross-reference with additional searches.'
    )
  }
  
  // Check for hedging language
  const hedgingWords = ['may', 'might', 'could', 'possibly', 'reportedly', 'allegedly']
  const answerLower = answer.toLowerCase()
  
  if (hedgingWords.some((word) => answerLower.includes(word))) {
    warnings.push('This topic contains uncertainty. Multiple perspectives may exist.')
  }
  
  return warnings
}

// ============================================================================
// FORMATTING
// ============================================================================

/**
 * Format a percentage for display
 * 
 * @param value - Number between 0 and 100
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number): string {
  const clamped = Math.max(0, Math.min(100, value))
  return `${Math.round(clamped)}%`
}

/**
 * Format elapsed time for display
 * 
 * @param seconds - Number of seconds
 * @returns Formatted time string
 */
export function formatElapsedTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  return `${minutes}m ${remainingSeconds}s`
}

/**
 * Truncate text with ellipsis
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) {
    return text
  }
  
  return `${text.slice(0, maxLength - 3)}...`
}

/**
 * Extract domain from URL
 * 
 * @param url - Full URL
 * @returns Domain name or empty string
 */
export function extractDomain(url: string): string {
  if (!url) {
    return ''
  }
  
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch {
    // Try to extract domain from malformed URL
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?([^\/\s]+)/)
    return match?.[1] ?? ''
  }
}

// ============================================================================
// CLAIM STATUS HELPERS
// ============================================================================

/**
 * Get color class for claim status
 */
export function getStatusColor(status: ClaimStatus): string {
  const colors: Record<ClaimStatus, string> = {
    verified: 'text-emerald-400',
    false: 'text-red-400',
    unconfirmed: 'text-amber-400',
    opinion: 'text-blue-400',
  }
  return colors[status]
}

/**
 * Get icon for claim status
 */
export function getStatusIcon(status: ClaimStatus): string {
  const icons: Record<ClaimStatus, string> = {
    verified: '✓',
    false: '✗',
    unconfirmed: '?',
    opinion: '○',
  }
  return icons[status]
}

/**
 * Get border color class for claim status
 */
export function getStatusBorderColor(status: ClaimStatus): string {
  const colors: Record<ClaimStatus, string> = {
    verified: 'border-l-emerald-500',
    false: 'border-l-red-500',
    unconfirmed: 'border-l-amber-500',
    opinion: 'border-l-blue-500',
  }
  return colors[status]
}

// ============================================================================
// RANDOM SELECTION
// ============================================================================

/**
 * Get a random item from an array
 * 
 * @param items - Array of items
 * @returns Random item or undefined if empty
 */
export function getRandomItem<T>(items: readonly T[]): T | undefined {
  if (items.length === 0) {
    return undefined
  }
  
  const index = Math.floor(Math.random() * items.length)
  return items[index]
}

/**
 * Shuffle an array (Fisher-Yates)
 * 
 * @param items - Array to shuffle
 * @returns New shuffled array
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i]!
    result[i] = result[j]!
    result[j] = temp
  }
  
  return result
}

// ============================================================================
// DEBOUNCE & THROTTLE
// ============================================================================

/**
 * Create a debounced version of a function
 * 
 * @param fn - Function to debounce
 * @param delayMs - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delayMs)
  }
}

/**
 * Create a throttled version of a function
 * 
 * @param fn - Function to throttle
 * @param limitMs - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limitMs: number
): (...args: Parameters<T>) => void {
  let lastRun = 0
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  return (...args: Parameters<T>) => {
    const now = Date.now()
    const timeSinceLastRun = now - lastRun
    
    if (timeSinceLastRun >= limitMs) {
      fn(...args)
      lastRun = now
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        fn(...args)
        lastRun = Date.now()
        timeoutId = null
      }, limitMs - timeSinceLastRun)
    }
  }
}

// ============================================================================
// CLIPBOARD
// ============================================================================

/**
 * Copy text to clipboard
 * 
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator?.clipboard) {
    // Fallback for older browsers
    return copyToClipboardFallback(text)
  }
  
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return copyToClipboardFallback(text)
  }
}

/**
 * Fallback clipboard copy using textarea
 */
function copyToClipboardFallback(text: string): boolean {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '-9999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  } catch {
    return false
  }
}

// ============================================================================
// CLASS NAME UTILITIES
// ============================================================================

/**
 * Conditionally join class names
 * 
 * @param classes - Array of class names or conditional objects
 * @returns Joined class string
 * 
 * @example
 * cn('base', isActive && 'active', { hidden: !visible })
 * // 'base active' if isActive is true and visible is true
 */
export function cn(
  ...classes: Array<string | boolean | undefined | null | Record<string, boolean>>
): string {
  const result: string[] = []
  
  for (const item of classes) {
    if (!item) {
      continue
    }
    
    if (typeof item === 'string') {
      result.push(item)
    } else if (typeof item === 'object') {
      for (const [key, value] of Object.entries(item)) {
        if (value) {
          result.push(key)
        }
      }
    }
  }
  
  return result.join(' ')
}

// ============================================================================
// LOCAL STORAGE
// ============================================================================

/**
 * Safely get item from localStorage
 * 
 * @param key - Storage key
 * @param defaultValue - Default value if not found
 * @returns Stored value or default
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue
  }
  
  try {
    const item = localStorage.getItem(key)
    if (item === null) {
      return defaultValue
    }
    return JSON.parse(item) as T
  } catch {
    return defaultValue
  }
}

/**
 * Safely set item in localStorage
 * 
 * @param key - Storage key
 * @param value - Value to store
 * @returns true if successful
 */
export function setLocalStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Safely remove item from localStorage
 * 
 * @param key - Storage key
 */
export function removeLocalStorage(key: string): void {
  if (typeof window === 'undefined') {
    return
  }
  
  try {
    localStorage.removeItem(key)
  } catch {
    // Ignore errors
  }
}

// ============================================================================
// ID GENERATION
// ============================================================================

/**
 * Generate a unique ID
 * Not cryptographically secure - use for UI purposes only
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}
