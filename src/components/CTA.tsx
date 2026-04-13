"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-[#1A1A3E] to-[#0A0A2E]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-coral rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-lagoon rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-sm font-medium text-white/70">
              Limited early-bird pricing
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            Ready to make Bali
            <br />
            <span className="gradient-text">effortless?</span>
          </h2>

          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Join 2,400+ travelers on the waitlist. Get early access, exclusive
            pricing, and a free Visa & Tax guide before anyone else.
          </p>

          {/* Email form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/20 transition-all"
              />
            </div>
            <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-coral to-coral-dark text-white font-semibold shadow-xl shadow-coral/25 hover:shadow-coral/40 hover:scale-105 transition-all flex items-center justify-center gap-2 shrink-0">
              Join
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-white/30">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
