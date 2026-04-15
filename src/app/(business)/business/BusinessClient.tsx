"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Search, Palette, Globe, Camera, Megaphone, ArrowRight, TrendingUp,
  Eye, Heart, MousePointerClick, Users, Sparkles, Mail, Check, Quote, MessageCircle,
} from "lucide-react";
import { whatsappHref, mailHref, conciergeEmail } from "@/lib/handoff";

const STATS = [
  { icon: Eye, label: "IG views / mo", value: "1.8M", trend: "+284%" },
  { icon: Users, label: "New followers (90d)", value: "24.3k", trend: "+61%" },
  { icon: MousePointerClick, label: "Direct bookings", value: "3.4×", trend: "vs. before" },
  { icon: Heart, label: "Avg. engagement", value: "7.2%", trend: "+2.1pt" },
];

const CHART = [28, 34, 31, 42, 48, 45, 58, 64, 71, 68, 82, 96];
const MAX = Math.max(...CHART);

const STEPS = [
  { icon: Search, title: "Audit", desc: "Two weeks inside your business. We map audience, channels, and the gap between what you sell and what the island is searching for." },
  { icon: Palette, title: "Identity", desc: "Name, logo, voice, photography direction. Everything rebuilt so you stop looking like every other villa in Canggu." },
  { icon: Globe, title: "Website", desc: "Fast, bookable, built to rank. One page per offer, booking flow that works on a scooter, analytics wired from day one." },
  { icon: Camera, title: "Content", desc: "Monthly on-location shoots — photo, video, stories. No stock. Enough content to feed every channel for 30 days." },
  { icon: Megaphone, title: "Social + Ads", desc: "Daily posting, community replies, Meta + Google campaigns. We optimize for bookings, not vanity likes." },
];

const PACKAGES = [
  {
    name: "Starter",
    tagline: "For solo operators ready to get serious.",
    price: "€1,400",
    priceSub: "/ month · 3-month minimum",
    features: ["Brand refresh + basic identity kit", "One-page website with booking", "12 posts / month, 1 on-site shoot", "Monthly reporting call"],
    cta: "Book a call",
    highlight: false,
  },
  {
    name: "Growth",
    tagline: "Our most-booked — villas, restaurants, spas.",
    price: "€2,900",
    priceSub: "/ month · 6-month minimum",
    features: ["Full identity + photography direction", "Multi-page website, SEO-ready", "20 posts + 2 shoots / month", "Meta + Google ads, €600 managed spend", "Dedicated WhatsApp line"],
    cta: "Book a call",
    highlight: true,
  },
  {
    name: "Scale",
    tagline: "Multi-location, groups, aggressive launches.",
    price: "On quote",
    priceSub: "typically €5k – €12k / month",
    features: ["Dedicated senior team", "Campaign production + influencer seeding", "Paid media strategy, unlimited spend", "CRM, automations, internal tools", "Weekly strategy call"],
    cta: "Request quote",
    highlight: false,
  },
];

const FAQS = [
  { q: "How fast do you launch?", a: "Audit takes 2 weeks. Identity + first site version ships in month 1. Content and ads start in month 2." },
  { q: "Do we own everything you build?", a: "Yes. Brand, site, content, accounts — all yours. We set it up so you can walk if you ever want to." },
  { q: "Minimum commitment?", a: "Starter is 3 months. Growth is 6 months. Scale is 12. Anything shorter isn't enough time to prove it works." },
  { q: "Do you handle ad spend?", a: "Yes — Growth includes €600 managed spend. Scale is unlimited. You keep the ad account either way." },
];

const WA_HREF = whatsappHref("Hi Skyrol Business — I'd like to book a call");
const MAIL_HREF = mailHref("Skyrol Business — Book a call", "business");

export default function BusinessClient() {
  const dashRef = useRef(null);
  const inView = useInView(dashRef, { once: true, margin: "-80px" });

  return (
    <main className="pt-14">
      {/* HERO + CASE STUDY */}
      <section className="relative overflow-hidden pt-10 lg:pt-14 pb-14 lg:pb-18">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[36rem] h-[36rem] rounded-full bg-coral/10 blur-3xl" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[32rem] h-[32rem] rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold text-coral uppercase tracking-[0.15em] mb-4">
              <Sparkles className="w-3 h-3" /> The marketing agency for Bali
            </span>
            <h1 className="text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-bold tracking-[-0.03em] leading-[1.03] mb-5">
              We build the brand, site and content your{" "}
              <span className="bg-linear-to-r from-coral via-gold to-coral-dark bg-clip-text text-transparent">
                villa, restaurant or spa deserves.
              </span>
            </h1>
            <p className="text-[1.05rem] text-foreground/60 leading-relaxed font-[350] max-w-lg mb-6">
              One team in Bali handling identity, website, content and paid ads — so you can run your
              business instead of juggling five freelancers.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.02] transition-all">
                Book a call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link href="/business/demo" className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full border border-foreground/10 hover:bg-foreground/[0.04] text-foreground font-semibold text-sm transition-colors">
                See live demo
              </Link>
            </div>
            <p className="text-[0.78rem] text-foreground/45 mt-4">
              Replies within 24h · Based in Canggu · EN / FR
            </p>
          </div>

          {/* Case study dashboard */}
          <motion.div
            ref={dashRef}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            id="case-study"
            className="bg-linear-to-br from-[#0F0F1F] to-[#1A1A2E] text-white rounded-[1.5rem] p-5 lg:p-6 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.35)] relative overflow-hidden scroll-mt-20"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-coral/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-lagoon/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-coral to-gold flex items-center justify-center font-bold text-sm">SV</div>
                  <div>
                    <p className="font-semibold text-sm">Sunset Villa Canggu</p>
                    <p className="text-[0.7rem] text-white/50">Case study · last 30 days</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold px-2.5 py-1 rounded-full bg-emerald/20 text-emerald">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" /> Live
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="bg-white/5 rounded-xl p-3 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <s.icon className="w-3.5 h-3.5 text-coral" />
                      <span className="inline-flex items-center gap-0.5 text-[0.6rem] font-bold text-emerald">
                        <TrendingUp className="w-2.5 h-2.5" /> {s.trend}
                      </span>
                    </div>
                    <p className="text-[1.35rem] font-bold tracking-tight leading-none">{s.value}</p>
                    <p className="text-[0.65rem] text-white/50 mt-0.5">{s.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[0.8rem] font-semibold">Weekly reach · all channels</p>
                  <p className="text-[0.7rem] text-emerald font-semibold">+184% / 3mo</p>
                </div>
                <div className="flex items-end gap-1 h-20">
                  {CHART.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${(v / MAX) * 100}%` } : {}}
                      transition={{ delay: 0.35 + i * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 rounded-t bg-linear-to-t from-coral/40 via-coral to-gold"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-10 lg:py-14 bg-sand/40">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <Quote className="w-6 h-6 text-coral mx-auto mb-4" />
          <blockquote className="text-[1.1rem] lg:text-[1.3rem] font-medium leading-relaxed text-foreground/80">
            “We had zero marketing before. Three months in, we&apos;re turning away guests on weekends.
            The team treats the villa like it&apos;s their own.”
          </blockquote>
          <figcaption className="mt-4 text-sm text-foreground/50">
            Made Wirawan · Owner, Sunset Villa Canggu
          </figcaption>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="features" className="py-14 lg:py-18 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHead eyebrow="How we work" title="Five steps. One retainer. Real results." sub="We don't ship logos and ghost. Every client runs through the same process — because it's the only way we know it works." />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 mt-10">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="bg-white rounded-2xl p-5 border border-foreground/[0.06] hover:border-coral/20 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-coral/10 flex items-center justify-center mb-3">
                  <s.icon className="w-4.5 h-4.5 text-coral" />
                </div>
                <div className="text-[0.65rem] font-bold text-coral tracking-[0.15em] mb-1">0{i + 1}</div>
                <h3 className="font-bold text-[0.98rem] mb-1.5">{s.title}</h3>
                <p className="text-[0.83rem] text-foreground/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-14 lg:py-18 bg-sand/40 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHead eyebrow="Retainers" title="Pick a package. Or we'll build one." sub="Every retainer starts with a free 45-minute call. We look at your channels, tell you what we'd change, and send a written plan within 48h." />
          <div className="grid lg:grid-cols-3 gap-4 mt-10">
            {PACKAGES.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
                className={`rounded-2xl p-6 flex flex-col ${
                  p.highlight
                    ? "bg-foreground text-white shadow-[0_30px_80px_-25px_rgba(0,0,0,0.35)]"
                    : "bg-white border border-foreground/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-[1.1rem]">{p.name}</h3>
                  {p.highlight && (
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-coral bg-coral/15 px-2 py-0.5 rounded-full">
                      Most booked
                    </span>
                  )}
                </div>
                <p className={`text-[0.83rem] mb-5 ${p.highlight ? "text-white/55" : "text-foreground/55"}`}>
                  {p.tagline}
                </p>
                <div className="mb-5">
                  <span className="text-[1.9rem] font-bold tracking-tight leading-none">{p.price}</span>
                  <span className={`text-[0.75rem] ml-1 ${p.highlight ? "text-white/50" : "text-foreground/50"}`}>
                    {p.priceSub}
                  </span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[0.83rem]">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.highlight ? "text-coral" : "text-emerald"}`} />
                      <span className={p.highlight ? "text-white/85" : "text-foreground/75"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block text-center py-2.5 rounded-full font-semibold text-[0.85rem] transition-all ${
                    p.highlight
                      ? "bg-coral text-white hover:scale-[1.01] shadow-lg shadow-coral/30"
                      : "bg-foreground/[0.05] text-foreground hover:bg-foreground/[0.08]"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    {p.cta}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-18">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <SectionHead eyebrow="Answers" title="Questions we get daily." />
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3 mt-10">
            {FAQS.map((f) => (
              <details key={f.q} className="group bg-white rounded-xl border border-foreground/[0.06] p-4 open:shadow-sm">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-[0.95rem]">
                  {f.q}
                  <span className="text-coral text-xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2.5 text-[0.88rem] text-foreground/60 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="faq" className="py-14 lg:py-18">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="relative overflow-hidden bg-foreground text-white rounded-[2rem] p-10 lg:p-14 text-center">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-coral/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold tracking-[-0.02em] leading-tight mb-3">
                One call. Then a plan.
              </h2>
              <p className="text-white/60 max-w-lg mx-auto mb-6 leading-relaxed">
                We reply within 2 minutes on WhatsApp. Or email us — we come back with slots the same day.
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="group px-5 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/30 hover:shadow-coral/50 hover:scale-[1.02] transition-all flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4" /> WhatsApp us
                </a>
                <a href={MAIL_HREF} className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> {conciergeEmail("business")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.15em] mb-3 text-coral">
        {eyebrow}
      </span>
      <h2 className="text-[1.75rem] lg:text-[2.25rem] font-bold tracking-[-0.02em] leading-tight">
        {title}
      </h2>
      {sub && <p className="mt-3 text-[0.98rem] leading-relaxed text-foreground/60">{sub}</p>}
    </div>
  );
}
