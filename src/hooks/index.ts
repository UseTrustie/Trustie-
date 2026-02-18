/**
 * Custom React Hooks
 * 
 * Gold Standard: Encapsulate business logic in reusable hooks.
 * Each hook is focused, composable, and handles its own cleanup.
 * 
 * @module hooks
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { api } from '@/lib/api'
import { 
  STORAGE_KEYS, 
  LOADING_FACTS, 
  RANKINGS_REFRESH_MS,
  EMAIL_POPUP_THRESHOLD,
} from '@/lib/constants'
import { 
  getLocalStorage, 
  setLocalStorage, 
  removeLocalStorage,
  getRandomItem,
} from '@/lib/utils'
import type { 
  SearchResult, 
  VerificationResult, 
  AIRanking,
  ThemeMode,
} from '@/types'

// ============================================================================
// useSearch Hook
// ============================================================================

interface UseSearchReturn {
  query: string
  setQuery: (query: string) => void
  result: SearchResult | null
  isLoading: boolean
  error: string | null
  currentStep: string
  elapsedTime: number
  currentFact: string
  search: () => Promise<void>
  reset: () => void
}

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<SearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentFact, setCurrentFact] = useState('')
  
  const abortControllerRef = useRef<AbortController | null>(null)
  
  useEffect(() => {
    if (!isLoading) return
    
    setElapsedTime(0)
    setCurrentFact(getRandomItem(LOADING_FACTS) ?? '')
    
    const timer = setInterval(() => {
      setElapsedTime((t) => t + 1)
      if (Math.random() > 0.7) {
        setCurrentFact(getRandomItem(LOADING_FACTS) ?? '')
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [isLoading])
  
  const search = useCallback(async () => {
    if (!query.trim()) return
    
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()
    
    setIsLoading(true)
    setError(null)
    setResult(null)
    setCurrentStep('Searching trusted sources...')
    
    const stepTimeout1 = setTimeout(() => setCurrentStep('Cross-referencing sources...'), 3000)
    const stepTimeout2 = setTimeout(() => setCurrentStep('Calculating trust score...'), 6000)
    
    try {
      const response = await api.search(
        { query },
        { signal: abortControllerRef.current.signal }
      )
      
      if (response.success) {
        setResult(response.data)
        incrementUsageCount()
      } else {
        setError(response.error.message)
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message || 'Search failed. Please try again.')
      }
    } finally {
      clearTimeout(stepTimeout1)
      clearTimeout(stepTimeout2)
      setIsLoading(false)
      setCurrentStep('')
    }
  }, [query])
  
  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    setQuery('')
    setResult(null)
    setError(null)
    setCurrentStep('')
    setElapsedTime(0)
  }, [])
  
  useEffect(() => {
    return () => { abortControllerRef.current?.abort() }
  }, [])
  
  return { query, setQuery, result, isLoading, error, currentStep, elapsedTime, currentFact, search, reset }
}

// ============================================================================
// useVerify Hook
// ============================================================================

interface UseVerifyReturn {
  content: string
  setContent: (content: string) => void
  aiSource: string
  setAiSource: (source: string) => void
  customAiSource: string
  setCustomAiSource: (source: string) => void
  result: VerificationResult | null
  isLoading: boolean
  error: string | null
  currentStep: string
  elapsedTime: number
  currentFact: string
  verify: () => Promise<void>
  reset: () => void
  effectiveAiSource: string
}

export function useVerify(): UseVerifyReturn {
  const [content, setContent] = useState('')
  const [aiSource, setAiSource] = useState('')
  const [customAiSource, setCustomAiSource] = useState('')
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentFact, setCurrentFact] = useState('')
  
  const abortControllerRef = useRef<AbortController | null>(null)
  
  const effectiveAiSource = useMemo(() => {
    if (aiSource === 'Other' && customAiSource.trim()) return customAiSource.trim()
    return aiSource
  }, [aiSource, customAiSource])
  
  useEffect(() => {
    if (!isLoading) return
    setElapsedTime(0)
    setCurrentFact(getRandomItem(LOADING_FACTS) ?? '')
    const timer = setInterval(() => {
      setElapsedTime((t) => t + 1)
      if (Math.random() > 0.7) setCurrentFact(getRandomItem(LOADING_FACTS) ?? '')
    }, 1000)
    return () => clearInterval(timer)
  }, [isLoading])
  
  const verify = useCallback(async () => {
    if (!content.trim()) { setError('Please paste some AI output to verify.'); return }
    if (!effectiveAiSource) { setError('Please select which AI generated this output.'); return }
    
    abortControllerRef.current?.abort()
    abortControllerRef.current = new AbortController()
    
    setIsLoading(true)
    setError(null)
    setResult(null)
    setCurrentStep('Reading your text...')
    
    const t1 = setTimeout(() => setCurrentStep('Extracting claims...'), 2000)
    const t2 = setTimeout(() => setCurrentStep('Searching trusted sources...'), 5000)
    const t3 = setTimeout(() => setCurrentStep('Cross-referencing...'), 10000)
    
    try {
      const response = await api.verify({ content, aiSource: effectiveAiSource }, { signal: abortControllerRef.current.signal })
      if (response.success) { setResult({ ...response.data, timeTaken: elapsedTime }); incrementUsageCount() }
      else { setError(response.error.message) }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') setError(err.message || 'Verification failed.')
    } finally {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      setIsLoading(false); setCurrentStep('')
    }
  }, [content, effectiveAiSource, elapsedTime])
  
  const reset = useCallback(() => {
    abortControllerRef.current?.abort()
    setContent(''); setAiSource(''); setCustomAiSource(''); setResult(null); setError(null); setCurrentStep(''); setElapsedTime(0)
  }, [])
  
  useEffect(() => { return () => { abortControllerRef.current?.abort() } }, [])
  
  return { content, setContent, aiSource, setAiSource, customAiSource, setCustomAiSource, result, isLoading, error, currentStep, elapsedTime, currentFact, verify, reset, effectiveAiSource }
}

// ============================================================================
// useRephrase Hook
// ============================================================================

export function useRephrase() {
  const [rephrased, setRephrased] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const rephrase = useCallback(async (text: string) => {
    if (!text.trim()) return
    setIsLoading(true); setError(null)
    try {
      const response = await api.rephrase({ text })
      if (response.success) setRephrased(response.data.rephrased)
      else setError(response.error.message)
    } catch (err) { if (err instanceof Error) setError(err.message) }
    finally { setIsLoading(false) }
  }, [])
  
  const reset = useCallback(() => { setRephrased(''); setError(null) }, [])
  return { rephrased, isLoading, error, rephrase, reset }
}

// ============================================================================
// useRankings Hook
// ============================================================================

export function useRankings() {
  const [rankings, setRankings] = useState<AIRanking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await api.getRankings()
      if (response.success) { setRankings(response.data.rankings as AIRanking[]); setError(null) }
      else { setError(response.error.message) }
    } catch (err) { if (err instanceof Error) setError(err.message) }
    finally { setIsLoading(false) }
  }, [])
  
  useEffect(() => {
    refresh()
    const interval = setInterval(refresh, RANKINGS_REFRESH_MS)
    return () => clearInterval(interval)
  }, [refresh])
  
  return { rankings, isLoading, error, refresh }
}

// ============================================================================
// useTheme Hook
// ============================================================================

export function useTheme() {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark')
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  useEffect(() => {
    const savedMode = getLocalStorage<ThemeMode>(STORAGE_KEYS.appearanceMode, 'dark')
    setThemeModeState(savedMode)
  }, [])
  
  useEffect(() => {
    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      setIsDarkMode(mediaQuery.matches)
      const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
      mediaQuery.addEventListener('change', handler)
      return () => mediaQuery.removeEventListener('change', handler)
    } else {
      setIsDarkMode(themeMode === 'dark')
      return undefined
    }
  }, [themeMode])
  
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode)
    setLocalStorage(STORAGE_KEYS.appearanceMode, mode)
  }, [])
  
  const toggleDarkMode = useCallback(() => { setThemeMode(isDarkMode ? 'light' : 'dark') }, [isDarkMode, setThemeMode])
  
  return { isDarkMode, themeMode, setThemeMode, toggleDarkMode }
}

// ============================================================================
// useLocalStorage Hook
// ============================================================================

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getLocalStorage(key, initialValue))
  
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
      setLocalStorage(key, newValue)
      return newValue
    })
  }, [key])
  
  return [storedValue, setValue]
}

// ============================================================================
// useDebounce Hook
// ============================================================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

// ============================================================================
// useEmailPopup Hook
// ============================================================================

export function useEmailPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useLocalStorage(STORAGE_KEYS.emailSubmitted, false)
  
  const submitEmail = useCallback((email: string) => {
    if (email.trim()) { console.log('Email captured:', email); setEmailSubmitted(true); setShowPopup(false) }
  }, [setEmailSubmitted])
  
  const dismissPopup = useCallback(() => { setShowPopup(false) }, [])
  
  useEffect(() => {
    if (emailSubmitted) return
    const checkUsage = () => {
      const count = getLocalStorage<number>(STORAGE_KEYS.useCount, 0)
      if (count >= EMAIL_POPUP_THRESHOLD) setShowPopup(true)
    }
    const timeout = setTimeout(checkUsage, 2000)
    return () => clearTimeout(timeout)
  }, [emailSubmitted])
  
  return { showPopup, emailSubmitted, submitEmail, dismissPopup }
}

// ============================================================================
// useCopyToClipboard Hook
// ============================================================================

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)
  
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    }
  }, [resetDelay])
  
  return { copied, copy }
}

// ============================================================================
// useTextToSpeech Hook (Accessibility Feature)
// ============================================================================

interface UseTextToSpeechReturn {
  isSupported: boolean
  isSpeaking: boolean
  speak: (text: string) => void
  stop: () => void
  rate: number
  setRate: (rate: number) => void
}

export function useTextToSpeech(): UseTextToSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [rate, setRateState] = useState(() => 
    getLocalStorage<number>(STORAGE_KEYS.readAloudRate, 1.0)
  )
  
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  
  const speak = useCallback((text: string) => {
    if (!isSupported) return
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = 1.0
    utterance.volume = 1.0
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utterance)
  }, [isSupported, rate])
  
  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [isSupported])
  
  const setRate = useCallback((newRate: number) => {
    const clampedRate = Math.max(0.5, Math.min(2.0, newRate))
    setRateState(clampedRate)
    setLocalStorage(STORAGE_KEYS.readAloudRate, clampedRate)
  }, [])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isSupported])
  
  return { isSupported, isSpeaking, speak, stop, rate, setRate }
}

// ============================================================================
// useProfessionalMode Hook (No Contractions)
// ============================================================================

import { CONTRACTION_MAP } from '@/lib/constants'

interface UseProfessionalModeReturn {
  isEnabled: boolean
  toggle: () => void
  transform: (text: string) => string
}

export function useProfessionalMode(): UseProfessionalModeReturn {
  const [isEnabled, setIsEnabled] = useState(() =>
    getLocalStorage<boolean>(STORAGE_KEYS.professionalMode, false)
  )
  
  const toggle = useCallback(() => {
    setIsEnabled(prev => {
      const newValue = !prev
      setLocalStorage(STORAGE_KEYS.professionalMode, newValue)
      return newValue
    })
  }, [])
  
  const transform = useCallback((text: string): string => {
    if (!isEnabled) return text
    
    let result = text
    for (const [contraction, expansion] of Object.entries(CONTRACTION_MAP)) {
      // Case-insensitive replacement
      const regex = new RegExp(contraction.replace(/'/g, "'"), 'gi')
      result = result.replace(regex, (match) => {
        // Preserve original case
        const firstChar = match.charAt(0)
        if (firstChar && firstChar === firstChar.toUpperCase()) {
          return expansion.charAt(0).toUpperCase() + expansion.slice(1)
        }
        return expansion
      })
    }
    return result
  }, [isEnabled])
  
  return { isEnabled, toggle, transform }
}

// ============================================================================
// useQueryType Hook (Smart Query Detection)
// ============================================================================

import { 
  ACADEMIC_KEYWORDS, 
  MEDICAL_KEYWORDS, 
  MATH_KEYWORDS,
  LEGAL_KEYWORDS,
  FINANCIAL_KEYWORDS,
} from '@/lib/constants'
import type { QueryType } from '@/types'

export function useQueryType(query: string): QueryType {
  return useMemo(() => {
    const lowerQuery = query.toLowerCase()
    
    // Check for medical keywords (highest priority for safety)
    if (MEDICAL_KEYWORDS.some(kw => lowerQuery.includes(kw))) {
      return 'medical'
    }
    
    // Check for legal keywords
    if (LEGAL_KEYWORDS.some(kw => lowerQuery.includes(kw))) {
      return 'legal'
    }
    
    // Check for financial keywords
    if (FINANCIAL_KEYWORDS.some(kw => lowerQuery.includes(kw))) {
      return 'financial'
    }
    
    // Check for math keywords
    if (MATH_KEYWORDS.some(kw => lowerQuery.includes(kw))) {
      return 'math'
    }
    
    // Check for academic keywords
    if (ACADEMIC_KEYWORDS.some(kw => lowerQuery.includes(kw))) {
      return 'academic'
    }
    
    return 'general'
  }, [query])
}

// ============================================================================
// Utility Functions
// ============================================================================

function incrementUsageCount(): void {
  const count = getLocalStorage<number>(STORAGE_KEYS.useCount, 0)
  setLocalStorage(STORAGE_KEYS.useCount, count + 1)
}

export function clearAllLocalData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => removeLocalStorage(key))
}
