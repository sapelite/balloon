"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Hotel,
  UtensilsCrossed,
  Car,
  HeadphonesIcon,
  MapPin,
  ShieldCheck,
  Compass,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

const pillars = [
  {
    icon: Hotel,
    title: "Hotels & villas",
    desc: "Hand-picked stays in Canggu, Uluwatu, and Ubud. Every property visited, every host vetted.",
    points: ["Boutique hotels & private villas", "Priority upgrades & early check-in", "Area match: surf, family, wellness"],
    accent: "text-coral",
    bg: "bg-coral/10",
    border: "hover:border-coral/25",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    desc: "The tables locals actually book — from warungs worth the detour to the beach clubs that sell out.",
    points: ["Reserved tables, best seats", "Dietary + vibe matched", "Hidden spots off the tourist map"],
    accent: "text-gold",
    bg: "bg-gold/10",
    border: "hover:border-gold/25",
  },
  {
    icon: Car,
    title: "Private drivers",
    desc: "English-speaking drivers you'd trust with your family. Clean cars, fair hours, no upsells.",
    points: ["Airport pickup with your name", "By the day or by the ride", "Tour-ready for day trips"],
    accent: "text-lagoon",
    bg: "bg-lagoon/10",
    border: "hover:border-lagoon/25",
  },
];

const guides = [
  { icon: BookOpen, title: "eSIM setup", desc: "Which provider, which plan — activated in 5 minutes." },
  { icon: Compass, title: "Scooter & bike", desc: "Where to rent safely, what to check, what to avoid." },
  { icon: ShieldCheck, title: "Visa basics", desc: "VOA, B211, KITAS — plain-English walkthrough." },
];

export default function Services() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionTitle
          tag="Three pillars, done right"
          title="Hotels. Restaurants. Drivers."
          subtitle="We obsess over the three things that make or break a trip to Bali. Everything else, we help you figure out — for free."
        />

        {/* Three pillars */}
        <div ref={gridRef} className="grid md:grid-cols-3 gap-4 mb-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group p-7 rounded-2xl bg-card border border-foreground/[0.04] ${p.border} hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.08)] transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${p.bg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300`}>
                <p.icon className={`w-6 h-6 ${p.accent}`} />
              </div>
              <h3 className="font-bold text-[1.1rem] mb-2">{p.title}</h3>
              <p className="text-[0.875rem] text-foreground/55 leading-relaxed mb-5">{p.desc}</p>
              <ul className="space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[0.825rem] text-foreground/65">
                    <span className={`mt-1.5 w-1 h-1 rounded-full ${p.accent} shrink-0`} style={{ background: "currentColor" }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 24/7 concierge band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[1.5rem] bg-linear-to-br from-foreground to-[#2A2A4E] text-white p-7 lg:p-10 relative overflow-hidden mb-14"
        >
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-coral/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[auto_1fr_auto] gap-6 items-center">
            <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center shrink-0">
              <HeadphonesIcon className="w-7 h-7 text-coral" />
            </div>
            <div>
              <span className="inline-block text-[0.72rem] font-semibold text-coral uppercase tracking-[0.15em] mb-2">
                24/7 concierge
              </span>
              <h3 className="text-[1.4rem] lg:text-[1.7rem] font-bold tracking-[-0.02em] leading-tight mb-2">
                One number. Any problem. Any hour.
              </h3>
              <p className="text-white/65 leading-relaxed max-w-xl text-[0.95rem]">
                Stuck at immigration, need a last-minute table, lost a phone — your concierge picks up in under 2 minutes, always.
              </p>
            </div>
            <a
              href="/onboarding"
              className="shrink-0 px-5 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.02] transition-all flex items-center gap-1.5 w-fit"
            >
              Plan my trip
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Free guides */}
        <div className="rounded-[1.5rem] border border-foreground/[0.06] bg-card p-7 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
            <div>
              <span className="inline-block text-[0.72rem] font-semibold text-emerald uppercase tracking-[0.15em] mb-2">
                Free · open guides
              </span>
              <h3 className="text-[1.3rem] lg:text-[1.6rem] font-bold tracking-[-0.02em]">
                The rest, we made free.
              </h3>
              <p className="text-foreground/50 leading-relaxed mt-2 max-w-xl text-[0.925rem]">
                eSIM, scooter rentals, visas — easy enough to DIY once you know the tricks.
                No paywall, no upsell. Just the stuff you&apos;d call a friend about.
              </p>
            </div>
            <a
              href="/guides"
              className="shrink-0 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-emerald hover:text-emerald/80 transition-colors"
            >
              Browse all guides
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {guides.map((g) => (
              <a
                key={g.title}
                href="/guides"
                className="flex items-start gap-3 p-4 rounded-xl bg-background hover:bg-sand transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0">
                  <g.icon className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <p className="font-semibold text-[0.9rem] mb-0.5">{g.title}</p>
                  <p className="text-[0.8rem] text-foreground/50 leading-relaxed">{g.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Area pill strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-[0.8rem] text-foreground/50">
          <span className="mr-1">Active in</span>
          {["Canggu", "Uluwatu", "Ubud", "Seminyak", "Sanur"].map((a) => (
            <span key={a} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-foreground/[0.04] text-foreground/70 font-medium">
              <MapPin className="w-3 h-3" />
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
