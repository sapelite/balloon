"use client";

import { motion } from "framer-motion";
import { Smartphone, Package, Plane, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    number: "01",
    title: "Download & Sign Up",
    desc: "Create your account in 10 seconds with Google, Apple, or email. No forms, no friction.",
    color: "from-coral to-coral-dark",
  },
  {
    icon: Package,
    number: "02",
    title: "Choose Your Package",
    desc: "Pick the Arrival Essentials or build your own à la carte combo: eSIM, transfer, scooter, insurance.",
    color: "from-lagoon to-lagoon-dark",
  },
  {
    icon: Plane,
    number: "03",
    title: "Fly & Relax",
    desc: "Everything activates automatically when you land. Your eSIM connects, your driver is waiting.",
    color: "from-gold to-amber-600",
  },
  {
    icon: PartyPopper,
    number: "04",
    title: "Enjoy Bali",
    desc: "Scooter at your door, local deals in your pocket, 24/7 concierge one tap away. You're set.",
    color: "from-emerald to-green-600",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-lagoon uppercase tracking-wider">
            Simple as 1-2-3-4
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-5">
            How Balloon works
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            From your couch to Canggu in four effortless steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-coral via-lagoon to-emerald opacity-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative text-center group"
              >
                {/* Icon */}
                <div className="relative mx-auto mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                    <span className="text-xs font-bold text-foreground/60">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
