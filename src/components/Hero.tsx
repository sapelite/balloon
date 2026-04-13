"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Car,
  Bike,
  Shield,
  ChevronDown,
} from "lucide-react";

const floatingIcons = [
  { icon: Wifi, label: "eSIM", x: "10%", y: "25%", delay: 0 },
  { icon: Car, label: "VTC", x: "85%", y: "20%", delay: 0.3 },
  { icon: Bike, label: "Scooter", x: "8%", y: "70%", delay: 0.6 },
  { icon: Shield, label: "Insurance", x: "88%", y: "65%", delay: 0.9 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#FFF5F5] to-[#F0F9FF]" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-coral/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-lagoon/5 rounded-full blur-3xl" />

      {/* Floating icons (desktop only) */}
      <div className="hidden lg:block">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + item.delay, duration: 0.5, type: "spring" }}
            className="absolute animate-float"
            style={{
              left: item.x,
              top: item.y,
              animationDelay: `${item.delay}s`,
            }}
          >
            <div className="glass rounded-2xl p-4 shadow-lg shadow-black/5 border border-white/40">
              <item.icon className="w-6 h-6 text-coral" />
              <span className="text-xs font-medium text-foreground/60 mt-1 block">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/10 border border-coral/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
          <span className="text-sm font-medium text-coral">
            Launching 2026 — Join the waitlist
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="block">Bali in</span>
          <span className="gradient-text">one click.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          eSIM activated on landing. Private driver at the gate. Scooter
          delivered to your villa. Everything you need for Bali, booked before
          takeoff.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-coral to-coral-dark text-white font-semibold text-lg shadow-xl shadow-coral/25 hover:shadow-coral/40 hover:scale-105 transition-all flex items-center gap-2"
          >
            Join the Waitlist
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full border-2 border-foreground/10 text-foreground/70 font-semibold text-lg hover:border-coral/30 hover:text-coral transition-all"
          >
            Discover Services
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-3">
            {[
              "bg-coral",
              "bg-lagoon",
              "bg-gold",
              "bg-emerald",
              "bg-purple-500",
            ].map((color, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground/50">
            <span className="font-semibold text-foreground/70">2,400+</span>{" "}
            travelers already on the waitlist
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
