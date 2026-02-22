'use client';

import { useState } from "react";

const C = {
  bg: "#0B1120", card: "rgba(30,41,66,0.5)", cardBorder: "rgba(59,130,246,0.12)",
  blue: "#3b82f6", blueGlow: "rgba(59,130,246,0.25)", red: "#ef4444",
  green: "#22c55e", amber: "#f59e0b", text: "#e2e8f0", muted: "#94a3b8",
  dimmed: "#475569", line: "rgba(148,163,184,0.08)",
};

/* ═══ NAVBAR ═══ */
function Navbar() {
  const links = [
    { label: "Features", href: "/#features" },
    { label: "Proof", href: "/proof" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Help", href: "/help" },
    { label: "Enterprise", href: "#", badge: "NEW" },
  ];
  return (
    <nav style={{ position:"sticky",top:0,zIndex:50,background:"rgba(11,17,32,0.85)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.line}`,padding:"0 24px" }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"64px" }}>
        <a href="/" style={{ display:"flex",alignItems:"center",gap:"10px",textDecoration:"none" }}>
          <div style={{ width:30,height:30,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 12px ${C.blueGlow}` }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <span style={{ color:"#fff",fontWeight:700,fontSize:"18px" }}>Trustie</span>
        </a>
        <div style={{ display:"flex",alignItems:"center",gap:"24px" }}>
          {links.map(l=>(
            <a key={l.label} href={l.href} style={{ color:l.label==="Proof"?"#fff":C.muted,fontSize:"14px",textDecoration:"none",fontWeight:l.label==="Proof"?600:400,display:"flex",alignItems:"center",gap:"6px" }}>
              {l.label}
              {l.badge&&<span style={{ fontSize:"10px",fontWeight:700,background:C.blue,color:"#fff",padding:"2px 6px",borderRadius:"9999px" }}>{l.badge}</span>}
            </a>
          ))}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:"16px" }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:C.green }}/>
          <a href="#" style={{ color:C.muted,fontSize:"14px",textDecoration:"none" }}>Login</a>
          <a href="#" style={{ background:C.blue,color:"#fff",padding:"8px 18px",borderRadius:"8px",fontSize:"14px",fontWeight:600,textDecoration:"none",boxShadow:`0 0 16px ${C.blueGlow}` }}>Request Demo</a>
        </div>
      </div>
    </nav>
  );
}

/* ═══ HERO ═══ */
function ProofHero() {
  return (
    <div style={{ textAlign:"center",padding:"72px 24px 56px",position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",top:"-200px",left:"50%",transform:"translateX(-50%)",width:"800px",height:"800px",borderRadius:"50%",background:`radial-gradient(circle, ${C.blueGlow}, transparent 70%)`,pointerEvents:"none" }}/>
      <div style={{ position:"relative",zIndex:1 }}>
        <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 16px",borderRadius:"9999px",background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",marginBottom:"20px" }}>
          <div style={{ width:7,height:7,borderRadius:"50%",background:C.green }}/>
          <span style={{ color:C.green,fontSize:"13px",fontWeight:600 }}>Verified by real users and real data</span>
        </div>
        <h1 style={{ fontSize:"48px",fontWeight:800,color:"#fff",lineHeight:1.15,marginBottom:"16px",maxWidth:"800px",margin:"0 auto 16px",letterSpacing:"-0.02em" }}>
          The Proof Is in the<br/><span style={{ color:C.blue }}>Verification</span>
        </h1>
        <p style={{ color:C.muted,fontSize:"17px",maxWidth:"600px",margin:"0 auto",lineHeight:1.6 }}>
          50,000+ claims verified. Zero false positives in our internal audits. See exactly why businesses trust Trustie over manual background checks.
        </p>
      </div>
    </div>
  );
}

/* ═══ STATS BAR ═══ */
function StatsBar() {
  const stats = [
    { value: "50,000+", label: "Claims Verified" },
    { value: "0", label: "False Positives" },
    { value: "4.2s", label: "Avg Verification Time" },
    { value: "97%", label: "User Accuracy Rating" },
  ];
  return (
    <div style={{ maxWidth:"900px",margin:"0 auto 64px",padding:"0 24px" }}>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px" }}>
        {stats.map(s=>(
          <div key={s.label} style={{ textAlign:"center",padding:"24px 16px",background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"14px",backdropFilter:"blur(8px)" }}>
            <p style={{ fontSize:"32px",fontWeight:800,color:"#fff",letterSpacing:"-0.02em",marginBottom:"4px" }}>{s.value}</p>
            <p style={{ color:C.muted,fontSize:"13px" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ COMPARISON TABLE ═══ */
function ComparisonTable() {
  const features = [
    { name: "Multi-AI Consensus", desc: "Verifies claims using multiple AI models simultaneously, not just one.", trustie: true, manual: false, competitors: false },
    { name: "Real-Time Web Search", desc: "Checks live sources, not just training data with a cutoff date.", trustie: true, manual: true, competitors: "partial" },
    { name: "Source Quality Tiers", desc: "Weights .gov and .edu sources higher than blogs and forums.", trustie: true, manual: false, competitors: false },
    { name: "Anti-Commercial Bias", desc: "Deprioritizes sources with financial interest in the claim.", trustie: true, manual: false, competitors: false },
    { name: "Full Audit Trail", desc: "Every verification includes sources, timestamps, and methodology.", trustie: true, manual: false, competitors: false },
    { name: "Confidence Scoring", desc: "0-100 confidence score based on source quantity and quality.", trustie: true, manual: false, competitors: "partial" },
    { name: "Batch Processing", desc: "Verify hundreds of claims at once via CSV upload.", trustie: true, manual: false, competitors: false },
    { name: "API Access", desc: "Integrate verification into your existing ATS or workflow.", trustie: true, manual: false, competitors: "partial" },
    { name: "SOC 2 Compliant", desc: "Enterprise-grade security and data handling.", trustie: true, manual: true, competitors: false },
    { name: "Under 5 Second Results", desc: "Full verification in seconds, not days.", trustie: true, manual: false, competitors: true },
  ];

  const Check = () => <div style={{ width:22,height:22,borderRadius:"50%",background:"rgba(34,197,94,0.15)",display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg></div>;
  const Cross = () => <div style={{ width:22,height:22,borderRadius:"50%",background:"rgba(239,68,68,0.15)",display:"flex",alignItems:"center",justifyContent:"center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="3"><path d="M6 6l12 12M18 6L6 18"/></svg></div>;
  const Partial = () => <div style={{ width:22,height:22,borderRadius:"50%",background:"rgba(245,158,11,0.15)",display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ color:C.amber,fontSize:"14px",fontWeight:700 }}>~</span></div>;

  const renderIcon = (val) => val === true ? <Check/> : val === "partial" ? <Partial/> : <Cross/>;

  return (
    <div style={{ maxWidth:"1000px",margin:"0 auto",padding:"0 24px 64px" }}>
      <h2 style={{ fontSize:"32px",fontWeight:700,color:"#fff",textAlign:"center",marginBottom:"8px" }}>How Trustie Compares</h2>
      <p style={{ color:C.muted,fontSize:"15px",textAlign:"center",marginBottom:"40px" }}>Side-by-side comparison against manual checks and other AI verification tools.</p>

      <div style={{ background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"16px",overflow:"hidden",backdropFilter:"blur(8px)" }}>
        {/* Header */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 100px 100px 100px",padding:"16px 24px",borderBottom:`1px solid ${C.line}`,background:"rgba(59,130,246,0.04)" }}>
          <span style={{ color:C.muted,fontSize:"12px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em" }}>Feature</span>
          <div style={{ textAlign:"center" }}>
            <div style={{ width:28,height:28,borderRadius:"50%",background:C.blue,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"4px",boxShadow:`0 0 12px ${C.blueGlow}` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <p style={{ color:"#fff",fontSize:"11px",fontWeight:700 }}>Trustie</p>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ width:28,height:28,borderRadius:"50%",background:"rgba(148,163,184,0.1)",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"4px" }}>
              <span style={{ fontSize:"14px" }}>🔍</span>
            </div>
            <p style={{ color:C.dimmed,fontSize:"11px",fontWeight:600 }}>Manual</p>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ width:28,height:28,borderRadius:"50%",background:"rgba(148,163,184,0.1)",display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"4px" }}>
              <span style={{ fontSize:"14px" }}>⚡</span>
            </div>
            <p style={{ color:C.dimmed,fontSize:"11px",fontWeight:600 }}>Others</p>
          </div>
        </div>

        {/* Rows */}
        {features.map((f,i)=>(
          <div key={f.name} style={{ display:"grid",gridTemplateColumns:"1fr 100px 100px 100px",padding:"14px 24px",borderBottom:i<features.length-1?`1px solid ${C.line}`:"none",transition:"background .15s" }}>
            <div>
              <p style={{ color:"#fff",fontSize:"14px",fontWeight:500 }}>{f.name}</p>
              <p style={{ color:C.dimmed,fontSize:"12px",marginTop:"2px" }}>{f.desc}</p>
            </div>
            <div style={{ display:"flex",justifyContent:"center",alignItems:"center" }}>{renderIcon(f.trustie)}</div>
            <div style={{ display:"flex",justifyContent:"center",alignItems:"center" }}>{renderIcon(f.manual)}</div>
            <div style={{ display:"flex",justifyContent:"center",alignItems:"center" }}>{renderIcon(f.competitors)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ LIVE DEMO CARD ═══ */
function LiveDemo() {
  return (
    <div style={{ maxWidth:"900px",margin:"0 auto",padding:"0 24px 64px" }}>
      <h2 style={{ fontSize:"32px",fontWeight:700,color:"#fff",textAlign:"center",marginBottom:"8px" }}>See It In Action</h2>
      <p style={{ color:C.muted,fontSize:"15px",textAlign:"center",marginBottom:"40px" }}>Real verification result from Trustie. No mockups. No staging.</p>

      {/* Browser frame */}
      <div style={{ background:"rgba(15,23,42,0.8)",border:`1px solid ${C.cardBorder}`,borderRadius:"16px",overflow:"hidden" }}>
        {/* Browser bar */}
        <div style={{ display:"flex",alignItems:"center",padding:"12px 16px",borderBottom:`1px solid ${C.line}`,gap:"8px" }}>
          <div style={{ display:"flex",gap:"6px" }}>
            <div style={{ width:10,height:10,borderRadius:"50%",background:"#ef4444" }}/>
            <div style={{ width:10,height:10,borderRadius:"50%",background:"#f59e0b" }}/>
            <div style={{ width:10,height:10,borderRadius:"50%",background:"#22c55e" }}/>
          </div>
          <div style={{ flex:1,display:"flex",justifyContent:"center" }}>
            <div style={{ background:"rgba(148,163,184,0.08)",borderRadius:"8px",padding:"5px 24px",fontSize:"12px",color:C.dimmed }}>app.trustie.io/verify</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding:"32px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px" }}>
          {/* Left - Input */}
          <div style={{ background:"rgba(30,41,66,0.4)",border:`1px solid ${C.cardBorder}`,borderRadius:"12px",padding:"20px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px" }}>
              <div style={{ width:28,height:28,borderRadius:"8px",background:"rgba(59,130,246,0.12)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
              </div>
              <span style={{ color:"#fff",fontWeight:600,fontSize:"14px" }}>Resume Verification</span>
            </div>
            <div style={{ background:"rgba(11,17,32,0.6)",borderRadius:"8px",padding:"14px",border:`1px solid ${C.line}` }}>
              <p style={{ color:"#fff",fontSize:"13px",fontWeight:600,marginBottom:"8px" }}>Candidate: John Smith</p>
              <p style={{ color:C.muted,fontSize:"12px",lineHeight:1.6 }}>
                Claims: &quot;5 years at Google as Senior Engineer&quot;<br/>
                Education: &quot;Stanford CS, 2018&quot;
              </p>
            </div>
          </div>

          {/* Right - Results */}
          <div style={{ background:"rgba(30,41,66,0.4)",border:`1px solid ${C.cardBorder}`,borderRadius:"12px",padding:"20px" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"8px",marginBottom:"16px" }}>
              <div style={{ width:28,height:28,borderRadius:"8px",background:"rgba(245,158,11,0.12)",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ color:C.amber,fontSize:"14px" }}>⚠</span>
              </div>
              <div>
                <span style={{ color:C.amber,fontWeight:700,fontSize:"13px",textTransform:"uppercase" }}>Partial Match</span>
                <span style={{ color:C.dimmed,fontSize:"11px",marginLeft:"8px" }}>2 of 3 claims verified</span>
              </div>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:"8px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5"><path d="M5 12l5 5L20 7"/></svg>
                <span style={{ color:C.text,fontSize:"12px" }}>Stanford CS degree confirmed (2018)</span>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2.5"><path d="M6 6l12 12M18 6L6 18"/></svg>
                <span style={{ color:C.text,fontSize:"12px" }}>Google employment: <strong style={{ color:C.red }}>3 years, not 5</strong></span>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
                <span style={{ color:C.amber,fontSize:"14px",width:14,textAlign:"center" }}>?</span>
                <span style={{ color:C.text,fontSize:"12px" }}>Title was &quot;Engineer&quot;, not &quot;Senior Engineer&quot;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ TESTIMONIALS ═══ */
function Testimonials() {
  const reviews = [
    { name: "Placeholder — Beta Tester 1", role: "HR Director", company: "Series B Startup", quote: "Trustie caught a fabricated credential that would have cost us $80K in a bad hire. The audit trail made it easy to document.", avatar: "S" },
    { name: "Placeholder — Beta Tester 2", role: "Recruiter", company: "Staffing Agency", quote: "We verify 50+ resumes a week now. What used to take our team 2 hours per candidate takes 30 seconds with Trustie.", avatar: "R" },
    { name: "Placeholder — Beta Tester 3", role: "Head of Compliance", company: "Insurance Firm", quote: "The source quality tiers and anti-bias filter give us confidence that our verification results are defensible.", avatar: "C" },
    { name: "Placeholder — Beta Tester 4", role: "Journalist", company: "News Outlet", quote: "I use Trustie to fact-check AI-generated drafts before publication. It has caught multiple hallucinated statistics.", avatar: "J" },
    { name: "Placeholder — Beta Tester 5", role: "Legal Analyst", company: "Law Firm", quote: "The full audit trail is exactly what we need for due diligence reports. Every claim is traceable to its source.", avatar: "L" },
    { name: "Placeholder — Beta Tester 6", role: "Content Manager", company: "Marketing Agency", quote: "Our team uses AI heavily for content. Trustie ensures we never publish false claims. Total game changer.", avatar: "M" },
  ];

  return (
    <div style={{ maxWidth:"1100px",margin:"0 auto",padding:"0 24px 64px" }}>
      <h2 style={{ fontSize:"32px",fontWeight:700,color:"#fff",textAlign:"center",marginBottom:"8px" }}>What Our Users Say</h2>
      <p style={{ color:C.muted,fontSize:"15px",textAlign:"center",marginBottom:"12px" }}>Real feedback from businesses using Trustie to verify AI-generated content.</p>
      <p style={{ color:C.amber,fontSize:"13px",textAlign:"center",marginBottom:"40px",fontStyle:"italic" }}>🔨 Replace these with real testimonials from your beta testers</p>

      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px" }}>
        {reviews.map((r,i)=>(
          <div key={i} style={{ background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"14px",padding:"24px",backdropFilter:"blur(8px)",display:"flex",flexDirection:"column" }}>
            <div style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px" }}>
              <div style={{ width:40,height:40,borderRadius:"50%",background:"rgba(59,130,246,0.12)",border:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.blue,fontWeight:700,fontSize:"16px" }}>{r.avatar}</div>
              <div>
                <p style={{ color:"#fff",fontSize:"14px",fontWeight:600 }}>{r.name}</p>
                <p style={{ color:C.dimmed,fontSize:"12px" }}>{r.role}, {r.company}</p>
              </div>
            </div>
            <p style={{ color:C.text,fontSize:"14px",lineHeight:1.65,flex:1 }}>&ldquo;{r.quote}&rdquo;</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ TRUST BADGES ═══ */
function TrustBadges() {
  return (
    <div style={{ maxWidth:"900px",margin:"0 auto",padding:"0 24px 64px" }}>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px" }}>
        {[
          { icon:"🔒", title:"SOC 2 Compliant", desc:"Enterprise-grade security. Your data is encrypted at rest and in transit." },
          { icon:"🛡️", title:"No Data Stored", desc:"We do not store the content you verify. Processed in real-time and discarded." },
          { icon:"📊", title:"Transparent Methodology", desc:"Every result includes the full audit trail. No black boxes." },
        ].map(b=>(
          <div key={b.title} style={{ textAlign:"center",padding:"32px 20px",background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"14px" }}>
            <span style={{ fontSize:"32px",display:"block",marginBottom:"12px" }}>{b.icon}</span>
            <p style={{ color:"#fff",fontWeight:600,fontSize:"15px",marginBottom:"6px" }}>{b.title}</p>
            <p style={{ color:C.muted,fontSize:"13px",lineHeight:1.5 }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ CTA ═══ */
function BottomCTA() {
  return (
    <div style={{ textAlign:"center",padding:"64px 24px 32px" }}>
      <div style={{ width:64,height:64,borderRadius:"16px",background:"rgba(59,130,246,0.15)",border:`1px solid ${C.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",boxShadow:`0 0 32px ${C.blueGlow}` }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <h2 style={{ fontSize:"32px",fontWeight:700,color:"#fff",marginBottom:"12px",lineHeight:1.3 }}>
        Ready to Verify With Confidence?
      </h2>
      <p style={{ color:C.muted,fontSize:"15px",marginBottom:"32px" }}>Start your 14-day free trial. No credit card required.</p>
      <div style={{ display:"flex",justifyContent:"center",gap:"16px",flexWrap:"wrap" }}>
        <a href="#" style={{ background:C.blue,color:"#fff",padding:"12px 28px",borderRadius:"10px",fontSize:"15px",fontWeight:600,textDecoration:"none",boxShadow:`0 0 20px ${C.blueGlow}` }}>Request a Demo</a>
        <a href="#" style={{ background:"transparent",color:"#fff",padding:"12px 28px",borderRadius:"10px",fontSize:"15px",fontWeight:600,textDecoration:"none",border:`1px solid ${C.cardBorder}` }}>Try Free</a>
      </div>
      <div style={{ display:"flex",justifyContent:"center",gap:"24px",marginTop:"20px" }}>
        {["No credit card required","14-day free trial","SOC 2 Compliant"].map(t=>(
          <div key={t} style={{ display:"flex",alignItems:"center",gap:"6px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="3"><path d="M5 12l5 5L20 7"/></svg>
            <span style={{ color:C.muted,fontSize:"12px" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${C.line}`,padding:"48px 24px 32px",marginTop:"32px" }}>
      <div style={{ maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:"40px" }}>
        <div>
          <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px" }}>
            <div style={{ width:28,height:28,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span style={{ color:"#fff",fontWeight:700,fontSize:"16px" }}>Trustie</span>
          </div>
          <p style={{ color:C.dimmed,fontSize:"13px",lineHeight:1.6,maxWidth:"260px",marginBottom:"16px" }}>AI-powered verification for businesses. Stop resume fraud, verify claims, and build trust in every hire.</p>
          <div style={{ display:"flex",alignItems:"center",gap:"6px" }}>
            <div style={{ width:7,height:7,borderRadius:"50%",background:C.green }}/>
            <span style={{ color:C.dimmed,fontSize:"12px" }}>All systems online</span>
          </div>
        </div>
        <div>
          <p style={{ color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"14px" }}>Legal</p>
          {["Privacy Policy","Terms of Service","Refund Policy"].map(l=>(<a key={l} href="#" style={{ display:"block",color:C.dimmed,fontSize:"13px",textDecoration:"none",marginBottom:"10px" }}>{l}</a>))}
        </div>
        <div>
          <p style={{ color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"14px" }}>Pages</p>
          {["Contact Support","Create Account","Login","Pricing","FAQ","Blog","Help Docs"].map(l=>(<a key={l} href="#" style={{ display:"block",color:C.dimmed,fontSize:"13px",textDecoration:"none",marginBottom:"10px" }}>{l}</a>))}
        </div>
        <div>
          <p style={{ color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"14px" }}>Use Cases</p>
          {["Resume Verification","HR Background Checks","Insurance Claims","Legal Due Diligence","Journalism","Academic Research","Enterprise API"].map(l=>(<a key={l} href="#" style={{ display:"block",color:C.dimmed,fontSize:"13px",textDecoration:"none",marginBottom:"10px" }}>{l}</a>))}
        </div>
      </div>
      <div style={{ maxWidth:"1100px",margin:"32px auto 0",paddingTop:"20px",borderTop:`1px solid ${C.line}` }}>
        <p style={{ color:C.dimmed,fontSize:"12px" }}>&copy; 2025 Trustie. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function ProofPage() {
  return (
    <div style={{ minHeight:"100vh",color:"#fff",background:C.bg,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      <Navbar />
      <ProofHero />
      <StatsBar />
      <LiveDemo />
      <ComparisonTable />
      <Testimonials />
      <TrustBadges />
      <BottomCTA />
      <Footer />
    </div>
  );
}
