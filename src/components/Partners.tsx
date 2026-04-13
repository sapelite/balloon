"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Bike,
  Wifi,
  Home,
  UtensilsCrossed,
  Palmtree,
} from "lucide-react";

const partnerCategories = [
  {
    icon: Bike,
    title: "Scooter Rentals",
    desc: "Delivery partners across Canggu, Seminyak & Ubud",
  },
  {
    icon: Home,
    title: "Villa Managers",
    desc: "200+ verified villas with instant booking",
  },
  {
    icon: Wifi,
    title: "Telecom Providers",
    desc: "Telkomsel & B2B eSIM partners",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants & Cafés",
    desc: "Exclusive Balloon discounts for members",
  },
  {
    icon: Palmtree,
    title: "Beach Clubs & Spas",
    desc: "Queue skip & VIP access via QR Pass",
  },
  {
    icon: Building2,
    title: "Insurance & Fintech",
    desc: "SafetyWing, Heymondo, Revolut integration",
  },
];

const stats = [
  { value: "150+", label: "Local Partners" },
  { value: "12", label: "Service Categories" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Concierge Support" },
];

export default function Partners() {
  return (
    <section
      id="partners"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-emerald uppercase tracking-wider">
            Our Network
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-5">
            Trusted local partners
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We handpick every partner to guarantee quality, reliability, and the
            best prices on the island.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-background"
            >
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-foreground/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Partner categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {partnerCategories.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group p-6 rounded-2xl border border-foreground/5 hover:border-emerald/20 hover:shadow-lg hover:shadow-emerald/5 transition-all bg-background"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <partner.icon className="w-6 h-6 text-emerald" />
              </div>
              <h4 className="font-semibold text-base mb-1">{partner.title}</h4>
              <p className="text-sm text-foreground/50">{partner.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* B2B CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald/5 to-lagoon/5 border border-emerald/10">
            <p className="text-foreground/70">
              <span className="font-semibold">Are you a local business?</span>{" "}
              Join our partner network — free for the first 6 months.
            </p>
            <a
              href="#cta"
              className="px-6 py-2.5 rounded-full bg-emerald text-white font-semibold text-sm hover:bg-green-600 transition-colors shrink-0"
            >
              Become a Partner
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
