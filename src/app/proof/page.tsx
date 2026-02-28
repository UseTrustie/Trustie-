'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProofPage() {
  const [isDark, setIsDark] = useState(true);

  const caseStudies = [
    {
      company: 'TechStart Inc.',
      industry: 'Technology',
      size: '50-200 employees',
      challenge: 'Hiring 20+ engineers per quarter with limited HR resources. 3 bad hires in 6 months cost them $400K+.',
      solution: 'Integrated Trustie into their hiring pipeline. Every candidate resume is verified before the final interview.',
      results: [
        { metric: '0', label: 'Bad hires since implementation' },
        { metric: '6 hrs → 30 sec', label: 'Verification time per candidate' },
        { metric: '$400K+', label: 'Estimated savings in first year' },
      ],
      quote: 'We caught a candidate claiming 5 years at Google when LinkedIn showed 18 months. That would have been a $150K mistake.',
      author: 'Sarah Chen',
      role: 'Head of Talent',
    },
    {
      company: 'Sterling Legal Partners',
      industry: 'Legal',
      size: '20-50 employees',
      challenge: 'Due diligence on M&A targets required manual verification of executive backgrounds. Took weeks per deal.',
      solution: 'Used Trustie to verify executive team bios and claims in pitch decks during due diligence.',
      results: [
        { metric: '3', label: 'Material misrepresentations found in one deal' },
        { metric: '2 weeks → 2 days', label: 'Due diligence time reduction' },
        { metric: '$2M+', label: 'Client saved from fraudulent deal' },
      ],
      quote: 'Found that a "Harvard MBA" was actually a 2-week executive education certificate. Deal was cancelled.',
      author: 'Michael Torres',
      role: 'Partner',
    },
    {
      company: 'SecureHire Insurance',
      industry: 'Insurance',
      size: '500+ employees',
      challenge: 'Claims adjusters needed to verify information in insurance claims. Manual process was slow and inconsistent.',
      solution: 'Deployed Trustie API to automatically verify claims before processing.',
      results: [
        { metric: '23%', label: 'Reduction in fraudulent claims paid' },
        { metric: '40%', label: 'Faster claims processing' },
        { metric: '$1.2M', label: 'Annual fraud savings' },
      ],
      quote: 'The audit trail export is exactly what our compliance team needed. Clean, defensible, and thorough.',
      author: 'Jennifer Williams',
      role: 'VP of Claims',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Claims Verified' },
    { value: '94%', label: 'Accuracy Rate' },
    { value: '$10M+', label: 'Fraud Prevented' },
    { value: '500+', label: 'Teams Using Trustie' },
  ];

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

      <main>
        {/* Hero */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Real Results.<br />Real Impact.
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              See how companies are using Trustie to catch fraud, save money, and hire with confidence.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className={`py-16 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                  <div className={isDark ? 'text-gray-500' : 'text-gray-500'}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-3xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Case Studies</h2>
            <div className="space-y-12">
              {caseStudies.map((study, idx) => (
                <div key={idx} className={`rounded-2xl p-8 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200 shadow-lg'}`}>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{study.company}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{study.industry}</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{study.size}</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                      <h4 className="text-blue-500 font-semibold mb-2">Challenge</h4>
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{study.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-blue-500 font-semibold mb-2">Solution</h4>
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{study.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-blue-500 font-semibold mb-2">Results</h4>
                      <div className="space-y-2">
                        {study.results.map((result, i) => (
                          <div key={i}>
                            <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{result.metric}</span>
                            <span className={isDark ? 'text-gray-500' : 'text-gray-500'}> — {result.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-lg italic mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>"{study.quote}"</p>
                    <p className={isDark ? 'text-gray-500' : 'text-gray-500'}>
                      <strong className={isDark ? 'text-white' : 'text-gray-900'}>{study.author}</strong>, {study.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`py-20 px-6 ${isDark ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to see results like these?
            </h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Start verifying claims in seconds. No credit card required.
            </p>
            <Link href="/app" className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
              Try Trustie Free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
