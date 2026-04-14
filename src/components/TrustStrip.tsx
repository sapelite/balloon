"use client";

import { motion } from "framer-motion";
import { Star, Shield, Users, Award } from "lucide-react";

const STATS = [
  { icon: Users, value: "2,400+", label: "On the waitlist" },
  { icon: Star, value: "4.9/5", label: "Beta rating" },
  { icon: Shield, value: "150+", label: "Vetted partners" },
  { icon: Award, value: "Bali-based", label: "Local team" },
];

const PRESS = ["Condé Nast", "The Bali Sun", "Culture Trip", "Travel + Leisure", "Nomad List"];

export default function TrustStrip() {
  return (
    <section className="relative py-12 sm:py-14 border-y border-border/60 bg-sand/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-border"
            >
              <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                <s.icon className="w-4 h-4 text-coral" />
              </div>
              <div className="min-w-0">
                <p className="text-base sm:text-lg font-bold tracking-tight leading-none">
                  {s.value}
                </p>
                <p className="text-[0.7rem] sm:text-xs text-muted leading-tight mt-1 truncate">
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press row */}
        <div className="text-center">
          <p className="text-[0.7rem] font-semibold text-muted uppercase tracking-[0.2em] mb-4">
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3">
            {PRESS.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
                className="text-sm font-bold tracking-tight text-foreground/40 hover:text-foreground/70 transition-colors whitespace-nowrap"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
