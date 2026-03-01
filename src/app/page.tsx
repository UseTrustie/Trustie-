'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function LandingPage() {
  const { isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const authLink = isSignedIn ? '/app' : '/sign-up';
  const loginLink = isSignedIn ? '/app' : '/sign-in';

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans antialiased">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-950/95 backdrop-blur-md border-b border-gray-800' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Trustie</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/proof" className="text-gray-400 hover:text-white text-sm transition-colors">Proof</Link>
              <Link href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link>
              <Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">Help</Link>
              <Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link>
              <Link href="/how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">How it works</Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href={loginLink} className="hidden sm:block px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors">
                {isSignedIn ? 'Dashboard' : 'Login'}
              </Link>
              <Link href={authLink} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-colors">
                {isSignedIn ? 'Open App' : 'Try Free'}
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center">
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="pt-4 space-y-2">
                <Link href="/proof" className="block py-2 text-gray-300">Proof</Link>
                <Link href="#pricing" className="block py-2 text-gray-300">Pricing</Link>
                <Link href="/help" className="block py-2 text-gray-300">Help</Link>
                <Link href="/how-it-works" className="block py-2 text-gray-300">How it works</Link>
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
            <p className="text-gray-500 text-sm mb-6">No credit card required</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Verify Any Claim.<br />
              <span className="text-blue-500">Trust Every Hire.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              AI-powered fact verification that cross-checks claims across multiple sources and AI models. Stop fraud. Build trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={authLink} className="w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
                Try Free — No Credit Card
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto px-8 py-4 text-white hover:bg-gray-800 font-semibold rounded-xl transition-colors">
                See How It Works →
              </Link>
            </div>
          </div>

          {/* Product Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="rounded-2xl border bg-gray-900 border-gray-800 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-gray-500">app.trustie.io/verify</span>
                </div>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="rounded-xl p-6 bg-gray-800">
                    <h3 className="font-semibold mb-4 text-white">Resume Verification</h3>
                    <div className="space-y-3 text-sm text-gray-400">
                      <p><strong className="text-white">Candidate:</strong> John Smith</p>
                      <p>"5 years at Google as Senior Engineer"</p>
                      <p>"Stanford CS, Class of 2018"</p>
                      <p>"AWS Solutions Architect Certified"</p>
                    </div>
                    <button className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                      Verify All Claims
                    </button>
                  </div>
                  <div className="rounded-xl p-6 border bg-gray-800/50 border-gray-700">
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

      {/* Logo Strip */}
      <section className="py-12 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8">Trusted by teams verifying claims at</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['HR Teams', 'Insurance Firms', 'Legal Depts', 'Recruiters', 'Compliance'].map((item) => (
              <span key={item} className="text-lg font-medium text-gray-600">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gray-500 text-sm mb-4">2.0 Updates</p>
            <h2 className="text-4xl md:text-5xl font-bold">Built Different</h2>
            <p className="mt-4 text-lg text-gray-400">Every verification feature designed to catch what others miss.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Multi-AI Consensus Engine</h3>
              <p className="text-gray-400 mb-6">Three AI models must agree before a claim is marked verified. GPT-4, Claude, and Gemini cross-check each other — reducing false positives by 90%.</p>
              <div className="grid grid-cols-3 gap-4">
                {[{ name: 'GPT-4', score: '94%' }, { name: 'Claude', score: '96%' }, { name: 'Gemini', score: '91%' }].map((model) => (
                  <div key={model.name} className="rounded-xl p-4 text-center bg-gray-800">
                    <span className="text-2xl">🤖</span>
                    <p className="text-sm mt-2 text-gray-400">{model.name}</p>
                    <p className="text-green-500 font-bold">{model.score}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Source Quality Tiers</h3>
              <p className="text-gray-400 mb-6">Not all sources are equal. We weight .gov, .edu, and peer-reviewed databases higher than blogs and commercial sites.</p>
              <div className="space-y-3">
                {[
                  { tier: 'High Trust', weight: '3x', color: 'green', sources: '.gov, .edu, LinkedIn' },
                  { tier: 'Medium Trust', weight: '2x', color: 'yellow', sources: 'News, Company sites' },
                  { tier: 'Low Trust', weight: '1x', color: 'red', sources: 'Blogs, Forums, Wikipedia' },
                ].map((item) => (
                  <div key={item.tier} className="flex items-center gap-4 p-4 rounded-xl bg-gray-800">
                    <div className={`w-3 h-3 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.tier} <span className="text-gray-500">{item.weight} weight</span></p>
                      <p className="text-sm text-gray-500">{item.sources}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Anti-Commercial Bias Filter</h3>
              <p className="text-gray-400 mb-6">Sources with financial interest in the claim are automatically flagged and deprioritized.</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-300">stanford.edu/alumni</span>
                  <span className="ml-auto text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">TRUSTED</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800">
                  <span className="text-yellow-500">⚠</span>
                  <span className="text-gray-300">resumebuilder.com</span>
                  <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">FLAGGED</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-300">linkedin.com/in/jsmith</span>
                  <span className="ml-auto text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">TRUSTED</span>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Full Audit Trail</h3>
              <p className="text-gray-400 mb-6">Every verification is logged with timestamps, sources checked, AI models used, and confidence scores. Export PDF reports for compliance.</p>
              <div className="rounded-xl overflow-hidden bg-gray-950">
                <div className="px-4 py-2 border-b border-gray-800">
                  <span className="text-gray-500 text-sm">audit_trail.json</span>
                </div>
                <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`{
  "audit_id": "ver_abc123",
  "timestamp": "2025-02-22T14:30:00Z",
  "claims_verified": 3,
  "confidence": 0.92,
  "verdict": "PARTIAL_MATCH"
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">The Proof Is in the Comparison</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4"></th>
                  <th className="py-4 px-4 text-blue-500 font-bold">Trustie</th>
                  <th className="py-4 px-4 text-gray-500">Checkr</th>
                  <th className="py-4 px-4 text-gray-500">HireRight</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'AI-Powered Claim Extraction',
                  'Multi-AI Consensus',
                  'Source Quality Tiering',
                  'Real-Time Verification',
                  'Full Audit Trail',
                  'Free Tier Available',
                ].map((feature, idx) => (
                  <tr key={feature} className="border-b border-gray-800/50">
                    <td className="py-4 px-4 text-gray-300">{feature}</td>
                    <td className="py-4 px-4 text-center text-green-500 text-xl">✓</td>
                    <td className="py-4 px-4 text-center text-red-500 text-xl">{idx < 3 ? '✗' : '✓'}</td>
                    <td className="py-4 px-4 text-center text-red-500 text-xl">{idx < 2 ? '✗' : '✓'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Real Results from Real Users</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah K.', role: 'HR Director', quote: 'Caught 3 inflated titles in one batch. Trustie paid for itself in the first week.' },
              { name: 'Marcus R.', role: 'Recruiter', quote: 'I verify every resume now. The multi-AI consensus gives me confidence no other tool does.' },
              { name: 'Jennifer L.', role: 'Compliance Officer', quote: 'The audit trail exports are exactly what our legal team needed. Clean, thorough, defensible.' },
              { name: 'David T.', role: 'Hiring Manager', quote: 'We went from 2 bad hires per quarter to zero. The ROI is insane.' },
              { name: 'Amy W.', role: 'Legal Analyst', quote: 'Used Trustie for due diligence on a merger. Found material misrepresentations.' },
              { name: 'Chris P.', role: 'Content Lead', quote: 'We fact-check every AI-generated article before publishing. Trustie catches things others miss.' },
            ].map((t, idx) => (
              <div key={idx} className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-800 text-gray-400">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (<span key={i} className="text-yellow-400">★</span>))}
                </div>
                <p className="text-gray-300">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h2>
            <p className="text-lg text-gray-400 mb-8">Simple and transparent pricing for everyone</p>
            <div className="inline-flex rounded-xl p-1 bg-gray-800">
              <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${billingCycle === 'monthly' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>
                Monthly
              </button>
              <button onClick={() => setBillingCycle('annual')} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${billingCycle === 'annual' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}>
                Annual <span className="text-green-400 ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-1">Free</h3>
              <p className="text-sm text-gray-500 mb-4">Try it out</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
              </div>
              <Link href={authLink} className="block w-full py-3 text-center bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl mb-6 transition-colors">
                Get Started Free
              </Link>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>5 verifications total</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Basic sources</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Web interface</li>
                <li className="flex items-center gap-2 text-gray-600"><span className="text-gray-600">✗</span>No export</li>
              </ul>
            </div>

            {/* Starter */}
            <div className="rounded-2xl p-8 bg-gray-900 border-2 border-blue-500 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
              <h3 className="text-xl font-bold mb-1">Starter Pack</h3>
              <p className="text-sm text-gray-500 mb-4">For recruiters</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-500"> one-time</span>
              </div>
              <Link href={authLink} className="block w-full py-3 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl mb-6 transition-colors">
                Buy Starter Pack
              </Link>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>50 verifications</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Never expires</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>All source tiers</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Export reports</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-1">Pro Monthly</h3>
              <p className="text-sm text-gray-500 mb-4">For teams</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">${billingCycle === 'annual' ? '24' : '29'}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <Link href={authLink} className="block w-full py-3 text-center bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-xl mb-6 transition-colors">
                Start Pro Monthly
              </Link>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Unlimited verifications</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Priority support</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>API access</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Team features</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Need enterprise? <a href="mailto:danny@trustieapp.com" className="text-blue-500 hover:text-blue-400">Contact us</a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'Is there really a free plan?', a: 'Yes. 5 verifications total, forever. No credit card required.' },
              { q: 'Can I cancel anytime?', a: 'Absolutely. No contracts, no cancellation fees. Cancel in one click.' },
              { q: 'What counts as one verification?', a: 'One piece of text submitted. It can contain multiple claims — we extract and verify each individually.' },
              { q: 'Do you offer startup/nonprofit discounts?', a: 'Yes. Email danny@trustieapp.com with details and we\'ll work something out.' },
              { q: 'What payment methods do you accept?', a: 'All major credit cards via Stripe. Enterprise customers can pay via invoice.' },
              { q: 'Is my data secure?', a: 'Yes. We don\'t store the content you verify — it\'s processed in real-time and discarded.' },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden bg-gray-800">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-700 transition-colors">
                  <span className="font-medium text-white">{faq.q}</span>
                  <span className="text-gray-500">{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-gray-400">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Earn with Trustie</h2>
          <p className="text-lg text-gray-400 mb-8">
            Trustie offers a generous referral program. Earn 30% of all earnings from people using your referral code.
          </p>
          <a href="mailto:danny@trustieapp.com" className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            Join affiliate program (30% commission)
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Verify Any Claim?
          </h2>
          <p className="text-lg text-gray-400 mb-8">Start Your Free Trial Today</p>
          <Link href={authLink} className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            {isSignedIn ? 'Open Dashboard' : 'Try Trustie Free'}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Trustie</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">AI-powered verification for everyone.</p>
              <a href="https://x.com/UseTrustie" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm">
                @UseTrustie
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Pages</h4>
              <ul className="space-y-2">
                <li><Link href="/proof" className="text-sm text-gray-500 hover:text-white">Proof</Link></li>
                <li><Link href="#pricing" className="text-sm text-gray-500 hover:text-white">Pricing</Link></li>
                <li><Link href="/help" className="text-sm text-gray-500 hover:text-white">Help</Link></li>
                <li><Link href="/blog" className="text-sm text-gray-500 hover:text-white">Blog</Link></li>
                <li><Link href="/how-it-works" className="text-sm text-gray-500 hover:text-white">How it works</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Use Cases</h4>
              <ul className="space-y-2">
                <li><Link href={authLink} className="text-sm text-gray-500 hover:text-white">Resume Verification</Link></li>
                <li><Link href={authLink} className="text-sm text-gray-500 hover:text-white">HR Background Checks</Link></li>
                <li><Link href={authLink} className="text-sm text-gray-500 hover:text-white">Insurance Claims</Link></li>
                <li><Link href={authLink} className="text-sm text-gray-500 hover:text-white">Legal Due Diligence</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-500 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/terms#refunds" className="text-sm text-gray-500 hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-600">© 2025 Trustie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
