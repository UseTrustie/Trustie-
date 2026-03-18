‘use client’;

import { useState, useEffect } from ‘react’;
import { useUser, SignOutButton } from ‘@clerk/nextjs’;
import Link from ‘next/link’;
import { useRouter } from ‘next/navigation’;

interface VerifiedClaim {
id: number;
claim: string;
category: string;
verdict: string;
confidence: number;
evidence: string;
key_findings?: string[];
red_flags?: string[];
sources: any[];
}

interface VerificationResult {
success: boolean;
summary: {
total_claims: number;
verified: number;
unverified: number;
partial: number;
unable_to_verify?: number;
confidence: number;
};
claims: VerifiedClaim[];
audit: { id: string; timestamp: string; processing_time_ms: number };
usage: { used: number; limit: number | string };
}

function formatConfidence(value: number) {
if (value > 1) return Math.round(value);
return Math.round(value * 100);
}

function getRiskLevel(result: VerificationResult) {
const { verified, unverified, partial, total_claims } = result.summary;
if (total_claims === 0) return { level: ‘unknown’, color: ‘gray’, label: ‘No Claims Found’ };
const unverifiedRatio = unverified / total_claims;
const verifiedRatio = verified / total_claims;
if (unverified >= 2 || unverifiedRatio >= 0.4) return { level: ‘high’, color: ‘red’, label: ‘High Risk’ };
if (unverified === 1 || (partial || 0) >= 2) return { level: ‘medium’, color: ‘yellow’, label: ‘Medium Risk’ };
if (verifiedRatio >= 0.8 && unverified === 0) return { level: ‘low’, color: ‘green’, label: ‘Low Risk’ };
return { level: ‘medium’, color: ‘yellow’, label: ‘Medium Risk’ };
}

function getRecommendation(result: VerificationResult) {
const risk = getRiskLevel(result);
const { verified, unverified, partial, total_claims } = result.summary;
if (risk.level === ‘high’) {
return { action: ‘Do Not Proceed’, detail: unverified + ’ claim’ + (unverified > 1 ? ‘s’ : ‘’) + ’ contradicted by public records. Request documentation or reconsider this candidate.’, icon: ‘\u{1F6AB}’ };
}
if (risk.level === ‘medium’) {
var flagged = unverified + (partial || 0);
return { action: ‘Proceed with Caution’, detail: flagged + ’ claim’ + (flagged > 1 ? ‘s’ : ‘’) + ’ need’ + (flagged === 1 ? ‘s’ : ‘’) + ’ additional documentation. Ask the candidate to provide supporting records.’, icon: ‘\u26A0\uFE0F’ };
}
if (risk.level === ‘low’) {
return { action: ‘Proceed to Interview’, detail: verified + ’ of ’ + total_claims + ’ claims confirmed against public sources. Credentials appear legitimate.’, icon: ‘\u2705’ };
}
return { action: ‘Insufficient Data’, detail: ‘Not enough verifiable claims found. Try pasting the full resume.’, icon: ‘\u2139\uFE0F’ };
}

function getPlainSummary(result: VerificationResult) {
const { verified, unverified, partial, total_claims } = result.summary;
const unable = (result.summary as any).unable_to_verify || 0;
const parts: string[] = [];
if (verified > 0) parts.push(verified + ’ confirmed’);
if (partial > 0) parts.push(partial + ’ partially confirmed’);
if (unverified > 0) parts.push(unverified + ’ flagged’);
if (unable > 0) parts.push(unable + ’ could not be verified’);
return total_claims + ’ claims analyzed: ’ + parts.join(’, ’) + ‘.’;
}

function sortClaims(claims: VerifiedClaim[]) {
const order: Record<string, number> = { ‘UNVERIFIED’: 0, ‘PARTIAL’: 1, ‘UNABLE_TO_VERIFY’: 2, ‘VERIFIED’: 3 };
return […claims].sort((a, b) => (order[a.verdict] ?? 4) - (order[b.verdict] ?? 4));
}

var LOADING_FACTS = [
‘Searching university databases…’,
‘Cross-referencing company records…’,
‘Checking certification registries…’,
‘Scanning academic publications…’,
‘Verifying conference proceedings…’,
‘Analyzing credential authenticity…’,
‘Reviewing public employment records…’,
‘Matching claims against official sources…’,
];

export default function AppPage() {
const { user, isLoaded, isSignedIn } = useUser();
const router = useRouter();
const [inputText, setInputText] = useState(’’);
const [mode, setMode] = useState<‘resume’ | ‘general’>(‘resume’);
const [isVerifying, setIsVerifying] = useState(false);
const [result, setResult] = useState<VerificationResult | null>(null);
const [error, setError] = useState<string | null>(null);
const [showUpgrade, setShowUpgrade] = useState(false);
const [usage, setUsage] = useState({ used: 0, limit: 5, plan: ‘free’ });
const [isCheckingOut, setIsCheckingOut] = useState(false);
const [loadingFact, setLoadingFact] = useState(0);
const [expandedClaim, setExpandedClaim] = useState<number | null>(null);

useEffect(function() {
if (isLoaded && !isSignedIn) router.push(’/’);
}, [isLoaded, isSignedIn, router]);

useEffect(function() {
if (isSignedIn) {
fetch(’/api/usage’).then(function(r) { return r.json(); }).then(function(data) {
if (data.verificationsUsed !== undefined) {
setUsage({
used: data.verificationsUsed,
limit: data.verificationsLimit === ‘unlimited’ ? Infinity : data.verificationsLimit,
plan: data.plan,
});
}
}).catch(function() {});
}
}, [isSignedIn]);

useEffect(function() {
if (!isVerifying) return;
var interval = setInterval(function() {
setLoadingFact(function(prev) { return (prev + 1) % LOADING_FACTS.length; });
}, 2500);
return function() { clearInterval(interval); };
}, [isVerifying]);

var handleVerify = async function() {
if (!inputText.trim()) return setError(‘Please enter text to verify’);
setIsVerifying(true);
setError(null);
setResult(null);
setLoadingFact(0);
setExpandedClaim(null);

```
try {
  var response = await fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: inputText, mode: mode }),
  });
  var data;
  try { data = await response.json(); } catch (e) { throw new Error('Server error. Please try again.'); }
  if (data.limitReached) { setShowUpgrade(true); return setError('Upgrade to continue verifying!'); }
  if (!response.ok) throw new Error(data.error || 'Verification failed');
  setResult(data);
  if (data.usage) setUsage({ used: data.usage.used, limit: usage.limit, plan: usage.plan });
} catch (err: any) {
  setError(err.message || 'Something went wrong. Please try again.');
} finally {
  setIsVerifying(false);
}
```

};

var handleCheckout = async function(priceType: string) {
setIsCheckingOut(true);
try {
var res = await fetch(’/api/checkout’, { method: ‘POST’, headers: { ‘Content-Type’: ‘application/json’ }, body: JSON.stringify({ priceType: priceType }) });
var data = await res.json();
if (data.url) window.location.href = data.url;
else throw new Error(data.error);
} catch (err: any) { setError(err.message); setIsCheckingOut(false); }
};

if (!isLoaded) {
return (
<div className="min-h-screen bg-gray-950 flex items-center justify-center">
<div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
</div>
);
}

if (!isSignedIn) {
return (
<div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
<div className="text-center">
<h1 className="text-2xl font-bold text-white mb-4">Redirecting…</h1>
<Link href="/" className="px-6 py-3 bg-blue-500 text-white rounded-xl inline-block">Go to Homepage</Link>
</div>
</div>
);
}

var limitReached = usage.limit !== Infinity && usage.used >= usage.limit;

return (
<div className="min-h-screen bg-gray-950 text-white">
<header className="sticky top-0 z-50 bg-gray-950/95 border-b border-gray-800 backdrop-blur-md">
<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
<Link href="/" className="flex items-center gap-3">
<div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center">
<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
</div>
<span className="text-lg font-bold">Trustie</span>
</Link>
<div className="flex items-center gap-3">
<div className="text-sm px-3 py-1.5 rounded-lg bg-gray-800/80">
<span className={limitReached ? ‘text-red-400’ : ‘text-green-400’}>{usage.used}</span>
<span className="text-gray-500">/{usage.limit === Infinity ? ‘\u221E’ : usage.limit}</span>
<span className="ml-1.5 text-xs text-gray-600">{usage.plan}</span>
</div>
{usage.plan === ‘free’ && <button onClick={function() { setShowUpgrade(true); }} className=“px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors”>Upgrade</button>}
<span className="text-sm text-gray-500 hidden sm:block">{user?.emailAddresses[0]?.emailAddress}</span>
<SignOutButton signOutOptions={{ redirectUrl: ‘/’ }}><button className="text-sm text-gray-600 hover:text-white transition-colors">Sign Out</button></SignOutButton>
</div>
</div>
</header>

```
  {showUpgrade && (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={function() { setShowUpgrade(false); }} />
      <div className="relative w-full max-w-lg rounded-2xl p-8 bg-gray-900 border border-gray-800">
        <button onClick={function() { setShowUpgrade(false); }} className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl">{'\u2715'}</button>
        <h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
        <div className="space-y-4">
          <div className="rounded-xl p-5 bg-gray-800">
            <div className="flex justify-between items-center mb-3">
              <div><h3 className="font-bold text-white">Starter</h3><p className="text-sm text-gray-500">100 verifications/month</p></div>
              <div className="text-right"><span className="text-2xl font-bold text-white">$49</span><span className="text-gray-500">/mo</span></div>
            </div>
            <button onClick={function() { handleCheckout('starter'); }} disabled={isCheckingOut} className="w-full py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium">{isCheckingOut ? 'Loading...' : 'Start Starter'}</button>
          </div>
          <div className="rounded-xl p-5 border-2 border-blue-500 bg-blue-500/5">
            <div className="flex justify-between items-center mb-3">
              <div><h3 className="font-bold text-white">Professional</h3><p className="text-sm text-blue-400">500 verifications/month</p></div>
              <div className="text-right"><span className="text-2xl font-bold text-white">$99</span><span className="text-gray-400">/mo</span></div>
            </div>
            <button onClick={function() { handleCheckout('professional'); }} disabled={isCheckingOut} className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium">{isCheckingOut ? 'Loading...' : 'Start Professional'}</button>
          </div>
          <div className="rounded-xl p-5 bg-gray-800">
            <div className="flex justify-between items-center mb-3">
              <div><h3 className="font-bold text-white">Business</h3><p className="text-sm text-gray-500">Unlimited verifications</p></div>
              <div className="text-right"><span className="text-2xl font-bold text-white">$249</span><span className="text-gray-500">/mo</span></div>
            </div>
            <button onClick={function() { handleCheckout('business'); }} disabled={isCheckingOut} className="w-full py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium">{isCheckingOut ? 'Loading...' : 'Start Business'}</button>
          </div>
        </div>
      </div>
    </div>
  )}

  <main className="max-w-5xl mx-auto px-4 py-8">
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Verify Claims</h1>
        <div className="flex rounded-lg bg-gray-800 p-1">
          <button onClick={function() { setMode('resume'); }} className={'px-4 py-2 text-sm rounded-md transition-colors ' + (mode === 'resume' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white')}>Resume</button>
          <button onClick={function() { setMode('general'); }} className={'px-4 py-2 text-sm rounded-md transition-colors ' + (mode === 'general' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white')}>General</button>
        </div>
      </div>
      <div className="rounded-2xl bg-gray-900 border border-gray-800">
        <textarea
          value={inputText}
          onChange={function(e) { setInputText(e.target.value); }}
          placeholder={mode === 'resume' ? 'Paste a resume or CV to verify claims...' : 'Paste any text to verify factual claims...'}
          disabled={limitReached}
          className="w-full h-56 p-6 bg-transparent resize-none outline-none text-white placeholder-gray-600 text-sm leading-relaxed"
        />
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800">
          <span className="text-xs text-gray-600">{inputText.length.toLocaleString()} characters</span>
          <button
            onClick={limitReached ? function() { setShowUpgrade(true); } : handleVerify}
            disabled={isVerifying || (!inputText.trim() && !limitReached)}
            className={'px-6 py-2.5 rounded-lg font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ' + (limitReached ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/20')}
          >
            {isVerifying ? 'Verifying...' : limitReached ? 'Upgrade to Continue' : 'Verify Claims'}
          </button>
        </div>
      </div>
      {error && <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">{error}</div>}
    </div>

    {isVerifying && (
      <div className="rounded-2xl bg-gray-900 border border-gray-800 p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <h3 className="text-lg font-semibold text-white mb-2">Verifying Claims</h3>
        <p className="text-gray-500 text-sm animate-pulse">{LOADING_FACTS[loadingFact]}</p>
      </div>
    )}

    {result && !isVerifying && (
      <div className="space-y-5">
        {result.summary.total_claims > 0 && (function() {
          var risk = getRiskLevel(result);
          var rec = getRecommendation(result);
          var bgColor = risk.color === 'green' ? 'bg-green-500/10 border-green-500/30' : risk.color === 'red' ? 'bg-red-500/10 border-red-500/30' : 'bg-yellow-500/10 border-yellow-500/30';
          var textColor = risk.color === 'green' ? 'text-green-400' : risk.color === 'red' ? 'text-red-400' : 'text-yellow-400';
          var badgeBg = risk.color === 'green' ? 'bg-green-500/20' : risk.color === 'red' ? 'bg-red-500/20' : 'bg-yellow-500/20';
          return (
            <div className={'rounded-2xl border p-6 ' + bgColor}>
              <div className="flex items-start gap-4">
                <span className="text-3xl">{rec.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-bold text-white">{rec.action}</h2>
                    <span className={'text-xs px-3 py-1 rounded-full font-semibold ' + badgeBg + ' ' + textColor}>{risk.label}</span>
                  </div>
                  <p className="text-sm text-gray-300">{rec.detail}</p>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="rounded-2xl bg-gray-900 border border-gray-800 p-5">
          <p className="text-sm text-gray-400 mb-4">{getPlainSummary(result)}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-800/60 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white">{result.summary.total_claims}</div>
              <div className="text-xs text-gray-500 mt-1">Claims</div>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-green-500">{result.summary.verified}</div>
              <div className="text-xs text-gray-500 mt-1">Confirmed</div>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-red-500">{result.summary.unverified}</div>
              <div className="text-xs text-gray-500 mt-1">Flagged</div>
            </div>
            <div className="bg-gray-800/60 rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">{formatConfidence(result.summary.confidence)}%</div>
              <div className="text-xs text-gray-500 mt-1">Confidence</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {sortClaims(result.claims).map(function(claim) {
            var isExpanded = expandedClaim === claim.id;
            var vcMap: Record<string, { bg: string; text: string; icon: string; label: string; border: string }> = {
              'VERIFIED': { bg: 'bg-green-500/10', text: 'text-green-400', icon: '\u2713', label: 'Confirmed', border: 'border-green-500/20' },
              'UNVERIFIED': { bg: 'bg-red-500/10', text: 'text-red-400', icon: '\u2717', label: 'Flagged', border: 'border-red-500/20' },
              'PARTIAL': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', icon: '\u25D0', label: 'Partial', border: 'border-yellow-500/20' },
              'UNABLE_TO_VERIFY': { bg: 'bg-gray-500/10', text: 'text-gray-400', icon: '?', label: 'Unconfirmed', border: 'border-gray-500/20' },
            };
            var v = vcMap[claim.verdict] || vcMap['UNABLE_TO_VERIFY'];
            return (
              <div key={claim.id} className={'rounded-xl border overflow-hidden cursor-pointer transition-all hover:border-opacity-50 ' + v.border + ' ' + v.bg} onClick={function() { setExpandedClaim(isExpanded ? null : claim.id); }}>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={'w-9 h-9 rounded-lg flex items-center justify-center text-base font-bold shrink-0 ' + v.bg + ' ' + v.text}>{v.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-white text-sm leading-snug">{claim.claim}</p>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={'text-xs px-2 py-0.5 rounded-full font-medium ' + v.bg + ' ' + v.text}>{v.label}</span>
                          <span className="text-xs text-gray-600">{formatConfidence(claim.confidence)}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{claim.evidence}</p>
                    </div>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="border-t border-gray-800/50 pt-3 ml-12">
                      {claim.red_flags && claim.red_flags.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-red-400 mb-1">Red Flags:</p>
                          {claim.red_flags.map(function(flag, i) { return (<p key={i} className="text-xs text-red-300/70 ml-2">- {flag}</p>); })}
                        </div>
                      )}
                      {claim.key_findings && claim.key_findings.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-400 mb-1">Key Findings:</p>
                          {claim.key_findings.map(function(f, i) { return (<p key={i} className="text-xs text-gray-500 ml-2">- {f}</p>); })}
                        </div>
                      )}
                      {claim.sources && claim.sources.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-400 mb-1.5">Sources ({claim.sources.length}):</p>
                          <div className="space-y-1">
                            {claim.sources.map(function(source: any, idx: number) {
                              return (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  <span className={'w-1.5 h-1.5 rounded-full shrink-0 ' + (source.tier === 1 ? 'bg-green-500' : source.tier === 2 ? 'bg-yellow-500' : 'bg-gray-600')} />
                                  <span className="text-gray-600 shrink-0">{source.label}:</span>
                                  <a href={source.url && source.url.startsWith('http') ? source.url : 'https://' + source.url} target="_blank" rel="noopener noreferrer" className="text-blue-400/80 hover:text-blue-400 hover:underline truncate" onClick={function(e) { e.stopPropagation(); }}>{source.url}</a>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-500">{claim.category}</span>
                        <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div className={'h-full rounded-full ' + (claim.verdict === 'VERIFIED' ? 'bg-green-500' : claim.verdict === 'UNVERIFIED' ? 'bg-red-500' : claim.verdict === 'PARTIAL' ? 'bg-yellow-500' : 'bg-gray-500')} style={{ width: formatConfidence(claim.confidence) + '%' }} />
                        </div>
                        <span className="text-xs text-gray-600">{formatConfidence(claim.confidence)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 p-4">
          <details className="group">
            <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400 transition-colors list-none flex items-center gap-2">
              <svg className="w-3.5 h-3.5 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              How to read these results
            </summary>
            <div className="mt-3 space-y-2 text-xs text-gray-500">
              <p><span className="text-green-400 font-medium">Confirmed</span> - Public sources support this claim.</p>
              <p><span className="text-red-400 font-medium">Flagged</span> - Public sources contradict this claim.</p>
              <p><span className="text-yellow-400 font-medium">Partial</span> - Some aspects confirmed, but details differ.</p>
              <p><span className="text-gray-400 font-medium">Unconfirmed</span> - No public evidence found either way.</p>
              <p className="pt-1 text-gray-600">Confidence shows how strongly evidence supports or contradicts each claim. Trustie checks public information and cannot access private records like HR systems or transcripts.</p>
            </div>
          </details>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-600 px-1">
          <span>{result.audit.id}</span>
          <span>{new Date(result.audit.timestamp).toLocaleString()} - {(result.audit.processing_time_ms / 1000).toFixed(1)}s</span>
        </div>
      </div>
    )}
  </main>
</div>
```

);
}
