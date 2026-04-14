"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plane, Briefcase, ArrowRight } from "lucide-react";
import Wordmark from "@/components/Wordmark";

export default function AudienceChooser() {
  const [loading, setLoading] = useState<"traveler" | "business" | null>(null);

  async function choose(audience: "traveler" | "business") {
    setLoading(audience);
    try {
      await fetch("/api/audience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience }),
      });
    } catch {}
    window.location.href = "/onboarding";
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-coral rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-lagoon rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center mb-6">
            <Wordmark className="text-3xl" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Welcome to Bali.
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Tell us why you&apos;re here — we&apos;ll tailor everything to you. You can switch anytime in settings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => choose("traveler")}
            disabled={loading !== null}
            className="group relative text-left p-8 rounded-3xl bg-white border border-border hover:border-coral/40 shadow-airbnb hover:shadow-airbnb-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-14 h-14 rounded-2xl bg-coral-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Plane className="w-7 h-7 text-coral" />
            </div>
            <h2 className="text-2xl font-bold mb-2">I&apos;m traveling</h2>
            <p className="text-muted text-sm mb-6 leading-relaxed">
              Plan your trip, book villas & experiences, get local guides and a 24/7 concierge.
            </p>
            <div className="flex items-center gap-2 text-coral font-semibold text-sm">
              {loading === "traveler" ? (
                <div className="w-4 h-4 border-2 border-coral/30 border-t-coral rounded-full animate-spin" />
              ) : (
                <>
                  Explore as a traveler
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => choose("business")}
            disabled={loading !== null}
            className="group relative text-left p-8 rounded-3xl bg-white border border-border hover:border-lagoon/40 shadow-airbnb hover:shadow-airbnb-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-14 h-14 rounded-2xl bg-lagoon-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Briefcase className="w-7 h-7 text-lagoon" />
            </div>
            <h2 className="text-2xl font-bold mb-2">I&apos;m doing business</h2>
            <p className="text-muted text-sm mb-6 leading-relaxed">
              Grow your Bali business — social, content, ads, and a dashboard to track what&apos;s working.
            </p>
            <div className="flex items-center gap-2 text-lagoon font-semibold text-sm">
              {loading === "business" ? (
                <div className="w-4 h-4 border-2 border-lagoon/30 border-t-lagoon rounded-full animate-spin" />
              ) : (
                <>
                  Explore Skyrol Business
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </motion.button>
        </div>

        <p className="text-center text-xs text-muted/70 mt-10">
          Not sure?{" "}
          <button
            onClick={() => choose("traveler")}
            disabled={loading !== null}
            className="underline hover:text-foreground transition-colors"
          >
            Start as a traveler
          </button>{" "}
          — you can switch later.
        </p>
      </div>
    </div>
  );
}
