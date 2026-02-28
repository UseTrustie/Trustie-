'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HelpPage() {
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = {
    'getting-started': { title: 'Getting Started', icon: '🚀' },
    'verification': { title: 'Verification', icon: '✓' },
    'api': { title: 'API Reference', icon: '⚡' },
    'billing': { title: 'Billing & Plans', icon: '💳' },
    'faq': { title: 'FAQ', icon: '❓' },
  };

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-0 bottom-0 w-64 border-r ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
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
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${activeSection === key ? 'bg-blue-500/10 text-blue-500' : isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  <span>{section.icon}</span>
                  {section.title}
                </button>
              ))}
            </nav>

            <div className={`mt-8 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <p className={`text-xs mb-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Support</p>
              <a href="mailto:support@trustieapp.com" className="text-sm text-blue-500 hover:text-blue-400">
                support@trustieapp.com
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 min-h-screen">
          <header className={`sticky top-0 z-10 px-8 py-4 border-b ${isDark ? 'bg-gray-950/95 border-gray-800 backdrop-blur-md' : 'bg-white/95 border-gray-200 backdrop-blur-md'}`}>
            <div className="flex items-center justify-between">
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {sections[activeSection as keyof typeof sections].title}
              </h1>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsDark(!isDark)} className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>
                  {isDark ? '☀️' : '🌙'}
                </button>
                <Link href="/app" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg">
                  Open App
                </Link>
              </div>
            </div>
          </header>

          <div className="p-8 max-w-4xl">
            {activeSection === 'getting-started' && <GettingStarted isDark={isDark} />}
            {activeSection === 'verification' && <Verification isDark={isDark} />}
            {activeSection === 'api' && <APIReference isDark={isDark} />}
            {activeSection === 'billing' && <Billing isDark={isDark} />}
            {activeSection === 'faq' && <FAQ isDark={isDark} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function GettingStarted({ isDark }: { isDark: boolean }) {
  const steps = [
    { title: 'Create an account', description: 'Sign up at trustieapp.com — it\'s free, no credit card required.' },
    { title: 'Open the verification tool', description: 'Go to the App page to access the verification interface.' },
    { title: 'Paste your text', description: 'Copy and paste a resume, bio, or any text with claims to verify.' },
    { title: 'Click Verify', description: 'Trustie extracts claims and verifies each one against multiple sources.' },
    { title: 'Review results', description: 'See verdicts, confidence scores, and source links for each claim.' },
    { title: 'Export if needed', description: 'Download JSON or PDF reports for compliance documentation.' },
  ];

  return (
    <div>
      <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Welcome to Trustie! Get started verifying claims in under 2 minutes.
      </p>

      <div className={`rounded-xl p-6 mb-8 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <h2 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Start</h2>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {idx + 1}
              </div>
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link href="/app" className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
        Try it now →
      </Link>
    </div>
  );
}

function Verification({ isDark }: { isDark: boolean }) {
  return (
    <div>
      <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Understanding how Trustie verifies claims.
      </p>

      <div className="space-y-6">
        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
          <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Verdicts Explained</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-green-500 font-bold">VERIFIED</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>— Multiple authoritative sources confirm the claim</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-red-500 font-bold">UNVERIFIED</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>— Sources contradict or refute the claim</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 font-bold">PARTIAL</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>— Some discrepancies found (e.g., dates differ)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 font-bold">UNABLE TO VERIFY</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>— Not enough data to make a determination</span>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
          <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Confidence Scores</h3>
          <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Each claim receives a confidence score from 0% to 100% based on:
          </p>
          <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <li>• Number of sources that corroborate the claim</li>
            <li>• Quality tier of sources (.gov/.edu = higher weight)</li>
            <li>• AI model agreement (multi-model consensus)</li>
            <li>• Absence of commercial bias in sources</li>
          </ul>
        </div>

        <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
          <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Source Tiers</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Tier 1 (3x weight)</span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>— .gov, .edu, LinkedIn, Credly</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Tier 2 (2x weight)</span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>— News, company sites, GitHub</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className={isDark ? 'text-white' : 'text-gray-900'}>Tier 3 (1x weight)</span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>— Wikipedia, blogs, forums</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function APIReference({ isDark }: { isDark: boolean }) {
  const codeExample = `fetch('https://api.trustieapp.com/v1/verify', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: "John Smith worked at Google for 5 years...",
    mode: "resume"
  })
})`;

  return (
    <div>
      <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Integrate Trustie verification into your applications.
      </p>

      <div className={`rounded-xl p-6 mb-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Authentication</h3>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          All API requests require a Bearer token. Get your API key from the dashboard (Team plan and above).
        </p>
        <code className={`block p-3 rounded-lg text-sm ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          Authorization: Bearer sk_live_xxxxxxxxxxxxxxxx
        </code>
      </div>

      <div className={`rounded-xl p-6 mb-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>POST /v1/verify</h3>
        <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Submit text for verification.
        </p>
        <pre className={`p-4 rounded-lg text-sm overflow-x-auto ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
          {codeExample}
        </pre>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Rate Limits</h3>
        <div className="space-y-2">
          <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>Team Plan</span>
            <span>10,000 requests/month</span>
          </div>
          <div className={`flex justify-between ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>Enterprise</span>
            <span>Unlimited</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Billing({ isDark }: { isDark: boolean }) {
  return (
    <div>
      <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Manage your subscription and billing.
      </p>

      <div className={`rounded-xl p-6 mb-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Plans</h3>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Free</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>$0/mo</span>
            </div>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>5 verifications/day</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Pro</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>$24/mo (annual)</span>
            </div>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Unlimited verifications, export, priority</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Team</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>$79/mo (annual)</span>
            </div>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>10 seats, API, batch CSV</p>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Enterprise</span>
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Custom</span>
            </div>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Unlimited everything, SSO, SLA</p>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Billing FAQ</h3>
        <div className="space-y-4">
          <div>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Can I cancel anytime?</p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Yes. No contracts, cancel in one click.</p>
          </div>
          <div>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Do you offer refunds?</p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>14-day money-back guarantee on all paid plans.</p>
          </div>
          <div>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Payment methods?</p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>All major credit cards via Stripe. Enterprise can pay by invoice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ({ isDark }: { isDark: boolean }) {
  const faqs = [
    { q: 'What can Trustie verify?', a: 'Employment history, education credentials, certifications, achievements, and any factual claims in text.' },
    { q: 'How accurate is it?', a: '94%+ accuracy through multi-source verification and AI consensus. We show confidence scores so you know when to dig deeper.' },
    { q: 'Is my data stored?', a: 'No. Text is processed in real-time and immediately discarded. We don\'t store the content you verify.' },
    { q: 'What sources do you check?', a: 'LinkedIn, .edu/.gov databases, company websites, news archives, professional certification bodies, and more.' },
    { q: 'Can I use the API?', a: 'Yes, on Team and Enterprise plans. Full REST API with webhooks.' },
    { q: 'Do you offer discounts?', a: 'Yes — startups, nonprofits, and educational institutions. Email support@trustieapp.com.' },
  ];

  return (
    <div>
      <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Common questions about Trustie.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`rounded-xl p-6 ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.q}</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{faq.a}</p>
          </div>
        ))}
      </div>

      <div className={`mt-8 rounded-xl p-6 ${isDark ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
          Still have questions? Email us at <a href="mailto:support@trustieapp.com" className="text-blue-500">support@trustieapp.com</a>
        </p>
      </div>
    </div>
  );
}
