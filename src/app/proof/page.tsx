"use client";

// TRUSTIE PROOF PAGE — v3
// IDENTICAL to original except for 5 specific factual corrections:
// 1. "70%+" → "Up to 64%" with source citation
// 2. "$17,000" → added source citation
// 3. "Who Uses Trustie?" → "Who Is Trustie Built For?"
// 4. "Export for your records." → removed (feature doesn't exist yet)
// 5. "exportable audit trails" → "sourced verification results"
// EVERYTHING ELSE IS UNCHANGED FROM THE ORIGINAL.

import Link from "next/link";

export default function ProofPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation Header — EXACTLY as original */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Trustie</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/proof" className="text-sm text-gray-300 hover:text-white">Proof</Link>
          <Link href="/pricing" className="text-sm text-gray-300 hover:text-white">Pricing</Link>
          <Link href="/help" className="text-sm text-gray-300 hover:text-white">Help</Link>
          <Link href="/blog" className="text-sm text-gray-300 hover:text-white">Blog</Link>
          <Link href="/how-it-works" className="text-sm text-gray-300 hover:text-white">How it works</Link>
        </div>
        <Link
          href="/app"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          Try Free
        </Link>
      </nav>

      {/* Hero — UNCHANGED */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Trustie?</h1>
          <p className="text-lg text-gray-400">
            The case for AI-powered verification
          </p>
        </div>
      </section>

      {/* The Problem — ONLY the stat text changed */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">The Problem</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* CHANGED: "70%+" → "Up to 64%" with source */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
              <p className="text-3xl font-bold text-red-500 mb-2">Up to 64%</p>
              <p className="text-gray-400">
                of employees have lied on their resume at least once, according to
                a StandOut CV survey of 2,100+ Americans.
              </p>
              <p className="text-xs text-gray-600 mt-3">
                Source: StandOut CV, 2024. HRO Today corroborated.
              </p>
            </div>

            {/* CHANGED: added source citation */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
              <p className="text-3xl font-bold text-red-500 mb-2">$17,000</p>
              <p className="text-gray-400">
                average cost of a bad hire (recruiting, training, lost
                productivity)
              </p>
              <p className="text-xs text-gray-600 mt-3">
                Source: CareerBuilder survey, corroborated by U.S. Dept. of Labor.
              </p>
            </div>

            {/* UNCHANGED */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
              <p className="text-3xl font-bold text-red-500 mb-2">Days</p>
              <p className="text-gray-400">
                traditional background checks take days to weeks for results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Trustie Helps — ALL 4 FEATURES KEPT, descriptions unchanged */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">How Trustie Helps</h2>

          <div className="space-y-6">
            {/* UNCHANGED */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-500 text-lg">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Instant Verification</h3>
                <p className="text-gray-400">
                  Get results in seconds, not days. AI searches the web in real-time to verify claims.
                </p>
              </div>
            </div>

            {/* UNCHANGED */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-red-500 text-lg">🎯</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Source Quality Weighting</h3>
                <p className="text-gray-400">
                  Not all sources are equal. We prioritize authoritative sources (.gov, .edu, LinkedIn) over blogs and forums.
                </p>
              </div>
            </div>

            {/* UNCHANGED */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-500 text-lg">🛡️</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Bias Detection</h3>
                <p className="text-gray-400">
                  Sources with commercial interest are automatically flagged so you can judge credibility.
                </p>
              </div>
            </div>

            {/* CHANGED: removed "Export for your records." — feature doesn't exist */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-500 text-lg">📋</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Full Audit Trail</h3>
                <p className="text-gray-400">
                  Every verification includes sources, confidence scores, and timestamps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHANGED: "Who Uses Trustie?" → "Who Is Trustie Built For?" */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10">Who Is Trustie Built For?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* UNCHANGED */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-2">HR &amp; Recruiters</h3>
              <p className="text-gray-400">
                Quickly verify candidate claims before investing time in interviews.
              </p>
            </div>

            {/* UNCHANGED */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Hiring Managers</h3>
              <p className="text-gray-400">
                Double-check qualifications before extending offers.
              </p>
            </div>

            {/* CHANGED: "exportable audit trails" → "sourced verification results" */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Compliance Teams</h3>
              <p className="text-gray-400">
                Document due diligence with sourced verification results.
              </p>
            </div>

            {/* UNCHANGED */}
            <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Small Businesses</h3>
              <p className="text-gray-400">
                Enterprise-level verification without enterprise costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Note on Accuracy — UNCHANGED */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl p-8 bg-gray-900 border border-blue-500/30">
            <h2 className="text-2xl font-bold mb-4">A Note on Accuracy</h2>
            <p className="text-gray-400 mb-4">
              Trustie is an AI-powered tool that helps surface publicly available
              information. It{"\u2019"}s designed to assist your verification process, not
              replace human judgment.
            </p>
            <p className="text-gray-400">
              We show confidence scores for each claim so you know when results
              are strong vs. when you should verify manually. No AI system is
              100% accurate, and neither are we. Use Trustie as one input in your
              decision-making process.
            </p>
          </div>
        </div>
      </section>

      {/* CTA — UNCHANGED */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Try It?</h2>
        <p className="text-gray-400 mb-8">
          5 free verifications. No credit card required.
        </p>
        <Link
          href="/app"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Try Trustie Free
        </Link>
      </section>
    </div>
  );
}
