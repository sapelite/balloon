"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const features = [
  "eSIM Integration",
  "Airport Transfer",
  "Scooter Delivery",
  "Visa & Tax Guide",
  "Concierge 24/7",
  "Partner QR Deals",
  "All-in-One App",
];

const competitors = [
  { name: "Balloon", highlight: true, values: [true, true, true, true, true, true, true] },
  { name: "Grab", highlight: false, values: [false, "partial", false, false, false, false, false] },
  { name: "Traveloka", highlight: false, values: [false, false, false, "partial", false, false, false] },
  { name: "Melalie", highlight: false, values: [false, false, true, false, false, false, false] },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <div className="w-7 h-7 rounded-full bg-emerald/10 flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-emerald" />
      </div>
    );
  if (value === "partial")
    return (
      <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center">
        <Minus className="w-3.5 h-3.5 text-gold" />
      </div>
    );
  return (
    <div className="w-7 h-7 rounded-full bg-foreground/[0.03] flex items-center justify-center">
      <X className="w-3.5 h-3.5 text-foreground/15" />
    </div>
  );
}

export default function Competitors() {
  return (
    <section className="py-24 lg:py-32 bg-card relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/[0.06] to-transparent" />

      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[0.75rem] font-semibold text-lagoon uppercase tracking-[0.15em] mb-3">
            Why Balloon
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            The only all-in-one
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-lg mx-auto leading-relaxed font-[350]">
            Others solve one piece. Balloon solves the whole picture.
          </p>
        </motion.div>

        {/* Desktop table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden sm:block rounded-2xl bg-background border border-foreground/[0.06] overflow-hidden"
        >
          <div className="grid grid-cols-5 gap-4 p-5 border-b border-foreground/[0.04]">
            <div className="text-[0.8rem] font-medium text-foreground/30">Feature</div>
            {competitors.map((comp, i) => (
              <div
                key={i}
                className={`text-[0.85rem] font-bold text-center ${comp.highlight ? "text-coral" : "text-foreground/50"}`}
              >
                {comp.name}
              </div>
            ))}
          </div>
          {features.map((feature, i) => (
            <div
              key={i}
              className={`grid grid-cols-5 gap-4 py-3.5 px-5 ${i % 2 === 0 ? "" : "bg-foreground/[0.01]"}`}
            >
              <div className="text-[0.85rem] text-foreground/60 flex items-center">{feature}</div>
              {competitors.map((comp, j) => (
                <div key={j} className="flex justify-center items-center">
                  <StatusIcon value={comp.values[i]} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-background rounded-xl border border-foreground/[0.06] p-4"
            >
              <p className="text-[0.85rem] font-semibold mb-3">{feature}</p>
              <div className="grid grid-cols-4 gap-2">
                {competitors.map((comp, j) => (
                  <div key={j} className="text-center">
                    <div className="flex justify-center mb-1">
                      <StatusIcon value={comp.values[i]} />
                    </div>
                    <span className={`text-[0.65rem] font-medium ${comp.highlight ? "text-coral" : "text-foreground/30"}`}>
                      {comp.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
