'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ============================================================================
// HELP PAGE - Interview Coder Style with Trustie Branding
// ============================================================================

const helpSections = {
  'getting-started': {
    title: 'Getting Started',
    content: 'GettingStarted',
  },
  'how-it-works': {
    title: 'How It Works',
    content: 'HowItWorks',
  },
  'verification-types': {
    title: 'Verification Types',
    content: 'VerificationTypes',
  },
  'api-documentation': {
    title: 'API Documentation',
    content: 'APIDocumentation',
  },
  'accuracy-sources': {
    title: 'Accuracy & Sources',
    content: 'AccuracySources',
  },
  'team-features': {
    title: 'Team Features',
    content: 'TeamFeatures',
  },
  'common-issues': {
    title: 'Common Issues',
    content: 'CommonIssues',
  },
  'billing-plans': {
    title: 'Billing & Plans',
    content: 'BillingPlans',
  },
};

export default function HelpPage() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('getting-started');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Keyboard shortcut for search (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('help-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-slate-100 text-gray-900'}`}>
      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold">Trustie</span>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsDark(!isDark)} className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className={`absolute left-0 top-0 bottom-0 w-72 ${isDark ? 'bg-gray-900' : 'bg-white'} pt-16 overflow-y-auto`}>
            <Sidebar isDark={isDark} activeSection={activeSection} setActiveSection={(s) => { setActiveSection(s); setMobileMenuOpen(false); }} searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchFocused={searchFocused} setSearchFocused={setSearchFocused} />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-72 border-r ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <Sidebar isDark={isDark} activeSection={activeSection} setActiveSection={setActiveSection} searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchFocused={searchFocused} setSearchFocused={setSearchFocused} setIsDark={setIsDark} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {activeSection === 'getting-started' && <GettingStarted isDark={isDark} />}
            {activeSection === 'how-it-works' && <HowItWorks isDark={isDark} />}
            {activeSection === 'verification-types' && <VerificationTypes isDark={isDark} />}
            {activeSection === 'api-documentation' && <APIDocumentation isDark={isDark} />}
            {activeSection === 'accuracy-sources' && <AccuracySources isDark={isDark} />}
            {activeSection === 'team-features' && <TeamFeatures isDark={isDark} />}
            {activeSection === 'common-issues' && <CommonIssues isDark={isDark} />}
            {activeSection === 'billing-plans' && <BillingPlans isDark={isDark} />}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// SIDEBAR
// ============================================================================

function Sidebar({ isDark, activeSection, setActiveSection, searchQuery, setSearchQuery, searchFocused, setSearchFocused, setIsDark }: any) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trustie</span>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className={`relative flex items-center rounded-xl border transition-colors ${searchFocused ? 'border-blue-500' : isDark ? 'border-gray-700' : 'border-gray-300'} ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <svg className={`w-4 h-4 ml-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            id="help-search"
            type="text"
            placeholder="Search documentation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full px-3 py-2.5 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
          />
          <div className={`flex items-center gap-1 mr-3 px-1.5 py-0.5 rounded text-xs ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Sign In Button */}
      <div className="px-4 pb-6">
        <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Trustie
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {/* General */}
        <div className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>General</h3>
          <ul className="space-y-1">
            {['getting-started', 'how-it-works', 'verification-types', 'api-documentation'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section ? isDark ? 'bg-blue-500/10 text-blue-400 font-medium' : 'bg-blue-50 text-blue-600 font-medium' : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {helpSections[section as keyof typeof helpSections].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Features</h3>
          <ul className="space-y-1">
            {['accuracy-sources', 'team-features'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section ? isDark ? 'bg-blue-500/10 text-blue-400 font-medium' : 'bg-blue-50 text-blue-600 font-medium' : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {helpSections[section as keyof typeof helpSections].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Troubleshooting */}
        <div className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Troubleshooting</h3>
          <ul className="space-y-1">
            {['common-issues', 'billing-plans'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeSection === section ? isDark ? 'bg-blue-500/10 text-blue-400 font-medium' : 'bg-blue-50 text-blue-600 font-medium' : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {helpSections[section as keyof typeof helpSections].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="mb-6">
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Support</h3>
          <div className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <a href="mailto:trustietechnologies@gmail.com" className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              trustietechnologies@gmail.com
            </a>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>© 2026 Trustie.<br />All rights reserved.</p>
          {setIsDark && (
            <button onClick={() => setIsDark(!isDark)} className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONTENT SECTIONS
// ============================================================================

function GettingStarted({ isDark }: { isDark: boolean }) {
  const steps = [
    { number: 1, title: 'Request a Demo', description: 'Schedule a personalized demo with our team', link: '/#pricing', linkText: 'Request Demo' },
    { number: 2, title: 'Create Your Account', description: 'Sign up for Trustie and set up your team workspace' },
    { number: 3, title: 'Invite Your Team', description: 'Add team members and assign roles (Admin, Verifier, Viewer)' },
    { number: 4, title: 'Connect Your ATS', description: 'Integrate with Greenhouse, Lever, Workday, or use our API', link: '#api-documentation', linkText: 'API Docs' },
    { number: 5, title: 'Upload Your First Resume', description: 'Drag and drop a resume or paste candidate claims directly' },
    { number: 6, title: 'Review Verification Results', description: 'Get instant results with confidence scores and source links' },
    { number: 7, title: 'Export Reports', description: 'Download PDF reports for compliance and hiring decisions' },
    { number: 8, title: 'Start Hiring with Confidence', description: 'Make informed decisions backed by verified data' },
  ];

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Getting Started</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Welcome to Trustie. This guide will help you get up and running quickly.</p>

      {/* Quick Start Guide */}
      <div className={`rounded-2xl p-8 mb-10 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Start Guide</h2>
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                {step.number}
              </div>
              <div className="flex-1 pt-0.5">
                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {step.description}
                  {step.link && (
                    <>
                      {' '}
                      <a href={step.link} className="text-blue-500 hover:text-blue-400 transition-colors">{step.linkText}</a>
                    </>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use Video */}
      <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>How to Use</h2>
        <div className={`aspect-video rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <button className="w-20 h-20 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors mb-4 mx-auto shadow-lg shadow-blue-500/25">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Watch: Inside Trustie 2.0</p>
              <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>See how to verify resumes in 30 seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorks({ isDark }: { isDark: boolean }) {
  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>How It Works</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Trustie uses multi-source verification and AI consensus to validate candidate claims.</p>

      <div className={`rounded-2xl p-8 mb-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Verification Process</h2>
        
        <div className="space-y-8">
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h3 className="text-blue-500 font-semibold mb-2">Step 1: Input</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Upload a resume, paste text, or send data via API. Trustie extracts all verifiable claims automatically.</p>
          </div>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h3 className="text-blue-500 font-semibold mb-2">Step 2: Multi-Source Search</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>We search LinkedIn, university databases, HR records, and public records simultaneously.</p>
          </div>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h3 className="text-blue-500 font-semibold mb-2">Step 3: AI Consensus</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Multiple AI models (GPT-4, Claude, Gemini) cross-reference findings to reduce false positives by 90%.</p>
          </div>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h3 className="text-blue-500 font-semibold mb-2">Step 4: Source Quality Scoring</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>We prioritize .edu, .gov, and verified sources. Commercial or ad-supported sources are flagged.</p>
          </div>
          
          <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <h3 className="text-blue-500 font-semibold mb-2">Step 5: Verdict & Report</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>You receive a human-readable verdict (Verified, Unverified, Partial Match) with confidence scores and source links.</p>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-8 ${isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
        <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Our Promise</h3>
        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>We always show our sources. We never guess. When we are uncertain, we tell you and flag items for manual review.</p>
      </div>
    </div>
  );
}

function VerificationTypes({ isDark }: { isDark: boolean }) {
  const types = [
    { icon: '🎓', title: 'Education', description: 'Degrees, graduation dates, majors, GPA claims, honors, certifications' },
    { icon: '💼', title: 'Employment', description: 'Companies worked at, job titles, employment dates, responsibilities' },
    { icon: '📜', title: 'Certifications', description: 'Professional licenses, industry certifications, training completions' },
    { icon: '🏆', title: 'Achievements', description: 'Awards, publications, patents, speaking engagements' },
    { icon: '🔗', title: 'LinkedIn Profiles', description: 'Cross-reference resume claims against LinkedIn data' },
    { icon: '📰', title: 'Public Records', description: 'News mentions, press releases, public filings' },
  ];

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Verification Types</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Trustie can verify many types of candidate claims.</p>

      <div className="grid md:grid-cols-2 gap-6">
        {types.map((type, index) => (
          <div key={index} className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div className="text-3xl mb-3">{type.icon}</div>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{type.title}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function APIDocumentation({ isDark }: { isDark: boolean }) {
  const codeExample = `// Verify a candidate claim
const response = await fetch('https://api.trustie.io/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    claim: "5 years at Google as Senior Engineer",
    candidate: "John Smith"
  })
});

// Response
{
  "verdict": "PARTIAL_MATCH",
  "confidence": 0.87,
  "findings": [
    { "claim": "Google employment", "status": "VERIFIED", "actual": "3 years" },
    { "claim": "Senior Engineer title", "status": "UNVERIFIED", "actual": "Engineer" }
  ],
  "sources": ["linkedin.com", "google.com/careers"],
  "audit_id": "ver_abc123"
}`;

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>API Documentation</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Integrate Trustie verification into your ATS, HRIS, or custom workflows.</p>

      <div className={`rounded-2xl p-8 mb-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>REST API</h2>
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Our RESTful API accepts JSON requests and returns structured verification results.</p>
        
        <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-900 border border-gray-700' : 'bg-gray-900 border border-gray-200'}`}>
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-500 text-sm ml-2">api-example.js</span>
          </div>
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto"><code>{codeExample}</code></pre>
        </div>
      </div>

      <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>API Features</h2>
        <ul className="space-y-3">
          {['RESTful JSON API', 'Webhook notifications for async results', 'Batch verification (100+ candidates per request)', 'Full audit trail in every response', 'Rate limit: 1000 requests per minute', 'SDKs for Python, Node.js, and Ruby'].map((feature, index) => (
            <li key={index} className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AccuracySources({ isDark }: { isDark: boolean }) {
  const sources = [
    { name: 'LinkedIn', trust: 'High', description: 'Employment history, connections, endorsements' },
    { name: 'University Databases', trust: 'Very High', description: 'Official degree verification' },
    { name: 'HR Records', trust: 'Very High', description: 'Direct employer verification' },
    { name: 'Public Records', trust: 'High', description: 'News, publications, government filings' },
    { name: 'Professional Bodies', trust: 'Very High', description: 'Certification and license verification' },
  ];

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Accuracy & Sources</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>How we achieve 94%+ verification accuracy.</p>

      <div className={`rounded-2xl p-8 mb-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Source Quality Tiers</h2>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{source.name}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{source.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${source.trust === 'Very High' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {source.trust}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Multi-AI Consensus</h2>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>We use multiple AI models to cross-reference findings:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ name: 'GPT-4', acc: '94.2%' }, { name: 'Claude 3.5', acc: '96.1%' }, { name: 'Gemini Pro', acc: '91.8%' }, { name: 'Llama 3.1', acc: '89.4%' }].map((model, index) => (
            <div key={index} className={`p-4 rounded-xl text-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{model.name}</div>
              <div className="text-green-500 font-bold">{model.acc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamFeatures({ isDark }: { isDark: boolean }) {
  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Team Features</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Collaborate with your hiring team on candidate verification.</p>

      <div className="space-y-6">
        {[
          { title: 'Team Dashboard', description: 'View all verifications in one place. Filter by status, date, or team member.' },
          { title: 'Role-Based Access', description: 'Admin, Verifier, and Viewer roles. Control who can run verifications and export reports.' },
          { title: 'Shared Reports', description: 'Share verification reports with hiring managers via secure links.' },
          { title: 'Bulk Upload', description: 'Upload 100+ resumes at once for batch verification.' },
          { title: 'Audit Log', description: 'Full history of who verified what and when. Perfect for compliance.' },
          { title: 'SSO Integration', description: 'Enterprise plans include SAML SSO with Okta, Azure AD, and more.' },
        ].map((feature, index) => (
          <div key={index} className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommonIssues({ isDark }: { isDark: boolean }) {
  const issues = [
    { q: 'Why does a claim show "Unconfirmed"?', a: 'This means we could not find enough sources to verify or refute the claim. It does not mean the claim is false—just that more manual verification may be needed.' },
    { q: 'How do I improve verification accuracy?', a: 'Provide as much context as possible. Full names, company names, and date ranges help us find better matches.' },
    { q: 'Can Trustie verify international credentials?', a: 'Yes, we verify credentials from most countries. Some regions may have limited database access.' },
    { q: 'What if a verification is wrong?', a: 'Click "Report Issue" on any verification. Our team will review and update within 24 hours.' },
    { q: 'How long does verification take?', a: 'Most verifications complete in 30 seconds. Complex cases with many claims may take up to 2 minutes.' },
  ];

  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Common Issues</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Frequently asked questions and troubleshooting tips.</p>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div key={index} className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{issue.q}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{issue.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingPlans({ isDark }: { isDark: boolean }) {
  return (
    <div>
      <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Billing & Plans</h1>
      <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pricing information and billing FAQs.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { name: 'Personal', price: 'Free', features: ['10 verifications per month', 'Basic source citations', 'Web interface'] },
          { name: 'Team', price: '$499/mo', features: ['500 verifications per month', 'Multi-AI consensus', 'Team dashboard (5 seats)', 'API access', 'Priority support'] },
          { name: 'Enterprise', price: 'Custom', features: ['Unlimited verifications', 'Unlimited seats', 'SSO / SAML', 'Dedicated account manager', 'On-premise option'] },
        ].map((plan, index) => (
          <div key={index} className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
            <div className={`text-2xl font-bold mb-4 ${plan.name === 'Team' ? 'text-blue-500' : isDark ? 'text-white' : 'text-gray-900'}`}>{plan.price}</div>
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Billing FAQ</h2>
        <div className="space-y-4">
          {[
            { q: 'How do I upgrade my plan?', a: 'Go to Settings → Billing → Upgrade Plan. Changes take effect immediately.' },
            { q: 'Can I get a refund?', a: 'We offer a 14-day money-back guarantee. Contact support for refund requests.' },
            { q: 'Do unused verifications roll over?', a: 'No, verification credits reset each billing cycle.' },
          ].map((faq, index) => (
            <div key={index}>
              <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ICONS
// ============================================================================

function SunIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>;
}

function MoonIcon() {
  return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>;
}

function MenuIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
}

function XIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
}
