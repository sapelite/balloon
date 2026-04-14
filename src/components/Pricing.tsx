"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Check, ArrowRight, TrendingDown, ShieldCheck, Flame, Clock } from "lucide-react";

type PlanId = "lite" | "essentials" | "full";

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  price: number;
  highlight: boolean;
  features: string[];
  cta: string;
  // rough per-day à-la-carte cost used for "without Balloon" comparison
  separateBase: number;      // fixed upfront (esim + concierge research time, etc.)
  separatePerDay: number;    // scales with trip length (scooter, data, etc.)
  bookedThisWeek: number;
};

const plans: Plan[] = [
  {
    id: "lite",
    name: "Bali Lite",
    tagline: "For the DIY traveler",
    price: 19,
    highlight: false,
    features: [
      "Interactive Bali zone map",
      "eSIM delivered before landing",
      "Basic Bahasa lexicon",
      "Emergency contacts & embassies",
      "Visa & tax cheatsheet",
    ],
    cta: "Get Lite",
    separateBase: 15,
    separatePerDay: 2,
    bookedThisWeek: 12,
  },
  {
    id: "essentials",
    name: "Arrival Essentials",
    tagline: "Most popular — lands with you",
    price: 89,
    highlight: true,
    features: [
      "Everything in Lite",
      "Private airport transfer",
      "Scooter delivered to your villa",
      "24/7 chat concierge",
      "Priority partner deals",
      "Trip guide unlocked",
    ],
    cta: "Pre-order Essentials",
    separateBase: 45,
    separatePerDay: 9,
    bookedThisWeek: 37,
  },
  {
    id: "full",
    name: "Full Stay Pass",
    tagline: "Everything, done for you",
    price: 199,
    highlight: false,
    features: [
      "Everything in Essentials",
      "Upgraded PCX scooter",
      "Welcome spa (60min)",
      "Beach club VIP queue-skip",
      "-10% at curated restaurants",
      "Weekly local picks",
    ],
    cta: "Get the Pass",
    separateBase: 85,
    separatePerDay: 14,
    bookedThisWeek: 21,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [days, setDays] = useState(10);

  const calculated = useMemo(
    () =>
      plans.map((p) => {
        const separate = Math.round(p.separateBase + p.separatePerDay * days);
        const savings = Math.max(0, separate - p.price);
        const pct = separate > 0 ? Math.round((savings / separate) * 100) : 0;
        return { ...p, separate, savings, pct };
      }),
    [days]
  );

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-[0.75rem] font-semibold text-coral uppercase tracking-[0.15em] mb-3">
            Transparent pricing
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            Choose your style
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350]">
            One price. No hidden fees. Cancel within 7 days, fully refunded.
          </p>
        </motion.div>

        {/* Trip length slider — drives savings math */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto mb-10 bg-card border border-foreground/[0.06] rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.8rem] font-semibold text-foreground/70 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Trip length
            </span>
            <span className="text-[0.9rem] font-bold text-coral">
              {days} {days === 1 ? "day" : "days"}
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={30}
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10))}
            aria-label="Trip length in days"
            aria-valuetext={`${days} ${days === 1 ? "day" : "days"}`}
            className="w-full accent-coral cursor-pointer"
          />
          <div className="flex justify-between text-[0.65rem] text-foreground/35 mt-1.5">
            <span>3d</span>
            <span>14d</span>
            <span>30d</span>
          </div>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-3 gap-5 max-w-[58rem] mx-auto items-start">
          {calculated.map((plan, i) => (
            <motion.div
              key={plan.id}
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
                <h3 className="text-[1.05rem] font-bold">{plan.name}</h3>
                <p className={`text-[0.8rem] mt-0.5 ${plan.highlight ? "text-white/50" : "text-foreground/40"}`}>
                  {plan.tagline}
                </p>
              </div>

              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-[2.75rem] font-bold tracking-tight leading-none">${plan.price}</span>
                <span className={`text-sm ${plan.highlight ? "text-white/40" : "text-foreground/30"}`}>
                  one-time
                </span>
              </div>

              {/* Without Balloon comparison */}
              <div
                className={`mb-5 flex items-center gap-2 text-[0.75rem] ${
                  plan.highlight ? "text-white/60" : "text-foreground/50"
                }`}
              >
                <span className="line-through decoration-coral/70 decoration-2">${plan.separate} separately</span>
                {plan.savings > 0 && (
                  <span className="inline-flex items-center gap-1 text-emerald font-semibold">
                    <TrendingDown className="w-3 h-3" />
                    save ${plan.savings} ({plan.pct}%)
                  </span>
                )}
              </div>

              {/* Urgency */}
              <div
                className={`mb-5 inline-flex items-center gap-1.5 text-[0.7rem] font-medium px-2.5 py-1 rounded-full w-fit ${
                  plan.highlight ? "bg-coral/20 text-coral" : "bg-coral/10 text-coral"
                }`}
              >
                <Flame className="w-3 h-3" />
                Booked {plan.bookedThisWeek}× this week
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[0.85rem]">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlight ? "bg-coral/20" : "bg-emerald/10"
                      }`}
                    >
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-coral" : "text-emerald"}`} />
                    </div>
                    <span className={plan.highlight ? "text-white/75" : "text-foreground/55"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={`/checkout/${plan.id}`}
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

        {/* Guarantee row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[58rem] mx-auto mt-8 grid sm:grid-cols-3 gap-3 text-[0.78rem]"
        >
          <div className="flex items-center gap-2.5 bg-card border border-foreground/[0.06] rounded-xl px-4 py-3">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0" />
            <span className="text-foreground/65">7-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2.5 bg-card border border-foreground/[0.06] rounded-xl px-4 py-3">
            <Check className="w-4 h-4 text-emerald shrink-0" />
            <span className="text-foreground/65">Verified local partners only</span>
          </div>
          <div className="flex items-center gap-2.5 bg-card border border-foreground/[0.06] rounded-xl px-4 py-3">
            <Clock className="w-4 h-4 text-emerald shrink-0" />
            <span className="text-foreground/65">Everything ready on landing</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
