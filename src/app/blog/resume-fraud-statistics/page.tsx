'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import Footer from '@/components/Footer';

export default function BlogPost1() {
  const { isSignedIn } = useUser();
  const authLink = isSignedIn ? '/app' : '/sign-up';

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

      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-blue-500 hover:text-blue-400 text-sm mb-8 inline-block">← Back to Blog</Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">Research</span>
          <span className="text-sm text-gray-600">Mar 10, 2026</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">5 min read</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">Up to 64% of Resumes Contain Lies: What HR Teams Need to Know</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-lg text-gray-400">
            Resume fraud is not a rare edge case. Multiple independent studies confirm that a significant percentage of job candidates misrepresent their qualifications. For HR teams, this means every resume that crosses your desk has a real chance of containing inaccurate information.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">What the Research Says</h2>

          <p>
            A 2024 survey by StandOut CV, which polled over 2,100 Americans, found that 64.2% of employees have lied on their resume at least once. That number is up from 55% in 2022, according to the same research group, suggesting the problem is getting worse, not better.
          </p>

          <p>
            Other studies put the number at different levels depending on how the question is asked. A 2025 ResumeBuilder survey of 2,000 Americans found that 24% admitted to lying on their resume. A Checkster study found 78% of job seekers misrepresented themselves or considered doing so. The reality likely falls somewhere in this range, but even the most conservative estimates mean roughly 1 in 4 resumes contains inaccurate information.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">What People Lie About</h2>

          <p>The most common areas of misrepresentation include:</p>

          <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
            <li><strong className="text-gray-200">Skills and abilities</strong> — overstating proficiency with tools or technologies</li>
            <li><strong className="text-gray-200">Years of experience</strong> — inflating tenure at previous companies</li>
            <li><strong className="text-gray-200">Job titles</strong> — upgrading titles to sound more senior</li>
            <li><strong className="text-gray-200">Education credentials</strong> — claiming degrees or certifications not earned</li>
            <li><strong className="text-gray-200">Employment dates</strong> — covering gaps in work history</li>
            <li><strong className="text-gray-200">Reasons for leaving</strong> — hiding terminations or poor performance</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why It Matters</h2>

          <p>
            According to CareerBuilder, the average cost of a bad hire is approximately $17,000 when factoring in recruiting, training, and lost productivity. The U.S. Department of Labor estimates the figure can reach up to 30% of the employee&apos;s first-year earnings. For a role paying $80,000, that translates to $24,000 lost.
          </p>

          <p>
            Beyond the direct financial cost, a bad hire affects team morale, client relationships, and management time. A SHRM study found that supervisors spend an average of 17% of their time managing underperforming employees.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">What HR Teams Can Do</h2>

          <p>Traditional background checks through services like Checkr or HireRight are thorough but take 3-7 business days and cost $30-$80 per check. For high-volume hiring, this creates a bottleneck.</p>

          <p>
            AI-powered verification tools can serve as a fast preliminary screening layer. They can flag potential discrepancies in seconds by cross-referencing claims against publicly available information. This does not replace formal background checks for final candidates, but it can help prioritize which candidates warrant deeper investigation.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Sources</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm ml-4">
            <li>StandOut CV, &quot;Resume Lies Study,&quot; 2024 (2,100+ respondents)</li>
            <li>ResumeBuilder.com, &quot;Resume Lying Survey,&quot; January 2025 (2,000 respondents)</li>
            <li>Checkster/Harver, &quot;Job Seeker Misrepresentation Study,&quot; 2020 (400 job seekers)</li>
            <li>CareerBuilder, &quot;Cost of a Bad Hire Survey,&quot; 2017 (2,257 hiring managers)</li>
            <li>U.S. Department of Labor, bad hire cost estimates</li>
            <li>HRO Today, corroborating resume fraud statistics, 2024</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl p-8 text-center bg-gray-900 border border-gray-800">
          <h2 className="text-2xl font-bold mb-2">Screen Resumes in Seconds</h2>
          <p className="text-gray-400 mb-6">
            Trustie extracts claims from resumes and verifies them against real sources. Try it free.
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
