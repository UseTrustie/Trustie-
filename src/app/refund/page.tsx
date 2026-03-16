'use client';

import Link from 'next/link';

export default function RefundPage() {
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
        <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: March 15, 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <div className="rounded-xl p-6 bg-green-500/10 border border-green-500/30">
              <p className="text-green-400 font-medium mb-2">14-Day Money-Back Guarantee</p>
              <p className="text-gray-400">
                We want you to be completely satisfied with Trustie. If our service does not meet your needs, you can request a full refund within 14 days of your purchase.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">How to Request a Refund</h2>
            <p className="mb-4">
              Email us at{' '}
              <a href="mailto:trustietechnologies@gmail.com" className="text-blue-500 hover:text-blue-400">
                trustietechnologies@gmail.com
              </a>
              {' '}with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Your account email address</li>
              <li>Date of purchase</li>
              <li>Reason for refund (optional, but helps us improve)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">What Qualifies</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Any paid plan purchased within the last 14 days</li>
              <li>Both one-time purchases and subscription plans</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Processing Time</h2>
            <p className="text-gray-400">
              Refunds are processed within 5-10 business days. The refund will be returned to your original payment method via Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Questions?</h2>
            <p>
              Email us at{' '}
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
