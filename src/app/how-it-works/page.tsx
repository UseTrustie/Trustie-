'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${isDark ? 'bg-gray-950/95 border-gray-800 backdrop-blur-md' : 'bg-white/95 border-gray-200 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold">Trustie</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link href="/app" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
              Try Free
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className={`text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>How Trustie Works</h1>
        <p className={`text-xl mb-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          A deep dive into our verification technology and methodology.
        </p>

        {/* Step 1 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl">1</div>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Claim Extraction</h2>
          </div>
          <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              When you paste text, our AI reads it and identifies every verifiable factual claim. This includes:
            </p>
            <ul className={`space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="flex items-start gap-3"><span className="text-blue-500">•</span>Employment history (companies, titles, dates)</li>
              <li className="flex items-start gap-3"><span className="text-blue-500">•</span>Education credentials (degrees, institutions, graduation years)</li>
              <li className="flex items-start gap-3"><span className="text-blue-500">•</span>Certifications and licenses</li>
              <li className="flex items-start gap-3"><span className="text-blue-500">•</span>Specific achievements and metrics</li>
              <li className="flex items-start gap-3"><span className="text-blue-500">•</span>Publications, patents, and awards</li>
            </ul>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl">2</div>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Multi-Source Search</h2>
          </div>
          <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              For each claim, we search across multiple authoritative sources:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { tier: 'Tier 1', sources: 'Government databases (.gov), University records (.edu), LinkedIn, Credly', weight: '3x weight' },
                { tier: 'Tier 2', sources: 'Company websites, Professional organizations, News archives', weight: '2x weight' },
                { tier: 'Tier 3', sources: 'General web results, Wikipedia, Forums', weight: '1x weight' },
              ].map((item) => (
                <div key={item.tier} className={`rounded-xl p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.tier} <span className="text-blue-500 text-sm">({item.weight})</span></p>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.sources}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl">3</div>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Consensus Verification</h2>
          </div>
          <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              We don't rely on a single AI model. Multiple models must agree before a claim is marked as verified:
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { name: 'Claude 3.5', accuracy: '96%' },
                { name: 'GPT-4 Turbo', accuracy: '94%' },
                { name: 'Gemini Pro', accuracy: '91%' },
              ].map((model) => (
                <div key={model.name} className={`flex-1 min-w-[150px] rounded-xl p-4 text-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{model.name}</p>
                  <p className="text-green-500 font-bold text-2xl">{model.accuracy}</p>
                </div>
              ))}
            </div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              This multi-model approach reduces false positives by 90% compared to single-model verification.
            </p>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl">4</div>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Bias Detection</h2>
          </div>
          <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Sources with commercial interest in the claim are automatically flagged and deprioritized:
            </p>
            <ul className={`space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="flex items-center gap-3"><span className="text-yellow-500">⚠</span>Resume services (resumebuilder.com, etc.)</li>
              <li className="flex items-center gap-3"><span className="text-yellow-500">⚠</span>Paid review platforms</li>
              <li className="flex items-center gap-3"><span className="text-yellow-500">⚠</span>Affiliate content</li>
              <li className="flex items-center gap-3"><span className="text-yellow-500">⚠</span>Self-published press releases</li>
            </ul>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-xl">5</div>
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Verdict & Audit Trail</h2>
          </div>
          <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Each claim receives a verdict with full transparency:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <span className="text-green-500 text-xl">✓</span>
                <span className={isDark ? 'text-green-400' : 'text-green-600'}>VERIFIED — Multiple sources confirm</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                <span className="text-red-500 text-xl">✗</span>
                <span className={isDark ? 'text-red-400' : 'text-red-600'}>UNVERIFIED — Sources contradict</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <span className="text-yellow-500 text-xl">◐</span>
                <span className={isDark ? 'text-yellow-400' : 'text-yellow-600'}>PARTIAL — Some discrepancies found</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-500/10 border border-gray-500/30">
                <span className="text-gray-500 text-xl">?</span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>UNABLE — Not enough data</span>
              </div>
            </div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Every verification generates a complete audit trail that can be exported as JSON or PDF for compliance documentation.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className={`rounded-2xl p-8 text-center ${isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Ready to verify your first claim?</h2>
          <Link href="/app" className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
            Try Trustie Free
          </Link>
        </div>
      </main>
    </div>
  );
}
