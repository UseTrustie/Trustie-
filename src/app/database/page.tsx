'use client';
// @ts-nocheck

import { useState, useMemo } from "react";

const C = {
  bg: "#0B1120", card: "rgba(30,41,66,0.5)", cardBorder: "rgba(59,130,246,0.12)",
  blue: "#3b82f6", blueGlow: "rgba(59,130,246,0.25)", red: "#ef4444",
  green: "#22c55e", amber: "#f59e0b", text: "#e2e8f0", muted: "#94a3b8",
  dimmed: "#475569", line: "rgba(148,163,184,0.08)",
};

const CATEGORIES = ["All", "Resume Claims", "Health & Medical", "Business & Finance", "Technology", "Science", "History", "Legal", "Education"];

const CLAIMS = [
  // RESUME CLAIMS
  { claim: "The average software engineer at Google earns $300,000/year", verdict: "partial", confidence: 72, category: "Resume Claims", detail: "Base salary averages $180K. Total compensation (including stock) can exceed $300K for senior roles, but not entry-level.", sources: 4 },
  { claim: "Harvard Business School has a 95% job placement rate", verdict: "verified", confidence: 94, category: "Resume Claims", detail: "HBS reports 94-96% employment within 3 months of graduation consistently.", sources: 3 },
  { claim: "70% of resumes contain inaccuracies or lies", verdict: "verified", confidence: 91, category: "Resume Claims", detail: "Multiple studies including HireRight's 2023 Employment Screening Benchmark confirm this range.", sources: 5 },
  { claim: "PMP certification increases salary by 25%", verdict: "verified", confidence: 88, category: "Resume Claims", detail: "PMI salary survey data shows PMP holders earn 20-25% more on average.", sources: 3 },
  { claim: "A bad hire costs 30% of the employee's annual salary", verdict: "partial", confidence: 68, category: "Resume Claims", detail: "DOL estimates 30% of first-year salary. Other sources cite $50K-$150K+ depending on role seniority.", sources: 4 },
  { claim: "Remote workers are 13% more productive than office workers", verdict: "partial", confidence: 62, category: "Resume Claims", detail: "Commonly cited Stanford study by Nicholas Bloom showed 13% improvement, but subsequent studies show mixed results.", sources: 6 },
  { claim: "The tech industry has a 13.2% turnover rate", verdict: "verified", confidence: 85, category: "Resume Claims", detail: "LinkedIn and BLS data consistently place tech turnover between 12-15%.", sources: 4 },
  { claim: "CPA certification requires 150 credit hours in all US states", verdict: "false", confidence: 89, category: "Resume Claims", detail: "Most states require 150 hours, but requirements vary. Some states still allow 120 hours with experience.", sources: 3 },

  // HEALTH
  { claim: "Drinking 8 glasses of water a day is medically necessary", verdict: "false", confidence: 87, category: "Health & Medical", detail: "No scientific study supports exactly 8 glasses. Water needs vary by individual, activity, and climate.", sources: 5 },
  { claim: "Vaccines cause autism", verdict: "false", confidence: 99, category: "Health & Medical", detail: "Thoroughly debunked. Original 1998 Lancet paper was retracted. Dozens of large-scale studies found no link.", sources: 8 },
  { claim: "COVID-19 vaccines reduce hospitalization by over 90%", verdict: "verified", confidence: 93, category: "Health & Medical", detail: "CDC and WHO data from clinical trials and real-world studies confirm >90% reduction for initial variants.", sources: 6 },
  { claim: "Cracking your knuckles causes arthritis", verdict: "false", confidence: 91, category: "Health & Medical", detail: "Multiple studies including a 60-year self-experiment by Dr. Donald Unger found no link.", sources: 4 },
  { claim: "Intermittent fasting extends lifespan in humans", verdict: "unconfirmed", confidence: 45, category: "Health & Medical", detail: "Animal studies show promise. Human long-term studies are insufficient. Short-term metabolic benefits documented.", sources: 5 },
  { claim: "Sitting is the new smoking", verdict: "partial", confidence: 58, category: "Health & Medical", detail: "Prolonged sitting increases health risks, but equating it to smoking overstates the danger significantly.", sources: 4 },

  // BUSINESS
  { claim: "90% of startups fail", verdict: "partial", confidence: 72, category: "Business & Finance", detail: "Often cited but misleading. Bureau of Labor Statistics shows about 50% fail within 5 years, not 90%.", sources: 5 },
  { claim: "Amazon started in a garage", verdict: "verified", confidence: 96, category: "Business & Finance", detail: "Jeff Bezos started Amazon in the garage of his rented home in Bellevue, WA in 1994.", sources: 4 },
  { claim: "The S&P 500 averages 10% annual returns", verdict: "verified", confidence: 90, category: "Business & Finance", detail: "Historical average is approximately 10% nominal, or 7% adjusted for inflation.", sources: 5 },
  { claim: "Blockbuster turned down buying Netflix for $50 million", verdict: "verified", confidence: 95, category: "Business & Finance", detail: "Confirmed by multiple sources including Netflix co-founder Marc Randolph's memoir.", sources: 4 },
  { claim: "ChatGPT reached 100 million users in 2 months", verdict: "verified", confidence: 94, category: "Business & Finance", detail: "UBS research and OpenAI confirmed this milestone in January 2023.", sources: 5 },
  { claim: "AI will replace 80% of jobs by 2030", verdict: "false", confidence: 82, category: "Business & Finance", detail: "No credible study supports 80%. McKinsey estimates 30% of work hours could be automated, not 80% of jobs.", sources: 6 },

  // TECHNOLOGY
  { claim: "Moore's Law states computing power doubles every 18 months", verdict: "partial", confidence: 78, category: "Technology", detail: "Original 1965 paper said transistor count doubles every year, later revised to every 2 years. The 18-month version is a common misquote.", sources: 4 },
  { claim: "The first iPhone was released in 2007", verdict: "verified", confidence: 99, category: "Technology", detail: "The original iPhone was announced January 9, 2007 and released June 29, 2007.", sources: 3 },
  { claim: "5G radiation causes health problems", verdict: "false", confidence: 95, category: "Technology", detail: "WHO, FCC, and peer-reviewed studies confirm 5G operates within safe non-ionizing radiation limits.", sources: 7 },
  { claim: "GPT-4 can pass the bar exam in the 90th percentile", verdict: "verified", confidence: 92, category: "Technology", detail: "OpenAI's technical report confirmed GPT-4 scored in the 90th percentile on the Uniform Bar Exam.", sources: 4 },
  { claim: "Python is the most popular programming language in 2025", verdict: "verified", confidence: 88, category: "Technology", detail: "TIOBE Index, Stack Overflow Survey, and GitHub Octoverse all rank Python #1 or #2.", sources: 5 },
  { claim: "Quantum computers can break all encryption today", verdict: "false", confidence: 90, category: "Technology", detail: "Current quantum computers cannot. Theoretical future quantum computers could break RSA/ECC, but not all encryption types.", sources: 5 },

  // SCIENCE
  { claim: "The Great Wall of China is visible from space", verdict: "false", confidence: 96, category: "Science", detail: "Multiple astronauts including Yang Liwei have confirmed it is not visible to the naked eye from orbit.", sources: 5 },
  { claim: "Lightning never strikes the same place twice", verdict: "false", confidence: 98, category: "Science", detail: "The Empire State Building alone gets struck approximately 25 times per year.", sources: 3 },
  { claim: "Humans only use 10% of their brain", verdict: "false", confidence: 97, category: "Science", detail: "Brain imaging shows all regions have function. No area is consistently inactive.", sources: 5 },
  { claim: "The Earth is approximately 4.5 billion years old", verdict: "verified", confidence: 98, category: "Science", detail: "Radiometric dating of meteorites and Earth's oldest minerals consistently confirm 4.54 ± 0.05 billion years.", sources: 6 },

  // HISTORY
  { claim: "Napoleon Bonaparte was unusually short", verdict: "false", confidence: 93, category: "History", detail: "Napoleon was approximately 5'7\" — average or above average for his era. Confusion arose from French vs English measurement units.", sources: 4 },
  { claim: "Vikings wore horned helmets", verdict: "false", confidence: 94, category: "History", detail: "No archaeological evidence supports horned helmets. The myth originated from 19th-century Romantic artists.", sources: 4 },
  { claim: "The Titanic was declared unsinkable by its makers", verdict: "partial", confidence: 70, category: "History", detail: "White Star Line promotional materials called it 'practically unsinkable.' The absolute claim was a media exaggeration.", sources: 5 },

  // LEGAL
  { claim: "You have to wait 24 hours before filing a missing person report", verdict: "false", confidence: 95, category: "Legal", detail: "No US law enforcement agency requires a waiting period. Reports can be filed immediately.", sources: 4 },
  { claim: "An undercover police officer must tell you they're a cop if you ask", verdict: "false", confidence: 97, category: "Legal", detail: "This is a popular myth with no legal basis. Undercover officers are not required to identify themselves.", sources: 4 },

  // EDUCATION
  { claim: "Student loan debt in the US exceeds $1.7 trillion", verdict: "verified", confidence: 93, category: "Education", detail: "Federal Reserve data consistently reports total student loan debt above $1.7 trillion as of 2024-2025.", sources: 4 },
  { claim: "A college degree increases lifetime earnings by $1 million", verdict: "partial", confidence: 70, category: "Education", detail: "Often cited but varies hugely by field. STEM degrees show strong ROI; some degrees have negative ROI when accounting for debt.", sources: 5 },
];

function VerdictBadge({ verdict }) {
  const config = {
    verified: { bg: "rgba(34,197,94,0.12)", color: C.green, border: "rgba(34,197,94,0.25)", label: "Verified ✓" },
    false: { bg: "rgba(239,68,68,0.12)", color: C.red, border: "rgba(239,68,68,0.25)", label: "False ✗" },
    partial: { bg: "rgba(245,158,11,0.12)", color: C.amber, border: "rgba(245,158,11,0.25)", label: "Partial ~" },
    unconfirmed: { bg: "rgba(148,163,184,0.12)", color: C.muted, border: "rgba(148,163,184,0.25)", label: "Unconfirmed ?" },
  };
  const c = config[verdict] || config.unconfirmed;
  return <span style={{ display:"inline-block",padding:"3px 10px",borderRadius:"6px",fontSize:"11px",fontWeight:700,background:c.bg,color:c.color,border:`1px solid ${c.border}` }}>{c.label}</span>;
}

function ConfidenceBar({ score }) {
  const color = score >= 85 ? C.green : score >= 60 ? C.amber : C.red;
  return (
    <div style={{ display:"flex",alignItems:"center",gap:"8px" }}>
      <div style={{ flex:1,height:"6px",borderRadius:"3px",background:"rgba(148,163,184,0.1)" }}>
        <div style={{ width:`${score}%`,height:"100%",borderRadius:"3px",background:color,transition:"width .3s" }}/>
      </div>
      <span style={{ color,fontSize:"12px",fontWeight:700,minWidth:"32px" }}>{score}%</span>
    </div>
  );
}

export default function DatabasePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [verdictFilter, setVerdictFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return CLAIMS.filter(c => {
      const matchSearch = !search || c.claim.toLowerCase().includes(search.toLowerCase()) || c.detail.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || c.category === category;
      const matchVerdict = verdictFilter === "all" || c.verdict === verdictFilter;
      return matchSearch && matchCat && matchVerdict;
    });
  }, [search, category, verdictFilter]);

  const counts = { verified: CLAIMS.filter(c=>c.verdict==="verified").length, false: CLAIMS.filter(c=>c.verdict==="false").length, partial: CLAIMS.filter(c=>c.verdict==="partial").length };

  return (
    <div style={{ minHeight:"100vh",color:"#fff",background:C.bg,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      {/* Navbar */}
      <nav style={{ position:"sticky",top:0,zIndex:50,background:"rgba(11,17,32,0.85)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.line}`,padding:"0 24px" }}>
        <div style={{ maxWidth:"1200px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"64px" }}>
          <a href="/" style={{ display:"flex",alignItems:"center",gap:"10px",textDecoration:"none" }}>
            <div style={{ width:30,height:30,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 12px ${C.blueGlow}` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span style={{ color:"#fff",fontWeight:700,fontSize:"18px" }}>Trustie</span>
          </a>
          <div style={{ display:"flex",alignItems:"center",gap:"24px" }}>
            {[{l:"Proof",h:"/proof"},{l:"Pricing",h:"/pricing"},{l:"Help",h:"/help"},{l:"Blog",h:"/blog"},{l:"How it works",h:"/how-it-works"},{l:"Verification Database",h:"/database",badge:true}].map(n=>(
              <a key={n.l} href={n.h} style={{ color:n.l==="Verification Database"?"#fff":C.muted,fontSize:"14px",textDecoration:"none",fontWeight:n.l==="Verification Database"?600:400,display:"flex",alignItems:"center",gap:"6px" }}>
                {n.l}{n.badge&&<span style={{ fontSize:"10px",fontWeight:700,background:C.blue,color:"#fff",padding:"2px 6px",borderRadius:"9999px" }}>NEW</span>}
              </a>
            ))}
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:"16px" }}>
            <a href="#" style={{ color:C.muted,fontSize:"14px",textDecoration:"none" }}>Login</a>
            <a href="#" style={{ background:C.blue,color:"#fff",padding:"8px 18px",borderRadius:"8px",fontSize:"14px",fontWeight:600,textDecoration:"none",boxShadow:`0 0 16px ${C.blueGlow}` }}>Request Demo</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign:"center",padding:"56px 24px 40px",position:"relative" }}>
        <div style={{ position:"absolute",top:"-200px",left:"50%",transform:"translateX(-50%)",width:"800px",height:"800px",borderRadius:"50%",background:`radial-gradient(circle, ${C.blueGlow}, transparent 70%)`,pointerEvents:"none" }}/>
        <div style={{ position:"relative",zIndex:1 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:"8px",padding:"5px 14px",borderRadius:"9999px",border:`1px solid rgba(59,130,246,0.25)`,background:"rgba(59,130,246,0.08)",marginBottom:"16px" }}>
            <span style={{ color:C.blue,fontSize:"12px",fontWeight:600 }}>🔍 {CLAIMS.length} claims verified and counting</span>
          </div>
          <h1 style={{ fontSize:"42px",fontWeight:800,color:"#fff",lineHeight:1.15,marginBottom:"12px",letterSpacing:"-0.02em" }}>
            Verification Database
          </h1>
          <p style={{ color:C.muted,fontSize:"16px",maxWidth:"550px",margin:"0 auto" }}>
            The most commonly cited AI claims — fact-checked against real sources. Search, filter, and learn what AI gets right and wrong.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth:"600px",margin:"0 auto 32px",padding:"0 24px",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px" }}>
        <div style={{ textAlign:"center",padding:"16px",background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"12px" }}>
          <p style={{ fontSize:"24px",fontWeight:800,color:C.green }}>{counts.verified}</p>
          <p style={{ color:C.muted,fontSize:"12px" }}>Verified True</p>
        </div>
        <div style={{ textAlign:"center",padding:"16px",background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"12px" }}>
          <p style={{ fontSize:"24px",fontWeight:800,color:C.red }}>{counts.false}</p>
          <p style={{ color:C.muted,fontSize:"12px" }}>Proven False</p>
        </div>
        <div style={{ textAlign:"center",padding:"16px",background:C.card,border:`1px solid ${C.cardBorder}`,borderRadius:"12px" }}>
          <p style={{ fontSize:"24px",fontWeight:800,color:C.amber }}>{counts.partial}</p>
          <p style={{ color:C.muted,fontSize:"12px" }}>Partially True</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div style={{ maxWidth:"900px",margin:"0 auto",padding:"0 24px 16px" }}>
        <div style={{ position:"relative",marginBottom:"16px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.dimmed} strokeWidth="2" style={{ position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search claims... (e.g. 'vaccines', 'salary', 'startup')" style={{ width:"100%",padding:"12px 14px 12px 40px",borderRadius:"12px",border:`1px solid ${C.cardBorder}`,background:"rgba(30,41,66,0.4)",color:"#fff",fontSize:"14px",outline:"none",boxSizing:"border-box" }}/>
        </div>
        <div style={{ display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"12px" }}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={()=>setCategory(cat)} style={{ padding:"6px 14px",borderRadius:"8px",fontSize:"12px",fontWeight:600,border:`1px solid ${category===cat?"rgba(59,130,246,0.4)":C.cardBorder}`,background:category===cat?"rgba(59,130,246,0.15)":"transparent",color:category===cat?"#fff":C.muted,cursor:"pointer" }}>{cat}</button>
          ))}
        </div>
        <div style={{ display:"flex",gap:"8px",marginBottom:"8px" }}>
          {[{l:"All",v:"all"},{l:"Verified",v:"verified"},{l:"False",v:"false"},{l:"Partial",v:"partial"}].map(f=>(
            <button key={f.v} onClick={()=>setVerdictFilter(f.v)} style={{ padding:"5px 12px",borderRadius:"6px",fontSize:"11px",fontWeight:600,border:"none",cursor:"pointer",background:verdictFilter===f.v?"rgba(59,130,246,0.2)":"rgba(148,163,184,0.06)",color:verdictFilter===f.v?"#fff":C.dimmed }}>{f.l}</button>
          ))}
        </div>
        <p style={{ color:C.dimmed,fontSize:"12px" }}>{filtered.length} result{filtered.length!==1?"s":""}</p>
      </div>

      {/* Claims List */}
      <div style={{ maxWidth:"900px",margin:"0 auto",padding:"0 24px 64px" }}>
        <div style={{ display:"flex",flexDirection:"column",gap:"8px" }}>
          {filtered.map((c,i)=>(
            <div key={i} onClick={()=>setExpanded(expanded===i?null:i)} style={{ background:C.card,border:`1px solid ${expanded===i?"rgba(59,130,246,0.25)":C.cardBorder}`,borderRadius:"12px",padding:"16px 20px",cursor:"pointer",transition:"border .15s" }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:"16px",marginBottom:"8px" }}>
                <p style={{ color:"#fff",fontSize:"14px",fontWeight:500,flex:1,lineHeight:1.4 }}>&ldquo;{c.claim}&rdquo;</p>
                <VerdictBadge verdict={c.verdict}/>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:"16px" }}>
                <span style={{ color:C.dimmed,fontSize:"11px",background:"rgba(148,163,184,0.08)",padding:"2px 8px",borderRadius:"4px" }}>{c.category}</span>
                <div style={{ flex:1,maxWidth:"200px" }}><ConfidenceBar score={c.confidence}/></div>
                <span style={{ color:C.dimmed,fontSize:"11px" }}>{c.sources} sources</span>
              </div>
              {expanded===i&&(
                <div style={{ marginTop:"12px",paddingTop:"12px",borderTop:`1px solid ${C.line}` }}>
                  <p style={{ color:C.text,fontSize:"13px",lineHeight:1.6 }}>{c.detail}</p>
                  <a href="#" style={{ color:C.blue,fontSize:"12px",textDecoration:"none",marginTop:"8px",display:"inline-block" }}>Verify this claim with Trustie →</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign:"center",padding:"48px 24px 32px",borderTop:`1px solid ${C.line}` }}>
        <h2 style={{ fontSize:"28px",fontWeight:700,color:"#fff",marginBottom:"8px" }}>Don't See Your Claim?</h2>
        <p style={{ color:C.muted,fontSize:"15px",marginBottom:"24px" }}>Verify any AI-generated text in seconds with Trustie.</p>
        <div style={{ display:"flex",justifyContent:"center",gap:"12px" }}>
          <a href="#" style={{ background:C.blue,color:"#fff",padding:"12px 28px",borderRadius:"10px",fontSize:"14px",fontWeight:600,textDecoration:"none",boxShadow:`0 0 20px ${C.blueGlow}` }}>Try Trustie Free</a>
          <a href="/proof" style={{ background:"transparent",color:"#fff",padding:"12px 28px",borderRadius:"10px",fontSize:"14px",fontWeight:600,textDecoration:"none",border:`1px solid ${C.cardBorder}` }}>See the Proof</a>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.line}`,padding:"40px 24px 28px",marginTop:"24px" }}>
        <div style={{ maxWidth:"1100px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
            <div style={{ width:24,height:24,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <span style={{ color:C.dimmed,fontSize:"13px" }}>&copy; 2025 Trustie. All rights reserved.</span>
          </div>
          <div style={{ display:"flex",gap:"20px" }}>
            {["Privacy","Terms","Blog","Help"].map(l=><a key={l} href="#" style={{ color:C.dimmed,fontSize:"12px",textDecoration:"none" }}>{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
