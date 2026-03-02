'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function BlogPage() {
  const { isSignedIn } = useUser();
  const authLink = isSignedIn ? '/app' : '/sign-up';

  const posts = [
    {
      slug: 'resume-fraud-statistics-2025',
      title: '70% of Resumes Contain Lies: What HR Teams Need to Know',
      excerpt: 'Studies show the majority of resumes contain some form of misrepresentation. Here\'s what to look for.',
      date: 'Feb 20, 2025',
      readTime: '5 min read',
      category: 'Research',
    },
    {
      slug: 'source-quality-matters',
      title: 'Why Source Quality Matters More Than Quantity',
      excerpt: 'Not all sources are equal. Learn how to evaluate the reliability of verification sources.',
      date: 'Feb 15, 2025',
      readTime: '7 min read',
      category: 'Technology',
    },
    {
      slug: 'cost-of-bad-hire',
      title: 'The True Cost of a Bad Hire',
      excerpt: 'Breaking down the hidden costs of hiring someone who misrepresented their qualifications.',
      date: 'Feb 10, 2025',
      readTime: '4 min read',
      category: 'Business',
    },
  ];

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

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-400 mb-12">
          Insights on verification, AI, and building trust.
        </p>

        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl p-6 bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                  {post.category}
                </span>
                <span className="text-sm text-gray-600">{post.date}</span>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-gray-600">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">
                {post.title}
              </h2>
              <p className="text-gray-400 mb-4">
                {post.excerpt}
              </p>
              <p className="text-gray-600 text-sm">
                Full article coming soon
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 text-center bg-gray-900 border border-gray-800">
          <h2 className="text-2xl font-bold mb-2">Ready to Try Trustie?</h2>
          <p className="text-gray-400 mb-6">
            Verify claims with AI-powered fact checking.
          </p>
          <Link href={authLink} className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl">
            {isSignedIn ? 'Open App' : 'Try Free'}
          </Link>
        </div>
      </main>
    </div>
  );
}
