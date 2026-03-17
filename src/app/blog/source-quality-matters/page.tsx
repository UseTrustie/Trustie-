'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import Footer from '@/components/Footer';

export default function BlogPost2() {
  const { isSignedIn } = useUser();
  const authLink = isSignedIn ? '/app' : '/sign-up';

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
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
            <Link href="/blog" className="text-white text-sm">Blog</Link>
            <Link href="/how-it-works" className="text-gray-400 hover:text-white text-sm">How it works</Link>
          </div>
          <Link href={authLink} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl">
            {isSignedIn ? 'Open App' : 'Try Free'}
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-blue-500 hover:text-blue-400 text-sm mb-8 inline-block">← Back to Blog</Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">Technology</span>
          <span className="text-sm text-gray-600">Mar 5, 2026</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">7 min read</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">Why Source Quality Matters More Than Quantity</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-lg text-gray-400">
            When verifying a claim, finding ten sources that repeat the same unverified information is worse than finding one authoritative source that confirms it. Source quality is everything.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Problem with Treating All Sources Equally</h2>

          <p>
            Most search engines rank results by relevance and popularity, not by trustworthiness. A blog post that gets shared widely can outrank an official university record page. A press release from a company can appear more prominently than a government database.
          </p>

          <p>
            When you are verifying factual claims — did this person graduate from this school, did they work at this company, do they hold this certification — the source matters as much as the answer. A LinkedIn profile is more trustworthy than a personal blog. A .edu registrar page is more trustworthy than a news article quoting unnamed sources.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">How Trustie Evaluates Sources</h2>

          <p>Trustie uses a tiered trust system that prioritizes sources based on their inherent reliability:</p>

          <div className="space-y-4 my-6">
            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="font-bold text-white">Tier 1 — Highest Trust</span>
              </div>
              <p className="text-gray-400 text-sm">Government sites (.gov), educational institutions (.edu), LinkedIn profiles, and professional certification bodies like Credly. These sources have institutional accountability and verification processes of their own.</p>
            </div>

            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="font-bold text-white">Tier 2 — Medium Trust</span>
              </div>
              <p className="text-gray-400 text-sm">Established news organizations, GitHub (for technical claims), and official company websites. These sources have editorial standards or official status but may contain errors or outdated information.</p>
            </div>

            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="font-bold text-white">Tier 3 — Lower Trust</span>
              </div>
              <p className="text-gray-400 text-sm">Blogs, forums, Wikipedia, and other user-generated content. These can provide useful leads but should not be relied upon as primary verification sources. Wikipedia, for example, is editable by anyone and explicitly states it should not be used as a primary source.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Commercial Bias: The Hidden Risk</h2>

          <p>
            One factor that often goes overlooked is commercial bias. If you are verifying whether someone holds an AWS certification, a source with a financial interest in selling AWS training courses has an incentive to present information in a particular way. Trustie flags sources that may have a commercial stake in the claim being verified, so you can weigh their credibility accordingly.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">What This Means for HR Teams</h2>

          <p>
            When evaluating a verification tool, ask how it handles source quality. A tool that simply searches Google and returns the first result is not meaningfully different from doing the search yourself. A tool that categorizes sources by trustworthiness, flags potential bias, and shows you exactly where each finding came from gives you a genuine advantage.
          </p>

          <p>
            The goal is not to automate trust. The goal is to give you better information, faster, so you can make better decisions.
          </p>
        </div>

        <div className="mt-16 rounded-2xl p-8 text-center bg-gray-900 border border-gray-800">
          <h2 className="text-2xl font-bold mb-2">See Source Quality in Action</h2>
          <p className="text-gray-400 mb-6">
            Paste any text and see how Trustie evaluates sources by trust tier.
          </p>
          <Link href={authLink} className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
            {isSignedIn ? 'Open App' : 'Try Trustie Free'}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
