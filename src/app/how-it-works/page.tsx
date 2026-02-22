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
  const links = ["Features", "How it works", "Pricing", "Blog", "Help", "Enterprise"];
  return (
    <nav style={{ position:"sticky",top:0,zIndex:50,background:"rgba(11,17,32,0.85)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.line}`,padding:"0 24px" }}>
      <div style={{ maxWidth:"1200px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:"64px" }}>
        <a href="/" style={{ display:"flex",alignItems:"center",gap:"10px",textDecoration:"none" }}>
          <div style={{ width:30,height:30,borderRadius:"50%",background:C.blue,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 12px ${C.blueGlow}` }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <span style={{ color:"#fff",fontWeight:700,fontSize:"18px" }}>Trustie</span>
        </a>
        <div style={{ display:"flex",alignItems:"center",gap:"28px" }}>
          {links.map(l=>(
            <a key={l} href={l==="How it works"?"#":l==="Blog"?"/blog":l==="Help"?"/help":"#"} style={{ color:l==="How it works"?"#fff":C.muted,fontSize:"14px",textDecoration:"none",fontWeight:l==="How it works"?600:400 }}>
              {l}{l==="Enterprise"&&<span style={{ marginLeft:6,fontSize:"10px",fontWeight:700,background:C.blue,color:"#fff",padding:"2px 6px",borderRadius:"9999px" }}>NEW</span>}
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

/* ═══ ARTICLE WRAPPER ═══ */
function Article({ children }) {
  return <div style={{ maxWidth:"740px",margin:"0 auto",padding:"0 24px" }}>{children}</div>;
}

/* ═══ SECTION HEADING ═══ */
function H2({ children }) {
  return <h2 style={{ fontSize:"28px",fontWeight:700,color:"#fff",margin:"48px 0 16px",lineHeight:1.3 }}>{children}</h2>;
}

function H3({ children }) {
  return <h3 style={{ fontSize:"22px",fontWeight:700,color:"#fff",margin:"36px 0 12px",lineHeight:1.3 }}>{children}</h3>;
}

/* ═══ PARAGRAPH ═══ */
function P({ children }) {
  return <p style={{ color:C.text,fontSize:"16px",lineHeight:1.75,margin:"0 0 20px" }}>{children}</p>;
}

/* ═══ BULLET LIST ═══ */
function BulletList({ items }) {
  return (
    <ul style={{ margin:"0 0 24px",paddingLeft:"20px" }}>
      {items.map((item,i)=>(
        <li key={i} style={{ color:C.text,fontSize:"16px",lineHeight:1.75,marginBottom:"12px" }}>
          {item.bold && <strong style={{ color:"#fff" }}>{item.bold} </strong>}
          {item.text}
        </li>
      ))}
    </ul>
  );
}

/* ═══ CODE BLOCK ═══ */
function CodeBlock({ code }) {
  return (
    <div style={{ background:"rgba(30,41,66,0.6)",border:`1px solid ${C.cardBorder}`,borderRadius:"12px",padding:"20px 24px",margin:"0 0 24px",fontFamily:"'SF Mono',Monaco,Consolas,monospace",fontSize:"14px",lineHeight:1.7,color:C.text,overflowX:"auto" }}>
      <pre style={{ margin:0,whiteSpace:"pre-wrap" }}>{code}</pre>
    </div>
  );
}

/* ═══ DIAGRAM PLACEHOLDER ═══ */
function Diagram({ title, labels }) {
  return (
    <div style={{ background:"#f0f0f0",borderRadius:"12px",padding:"48px 32px",margin:"0 0 32px",textAlign:"center" }}>
      <p style={{ fontSize:"24px",fontWeight:700,color:"#1a1a1a",marginBottom:"24px" }}>{title}</p>
      <div style={{ display:"flex",justifyContent:"center",alignItems:"center",gap:"24px",flexWrap:"wrap" }}>
        {labels.map((l,i)=>(
          <div key={i} style={{ display:"flex",alignItems:"center",gap:"16px" }}>
            <div style={{ width:"100px",height:"100px",borderRadius:l.shape==="circle"?"50%":"16px",border:"3px solid #1a1a1a",display:"flex",alignItems:"center",justifyContent:"center",background:"#fff" }}>
              <span style={{ fontSize:"16px",fontWeight:700,color:"#1a1a1a",textAlign:"center" }}>{l.text}</span>
            </div>
            {l.arrow && <span style={{ fontSize:"28px",color:"#1a1a1a" }}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ BADGE ═══ */
function Badge({ text, color }) {
  return (
    <span style={{ display:"inline-block",padding:"4px 14px",borderRadius:"9999px",fontSize:"13px",fontWeight:600,border:`1px solid ${color||C.blue}`,color:color||C.blue,background:`${color||C.blue}15` }}>
      {text}
    </span>
  );
}

/* ═══ MAIN PAGE ═══ */
export default function HowItWorksPage() {
  return (
    <div style={{ minHeight:"100vh",color:"#fff",background:C.bg,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      <Navbar />

      {/* ── HERO ── */}
      <div style={{ textAlign:"center",padding:"64px 24px 48px" }}>
        <Badge text="Tech Explained" color={C.blue} />
        <h1 style={{ fontSize:"42px",fontWeight:700,color:"#fff",margin:"20px auto 16px",maxWidth:"700px",lineHeight:1.2 }}>
          How Trustie Verifies Every Claim With Multi-AI Consensus
        </h1>
        <p style={{ color:C.muted,fontSize:"17px",maxWidth:"600px",margin:"0 auto 12px",lineHeight:1.6 }}>
          We built Trustie because AI hallucinations cost businesses real money. Here is exactly how our verification engine works under the hood.
        </p>
        <p style={{ color:C.dimmed,fontSize:"14px" }}>Published on February 18, 2026</p>
      </div>

      <div style={{ maxWidth:"740px",margin:"0 auto",padding:"0 24px" }}>
        <hr style={{ border:"none",borderTop:`1px solid ${C.line}`,margin:"0 0 48px" }} />
      </div>

      {/* ── ARTICLE BODY ── */}
      <Article>
        <H2>The Problem: AI Sounds Confident, Even When Wrong</H2>
        <P>
          Every major AI model — ChatGPT, Claude, Gemini, Perplexity — generates text that reads with complete confidence. The problem is that confidence has zero correlation with accuracy. A model will state a false statistic with the same authoritative tone as a verified fact.
        </P>
        <P>
          For businesses, this creates a serious liability. HR teams receiving AI-generated resumes cannot tell which credentials are real. Insurance adjusters reviewing AI-drafted claims cannot distinguish fabricated details. Legal teams running due diligence cannot trust unverified outputs.
        </P>
        <P>
          Trustie solves this by adding a verification layer between AI output and human decision-making. Every factual claim is extracted, cross-referenced, and scored before it reaches your team.
        </P>

        <Diagram
          title="The Trust Gap"
          labels={[
            { text:"AI Output", shape:"rect" },
            { text:"???", shape:"circle", arrow:true },
            { text:"Business Decision", shape:"rect", arrow:true },
          ]}
        />

        <H2>Step 1: Claim Extraction</H2>
        <P>
          When you paste text into Trustie, our AI engine parses the content and identifies every individual factual claim. A single paragraph might contain 5-10 distinct verifiable statements.
        </P>
        <P>
          For example, consider this AI-generated resume snippet:
        </P>

        <CodeBlock code={`// Input: AI-generated resume text
"John Smith graduated from Stanford University in 2018 
with a BS in Computer Science. He worked at Google for 
5 years as a Senior Engineer on the Search team."

// Trustie extracts these claims:
→ Claim 1: "Graduated from Stanford University"
→ Claim 2: "Graduation year: 2018"
→ Claim 3: "Degree: BS in Computer Science"
→ Claim 4: "Worked at Google"
→ Claim 5: "Duration: 5 years"
→ Claim 6: "Title: Senior Engineer"
→ Claim 7: "Team: Search"`} />

        <P>
          Each claim is isolated and sent independently to our verification engine. This granular approach means one false claim does not contaminate the assessment of other accurate claims.
        </P>

        <H2>Step 2: Multi-Source Cross-Referencing</H2>
        <P>
          Each extracted claim is verified against multiple independent source categories. We do not rely on any single source, because single-source verification is fragile and prone to errors.
        </P>

        <BulletList items={[
          { bold:"Tier 1 — Government & Academic:", text:"Official databases (.gov), university records (.edu), peer-reviewed journals, and regulatory filings. These carry the highest trust weight." },
          { bold:"Tier 2 — Established Organizations:", text:"Major news outlets (Reuters, AP), established business databases (Crunchbase, LinkedIn), and verified public records." },
          { bold:"Tier 3 — Open Web:", text:"Blogs, forums, and social media. These are used for context but carry minimal trust weight and are flagged for manual review." },
        ]} />

        <P>
          A claim requires corroboration from at least two independent Tier 1 or Tier 2 sources to receive a "Verified" label. If sources conflict, Trustie flags the discrepancy and reports both versions.
        </P>

        <Diagram
          title="Multi-Source Verification"
          labels={[
            { text:"Claim", shape:"circle" },
            { text:".gov .edu Journals", shape:"rect", arrow:true },
            { text:"News LinkedIn Records", shape:"rect", arrow:true },
          ]}
        />

        <H2>Step 3: Multi-AI Consensus</H2>
        <P>
          Here is what makes Trustie fundamentally different from simply asking another AI. We do not just ask one model to verify another model's output — that would inherit the same biases and hallucination patterns.
        </P>
        <P>
          Instead, Trustie runs verification through multiple AI models simultaneously and compares their assessments. If three independent models all agree a claim is false based on the same source evidence, the confidence score increases dramatically.
        </P>

        <CodeBlock code={`// Simplified Multi-AI Consensus Pipeline
async function verifyClaim(claim) {
  const sources = await searchTrustedSources(claim);
  
  // Run verification through multiple models
  const assessments = await Promise.all([
    verifyWithModel("gpt-4o", claim, sources),
    verifyWithModel("claude-3", claim, sources),
    verifyWithModel("gemini-pro", claim, sources),
  ]);
  
  // Calculate consensus
  const consensus = calculateConsensus(assessments);
  
  return {
    verdict: consensus.verdict,     // "verified" | "false" | "unconfirmed"
    confidence: consensus.score,     // 0-100
    sources: consensus.sources,      // direct links
    auditTrail: consensus.trail,     // full methodology
  };
}`} />

        <P>
          This multi-model approach eliminates single-model blind spots. GPT-4 might miss something Claude catches, and vice versa. By requiring consensus, we filter out individual model hallucinations.
        </P>

        <H2>Step 4: Anti-Commercial Bias Filter</H2>
        <P>
          One of the most overlooked problems in AI verification is source bias. If a verification system primarily checks commercial sources, the results will reflect commercial interests rather than ground truth.
        </P>

        <BulletList items={[
          { bold:"Commercial Source Detection:", text:"Trustie identifies when a source has a financial interest in the claim being true or false, and adjusts its trust weight accordingly." },
          { bold:"Academic Prioritization:", text:"Peer-reviewed journals and government databases are weighted 3x higher than commercial sources in our scoring algorithm." },
          { bold:"Conflict Flagging:", text:"When commercial and academic sources disagree, Trustie flags the conflict and presents both perspectives to the user." },
        ]} />

        <H2>Step 5: Confidence Scoring & Audit Trail</H2>
        <P>
          Every verification result includes a confidence score from 0-100 and a complete audit trail. The audit trail shows exactly which sources were checked, what each source said, and how the final verdict was calculated.
        </P>

        <BulletList items={[
          { bold:"90-100% Confidence:", text:"Multiple Tier 1 sources confirm the claim. High certainty." },
          { bold:"70-89% Confidence:", text:"Mix of Tier 1 and Tier 2 sources confirm. Likely accurate." },
          { bold:"40-69% Confidence:", text:"Limited or conflicting sources. Manual verification recommended." },
          { bold:"0-39% Confidence:", text:"Sources contradict the claim, or no credible sources found." },
        ]} />

        <P>
          This transparency is critical for enterprise use cases. When an HR team rejects a candidate based on Trustie's verification, they need a defensible audit trail. When a legal team submits verification results in proceedings, the methodology must be documented.
        </P>

        <div style={{ maxWidth:"740px",margin:"48px auto",padding:"0 24px" }}>
          <hr style={{ border:"none",borderTop:`1px solid ${C.line}` }} />
        </div>

        {/* UPDATE SECTION */}
        <div style={{ textAlign:"center",margin:"32px 0 16px" }}>
          <Badge text="Update" color={C.blue} />
        </div>

        <H2>Trustie 2.0: What's New?</H2>
        <P>
          Trustie 2.0 is a complete rebuild focused on speed, accuracy, and enterprise readiness. Here are the key improvements:
        </P>

        <BulletList items={[
          { bold:"3x Faster Verification:", text:"Our new pipeline processes claims in parallel, reducing average verification time from 12 seconds to 4 seconds." },
          { bold:"API Access:", text:"Enterprise customers can now integrate Trustie verification directly into their ATS, CRM, or custom workflows via our REST API." },
          { bold:"Batch Processing:", text:"Upload CSV files with hundreds of claims and receive a complete verification report, including an exportable audit trail." },
          { bold:"Chrome Extension:", text:"Verify AI-generated content directly in your browser without switching tabs. Coming soon." },
          { bold:"SOC 2 Compliance:", text:"Trustie now meets SOC 2 Type II requirements for enterprise security and data handling." },
        ]} />

        <H3>How the API Works</H3>
        <P>
          Developers can integrate Trustie verification into any application with a simple API call:
        </P>

        <CodeBlock code={`// Trustie API - Verify a claim
const response = await fetch("https://api.trustie.io/v1/verify", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: "Stanford CS degree, 2018. Google Senior Engineer, 5 years.",
    mode: "resume",          // "resume" | "general" | "legal"
    depth: "comprehensive",  // "quick" | "standard" | "comprehensive"
  }),
});

const result = await response.json();
// Returns: { claims: [...], overallVerdict, auditTrail }`} />

        <P>
          The API supports resume verification, general fact-checking, and legal due diligence modes, each with optimized source prioritization for the use case.
        </P>

        <P>
          Questions? We are happy to chat more about the technology. Reach out at support@trustieapp.com.
        </P>
      </Article>

      {/* ── AUTHOR + CTA ── */}
      <div style={{ maxWidth:"740px",margin:"0 auto",padding:"0 24px" }}>
        <hr style={{ border:"none",borderTop:`1px solid ${C.line}`,margin:"48px 0 32px" }} />

        <p style={{ textAlign:"center",color:C.muted,fontSize:"15px",marginBottom:"32px" }}>
          Written by <a href="#" style={{ color:C.blue,textDecoration:"none" }}>Danny</a>.
        </p>

        <div style={{ textAlign:"center",marginBottom:"48px" }}>
          <p style={{ fontSize:"20px",fontWeight:600,color:"#fff",marginBottom:"20px" }}>Ready to try Trustie?</p>
          <div style={{ display:"flex",justifyContent:"center",gap:"16px",flexWrap:"wrap" }}>
            <a href="#" style={{ background:C.blue,color:"#fff",padding:"12px 28px",borderRadius:"10px",fontSize:"15px",fontWeight:600,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"8px",boxShadow:`0 0 20px ${C.blueGlow}` }}>
              Request a Demo
            </a>
            <a href="#" style={{ background:"transparent",color:"#fff",padding:"12px 28px",borderRadius:"10px",fontSize:"15px",fontWeight:600,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"8px",border:`1px solid ${C.cardBorder}` }}>
              Try Free
            </a>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
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
            <div style={{ display:"flex",gap:"12px",marginBottom:"20px" }}>
              {["X","in","▶"].map((icon,i)=>(<a key={i} href="#" style={{ width:32,height:32,borderRadius:"8px",background:"rgba(148,163,184,0.08)",display:"flex",alignItems:"center",justifyContent:"center",color:C.dimmed,fontSize:"12px",textDecoration:"none",fontWeight:700 }}>{icon}</a>))}
            </div>
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
    </div>
  );
}
