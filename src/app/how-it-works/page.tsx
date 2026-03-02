'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function HowItWorksPage() {
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
            <Link href="/proof" className="text-gray-400 hover:text-white text-sm">Proof</Link>
            <Link href="/#pricing" className="text-gray-400 hover:text-white text-sm">Pricing</Link>
            <Link href="/help" className="text-gray-400 hover:text-white text-sm">Help</Link>
            <Link href="/blog" className="text-gray-400 hover:text-white text-sm">Blog</Link>
            <Link href="/how-it-works" className="text-white text-sm">How it works</Link>
          </div>
          <Link href={authLink} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl">
            {isSignedIn ? 'Open App' : 'Try Free'}
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">How Trustie Works</h1>
          <p className="text-xl text-gray-400">AI-powered verification in 5 simple steps</p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">1</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Paste Your Text</h2>
              <p className="text-gray-400 mb-4">
                Copy and paste a resume, bio, LinkedIn profile, or any text containing claims you want to verify.
              </p>
              <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
                <p className="text-sm text-gray-500 mb-2">Example input:</p>
                <p className="text-gray-300">"John Smith, Senior Engineer at Google (2019-2024), Stanford CS 2018, AWS Certified"</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">2</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">AI Extracts Claims</h2>
              <p className="text-gray-400 mb-4">
                Our AI identifies every verifiable claim in your text — employment, education, certifications, achievements.
              </p>
              <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
                <p className="text-sm text-gray-500 mb-2">Claims extracted:</p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Employment: "Senior Engineer at Google (2019-2024)"</li>
                  <li>• Education: "Stanford CS 2018"</li>
                  <li>• Certification: "AWS Certified"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">3</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Web Search Verification</h2>
              <p className="text-gray-400 mb-4">
                The AI searches the web for authoritative sources to verify each claim. Sources are weighted by quality tier.
              </p>
              <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-gray-300">Tier 1 (3x weight):</span>
                    <span className="text-gray-500">.gov, .edu, LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                    <span className="text-gray-300">Tier 2 (2x weight):</span>
                    <span className="text-gray-500">News, company sites</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-gray-300">Tier 3 (1x weight):</span>
                    <span className="text-gray-500">Blogs, forums</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">4</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Verdict & Confidence Score</h2>
              <p className="text-gray-400 mb-4">
                Each claim receives a verdict based on what the AI found, along with a confidence score.
              </p>
              <div className="rounded-xl p-4 bg-gray-900 border border-gray-800 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-green-500/20 text-green-500 text-sm font-medium">VERIFIED</span>
                  <span className="text-gray-400">Sources confirm the claim</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-sm font-medium">UNVERIFIED</span>
                  <span className="text-gray-400">Sources contradict the claim</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-yellow-500/20 text-yellow-500 text-sm font-medium">PARTIAL</span>
                  <span className="text-gray-400">Some discrepancies found</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-gray-500/20 text-gray-400 text-sm font-medium">UNABLE TO VERIFY</span>
                  <span className="text-gray-400">Not enough data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">5</div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Review & Export</h2>
              <p className="text-gray-400 mb-4">
                Review the results with full evidence and source links. Export as JSON for your records.
              </p>
              <div className="rounded-xl overflow-hidden bg-gray-900 border border-gray-800">
                <div className="px-4 py-2 border-b border-gray-800 text-sm text-gray-500">report.json</div>
                <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`{
  "id": "ver_abc123",
  "claims_verified": 3,
  "verified": 2,
  "partial": 1,
  "confidence": 0.87
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to verify your first claim?</h2>
          <Link href={authLink} className="inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl">
            {isSignedIn ? 'Open App' : 'Try Trustie Free'}
          </Link>
        </div>
      </main>
    </div>
  );
}
