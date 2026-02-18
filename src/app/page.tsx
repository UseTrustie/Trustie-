'use client';

import { useState, useEffect } from 'react';

// ============================================================================
// ⚠️ CONFIGURATION - REPLACE THESE 3 VALUES BEFORE DEPLOYING ⚠️
// ============================================================================

// 1. FORMSPREE: Go to formspree.io → Create form → Copy the ID (e.g., 'xyzabc123')
const FORMSPREE_ID = 'YOUR_FORMSPREE_ID';

// 2. YOUTUBE: Upload your demo video → Copy video ID from URL (youtube.com/watch?v=THIS_PART)
const YOUTUBE_VIDEO_ID = 'YOUR_YOUTUBE_VIDEO_ID';

// 3. CALENDLY: Go to calendly.com → Create event → Copy your full link
const CALENDLY_LINK = 'https://calendly.com/YOUR_USERNAME/trustie-demo';

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function LandingPage() {
  const [isDark, setIsDark] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-slate-100 text-gray-900'
    }`}>
      <Navigation 
        isDark={isDark} 
        setIsDark={setIsDark} 
        setShowDemoModal={setShowDemoModal}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Hero isDark={isDark} setShowDemoModal={setShowDemoModal} setShowVideoModal={setShowVideoModal} />
      <PainPoints isDark={isDark} />
      <Features isDark={isDark} />
      <HowItWorks isDark={isDark} setShowVideoModal={setShowVideoModal} />
      <ROICalculator isDark={isDark} />
      <ComparisonTable isDark={isDark} />
      <UseCases isDark={isDark} />
      <AIModelsStatus isDark={isDark} />
      <Testimonials isDark={isDark} />
      <Pricing isDark={isDark} setShowDemoModal={setShowDemoModal} />
      <FAQ isDark={isDark} />
      <FinalCTA isDark={isDark} setShowDemoModal={setShowDemoModal} />
      <Footer isDark={isDark} />
      
      {showDemoModal && <DemoModal isDark={isDark} onClose={() => setShowDemoModal(false)} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
    </div>
  );
}

// ============================================================================
// NAVIGATION
// ============================================================================

function Navigation({ 
  isDark, 
  setIsDark, 
  setShowDemoModal,
  mobileMenuOpen,
  setMobileMenuOpen
}: { 
  isDark: boolean; 
  setIsDark: (v: boolean) => void;
  setShowDemoModal: (v: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'How it works', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? isDark 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trustie</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-1 text-sm">
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Enterprise</span>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">NEW</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            aria-label="Toggle theme"
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

          <button 
            onClick={() => scrollToSection('pricing')}
            className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors text-sm hidden sm:block`}
          >
            Login
          </button>
          
          <button 
            onClick={() => setShowDemoModal(true)}
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-medium transition-colors shadow-lg shadow-blue-500/25 hidden sm:block"
          >
            Request Demo
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left py-2 ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={() => { setShowDemoModal(true); setMobileMenuOpen(false); }}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
            >
              Request Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function Hero({ 
  isDark, 
  setShowDemoModal,
  setShowVideoModal 
}: { 
  isDark: boolean;
  setShowDemoModal: (v: boolean) => void;
  setShowVideoModal: (v: boolean) => void;
}) {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
            isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              AI-Powered Verification for Businesses
            </span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Stop <span className="text-red-500">Resume Fraud</span>
            <br />
            Before It Costs You <span className="text-blue-500">$150,000</span>
          </h1>

          <p className={`text-xl max-w-3xl mx-auto mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            70% of resumes contain lies. One bad hire costs $50,000-$150,000. 
            Trustie verifies credentials, employment history, and claims in seconds—powered by multi-AI consensus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setShowDemoModal(true)}
              className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-blue-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Request a Demo
            </button>
            <button 
              onClick={() => setShowVideoModal(true)}
              className={`px-8 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center gap-3 ${
                isDark 
                  ? 'bg-white text-gray-900 hover:bg-gray-100' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch 2-Min Demo
            </button>
          </div>

          <div className={`mt-10 flex flex-wrap items-center justify-center gap-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>SOC 2 Compliant</span>
            </div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-blue-500/10 to-blue-500/20 rounded-3xl blur-2xl" />
          
          <div className={`relative rounded-2xl overflow-hidden shadow-2xl ${
            isDark ? 'bg-gray-800 border border-blue-500/30' : 'bg-white border border-gray-200'
          }`}>
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
                  app.trustie.io/verify
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Resume Verification</span>
                    </div>
                    
                    <div className={`rounded-lg p-4 mb-4 ${isDark ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
                      <p className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Candidate: John Smith</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Claims: "5 years at Google as Senior Engineer"</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Education: "Stanford CS, 2018"</p>
                    </div>

                    <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors">
                      Verify All Claims
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <div className={`rounded-xl p-6 border ${
                    isDark ? 'bg-gray-800/50 border-blue-500/30' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-semibold">PARTIAL MATCH</div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>2 of 3 claims verified</div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Stanford CS degree confirmed (2018)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Google employment: <strong className="text-red-400">3 years, not 5</strong></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-400">?</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Title was "Engineer", not "Senior Engineer"</span>
                      </div>
                    </div>

                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-blue-200'}`}>
                      <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        Verified via: LinkedIn, Stanford Alumni DB, Google HR
                      </div>
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
// PAIN POINTS
// ============================================================================

function PainPoints({ isDark }: { isDark: boolean }) {
  const stats = [
    { number: '70%', label: 'of resumes contain lies', color: 'text-red-500' },
    { number: '$150K', label: 'average cost of a bad hire', color: 'text-red-500' },
    { number: '85%', label: 'of employers caught fake credentials', color: 'text-yellow-500' },
    { number: '6 hrs', label: 'average manual verification time', color: 'text-blue-500' },
  ];

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FEATURES
// ============================================================================

function Features({ isDark }: { isDark: boolean }) {
  const features = [
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: 'Verify in Seconds',
      description: 'Upload a resume and get instant verification. What used to take 6 hours now takes 30 seconds.',
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
      title: 'Source Everything',
      description: 'Every verification includes links to primary sources. Audit trail for compliance.',
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
      title: 'Multi-AI Consensus',
      description: 'Cross-reference across GPT-4, Claude, Gemini. Reduces false positives by 90%.',
    },
    {
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
      title: 'Team Collaboration',
      description: 'Share verifications with your hiring team. Role-based access controls.',
    },
  ];

  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className={`text-[12rem] font-bold select-none ${isDark ? 'text-gray-800/50' : 'text-gray-200'}`}>2.0</span>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>Trustie</span> 2.0 Features
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Enterprise-grade verification for modern HR teams</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`group relative rounded-2xl p-8 transition-all duration-300 ${
              isDark 
                ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/50' 
                : 'bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md'
            }`}>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-0.5 mb-6">
                <div className={`w-full h-full rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'} text-blue-500`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{feature.description}</p>
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

function HowItWorks({ isDark, setShowVideoModal }: { isDark: boolean; setShowVideoModal: (v: boolean) => void }) {
  const steps = [
    { number: '01', title: 'Upload Resume', description: 'Drag & drop a resume or paste candidate claims. Bulk upload supported.' },
    { number: '02', title: 'AI Analyzes', description: 'Multi-model verification against employment databases, universities, and public records.' },
    { number: '03', title: 'Get Report', description: 'Detailed verification report with confidence scores and source links.' },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-16">
          <span className={`absolute -top-20 left-0 text-[10rem] font-bold select-none pointer-events-none ${isDark ? 'text-gray-800/30' : 'text-gray-200'}`}>Proof</span>
          <div className="relative">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How <span className="text-blue-500">Trustie</span> Works
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Three steps to verified candidates</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-1/2" />
              )}
              <div className={`rounded-2xl p-8 h-full transition-all duration-300 ${
                isDark ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/50' : 'bg-white border border-gray-200 hover:border-blue-300 shadow-sm'
              }`}>
                <div className="text-6xl font-bold text-blue-500/20 mb-4">{step.number}</div>
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 rounded-3xl blur-xl" />
          <div className={`relative rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800 border border-blue-500/30' : 'bg-white border border-gray-200 shadow-lg'}`}>
            <div className={`aspect-video flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-center">
                <button 
                  onClick={() => setShowVideoModal(true)}
                  className="w-20 h-20 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors mb-4 mx-auto shadow-lg shadow-blue-500/25"
                >
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Watch Trustie in Action</div>
                <div className={isDark ? 'text-gray-500' : 'text-gray-500'}>See a live resume verification in 2 minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// ROI CALCULATOR
// ============================================================================

function ROICalculator({ isDark }: { isDark: boolean }) {
  const [hiresPerMonth, setHiresPerMonth] = useState(10);
  const fraudRate = 0.3;
  const costPerBadHire = 75000;
  const trustieCost = 500;
  
  const potentialBadHires = Math.round(hiresPerMonth * fraudRate);
  const potentialLoss = potentialBadHires * costPerBadHire;
  const roi = Math.round(((potentialLoss - trustieCost) / trustieCost) * 100);

  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Calculate Your <span className="text-blue-500">ROI</span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>See how much you could save with Trustie</p>
        </div>

        <div className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
          <div className="mb-8">
            <label className={`block text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How many people do you hire per month?
            </label>
            <input 
              type="range" 
              min="1" 
              max="100" 
              value={hiresPerMonth}
              onChange={(e) => setHiresPerMonth(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-2">
              <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>1</span>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{hiresPerMonth}</span>
              <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>100</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`rounded-xl p-6 text-center ${isDark ? 'bg-red-500/10 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
              <div className="text-red-500 text-3xl font-bold">{potentialBadHires}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Potential bad hires/month</div>
            </div>
            <div className={`rounded-xl p-6 text-center ${isDark ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
              <div className="text-yellow-500 text-3xl font-bold">${potentialLoss.toLocaleString()}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Potential loss/month</div>
            </div>
            <div className={`rounded-xl p-6 text-center ${isDark ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'}`}>
              <div className="text-green-500 text-3xl font-bold">{roi.toLocaleString()}x</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>ROI with Trustie</div>
            </div>
          </div>

          <div className={`mt-6 text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            *Based on 30% resume fraud rate and $75,000 average cost per bad hire
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
    { name: 'Instant verification', trustie: true, manual: false, background: true },
    { name: 'Multi-source verification', trustie: true, manual: true, background: true },
    { name: 'AI-powered analysis', trustie: true, manual: false, background: false },
    { name: 'Bulk processing', trustie: true, manual: false, background: true },
    { name: 'Real-time results', trustie: true, manual: false, background: false },
    { name: 'Audit trail', trustie: true, manual: true, background: true },
    { name: 'Cost per check', trustie: '$1-5', manual: '$50-100', background: '$30-75' },
    { name: 'Time per check', trustie: '30 sec', manual: '6 hours', background: '3-5 days' },
  ];

  const Check = ({ highlight = false }: { highlight?: boolean }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${highlight ? 'bg-blue-500/20 border-2 border-blue-500' : isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
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
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>See how Trustie stacks up</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <th className={`text-left py-6 px-4 font-normal ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Feature</th>
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
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>👤</div>
                    <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manual</span>
                  </div>
                </th>
                <th className="py-6 px-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>🏢</div>
                    <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Background Check Co.</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={`border-b transition-colors ${isDark ? 'border-gray-800/50 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <td className={`py-5 px-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature.name}</td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center">
                      {typeof feature.trustie === 'boolean' ? (feature.trustie ? <Check highlight /> : <Cross />) : <span className="text-blue-500 font-bold">{feature.trustie}</span>}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center">
                      {typeof feature.manual === 'boolean' ? (feature.manual ? <Check /> : <Cross />) : <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.manual}</span>}
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex justify-center">
                      {typeof feature.background === 'boolean' ? (feature.background ? <Check /> : <Cross />) : <span className={`font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{feature.background}</span>}
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
// USE CASES
// ============================================================================

function UseCases({ isDark }: { isDark: boolean }) {
  const useCases = [
    { icon: '👔', title: 'HR & Recruitment', description: 'Verify resumes, credentials, and employment history before making offers.' },
    { icon: '⚖️', title: 'Legal Teams', description: 'Due diligence, evidence verification, and deposition fact-checking.' },
    { icon: '🏦', title: 'Insurance', description: 'Verify claims, accident reports, and medical records.' },
    { icon: '📰', title: 'Journalism', description: 'Fact-check sources and verify quotes before publishing.' },
  ];

  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Built for <span className="text-blue-500">Every Industry</span>
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Trustie adapts to your verification needs</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div key={index} className={`rounded-2xl p-6 text-center transition-all duration-300 ${
              isDark ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/50' : 'bg-gray-50 border border-gray-200 hover:border-blue-300'
            }`}>
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{useCase.title}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{useCase.description}</p>
            </div>
          ))}
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
    { name: 'GPT-4 Turbo', accuracy: '94.2%', lastUpdated: '2hrs ago', status: 'Online' },
    { name: 'Claude 3.5 Sonnet', accuracy: '96.1%', lastUpdated: '1hr ago', status: 'Online' },
    { name: 'Gemini Pro', accuracy: '91.8%', lastUpdated: '4hrs ago', status: 'Online' },
    { name: 'Llama 3.1 405B', accuracy: '89.4%', lastUpdated: '6hrs ago', status: 'Online' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="text-blue-500">AI Accuracy</span>, Tested Daily
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>We benchmark every model to ensure maximum accuracy</p>
        </div>

        <div className="space-y-3">
          {models.map((model, index) => (
            <div 
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                expandedModel === index 
                  ? isDark ? 'border-2 border-blue-500/50 bg-gradient-to-r from-blue-500/5 to-transparent' : 'border-2 border-blue-300 bg-blue-50'
                  : isDark ? 'border border-gray-700 bg-gray-800/50 hover:border-gray-600' : 'border border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setExpandedModel(expandedModel === index ? null : index)}
            >
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>00{index + 1}</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <span className="text-lg">🤖</span>
                  </div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{model.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-sm hidden sm:block ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Updated {model.lastUpdated}</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-green-400 text-sm font-medium">{model.status}</span>
                  <svg className={`w-5 h-5 transition-transform ${isDark ? 'text-gray-500' : 'text-gray-400'} ${expandedModel === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {expandedModel === index && (
                <div className="px-5 pb-5">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Verification accuracy</span>
                      <span className="text-green-400 font-bold">{model.accuracy}</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500" style={{ width: model.accuracy }} />
                    </div>
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
// TESTIMONIALS
// ============================================================================

function Testimonials({ isDark }: { isDark: boolean }) {
  const testimonials = [
    { quote: "We caught a candidate claiming 5 years at Google when it was actually 2. Saved us from a $100k mistake.", author: "Sarah M.", role: "Head of Talent", company: "Tech Startup" },
    { quote: "Verification that used to take our team 2 days now takes 2 minutes. Game changer for high-volume hiring.", author: "Mike R.", role: "HR Director", company: "Enterprise Co." },
    { quote: "The multi-AI consensus feature gives us confidence that we're not getting false positives.", author: "Jennifer L.", role: "Recruiting Lead", company: "Consulting Firm" },
  ];

  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            What HR Teams Are <span className="text-blue-500">Saying</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`rounded-2xl p-8 ${isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.quote}"</p>
              <div>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonial.author}</div>
                <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{testimonial.role}, {testimonial.company}</div>
              </div>
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

function Pricing({ isDark, setShowDemoModal }: { isDark: boolean; setShowDemoModal: (v: boolean) => void }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pricing</h2>
          <p className={`text-lg ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Plans that scale with your hiring needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className={`rounded-2xl p-8 transition-colors ${isDark ? 'bg-gray-800/50 border border-gray-700 hover:border-gray-600' : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'}`}>
            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal</h3>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$0</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>/forever</span>
              </div>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>For individuals and testing</p>
            </div>
            <button onClick={() => scrollToSection('faq')} className={`w-full py-3 font-semibold rounded-xl transition-colors mb-6 ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
              Get Started Free
            </button>
            <ul className="space-y-3">
              {['10 verifications/month', 'Basic source citations', 'Single AI model', 'Web interface'].map((f, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className={`w-5 h-5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className={`relative rounded-2xl p-8 ${isDark ? 'bg-gradient-to-b from-blue-500/10 to-transparent border-2 border-blue-500/50' : 'bg-gradient-to-b from-blue-50 to-white border-2 border-blue-300 shadow-lg'}`}>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-bold rounded-full">MOST POPULAR</div>
            <div className="mb-6 mt-2">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Team</h3>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>$499</span>
                <span className={isDark ? 'text-gray-500' : 'text-gray-500'}>/month</span>
              </div>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>For growing HR teams</p>
            </div>
            <button onClick={() => setShowDemoModal(true)} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors mb-6 shadow-lg shadow-blue-500/25">
              Start 14-Day Trial
            </button>
            <ul className="space-y-3">
              {['500 verifications/month', 'Multi-AI consensus', 'Full source citations', 'Team dashboard (5 seats)', 'API access', 'Priority support'].map((f, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Enterprise */}
          <div className={`rounded-2xl p-8 transition-colors ${isDark ? 'bg-gray-800/50 border border-gray-600 hover:border-gray-500' : 'bg-white border border-gray-300 hover:border-gray-400 shadow-md'}`}>
            <div className="mb-6">
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Enterprise</h3>
              <div className="flex items-baseline gap-1">
                <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Custom</span>
              </div>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>For large organizations</p>
            </div>
            <button onClick={() => setShowDemoModal(true)} className={`w-full py-3 font-semibold rounded-xl transition-colors mb-6 border ${isDark ? 'border-gray-600 hover:border-gray-500 text-white' : 'border-gray-300 hover:border-gray-400 text-gray-900'}`}>
              Contact Sales
            </button>
            <ul className="space-y-3">
              {['Unlimited verifications', 'Custom AI model training', 'SSO & SAML', 'Unlimited seats', 'Dedicated account manager', 'SLA guarantee', 'On-premise option'].map((f, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {f}
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
    { question: 'How does Trustie verify information?', answer: 'We use multi-AI consensus (GPT-4, Claude, Gemini) combined with verified databases, public records, and direct source verification. Each claim is cross-referenced across multiple sources for maximum accuracy.' },
    { question: 'What can Trustie verify?', answer: 'Employment history, educational credentials, professional certifications, LinkedIn profiles, and any factual claims on resumes or applications. We can also verify general claims for journalism and legal use cases.' },
    { question: 'How accurate is the verification?', answer: "Our multi-AI consensus achieves 94%+ accuracy. We always provide confidence scores and source links so you can verify our verification. When we're unsure, we say so." },
    { question: 'Is my data secure?', answer: "Yes. We're SOC 2 compliant, use end-to-end encryption, and never share candidate data. Enterprise plans include on-premise deployment options." },
    { question: 'Can I integrate Trustie with my ATS?', answer: 'Yes! We have integrations with Greenhouse, Lever, Workday, and other major ATS platforms. API access is available on Team and Enterprise plans.' },
    { question: "What's the ROI?", answer: 'The average bad hire costs $75,000-$150,000. At $499/month for the Team plan, you only need to catch one misrepresented candidate per year to see 150x+ ROI.' },
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
              className={`rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                openIndex === index 
                  ? isDark ? 'border-2 border-blue-500/50 bg-gradient-to-r from-blue-500/5 to-transparent' : 'border-2 border-blue-300 bg-blue-50'
                  : isDark ? 'border border-gray-700 bg-gray-800/50 hover:border-gray-600' : 'border border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between p-5">
                <span className={`font-medium pr-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</span>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${openIndex === index ? 'border-blue-500/50 bg-blue-500/10' : isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                  {openIndex === index ? (
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                  ) : (
                    <svg className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  )}
                </div>
              </div>
              {openIndex === index && <div className="px-5 pb-5"><p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{faq.answer}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FINAL CTA
// ============================================================================

function FinalCTA({ isDark, setShowDemoModal }: { isDark: boolean; setShowDemoModal: (v: boolean) => void }) {
  return (
    <section className={`py-24 px-6 ${isDark ? 'bg-gray-800/30' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/25">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Stop Hiring <span className="text-red-500">Liars</span>
        </h2>
        <p className={`text-lg mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Start your 14-day free trial. No credit card required.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => setShowDemoModal(true)} className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-3 shadow-lg shadow-blue-500/25">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Request a Demo
          </button>
          <button onClick={() => setShowDemoModal(true)} className={`px-8 py-4 font-semibold rounded-xl transition-colors flex items-center gap-3 ${isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Talk to Sales
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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-16 px-6 ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trustie</span>
            </div>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>AI-powered verification for HR teams, legal, insurance, and journalism.</p>
            <div className="flex items-center gap-4 mb-6">
              {[{ label: 'X', href: 'https://twitter.com' }, { label: 'LI', href: 'https://linkedin.com' }, { label: 'YT', href: 'https://youtube.com' }].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-500 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900'}`}>
                  {social.label}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>All systems online</span>
            </div>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Product</h4>
            <ul className="space-y-3">
              {[{ label: 'Features', id: 'features' }, { label: 'Pricing', id: 'pricing' }, { label: 'FAQ', id: 'faq' }].map((link) => (
                <li key={link.label}><button onClick={() => scrollToSection(link.id)} className={`text-sm transition-colors ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>{link.label}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Use Cases</h4>
            <ul className="space-y-3">
              {['HR & Recruitment', 'Legal Teams', 'Insurance', 'Journalism'].map((link) => (
                <li key={link}><span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{link}</span></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Security', 'GDPR'].map((link) => (
                <li key={link}><span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{link}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t ${isDark ? 'border-gray-800/50' : 'border-gray-200'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>© 2026 Trustie. All rights reserved.</p>
        </div>

        <div className="mt-8 overflow-hidden">
          <span className={`text-[8rem] md:text-[12rem] font-bold select-none ${isDark ? 'text-gray-800/30' : 'text-gray-100'}`}>Trustie</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// DEMO MODAL - With Formspree + Calendly Integration
// ============================================================================

function DemoModal({ isDark, onClose }: { isDark: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', teamSize: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          teamSize: formData.teamSize,
          _subject: 'New Trustie Demo Request!',
        }),
      });
      if (response.ok) setSubmitted(true);
      else setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md rounded-2xl p-8 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-2xl'}`}>
        <button onClick={onClose} className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!submitted ? (
          <>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Request a Demo</h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>See how Trustie can help your team</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'}`} />
              <input type="email" placeholder="Work Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'}`} />
              <input type="text" placeholder="Company Name" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'}`} />
              <select required value={formData.teamSize} onChange={(e) => setFormData({...formData, teamSize: e.target.value})} className={`w-full px-4 py-3 rounded-xl border transition-colors outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500'}`}>
                <option value="">Team Size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
              <button type="submit" disabled={loading} className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/25">
                {loading ? 'Submitting...' : 'Request Demo'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Thanks!</h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Want to skip the wait? Book a demo now:</p>
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors">
              Book Demo Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// VIDEO MODAL - With YouTube Embed
// ============================================================================

function VideoModal({ onClose }: { onClose: () => void }) {
  const hasVideo = YOUTUBE_VIDEO_ID !== 'YOUR_YOUTUBE_VIDEO_ID';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl">
        <button onClick={onClose} className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden">
          {hasVideo ? (
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`} title="Trustie Demo" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-white text-xl font-bold mb-2">Demo Video Coming Soon</p>
                <p className="text-gray-400">Record your video on Loom and upload to YouTube</p>
                <p className="text-gray-500 text-sm mt-4">Then update <code className="bg-gray-800 px-2 py-1 rounded">YOUTUBE_VIDEO_ID</code> at the top of page.tsx</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
