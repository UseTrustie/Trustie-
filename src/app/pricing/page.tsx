'use client';
// @ts-nocheck

import { useState } from "react";

const C = {
  bg: "#0B1120", card: "rgba(30,41,66,0.5)", cardBorder: "rgba(59,130,246,0.12)",
  blue: "#3b82f6", blueGlow: "rgba(59,130,246,0.25)", red: "#ef4444",
  green: "#22c55e", amber: "#f59e0b", text: "#e2e8f0", muted: "#94a3b8",
  dimmed: "#475569", line: "rgba(148,163,184,0.08)",
};

function Navbar() {
  const links = [
    { label: "Proof", href: "/proof" },
    { label: "Pricing", href: "/pricing" },
    { label: "Help", href: "/help" },
    { label: "Blog", href: "/blog" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Verification Database", href: "/database", badge: "NEW" },
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
            <a key={l.label} href={l.href} style={{ color:l.label==="Pricing"?"#fff":C.muted,fontSize:"14px",textDecoration:"none",fontWeight:l.label==="Pricing"?600:400,display:"flex",alignItems:"center",gap:"6px" }}>
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

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      desc: "For individuals exploring AI verification.",
      price: 0,
      priceAnnual: 0,
      cta: "Get Started Free",
      ctaStyle: { background:"transparent",color:"#fff",border:`1px solid ${C.cardBorder}` },
      features: [
        "5 verifications per day",
        "Basic claim extraction",
        "Tier 1 & 2 source checking",
        "Standard confidence scores",
        "Community support",
      ],
      limits: [
        "No batch processing",
        "No API access",
        "No export/audit trail",
      ],
    },
    {
      name: "Pro",
      desc: "For recruiters and freelancers who verify daily.",
      price: 29,
      priceAnnual: 24,
      popular: true,
      cta: "Start 14-Day Free Trial",
      ctaStyle: { background:C.blue,color:"#fff",boxShadow:`0 0 20px ${C.blueGlow}` },
      features: [
        "Unlimited verifications",
        "Advanced claim extraction",
        "All source tiers + anti-bias filter",
        "Detailed confidence breakdowns",
        "Full audit trail & export (PDF/CSV)",
        "Priority source checking",
        "Email support (24h response)",
      ],
      limits: [],
    },
    {
      name: "Team",
      desc: "For HR departments and agencies verifying at scale.",
      price: 99,
      priceAnnual: 79,
      cta: "Start 14-Day Free Trial",
      ctaStyle: { background:"transparent",color:"#fff",border:`1px solid ${C.cardBorder}` },
      features: [
        "Everything in Pro",
        "Up to 10 team members",
        "Batch CSV upload (500 claims)",
        "Team dashboard & analytics",
        "REST API access (10K calls/mo)",
        "Shared verification history",
        "Slack & webhook integrations",
        "Priority support (4h response)",
      ],
      limits: [],
    },
    {
      name: "Enterprise",
      desc: "For organizations with custom security and scale needs.",
      price: null,
      priceAnnual: null,
      cta: "Contact Sales",
      ctaStyle: { background:"transparent",color:"#fff",border:`1px solid ${C.cardBorder}` },
      features: [
        "Everything in Team",
        "Unlimited team members",
        "Unlimited API calls",
        "SSO / SAML authentication",
        "Custom integrations (ATS, CRM)",
        "SOC 2 compliance report",
        "Dedicated account manager",
        "SLA with 99.9% uptime",
        "On-premise deployment option",
        "Custom AI model training",
      ],
      limits: [],
    },
  ];

  const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" style={{ flexShrink:0 }}><path d="M5 12l5 5L20 7"/></svg>;
  const Cross = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dimmed} strokeWidth="2" style={{ flexShrink:0 }}><path d="M6 6l12 12M18 6L6 18"/></svg>;

  return (
    <div style={{ minHeight:"100vh",color:"#fff",background:C.bg,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ textAlign:"center",padding:"64px 24px 40px",position:"relative" }}>
        <div style={{ position:"absolute",top:"-200px",left:"50%",transform:"translateX(-50%)",width:"800px",height:"800px",borderRadius:"50%",background:`radial-gradient(circle, ${C.blueGlow}, transparent 70%)`,pointerEvents:"none" }}/>
        <div style={{ position:"relative",zIndex:1 }}>
          <h1 style={{ fontSize:"44px",fontWeight:800,color:"#fff",lineHeight:1.15,marginBottom:"12px",letterSpacing:"-0.02em" }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ color:C.muted,fontSize:"17px",maxWidth:"500px",margin:"0 auto 28px" }}>
            Start free. Upgrade when you need more. No hidden fees.
          </p>

          {/* Toggle */}
          <div style={{ display:"inline-flex",alignItems:"center",gap:"12px",background:"rgba(30,41,66,0.5)",border:`1px solid ${C.cardBorder}`,borderRadius:"12px",padding:"4px" }}>
            <button onClick={()=>setAnnual(false)} style={{ padding:"8px 20px",borderRadius:"10px",fontSize:"14px",fontWeight:600,border:"none",cursor:"pointer",background:!annual?"rgba(59,130,246,0.2)":"transparent",color:!annual?"#fff":C.muted }}>Monthly</button>
            <button onClick={()=>setAnnual(true)} style={{ padding:"8px 20px",borderRadius:"10px",fontSize:"14px",fontWeight:600,border:"none",cursor:"pointer",background:annual?"rgba(59,130,246,0.2)":"transparent",color:annual?"#fff":C.muted,display:"flex",alignItems:"center",gap:"8px" }}>
              Annual
              <span style={{ fontSize:"11px",fontWeight:700,background:"rgba(34,197,94,0.15)",color:C.green,padding:"2px 8px",borderRadius:"9999px" }}>Save 20%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth:"1200px",margin:"0 auto",padding:"0 24px 64px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",alignItems:"start" }}>
        {plans.map((p,i)=>(
          <div key={p.name} style={{ background:p.popular?"rgba(59,130,246,0.06)":C.card,border:`1px solid ${p.popular?"rgba(59,130,246,0.3)":C.cardBorder}`,borderRadius:"16px",padding:"28px 24px",position:"relative",backdropFilter:"blur(8px)",boxShadow:p.popular?`0 0 40px rgba(59,130,246,0.12)`:"none" }}>
            {p.popular&&<div style={{ position:"absolute",top:"-12px",left:"50%",transform:"translateX(-50%)",background:C.blue,color:"#fff",fontSize:"11px",fontWeight:700,padding:"4px 14px",borderRadius:"9999px",boxShadow:`0 0 12px ${C.blueGlow}` }}>MOST POPULAR</div>}

            <p style={{ color:"#fff",fontSize:"20px",fontWeight:700,marginBottom:"4px" }}>{p.name}</p>
            <p style={{ color:C.dimmed,fontSize:"13px",marginBottom:"20px",minHeight:"36px" }}>{p.desc}</p>

            {p.price!==null ? (
              <div style={{ marginBottom:"20px" }}>
                <span style={{ fontSize:"40px",fontWeight:800,color:"#fff",letterSpacing:"-0.02em" }}>${annual?p.priceAnnual:p.price}</span>
                <span style={{ color:C.muted,fontSize:"14px" }}>/mo</span>
                {annual&&p.price>0&&<p style={{ color:C.green,fontSize:"12px",marginTop:"2px" }}>Billed annually (${(annual?p.priceAnnual:p.price)*12}/yr)</p>}
              </div>
            ) : (
              <div style={{ marginBottom:"20px" }}>
                <span style={{ fontSize:"32px",fontWeight:800,color:"#fff" }}>Custom</span>
                <p style={{ color:C.muted,fontSize:"13px",marginTop:"4px" }}>Tailored to your needs</p>
              </div>
            )}

            <a href="#" style={{ display:"block",textAlign:"center",padding:"12px",borderRadius:"10px",fontSize:"14px",fontWeight:600,textDecoration:"none",marginBottom:"24px",...p.ctaStyle }}>{p.cta}</a>

            <div style={{ display:"flex",flexDirection:"column",gap:"10px" }}>
              {p.features.map(f=>(
                <div key={f} style={{ display:"flex",alignItems:"flex-start",gap:"10px" }}>
                  <Check/>
                  <span style={{ color:C.text,fontSize:"13px",lineHeight:1.4 }}>{f}</span>
                </div>
              ))}
              {p.limits.map(f=>(
                <div key={f} style={{ display:"flex",alignItems:"flex-start",gap:"10px" }}>
                  <Cross/>
                  <span style={{ color:C.dimmed,fontSize:"13px",lineHeight:1.4 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div style={{ maxWidth:"700px",margin:"0 auto",padding:"0 24px 64px" }}>
        <h2 style={{ fontSize:"28px",fontWeight:700,color:"#fff",textAlign:"center",marginBottom:"32px" }}>Frequently Asked Questions</h2>
        {[
          { q:"Is there really a free plan?", a:"Yes. 5 verifications per day, forever. No credit card required. We want you to see the value before you pay." },
          { q:"Can I cancel anytime?", a:"Absolutely. No contracts, no cancellation fees. Cancel from your dashboard in one click." },
          { q:"What counts as one verification?", a:"One verification = one piece of text submitted. It can contain multiple claims — we extract and verify each claim individually at no extra cost." },
          { q:"Do you offer discounts for startups or nonprofits?", a:"Yes. Email us at support@trustieapp.com with details about your organization and we will work something out." },
          { q:"What payment methods do you accept?", a:"All major credit cards (Visa, Mastercard, Amex) via Stripe. Enterprise customers can pay via invoice." },
          { q:"Is my data secure?", a:"Yes. We are SOC 2 compliant. We do not store the content you verify — it is processed in real-time and discarded. See our Security page for details." },
        ].map((faq,i)=>(
          <details key={i} style={{ marginBottom:"8px",background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"12px",overflow:"hidden" }}>
            <summary style={{ padding:"16px 20px",color:"#fff",fontSize:"15px",fontWeight:600,cursor:"pointer",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              {faq.q}
              <span style={{ color:C.dimmed,fontSize:"18px" }}>+</span>
            </summary>
            <div style={{ padding:"0 20px 16px" }}>
              <p style={{ color:C.muted,fontSize:"14px",lineHeight:1.6 }}>{faq.a}</p>
            </div>
          </details>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign:"center",padding:"48px 24px 32px",borderTop:`1px solid ${C.line}` }}>
        <h2 style={{ fontSize:"28px",fontWeight:700,color:"#fff",marginBottom:"12px" }}>Still not sure? Start free.</h2>
        <p style={{ color:C.muted,fontSize:"15px",marginBottom:"24px" }}>5 verifications per day. No credit card. No commitment.</p>
        <a href="#" style={{ background:C.blue,color:"#fff",padding:"12px 32px",borderRadius:"10px",fontSize:"15px",fontWeight:600,textDecoration:"none",boxShadow:`0 0 20px ${C.blueGlow}` }}>Get Started Free</a>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.line}`,padding:"48px 24px 32px",marginTop:"32px" }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr",gap:"40px" }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px" }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <span style={{ color:"#fff",fontWeight:700,fontSize:"16px" }}>Trustie</span>
            </div>
            <p style={{ color:C.dimmed,fontSize:"13px",lineHeight:1.6,maxWidth:"260px" }}>AI-powered verification for businesses. Stop resume fraud, verify claims, and build trust in every hire.</p>
          </div>
          <div>
            <p style={{ color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"14px" }}>Legal</p>
            {["Privacy Policy","Terms of Service","Refund Policy"].map(l=>(<a key={l} href="#" style={{ display:"block",color:C.dimmed,fontSize:"13px",textDecoration:"none",marginBottom:"10px" }}>{l}</a>))}
          </div>
          <div>
            <p style={{ color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"14px" }}>Pages</p>
            {["Proof","Pricing","Help","Blog","How it works","Database"].map(l=>(<a key={l} href="#" style={{ display:"block",color:C.dimmed,fontSize:"13px",textDecoration:"none",marginBottom:"10px" }}>{l}</a>))}
          </div>
          <div>
            <p style={{ color:"#fff",fontWeight:600,fontSize:"14px",marginBottom:"14px" }}>Use Cases</p>
            {["Resume Verification","HR Background Checks","Insurance Claims","Legal Due Diligence","Journalism","Academic Research","Enterprise API"].map(l=>(<a key={l} href="#" style={{ display:"block",color:C.dimmed,fontSize:"13px",textDecoration:"none",marginBottom:"10px" }}>{l}</a>))}
          </div>
        </div>
      </footer>
    </div>
  );
}
