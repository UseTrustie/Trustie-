'use client';

import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function Footer() {
  const { isSignedIn } = useUser();
  const authLink = isSignedIn ? '/app' : '/sign-up';

  return (
    <footer className="py-16 px-6 border-t border-gray-800 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Trustie</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">AI-powered verification for everyone.</p>
            <a href="https://x.com/UseTrustie" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm">
              @UseTrustie
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Pages</h4>
            <ul className="space-y-2">
              <li><Link href="/proof" className="text-sm text-gray-500 hover:text-blue-400">Proof</Link></li>
              <li><Link href="/#pricing" className="text-sm text-gray-500 hover:text-blue-400">Pricing</Link></li>
              <li><Link href="/help" className="text-sm text-gray-500 hover:text-blue-400">Help</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-blue-400">Blog</Link></li>
              <li><Link href="/how-it-works" className="text-sm text-gray-500 hover:text-blue-400">How it works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Use Cases</h4>
            <ul className="space-y-2">
              <li><Link href={authLink} className="text-sm text-gray-500 hover:text-blue-400">Resume Verification</Link></li>
              <li><Link href={authLink} className="text-sm text-gray-500 hover:text-blue-400">HR Background Checks</Link></li>
              <li><Link href={authLink} className="text-sm text-gray-500 hover:text-blue-400">Insurance Claims</Link></li>
              <li><Link href={authLink} className="text-sm text-gray-500 hover:text-blue-400">Legal Due Diligence</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-blue-400">Blog</Link></li>
              <li><a href="mailto:trustietechnologies@gmail.com" className="text-sm text-gray-500 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="/refund" className="text-sm text-gray-500 hover:text-blue-400">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-600">© 2026 Trustie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
