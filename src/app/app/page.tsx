'use client';

import { useState, useEffect } from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';

interface VerifiedClaim {
  id: number;
  claim: string;
  category: string;
  verdict: string;
  confidence: number;
  evidence: string;
  sources: any[];
}

interface VerificationResult {
  success: boolean;
  summary: { total_claims: number; verified: number; unverified: number; partial: number; confidence: number };
  claims: VerifiedClaim[];
  audit: { id: string; timestamp: string; processing_time_ms: number };
  usage: { used: number; limit: number | string };
}

export default function AppPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'resume' | 'general'>('resume');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [usage, setUsage] = useState({ used: 0, limit: 5, plan: 'free' });
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/usage').then(r => r.json()).then(data => {
        if (data.verificationsUsed !== undefined) {
          setUsage({
            used: data.verificationsUsed,
            limit: data.verificationsLimit === 'unlimited' ? Infinity : data.verificationsLimit,
            plan: data.plan,
          });
        }
      }).catch(() => {});
    }
  }, [isSignedIn]);

  const handleVerify = async () => {
    if (!inputText.trim()) return setError('Please enter text to verify');
    setIsVerifying(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, mode }),
      });
      const data = await response.json();

      if (data.limitReached) {
        setShowUpgrade(true);
        return setError('Upgrade to continue verifying!');
      }
      if (!response.ok) throw new Error(data.error);

      setResult(data);
      if (data.usage) setUsage({ ...usage, used: data.usage.used });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCheckout = async (priceType: 'starter' | 'pro') => {
    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceType }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else throw new Error(data.error);
    } catch (err: any) {
      setError(err.message);
      setIsCheckingOut(false);
    }
  };

  if (!isLoaded) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Sign in to Trustie</h1>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="px-6 py-3 bg-blue-500 text-white rounded-xl">Sign In</Link>
            <Link href="/sign-up" className="px-6 py-3 bg-gray-800 text-white rounded-xl">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  const limitReached = usage.limit !== Infinity && usage.used >= usage.limit;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-50 bg-gray-950/95 border-b border-gray-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-lg font-bold">Trustie</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm px-3 py-1.5 rounded-lg bg-gray-800">
              <span className={limitReached ? 'text-red-400' : 'text-green-400'}>{usage.used}</span>
              <span className="text-gray-500">/{usage.limit === Infinity ? '∞' : usage.limit}</span>
              <span className="ml-2 text-xs text-gray-600">{usage.plan}</span>
            </div>
            {usage.plan === 'free' && <button onClick={() => setShowUpgrade(true)} className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg">Upgrade</button>}
            <span className="text-sm text-gray-400 hidden sm:block">{user?.emailAddresses[0]?.emailAddress}</span>
            <SignOutButton><button className="text-sm text-gray-500 hover:text-white">Sign Out</button></SignOutButton>
          </div>
        </div>
      </header>

      {showUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowUpgrade(false)} />
          <div className="relative w-full max-w-lg rounded-2xl p-8 bg-gray-900">
            <button onClick={() => setShowUpgrade(false)} className="absolute top-4 right-4 text-gray-500">✕</button>
            <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
            <div className="space-y-4">
              <div className="rounded-xl p-6 bg-gray-800">
                <div className="flex justify-between mb-3">
                  <div><h3 className="font-bold">Starter Pack</h3><p className="text-sm text-gray-500">50 verifications</p></div>
                  <div><span className="text-2xl font-bold">$49</span><span className="text-gray-500"> one-time</span></div>
                </div>
                <button onClick={() => handleCheckout('starter')} disabled={isCheckingOut} className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg">{isCheckingOut ? 'Loading...' : 'Buy Starter'}</button>
              </div>
              <div className="rounded-xl p-6 border-2 border-blue-500 bg-blue-500/10">
                <div className="flex justify-between mb-3">
                  <div><h3 className="font-bold">Pro Monthly</h3><p className="text-sm text-gray-400">Unlimited</p></div>
                  <div><span className="text-2xl font-bold">$29</span><span className="text-gray-400">/mo</span></div>
                </div>
                <button onClick={() => handleCheckout('pro')} disabled={isCheckingOut} className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">{isCheckingOut ? 'Loading...' : 'Start Pro'}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Verify Claims</h1>
            <div className="flex rounded-lg bg-gray-800 p-1">
              <button onClick={() => setMode('resume')} className={`px-4 py-2 text-sm rounded-md ${mode === 'resume' ? 'bg-blue-500' : 'text-gray-400'}`}>Resume</button>
              <button onClick={() => setMode('general')} className={`px-4 py-2 text-sm rounded-md ${mode === 'general' ? 'bg-blue-500' : 'text-gray-400'}`}>General</button>
            </div>
          </div>
          <div className="rounded-2xl bg-gray-900 border border-gray-800">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste a resume or text to verify..."
              disabled={limitReached}
              className="w-full h-64 p-6 bg-transparent resize-none outline-none text-white placeholder-gray-600"
            />
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
              <span className="text-sm text-gray-500">{inputText.length} chars</span>
              <button
                onClick={limitReached ? () => setShowUpgrade(true) : handleVerify}
                disabled={isVerifying || (!inputText.trim() && !limitReached)}
                className={`px-6 py-2.5 rounded-lg font-medium ${limitReached ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'} disabled:opacity-50`}
              >
                {isVerifying ? 'Verifying...' : limitReached ? 'Upgrade to Continue' : 'Verify Claims'}
              </button>
            </div>
          </div>
          {error && <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">{error}</div>}
        </div>

        {isVerifying && (
          <div className="rounded-2xl bg-gray-900 border border-gray-800 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <h3 className="text-xl font-semibold">Verifying Claims...</h3>
          </div>
        )}

        {result && !isVerifying && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-4"><div className="text-2xl font-bold">{result.summary.total_claims}</div><div className="text-sm text-gray-500">Total</div></div>
                <div className="bg-gray-800 rounded-xl p-4"><div className="text-2xl font-bold text-green-500">{result.summary.verified}</div><div className="text-sm text-gray-500">Verified</div></div>
                <div className="bg-gray-800 rounded-xl p-4"><div className="text-2xl font-bold text-red-500">{result.summary.unverified}</div><div className="text-sm text-gray-500">Unverified</div></div>
                <div className="bg-gray-800 rounded-xl p-4"><div className="text-2xl font-bold text-blue-500">{Math.round(result.summary.confidence * 100)}%</div><div className="text-sm text-gray-500">Confidence</div></div>
              </div>
            </div>
            <div className="space-y-4">
              {result.claims.map((claim) => (
                <div key={claim.id} className="rounded-xl bg-gray-900 border border-gray-800 p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${claim.verdict === 'VERIFIED' ? 'bg-green-500/20 text-green-500' : claim.verdict === 'UNVERIFIED' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {claim.verdict === 'VERIFIED' ? '✓' : claim.verdict === 'UNVERIFIED' ? '✗' : '?'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">{claim.claim}</p>
                      <p className="text-sm text-gray-400">{claim.evidence}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">{claim.category}</span>
                        <span className="text-xs text-gray-500">{Math.round(claim.confidence * 100)}% confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
