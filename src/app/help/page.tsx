'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function HelpPage() {
  const { isSignedIn } = useUser();
  const [activeSection, setActiveSection] = useState('getting-started');
  const authLink = isSignedIn ? '/app' : '/sign-up';

  const sections: Record<string, { title: string; icon: string }> = {
    'getting-started': { title: 'Getting Started', icon: '🚀' },
    'verification': { title: 'Verification', icon: '✓' },
    'billing': { title: 'Billing & Plans', icon: '💳' },
    'faq': { title: 'FAQ', icon: '❓' },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 border-r border-gray-800">
          <div className="p-6">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-bold">Trustie Docs</span>
            </Link>

            <nav className="space-y-1">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${activeSection === key ? 'bg-blue-500/10 text-blue-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                >
                  <span>{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-xs mb-2 text-gray-600">Support</p>
              <a href="mailto:trustietechnologies@gmail.com" className="text-sm text-blue-500 hover:text-blue-400">
                trustietechnologies@gmail.com
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 min-h-screen">
          <header className="sticky top-0 z-10 px-8 py-4 border-b bg-gray-950/95 border-gray-800 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-white">
                {sections[activeSection]?.title}
              </h1>
              <Link href={authLink} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg">
                {isSignedIn ? 'Open App' : 'Try Free'}
              </Link>
            </div>
          </header>

          <div className="p-8 max-w-4xl">
            {activeSection === 'getting-started' && <GettingStarted authLink={authLink} />}
            {activeSection === 'verification' && <Verification />}
            {activeSection === 'billing' && <Billing />}
            {activeSection === 'faq' && <FAQ />}
          </div>
        </main>
      </div>
    </div>
  );
}

function GettingStarted({ authLink }: { authLink: string }) {
  const steps = [
    { title: 'Create an account', description: 'Sign up at trustieapp.com — free, no credit card required.' },
    { title: 'Open the verification tool', description: 'Go to the App page to access the verification interface.' },
    { title: 'Paste your text', description: 'Copy and paste a resume, bio, or any text with claims to verify.' },
    { title: 'Click Verify', description: 'Trustie extracts claims and verifies each one against multiple sources.' },
    { title: 'Review results', description: 'See verdicts, confidence scores, and source links for each claim.' },
  ];

  return (
    <div>
      <p className="text-lg mb-8 text-gray-400">
        Get started verifying claims in under 2 minutes.
      </p>

      <div className="rounded-xl p-6 mb-8 bg-gray-900 border border-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-white">Quick Start</h2>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-medium text-white">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href={authLink} className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
        Try it now →
      </Link>
    </div>
  );
}

function Verification() {
  return (
    <div>
      <p className="text-lg mb-8 text-gray-400">
        Understanding how Trustie verifies claims.
      </p>

      <div className="space-y-6">
        <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
          <h3 className="font-semibold mb-3 text-white">Verdicts Explained</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-green-500 font-bold">VERIFIED</span>
              <span className="text-gray-400">— Sources confirm the claim</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500 font-bold">UNVERIFIED</span>
              <span className="text-gray-400">— Sources contradict the claim</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 font-bold">PARTIAL</span>
              <span className="text-gray-400">— Some discrepancies found</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 font-bold">UNABLE TO VERIFY</span>
              <span className="text-gray-400">— Not enough data available</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
          <h3 className="font-semibold mb-3 text-white">Source Tiers</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-white">Tier 1 (3x weight)</span>
              <span className="text-gray-500">— .gov, .edu, LinkedIn, Credly</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="text-white">Tier 2 (2x weight)</span>
              <span className="text-gray-500">— News, GitHub, company sites</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-white">Tier 3 (1x weight)</span>
              <span className="text-gray-500">— Wikipedia, blogs, forums</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Billing() {
  return (
    <div>
      <p className="text-lg mb-8 text-gray-400">
        Manage your subscription and billing.
      </p>

      <div className="rounded-xl p-6 mb-6 bg-gray-900 border border-gray-800">
        <h3 className="font-semibold mb-4 text-white">Plans</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-800">
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">Free</span>
              <span className="text-gray-400">$0</span>
            </div>
            <p className="text-sm mt-1 text-gray-500">5 verifications total</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800">
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">Starter</span>
              <span className="text-gray-400">$49 one-time</span>
            </div>
            <p className="text-sm mt-1 text-gray-500">50 verifications, never expires</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-800">
            <div className="flex justify-between items-center">
              <span className="font-medium text-white">Pro</span>
              <span className="text-gray-400">$29/mo</span>
            </div>
            <p className="text-sm mt-1 text-gray-500">Unlimited verifications</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl p-6 bg-gray-900 border border-gray-800">
        <h3 className="font-semibold mb-3 text-white">Billing FAQ</h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-white">Can I cancel anytime?</p>
            <p className="text-sm text-gray-500">Yes. No contracts, cancel in one click.</p>
          </div>
          <div>
            <p className="font-medium text-white">Refund policy?</p>
            <p className="text-sm text-gray-500">14-day money-back guarantee on all paid plans.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    { q: 'What can Trustie verify?', a: 'Employment history, education credentials, certifications, achievements, and any factual claims in text.' },
    { q: 'How accurate is it?', a: 'Accuracy depends on available public information. We show confidence scores so you know when to verify manually.' },
    { q: 'Is my data stored?', a: 'No. Text is processed in real-time and immediately discarded.' },
    { q: 'What sources do you check?', a: 'LinkedIn, .edu/.gov sites, company websites, news archives, professional certification bodies, and more.' },
  ];

  return (
    <div>
      <p className="text-lg mb-8 text-gray-400">
        Common questions about Trustie.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="rounded-xl p-6 bg-gray-900 border border-gray-800">
            <h3 className="font-semibold mb-2 text-white">{faq.q}</h3>
            <p className="text-gray-400">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl p-6 bg-blue-500/10 border border-blue-500/30">
        <p className="text-gray-300">
          Still have questions? Email us at <a href="mailto:trustietechnologies@gmail.com" className="text-blue-500">trustietechnologies@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
