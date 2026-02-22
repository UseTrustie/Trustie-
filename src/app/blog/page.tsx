'use client';

import { useState } from "react";

/* ── Trustie colour tokens ── */
const C = {
  bg: "#0B1120",
  card: "rgba(30,41,66,0.5)",
  cardBorder: "rgba(59,130,246,0.12)",
  blue: "#3b82f6",
  blueGlow: "rgba(59,130,246,0.25)",
  red: "#ef4444",
  green: "#22c55e",
  text: "#e2e8f0",
  muted: "#94a3b8",
  dimmed: "#475569",
  line: "rgba(148,163,184,0.08)",
};

/* ══════════════════════════════════════════════════════════════════
   BLOG DATA — Trustie articles grouped by month
   ══════════════════════════════════════════════════════════════════ */

const FEATURED = {
  date: "February 18, 2026",
  title: "Why 70% of Resumes Contain Lies — And How AI Is Finally Catching Them",
  slug: "resume-lies-ai-catching",
};

const BLOG_MONTHS = [
  {
    month: "FEBRUARY 2026",
    posts: [
      { title: "Trustie vs Manual Background Checks: Speed, Cost, and Accuracy Compared", date: "Feb 15, 2026" },
      { title: "How HR Teams Are Using AI to Verify 500+ Resumes Per Week", date: "Feb 12, 2026" },
      { title: "The Hidden Cost of a Bad Hire: Breaking Down the $150,000 Problem", date: "Feb 8, 2026" },
    ],
  },
  {
    month: "JANUARY 2026",
    posts: [
      { title: "Multi-AI Consensus: Why One Model Is Never Enough for Fact-Checking", date: "Jan 28, 2026" },
      { title: "AI Hallucinations in Hiring: When ChatGPT Invents Credentials", date: "Jan 22, 2026" },
      { title: "Building an Audit Trail: How Trustie Makes Every Verification Transparent", date: "Jan 15, 2026" },
      { title: "SOC 2 Compliance for AI Tools: What Enterprise Buyers Need to Know", date: "Jan 10, 2026" },
      { title: "The Complete Guide to AI-Powered Resume Verification in 2026", date: "Jan 5, 2026" },
    ],
  },
  {
    month: "DECEMBER 2025",
    posts: [
      { title: "How Insurance Companies Are Using AI to Detect Fraudulent Claims", date: "Dec 28, 2025" },
      { title: "Source Bias in AI: Why Your Fact-Checker Might Be Wrong", date: "Dec 20, 2025" },
      { title: "Enterprise AI Verification: From Pilot to Full Deployment", date: "Dec 15, 2025" },
      { title: "The Rise of Resume Fraud: 2025 Statistics Every HR Leader Should Know", date: "Dec 10, 2025" },
      { title: "Trustie API: How Developers Are Integrating Verification Into Their Apps", date: "Dec 5, 2025" },
      { title: "AI Fact-Checking for Journalists: A New Standard for Newsrooms", date: "Dec 1, 2025" },
    ],
  },
  {
    month: "NOVEMBER 2025",
    posts: [
      { title: "Why Traditional Background Checks Are Failing in the Age of AI", date: "Nov 25, 2025" },
      { title: "5 Red Flags That a Resume Was AI-Generated (And How to Verify)", date: "Nov 20, 2025" },
      { title: "Building Trust in AI Outputs: The Verification Layer Every Business Needs", date: "Nov 15, 2025" },
      { title: "Legal Liability and AI-Verified Hiring: What Your Legal Team Should Know", date: "Nov 10, 2025" },
      { title: "How Trustie Cross-References Claims Against 50+ Trusted Source Categories", date: "Nov 5, 2025" },
    ],
  },
  {
    month: "OCTOBER 2025",
    posts: [
      { title: "The Anti-Commercial Bias Filter: How Trustie Keeps Verification Honest", date: "Oct 28, 2025" },
      { title: "From ChatGPT to Claude: Comparing AI Hallucination Rates Across Models", date: "Oct 22, 2025" },
      { title: "Case Study: How a 200-Person Company Saved $400K with AI Resume Verification", date: "Oct 15, 2025" },
      { title: "Confidence Scores Explained: What 95% Verified Actually Means", date: "Oct 10, 2025" },
      { title: "Why Every Enterprise Needs an AI Verification Strategy in 2026", date: "Oct 5, 2025" },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════════ */
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Features", "How it works", "Pricing", "Blog", "FAQ", "Enterprise"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50, background: "rgba(11,17,32,0.85)",
      backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.line}`,
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", display: "flex",
        alignItems: "center", justifyContent: "space-between", height: "64px",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%", background: C.blue,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 0 12px ${C.blueGlow}`,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "18px" }}>Trustie</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map(l => (
            <a key={l} href="#" style={{
              color: C.muted, fontSize: "14px", textDecoration: "none", transition: "color .15s",
            }}>{l}{l === "Enterprise" && <span style={{
              marginLeft: "6px", fontSize: "10px", fontWeight: 700, background: C.blue,
              color: "#fff", padding: "2px 6px", borderRadius: "9999px",
            }}>NEW</span>}</a>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.green }} />
          <a href="#" style={{ color: C.muted, fontSize: "14px", textDecoration: "none" }}>Login</a>
          <a href="#" style={{
            background: C.blue, color: "#fff", padding: "8px 18px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 600, textDecoration: "none",
            boxShadow: `0 0 16px ${C.blueGlow}`,
          }}>Request Demo</a>
        </div>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FEATURED ARTICLE HERO
   ══════════════════════════════════════════════════════════════════ */
function FeaturedArticle() {
  return (
    <div style={{
      maxWidth: "900px", margin: "0 auto", padding: "48px 24px 0",
    }}>
      <div style={{
        background: C.card, border: `1px solid ${C.cardBorder}`,
        borderRadius: "16px", padding: "40px 44px", position: "relative", overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: "-40%", right: "-10%", width: "400px", height: "400px",
          background: `radial-gradient(circle, ${C.blueGlow}, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ color: C.muted, fontSize: "14px" }}>{FEATURED.date}</span>
          </div>

          <h2 style={{
            fontSize: "32px", fontWeight: 700, color: "#fff", lineHeight: 1.25,
            marginBottom: "24px", maxWidth: "600px",
          }}>{FEATURED.title}</h2>

          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(59,130,246,0.1)", border: `1px solid ${C.cardBorder}`,
            color: "#fff", padding: "10px 20px", borderRadius: "8px",
            fontSize: "14px", fontWeight: 500, textDecoration: "none",
            transition: "all .2s",
          }}>
            Read Full Article
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TIMELINE
   ══════════════════════════════════════════════════════════════════ */
function BlogTimeline() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>
      {BLOG_MONTHS.map((group, gi) => (
        <div key={group.month} style={{ marginBottom: "48px" }}>
          {/* Month label */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
            <span style={{
              fontSize: "13px", fontWeight: 700, color: C.muted,
              letterSpacing: "0.08em", whiteSpace: "nowrap", minWidth: "140px",
            }}>{group.month}</span>
          </div>

          {/* Posts */}
          <div style={{ position: "relative", paddingLeft: "52px" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: "19px", top: "4px", bottom: "4px",
              width: "1px", background: C.cardBorder,
            }} />

            {group.posts.map((post, pi) => (
              <a href="#" key={pi} style={{
                display: "flex", alignItems: "flex-start", gap: "16px",
                padding: "18px 0", borderBottom: pi < group.posts.length - 1 ? `1px solid ${C.line}` : "none",
                textDecoration: "none", position: "relative", cursor: "pointer",
              }}>
                {/* Icon dot */}
                <div style={{
                  position: "absolute", left: "-40px", top: "20px",
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: "rgba(59,130,246,0.12)", border: `1px solid ${C.cardBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 2,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                </div>

                <div>
                  <p style={{ color: "#fff", fontSize: "16px", fontWeight: 600, lineHeight: 1.4, marginBottom: "4px" }}>
                    {post.title}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.dimmed} strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span style={{ color: C.dimmed, fontSize: "13px" }}>{post.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BOTTOM CTA
   ══════════════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <div style={{ textAlign: "center", padding: "64px 24px 32px" }}>
      {/* Logo */}
      <div style={{
        width: 64, height: 64, borderRadius: "16px",
        background: "rgba(59,130,246,0.15)", border: `1px solid ${C.cardBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 24px", boxShadow: `0 0 32px ${C.blueGlow}`,
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#fff", marginBottom: "12px", lineHeight: 1.3 }}>
        Ready to Stop Resume Fraud<br />Before It Costs You $150,000?
      </h2>
      <p style={{ color: C.muted, fontSize: "15px", marginBottom: "32px" }}>Start Your Free Trial Today</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
        <a href="#" style={{
          background: C.blue, color: "#fff", padding: "12px 28px", borderRadius: "10px",
          fontSize: "15px", fontWeight: 600, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "8px",
          boxShadow: `0 0 20px ${C.blueGlow}`,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          Request a Demo
        </a>
        <a href="#" style={{
          background: "transparent", color: "#fff", padding: "12px 28px", borderRadius: "10px",
          fontSize: "15px", fontWeight: 600, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: "8px",
          border: `1px solid ${C.cardBorder}`,
        }}>
          Try Free — No Credit Card
        </a>
      </div>

      <div style={{ marginTop: "40px" }}>
        <a href="/" style={{ color: C.dimmed, fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: "48px 24px 32px", marginTop: "32px" }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "40px",
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: C.blue,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4" /><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>Trustie</span>
          </div>
          <p style={{ color: C.dimmed, fontSize: "13px", lineHeight: 1.6, maxWidth: "260px", marginBottom: "16px" }}>
            AI-powered verification for businesses. Stop resume fraud, verify claims, and build trust in every hire.
          </p>
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            {["X", "in", "▶"].map((icon, i) => (
              <a key={i} href="#" style={{
                width: 32, height: 32, borderRadius: "8px", background: "rgba(148,163,184,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.dimmed, fontSize: "12px", textDecoration: "none", fontWeight: 700,
              }}>{icon}</a>
            ))}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green }} />
            <span style={{ color: C.dimmed, fontSize: "12px" }}>All systems online</span>
          </div>
        </div>

        {/* Legal */}
        <div>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", marginBottom: "14px" }}>Legal</p>
          {["Privacy Policy", "Terms of Service", "Refund Policy"].map(l => (
            <a key={l} href="#" style={{ display: "block", color: C.dimmed, fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{l}</a>
          ))}
        </div>

        {/* Pages */}
        <div>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", marginBottom: "14px" }}>Pages</p>
          {["Contact Support", "Create Account", "Login", "Pricing", "FAQ", "Blog", "Help Docs"].map(l => (
            <a key={l} href="#" style={{ display: "block", color: C.dimmed, fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{l}</a>
          ))}
        </div>

        {/* Use Cases */}
        <div>
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "14px", marginBottom: "14px" }}>Use Cases</p>
          {["Resume Verification", "HR Background Checks", "Insurance Claims", "Legal Due Diligence", "Journalism", "Academic Research", "Enterprise API"].map(l => (
            <a key={l} href="#" style={{ display: "block", color: C.dimmed, fontSize: "13px", textDecoration: "none", marginBottom: "10px" }}>{l}</a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "32px auto 0", paddingTop: "20px", borderTop: `1px solid ${C.line}` }}>
        <p style={{ color: C.dimmed, fontSize: "12px" }}>&copy; 2025 Trustie. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN BLOG PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function TrustieBlogPage() {
  return (
    <div style={{
      minHeight: "100vh", color: "#fff", background: C.bg,
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
    }}>
      <Navbar />
      <FeaturedArticle />
      <BlogTimeline />
      <BottomCTA />
      <Footer />
    </div>
  );
}
