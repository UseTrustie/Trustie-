/**
 * API Client
 * 
 * Gold Standard: Robust API client with retry logic, error handling,
 * request/response typing, and proper abort support.
 * 
 * Inspired by: AWS SDK retry logic, Stripe API client
 * 
 * @module api
 */

import { API_ENDPOINTS, API_RETRY_CONFIG } from '@/lib/constants'
import type {
  SearchRequest,
  SearchResponse,
  VerifyRequest,
  VerifyResponse,
  RephraseRequest,
  RephraseResponse,
  RankingsResponse,
  RankingsPostRequest,
  APIError,
  Result,
} from '@/types'
import { isAPIError, success, failure } from '@/types'

// ============================================================================
// TYPES
// ============================================================================

interface RequestOptions {
  /** AbortSignal for cancellation */
  signal?: AbortSignal
  /** Custom timeout in milliseconds */
  timeout?: number
  /** Skip retry logic */
  noRetry?: boolean
}

interface APIClientError extends Error {
  readonly code: string
  readonly status?: number
  readonly isRetryable: boolean
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Create an API client error
 */
function createAPIError(
  message: string,
  code: string,
  status?: number,
  isRetryable = false
): APIClientError {
  const error = new Error(message) as APIClientError
  Object.defineProperty(error, 'code', { value: code, enumerable: true })
  Object.defineProperty(error, 'status', { value: status, enumerable: true })
  Object.defineProperty(error, 'isRetryable', { value: isRetryable, enumerable: true })
  return error
}

/**
 * Determine if an error is retryable
 */
function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    // Network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return true
    }
    
    // Timeout errors
    if (error.name === 'AbortError') {
      return false // User cancelled, don't retry
    }
  }
  
  // HTTP status codes that are retryable
  const retryableStatuses = [408, 429, 500, 502, 503, 504]
  if ('status' in (error as Record<string, unknown>)) {
    return retryableStatuses.includes((error as { status: number }).status)
  }
  
  return false
}

/**
 * Calculate exponential backoff delay
 */
function calculateBackoff(attempt: number): number {
  const { baseDelayMs, maxDelayMs } = API_RETRY_CONFIG
  
  // Exponential backoff with jitter
  const exponentialDelay = baseDelayMs * Math.pow(2, attempt)
  const jitter = Math.random() * 0.3 * exponentialDelay
  
  return Math.min(exponentialDelay + jitter, maxDelayMs)
}

// ============================================================================
// CORE FETCH WRAPPER
// ============================================================================

/**
 * Make a fetch request with retry logic and error handling
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  requestOptions: RequestOptions = {}
): Promise<Result<T, APIClientError>> {
  const { signal, timeout = 30000, noRetry = false } = requestOptions
  const { maxRetries } = API_RETRY_CONFIG
  
  let lastError: APIClientError | null = null
  const attempts = noRetry ? 1 : maxRetries
  
  for (let attempt = 0; attempt < attempts; attempt++) {
    // Create timeout abort controller
    const timeoutController = new AbortController()
    const timeoutId = setTimeout(() => timeoutController.abort(), timeout)
    
    // Combine signals if provided
    const combinedSignal = signal
      ? combineAbortSignals([signal, timeoutController.signal])
      : timeoutController.signal
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: combinedSignal,
      })
      
      clearTimeout(timeoutId)
      
      // Parse response
      const data = await response.json()
      
      // Check for API errors
      if (!response.ok) {
        const errorMessage = isAPIError(data) ? data.error : 'Request failed'
        lastError = createAPIError(
          errorMessage,
          'API_ERROR',
          response.status,
          isRetryableError({ status: response.status })
        )
        
        if (!lastError.isRetryable || attempt === attempts - 1) {
          return failure(lastError)
        }
        
        // Wait before retry
        await sleep(calculateBackoff(attempt))
        continue
      }
      
      return success(data as T)
    } catch (error) {
      clearTimeout(timeoutId)
      
      // User cancelled
      if (signal?.aborted) {
        return failure(createAPIError('Request cancelled', 'CANCELLED', undefined, false))
      }
      
      // Timeout
      if (timeoutController.signal.aborted) {
        lastError = createAPIError('Request timed out', 'TIMEOUT', undefined, true)
      } else if (error instanceof Error) {
        lastError = createAPIError(
          error.message,
          'NETWORK_ERROR',
          undefined,
          isRetryableError(error)
        )
      } else {
        lastError = createAPIError('Unknown error', 'UNKNOWN', undefined, false)
      }
      
      if (!lastError.isRetryable || attempt === attempts - 1) {
        return failure(lastError)
      }
      
      // Wait before retry
      await sleep(calculateBackoff(attempt))
    }
  }
  
  return failure(lastError ?? createAPIError('All retries failed', 'RETRY_EXHAUSTED'))
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Sleep for a given duration
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Combine multiple abort signals into one
 */
function combineAbortSignals(signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController()
  
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort()
      break
    }
    
    signal.addEventListener('abort', () => controller.abort(), { once: true })
  }
  
  return controller.signal
}

// ============================================================================
// API METHODS
// ============================================================================

/**
 * Search for trusted information
 */
export async function search(
  request: SearchRequest,
  options?: RequestOptions
): Promise<Result<SearchResponse, APIClientError>> {
  return fetchWithRetry<SearchResponse>(
    API_ENDPOINTS.search,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
    options
  )
}

/**
 * Verify AI-generated content
 */
export async function verify(
  request: VerifyRequest,
  options?: RequestOptions
): Promise<Result<VerifyResponse, APIClientError>> {
  return fetchWithRetry<VerifyResponse>(
    API_ENDPOINTS.verify,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
    { ...options, timeout: 60000 } // Longer timeout for verification
  )
}

/**
 * Rephrase text while keeping facts
 */
export async function rephrase(
  request: RephraseRequest,
  options?: RequestOptions
): Promise<Result<RephraseResponse, APIClientError>> {
  return fetchWithRetry<RephraseResponse>(
    API_ENDPOINTS.rephrase,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
    options
  )
}

/**
 * Get AI rankings
 */
export async function getRankings(
  options?: RequestOptions
): Promise<Result<RankingsResponse, APIClientError>> {
  return fetchWithRetry<RankingsResponse>(
    API_ENDPOINTS.rankings,
    { method: 'GET' },
    { ...options, noRetry: true }
  )
}

/**
 * Post ranking data
 */
export async function postRanking(
  request: RankingsPostRequest,
  options?: RequestOptions
): Promise<Result<{ success: boolean }, APIClientError>> {
  return fetchWithRetry<{ success: boolean }>(
    API_ENDPOINTS.rankings,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    },
    { ...options, noRetry: true }
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export const api = {
  search,
  verify,
  rephrase,
  getRankings,
  postRanking,
} as const

export type { APIClientError, RequestOptions }
