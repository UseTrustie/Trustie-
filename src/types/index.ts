/**
 * Trustie Type Definitions
 * 
 * Gold Standard: All types are strict, documented, and composable.
 * No `any` types. All API responses are typed.
 * 
 * @module types
 */

// ============================================================================
// CORE DOMAIN TYPES
// ============================================================================

/**
 * Trust quality levels for sources
 * High: .edu, .gov, peer-reviewed journals
 * Medium: Major news outlets, Wikipedia
 * Low: Other sources requiring manual verification
 */
export type TrustQuality = 'high' | 'medium' | 'low'

/**
 * Claim verification status
 * verified: Confirmed true by multiple sources
 * false: Contradicted by reliable sources
 * unconfirmed: Could not find sufficient evidence
 * opinion: Not a factual claim, cannot be verified
 */
export type ClaimStatus = 'verified' | 'false' | 'unconfirmed' | 'opinion'

/**
 * Claim type classification
 * fact: Verifiable factual statement
 * opinion: Subjective statement
 * prediction: Future-oriented claim
 */
export type ClaimType = 'fact' | 'opinion' | 'prediction'

/**
 * Theme mode options
 */
export type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * Authentication mode
 */
export type AuthMode = 'signin' | 'signup'

/**
 * Feedback type
 */
export type FeedbackType = 'helpful' | 'not-helpful' | null

// ============================================================================
// SOURCE TYPES
// ============================================================================

/**
 * Represents a source used for verification
 */
export interface Source {
  /** Full URL of the source */
  readonly url: string
  /** Title of the page/article */
  readonly title: string
  /** Relevant snippet from the source */
  readonly snippet: string
  /** Domain name (e.g., "wikipedia.org") */
  readonly domain: string
  /** Computed trust quality level */
  readonly quality: TrustQuality
}

/**
 * Source without quality (from API before processing)
 */
export interface RawSource {
  readonly url: string
  readonly title: string
  readonly snippet: string
  readonly domain: string
  readonly quality?: TrustQuality
}

// ============================================================================
// CLAIM TYPES
// ============================================================================

/**
 * Result of verifying a single claim
 */
export interface ClaimResult {
  /** The exact claim text from the input */
  readonly claim: string
  /** Classification of the claim */
  readonly type: ClaimType
  /** Verification result */
  readonly status: ClaimStatus
  /** Sources that support or refute the claim */
  readonly sources: readonly Source[]
  /** Human-readable explanation */
  readonly explanation: string
  /** Number of sources that agree (optional) */
  readonly sourceAgreement?: number
}

/**
 * Summary statistics for verification results
 */
export interface VerificationSummary {
  readonly total: number
  readonly verified: number
  readonly false: number
  readonly unconfirmed: number
  readonly opinions: number
}

/**
 * Complete verification result
 */
export interface VerificationResult {
  readonly claims: readonly ClaimResult[]
  readonly summary: VerificationSummary
  readonly message?: string
  readonly timeTaken?: number
}

// ============================================================================
// SEARCH TYPES
// ============================================================================

/**
 * Search result from the search API
 */
export interface SearchResult {
  readonly query: string
  readonly answer: string
  readonly trustScore: number
  readonly sources: readonly Source[]
  readonly sourceAgreement: number
  readonly warnings: readonly string[]
}

// ============================================================================
// RANKINGS TYPES
// ============================================================================

/**
 * AI ranking data
 */
export interface AIRanking {
  readonly name: string
  readonly checksCount: number
  readonly verifiedRate: number
  readonly falseRate: number
  readonly avgScore: number
}

/**
 * AI category for discovery
 */
export interface AICategory {
  readonly name: string
  readonly icon: string
  readonly description: string
  readonly ais: readonly string[]
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Search API request body
 */
export interface SearchRequest {
  readonly query: string
}

/**
 * Search API response
 */
export interface SearchResponse extends SearchResult {}

/**
 * Verify API request body
 */
export interface VerifyRequest {
  readonly content: string
  readonly aiSource: string
}

/**
 * Verify API response
 */
export interface VerifyResponse extends VerificationResult {}

/**
 * Rephrase API request body
 */
export interface RephraseRequest {
  readonly text: string
}

/**
 * Rephrase API response
 */
export interface RephraseResponse {
  readonly rephrased: string
}

/**
 * Rankings API GET response
 */
export interface RankingsResponse {
  readonly rankings: readonly AIRanking[]
}

/**
 * Rankings API POST request
 */
export interface RankingsPostRequest {
  readonly aiSource: string
  readonly verified: number
  readonly false: number
  readonly unconfirmed: number
  readonly opinions: number
  readonly total: number
}

// ============================================================================
// API ERROR TYPES
// ============================================================================

/**
 * Standard API error response
 */
export interface APIError {
  readonly error: string
  readonly code?: string
  readonly details?: Record<string, unknown>
}

/**
 * Type guard for API errors
 */
export function isAPIError(value: unknown): value is APIError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'error' in value &&
    typeof (value as APIError).error === 'string'
  )
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

/**
 * Loading state for async operations
 */
export interface LoadingState {
  readonly isLoading: boolean
  readonly currentStep: string
  readonly elapsedTime: number
}

/**
 * Tab identifiers
 */
export type TabId = 'search' | 'check' | 'discover' | 'feedback' | 'about'

/**
 * Settings tab identifiers
 */
export type SettingsTabId = 'general' | 'accessibility' | 'privacy' | 'about'

/**
 * Query type for smart routing
 */
export type QueryType = 'general' | 'academic' | 'medical' | 'math' | 'legal' | 'financial'

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

/**
 * Base props that all components should accept
 */
export interface BaseComponentProps {
  /** Additional CSS classes */
  className?: string
  /** Test ID for testing */
  testId?: string
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  readonly disabled?: boolean
}

/**
 * Props for components with loading state
 */
export interface LoadableProps {
  readonly loading?: boolean
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Make all properties mutable (opposite of Readonly)
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * Extract the element type from an array type
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E }

/**
 * Create a successful result
 */
export function success<T>(data: T): Result<T, never> {
  return { success: true, data }
}

/**
 * Create a failed result
 */
export function failure<E>(error: E): Result<never, E> {
  return { success: false, error }
}
