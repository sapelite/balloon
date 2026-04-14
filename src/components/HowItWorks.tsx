"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Smartphone, Package, Plane, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    number: "01",
    title: "Download & Sign Up",
    desc: "Create your account in 10 seconds with Google, Apple, or email.",
    gradient: "from-coral to-rose-400",
  },
  {
    icon: Package,
    number: "02",
    title: "Choose Your Package",
    desc: "Pick the Arrival Essentials or build your own combo.",
    gradient: "from-lagoon to-cyan-400",
  },
  {
    icon: Plane,
    number: "03",
    title: "Fly & Relax",
    desc: "Everything activates when you land. eSIM connects, driver waits.",
    gradient: "from-gold to-amber-400",
  },
  {
    icon: PartyPopper,
    number: "04",
    title: "Enjoy Bali",
    desc: "Scooter at your door, deals in your pocket, concierge one tap away.",
    gradient: "from-emerald to-green-400",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-foreground/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-foreground/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[0.75rem] font-semibold text-lagoon uppercase tracking-[0.15em] mb-3">
            Simple as 1-2-3-4
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            How Skyrol works
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-lg mx-auto leading-relaxed font-[350]">
            From your couch to Canggu in four effortless steps.
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-[2px]">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-coral via-lagoon to-emerald origin-left opacity-15 rounded-full"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                className="relative text-center group"
              >
                <div className="relative mx-auto mb-6">
                  <div className={`w-[4.25rem] h-[4.25rem] rounded-2xl bg-linear-to-br ${step.gradient} flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-card shadow-sm border border-foreground/[0.06] flex items-center justify-center">
                    <span className="text-[0.6rem] font-bold text-foreground/40">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-[1.05rem] font-bold mb-1.5">{step.title}</h3>
                <p className="text-[0.825rem] text-foreground/40 leading-relaxed max-w-[15rem] mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
