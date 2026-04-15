"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  Scale,
  Users,
  FileCheck,
  Handshake,
  Building2,
  Utensils,
  Sparkles,
  Waves,
  Car,
  Store,
  ArrowRight,
  Mail,
  Check,
  Lock,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const SECTORS = [
  { icon: Building2, label: "Hospitality", note: "Villas, hotels, boutique stays", color: "text-emerald", bg: "bg-emerald/10" },
  { icon: Utensils, label: "F&B", note: "Restaurants, cafés, beach clubs", color: "text-coral", bg: "bg-coral/10" },
  { icon: Sparkles, label: "Wellness", note: "Retreats, spas, yoga studios", color: "text-lagoon", bg: "bg-lagoon/10" },
  { icon: Waves, label: "Real estate", note: "Land, development, leasehold", color: "text-gold", bg: "bg-gold/10" },
  { icon: Car, label: "Transport & logistics", note: "Fleets, mobility services", color: "text-foreground", bg: "bg-foreground/10" },
  { icon: Store, label: "Retail & digital", note: "Local brands, e-commerce", color: "text-emerald", bg: "bg-emerald/10" },
];

const SUPPORT = [
  {
    icon: Scale,
    title: "Jurisdiction & structure",
    desc: "PT PMA, KITAS, nominee arrangements — we map the right vehicle for your ticket and risk appetite.",
  },
  {
    icon: FileCheck,
    title: "Paperwork, end to end",
    desc: "Permits, licensing, land due diligence, notary. We coordinate local counsel so you don't chase signatures.",
  },
  {
    icon: Users,
    title: "Hiring & team setup",
    desc: "Managers, GMs, accountants — vetted through our operator network. No fly-by-night resumes.",
  },
  {
    icon: Handshake,
    title: "Operator intros",
    desc: "Direct warm intros to founders already running profitable Bali ventures. You co-invest or fully acquire.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & compliance",
    desc: "Anti-flag jurisdictions, tax residency, foreign ownership rules — flagged before you sign, not after.",
  },
  {
    icon: Lock,
    title: "Confidential deal room",
    desc: "Financials, KPIs, and legal docs shared under NDA in a secured portal. No leaks, no cold outreach.",
  },
];

const PROCESS = [
  { step: "01", title: "Private intake", desc: "30-minute call to qualify thesis, ticket size, and horizon." },
  { step: "02", title: "Curated shortlist", desc: "3–5 opportunities matching your filters — delivered within two weeks." },
  { step: "03", title: "Deep dive", desc: "On-the-ground visits, operator intros, financial walkthroughs." },
  { step: "04", title: "Close & operate", desc: "Legal, hiring, and handover — or stay hands-off with our managers." },
];

export default function InvestorsClient() {
  return (
    <main className="pt-[4.25rem]">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-emerald/10 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-lagoon/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-[0.75rem] font-semibold uppercase tracking-[0.15em] mb-5"
          >
            <TrendingUp className="w-3 h-3" /> Skyrol for Investors
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.1] mb-5"
          >
            Deal flow in Bali, <span className="bg-linear-to-r from-emerald via-lagoon to-emerald bg-clip-text text-transparent">without the guesswork.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350]"
          >
            Curated opportunities, local operators you can vet in person, and every piece of paperwork handled —
            so your capital works before your visa expires.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <a
              href="/auth?next=/onboarding"
              className="group px-6 py-3 rounded-full bg-emerald text-white font-semibold text-sm shadow-lg shadow-emerald/25 hover:shadow-emerald/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              Request access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#sectors"
              className="px-6 py-3 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.07] text-foreground font-semibold text-sm transition-colors"
            >
              See sectors
            </a>
          </motion.div>
          <p className="text-[0.72rem] text-foreground/40 mt-6 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" /> NDA on every opportunity · Avg. ticket €150k–€2M
          </p>
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            tag="Where the deals are"
            title="Sectors we actively track."
            subtitle="We don't cover everything — we cover the verticals where Bali has real structural tailwind."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="bg-background rounded-2xl p-6 border border-foreground/[0.06] hover:border-emerald/20 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.08)] transition-all flex items-start gap-4"
              >
                <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-[1rem] mb-1">{s.label}</h3>
                  <p className="text-[0.85rem] text-foreground/55 leading-relaxed">{s.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionTitle
            tag="What we handle for you"
            title="Everything around the deal."
            subtitle="The part that kills most foreign investments in Bali isn't the thesis — it's execution. We own it."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUPPORT.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="bg-background rounded-2xl p-6 border border-foreground/[0.06] hover:border-emerald/20 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald/10 flex items-center justify-center mb-4">
                  <o.icon className="w-5 h-5 text-emerald" />
                </div>
                <h3 className="font-bold text-[1rem] mb-2">{o.title}</h3>
                <p className="text-[0.85rem] text-foreground/55 leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <SectionTitle
            tag="How it works"
            title="Four steps, zero noise."
            subtitle="From first call to operating asset — on average, 6 to 12 weeks."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-background rounded-2xl p-6 border border-foreground/[0.06]"
              >
                <p className="text-[0.72rem] font-semibold text-emerald tracking-[0.15em] mb-3">STEP {p.step}</p>
                <h3 className="font-bold text-[1.05rem] mb-2">{p.title}</h3>
                <p className="text-[0.85rem] text-foreground/55 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] bg-linear-to-br from-foreground to-[#1F2E2A] text-white p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-emerald/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <span className="inline-block text-[0.75rem] font-semibold text-emerald uppercase tracking-[0.15em] mb-3">
                  Why investors trust us
                </span>
                <h3 className="text-[1.75rem] lg:text-[2.25rem] font-bold tracking-[-0.02em] leading-tight mb-4">
                  Boots on the ground since 2022.
                </h3>
                <p className="text-white/65 leading-relaxed mb-5 max-w-xl">
                  We live here. Every operator we introduce has been audited in person —
                  books, team, permits, reviews. No remote pitch decks, no middlemen.
                </p>
                <ul className="space-y-2 text-[0.9rem] text-white/75">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald shrink-0" /> Local lawyers and notaries on retainer
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald shrink-0" /> 40+ operators in the active network
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald shrink-0" /> We co-invest when conviction is high
                  </li>
                </ul>
              </div>
              <Link
                href="/auth?next=/onboarding"
                className="shrink-0 px-6 py-3.5 rounded-full bg-emerald text-white font-semibold text-sm shadow-lg shadow-emerald/25 hover:shadow-emerald/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 w-fit"
              >
                Start the intake
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 lg:py-32 bg-card">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <span className="inline-block text-[0.75rem] font-semibold text-emerald uppercase tracking-[0.15em] mb-3">
            Private channel
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            Let&apos;s look at the deal pipeline.
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350] mb-8">
            Every investor gets a dedicated analyst. First call is free — no commitment,
            no sales script, just a straight read on whether Bali fits your thesis.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/auth?next=/onboarding"
              className="group px-6 py-3.5 rounded-full bg-emerald text-white font-semibold text-sm shadow-lg shadow-emerald/25 hover:shadow-emerald/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              Request access
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="mailto:invest@skyrol.bali?subject=Skyrol%20Investors%20%E2%80%94%20intake"
              className="px-6 py-3.5 rounded-full bg-foreground text-white font-semibold text-sm hover:bg-foreground/90 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              invest@skyrol.bali
            </a>
          </div>
          <p className="text-[0.75rem] text-foreground/40 mt-6">
            NDA on file · Replies within 24h · EN / FR / ID
          </p>
        </div>
      </section>
    </main>
  );
}
