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
              {isSignedIn ? (
                <SignOutButton signOutOptions={{ redirectUrl: '/' }}>
                  <button className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              ) : (
                <Link href={loginLink} className="hidden sm:block px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors">
                  Login
                </Link>
              )}
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
              AI-powered fact verification that cross-checks claims across multiple sources. Stop fraud. Build trust.
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
                  <span className="text-sm text-gray-500">trustieapp.com/app</span>
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
                    <Link href={authLink} className="block w-full mt-6 py-3 text-center bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
                      Try It Yourself →
                    </Link>
                  </div>
                  <div className="rounded-xl p-6 border bg-gray-800/50 border-gray-700">
                    <h3 className="font-semibold mb-4 text-white">Example Results</h3>
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
      <section className="py-16 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8">Built for</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {['HR Teams', 'Recruiters', 'Insurance', 'Legal', 'Compliance'].map((item) => (
              <span key={item} className="text-lg font-medium text-gray-500">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">How Trustie Works</h2>
            <p className="mt-4 text-lg text-gray-400">Every verification feature designed to catch what others miss.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 - HONEST VERSION */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">AI-Powered Verification</h3>
              <p className="text-gray-400 mb-6">Powered by Claude, one of the most advanced AI models. Claims are extracted, searched across the web, and verified against authoritative sources in real-time.</p>
              <div className="rounded-xl p-4 bg-gray-800">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <p className="font-medium text-white">Claude AI</p>
                    <p className="text-sm text-gray-500">by Anthropic</p>
                  </div>
                  <span className="ml-auto text-green-500 font-bold">Active</span>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Source Quality Tiers</h3>
              <p className="text-gray-400 mb-6">Not all sources are equal. We weight .gov, .edu, and professional networks higher than blogs and commercial sites.</p>
              <div className="space-y-3">
                {[
                  { tier: 'Tier 1 (3x weight)', color: 'green', sources: '.gov, .edu, LinkedIn, Credly' },
                  { tier: 'Tier 2 (2x weight)', color: 'yellow', sources: 'News sites, GitHub, Company sites' },
                  { tier: 'Tier 3 (1x weight)', color: 'red', sources: 'Blogs, Forums, Wikipedia' },
                ].map((item) => (
                  <div key={item.tier} className="flex items-center gap-4 p-4 rounded-xl bg-gray-800">
                    <div className={`w-3 h-3 rounded-full ${item.color === 'green' ? 'bg-green-500' : item.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-white">{item.tier}</p>
                      <p className="text-sm text-gray-500">{item.sources}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl p-8 bg-gray-900 border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Commercial Bias Detection</h3>
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
              <p className="text-gray-400 mb-6">Every verification is logged with timestamps, sources checked, and confidence scores. Export JSON reports for compliance.</p>
              <div className="rounded-xl overflow-hidden bg-gray-950">
                <div className="px-4 py-2 border-b border-gray-800">
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

      {/* Why Trustie */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Why Trustie?</h2>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Real-Time Verification', desc: 'No waiting days for results. Get verification in seconds.' },
              { title: 'Web Search Integration', desc: 'AI searches the live web for current, accurate information.' },
              { title: 'Transparent Confidence Scores', desc: 'Know exactly how confident the AI is in each verification.' },
              { title: 'Source Citations', desc: 'Every claim shows which sources were checked and what was found.' },
              { title: 'Privacy First', desc: 'Text is processed in real-time and immediately discarded. We don\'t store your data.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-xl bg-gray-800">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pricing</h2>
            <p className="text-lg text-gray-400 mb-8">Simple and transparent pricing</p>
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
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>All source tiers</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Web interface</li>
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
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Export reports</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Priority support</li>
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
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>API access (coming soon)</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Team features</li>
                <li className="flex items-center gap-2 text-gray-300"><span className="text-green-500">✓</span>Priority support</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            Need enterprise? <a href="mailto:trustietechnologies@gmail.com" className="text-blue-500 hover:text-blue-400">Contact us</a>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: 'Is there really a free plan?', a: 'Yes. 5 verifications total, forever. No credit card required.' },
              { q: 'What counts as one verification?', a: 'One piece of text submitted. It can contain multiple claims — we extract and verify each individually.' },
              { q: 'How accurate is it?', a: 'Accuracy depends on available public information. We show confidence scores so you know when to dig deeper manually.' },
              { q: 'Is my data secure?', a: 'Yes. We don\'t store the content you verify — it\'s processed in real-time and discarded.' },
              { q: 'Can I get a refund?', a: '14-day money-back guarantee on all paid plans.' },
              { q: 'Do you offer startup/nonprofit discounts?', a: 'Yes. Email trustietechnologies@gmail.com with details and we\'ll work something out.' },
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
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Earn with Trustie</h2>
          <p className="text-lg text-gray-400 mb-8">
            Interested in our affiliate program? Earn 30% commission on referrals.
          </p>
          <a href="mailto:trustietechnologies@gmail.com?subject=Affiliate%20Program%20Interest" className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            Join Affiliate Program (30% commission)
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Verify Claims?
          </h2>
          <p className="text-lg text-gray-400 mb-8">Start free. No credit card required.</p>
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
              <p className="text-sm text-gray-500 mb-4">AI-powered verification.</p>
              <a href="https://x.com/UseTrustie" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm">
                @UseTrustie
              </a>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/how-it-works" className="text-sm text-gray-500 hover:text-white">How it works</Link></li>
                <li><Link href="#pricing" className="text-sm text-gray-500 hover:text-white">Pricing</Link></li>
                <li><Link href="/proof" className="text-sm text-gray-500 hover:text-white">Proof</Link></li>
                <li><Link href="/help" className="text-sm text-gray-500 hover:text-white">Help</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-sm text-gray-500 hover:text-white">Blog</Link></li>
                <li><a href="mailto:trustietechnologies@gmail.com" className="text-sm text-gray-500 hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-gray-500 hover:text-white">Terms of Service</Link></li>
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
