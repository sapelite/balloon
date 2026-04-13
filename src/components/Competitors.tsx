"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const features = [
  "eSIM Integration",
  "Airport Transfer",
  "Scooter Delivery",
  "Visa & Tax Guide",
  "Local Concierge 24/7",
  "Partner QR Deals",
  "All-in-One App",
];

const competitors = [
  {
    name: "Balloon",
    highlight: true,
    values: [true, true, true, true, true, true, true],
  },
  {
    name: "Grab / Gojek",
    highlight: false,
    values: [false, "partial", false, false, false, false, false],
  },
  {
    name: "Traveloka",
    highlight: false,
    values: [false, false, false, "partial", false, false, false],
  },
  {
    name: "Melalie",
    highlight: false,
    values: [false, false, true, false, false, false, false],
  },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <div className="w-6 h-6 rounded-full bg-emerald/10 flex items-center justify-center">
        <Check className="w-3.5 h-3.5 text-emerald" />
      </div>
    );
  if (value === "partial")
    return (
      <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
        <Minus className="w-3.5 h-3.5 text-gold" />
      </div>
    );
  return (
    <div className="w-6 h-6 rounded-full bg-foreground/5 flex items-center justify-center">
      <X className="w-3.5 h-3.5 text-foreground/25" />
    </div>
  );
}

export default function Competitors() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-lagoon uppercase tracking-wider">
            Why Balloon
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-5">
            The only all-in-one
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Other apps solve one piece of the puzzle. Balloon solves the whole
            picture.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white border border-foreground/5 overflow-hidden shadow-sm"
        >
          {/* Table header */}
          <div className="grid grid-cols-5 gap-4 p-6 border-b border-foreground/5 bg-sand/30">
            <div className="text-sm font-semibold text-foreground/40">
              Feature
            </div>
            {competitors.map((comp, i) => (
              <div
                key={i}
                className={`text-sm font-bold text-center ${
                  comp.highlight ? "text-coral" : "text-foreground/60"
                }`}
              >
                {comp.name}
              </div>
            ))}
          </div>

          {/* Table rows */}
          {features.map((feature, i) => (
            <div
              key={i}
              className={`grid grid-cols-5 gap-4 p-4 px-6 ${
                i % 2 === 0 ? "" : "bg-sand/20"
              }`}
            >
              <div className="text-sm text-foreground/70 flex items-center">
                {feature}
              </div>
              {competitors.map((comp, j) => (
                <div key={j} className="flex justify-center items-center">
                  <StatusIcon value={comp.values[i]} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
