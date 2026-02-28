'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
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
          <button onClick={() => setIsDark(!isDark)} className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h1>
        <p className={`mb-12 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Last updated: February 20, 2025</p>

        <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Overview</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Trustie ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our verification service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Information We Collect</h2>
            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Information You Provide</h3>
            <ul className={`list-disc pl-6 mb-4 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Account information (email, name) when you sign up</li>
              <li>Payment information processed securely through Stripe</li>
              <li>Text submitted for verification (see Data Handling below)</li>
            </ul>

            <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Automatically Collected</h3>
            <ul className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Usage data (features used, verification counts)</li>
              <li>Device and browser information</li>
              <li>IP address and approximate location</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Handling</h2>
            <div className={`rounded-xl p-6 mb-4 ${isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
              <p className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Important: We do not store the text you verify.</p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Text submitted for verification is processed in real-time and immediately discarded after the verification is complete. We do not retain, store, or sell the content you verify.
              </p>
            </div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              We only store verification metadata (timestamps, claim counts, verdict summaries) for your verification history dashboard. This metadata does not include the original text content.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>How We Use Your Information</h2>
            <ul className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>To provide and improve our verification service</li>
              <li>To process payments and manage your subscription</li>
              <li>To send service-related communications</li>
              <li>To respond to your support requests</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Sharing</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We do not sell your personal information. We may share data with:
            </p>
            <ul className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><strong>Service providers:</strong> Stripe (payments), Vercel (hosting), Anthropic (AI processing)</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Your Rights</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You have the right to:</p>
            <ul className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your verification history</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Security</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              We use industry-standard security measures including encryption in transit (TLS), encryption at rest, and secure authentication. Our infrastructure is hosted on Vercel with SOC 2 compliance.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Us</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              For privacy-related questions or requests, contact us at:
            </p>
            <p className={`mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <a href="mailto:privacy@trustieapp.com" className="text-blue-500 hover:text-blue-400">privacy@trustieapp.com</a>
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Changes to This Policy</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by email or through the service.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
