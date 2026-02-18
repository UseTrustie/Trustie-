'use client';

import { useState, useEffect } from 'react';

// ============================================================================
// TRUSTIE LANDING PAGE - Charcoal Grey + Blue Theme
// ============================================================================

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-slate-100 text-gray-900'
    }`}>
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      <Hero isDark={isDark} />
      <Features isDark={isDark} />
      <HowItWorks isDark={isDark} />
      <ComparisonTable isDark={isDark} />
      <AIModelsStatus isDark={isDark} />
      <Pricing isDark={isDark} />
      <FAQ isDark={isDark} />
      <FinalCTA isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}

// ============================================================================
// NAVIGATION
// ============================================================================

function Navigation({ isDark, setIsDark }: { isDark: boolean; setIsDark: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? isDark 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trustie</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm`}>Features</a>
          <a href="#how-it-works" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm`}>How it works</a>
          <a href="#pricing" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm`}>Pricing</a>
          <a href="#faq" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm`}>FAQ</a>
          <div className="flex items-center gap-1 text-sm">
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>AI Database</span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">NEW</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
            )}
          </button>

          <a href="/login" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm hidden sm:block`}>Login</a>
          
          <button className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/25">
            Try Free
          </button>
        </div>
      </div>
    </nav>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function Hero({ isDark }: { isDark: boolean }) {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
            isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              AI-Powered Fact Verification
            </span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            The <span className="text-blue-500">#1 AI Fact-Checker</span>
            <br />
            for Critical Thinkers
          </h1>

          {/* Subtitle */}
          <p className={`text-xl max-w-2xl mx-auto mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Verify any claim in seconds. Get real sources, cross-reference multiple AIs, 
            and know when you're being misled.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-blue-500/25">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Fact-Checking Free
            </button>
            <button className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center gap-3 ${
              isDark 
                ? 'bg-white text-gray-900 hover:bg-gray-100' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Demo Image */}
        <div className="relative max-w-5xl mx-auto">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-blue-500/20 rounded-3xl blur-2xl" />
          
          {/* Main Demo Card */}
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${
            isDark ? 'bg-gray-800 border border-blue-500/30' : 'bg-white border border-gray-200'
          }`}>
            {/* Browser Chrome */}
            <div className={`flex items-center gap-2 px-4 py-3 border-b ${
              isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className={`px-4 py-1 rounded-md text-sm ${
                  isDark ? 'bg-gray-900 text-gray-500' : 'bg-gray-100 text-gray-500'
                }`}>
                  trustie.app
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left - Search */}
                <div className="flex-1">
                  <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <span className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Fact Check</span>
                    </div>
                    
                    <div className={`rounded-lg p-4 mb-4 ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                      <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>"The Great Wall of China is visible from space"</p>
                    </div>

                    <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
                      Verify Claim
                    </button>
                  </div>
                </div>

                {/* Right - Results */}
                <div className="flex-1">
                  <div className={`rounded-xl p-6 border ${
                    isDark ? 'bg-gray-800/50 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-red-400 font-semibold">FALSE</div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>97% confidence</div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Verified against 12 sources</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>NASA confirms it's not visible</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Common misconception since 1932</span>
                      </div>
                    </div>

                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-blue-200'}`}>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Sources: NASA, Snopes, Encyclopedia Britannica</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FEATURES SECTION
// ============================================================================

function Features({ isDark }: { isDark: boolean }) {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-Time Verification',
      description: 'Get instant fact-checks as you browse. Our AI analyzes claims in milliseconds with high accuracy.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Source Citations',
      description: 'Every verdict includes primary sources. Verify our verification yourself with direct links.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      title: 'Multi-AI Analysis',
      description: 'Cross-reference claims across GPT-4, Claude, Gemini, and more. Consensus reduces hallucinations.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Bias Detection',
      description: 'Identify political slant, emotional manipulation, and hidden agendas automatically.',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 relative">
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className={`text-[12rem] font-bold select-none ${isDark ? 'text-gray-800/50' : 'text-gray-200'}`}>2.0</span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>Trustie</span> 2.0 Features
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Everything you need to separate fact from fiction</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative rounded-2xl p-8 transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/50' 
                  : 'bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-0.5 mb-6">
                <div className={`w-full h-full rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } text-blue-500`}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>

              {/* Decorative Corner */}
              <div className={`absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-colors ${
                isDark ? 'border-gray-700 group-hover:border-blue-500/50' : 'border-gray-200 group-hover:border-blue-300'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// HOW IT WORKS
// ============================================================================

function HowItWorks({ isDark }: { isDark: boolean }) {
  const steps = [
    {
      number: '01',
      title: 'Paste Any Claim',
      description: 'Drop a statement, article link, or social media post into Trustie.',
    },
    {
      number: '02',
      title: 'AI Analyzes',
      description: 'Our multi-model system cross-references against verified databases.',
    },
    {
      number: '03',
      title: 'Get Verdict + Sources',
      description: 'Receive a clear TRUE/FALSE rating with clickable primary sources.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Large Background Text */}
        <div className="relative mb-16">
          <span className={`absolute -top-20 left-0 text-[10rem] font-bold select-none pointer-events-none ${
            isDark ? 'text-gray-800/30' : 'text-gray-200'
          }`}>
            Proof
          </span>
          <div className="relative">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How <span className="text-blue-500">Trustie</span> Works
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Three steps to truth</p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-1/2" />
              )}

              <div className={`rounded-2xl p-8 h-full transition-all duration-300 ${
                isDark 
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/50' 
                  : 'bg-white border border-gray-200 hover:border-blue-300 shadow-sm'
              }`}>
                <div className="text-6xl font-bold text-blue-500/20 mb-4">{step.number}</div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Demo Card */}
        <div className="mt-16 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 rounded-3xl blur-xl" />
          <div className={`relative rounded-2xl overflow-hidden ${
            isDark ? 'bg-gray-800 border border-blue-500/30' : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            <div className={`aspect-video flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-center">
                <button className="w-20 h-20 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors mb-4 mx-auto shadow-lg shadow-blue-500/25">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Watch Trustie in Action</div>
                <div className={isDark ? 'text-gray-500' : 'text-gray-500'}>See how we verify claims in real-time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// COMPARISON TABLE
// ============================================================================

function ComparisonTable({ isDark }: { isDark: boolean }) {
  const features = [
    { name: 'Real-time fact checking', trustie: true, chatgpt: false, perplexity: true, google: false },
    { name: 'Primary source citations', trustie: true, chatgpt: false, perplexity: true, google: false },
    { name: 'Multi-AI consensus', trustie: true, chatgpt: false, perplexity: false, google: false },
    { name: 'Bias detection', trustie: true, chatgpt: false, perplexity: false, google: false },
    { name: 'Confidence scores', trustie: true, chatgpt: false, perplexity: true, google: false },
    { name: 'Historical claim tracking', trustie: true, chatgpt: false, perplexity: false, google: false },
    { name: 'Browser extension', trustie: true, chatgpt: false, perplexity: true, google: true },
    { name: 'API access', trustie: true, chatgpt: true, perplexity: true, google: true },
  ];

  const Check = ({ highlight = false }: { highlight?: boolean }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      highlight 
        ? 'bg-blue-500/20 border-2 border-blue-500' 
        : isDark ? 'bg-gray-700' : 'bg-gray-200'
    }`}>
      <svg className={`w-4 h-4 ${highlight ? 'text-blue-400' : isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </svg>
    </div>
  );

  const Cross = () => (
    <div className="w-8 h-8 rounded-full flex items-center justify-center text-red-400">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  );

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            The Proof Is in the <span className="text-blue-500">Comparison</span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>See why Trustie leads the fact-checking revolution</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-6 px-4 font-normal ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Verification features
                </th>
                <th className="py-6 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-bold text-blue-500">Trustie</span>
                  </div>
                </th>
                <th className="py-6 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      🤖
                    </div>
                    <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ChatGPT</span>
                  </div>
                </th>
                <th className="py-6 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      🔍
                    </div>
                    <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Perplexity</span>
                  </div>
                </th>
                <th className="py-6 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      🔎
                    </div>
                    <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Google</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={`border-b transition-colors ${
                  isDark ? 'border-gray-800/50 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'
                }`}>
                  <td className={`py-5 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature.name}</td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center">
                      {feature.trustie ? <Check highlight /> : <Cross />}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center">
                      {feature.chatgpt ? <Check /> : <Cross />}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center">
                      {feature.perplexity ? <Check /> : <Cross />}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center">
                      {feature.google ? <Check /> : <Cross />}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// AI MODELS STATUS
// ============================================================================

function AIModelsStatus({ isDark }: { isDark: boolean }) {
  const [expandedModel, setExpandedModel] = useState<number | null>(0);

  const models = [
    { name: 'GPT-4 Turbo', accuracy: '94.2%', lastUpdated: '2hrs ago', status: 'Verified' },
    { name: 'Claude 3.5 Sonnet', accuracy: '96.1%', lastUpdated: '1hr ago', status: 'Verified' },
    { name: 'Gemini Pro', accuracy: '91.8%', lastUpdated: '4hrs ago', status: 'Verified' },
    { name: 'Llama 3.1 405B', accuracy: '89.4%', lastUpdated: '6hrs ago', status: 'Verified' },
    { name: 'Mistral Large', accuracy: '88.7%', lastUpdated: '3hrs ago', status: 'Verified' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="text-blue-500">AI Accuracy</span>, Tested Daily
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
            We continuously benchmark AI accuracy so you know which models to trust
          </p>
        </div>

        <div className="space-y-3">
          {models.map((model, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                expandedModel === index 
                  ? isDark 
                    ? 'border-2 border-blue-500/50 bg-gradient-to-r from-blue-500/5 to-transparent' 
                    : 'border-2 border-blue-300 bg-blue-50'
                  : isDark 
                    ? 'border border-gray-700 bg-gray-800/50' 
                    : 'border border-gray-200 bg-white'
              }`}
            >
              {/* Header */}
              <button 
                onClick={() => setExpandedModel(expandedModel === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>00{index + 1}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="text-lg">🤖</span>
                  </div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{model.name}</span>
                </div>

                <div className="flex items-center gap-6">
                  <span className={`text-sm hidden sm:block ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Last updated {model.lastUpdated}</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-400 text-sm font-medium">{model.status}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isDark ? 'text-gray-500' : 'text-gray-400'} ${expandedModel === index ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedModel === index && (
                <div className="px-5 pb-5">
                  {/* Accuracy Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Fact-check accuracy</span>
                      <span className="text-green-400 font-bold">{model.accuracy}</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                        style={{ width: model.accuracy }}
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`rounded-xl p-4 text-center ${isDark ? 'bg-gray-900' : 'bg-white border border-gray-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Accuracy based on verified claims tested against {model.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PRICING
// ============================================================================

function Pricing({ isDark }: { isDark: boolean }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pricing</h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Simple and transparent pricing for everyone</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className={`rounded-2xl p-8 transition-colors ${
            isDark ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
          }`}>
            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Free Trial</h3>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$0</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>/forever</span>
              </div>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>10 free fact-checks included</p>
            </div>

            <button className={`w-full py-3 font-semibold rounded-xl transition-colors mb-6 ${
              isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}>
              Start free trial
            </button>

            <p className={`text-center text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>No credit card required</p>

            <ul className="space-y-3">
              {[
                '10 free fact-checks',
                'Basic source citations',
                'Single AI model',
                'Web interface only',
              ].map((feature, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Tier */}
          <div className={`rounded-2xl p-8 transition-colors ${
            isDark ? 'bg-gray-800/50 border border-gray-600 hover:border-gray-500' : 'bg-white border border-gray-300 hover:border-gray-400 shadow-md'
          }`}>
            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Monthly Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$29</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>/month</span>
              </div>
              <p className={`text-sm mt-2 line-through ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Original price: $49</p>
            </div>

            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors mb-6 shadow-lg shadow-blue-500/25">
              Subscribe
            </button>

            <div className={`flex items-center justify-center gap-4 text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout
              </span>
              <span>Cancel anytime</span>
            </div>

            <ul className="space-y-3">
              {[
                '1,000 fact-checks/month',
                'Multi-AI consensus',
                'Full source citations',
                'Browser extension',
                'API access',
                '24/7 support',
              ].map((feature, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Lifetime Tier */}
          <div className={`relative rounded-2xl p-8 ${
            isDark 
              ? 'bg-gradient-to-b from-blue-500/10 to-transparent border-2 border-blue-500/50' 
              : 'bg-gradient-to-b from-blue-50 to-white border-2 border-blue-300 shadow-lg'
          }`}>
            {/* Sale Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full flex items-center gap-3 shadow-lg">
              <span>50% off</span>
              <span className="font-mono">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            <div className="mb-6 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-500">Lifetime Pro</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$199</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>One-time payment</span>
              </div>
              <p className={`text-sm mt-2 line-through ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Original price: $399</p>
            </div>

            <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors mb-6 shadow-lg shadow-blue-500/25">
              Buy now
            </button>

            <div className={`flex items-center justify-center gap-1 text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure checkout
            </div>

            <ul className="space-y-3">
              {[
                'Unlimited lifetime access',
                'All Pro features',
                'Priority support',
                'Early access to new features',
                'Custom integrations',
                'Team collaboration',
              ].map((feature, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FAQ
// ============================================================================

function FAQ({ isDark }: { isDark: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is there a free trial?',
      answer: 'Yes! You get 10 free fact-checks to test Trustie\'s capabilities. No credit card required to start.',
    },
    {
      question: 'How accurate is Trustie compared to manual fact-checking?',
      answer: 'Our multi-AI consensus system achieves 94%+ accuracy, often outperforming single-source manual checks. We always provide primary sources so you can verify our verdicts.',
    },
    {
      question: 'What sources does Trustie use?',
      answer: 'We cross-reference claims against peer-reviewed journals, government databases, established news organizations, and verified fact-checking organizations like Snopes and PolitiFact.',
    },
    {
      question: 'Can I use Trustie for my organization?',
      answer: 'Absolutely! Our API and enterprise plans are designed for newsrooms, research institutions, and businesses that need to verify information at scale.',
    },
    {
      question: 'How does multi-AI consensus work?',
      answer: 'We query multiple leading AI models (GPT-4, Claude, Gemini, etc.) with the same claim and analyze where they agree and disagree. This reduces single-model bias and hallucinations.',
    },
    {
      question: 'Is the lifetime deal really lifetime?',
      answer: 'Yes! Pay once for $199 and get unlimited access forever, including all future features and updates. No recurring fees, ever.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className={`text-lg mb-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Got Questions?</p>
          <h2 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>We've Got Answers</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? isDark 
                    ? 'border-2 border-blue-500/50 bg-gradient-to-r from-blue-500/5 to-transparent' 
                    : 'border-2 border-blue-300 bg-blue-50'
                  : isDark 
                    ? 'border border-gray-700 bg-gray-800/50' 
                    : 'border border-gray-200 bg-white'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className={`font-medium pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  openIndex === index 
                    ? 'border-blue-500/50 bg-blue-500/10' 
                    : isDark ? 'border-gray-700' : 'border-gray-300'
                }`}>
                  {openIndex === index ? (
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Help Center Link */}
        <div className={`mt-8 p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
        }`}>
          <div>
            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Couldn't find your answer?</p>
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Send us an email at <a href="mailto:support@trustie.app" className="text-blue-500">support@trustie.app</a></p>
          </div>
          <button className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}>
            Visit help center
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA
// ============================================================================

function FinalCTA({ isDark }: { isDark: boolean }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/25">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Ready to Know the <span className="text-blue-500">Truth</span>?
        </h2>
        <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Start Your Free Trial Today
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-3 shadow-lg shadow-blue-500/25">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Fact-Checking Free
          </button>
          <button className={`px-8 py-4 font-semibold rounded-xl transition-colors flex items-center gap-3 ${
            isDark 
              ? 'bg-white text-gray-900 hover:bg-gray-100' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer({ isDark }: { isDark: boolean }) {
  return (
    <footer className={`border-t py-16 px-6 ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trustie</span>
            </div>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              The AI-powered fact-checking platform designed to help you separate truth from fiction.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mb-6">
              {['X', 'YT', 'LI'].map((icon) => (
                <a key={icon} href="#" className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                  isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-500 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900'
                }`}>
                  {icon}
                </a>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>All systems online</span>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pages</h4>
            <ul className="space-y-3">
              {['Contact Support', 'Create account', 'Login', 'FAQ', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Compare</h4>
            <ul className="space-y-3">
              {['vs ChatGPT', 'vs Perplexity', 'vs Snopes', 'vs Google'].map((link) => (
                <li key={link}>
                  <a href="#" className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>© 2026 Trustie. All rights reserved.</p>
        </div>

        {/* Large Background Text */}
        <div className="mt-8 overflow-hidden">
          <span className={`text-[8rem] md:text-[12rem] font-bold select-none ${isDark ? 'text-gray-800/30' : 'text-gray-100'}`}>
            Trustie
          </span>
        </div>
      </div>
    </footer>
  );
}
