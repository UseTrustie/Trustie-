'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import Footer from '@/components/Footer';

export default function BlogPost3() {
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
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">Business</span>
          <span className="text-sm text-gray-600">Feb 28, 2026</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">4 min read</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">The True Cost of a Bad Hire: $17,000 and Beyond</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-lg text-gray-400">
            Hiring the wrong person is expensive. The direct costs are significant, but the hidden costs — lost productivity, damaged morale, wasted management time — can be far worse.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Numbers</h2>

          <p>
            According to a CareerBuilder survey of 2,257 hiring managers, the average cost of a bad hire is approximately $17,000. Nearly three in four employers (74%) reported they have hired the wrong person for a position.
          </p>

          <p>
            The U.S. Department of Labor puts the figure higher, estimating that a bad hire can cost up to 30% of the employee&apos;s first-year earnings. For someone earning $80,000, that is $24,000 in losses. For technical roles, replacement costs can exceed 100-150% of the annual salary.
          </p>

          <p>
            On the extreme end, recruiter Jörgen Sundberg of Link Humans estimates that total hiring and onboarding costs can reach $240,000 per employee, making a bad hire at senior levels a quarter-million-dollar mistake.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Where the Money Goes</h2>

          <div className="space-y-4 my-6">
            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <p className="font-bold text-white mb-1">Recruiting Costs</p>
              <p className="text-gray-400 text-sm">Job postings, recruiter time, interview coordination, background checks. The average cost-per-hire is $4,700 according to SHRM, and it takes an average of 42 days to fill a position.</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <p className="font-bold text-white mb-1">Training and Onboarding</p>
              <p className="text-gray-400 text-sm">It takes 6-9 months to bring a new employee up to full productivity. All that investment is wasted if the person was hired based on misrepresented qualifications.</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <p className="font-bold text-white mb-1">Lost Productivity</p>
              <p className="text-gray-400 text-sm">An underperforming employee does not just fail to produce — they consume management attention. SHRM found that supervisors spend 17% of their time managing poorly performing employees.</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <p className="font-bold text-white mb-1">Team Impact</p>
              <p className="text-gray-400 text-sm">Bad hires affect morale. According to CareerBuilder, 37% of employers cited reduced productivity across the team, and 31% cited compromised quality of work.</p>
            </div>
            <div className="rounded-xl p-4 bg-gray-900 border border-gray-800">
              <p className="font-bold text-white mb-1">Doing It All Again</p>
              <p className="text-gray-400 text-sm">When the bad hire leaves or is terminated, you restart the entire process — new job posting, new interviews, new onboarding. The cycle repeats.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Prevention Is Cheaper Than Cure</h2>

          <p>
            The most cost-effective strategy is catching misrepresentations before making a hiring decision. Traditional background checks cost $30-$80 per candidate and take days. AI-powered verification tools can provide a fast preliminary screen in seconds for a fraction of the cost.
          </p>

          <p>
            Neither approach is perfect on its own. The most effective hiring process uses fast AI screening to flag potential issues early, followed by formal background checks for final candidates. This layered approach catches more problems while keeping the process efficient.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Sources</h2>

          <ul className="list-disc list-inside space-y-2 text-gray-500 text-sm ml-4">
            <li>CareerBuilder, &quot;Cost of a Bad Hire Survey,&quot; 2017 (2,257 hiring managers)</li>
            <li>U.S. Department of Labor, bad hire cost estimates (up to 30% of first-year salary)</li>
            <li>SHRM Human Capital Benchmarking Survey (cost-per-hire, time-to-fill, supervisor time)</li>
            <li>Link Humans / Jörgen Sundberg (total onboarding cost estimates)</li>
            <li>Toggl Hire 2025 Report (indirect costs of $30,000-$150,000+)</li>
          </ul>
        </div>

        <div className="mt-16 rounded-2xl p-8 text-center bg-gray-900 border border-gray-800">
          <h2 className="text-2xl font-bold mb-2">Catch Misrepresentations Before They Cost You</h2>
          <p className="text-gray-400 mb-6">
            Trustie verifies resume claims in seconds. 5 free verifications, no credit card required.
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
