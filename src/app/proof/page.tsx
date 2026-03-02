'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function ProofPage() {
  const { isSignedIn } = useUser();
  const authLink = isSignedIn ? '/app' : '/sign-up';

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/95 border-b border-gray-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold">Trustie</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/proof" className="text-white text-sm">Proof</Link>
            <Link href="/#pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link>
            <Link href="/help" className="text-gray-400 hover:text-white text-sm">Help</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link>
            <Link href="/how-it-works" className="text-gray-400 hover:text-white text-sm">How it works</Link>
          </div>
          <Link href={authLink} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl">
            {isSignedIn ? 'Open App' : 'Try Free'}
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Why Trustie?</h1>
          <p className="text-xl text-gray-400">The case for AI-powered verification</p>
        </div>

        {/* The Problem */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">The Problem</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <div className="text-4xl font-bold text-red-500 mb-2">70%+</div>
              <p className="text-gray-400">of resumes contain some form of misrepresentation, according to HR industry studies</p>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <div className="text-4xl font-bold text-red-500 mb-2">$17,000</div>
              <p className="text-gray-400">average cost of a bad hire (recruiting, training, lost productivity)</p>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <div className="text-4xl font-bold text-red-500 mb-2">Days</div>
              <p className="text-gray-400">traditional background checks take days to weeks for results</p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">How Trustie Helps</h2>
          <div className="space-y-6">
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500 text-xl flex-shrink-0">⚡</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Instant Verification</h3>
                  <p className="text-gray-400">Get results in seconds, not days. AI searches the web in real-time to verify claims.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500 text-xl flex-shrink-0">🎯</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Source Quality Weighting</h3>
                  <p className="text-gray-400">Not all sources are equal. We prioritize authoritative sources (.gov, .edu, LinkedIn) over blogs and forums.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-500 text-xl flex-shrink-0">🛡️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Bias Detection</h3>
                  <p className="text-gray-400">Sources with commercial interest are automatically flagged so you can judge credibility.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500 text-xl flex-shrink-0">📋</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Full Audit Trail</h3>
                  <p className="text-gray-400">Every verification includes sources, confidence scores, and timestamps. Export for your records.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Who Uses Trustie?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-3">HR & Recruiters</h3>
              <p className="text-gray-400">Quickly verify candidate claims before investing time in interviews.</p>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-3">Hiring Managers</h3>
              <p className="text-gray-400">Double-check qualifications before extending offers.</p>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-3">Compliance Teams</h3>
              <p className="text-gray-400">Document due diligence with exportable audit trails.</p>
            </div>
            <div className="rounded-2xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-3">Small Businesses</h3>
              <p className="text-gray-400">Enterprise-level verification without enterprise costs.</p>
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section className="mb-20">
          <div className="rounded-2xl p-8 bg-blue-500/10 border border-blue-500/30">
            <h3 className="text-xl font-bold mb-3">A Note on Accuracy</h3>
            <p className="text-gray-300 mb-4">
              Trustie is an AI-powered tool that helps surface publicly available information. It's designed to assist your verification process, not replace human judgment.
            </p>
            <p className="text-gray-400">
              We show confidence scores for each claim so you know when results are strong vs. when you should verify manually. No AI system is 100% accurate, and neither are we. Use Trustie as one input in your decision-making process.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try It?</h2>
          <p className="text-gray-400 mb-8">5 free verifications. No credit card required.</p>
          <Link href={authLink} className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl">
            {isSignedIn ? 'Open App' : 'Try Trustie Free'}
          </Link>
        </section>
      </main>
    </div>
  );
}
