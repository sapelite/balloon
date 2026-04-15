"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, ShieldCheck, Sparkles, Phone } from "lucide-react";

const SIGNATURE_FEATURES = [
  "Hand-picked hotel or villa in your area",
  "English-speaking private driver, full trip",
  "Restaurant reservations at every tier",
  "24/7 concierge on one direct line",
  "Personalized daily plan — edit anytime",
  "All-in price, paid upfront, no upsells",
];

const BESPOKE_FEATURES = [
  "Multi-stop itineraries (Canggu · Uluwatu · Ubud · Gili)",
  "Group trips, honeymoons, birthdays",
  "Event production & private chefs",
  "Yacht days, surf coaches, wellness retreats",
  "Dedicated trip designer, one point of contact",
  "Custom quote within 24h",
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
          className="text-center mb-12"
        >
          <span className="inline-block text-[0.75rem] font-semibold text-coral uppercase tracking-[0.15em] mb-3">
            One flat price
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            Paid upfront. Handled in full.
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350]">
            No per-service menus, no nickel-and-dime. You tell us the dates — we build the trip
            and charge one clean price.
          </p>
        </motion.div>

        <div ref={ref} className="grid lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative rounded-[1.75rem] p-8 lg:p-10 flex flex-col bg-foreground text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-coral/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold/15 blur-3xl" />
            <div className="relative flex flex-col h-full">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-coral/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-coral" />
                </div>
                <span className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-coral">
                  Concierge · Signature
                </span>
              </div>

              <h3 className="text-[1.5rem] font-bold mb-2">Your Bali, designed around you.</h3>
              <p className="text-white/60 text-[0.925rem] leading-relaxed mb-7 max-w-md">
                Built for 5–14 day stays. One trip designer, one driver, one hotel pick,
                and every reservation taken care of before you land.
              </p>

              <div className="mb-7 flex items-baseline gap-2">
                <span className="text-[3rem] font-bold tracking-tight leading-none">from €1,490</span>
              </div>
              <p className="text-[0.78rem] text-white/45 -mt-5 mb-7">
                per person · 7 days · driver, hotel, tables, concierge included
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {SIGNATURE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.9rem]">
                    <div className="w-5 h-5 rounded-full bg-coral/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-coral" />
                    </div>
                    <span className="text-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth?next=/onboarding"
                className="group block text-center py-3.5 rounded-full font-semibold text-[0.9rem] bg-coral text-white shadow-lg shadow-coral/30 hover:shadow-coral/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span className="flex items-center justify-center gap-1.5">
                  Start my trip
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Bespoke */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-[1.75rem] p-8 lg:p-10 flex flex-col bg-card border border-foreground/[0.06]"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-lagoon/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-lagoon" />
              </div>
              <span className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-lagoon">
                Bespoke · On quote
              </span>
            </div>

            <h3 className="text-[1.5rem] font-bold mb-2">Something bigger in mind?</h3>
            <p className="text-foreground/55 text-[0.925rem] leading-relaxed mb-7 max-w-md">
              Multi-island trips, groups over six, weddings, or founder retreats — handled
              by a senior designer from first call to last transfer.
            </p>

            <div className="mb-7">
              <span className="text-[2rem] font-bold tracking-tight leading-none">Custom quote</span>
              <p className="text-[0.78rem] text-foreground/40 mt-1">
                Typically €3k–€15k per group · reply within 24h
              </p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {BESPOKE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.9rem]">
                  <div className="w-5 h-5 rounded-full bg-emerald/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald" />
                  </div>
                  <span className="text-foreground/65">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="mailto:hello@skyrol.bali?subject=Bespoke%20trip%20request"
              className="group block text-center py-3.5 rounded-full font-semibold text-[0.9rem] bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.07] transition-colors"
            >
              <span className="flex items-center justify-center gap-1.5">
                Request a quote
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Guarantee row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-8 grid sm:grid-cols-3 gap-3 text-[0.78rem]"
        >
          <div className="flex items-center gap-2.5 bg-card border border-foreground/[0.06] rounded-xl px-4 py-3">
            <ShieldCheck className="w-4 h-4 text-emerald shrink-0" />
            <span className="text-foreground/65">Full refund if we can&apos;t match your ask</span>
          </div>
          <div className="flex items-center gap-2.5 bg-card border border-foreground/[0.06] rounded-xl px-4 py-3">
            <Check className="w-4 h-4 text-emerald shrink-0" />
            <span className="text-foreground/65">Only verified, visited partners</span>
          </div>
          <div className="flex items-center gap-2.5 bg-card border border-foreground/[0.06] rounded-xl px-4 py-3">
            <Sparkles className="w-4 h-4 text-emerald shrink-0" />
            <span className="text-foreground/65">Concierge picks up within 2 minutes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
