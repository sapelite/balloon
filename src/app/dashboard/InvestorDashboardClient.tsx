"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Lock,
  Mail,
  FileCheck,
  Users,
  Scale,
  ArrowRight,
  Settings,
  LogOut,
} from "lucide-react";
import Wordmark from "@/components/Wordmark";

type UserShape = {
  id: string;
  email: string;
  name: string | null;
};

const PIPELINE = [
  { sector: "Hospitality", stage: "Shortlisted", label: "Boutique villa · Uluwatu", color: "text-emerald", bg: "bg-emerald/10" },
  { sector: "F&B", stage: "Due diligence", label: "Beach restaurant · Canggu", color: "text-coral", bg: "bg-coral/10" },
  { sector: "Wellness", stage: "Sourcing", label: "Retreat venue · Ubud", color: "text-lagoon", bg: "bg-lagoon/10" },
];

const RESOURCES = [
  { icon: Scale, title: "Structuring guide", desc: "PT PMA vs. nominee — trade-offs by ticket size.", href: "#" },
  { icon: FileCheck, title: "Due diligence checklist", desc: "What to audit before any Bali term sheet.", href: "#" },
  { icon: Users, title: "Operator network", desc: "Profiles of vetted founders open to co-invest.", href: "#" },
];

export default function InvestorDashboardClient({ user }: { user: UserShape }) {
  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-card">
      {/* Top bar */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wordmark className="text-xl" />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/10 text-emerald text-[0.7rem] font-semibold uppercase tracking-[0.12em]">
              <TrendingUp className="w-3 h-3" /> Investor
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/onboarding"
              className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-foreground/5 flex items-center gap-1.5"
            >
              <Settings className="w-3.5 h-3.5" /> Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-foreground/5 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-br from-foreground to-[#1F2E2A] text-white rounded-3xl p-7 lg:p-10 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-emerald/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/20 text-emerald text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-4">
              <Lock className="w-3 h-3" /> Private access
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Welcome{user.name ? `, ${user.name.split(" ")[0]}` : ""}.
            </h1>
            <p className="text-white/70 leading-relaxed max-w-xl">
              Your analyst reviews your intake within 48h. Deals appear here once matched —
              every opportunity ships with a full dossier under NDA.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:invest@skyrol.bali"
                className="px-5 py-2.5 rounded-full bg-emerald text-white font-semibold text-sm shadow-lg shadow-emerald/25 hover:shadow-emerald/40 transition-all flex items-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                Contact analyst
              </a>
              <Link
                href="/onboarding"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors flex items-center gap-1.5"
              >
                Update thesis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Pipeline */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Live pipeline</h2>
            <span className="text-xs text-foreground/50">Updated daily</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PIPELINE.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-border hover:border-emerald/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[0.7rem] font-semibold px-2 py-0.5 rounded-full ${p.bg} ${p.color}`}>
                    {p.sector}
                  </span>
                  <span className="text-[0.7rem] text-foreground/50">{p.stage}</span>
                </div>
                <p className="font-semibold text-[0.95rem] mb-3">{p.label}</p>
                <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                  <Lock className="w-3 h-3" /> Dossier under NDA
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Investor resources</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RESOURCES.map((r, i) => (
              <motion.a
                key={r.title}
                href={r.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-border hover:border-emerald/20 hover:shadow-airbnb transition-all block"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald/10 flex items-center justify-center mb-3">
                  <r.icon className="w-5 h-5 text-emerald" />
                </div>
                <p className="font-semibold text-[0.95rem] mb-1">{r.title}</p>
                <p className="text-xs text-foreground/55 leading-relaxed">{r.desc}</p>
              </motion.a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
