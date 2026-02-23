'use client';
// @ts-nocheck

import { useState, useEffect } from "react";

/* ============================================================
   TRUSTIE — Complete Landing Page
   Deploy: Replace src/app/page.tsx entirely with this file
   ============================================================ */

const C = {
  bg: "#0B1120", card: "rgba(30,41,66,0.5)", cardBorder: "rgba(59,130,246,0.12)",
  blue: "#3b82f6", blueGlow: "rgba(59,130,246,0.25)", red: "#ef4444",
  green: "#22c55e", amber: "#f59e0b", text: "#e2e8f0", muted: "#94a3b8",
  dimmed: "#475569", line: "rgba(148,163,184,0.08)",
};

const navLinks = [
  { label: "Proof", href: "/proof" },
  { label: "Pricing", href: "#pricing" },
  { label: "Help", href: "/help" },
  { label: "Blog", href: "/blog" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Verification Database", href: "/database", badge: "NEW" },
];

/* ============================================================
   NAVBAR
   ============================================================ */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11,17,32,0.95)" : "rgba(11,17,32,0.7)",
      backdropFilter: "blur(20px)", borderBottom: `1px solid ${scrolled ? C.line : "transparent"}`,
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", padding: "0 24px" }}>
        {/* Logo → Home */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 16px ${C.blueGlow}` }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "18px", letterSpacing: "-0.01em" }}>Trustie</span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }} className="hide-mobile">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} style={{ color: C.muted, fontSize: "14px", textDecoration: "none", fontWeight: 400, display: "flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
              onMouseOver={e => (e.currentTarget.style.color = "#fff")} onMouseOut={e => (e.currentTarget.style.color = C.muted)}>
              {l.label}
              {l.badge && <span style={{ fontSize: "10px", fontWeight: 700, background: C.blue, color: "#fff", padding: "2px 7px", borderRadius: "9999px" }}>{l.badge}</span>}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="#" style={{ color: C.muted, fontSize: "14px", textDecoration: "none" }} className="hide-mobile">Login</a>
          <a href="#" style={{
            background: C.blue, color: "#fff", padding: "9px 20px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600, textDecoration: "none", boxShadow: `0 0 20px ${C.blueGlow}`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}>Try Free</a>
          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }} className="show-mobile">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 6h16M4 12h16M4 18h16"}/></svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.line}` }} className="show-mobile">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} style={{ display: "block", color: C.muted, fontSize: "15px", textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
              {l.label} {l.badge && <span style={{ fontSize: "10px", fontWeight: 700, background: C.blue, color: "#fff", padding: "2px 7px", borderRadius: "9999px", marginLeft: "6px" }}>{l.badge}</span>}
            </a>
          ))}
          <a href="#" style={{ display: "block", color: C.muted, fontSize: "15px", textDecoration: "none", padding: "10px 0" }}>Login</a>
        </div>
      )}
    </nav>
  );
}

/* ============================================================
   ANIMATED HERO DEMO
   ============================================================ */
function AnimatedDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep(p => (p + 1) % 4), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative", maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ position: "absolute", inset: "-20px", background: `radial-gradient(circle at 50% 50%, ${C.blueGlow}, transparent 70%)`, borderRadius: "32px", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: `1px solid rgba(59,130,246,0.2)`, background: "rgba(15,23,42,0.9)", boxShadow: `0 25px 60px rgba(0,0,0,0.5), 0 0 40px ${C.blueGlow}` }}>
        {/* Browser bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "rgba(30,41,66,0.6)", borderBottom: `1px solid ${C.line}` }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <span style={{ fontSize: "12px", color: C.dimmed, background: "rgba(15,23,42,0.8)", padding: "4px 16px", borderRadius: "6px" }}>app.trustie.io/verify</span>
          </div>
        </div>

        <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", minHeight: "320px" }}>
          {/* Left: Input */}
          <div style={{ background: "rgba(15,23,42,0.6)", borderRadius: "12px", padding: "20px", border: `1px solid ${C.line}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "8px", background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>Resume Verification</span>
            </div>

            <div style={{ background: "rgba(11,17,32,0.6)", borderRadius: "8px", padding: "14px", marginBottom: "12px" }}>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Candidate: John Smith</p>
              <p style={{ color: C.muted, fontSize: "12px", marginBottom: "4px", opacity: step >= 0 ? 1 : 0, transition: "opacity 0.5s" }}>&quot;5 years at Google as Senior Engineer&quot;</p>
              <p style={{ color: C.muted, fontSize: "12px", marginBottom: "4px", opacity: step >= 0 ? 1 : 0, transition: "opacity 0.5s" }}>&quot;Stanford CS, Class of 2018&quot;</p>
              <p style={{ color: C.muted, fontSize: "12px", opacity: step >= 0 ? 1 : 0, transition: "opacity 0.5s" }}>&quot;AWS Solutions Architect Certified&quot;</p>
            </div>

            {step === 1 && (
              <div style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: C.dimmed }}>Verifying across 5 sources...</span>
                  <span style={{ fontSize: "11px", color: C.blue }}>3 AI models</span>
                </div>
                <div style={{ height: "4px", borderRadius: "2px", background: "rgba(59,130,246,0.15)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: "65%", background: C.blue, borderRadius: "2px", animation: "pulse 1.5s infinite" }} />
                </div>
              </div>
            )}

            <div style={{
              textAlign: "center", padding: "10px", borderRadius: "8px", fontSize: "13px", fontWeight: 600,
              background: step >= 2 ? "rgba(34,197,94,0.15)" : C.blue, color: "#fff",
              border: step >= 2 ? `1px solid rgba(34,197,94,0.3)` : "none",
              transition: "all 0.5s",
            }}>
              {step === 0 ? "Verify All Claims" : step === 1 ? "⟳ Verifying..." : "✓ Verification Complete"}
            </div>
          </div>

          {/* Right: Results */}
          <div style={{
            background: step >= 2 ? "rgba(59,130,246,0.04)" : "rgba(15,23,42,0.3)",
            borderRadius: "12px", padding: "20px",
            border: `1px solid ${step >= 2 ? "rgba(59,130,246,0.2)" : C.line}`,
            transition: "all 0.5s",
          }}>
            {step < 2 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
                {step === 0 && <>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
                  <p style={{ color: C.dimmed, fontSize: "12px" }}>Paste a resume to verify claims</p>
                </>}
                {step === 1 && <>
                  <div style={{ width: 36, height: 36, border: `2px solid ${C.blue}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "12px" }} />
                  <p style={{ color: C.text, fontSize: "13px", fontWeight: 500, marginBottom: "8px" }}>Cross-referencing sources...</p>
                  <div style={{ textAlign: "left", width: "100%" }}>
                    <p style={{ fontSize: "11px", color: C.dimmed, marginBottom: "4px" }}><span style={{ color: C.green }}>✓</span> LinkedIn verified</p>
                    <p style={{ fontSize: "11px", color: C.dimmed, marginBottom: "4px" }}><span style={{ color: C.green }}>✓</span> Stanford Alumni DB checked</p>
                    <p style={{ fontSize: "11px", color: C.dimmed }}><span style={{ color: C.blue }}>⟳</span> Querying Google HR records...</p>
                  </div>
                </>}
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: step === 3 ? "rgba(245,158,11,0.15)" : "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {step === 3 ? <span style={{ color: C.amber, fontSize: "14px" }}>⚠</span> : <div style={{ width: 14, height: 14, border: `2px solid ${C.blue}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />}
                  </div>
                  <div>
                    <p style={{ color: step === 3 ? C.amber : C.blue, fontWeight: 700, fontSize: "13px" }}>{step === 3 ? "PARTIAL MATCH" : "ANALYZING..."}</p>
                    <p style={{ color: C.dimmed, fontSize: "11px" }}>{step === 3 ? "2 of 3 claims verified • 5 sources" : "Processing results..."}</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "8px", opacity: step >= 2 ? 1 : 0, transform: `translateY(${step >= 2 ? 0 : 8}px)`, transition: "all 0.5s" }}>
                    <span style={{ color: C.green, flexShrink: 0 }}>✓</span>
                    <span style={{ color: C.muted, fontSize: "12px" }}>Stanford CS degree confirmed (2018) — <span style={{ color: C.blue }}>High Trust</span></span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", opacity: step >= 3 ? 1 : 0, transform: `translateY(${step >= 3 ? 0 : 8}px)`, transition: "all 0.7s" }}>
                    <span style={{ color: C.red, flexShrink: 0 }}>✗</span>
                    <span style={{ color: C.muted, fontSize: "12px" }}>Google: <strong style={{ color: C.red }}>3 years, not 5</strong> — LinkedIn + HR DB</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", opacity: step >= 3 ? 1 : 0, transform: `translateY(${step >= 3 ? 0 : 8}px)`, transition: "all 1s" }}>
                    <span style={{ color: C.amber, flexShrink: 0 }}>?</span>
                    <span style={{ color: C.muted, fontSize: "12px" }}>Title: &quot;Engineer&quot; not &quot;Senior Engineer&quot; — Manual Check</span>
                  </div>
                </div>

                {step === 3 && (
                  <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: C.dimmed }}>4 sources • 3 AI models</span>
                    <span style={{ fontSize: "11px", color: C.blue, fontWeight: 600 }}>87% confidence</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION COMPONENTS
   ============================================================ */

function SectionTitle({ watermark, title, subtitle }: { watermark?: string; title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: "center", position: "relative", marginBottom: "48px" }}>
      {watermark && (
        <span style={{
          position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
          fontSize: "clamp(80px, 12vw, 160px)", fontWeight: 800, color: "rgba(255,255,255,0.02)",
          whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
        }}>{watermark}</span>
      )}
      <h2 style={{ fontSize: "36px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "12px", position: "relative" }}>{title}</h2>
      {subtitle && <p style={{ color: C.muted, fontSize: "16px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6, position: "relative" }}>{subtitle}</p>}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function TrustieLandingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div style={{ minHeight: "100vh", color: "#fff", background: C.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', overflowX: "hidden" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }
        @keyframes float { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-10px) } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        .hide-mobile { }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          .grid-2-responsive { grid-template-columns: 1fr !important; }
          .grid-4-responsive { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <Navbar />

      {/* ============================================================
         SECTION 1: HERO
         ============================================================ */}
      <section style={{ paddingTop: "120px", paddingBottom: "60px", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1000px", height: "600px", background: `radial-gradient(ellipse, ${C.blueGlow}, transparent 70%)`, pointerEvents: "none", opacity: 0.5 }} />

        <div style={{ position: "relative", zIndex: 1, padding: "0 24px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "24px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <span style={{ color: C.green, fontSize: "13px", fontWeight: 500 }}>No credit card required</span>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "16px", maxWidth: "800px", margin: "0 auto 16px" }}>
            Verify Any Claim.<br />
            <span style={{ background: "linear-gradient(135deg, #3b82f6, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trust Every Hire.</span>
          </h1>

          <p style={{ color: C.muted, fontSize: "18px", maxWidth: "560px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            AI-powered fact verification that cross-checks claims across multiple sources and AI models. Stop fraud. Build trust.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "60px" }}>
            <a href="#" style={{
              background: C.blue, color: "#fff", padding: "14px 32px", borderRadius: "10px",
              fontSize: "16px", fontWeight: 600, textDecoration: "none",
              boxShadow: `0 0 30px ${C.blueGlow}`, transition: "transform 0.2s",
            }}>Try Free — No Credit Card</a>
            <a href="/how-it-works" style={{
              background: "transparent", color: C.text, padding: "14px 32px", borderRadius: "10px",
              fontSize: "16px", fontWeight: 500, textDecoration: "none",
              border: `1px solid ${C.cardBorder}`, transition: "border-color 0.2s",
            }}>See How It Works →</a>
          </div>

          <AnimatedDemo />
        </div>
      </section>

      {/* ============================================================
         SECTION 2: TRUST BADGES (placeholder)
         ============================================================ */}
      <section style={{ padding: "48px 24px", textAlign: "center", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <p style={{ color: C.dimmed, fontSize: "14px", marginBottom: "24px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Trusted by teams verifying claims at
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "48px", flexWrap: "wrap", opacity: 0.4 }}>
          {["HR Teams", "Insurance Firms", "Legal Depts", "Recruiters", "Compliance"].map(name => (
            <span key={name} style={{ color: C.muted, fontSize: "18px", fontWeight: 700, letterSpacing: "0.02em" }}>{name}</span>
          ))}
        </div>
      </section>

      {/* ============================================================
         SECTION 3: 2.0 UPDATES — Feature Proof Cards
         ============================================================ */}
      <section style={{ padding: "100px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle watermark="2.0 Updates" title="Built Different" subtitle="Every verification feature designed to catch what others miss." />

        <div style={{ display: "flex", flexDirection: "column", gap: "80px" }}>
          {/* Card 1: Multi-AI Consensus */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="grid-2-responsive">
            <div>
              <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(59,130,246,0.1)", border: `1px solid rgba(59,130,246,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Multi-AI Consensus Engine</h3>
              <p style={{ color: C.muted, fontSize: "16px", lineHeight: 1.7 }}>Three AI models must agree before a claim is marked verified. GPT-4, Claude, and Gemini cross-check each other — reducing false positives by 90%.</p>
            </div>
            <div style={{ background: "rgba(59,130,246,0.04)", border: `1px solid rgba(59,130,246,0.12)`, borderRadius: "16px", padding: "24px" }}>
              {[
                { name: "GPT-4 Turbo", verdict: "VERIFIED", conf: "94%" },
                { name: "Claude 3.5", verdict: "VERIFIED", conf: "96%" },
                { name: "Gemini Pro", verdict: "VERIFIED", conf: "91%" },
              ].map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "10px", background: "rgba(15,23,42,0.5)", border: `1px solid ${C.line}`, marginBottom: i < 2 ? "8px" : "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "16px" }}>🤖</span>
                    <span style={{ color: "#fff", fontWeight: 500, fontSize: "14px" }}>{m.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: C.dimmed, fontSize: "13px" }}>{m.conf}</span>
                    <span style={{ background: "rgba(34,197,94,0.1)", color: C.green, fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "9999px", border: "1px solid rgba(34,197,94,0.2)" }}>{m.verdict}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "12px", padding: "10px", borderRadius: "8px", background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", textAlign: "center" }}>
                <span style={{ color: C.green, fontWeight: 700, fontSize: "13px" }}>✓ CONSENSUS REACHED — 3/3 models agree</span>
              </div>
            </div>
          </div>

          {/* Card 2: Source Quality Tiers (reversed) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="grid-2-responsive">
            <div style={{ order: 2 }}>
              <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(59,130,246,0.1)", border: `1px solid rgba(59,130,246,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Source Quality Tiers</h3>
              <p style={{ color: C.muted, fontSize: "16px", lineHeight: 1.7 }}>Not all sources are equal. We weight .gov, .edu, and peer-reviewed databases higher than blogs, forums, and commercial sites. Every source gets a trust score.</p>
            </div>
            <div style={{ order: 1, background: "rgba(59,130,246,0.04)", border: `1px solid rgba(59,130,246,0.12)`, borderRadius: "16px", padding: "24px" }}>
              {[
                { badge: "🟢 High Trust", sources: ".gov, .edu, peer-reviewed journals", weight: "3x" },
                { badge: "🟡 Medium Trust", sources: "LinkedIn, Credly, official company sites", weight: "2x" },
                { badge: "🔴 Low Trust", sources: "Blogs, forums, social media, Wikipedia", weight: "1x" },
              ].map((t, i) => (
                <div key={i} style={{ padding: "14px", borderRadius: "10px", background: "rgba(15,23,42,0.5)", border: `1px solid ${C.line}`, marginBottom: i < 2 ? "8px" : "0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>{t.badge}</span>
                    <span style={{ fontSize: "12px", color: C.blue, fontWeight: 500, background: "rgba(59,130,246,0.1)", padding: "2px 8px", borderRadius: "4px" }}>{t.weight} weight</span>
                  </div>
                  <p style={{ color: C.dimmed, fontSize: "12px" }}>{t.sources}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Anti-Commercial Bias */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="grid-2-responsive">
            <div>
              <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(59,130,246,0.1)", border: `1px solid rgba(59,130,246,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Anti-Commercial Bias Filter</h3>
              <p style={{ color: C.muted, fontSize: "16px", lineHeight: 1.7 }}>Sources with financial interest in the claim are automatically flagged and deprioritized. Trustie only trusts sources that have no reason to lie.</p>
            </div>
            <div style={{ background: "rgba(59,130,246,0.04)", border: `1px solid rgba(59,130,246,0.12)`, borderRadius: "16px", padding: "24px" }}>
              {[
                { icon: "✓", color: C.green, name: "stanford.edu/alumni", status: "TRUSTED", statusColor: C.green, desc: "No commercial interest. Official university database." },
                { icon: "⚠", color: C.red, name: "resumebuilder.com", status: "FLAGGED", statusColor: C.red, desc: "Commercial interest: sells resume services. Deprioritized." },
                { icon: "✓", color: C.green, name: "linkedin.com/in/jsmith", status: "TRUSTED", statusColor: C.green, desc: "Professional network. Cross-referenced with employer data." },
              ].map((s, i) => (
                <div key={i} style={{ padding: "14px", borderRadius: "10px", background: "rgba(15,23,42,0.5)", border: `1px solid ${s.statusColor === C.red ? "rgba(239,68,68,0.15)" : C.line}`, marginBottom: i < 2 ? "8px" : "0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span style={{ color: s.color }}>{s.icon}</span>
                    <span style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>{s.name}</span>
                    <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: 700, color: s.statusColor, background: `${s.statusColor}15`, padding: "2px 8px", borderRadius: "9999px" }}>{s.status}</span>
                  </div>
                  <p style={{ color: C.dimmed, fontSize: "11px" }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Full Audit Trail (reversed) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="grid-2-responsive">
            <div style={{ order: 2 }}>
              <div style={{ width: 52, height: 52, borderRadius: "14px", background: "rgba(59,130,246,0.1)", border: `1px solid rgba(59,130,246,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Full Audit Trail</h3>
              <p style={{ color: C.muted, fontSize: "16px", lineHeight: 1.7 }}>Every verification is logged with timestamps, sources checked, AI models used, and confidence scores. Export PDF reports for compliance and legal documentation.</p>
            </div>
            <div style={{ order: 1, borderRadius: "16px", overflow: "hidden", background: "rgba(15,23,42,0.9)", border: `1px solid ${C.line}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 14px", background: "rgba(30,41,66,0.6)", borderBottom: `1px solid ${C.line}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ color: C.dimmed, fontSize: "11px", marginLeft: "8px" }}>audit_trail_ver_abc123.json</span>
              </div>
              <pre style={{ padding: "16px", fontSize: "11px", color: C.muted, lineHeight: 1.6, margin: 0, overflow: "auto" }}><code>{`{
  "audit_id": "ver_abc123",
  "timestamp": "2025-02-22T14:30:00Z",
  "candidate": "John Smith",
  "claims_checked": 3,
  "claims_verified": 2,
  "claims_flagged": 1,
  "confidence": 0.87,
  "ai_models": ["gpt-4", "claude-3.5", "gemini"],
  "sources": [
    { "url": "stanford.edu", "tier": 1 },
    { "url": "linkedin.com", "tier": 2 }
  ],
  "verdict": "PARTIAL_MATCH",
  "export": ["pdf", "csv", "json"]
}`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 4: COMPARISON TABLE
         ============================================================ */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${C.line}` }}>
        <SectionTitle watermark="Compare" title="The Proof Is in the Comparison" subtitle="Compare side-by-side and see why Trustie catches what others miss." />

        <div style={{ maxWidth: "1000px", margin: "0 auto", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "16px 20px", color: C.muted, fontSize: "14px", fontWeight: 500, borderBottom: `1px solid ${C.line}` }}>Verification Features</th>
                {["Trustie", "Checkr", "HireRight", "GPTZero"].map((name, i) => (
                  <th key={name} style={{
                    padding: "16px 20px", textAlign: "center", fontSize: "14px", fontWeight: 700,
                    color: i === 0 ? "#fff" : C.dimmed,
                    background: i === 0 ? "rgba(59,130,246,0.08)" : "transparent",
                    borderBottom: `1px solid ${i === 0 ? "rgba(59,130,246,0.2)" : C.line}`,
                    borderRadius: i === 0 ? "12px 12px 0 0" : "0",
                  }}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["AI-Powered Claim Extraction", true, false, false, true],
                ["Multi-AI Consensus (3+ models)", true, false, false, false],
                ["Source Quality Tiering", true, false, false, false],
                ["Anti-Commercial Bias Filter", true, false, false, false],
                ["Real-Time Verification", true, false, false, true],
                ["Full Audit Trail & Export", true, true, true, false],
                ["Batch CSV Processing", true, true, true, false],
                ["API Access", true, true, true, true],
                ["Resume-Specific Verification", true, true, true, false],
                ["General Claim Verification", true, false, false, true],
                ["No Per-Check Fees", true, false, false, true],
                ["Free Tier Available", true, false, false, true],
              ].map(([feature, ...vals], i) => (
                <tr key={i}>
                  <td style={{ padding: "14px 20px", color: C.text, fontSize: "14px", borderBottom: `1px solid ${C.line}` }}>{feature as string}</td>
                  {(vals as boolean[]).map((v, j) => (
                    <td key={j} style={{
                      padding: "14px 20px", textAlign: "center",
                      background: j === 0 ? "rgba(59,130,246,0.04)" : "transparent",
                      borderBottom: `1px solid ${C.line}`,
                    }}>
                      {v ? (
                        j === 0 ? (
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(59,130,246,0.15)", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59,130,246,0.3)" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
                          </div>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" style={{ display: "inline" }}><path d="M5 12l5 5L20 7"/></svg>
                        )
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" style={{ display: "inline", opacity: 0.6 }}><path d="M6 6l12 12M18 6L6 18"/></svg>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================
         SECTION 5: SOCIAL PROOF / TESTIMONIALS
         ============================================================ */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${C.line}` }}>
        <SectionTitle watermark="Proof" title="Real Results from Real Users" subtitle="See how teams are using Trustie to verify claims and build trust." />

        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }} className="grid-responsive">
          {[
            { name: "Sarah K.", role: "HR Director", stars: 5, text: "Caught 3 inflated titles in one batch. Trustie paid for itself in the first week.", company: "Tech Startup" },
            { name: "Marcus R.", role: "Recruiter", stars: 5, text: "I verify every resume now. The multi-AI consensus gives me confidence no other tool does.", company: "Staffing Agency" },
            { name: "Jennifer L.", role: "Compliance Officer", stars: 5, text: "The audit trail exports are exactly what our legal team needed. Clean, thorough, defensible.", company: "Insurance Firm" },
            { name: "David T.", role: "Hiring Manager", stars: 5, text: "We went from 2 bad hires per quarter to zero. The ROI is insane.", company: "Series B Startup" },
            { name: "Amy W.", role: "Legal Analyst", stars: 5, text: "Used Trustie for due diligence on a merger. Found material misrepresentations in executive bios.", company: "Law Firm" },
            { name: "Chris P.", role: "Content Lead", stars: 5, text: "We fact-check every AI-generated article before publishing. Trustie catches things Grammarly never would.", company: "Media Company" },
          ].map((t, i) => (
            <div key={i} style={{
              background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "14px",
              padding: "24px", backdropFilter: "blur(8px)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>{t.name}</p>
                  <p style={{ color: C.dimmed, fontSize: "12px" }}>{t.role} • {t.company}</p>
                </div>
                <div style={{ display: "flex", gap: "2px" }}>
                  {Array(t.stars).fill(0).map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: "14px" }}>★</span>)}
                </div>
              </div>
              <p style={{ color: C.muted, fontSize: "14px", lineHeight: 1.6 }}>&quot;{t.text}&quot;</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
         SECTION 6: PROOF — Video Placeholder
         ============================================================ */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${C.line}`, position: "relative" }}>
        <SectionTitle watermark="Proof" title="Trustie Working on Real Verifications" subtitle="Watch Trustie verify real resume claims in real-time. No scripts. No fakes." />

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Video placeholder */}
          <div style={{
            aspectRatio: "16/9", borderRadius: "16px", overflow: "hidden",
            background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(59,130,246,0.02))",
            border: `1px solid rgba(59,130,246,0.15)`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", border: "1px solid rgba(59,130,246,0.3)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill={C.blue}><path d="M8 5v14l11-7z"/></svg>
            </div>
            <p style={{ color: "#fff", fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>Demo Video Coming Soon</p>
            <p style={{ color: C.dimmed, fontSize: "13px" }}>Real verification walkthrough — no scripts, no fakes</p>
            <a href="#" style={{ color: C.blue, fontSize: "14px", marginTop: "12px", textDecoration: "none" }}>Full video here →</a>
          </div>
        </div>
      </section>

      {/* ============================================================
         SECTION 7: "Here's why" → Blog link
         ============================================================ */}
      <section style={{ padding: "48px 24px", textAlign: "center", borderTop: `1px solid ${C.line}` }}>
        <p style={{ color: C.muted, fontSize: "18px", marginBottom: "8px" }}>
          ...and all the verification softwares
        </p>
        <p style={{ fontSize: "16px" }}>
          <span style={{ color: C.muted }}>Here&apos;s why: </span>
          <a href="/how-it-works" style={{ color: C.blue, textDecoration: "underline" }}>a detailed technological blog</a>
        </p>
      </section>

      {/* ============================================================
         SECTION 8: PRICING
         ============================================================ */}
      <section id="pricing" style={{ padding: "80px 24px", borderTop: `1px solid ${C.line}` }}>
        <SectionTitle title="Pricing" subtitle="Simple and transparent pricing for everyone" />

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "12px", padding: "4px" }}>
            <button onClick={() => setAnnual(false)} style={{ padding: "8px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", background: !annual ? "rgba(59,130,246,0.2)" : "transparent", color: !annual ? "#fff" : C.muted }}>Monthly</button>
            <button onClick={() => setAnnual(true)} style={{ padding: "8px 20px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", background: annual ? "rgba(59,130,246,0.2)" : "transparent", color: annual ? "#fff" : C.muted, display: "flex", alignItems: "center", gap: "8px" }}>
              Annual <span style={{ fontSize: "11px", fontWeight: 700, background: "rgba(34,197,94,0.15)", color: C.green, padding: "2px 8px", borderRadius: "9999px" }}>Save 20%</span>
            </button>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", alignItems: "start" }} className="grid-4-responsive">
          {[
            { name: "Free", desc: "For individuals exploring AI verification.", price: 0, pa: 0, cta: "Get Started Free", pop: false, features: ["5 verifications/day", "Basic claim extraction", "Standard sources", "Community support"], limits: ["No batch", "No API", "No export"] },
            { name: "Pro", desc: "For recruiters who verify daily.", price: 29, pa: 24, cta: "Start Free Trial", pop: true, features: ["Unlimited verifications", "Advanced extraction", "All source tiers + bias filter", "Confidence breakdowns", "Audit trail & export", "Priority checking", "Email support (24h)"], limits: [] },
            { name: "Team", desc: "For HR teams verifying at scale.", price: 99, pa: 79, cta: "Start Free Trial", pop: false, features: ["Everything in Pro", "10 team members", "Batch CSV (500 claims)", "Team dashboard", "API access (10K/mo)", "Slack integration", "Priority support (4h)"], limits: [] },
            { name: "Enterprise", desc: "Custom security and scale.", price: null, pa: null, cta: "Contact Sales", pop: false, features: ["Everything in Team", "Unlimited members", "Unlimited API", "SSO/SAML", "Custom integrations", "SOC 2 report", "Dedicated manager", "99.9% SLA"], limits: [] },
          ].map(p => (
            <div key={p.name} style={{
              background: p.pop ? "rgba(59,130,246,0.06)" : C.card,
              border: `1px solid ${p.pop ? "rgba(59,130,246,0.3)" : C.cardBorder}`,
              borderRadius: "16px", padding: "28px 24px", position: "relative",
              boxShadow: p.pop ? `0 0 40px rgba(59,130,246,0.1)` : "none",
            }}>
              {p.pop && <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: C.blue, color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "9999px" }}>MOST POPULAR</div>}
              <p style={{ color: "#fff", fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>{p.name}</p>
              <p style={{ color: C.dimmed, fontSize: "13px", marginBottom: "20px", minHeight: "36px" }}>{p.desc}</p>
              {p.price !== null ? (
                <div style={{ marginBottom: "20px" }}>
                  <span style={{ fontSize: "40px", fontWeight: 800, color: "#fff" }}>${annual ? p.pa : p.price}</span>
                  <span style={{ color: C.muted, fontSize: "14px" }}>/mo</span>
                  {annual && p.price > 0 && <p style={{ color: C.green, fontSize: "12px", marginTop: "2px" }}>Billed annually</p>}
                </div>
              ) : (
                <div style={{ marginBottom: "20px" }}>
                  <span style={{ fontSize: "32px", fontWeight: 800, color: "#fff" }}>Custom</span>
                </div>
              )}
              <a href="#" style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none", marginBottom: "24px", background: p.pop ? C.blue : "transparent", color: "#fff", border: p.pop ? "none" : `1px solid ${C.cardBorder}`, boxShadow: p.pop ? `0 0 20px ${C.blueGlow}` : "none" }}>{p.cta}</a>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5"><path d="M5 12l5 5L20 7"/></svg>
                    <span style={{ color: C.text, fontSize: "13px" }}>{f}</span>
                  </div>
                ))}
                {p.limits.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.dimmed} strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
                    <span style={{ color: C.dimmed, fontSize: "13px" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
         SECTION 9: FAQ
         ============================================================ */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${C.line}` }}>
        <SectionTitle title="Frequently Asked Questions" />
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          {[
            { q: "Is there really a free plan?", a: "Yes. 5 verifications per day, forever. No credit card required." },
            { q: "Can I cancel anytime?", a: "Absolutely. No contracts, no cancellation fees. Cancel in one click." },
            { q: "What counts as one verification?", a: "One piece of text submitted. It can contain multiple claims — we extract and verify each individually." },
            { q: "Do you offer startup/nonprofit discounts?", a: "Yes. Email support@trustieapp.com with details and we'll work something out." },
            { q: "What payment methods do you accept?", a: "All major credit cards via Stripe. Enterprise customers can pay via invoice." },
            { q: "Is my data secure?", a: "Yes. We don't store the content you verify — it's processed in real-time and discarded." },
          ].map((f, i) => (
            <details key={i} style={{ marginBottom: "8px", background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "12px", overflow: "hidden" }}>
              <summary style={{ padding: "16px 20px", color: "#fff", fontSize: "15px", fontWeight: 600, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                {f.q} <span style={{ color: C.dimmed }}>+</span>
              </summary>
              <div style={{ padding: "0 20px 16px" }}>
                <p style={{ color: C.muted, fontSize: "14px", lineHeight: 1.6 }}>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ============================================================
         SECTION 10: AFFILIATE PROGRAM
         ============================================================ */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: "20px", padding: "48px 32px" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
            <div style={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(59,130,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
          </div>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>Earn with Trustie</h2>
          <p style={{ color: C.muted, fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
            Trustie offers a generous referral program. Earn 30% of all earnings from people using your referral code.
          </p>
          <a href="#" style={{
            display: "inline-block", background: C.blue, color: "#fff", padding: "12px 28px",
            borderRadius: "10px", fontSize: "15px", fontWeight: 600, textDecoration: "none",
            boxShadow: `0 0 20px ${C.blueGlow}`,
          }}>Join affiliate program (30% commission)</a>
          <p style={{ color: C.dimmed, fontSize: "12px", marginTop: "16px" }}>Email us at: <strong style={{ color: C.muted }}>danny@trustieapp.com</strong></p>
        </div>
      </section>

      {/* ============================================================
         SECTION 11: FINAL CTA
         ============================================================ */}
      <section style={{ padding: "80px 24px", textAlign: "center", borderTop: `1px solid ${C.line}` }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: `0 0 30px ${C.blueGlow}` }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#fff", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Ready to Verify Any Claim with 100% AI-Powered Accuracy?
        </h2>
        <p style={{ color: C.muted, fontSize: "16px", marginBottom: "28px" }}>Start Your Free Trial Today</p>
        <a href="#" style={{
          display: "inline-block", background: C.blue, color: "#fff", padding: "16px 40px",
          borderRadius: "12px", fontSize: "17px", fontWeight: 700, textDecoration: "none",
          boxShadow: `0 0 40px ${C.blueGlow}`, transition: "transform 0.2s",
        }}>Try Trustie Free</a>
      </section>

      {/* ============================================================
         FOOTER
         ============================================================ */}
      <footer style={{ borderTop: `1px solid ${C.line}`, padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "40px" }} className="grid-4-responsive">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>Trustie</span>
            </div>
            <p style={{ color: C.dimmed, fontSize: "13px", lineHeight: 1.6, maxWidth: "260px", marginBottom: "16px" }}>
              AI-powered verification for everyone. Stop fraud, verify claims, and build trust.
            </p>
            <a href="https://x.com/UseTrustie" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: C.muted, fontSize: "13px", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              @UseTrustie
            </a>
          </div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", marginBottom: "14px" }}>Pages</p>
            {[
              { label: "Proof", href: "/proof" },
              { label: "Pricing", href: "/pricing" },
              { label: "Help", href: "/help" },
              { label: "Blog", href: "/blog" },
              { label: "How it works", href: "/how-it-works" },
              { label: "Database", href: "/database" },
            ].map(l => <a key={l.label} href={l.href} style={{ display: "block", color: C.dimmed, fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{l.label}</a>)}
          </div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", marginBottom: "14px" }}>Use Cases</p>
            {["Resume Verification", "HR Background Checks", "Insurance Claims", "Legal Due Diligence", "Journalism", "Academic Research", "Enterprise API"].map(l => <a key={l} href="#" style={{ display: "block", color: C.dimmed, fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{l}</a>)}
          </div>
          <div>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", marginBottom: "14px" }}>Legal</p>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => <a key={l} href="#" style={{ display: "block", color: C.dimmed, fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{l}</a>)}
          </div>
        </div>
        <div style={{ maxWidth: "1100px", margin: "32px auto 0", paddingTop: "24px", borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: C.dimmed, fontSize: "12px" }}>© 2025 Trustie. All rights reserved.</p>
          <p style={{ color: C.dimmed, fontSize: "12px" }}>Built with trust.</p>
        </div>
      </footer>
    </div>
  );
}
