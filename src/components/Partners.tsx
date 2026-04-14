"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Bike,
  Wifi,
  Home,
  UtensilsCrossed,
  Palmtree,
  ArrowRight,
} from "lucide-react";

const partnerCategories = [
  { icon: Bike, title: "Scooter Rentals", desc: "Delivery across Canggu, Seminyak & Ubud" },
  { icon: Home, title: "Villa Managers", desc: "200+ verified villas, instant booking" },
  { icon: Wifi, title: "Telecom Partners", desc: "Telkomsel & B2B eSIM providers" },
  { icon: UtensilsCrossed, title: "Restaurants & Cafes", desc: "Exclusive Balloon member discounts" },
  { icon: Palmtree, title: "Beach Clubs & Spas", desc: "Queue skip & VIP access via QR" },
  { icon: Building2, title: "Insurance & Fintech", desc: "SafetyWing, Heymondo, Revolut" },
];

const stats = [
  { value: "150+", label: "Local Partners" },
  { value: "12", label: "Categories" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" },
];

export default function Partners() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="partners" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[0.75rem] font-semibold text-emerald uppercase tracking-[0.15em] mb-3">
            Our Network
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            Trusted local partners
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-lg mx-auto leading-relaxed font-[350]">
            Every partner is handpicked for quality, reliability, and fair prices.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-5 rounded-2xl bg-card border border-foreground/[0.04]">
              <div className="text-[1.75rem] lg:text-[2rem] font-bold gradient-text mb-0.5">{stat.value}</div>
              <div className="text-[0.8rem] text-foreground/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partnerCategories.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-card border border-foreground/[0.04] hover:border-emerald/20 hover:shadow-[0_4px_24px_rgba(16,185,129,0.06)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald/8 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <p.icon className="w-5 h-5 text-emerald" />
              </div>
              <h4 className="font-semibold text-[0.95rem] mb-1">{p.title}</h4>
              <p className="text-[0.825rem] text-foreground/40">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* B2B CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-5 py-5 px-7 rounded-2xl bg-linear-to-r from-emerald/[0.04] to-lagoon/[0.04] border border-emerald/10">
            <p className="text-foreground/60 text-[0.9rem]">
              <span className="font-semibold text-foreground/80">Local business?</span>{" "}
              Join our partner network — free for 6 months.
            </p>
            <a
              href="/partners"
              className="group flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald text-white font-semibold text-[0.825rem] hover:bg-green-600 transition-colors shrink-0"
            >
              Become a Partner
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
