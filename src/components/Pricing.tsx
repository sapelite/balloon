"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    tagline: "Explore Bali basics",
    price: "0",
    period: "",
    highlight: false,
    features: [
      "Interactive Bali zone map",
      "Basic Bahasa lexicon",
      "Emergency contacts directory",
      "Currency converter",
      "Visa & tax step-by-step guide",
    ],
    cta: "Download Free",
    icon: null,
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
      "Private airport transfer (VTC)",
      "Scooter delivered to your villa",
      "24/7 chat concierge",
      "Priority partner deals",
    ],
    cta: "Pre-order Now",
    icon: Star,
  },
  {
    name: "Bali Pass",
    tagline: "For the full experience",
    price: "29",
    period: "/week",
    highlight: false,
    features: [
      "Everything in Arrival Essentials",
      "QR code deals at beach clubs",
      "Spa & restaurant discounts (-10%)",
      "Queue skip at partner venues",
      "Weekly curated activity picks",
    ],
    cta: "Get the Pass",
    icon: Zap,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-gold uppercase tracking-wider">
            Transparent pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-5">
            Choose your style
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Start free, upgrade when you&apos;re ready. No hidden fees, no
            subscription traps.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-br from-foreground to-[#2A2A4E] text-white shadow-2xl shadow-foreground/20 scale-[1.02] lg:scale-105"
                  : "bg-white border border-foreground/5 shadow-sm"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-coral text-white text-xs font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-lg font-bold ${plan.highlight ? "text-white" : ""}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${plan.highlight ? "text-white/60" : "text-foreground/50"}`}
                >
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${plan.price}
                </span>
                {plan.period && (
                  <span
                    className={`text-sm ml-1 ${plan.highlight ? "text-white/50" : "text-foreground/40"}`}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 shrink-0 ${
                        plan.highlight ? "text-coral" : "text-emerald"
                      }`}
                    />
                    <span
                      className={
                        plan.highlight ? "text-white/80" : "text-foreground/60"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`block text-center py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105 ${
                  plan.highlight
                    ? "bg-coral text-white shadow-lg shadow-coral/30 hover:shadow-coral/50"
                    : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
