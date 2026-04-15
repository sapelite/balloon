"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plane, Briefcase, TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
import Wordmark from "@/components/Wordmark";

type Audience = "traveler" | "entrepreneur" | "investor";

const CARDS: {
  key: Audience;
  icon: typeof Plane;
  iconBg: string;
  iconFg: string;
  headline: string;
  tagline: string;
  bullets: string[];
  cta: string;
  accent: string;
  hoverBorder: string;
}[] = [
  {
    key: "traveler",
    icon: Plane,
    iconBg: "bg-coral-light",
    iconFg: "text-coral",
    headline: "I'm traveling to Bali",
    tagline: "Hand-picked hotels, drivers, and food — planned for you.",
    bullets: [
      "Hotels in Canggu, Uluwatu & Ubud",
      "English-speaking private drivers",
      "24/7 concierge while you're on island",
    ],
    cta: "Plan my trip",
    accent: "text-coral",
    hoverBorder: "hover:border-coral/40",
  },
  {
    key: "entrepreneur",
    icon: Briefcase,
    iconBg: "bg-lagoon-light",
    iconFg: "text-lagoon",
    headline: "I run a business in Bali",
    tagline: "Website, CRM, content, and warm intros — built for the island economy.",
    bullets: [
      "Website, CRM & social content",
      "Photoshoots & event production",
      "Access to our founder network",
    ],
    cta: "Grow my business",
    accent: "text-lagoon",
    hoverBorder: "hover:border-lagoon/40",
  },
  {
    key: "investor",
    icon: TrendingUp,
    iconBg: "bg-emerald/10",
    iconFg: "text-emerald",
    headline: "I'm looking to invest",
    tagline: "Deal flow, jurisdiction help, and operators you can trust.",
    bullets: [
      "Curated opportunities by industry",
      "Legal, hiring & paperwork support",
      "Direct intros to proven operators",
    ],
    cta: "See opportunities",
    accent: "text-emerald",
    hoverBorder: "hover:border-emerald/40",
  },
];

export default function AudienceChooser() {
  const [loading, setLoading] = useState<Audience | null>(null);

  async function choose(audience: Audience) {
    setLoading(audience);
    try {
      await fetch("/api/audience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience }),
      });
    } catch {}
    window.location.href = "/auth?next=/onboarding";
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-coral rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-lagoon rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-6 py-16">
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
            Why are you coming to Bali?
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Pick your path — we&apos;ll personalize everything. You can switch anytime from your profile.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                onClick={() => choose(card.key)}
                disabled={loading !== null}
                className={`group relative text-left p-7 rounded-3xl bg-white border border-border ${card.hoverBorder} shadow-airbnb hover:shadow-airbnb-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col`}
              >
                <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${card.iconFg}`} />
                </div>
                <h2 className="text-xl font-bold mb-2">{card.headline}</h2>
                <p className="text-muted text-sm mb-5 leading-relaxed">{card.tagline}</p>

                <ul className="space-y-2 mb-6 flex-1">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground/70">
                      <span className={`mt-1.5 w-1 h-1 rounded-full ${card.iconFg} shrink-0`} style={{ background: "currentColor" }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className={`flex items-center gap-2 ${card.accent} font-semibold text-sm`}>
                  {loading === card.key ? (
                    <div className={`w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin`} />
                  ) : (
                    <>
                      {card.cta}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-xs text-muted">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/[0.04] border border-foreground/5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
            <span>Trusted by 2,400+ travelers & founders in Bali</span>
          </div>
          <p className="text-muted/70">
            Already a member?{" "}
            <a href="/auth" className="underline font-medium hover:text-foreground transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
