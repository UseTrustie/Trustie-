'use client';

import Link from 'next/link';

export default function TermsPage() {
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
          <Link href="/" className="text-gray-400 hover:text-white text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-12">Last updated: March 1, 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Agreement</h2>
            <p>
              By using Trustie, you agree to these terms. If you don't agree, please don't use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">What Trustie Does</h2>
            <p className="mb-4">
              Trustie is an AI-powered tool that helps verify factual claims by searching publicly available information. Our service:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Extracts claims from text you submit</li>
              <li>Searches the web for relevant information</li>
              <li>Provides verdicts with confidence scores</li>
              <li>Shows sources for transparency</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Important Limitations</h2>
            <div className="rounded-xl p-6 bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-yellow-400 font-medium mb-3">Please understand:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>Trustie is an AI tool, not a professional background check service</li>
                <li>Results depend on publicly available information</li>
                <li>No AI system is 100% accurate</li>
                <li>Trustie should assist, not replace, human judgment</li>
                <li>We are not liable for hiring decisions based on our results</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Acceptable Use</h2>
            <p className="mb-4">You agree NOT to use Trustie to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Violate any laws or regulations</li>
              <li>Harass, stalk, or harm individuals</li>
              <li>Make decisions that violate employment laws</li>
              <li>Resell or redistribute the service</li>
              <li>Attempt to reverse-engineer our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Payments</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Free tier: 5 verifications total, no payment required</li>
              <li>Starter Pack: $49 one-time for 50 verifications</li>
              <li>Pro Monthly: $29/month for unlimited verifications</li>
              <li>All payments processed securely by Stripe</li>
            </ul>
          </section>

          <section id="refunds">
            <h2 className="text-2xl font-bold mb-4 text-white">Refund Policy</h2>
            <div className="rounded-xl p-6 bg-green-500/10 border border-green-500/30">
              <p className="text-green-400 font-medium mb-2">14-Day Money-Back Guarantee</p>
              <p className="text-gray-400">
                If you're not satisfied with Trustie, request a refund within 14 days of purchase. Email us at trustietechnologies@gmail.com with your request.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Account Termination</h2>
            <p>
              We may suspend or terminate accounts that violate these terms. You can delete your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Changes to Terms</h2>
            <p>
              We may update these terms. Continued use of Trustie after changes means you accept the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
            <p>
              Questions? Email us at{' '}
              <a href="mailto:trustietechnologies@gmail.com" className="text-blue-500 hover:text-blue-400">
                trustietechnologies@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
