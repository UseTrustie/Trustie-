/**
 * Application Constants
 * 
 * Gold Standard: All magic values centralized, documented, and typed.
 * Changes here propagate throughout the application.
 * 
 * SEARCH ENGINE PHILOSOPHY (inspired by best practices from Google, DuckDuckGo, Bing):
 * - Google: Best ranking algorithm (PageRank), authority signals, freshness
 * - DuckDuckGo: Privacy-first, multiple sources, no filter bubbles
 * - Bing: Structured data, straightforward factual queries
 * 
 * Trustie combines all three: AI-powered verification with source transparency
 * 
 * @module constants
 */

import type { AICategory, TrustQuality } from '@/types'

// ============================================================================
// APPLICATION METADATA
// ============================================================================

export const APP_NAME = 'Trustie' as const
export const APP_VERSION = '2.0.0' as const
export const APP_TAGLINE = 'The Trust Layer for AI Search' as const
export const APP_DESCRIPTION = 'Stop blindly trusting AI. Verify AI-generated claims against real sources in seconds. Built for the AI search era.' as const

// ============================================================================
// SEARCH ENGINE PHILOSOPHY - WHAT MAKES TRUSTIE DIFFERENT
// ============================================================================

/**
 * The trust paradigm shift (from your research):
 * 
 * TRADITIONAL SEARCH (Google model):
 * - User trusts algorithm to rank best pages
 * - User clicks link and evaluates source themselves
 * - User does the fact-checking
 * 
 * AI SEARCH (ChatGPT/Perplexity model):
 * - User asks question
 * - AI synthesizes answer from multiple sources
 * - User trusts the AI's synthesis
 * - AI does fact-checking (or does not)
 * 
 * TRUSTIE MODEL (best of both):
 * - AI synthesizes answer
 * - Trustie verifies each claim against authoritative sources
 * - User sees both the answer AND the evidence
 * - Transparency + verification = actual trust
 */
export const TRUSTIE_PHILOSOPHY = {
  mission: 'Bridge the trust gap between AI-generated content and verified facts',
  approach: 'Combine AI synthesis with traditional source verification',
  differentiator: 'We show you the sources so you can verify for yourself',
} as const

// ============================================================================
// AI SOURCES
// ============================================================================

/**
 * List of popular AI assistants users can select
 * Ordered by market share/popularity
 */
export const POPULAR_AIS = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Perplexity',
  'Copilot',
  'Grok',
  'Llama',
  'Mistral',
  'DeepSeek',
  'Kimi',
  'Pi',
  'Other',
] as const

export type PopularAI = (typeof POPULAR_AIS)[number]

// ============================================================================
// TRUST LEVELS
// ============================================================================

/**
 * Domains considered high trust (peer-reviewed, government, educational)
 * These sources are given highest weight in trust calculations
 * 
 * Inspired by Google Scholar, PubMed, Wolfram Alpha reliability standards
 */
export const HIGH_TRUST_DOMAINS = [
  // Educational institutions (.edu)
  '.edu',
  // Government sources (.gov)
  '.gov',
  '.gov.uk',
  '.gc.ca',
  '.gov.au',
  // Peer-reviewed / Academic (Google Scholar level)
  'pubmed',
  'ncbi.nlm.nih.gov',
  'nature.com',
  'sciencedirect.com',
  'scholar.google',
  'jstor.org',
  'springer.com',
  'wiley.com',
  'ieee.org',
  'acm.org',
  'arxiv.org',
  'researchgate.net',
  'semanticscholar.org',
  // International health / science organizations
  'who.int',
  'cdc.gov',
  'nih.gov',
  'nasa.gov',
  'fda.gov',
  'epa.gov',
  'noaa.gov',
  // Encyclopedias / Reference
  'britannica.com',
  'stanford.edu',
  'mit.edu',
  'harvard.edu',
  // Math / Computation (Wolfram Alpha level)
  'wolframalpha.com',
  'mathworld.wolfram.com',
  // Statistics / Data
  'statista.com',
  'data.gov',
  'census.gov',
  'bls.gov',
  'worldbank.org',
  'un.org',
] as const

/**
 * Domains considered medium trust (major news outlets, Wikipedia)
 * These sources are reliable but require cross-referencing
 * 
 * DuckDuckGo approach: Multiple reputable sources for verification
 */
export const MEDIUM_TRUST_DOMAINS = [
  // Reference (crowdsourced but cited)
  'wikipedia.org',
  'wiktionary.org',
  // Major Wire Services (most objective news)
  'reuters.com',
  'apnews.com',
  'afp.com',
  // Public Broadcasting
  'bbc.com',
  'bbc.co.uk',
  'npr.org',
  'pbs.org',
  // Major Newspapers of Record
  'nytimes.com',
  'washingtonpost.com',
  'theguardian.com',
  'wsj.com',
  'ft.com',
  'economist.com',
  // Broadcast News
  'cnn.com',
  'cbsnews.com',
  'nbcnews.com',
  'abcnews.go.com',
  // Business / Finance
  'forbes.com',
  'bloomberg.com',
  'cnbc.com',
  'marketwatch.com',
  // Tech
  'wired.com',
  'arstechnica.com',
  'theverge.com',
  'techcrunch.com',
  // Sports
  'espn.com',
  // Fact-checkers
  'snopes.com',
  'factcheck.org',
  'politifact.com',
] as const

/**
 * Domains to be cautious about (SEO spam, content farms, low reliability)
 * These are NOT blocked but flagged for extra verification
 * 
 * Addressing Google's post-2019 SEO spam problem
 */
export const LOW_TRUST_INDICATORS = [
  // Generic content farms
  'content-farm',
  'articlesfactory',
  'ezinearticles',
  // SEO-heavy domains (often unreliable)
  'answers.com',
  'quora.com', // User-generated, variable quality
  'medium.com', // Anyone can publish
  'substack.com', // Anyone can publish
  // Aggregators (not original sources)
  'buzzfeed.com',
  'huffpost.com',
  // Social media (not authoritative)
  'reddit.com',
  'twitter.com',
  'facebook.com',
  'tiktok.com',
] as const

/**
 * Trust level labels for display
 */
export const TRUST_LABELS: Record<TrustQuality, string> = {
  high: 'High Trust',
  medium: 'Medium Trust',
  low: 'Verify Manually',
} as const

/**
 * Trust level colors for styling
 */
export const TRUST_COLORS: Record<TrustQuality, { bg: string; text: string }> = {
  high: { bg: 'bg-emerald-900/50', text: 'text-emerald-300' },
  medium: { bg: 'bg-amber-900/50', text: 'text-amber-300' },
  low: { bg: 'bg-gray-700', text: 'text-gray-400' },
} as const

// ============================================================================
// VERIFICATION STATUS
// ============================================================================

/**
 * Icons for claim verification status
 */
export const STATUS_ICONS = {
  verified: '✓',
  false: '✗',
  unconfirmed: '?',
  opinion: '○',
} as const

/**
 * Colors for claim verification status
 */
export const STATUS_COLORS = {
  verified: 'text-emerald-400',
  false: 'text-red-400',
  unconfirmed: 'text-amber-400',
  opinion: 'text-blue-400',
} as const

/**
 * Border colors for claim cards
 */
export const STATUS_BORDER_COLORS = {
  verified: 'border-l-emerald-500',
  false: 'border-l-red-500',
  unconfirmed: 'border-l-amber-500',
  opinion: 'border-l-blue-500',
} as const

// ============================================================================
// LOADING FACTS
// ============================================================================

/**
 * Fun facts shown during loading states
 * Rotated randomly to keep users engaged
 * 
 * Educates users about AI reliability and search best practices
 */
export const LOADING_FACTS = [
  // AI Hallucination Facts
  'Did you know? AI models can hallucinate up to 20% of facts they generate.',
  'Interesting: AI hallucinations most commonly occur with specific dates, statistics, and citations.',
  'Did you know? Even top AI models make up fake sources that sound real.',
  // Search Engine History
  'Fun fact: Google processes over 8.5 billion searches per day.',
  'Did you know? The first AI program was written in 1951.',
  'Fun fact: The term "artificial intelligence" was coined in 1956.',
  // Verification Best Practices
  'Did you know? Cross-referencing 3+ sources reduces misinformation by 73%.',
  'Pro tip: .edu and .gov sources are considered most reliable worldwide.',
  'Fun fact: Wikipedia can be edited by anyone but requires citations.',
  // Trust Paradigm Shift
  'Interesting: Safari searches declined for the first time ever in April 2025.',
  'Did you know? Traditional search shows 10 links. AI search shows 1 answer.',
  'Fun fact: The average person cannot distinguish AI-generated text from human writing.',
  // Trustie Value Proposition
  'Did you know? Trustie verifies claims against multiple independent sources.',
  'Pro tip: Always verify AI claims that include specific numbers or dates.',
  'Interesting: Critical thinking is more important than ever in the age of AI.',
  // Search Engine Reliability
  'Did you know? Google Scholar is the gold standard for academic search.',
  'Fun fact: PubMed indexes over 35 million medical research articles.',
  'Interesting: DuckDuckGo uses 400+ sources including Bing and Wikipedia.',
  // Modern Problems
  'Warning: SEO spam has increased significantly since 2019.',
  'Did you know? Content farms often rank higher than expert sources.',
  'Pro tip: Filter bubbles can limit what information you see online.',
] as const

// ============================================================================
// AI CATEGORIES (DISCOVER TAB)
// ============================================================================

/**
 * Categories for AI discovery/comparison
 * Will be populated with real data from user verifications
 */
export const AI_CATEGORIES: readonly AICategory[] = [
  {
    name: 'Coding',
    icon: '💻',
    description: 'Best AIs for programming and development',
    ais: ['Claude', 'ChatGPT', 'Copilot'],
  },
  {
    name: 'Research',
    icon: '🔬',
    description: 'Best AIs for academic and scientific research',
    ais: ['Perplexity', 'Claude', 'ChatGPT'],
  },
  {
    name: 'Writing',
    icon: '✍️',
    description: 'Best AIs for content creation and copywriting',
    ais: ['Claude', 'ChatGPT', 'Gemini'],
  },
  {
    name: 'Math',
    icon: '🔢',
    description: 'Best AIs for calculations and problem solving',
    ais: ['ChatGPT', 'Claude', 'Wolfram'],
  },
  {
    name: 'Creative',
    icon: '🎨',
    description: 'Best AIs for brainstorming and ideation',
    ais: ['Claude', 'ChatGPT', 'Gemini'],
  },
  {
    name: 'Business',
    icon: '💼',
    description: 'Best AIs for business strategy and analysis',
    ais: ['ChatGPT', 'Claude', 'Perplexity'],
  },
  {
    name: 'Legal',
    icon: '⚖️',
    description: 'Best AIs for legal research (not advice)',
    ais: ['Claude', 'ChatGPT', 'Perplexity'],
  },
  {
    name: 'Health',
    icon: '🏥',
    description: 'Best AIs for health information (not diagnosis)',
    ais: ['ChatGPT', 'Claude', 'Perplexity'],
  },
  {
    name: 'Education',
    icon: '📚',
    description: 'Best AIs for learning and tutoring',
    ais: ['ChatGPT', 'Claude', 'Khanmigo'],
  },
  {
    name: 'Customer Service',
    icon: '💬',
    description: 'Best AIs for support and chat',
    ais: ['ChatGPT', 'Claude', 'Intercom'],
  },
] as const

// ============================================================================
// UI CONFIGURATION
// ============================================================================

/**
 * Tab configuration for main navigation
 */
export const TABS = [
  { id: 'search', label: '🔍 Search', ariaLabel: 'Search for trusted information' },
  { id: 'check', label: '✓ Check AI', ariaLabel: 'Verify AI-generated content' },
  { id: 'discover', label: '🧭 Discover AIs', ariaLabel: 'Discover best AIs by category' },
  { id: 'feedback', label: '💬 Feedback', ariaLabel: 'Share your feedback' },
  { id: 'about', label: 'ℹ️ About', ariaLabel: 'Learn about Trustie' },
] as const

/**
 * Settings tab configuration
 */
export const SETTINGS_TABS = [
  { id: 'general', label: 'General' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'about', label: 'About' },
] as const

// ============================================================================
// QUERY TYPE DETECTION (Smart routing like Google)
// ============================================================================

/**
 * Keywords that indicate academic/research queries
 * Route to Google Scholar-style verification
 */
export const ACADEMIC_KEYWORDS = [
  'study', 'research', 'paper', 'journal', 'peer-reviewed',
  'scientific', 'experiment', 'hypothesis', 'thesis', 'dissertation',
  'published', 'citation', 'methodology', 'data', 'analysis',
  'university', 'professor', 'academic', 'scholar',
] as const

/**
 * Keywords that indicate medical/health queries
 * Route to PubMed-style verification (extra caution)
 */
export const MEDICAL_KEYWORDS = [
  'symptom', 'disease', 'treatment', 'medication', 'drug',
  'diagnosis', 'doctor', 'medical', 'health', 'condition',
  'clinical', 'therapy', 'patient', 'surgery', 'prescription',
  'side effect', 'dosage', 'vaccine', 'cancer', 'diabetes',
] as const

/**
 * Keywords that indicate math/computation queries
 * Route to Wolfram Alpha-style verification (zero tolerance for error)
 */
export const MATH_KEYWORDS = [
  'calculate', 'equation', 'formula', 'solve', 'math',
  'algebra', 'calculus', 'geometry', 'statistics', 'probability',
  'integral', 'derivative', 'function', 'variable', 'coefficient',
  'sum', 'product', 'average', 'median', 'percentage',
] as const

/**
 * Keywords that indicate legal queries
 * Route with disclaimer about not being legal advice
 */
export const LEGAL_KEYWORDS = [
  'law', 'legal', 'court', 'judge', 'attorney', 'lawyer',
  'statute', 'regulation', 'contract', 'liability', 'lawsuit',
  'rights', 'constitutional', 'criminal', 'civil', 'jurisdiction',
] as const

/**
 * Keywords that indicate financial queries
 * Route with disclaimer about not being financial advice
 */
export const FINANCIAL_KEYWORDS = [
  'stock', 'invest', 'market', 'portfolio', 'dividend',
  'bond', 'mutual fund', 'etf', 'retirement', '401k',
  'ira', 'tax', 'capital gains', 'crypto', 'bitcoin',
] as const

// ============================================================================
// ACCESSIBILITY FEATURES
// ============================================================================

/**
 * Text-to-speech configuration
 */
export const TTS_CONFIG = {
  defaultRate: 1.0,
  minRate: 0.5,
  maxRate: 2.0,
  defaultPitch: 1.0,
  defaultVolume: 1.0,
} as const

/**
 * Professional writing mode (removes contractions)
 */
export const CONTRACTION_MAP: Record<string, string> = {
  "won't": "will not",
  "can't": "cannot",
  "don't": "do not",
  "doesn't": "does not",
  "didn't": "did not",
  "isn't": "is not",
  "aren't": "are not",
  "wasn't": "was not",
  "weren't": "were not",
  "haven't": "have not",
  "hasn't": "has not",
  "hadn't": "had not",
  "couldn't": "could not",
  "wouldn't": "would not",
  "shouldn't": "should not",
  "mustn't": "must not",
  "I'm": "I am",
  "you're": "you are",
  "he's": "he is",
  "she's": "she is",
  "it's": "it is",
  "we're": "we are",
  "they're": "they are",
  "I've": "I have",
  "you've": "you have",
  "we've": "we have",
  "they've": "they have",
  "I'd": "I would",
  "you'd": "you would",
  "he'd": "he would",
  "she'd": "she would",
  "we'd": "we would",
  "they'd": "they would",
  "I'll": "I will",
  "you'll": "you will",
  "he'll": "he will",
  "she'll": "she will",
  "we'll": "we will",
  "they'll": "they will",
  "there's": "there is",
  "here's": "here is",
  "who's": "who is",
  "what's": "what is",
  "where's": "where is",
  "when's": "when is",
  "why's": "why is",
  "how's": "how is",
  "that's": "that is",
  "let's": "let us",
} as const

// ============================================================================
// TIMING & LIMITS
// ============================================================================

/**
 * Debounce delay for search input (milliseconds)
 */
export const SEARCH_DEBOUNCE_MS = 300 as const

/**
 * Rankings refresh interval (milliseconds)
 */
export const RANKINGS_REFRESH_MS = 30000 as const

/**
 * Maximum number of sources to display
 */
export const MAX_SOURCES_DISPLAY = 5 as const

/**
 * Number of uses before showing email popup
 */
export const EMAIL_POPUP_THRESHOLD = 3 as const

/**
 * Copy confirmation display duration (milliseconds)
 */
export const COPY_CONFIRMATION_MS = 2000 as const

/**
 * Feedback submitted confirmation duration (milliseconds)
 */
export const FEEDBACK_CONFIRMATION_MS = 3000 as const

// ============================================================================
// API CONFIGURATION
// ============================================================================

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  search: '/api/search',
  verify: '/api/verify',
  rephrase: '/api/rephrase',
  rankings: '/api/rankings',
} as const

/**
 * API retry configuration
 */
export const API_RETRY_CONFIG = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
} as const

// ============================================================================
// VALIDATION LIMITS
// ============================================================================

/**
 * Input validation limits
 */
export const INPUT_LIMITS = {
  /** Maximum length for search queries */
  maxSearchLength: 500,
  /** Maximum length for AI output to verify */
  maxVerifyLength: 10000,
  /** Maximum length for feedback */
  maxFeedbackLength: 2000,
  /** Maximum length for custom AI name */
  maxCustomAILength: 50,
  /** Maximum length for display name */
  maxDisplayNameLength: 100,
  /** Maximum length for email */
  maxEmailLength: 254,
} as const

// ============================================================================
// LOCAL STORAGE KEYS
// ============================================================================

/**
 * Keys for localStorage items
 */
export const STORAGE_KEYS = {
  darkMode: 'trustie_darkMode',
  displayName: 'trustie_displayName',
  emailSubmitted: 'trustie_emailSubmitted',
  useCount: 'trustie_useCount',
  appearanceMode: 'trustie_appearanceMode',
  // New accessibility features
  readAloudEnabled: 'trustie_readAloudEnabled',
  readAloudRate: 'trustie_readAloudRate',
  professionalMode: 'trustie_professionalMode', // No contractions
  // Search preferences
  preferredSources: 'trustie_preferredSources',
  showSourceDetails: 'trustie_showSourceDetails',
} as const

// ============================================================================
// SEARCH ENGINE RANKINGS (from your research)
// ============================================================================

/**
 * Top 10 search engines worldwide (2025-2026)
 * For reference and potential future integrations
 */
export const SEARCH_ENGINE_RANKINGS = [
  { rank: 1, name: 'Google', marketShare: '~90%', strength: 'Best ranking algorithm (PageRank)' },
  { rank: 2, name: 'Bing', marketShare: '~3%', strength: 'Structured data, factual queries' },
  { rank: 3, name: 'Yandex', marketShare: '~1.5%', strength: 'Russia/Eastern Europe' },
  { rank: 4, name: 'Yahoo!', marketShare: '~1%', strength: 'Portal legacy' },
  { rank: 5, name: 'DuckDuckGo', marketShare: '~0.5%', strength: 'Privacy, no filter bubbles' },
  { rank: 6, name: 'Baidu', marketShare: '~0.5%', strength: 'China dominant' },
  { rank: 7, name: 'Brave Search', marketShare: '<0.5%', strength: 'Privacy-first' },
  { rank: 8, name: 'ChatGPT Search', marketShare: 'Growing', strength: 'AI synthesis' },
  { rank: 9, name: 'Perplexity', marketShare: 'Growing', strength: 'AI with citations' },
  { rank: 10, name: 'YouTube', marketShare: 'Video search', strength: 'How-tos, tutorials' },
] as const

/**
 * Specialty search engines (domain-specific reliability)
 */
export const SPECIALTY_SEARCH_ENGINES = [
  { name: 'Google Scholar', domain: 'Academic', reliability: 'Gold standard' },
  { name: 'PubMed', domain: 'Medical research', reliability: 'Gold standard' },
  { name: 'Wolfram Alpha', domain: 'Math/Science', reliability: 'Zero hallucinations' },
  { name: 'Wikipedia', domain: 'General facts', reliability: 'High (with citations)' },
] as const

// ============================================================================
// MODERN SEARCH PROBLEMS (what Trustie solves)
// ============================================================================

/**
 * Problems with current search/AI landscape that Trustie addresses
 */
export const PROBLEMS_WE_SOLVE = [
  {
    problem: 'AI Hallucinations',
    description: 'AI models confidently state false information',
    solution: 'Verify every claim against real sources',
  },
  {
    problem: 'SEO Spam',
    description: 'Low-quality content farms outrank experts',
    solution: 'Prioritize .edu, .gov, peer-reviewed sources',
  },
  {
    problem: 'Filter Bubbles',
    description: 'Personalization limits diverse perspectives',
    solution: 'Show all perspectives with source quality ratings',
  },
  {
    problem: 'Commercial Bias',
    description: 'Ads and sponsored content mixed with results',
    solution: 'No ads, pure verification focus',
  },
  {
    problem: 'No Transparency',
    description: 'AI gives answers without showing sources',
    solution: 'Always show sources for every claim',
  },
  {
    problem: 'Citation Fabrication',
    description: 'AI invents fake academic citations',
    solution: 'Verify citations against real databases',
  },
] as const

// ============================================================================
// ACCESSIBILITY
// ============================================================================

/**
 * ARIA live region politeness levels
 */
export const ARIA_LIVE = {
  polite: 'polite',
  assertive: 'assertive',
  off: 'off',
} as const

/**
 * Focus trap configuration
 */
export const FOCUS_TRAP_CONFIG = {
  initialFocus: false,
  returnFocusOnDeactivate: true,
  escapeDeactivates: true,
} as const
