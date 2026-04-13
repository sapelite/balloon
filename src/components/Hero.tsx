"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Decorative orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-coral/[0.06] to-transparent blur-[80px]"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
        className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-lagoon/[0.05] to-transparent blur-[80px]"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-28 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/[0.04] border border-foreground/[0.06] mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
          </span>
          <span className="text-[0.8rem] font-medium text-foreground/60">
            Launching Q3 2026 — Join the waitlist
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-[3.2rem] sm:text-[4rem] lg:text-[5rem] font-bold tracking-[-0.035em] leading-[1.05] mb-7 text-glow"
        >
          Bali in{" "}
          <span className="gradient-text">one click</span>
          <span className="text-coral">.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[1.1rem] sm:text-[1.2rem] text-foreground/50 max-w-[540px] mx-auto mb-11 leading-[1.7] font-[350]"
        >
          eSIM activated on landing. Private driver at the gate. Scooter
          delivered to your villa.{" "}
          <span className="text-foreground/70 font-medium">
            Everything before takeoff.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a
            href="#cta"
            className="group px-7 py-3.5 rounded-full bg-foreground text-white font-semibold text-[0.9rem] shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.15)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
          >
            Join the Waitlist
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#services"
            className="group px-7 py-3.5 rounded-full text-foreground/60 font-semibold text-[0.9rem] hover:text-foreground hover:bg-foreground/[0.04] transition-all duration-200 flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-coral" />
            See How It Works
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <div className="flex -space-x-2.5">
            {["#FF6363", "#06B6D4", "#EAB308", "#10B981", "#8B5CF6"].map((color, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 + i * 0.08, type: "spring", stiffness: 300 }}
                className="w-9 h-9 rounded-full border-[2.5px] border-background flex items-center justify-center text-white text-[0.7rem] font-bold"
                style={{ backgroundColor: color }}
              >
                {String.fromCharCode(65 + i)}
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
              className="w-9 h-9 rounded-full border-[2.5px] border-background bg-foreground/[0.06] flex items-center justify-center text-foreground/40 text-[0.65rem] font-bold"
            >
              +2k
            </motion.div>
          </div>
          <p className="text-[0.825rem] text-foreground/40">
            <span className="font-semibold text-foreground/60">2,400+</span>{" "}
            travelers on the waitlist
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
