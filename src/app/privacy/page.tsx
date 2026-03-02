'use client';

import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: March 1, 2025</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
            <p>
              Trustie ("we", "our", or "us") is committed to protecting your privacy. This policy explains how we handle your information when you use our verification service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Data We Collect</h2>
            <p className="mb-4">We collect minimal data necessary to provide our service:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong className="text-gray-300">Account Information:</strong> Email address and name when you sign up</li>
              <li><strong className="text-gray-300">Usage Data:</strong> Number of verifications used (for plan limits)</li>
              <li><strong className="text-gray-300">Payment Information:</strong> Processed securely by Stripe; we don't store card details</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Text You Submit</h2>
            <div className="rounded-xl p-6 bg-green-500/10 border border-green-500/30">
              <p className="text-green-400 font-medium mb-2">We do NOT store the text you verify.</p>
              <p className="text-gray-400">
                Content submitted for verification is processed in real-time and immediately discarded. We don't save resumes, bios, or any text you submit.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">How We Use Data</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>To provide the verification service</li>
              <li>To track usage against your plan limits</li>
              <li>To process payments</li>
              <li>To send important service updates (not marketing)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Third Parties</h2>
            <p className="mb-4">We use these services to operate Trustie:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li><strong className="text-gray-300">Clerk:</strong> Authentication</li>
              <li><strong className="text-gray-300">Stripe:</strong> Payment processing</li>
              <li><strong className="text-gray-300">Anthropic:</strong> AI verification (Claude)</li>
              <li><strong className="text-gray-300">Vercel:</strong> Hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Your Rights</h2>
            <p>You can request to delete your account and all associated data at any time by emailing us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Contact</h2>
            <p>
              Questions about privacy? Email us at{' '}
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
