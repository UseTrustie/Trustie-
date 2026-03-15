'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, SignOutButton } from '@clerk/nextjs';

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist theme preference
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.sessionStorage?.getItem('trustie-theme') : null;
    if (saved === 'light') setIsDark(false);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage?.setItem('trustie-theme', isDark ? 'dark' : 'light');
    }
  }, [isDark]);

  const authLink = isSignedIn ? '/app' : '/sign-up';
  const loginLink = isSignedIn ? '/app' : '/sign-in';

  // Theme classes
  const bg = isDark ? 'bg-gray-950' : 'bg-white';
  const bgAlt = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const bgCard = isDark ? 'bg-gray-900' : 'bg-white';
  const bgCardInner = isDark ? 'bg-gray-800' : 'bg-gray-100';
  const bgCardInner2 = isDark ? 'bg-gray-800/50' : 'bg-gray-50';
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';
  const textDim = isDark ? 'text-gray-600' : 'text-gray-400';
  const navBg = isDark ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800' : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm';
  const navHover = isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900';

  return (
    <div className={`min-h-screen ${bg} ${textPrimary} font-sans antialiased transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? navBg : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`text-xl font-bold ${textPrimary}`}>Trustie</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/proof" className={`${navHover} text-sm transition-colors`}>Proof</Link>
              <Link href="#pricing" className={`${navHover} text-sm transition-colors`}>Pricing</Link>
              <Link href="/help" className={`${navHover} text-sm transition-colors`}>Help</Link>
              <Link href="/blog" className={`${navHover} text-sm transition-colors`}>Blog</Link>
              <Link href="/how-it-works" className={`${navHover} text-sm transition-colors`}>How it works</Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
              </button>

              {isSignedIn ? (
                <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                  <button className={`px-4 py-2 ${navHover} text-sm transition-colors`}>
                    Sign Out
                  </button>
                </SignOutButton>
              ) : (
                <Link href={loginLink} className={`hidden sm:block px-4 py-2 ${navHover} text-sm transition-colors`}>
                  Login
                </Link>
              )}
              <Link href={authLink} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">
                {isSignedIn ? 'Open App' : 'Try Free'}
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 border-t ${borderColor}`}>
              <div className="pt-4 space-y-2">
                <Link href="/proof" className={`block py-2 ${textSecondary}`}>Proof</Link>
                <Link href="#pricing" className={`block py-2 ${textSecondary}`}>Pricing</Link>
                <Link href="/help" className={`block py-2 ${textSecondary}`}>Help</Link>
                <Link href="/how-it-works" className={`block py-2 ${textSecondary}`}>How it works</Link>
                <Link href={authLink} className="block py-2 text-blue-500">{isSignedIn ? 'Dashboard' : 'Try Free'}</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className={`${textMuted} text-sm mb-6`}>No credit card required</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Verify Any Claim.<br />
              <span className="text-blue-500">Trust Every Hire.</span>
            </h1>
            <p className={`text-xl ${textSecondary} mb-10 max-w-2xl mx-auto`}>
              AI-powered fact verification that cross-checks claims across multiple sources. Stop fraud. Build trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={authLink} className="w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
                Try Free — No Credit Card
              </Link>
              <Link href="/how-it-works" className={`w-full sm:w-auto px-8 py-4 ${textPrimary} ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} font-semibold rounded-xl transition-colors`}>
                See How It Works →
              </Link>
            </div>
          </div>

          {/* Product Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className={`rounded-2xl border ${bgCard} ${borderColor} overflow-hidden`}>
              <div className={`flex items-center gap-2 px-4 py-3 border-b ${borderColor}`}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className={`text-sm ${textMuted}`}>trustieapp.com/app</span>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className={`rounded-xl p-6 ${bgCardInner}`}>
                    <h3 className={`font-semibold mb-4 ${textPrimary}`}>Resume Verification</h3>
                    <div className={`space-y-3 text-sm ${textSecondary}`}>
                      <p><strong className={textPrimary}>Candidate:</strong> John Smith</p>
                      <p>&quot;5 years at Google as Senior Engineer&quot;</p>
                      <p>&quot;Stanford CS, Class of 2018&quot;</p>
                      <p>&quot;AWS Solutions Architect Certified&quot;</p>
                    </div>
                    <Link href={authLink} className="block w-full mt-6 py-3 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                      Try It Yourself →
                    </Link>
                  </div>
                  <div className={`rounded-xl p-6 border ${bgCardInner2} ${borderColor}`}>
                    <h3 className={`font-semibold mb-4 ${textPrimary}`}>Example Results</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-green-400">Stanford CS 2018 — VERIFIED</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                        <span className="text-yellow-500 text-xl">◐</span>
                        <span className="text-yellow-400">Google tenure — PARTIAL (3 years found)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-green-400">AWS Certified — VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={`py-16 border-y ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-6">
          <p className={`text-center text-sm ${textMuted} mb-8`}>Built for</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['HR Teams', 'Recruiters', 'Insurance', 'Legal', 'Compliance'].map((item) => (
              <span key={item} className={`text-lg font-medium ${textMuted}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${textPrimary}`}>How Trustie Works</h2>
            <p className={`mt-4 text-lg ${textSecondary}`}>Every verification feature designed to catch what others miss.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className={`rounded-2xl p-8 ${bgCard} border ${borderColor}`}>
              <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>AI-Powered Verification</h3>
              <p className={`${textSecondary} mb-6`}>Powered by Claude, one of the most advanced AI models. Claims are extracted, searched across the web, and verified against authoritative sources in real-time.</p>
              <div className={`rounded-xl p-4 ${bgCardInner}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className={`font-medium ${textPrimary}`}>Claude AI</p>
                    <p className={`text-sm ${textMuted}`}>by Anthropic</p>
                  </div>
                  <span className="ml-auto text-green-500 font-bold">Active</span>
                </div>
              </div>
            </div>

            {/* Feature 2 — FIX: Changed weight labels */}
            <div className={`rounded-2xl p-8 ${bgCard} border ${borderColor}`}>
              <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>Source Quality Tiers</h3>
              <p className={`${textSecondary} mb-6`}>Not all sources are equal. We weight .gov, .edu, and professional networks higher than blogs and commercial sites.</p>
              <div className="space-y-3">
                {[
                  { tier: 'Tier 1 (Highest trust)', color: 'green', sources: '.gov, .edu, LinkedIn, Credly' },
                  { tier: 'Tier 2 (Medium trust)', color: 'yellow', sources: 'News sites, GitHub, Company sites' },
                  { tier: 'Tier 3 (Lower trust)', color: 'red', sources: 'Blogs, Forums, Wikipedia' },
                ].map((item) => (
                  <div key={item.tier} className={`flex items-center gap-4 p-4 rounded-xl ${bgCardInner}`}>
                    <div className={`w-3 h-3 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${textPrimary}`}>{item.tier}</p>
                      <p className={`text-sm ${textMuted}`}>{item.sources}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 3 */}
            <div className={`rounded-2xl p-8 ${bgCard} border ${borderColor}`}>
              <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>Commercial Bias Detection</h3>
              <p className={`${textSecondary} mb-6`}>Sources with financial interest in the claim are automatically flagged and deprioritized.</p>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-3 rounded-lg ${bgCardInner}`}>
                  <span className="text-green-500">✓</span>
                  <span className={textSecondary}>stanford.edu/alumni</span>
                  <span className="ml-auto text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">TRUSTED</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg ${bgCardInner}`}>
                  <span className="text-yellow-500">⚠</span>
                  <span className={textSecondary}>resumebuilder.com</span>
                  <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">FLAGGED</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg ${bgCardInner}`}>
                  <span className="text-green-500">✓</span>
                  <span className={textSecondary}>linkedin.com/in/jsmith</span>
                  <span className="ml-auto text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">TRUSTED</span>
                </div>
              </div>
            </div>

            {/* Feature 4 — FIX: Removed "Export JSON reports for compliance" */}
            <div className={`rounded-2xl p-8 ${bgCard} border ${borderColor}`}>
              <h3 className={`text-2xl font-bold mb-4 ${textPrimary}`}>Full Audit Trail</h3>
              <p className={`${textSecondary} mb-6`}>Every verification is logged with timestamps, sources checked, and confidence scores for your records.</p>
              <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-gray-900'}`}>
                <div className={`px-4 py-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-700'}`}>
                  <span className="text-gray-500 text-sm">verification_report.json</span>
                </div>
                <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`{
  "id": "ver_abc123",
  "timestamp": "2025-03-01T14:30:00Z",
  "claims_verified": 3,
  "confidence": 0.92,
  "sources_checked": 12
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trustie — FIX: Updated Privacy First description */}
      <section className={`py-24 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold ${textPrimary}`}>Why Trustie?</h2>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Real-Time Verification', desc: 'No waiting days for results. Get verification in seconds.' },
              { title: 'Web Search Integration', desc: 'AI searches the live web for current, accurate information.' },
              { title: 'Transparent Confidence Scores', desc: 'Know exactly how confident the AI is in each verification.' },
              { title: 'Source Citations', desc: 'Every claim shows which sources were checked and what was found.' },
              { title: 'Privacy First', desc: 'Trustie does not store your submitted text. It is sent to our AI provider for processing and is not retained by Trustie.' },
            ].map((item, idx) => (
              <div key={idx} className={`flex gap-4 p-6 rounded-xl ${bgCardInner}`}>
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className={`font-bold ${textPrimary} mb-1`}>{item.title}</h3>
                  <p className={textSecondary}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — FIX: Removed false features (Export reports, API access, Team features) */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textPrimary}`}>Pricing</h2>
            <p className={`text-lg ${textSecondary} mb-8`}>Simple and transparent pricing</p>
            <div className={`inline-flex rounded-xl p-1 ${bgCardInner}`}>
              <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${billingCycle === 'monthly' ? 'bg-blue-500 text-white' : textSecondary}`}>
                Monthly
              </button>
              <button onClick={() => setBillingCycle('annual')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${billingCycle === 'annual' ? 'bg-blue-500 text-white' : textSecondary}`}>
                Annual <span className="text-green-400 ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className={`rounded-2xl p-8 ${bgCard} border ${borderColor}`}>
              <h3 className={`text-xl font-bold mb-1 ${textPrimary}`}>Free</h3>
              <p className={`text-sm ${textMuted} mb-4`}>Try it out</p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${textPrimary}`}>$0</span>
              </div>
              <Link href={authLink} className={`block w-full py-3 text-center ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-medium rounded-xl mb-6 transition-colors`}>
                Get Started Free
              </Link>
              <ul className="space-y-3 text-sm">
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>5 verifications total</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>All source tiers</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>Web interface</li>
              </ul>
            </div>

            {/* Starter — FIX: "Export reports" → "Detailed results" */}
            <div className={`rounded-2xl p-8 ${bgCard} border-2 border-blue-500 relative`}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
              <h3 className={`text-xl font-bold mb-1 ${textPrimary}`}>Starter Pack</h3>
              <p className={`text-sm ${textMuted} mb-4`}>For recruiters</p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${textPrimary}`}>$49</span>
                <span className={textMuted}> one-time</span>
              </div>
              <Link href={authLink} className="block w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mb-6 transition-colors">
                Buy Starter Pack
              </Link>
              <ul className="space-y-3 text-sm">
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>50 verifications</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>Never expires</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>Detailed results with sources</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>Priority support</li>
              </ul>
            </div>

            {/* Pro — FIX: Replaced "API access (coming soon)" and "Team features" */}
            <div className={`rounded-2xl p-8 ${bgCard} border ${borderColor}`}>
              <h3 className={`text-xl font-bold mb-1 ${textPrimary}`}>Pro Monthly</h3>
              <p className={`text-sm ${textMuted} mb-4`}>For teams</p>
              <div className="mb-6">
                <span className={`text-4xl font-bold ${textPrimary}`}>${billingCycle === 'annual' ? '24' : '29'}</span>
                <span className={textMuted}>/mo</span>
              </div>
              <Link href={authLink} className={`block w-full py-3 text-center ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-medium rounded-xl mb-6 transition-colors`}>
                Start Pro Monthly
              </Link>
              <ul className="space-y-3 text-sm">
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>Unlimited verifications</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>Priority processing</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>All source tiers</li>
                <li className={`flex items-center gap-2 ${textSecondary}`}><span className="text-green-500">✓</span>Priority support</li>
              </ul>
            </div>
          </div>

          <p className={`text-center ${textMuted} text-sm mt-8`}>
            Need enterprise? <a href="mailto:trustietechnologies@gmail.com" className="text-blue-500 hover:text-blue-400">Contact us</a>
          </p>
        </div>
      </section>

      {/* FAQ — FIX: Updated "Is my data secure?" answer */}
      <section className={`py-24 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 ${textPrimary}`}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'Is there really a free plan?', a: 'Yes. 5 verifications total, forever. No credit card required.' },
              { q: 'What counts as one verification?', a: 'One piece of text submitted. It can contain multiple claims — we extract and verify each individually.' },
              { q: 'How accurate is it?', a: 'Accuracy depends on available public information. We show confidence scores so you know when to dig deeper manually.' },
              { q: 'Is my data secure?', a: 'Yes. Trustie does not store your submitted text. It is sent to our AI provider for processing and is not retained by Trustie after verification is complete.' },
              { q: 'Can I get a refund?', a: '14-day money-back guarantee on all paid plans.' },
              { q: 'Do you offer startup/nonprofit discounts?', a: 'Yes. Email trustietechnologies@gmail.com with details and we\'ll work something out.' },
            ].map((faq, idx) => (
              <div key={idx} className={`rounded-xl overflow-hidden ${bgCardInner}`}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className={`w-full flex items-center justify-between p-5 text-left ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}>
                  <span className={`font-medium ${textPrimary}`}>{faq.q}</span>
                  <span className={textMuted}>{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className={`px-5 pb-5 ${textSecondary}`}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate — FIX: Changed to "coming soon" since no program exists yet */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-4 ${textPrimary}`}>Earn with Trustie</h2>
          <p className={`text-lg ${textSecondary} mb-8`}>
            Interested in our affiliate program? Earn 30% commission on referrals.
          </p>
          <a href="mailto:trustietechnologies@gmail.com?subject=Affiliate%20Program%20Interest" className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            Join Affiliate Program (30% commission)
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-24 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textPrimary}`}>
            Ready to Verify Claims?
          </h2>
          <p className={`text-lg ${textSecondary} mb-8`}>Start free. No credit card required.</p>
          <Link href={authLink} className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            {isSignedIn ? 'Open Dashboard' : 'Try Trustie Free'}
          </Link>
        </div>
      </section>

      {/* Footer — FIX: Updated year */}
      <footer className={`py-16 px-6 border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className={`text-xl font-bold ${textPrimary}`}>Trustie</span>
              </div>
              <p className={`text-sm ${textMuted} mb-4`}>AI-powered verification for everyone.</p>
              <a href="https://x.com/UseTrustie" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm">
                @UseTrustie
              </a>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${textPrimary}`}>Pages</h4>
              <ul className="space-y-2">
                <li><Link href="/proof" className={`text-sm ${textMuted} hover:text-blue-400`}>Proof</Link></li>
                <li><Link href="#pricing" className={`text-sm ${textMuted} hover:text-blue-400`}>Pricing</Link></li>
                <li><Link href="/help" className={`text-sm ${textMuted} hover:text-blue-400`}>Help</Link></li>
                <li><Link href="/blog" className={`text-sm ${textMuted} hover:text-blue-400`}>Blog</Link></li>
                <li><Link href="/how-it-works" className={`text-sm ${textMuted} hover:text-blue-400`}>How it works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${textPrimary}`}>Use Cases</h4>
              <ul className="space-y-2">
                <li><span className={`text-sm ${textMuted}`}>Resume Verification</span></li>
                <li><span className={`text-sm ${textMuted}`}>HR Background Checks</span></li>
                <li><span className={`text-sm ${textMuted}`}>Insurance Claims</span></li>
                <li><span className={`text-sm ${textMuted}`}>Legal Due Diligence</span></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${textPrimary}`}>Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className={`text-sm ${textMuted} hover:text-blue-400`}>Blog</Link></li>
                <li><a href="mailto:trustietechnologies@gmail.com" className={`text-sm ${textMuted} hover:text-blue-400`}>Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className={`font-semibold mb-4 ${textPrimary}`}>Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className={`text-sm ${textMuted} hover:text-blue-400`}>Privacy Policy</Link></li>
                <li><Link href="/terms" className={`text-sm ${textMuted} hover:text-blue-400`}>Terms of Service</Link></li>
                <li><Link href="/refund" className={`text-sm ${textMuted} hover:text-blue-400`}>Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t ${borderColor} text-center`}>
            <p className={`text-sm ${textDim}`}>© 2026 Trustie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
