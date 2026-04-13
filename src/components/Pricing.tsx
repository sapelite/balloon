"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    tagline: "Explore the basics",
    price: "0",
    period: "",
    highlight: false,
    features: [
      "Interactive Bali zone map",
      "Basic Bahasa lexicon",
      "Emergency contacts",
      "Currency converter",
      "Visa & tax guide",
    ],
    cta: "Download Free",
    ctaStyle: "border",
  },
  {
    name: "Arrival Essentials",
    tagline: "Most popular",
    price: "49",
    period: "one-time",
    highlight: true,
    features: [
      "Everything in Free",
      "eSIM activated on landing",
      "Private airport transfer",
      "Scooter delivered to villa",
      "24/7 chat concierge",
      "Priority partner deals",
    ],
    cta: "Pre-order Now",
    ctaStyle: "primary",
  },
  {
    name: "Bali Pass",
    tagline: "Full experience",
    price: "29",
    period: "/week",
    highlight: false,
    features: [
      "Everything in Essentials",
      "QR deals at beach clubs",
      "Spa & restaurant -10%",
      "Queue skip at venues",
      "Weekly curated picks",
    ],
    cta: "Get the Pass",
    ctaStyle: "border",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[0.75rem] font-semibold text-gold uppercase tracking-[0.15em] mb-3">
            Transparent pricing
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            Choose your style
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-lg mx-auto leading-relaxed font-[350]">
            Start free, upgrade when ready. No hidden fees.
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-3 gap-5 max-w-[58rem] mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-[1.5rem] p-7 flex flex-col ${
                plan.highlight
                  ? "bg-foreground text-white shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] lg:scale-[1.04] z-10"
                  : "bg-card border border-foreground/[0.06]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-coral text-white text-[0.7rem] font-bold tracking-wide shadow-lg shadow-coral/30">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-5">
                <h3 className={`text-[1.05rem] font-bold ${plan.highlight ? "" : ""}`}>{plan.name}</h3>
                <p className={`text-[0.8rem] mt-0.5 ${plan.highlight ? "text-white/50" : "text-foreground/40"}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-[2.75rem] font-bold tracking-tight leading-none">${plan.price}</span>
                {plan.period && (
                  <span className={`text-sm ml-1 ${plan.highlight ? "text-white/40" : "text-foreground/30"}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[0.85rem]">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      plan.highlight ? "bg-coral/20" : "bg-emerald/10"
                    }`}>
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-coral" : "text-emerald"}`} />
                    </div>
                    <span className={plan.highlight ? "text-white/75" : "text-foreground/55"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`group block text-center py-3.5 rounded-full font-semibold text-[0.85rem] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight
                    ? "bg-coral text-white shadow-lg shadow-coral/25 hover:shadow-coral/40"
                    : "bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.07]"
                }`}
              >
                <span className="flex items-center justify-center gap-1.5">
                  {plan.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
