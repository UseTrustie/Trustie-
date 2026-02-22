'use client';
// @ts-nocheck
import { useState, useRef, useEffect } from "react";

const PAGES = {
  "getting-started": { title: "Getting Started", subtitle: "Welcome to Trustie. This guide will help you get up and running quickly." },
  "how-verification-works": { title: "How Verification Works", subtitle: "Understand how Trustie verifies claims against trusted sources." },
  "supported-ai-models": { title: "Supported AI Models", subtitle: "Configure Trustie to work with your preferred AI tools." },
  "our-methodology": { title: "Our Methodology", subtitle: "Learn how Trustie ensures accurate, unbiased fact-checking for every claim." },
  "results-not-loading": { title: "Results Not Loading", subtitle: "Follow these steps to resolve issues with verification results." },
  "inaccurate-results": { title: "Inaccurate Results", subtitle: "Steps to take if verification results seem incorrect." },
  "browser-compatibility": { title: "Browser Compatibility", subtitle: "Ensure Trustie works properly in your browser environment." },
};

/* ── colour tokens matching Trustie landing page ── */
const C = {
  bg: "#0B1120",
  sidebar: "#080e1a",
  card: "rgba(30,41,66,0.5)",
  cardBorder: "rgba(59,130,246,0.12)",
  blue: "#3b82f6",
  blueGlow: "rgba(59,130,246,0.25)",
  red: "#ef4444",
  green: "#22c55e",
  amber: "#f59e0b",
  text: "#e2e8f0",
  muted: "#94a3b8",
  dimmed: "#475569",
  line: "rgba(148,163,184,0.08)",
};

/* ════════════════ SIDEBAR ════════════════ */
function Sidebar({ activePage, setActivePage, mobileOpen, setMobileOpen }) {
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (mobileOpen && ref.current && !ref.current.contains(e.target)) setMobileOpen(false); };
    document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h);
  }, [mobileOpen, setMobileOpen]);

  const navBtn = (id, label) => {
    const active = activePage === id;
    return (
      <button key={id} onClick={() => { setActivePage(id); setMobileOpen(false); }}
        style={{
          width: "100%", textAlign: "left", padding: "8px 14px", borderRadius: "8px",
          fontSize: "13.5px", cursor: "pointer", border: "none", display: "block",
          transition: "all .15s",
          background: active ? "rgba(59,130,246,0.12)" : "transparent",
          color: active ? "#fff" : C.muted,
          fontWeight: active ? "500" : "400",
          borderLeft: `2px solid ${active ? C.blue : "transparent"}`,
        }}
      >{label}</button>
    );
  };

  const sidebarStyle = {
    position: "fixed", top: 0, left: 0, bottom: 0, width: "252px",
    background: C.sidebar, borderRight: `1px solid ${C.line}`,
    display: "flex", flexDirection: "column", zIndex: 50, overflowY: "auto",
    transition: "transform .3s",
  };

  return (
    <>
      {mobileOpen && <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.55)", zIndex: 40 }} onClick={() => setMobileOpen(false)} />}
      <aside ref={ref} style={sidebarStyle}>
        {/* Logo */}
        <div style={{ padding: "22px 18px 18px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: C.blue,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 12px ${C.blueGlow}`,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "17px", letterSpacing: "-0.02em" }}>Trustie</span>
        </div>

        {/* Search */}
        <div style={{ padding: "0 14px", marginBottom: "14px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px", padding: "7px 11px",
            background: "rgba(148,163,184,0.06)", border: `1px solid ${C.line}`,
            borderRadius: "8px", fontSize: "13px", color: C.dimmed,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <span>Search documentation</span>
            <span style={{ marginLeft: "auto", display: "flex", gap: "3px" }}>
              <kbd style={{ padding: "1px 5px", background: "rgba(148,163,184,0.08)", border: `1px solid ${C.line}`, borderRadius: "3px", fontSize: "9px", fontFamily: "monospace", color: C.dimmed }}>⌘</kbd>
              <kbd style={{ padding: "1px 5px", background: "rgba(148,163,184,0.08)", border: `1px solid ${C.line}`, borderRadius: "3px", fontSize: "9px", fontFamily: "monospace", color: C.dimmed }}>K</kbd>
            </span>
          </div>
        </div>

        {/* Sign in */}
        <div style={{ padding: "0 14px", marginBottom: "22px" }}>
          <button style={{
            width: "100%", padding: "9px", borderRadius: "8px",
            background: C.blue, color: "#fff", fontWeight: 600, fontSize: "13px",
            border: "none", cursor: "pointer", boxShadow: `0 0 16px ${C.blueGlow}`,
          }}>Sign in with Trustie</button>
        </div>

        {/* Nav groups */}
        <nav style={{ flex: 1, padding: "0 10px" }}>
          <div style={{ marginBottom: "18px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 14px", marginBottom: "6px" }}>General</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {navBtn("getting-started", "Getting Started")}
              {navBtn("how-verification-works", "How Verification Works")}
              {navBtn("supported-ai-models", "Supported AI Models")}
              {navBtn("our-methodology", "Our Methodology")}
            </div>
          </div>
          <div style={{ marginBottom: "18px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 14px", marginBottom: "6px" }}>Troubleshooting</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {navBtn("results-not-loading", "Results not loading")}
              {navBtn("inaccurate-results", "Inaccurate results")}
              {navBtn("browser-compatibility", "Browser compatibility")}
            </div>
          </div>
          <div style={{ marginBottom: "18px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 14px", marginBottom: "6px" }}>Support</p>
            <div style={{ padding: "0 14px" }}>
              <p style={{ fontSize: "13px", color: C.muted }}>support@trustieapp.com</p>
            </div>
          </div>
        </nav>

        <div style={{ padding: "14px 18px", borderTop: `1px solid ${C.line}`, textAlign: "center" }}>
          <p style={{ fontSize: "11px", color: C.dimmed }}>&copy; 2025 Trustie. All rights reserved</p>
        </div>
      </aside>
    </>
  );
}

/* ════════════════ REUSABLE COMPONENTS ════════════════ */
function ContentCard({ title, children }) {
  return (
    <div style={{ border: `1px solid ${C.cardBorder}`, borderRadius: "14px", background: C.card, padding: "24px 26px", backdropFilter: "blur(8px)" }}>
      {title && <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff", marginBottom: "20px" }}>{title}</h3>}
      {children}
    </div>
  );
}

function Step({ n, title, desc, link, linkText }) {
  return (
    <div style={{ display: "flex", gap: "14px", padding: "14px 0", borderBottom: `1px solid ${C.line}` }}>
      <div style={{
        flexShrink: 0, width: 30, height: 30, borderRadius: "50%",
        border: `1px solid ${C.cardBorder}`, background: "rgba(59,130,246,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px", color: C.blue, fontWeight: 600,
      }}>{n}</div>
      <div>
        <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>{title}</p>
        <p style={{ color: C.muted, fontSize: "13px", marginTop: "3px", lineHeight: 1.5 }}>
          {desc}{link && <>{" "}<a href={link} style={{ color: C.blue, textDecoration: "none" }}>{linkText || "here"}</a></>}
        </p>
      </div>
    </div>
  );
}

function ChallengeCard({ emoji, challenge, challengeDesc, solution }) {
  return (
    <div style={{ border: `1px solid ${C.cardBorder}`, borderRadius: "14px", background: C.card, padding: "20px", marginBottom: "14px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
        <div style={{
          flexShrink: 0, width: 30, height: 30, borderRadius: "50%",
          background: "rgba(239,68,68,0.15)", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: "14px",
        }}>{emoji}</div>
        <div>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px" }}>{challenge}</p>
          <p style={{ color: C.muted, fontSize: "13px", marginTop: "4px", lineHeight: 1.5 }}>{challengeDesc}</p>
        </div>
      </div>
      <div style={{
        background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.18)",
        borderRadius: "10px", padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: "10px",
      }}>
        <span style={{ flexShrink: 0, marginTop: "1px", color: C.green, fontSize: "15px" }}>✓</span>
        <p style={{ color: "#86efac", fontSize: "13px", lineHeight: 1.6 }}>{solution}</p>
      </div>
    </div>
  );
}

/* ════════════════ PAGE CONTENT ════════════════ */
function GettingStarted() {
  return (<div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
    <ContentCard title="Quick Start Guide">
      <Step n={1} title="Visit the Trustie website" desc="Go to" link="#" linkText="trustieapp.com" />
      <Step n={2} title="Create your account" desc="Sign up with your email or continue with Google, Apple, or Microsoft." />
      <Step n={3} title="Choose your plan" desc="Start with the free tier or upgrade to Team or Enterprise on the" link="#" linkText="pricing page" />
      <Step n={4} title="Paste AI-generated content" desc='Use the "Check AI" tab to paste any text from ChatGPT, Claude, Gemini, or other AI tools.' />
      <Step n={5} title="Review verification results" desc="Trustie extracts each factual claim and cross-references it against trusted sources." />
      <Step n={6} title="Check the verdict" desc="Each claim is labeled Verified, False, or Unconfirmed with source links." />
      <Step n={7} title="Export or share results" desc="Copy the verification report or download the audit trail for your records." />
      <Step n={8} title="All done" desc="Start verifying with confidence. No more blind trusting AI." />
    </ContentCard>
    <ContentCard title="How to Use">
      <div style={{
        borderRadius: "12px", background: "rgba(11,17,32,0.8)", border: `1px solid ${C.cardBorder}`,
        aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", cursor: "pointer", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${C.blueGlow}, transparent 70%)` }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: "rgba(59,130,246,0.2)",
            border: `1px solid rgba(59,130,246,0.3)`, display: "flex",
            alignItems: "center", justifyContent: "center", margin: "0 auto 10px",
            boxShadow: `0 0 24px ${C.blueGlow}`,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="9.5,7.5 16.5,12 9.5,16.5" /></svg>
          </div>
          <p style={{ color: C.muted, fontSize: "13px" }}>Watch the tutorial</p>
        </div>
      </div>
    </ContentCard>
  </div>);
}

function HowVerification() {
  return (<div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
    <ContentCard title="Quick Verification Steps">
      <Step n={1} title="Submit your content" desc="Paste AI-generated text, a URL, or type a question into Trustie." />
      <Step n={2} title="Claim extraction" desc="Trustie uses AI to identify every factual claim in the content automatically." />
      <Step n={3} title="Cross-reference against trusted sources" desc="Each claim is verified against .gov, .edu, peer-reviewed journals, and other high-quality sources." />
      <Step n={4} title="Review the verdict" desc="Claims are labeled as Verified, False, or Unconfirmed with confidence scores and direct source links." />
    </ContentCard>
    <ContentCard title="Source Quality Tiers">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { c: C.green, bg: "rgba(34,197,94,0.06)", b: "rgba(34,197,94,0.12)", l: "Tier 1 — High Trust", d: ".gov, .edu, peer-reviewed journals, official databases" },
          { c: C.amber, bg: "rgba(245,158,11,0.06)", b: "rgba(245,158,11,0.12)", l: "Tier 2 — Medium Trust", d: "Major news outlets, established organizations, Wikipedia" },
          { c: C.red, bg: "rgba(239,68,68,0.06)", b: "rgba(239,68,68,0.12)", l: "Tier 3 — Verify Manually", d: "Blogs, forums, social media, user-generated content" },
        ].map(t => (
          <div key={t.l} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", background: t.bg, border: `1px solid ${t.b}` }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.c, flexShrink: 0 }} />
            <div>
              <p style={{ color: "#fff", fontWeight: 500, fontSize: "13px" }}>{t.l}</p>
              <p style={{ color: C.muted, fontSize: "11px", marginTop: "2px" }}>{t.d}</p>
            </div>
          </div>
        ))}
      </div>
    </ContentCard>
  </div>);
}

function SupportedModels() {
  return (<ContentCard title="Application Settings">
    <p style={{ color: C.text, fontSize: "13px", marginBottom: "6px" }}>You can manage your AI model preferences in the <a href="#" style={{ color: C.blue, textDecoration: "underline" }}>dashboard</a> page.</p>
    <p style={{ color: C.text, fontSize: "13px", marginBottom: "20px" }}>Currently, Trustie can verify content generated by the following AI models:</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px" }}>
      {["ChatGPT (GPT-4o)", "Claude (Anthropic)", "Gemini (Google)", "Perplexity", "DeepSeek", "Kimi (Moonshot)", "Llama (Meta)", "Mistral", "Copilot (Microsoft)", "Grok (xAI)", "Command R (Cohere)", "Any AI text"].map(m => (
        <div key={m} style={{ padding: "8px 10px", background: "rgba(59,130,246,0.04)", border: `1px solid ${C.cardBorder}`, borderRadius: "8px", fontSize: "12px", color: C.text, textAlign: "center" }}>{m}</div>
      ))}
    </div>
  </ContentCard>);
}

function Methodology() {
  return (<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
    <div style={{ color: C.text, fontSize: "13px", lineHeight: 1.7 }}>
      <p style={{ marginBottom: "12px" }}>Trustie employs multiple verification methods to ensure every claim is checked thoroughly. Below are common challenges with AI-generated content, and how Trustie addresses each one.</p>
      <p style={{ color: C.red, fontWeight: 500 }}>Trustie has never marked a verified claim as false in our internal audits across 50,000+ checks.</p>
    </div>
    <hr style={{ border: "none", borderTop: `1px solid ${C.line}` }} />
    <div>
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "#fff", marginBottom: "6px" }}>Verification Challenges & Our Solutions</h3>
      <p style={{ color: C.muted, fontSize: "13px", marginBottom: "20px" }}>Each card shows the challenge in context, with our solution highlighted in green below.</p>
      <ChallengeCard emoji="⚠️" challenge="AI Hallucinations" challengeDesc="AI models confidently generate false information that sounds completely accurate and authoritative." solution="Trustie cross-references every factual claim against multiple independent sources. We never rely on a single source, requiring a minimum of 2 corroborating sources for a Verified label." />
      <ChallengeCard emoji="⏰" challenge="Outdated Information" challengeDesc="AI training data has a cutoff date, leading to stale facts about current events, statistics, and positions." solution="Trustie searches real-time web sources and prioritizes the most recent data. Our system flags when information may have changed since the AI model's training cutoff." />
      <ChallengeCard emoji="🛡️" challenge="Source Bias" challengeDesc="Many fact-checkers rely on commercial or politically biased sources, leading to skewed verification results." solution="Trustie applies an Anti-Commercial Bias filter that weights academic, government, and peer-reviewed sources higher. Commercial sources are flagged and deprioritized." />
      <ChallengeCard emoji="🔒" challenge="No Audit Trail" challengeDesc="Most AI tools provide answers without showing how they arrived at a conclusion, making it impossible to verify the verification." solution="Every Trustie result includes a full audit trail: the exact sources checked, confidence scores for each source, timestamps, and a methodology breakdown." />
    </div>
  </div>);
}

function ResultsNotLoading() {
  return (<ContentCard title="Troubleshooting Steps">
    <Step n={1} title="Check your internet connection" desc="Trustie requires an active internet connection to verify claims against live sources." />
    <Step n={2} title="Try refreshing the page" desc="Sometimes a simple refresh can resolve temporary loading issues." />
    <Step n={3} title="Clear your browser cache" desc="Go to your browser settings and clear cached data, then reload Trustie." />
    <Step n={4} title="Contact Support" desc="If the issue persists, reach out to our support team at support@trustieapp.com for assistance." />
  </ContentCard>);
}

function InaccurateResults() {
  return (<div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
    <ContentCard title="Steps to Improve Accuracy">
      <Step n={1} title='"Was this helpful?" feedback' desc="After each verification, rate the accuracy. This helps our system learn and improve over time." />
      <Step n={2} title="Provide specific claims" desc="The more specific the text you paste, the more accurate the verification." />
      <Step n={3} title="Check the source links" desc="Every verdict includes source links. Click through to verify the sources yourself." />
      <Step n={4} title="Report inaccuracies" desc="Email support@trustieapp.com with the claim and correct information." />
    </ContentCard>
    <ContentCard title="Understanding Confidence Scores">
      <p style={{ color: C.text, fontSize: "13px", marginBottom: "14px" }}>Trustie assigns confidence scores based on the number and quality of corroborating sources.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { w: "80px", c: C.green, t: "90-100% — Strong verification, multiple Tier 1 sources" },
          { w: "64px", c: C.blue, t: "70-89% — Verified with mixed Tier 1 and Tier 2 sources" },
          { w: "48px", c: C.amber, t: "40-69% — Limited sources, verify manually" },
          { w: "32px", c: C.red, t: "0-39% — Contradicted or unverifiable" },
        ].map(s => (
          <div key={s.t} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: s.w, height: 7, borderRadius: "9999px", background: s.c, flexShrink: 0, boxShadow: `0 0 8px ${s.c}44` }} />
            <span style={{ fontSize: "12px", color: C.text }}>{s.t}</span>
          </div>
        ))}
      </div>
    </ContentCard>
  </div>);
}

function BrowserCompat() {
  return (<div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
    <ContentCard title="Supported Browsers">
      <p style={{ color: C.text, fontSize: "13px", marginBottom: "14px" }}>Trustie works best on modern browsers. For the best experience, we recommend:</p>
      {[
        { n: "Google Chrome", v: "90+", s: "Fully Supported" }, { n: "Microsoft Edge", v: "90+", s: "Fully Supported" },
        { n: "Mozilla Firefox", v: "88+", s: "Fully Supported" }, { n: "Safari", v: "15+", s: "Fully Supported" },
        { n: "Brave", v: "1.25+", s: "Fully Supported" }, { n: "Opera", v: "76+", s: "Supported" },
      ].map(b => (
        <div key={b.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
          <div>
            <p style={{ color: "#fff", fontSize: "13px", fontWeight: 500 }}>{b.n}</p>
            <p style={{ color: C.dimmed, fontSize: "11px" }}>Version {b.v}</p>
          </div>
          <span style={{ color: C.green, fontSize: "11px", fontWeight: 500, background: "rgba(34,197,94,0.1)", padding: "3px 8px", borderRadius: "9999px" }}>{b.s}</span>
        </div>
      ))}
    </ContentCard>
    <ContentCard title="Troubleshooting Steps">
      <Step n={1} title="Update your browser" desc="Make sure you are running the latest version of your browser for full compatibility." />
      <Step n={2} title="Disable conflicting extensions" desc="Some ad blockers or privacy extensions may interfere with Trustie. Try disabling them temporarily." />
      <Step n={3} title="Contact Support" desc="If the issue persists, reach out to our support team for assistance." />
    </ContentCard>
  </div>);
}

/* ════════════════ MAIN ════════════════ */
export default function TrustieHelpPage() {
  const [activePage, setActivePage] = useState("getting-started");
  const [mobileOpen, setMobileOpen] = useState(false);
  const page = PAGES[activePage];

  const content = {
    "getting-started": <GettingStarted />,
    "how-verification-works": <HowVerification />,
    "supported-ai-models": <SupportedModels />,
    "our-methodology": <Methodology />,
    "results-not-loading": <ResultsNotLoading />,
    "inaccurate-results": <InaccurateResults />,
    "browser-compatibility": <BrowserCompat />,
  };

  return (
    <div style={{ minHeight: "100vh", color: "#fff", background: C.bg, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Mobile header */}
      <div style={{
        display: "none", position: "fixed", top: 0, left: 0, right: 0, zIndex: 30,
        background: "rgba(11,17,32,0.85)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.line}`, padding: "10px 16px",
        alignItems: "center", gap: "10px",
      }}>
        <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "15px" }}>Trustie</span>
        </div>
      </div>

      {/* Main content */}
      <main style={{ marginLeft: "252px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "56px 36px" }}>
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#fff", marginBottom: "8px", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
              {page.title}
            </h1>
            <p style={{ color: C.muted, fontSize: "14px" }}>{page.subtitle}</p>
          </div>
          <hr style={{ border: "none", borderTop: `1px solid ${C.line}`, marginBottom: "28px" }} />
          {content[activePage]}
        </div>
      </main>

      {/* Chat button */}
      <button style={{
        position: "fixed", bottom: 20, right: 20, width: 50, height: 50, borderRadius: "50%",
        background: C.blue, boxShadow: `0 4px 20px ${C.blueGlow}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "none", cursor: "pointer", zIndex: 40,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" /></svg>
      </button>
    </div>
  );
}
