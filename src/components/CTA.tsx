"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Mail, Check, Loader2 } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "cta" }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute inset-0 noise" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-coral/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-lagoon/8 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-coral" />
            </span>
            <span className="text-[0.8rem] font-medium text-white/50">
              Limited early-bird pricing
            </span>
          </div>

          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-bold text-white tracking-[-0.03em] leading-[1.1] mb-6">
            Ready to make Bali
            <br />
            <span className="gradient-text">effortless?</span>
          </h2>

          <p className="text-[1.05rem] text-white/40 max-w-md mx-auto mb-10 leading-relaxed font-[350]">
            Join 2,400+ travelers. Get early access, exclusive pricing, and a free Visa guide.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-emerald/10 border border-emerald/20"
            >
              <Check className="w-5 h-5 text-emerald" />
              <span className="text-emerald font-semibold">You&apos;re on the list! Check your email.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[1.1rem] h-[1.1rem] text-white/20" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === "loading"}
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:border-coral/40 focus:ring-2 focus:ring-coral/15 transition-all text-[0.9rem] disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="group px-7 py-3.5 rounded-full bg-coral text-white font-semibold text-[0.9rem] shadow-[0_0_24px_rgba(255,56,92,0.3)] hover:shadow-[0_0_32px_rgba(255,56,92,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shrink-0"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Join
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {status !== "success" && (
            <p className="text-[0.75rem] text-white/20 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
