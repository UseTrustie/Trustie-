"use client";

import { useState } from "react";

// TRUSTIE PRICING PAGE — OPTIMIZED FOR CONVERSION
// Design principles applied:
// 1. 3 tiers + enterprise (proven optimal: 3-4 tiers)
// 2. "Most Popular" badge on middle tier (anchoring)
// 3. Annual toggle with 20% savings (standard SaaS)
// 4. Cost-per-verification breakdown (value clarity)
// 5. Anchored against Checkr pricing ($29.99/check vs $0.20/check)
// 6. 14-day money-back guarantee (risk reversal)
// 7. FAQ section (objection handling)
// 8. NO fake testimonials, NO fake user counts
// 9. "Early Adopter" framing — honest about being new
// 10. Clear CTAs with minimal friction

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "See how Trustie works",
      monthlyPrice: 0,
      annualPrice: 0,
      verifications: "5 total",
      perCheck: null,
      features: [
        "5 verifications (one-time)",
        "AI-powered claim extraction",
        "Source quality indicators",
        "Confidence scores",
      ],
      cta: "Start Free",
      ctaStyle: "border border-gray-600 text-white hover:bg-gray-800",
      highlight: false,
      badge: null,
    },
    {
      name: "Starter",
      description: "For individual recruiters",
      monthlyPrice: 49,
      annualPrice: 39,
      verifications: "100 / month",
      perCheck: "$0.49",
      perCheckAnnual: "$0.39",
      features: [
        "100 verifications per month",
        "AI-powered claim extraction",
        "Source quality weighting",
        "Confidence scores",
        "Verification history",
        "Email support",
      ],
      cta: "Start 14-Day Free Trial",
      ctaStyle: "bg-gray-700 text-white hover:bg-gray-600",
      highlight: false,
      badge: null,
    },
    {
      name: "Professional",
      description: "For HR teams",
      monthlyPrice: 99,
      annualPrice: 79,
      verifications: "500 / month",
      perCheck: "$0.20",
      perCheckAnnual: "$0.16",
      features: [
        "500 verifications per month",
        "Everything in Starter",
        "Batch verification (multiple resumes)",
        "Detailed source audit logs",
        "Priority processing",
        "Priority email support",
      ],
      cta: "Start 14-Day Free Trial",
      ctaStyle: "bg-blue-600 text-white hover:bg-blue-700",
      highlight: true,
      badge: "Most Popular",
    },
    {
      name: "Business",
      description: "For teams that verify at scale",
      monthlyPrice: 249,
      annualPrice: 199,
      verifications: "Unlimited",
      perCheck: null,
      features: [
        "Unlimited verifications",
        "Everything in Professional",
        "Team accounts (up to 10 users)",
        "API access",
        "Dedicated support",
        "Custom integrations",
      ],
      cta: "Start 14-Day Free Trial",
      ctaStyle: "bg-gray-700 text-white hover:bg-gray-600",
      highlight: false,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <section className="pt-20 pb-8 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Honest Pricing
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-2">
          Verify claims in seconds for a fraction of what traditional background
          checks cost.
        </p>

        {/* Anchor against competitors */}
        <p className="text-sm text-gray-500 mt-4">
          Traditional background checks cost{" "}
          <span className="text-red-400 font-semibold">$29.99–$79.99 per check</span>{" "}
          and take days. Trustie starts at{" "}
          <span className="text-green-400 font-semibold">$0.20 per verification</span>{" "}
          and delivers in seconds.
        </p>
      </section>

      {/* Annual/Monthly Toggle */}
      <div className="flex items-center justify-center gap-4 pb-12">
        <span
          className={`text-sm ${!annual ? "text-white font-semibold" : "text-gray-500"}`}
        >
          Monthly
        </span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            annual ? "bg-blue-600" : "bg-gray-700"
          }`}
        >
          <span
            className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
              annual ? "translate-x-7" : "translate-x-0.5"
            }`}
          />
        </button>
        <span
          className={`text-sm ${annual ? "text-white font-semibold" : "text-gray-500"}`}
        >
          Annual{" "}
          <span className="text-green-400 font-semibold">(Save 20%)</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? "bg-gray-900 border-2 border-blue-500 shadow-lg shadow-blue-500/10"
                  : "bg-gray-900 border border-gray-800"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-gray-500">/mo</span>
                  )}
                </div>
                {plan.monthlyPrice === 0 && (
                  <p className="text-sm text-gray-500 mt-1">No credit card required</p>
                )}
                {annual && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="line-through">${plan.monthlyPrice}/mo</span>{" "}
                    billed annually
                  </p>
                )}
                <p className="text-sm text-gray-400 mt-2">
                  {plan.verifications} verifications
                </p>
                {plan.perCheck && (
                  <p className="text-xs text-green-400 mt-1">
                    {annual && plan.perCheckAnnual
                      ? plan.perCheckAnnual
                      : plan.perCheck}{" "}
                    per verification
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">
                      &#10003;
                    </span>
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Reversal — 14-Day Guarantee */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl p-8 bg-gray-900 border border-green-500/30">
            <p className="text-2xl font-bold mb-3">14-Day Money-Back Guarantee</p>
            <p className="text-gray-400">
              Try any paid plan risk-free. If Trustie does not meet your needs
              within the first 14 days, we will refund you in full. No questions
              asked.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Comparison — Anchor against alternatives */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            How Trustie Compares
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Pricing based on publicly available information as of March 2026.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 text-sm font-normal">
                    &nbsp;
                  </th>
                  <th className="py-4 px-4 text-blue-400 font-bold">Trustie</th>
                  <th className="py-4 px-4 text-gray-500">Checkr</th>
                  <th className="py-4 px-4 text-gray-500">HireRight</th>
                  <th className="py-4 px-4 text-gray-500">Manual</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-400">Cost per check</td>
                  <td className="py-3 px-4 text-center text-green-400 font-bold">
                    $0.20–$0.49
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    $29.99–$79.99
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    $30–$100+
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    1–2 hrs staff time
                  </td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-400">Speed</td>
                  <td className="py-3 px-4 text-center text-green-400 font-bold">
                    Seconds
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    3–5 business days
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    2–7 business days
                  </td>
                  <td className="py-3 px-4 text-center text-gray-400">
                    Hours to days
                  </td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-400">
                    AI claim extraction
                  </td>
                  <td className="py-3 px-4 text-center text-green-400">
                    &#10003;
                  </td>
                  <td className="py-3 px-4 text-center text-red-400">&#10007;</td>
                  <td className="py-3 px-4 text-center text-red-400">&#10007;</td>
                  <td className="py-3 px-4 text-center text-red-400">&#10007;</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-400">Self-serve signup</td>
                  <td className="py-3 px-4 text-center text-green-400">
                    &#10003;
                  </td>
                  <td className="py-3 px-4 text-center text-green-400">
                    &#10003;
                  </td>
                  <td className="py-3 px-4 text-center text-red-400">
                    Sales call required
                  </td>
                  <td className="py-3 px-4 text-center text-gray-500">N/A</td>
                </tr>
                <tr className="border-b border-gray-800/50">
                  <td className="py-3 px-4 text-gray-400">
                    FCRA-compliant background check
                  </td>
                  <td className="py-3 px-4 text-center text-yellow-400">
                    No*
                  </td>
                  <td className="py-3 px-4 text-center text-green-400">
                    &#10003;
                  </td>
                  <td className="py-3 px-4 text-center text-green-400">
                    &#10003;
                  </td>
                  <td className="py-3 px-4 text-center text-gray-500">
                    Varies
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Honest disclaimer about FCRA */}
          <p className="text-xs text-gray-600 mt-4 text-center">
            *Trustie is an AI-powered verification tool, not an FCRA-compliant
            consumer reporting agency. It is designed to supplement, not replace,
            formal background check services. Use Trustie for fast preliminary
            screening, then use Checkr or similar for legally required checks.
          </p>
        </div>
      </section>

      {/* Early Adopter Section — HONEST about being new */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20">
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-2">
              Early Adopter Advantage
            </p>
            <h2 className="text-2xl font-bold mb-4">
              You Are Getting In Early
            </h2>
            <p className="text-gray-400 mb-4">
              Trustie is a new product, and we are transparent about that.
              Current pricing is introductory. Early customers who sign up now
              will keep these rates as we grow and add features.
            </p>
            <p className="text-gray-400">
              We are actively improving accuracy based on user feedback. Every
              verification you run helps make Trustie better for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — Handle objections */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-2">
                Is Trustie a replacement for background check services like
                Checkr?
              </h3>
              <p className="text-gray-400">
                No. Trustie is a fast, AI-powered preliminary screening tool.
                It searches publicly available information to verify claims in
                seconds. For legally required FCRA-compliant background checks
                (criminal records, credit checks, etc.), you should still use a
                service like Checkr. Trustie helps you screen faster before
                investing in a full background check.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">
                How accurate is Trustie?
              </h3>
              <p className="text-gray-400">
                Trustie uses AI to search publicly available sources and provides
                confidence scores with every verification. No AI system is 100%
                accurate. We show you the sources so you can verify the results
                yourself. We recommend using Trustie as one input in your
                decision-making process, not the sole factor.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-400">
                Yes. All paid plans are month-to-month (or annual if you choose).
                Cancel anytime from your account settings. No cancellation fees.
                If you cancel within 14 days, you get a full refund.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">
                What counts as one verification?
              </h3>
              <p className="text-gray-400">
                One verification is one text submission. For example, pasting one
                resume and clicking &quot;Verify&quot; counts as one
                verification. Trustie automatically extracts all claims from that
                submission and verifies each one.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">
                What happens if I run out of verifications?
              </h3>
              <p className="text-gray-400">
                You will be prompted to upgrade to a higher plan. You will not be
                charged overage fees without your consent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-400">
                Trustie does not store the content you submit for verification
                beyond what is needed to deliver results. We do not sell or share
                your data. All connections are encrypted via HTTPS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Verifying Today</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          5 free verifications. No credit card required. See how Trustie works
          in under 60 seconds.
        </p>
        <a
          href="/app"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg"
        >
          Try Trustie Free
        </a>
      </section>
    </div>
  );
}
