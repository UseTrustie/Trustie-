'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BlogPage() {
  const [isDark, setIsDark] = useState(true);

  const posts = [
    {
      slug: 'resume-fraud-statistics-2025',
      title: '70% of Resumes Contain Lies: The 2025 Resume Fraud Report',
      excerpt: 'New data reveals the extent of resume fraud and what HR teams can do about it.',
      date: 'Feb 20, 2025',
      readTime: '5 min read',
      category: 'Research',
    },
    {
      slug: 'multi-ai-consensus-explained',
      title: 'Why Multi-AI Consensus Reduces False Positives by 90%',
      excerpt: 'How using multiple AI models to verify claims produces dramatically better results than single-model approaches.',
      date: 'Feb 15, 2025',
      readTime: '7 min read',
      category: 'Technology',
    },
    {
      slug: 'cost-of-bad-hire',
      title: 'The True Cost of a Bad Hire: $150,000 and Counting',
      excerpt: 'Breaking down the hidden costs of hiring someone who misrepresented their qualifications.',
      date: 'Feb 10, 2025',
      readTime: '4 min read',
      category: 'Business',
    },
    {
      slug: 'source-quality-matters',
      title: 'Why Source Quality Matters More Than Quantity in Verification',
      excerpt: 'Not all sources are created equal. Learn how we weight .gov and .edu sources vs. commercial sites.',
      date: 'Feb 5, 2025',
      readTime: '6 min read',
      category: 'Technology',
    },
    {
      slug: 'ai-hallucination-problem',
      title: 'The AI Hallucination Problem: How Trustie Solves It',
      excerpt: 'AI models make things up. Here\'s how multi-source verification catches hallucinations.',
      date: 'Jan 28, 2025',
      readTime: '8 min read',
      category: 'Technology',
    },
    {
      slug: 'hr-verification-guide',
      title: 'The Complete Guide to Resume Verification for HR Teams',
      excerpt: 'Everything you need to know about verifying candidate credentials efficiently.',
      date: 'Jan 20, 2025',
      readTime: '12 min read',
      category: 'Guides',
    },
  ];

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
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link href="/app" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
              Try Free
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Blog</h1>
        <p className={`text-xl mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Insights on verification, AI, and building trust.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={`rounded-2xl p-6 transition-all ${isDark ? 'bg-gray-900 border border-gray-800 hover:border-gray-700' : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  {post.category}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{post.date}</span>
                <span className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                <span className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>{post.readTime}</span>
              </div>
              <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {post.title}
              </h2>
              <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {post.excerpt}
              </p>
              <span className="text-blue-500 hover:text-blue-400 text-sm font-medium cursor-pointer">
                Read more →
              </span>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className={`mt-16 rounded-2xl p-8 text-center ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Stay Updated</h2>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Get the latest on verification technology and fraud prevention.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 rounded-xl border outline-none ${isDark ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-400'}`}
            />
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
              Subscribe
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
