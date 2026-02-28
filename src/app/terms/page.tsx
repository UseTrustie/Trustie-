'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TermsPage() {
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
        <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Terms of Service</h1>
        <p className={`mb-12 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Last updated: February 20, 2025</p>

        <div className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}>
          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Acceptance of Terms</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              By accessing or using Trustie ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Description of Service</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Trustie provides AI-powered fact verification services. The Service extracts claims from text you submit and attempts to verify those claims against multiple sources. Trustie provides verification results with confidence scores, but does not guarantee 100% accuracy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>3. User Responsibilities</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You agree to:</p>
            <ul className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Provide accurate account information</li>
              <li>Keep your login credentials secure</li>
              <li>Not use the Service for illegal purposes</li>
              <li>Not attempt to circumvent usage limits or security measures</li>
              <li>Not submit content that violates third-party rights</li>
              <li>Use verification results responsibly and as one input among many in decision-making</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>4. Prohibited Uses</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>You may not use Trustie to:</p>
            <ul className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Discriminate against individuals based on protected characteristics</li>
              <li>Make automated decisions without human review where required by law</li>
              <li>Verify content for the purpose of harassment or stalking</li>
              <li>Reverse-engineer or copy our verification methodology</li>
              <li>Resell or redistribute our Service without authorization</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>5. Accuracy Disclaimer</h2>
            <div className={`rounded-xl p-6 mb-4 ${isDark ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                <strong>Important:</strong> Trustie provides verification assistance, not guarantees. Our AI-powered verification achieves high accuracy but is not infallible. Verification results should be used as one factor in your decision-making process, not as the sole basis for important decisions.
              </p>
            </div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              We recommend using Trustie results alongside other verification methods, especially for high-stakes decisions such as hiring, legal proceedings, or financial transactions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>6. Subscriptions and Payments</h2>
            <ul className={`list-disc pl-6 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>Paid plans are billed monthly or annually in advance</li>
              <li>You may cancel at any time; cancellation takes effect at the end of the current billing period</li>
              <li>Prices may change with 30 days notice</li>
              <li>Unused verifications do not roll over between billing periods</li>
            </ul>
          </section>

          <section className="mb-10" id="refunds">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>7. Refund Policy</h2>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied within 14 days of your initial purchase, contact us for a full refund.
            </p>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Refunds are not available after the 14-day period, for renewal payments, or if your account has been terminated for Terms violations.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>8. Intellectual Property</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Trustie and its original content, features, and functionality are owned by Trustie and are protected by copyright, trademark, and other intellectual property laws. You retain ownership of content you submit for verification.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>9. Limitation of Liability</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              To the maximum extent permitted by law, Trustie shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the Service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>10. Termination</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              We may terminate or suspend your account at any time for violations of these Terms. You may terminate your account at any time by contacting support. Upon termination, your right to use the Service ceases immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>11. Changes to Terms</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              We may modify these Terms at any time. Material changes will be communicated via email or through the Service. Continued use after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>12. Contact</h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              For questions about these Terms, contact us at:
            </p>
            <p className={`mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <a href="mailto:legal@trustieapp.com" className="text-blue-500 hover:text-blue-400">legal@trustieapp.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
