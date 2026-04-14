"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Globe,
  Share2,
  Megaphone,
  LineChart,
  Network,
  Server,
  ArrowRight,
  TrendingUp,
  Eye,
  Heart,
  MousePointerClick,
  Users,
  Sparkles,
  Mail,
  Check,
} from "lucide-react";

const OFFERS = [
  {
    icon: LayoutDashboard,
    title: "CRM & social dashboard",
    desc: "All your channels on one screen. Clear, real-time stats built to help you decide fast.",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    icon: Globe,
    title: "Website",
    desc: "Built fresh or taken over. Fast, responsive, designed to turn visitors into customers.",
    color: "text-lagoon",
    bg: "bg-lagoon/10",
  },
  {
    icon: Share2,
    title: "Social media management",
    desc: "Content, scheduling, community. We post what actually works — not what looks nice in a pitch.",
    color: "text-coral",
    bg: "bg-coral/10",
  },
  {
    icon: Megaphone,
    title: "360° marketing strategy",
    desc: "Digital + physical. Targeted campaigns, local partnerships, on-the-ground activations in Bali.",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: LineChart,
    title: "Tracking & optimization",
    desc: "Clear monthly reports. We adjust course based on your goals — not a frozen dashboard.",
    color: "text-emerald",
    bg: "bg-emerald/10",
  },
  {
    icon: Network,
    title: "Access to the Balloon network",
    desc: "Direct exposure to our expat & tourist audience. More reach, zero spam.",
    color: "text-lagoon",
    bg: "bg-lagoon/10",
  },
  {
    icon: Server,
    title: "Custom backend (upsell)",
    desc: "Inventory, team tools, revenue tracking, internal automation. If your back-office slows you down, we rebuild it.",
    color: "text-foreground",
    bg: "bg-foreground/10",
  },
];

const STATS = [
  { icon: Eye, label: "Instagram views / month", value: "1.8M", trend: "+42%", color: "text-coral" },
  { icon: Users, label: "New followers", value: "24.3k", trend: "+61%", color: "text-lagoon" },
  { icon: MousePointerClick, label: "Site conversion rate", value: "3.4%", trend: "+0.9pt", color: "text-emerald" },
  { icon: Heart, label: "Avg. engagement", value: "7.2%", trend: "+2.1pt", color: "text-gold" },
];

const CHART = [28, 34, 31, 42, 48, 45, 58, 64, 71, 68, 82, 96];
const MAX = Math.max(...CHART);

export default function EntrepriseClient() {
  const dashRef = useRef(null);
  const inView = useInView(dashRef, { once: true, margin: "-100px" });

  return (
    <main className="pt-[4.25rem]">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-coral/10 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-gold/10 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/10 text-coral text-[0.72rem] font-bold uppercase tracking-[0.15em] mb-5"
          >
            <Sparkles className="w-3 h-3" /> Balloon Business
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-[2rem] sm:text-[2.75rem] lg:text-[3.5rem] font-bold tracking-[-0.03em] leading-[1.08] mb-5"
          >
            Boost your marketing with{" "}
            <span className="bg-linear-to-r from-coral via-gold to-coral-dark bg-clip-text text-transparent">
              Balloon Business
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350]"
          >
            We handle the full digital stack for Bali businesses — content, social, strategy, CRM.
            And we plug you into the Balloon network: thousands of expats and tourists already on the ground.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <a
              href="#contact"
              className="group px-6 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              Talk to us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#offer"
              className="px-6 py-3 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.07] text-foreground font-semibold text-sm transition-colors"
            >
              See the offer
            </a>
          </motion.div>
        </div>
      </section>

      {/* Mock dashboard */}
      <section ref={dashRef} className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-[#0F0F1F] to-[#1A1A2E] text-white rounded-[1.75rem] p-6 lg:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-coral/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-lagoon/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-linear-to-br from-coral to-gold flex items-center justify-center font-bold">
                    SV
                  </div>
                  <div>
                    <p className="font-semibold">Sunset Villa Canggu</p>
                    <p className="text-xs text-white/50">Dashboard · last 30 days</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold px-3 py-1.5 rounded-full bg-emerald/20 text-emerald">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                  Live
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="bg-white/5 backdrop-blur rounded-xl p-4 border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                      <span className="inline-flex items-center gap-0.5 text-[0.65rem] font-bold text-emerald">
                        <TrendingUp className="w-3 h-3" />
                        {s.trend}
                      </span>
                    </div>
                    <p className="text-[1.6rem] font-bold tracking-tight leading-none">{s.value}</p>
                    <p className="text-[0.68rem] text-white/50 mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-white/5 backdrop-blur rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm font-semibold">Weekly reach — all channels combined</p>
                  <p className="text-xs text-emerald font-semibold">+184% over 3 months</p>
                </div>
                <div className="flex items-end gap-1.5 h-32">
                  {CHART.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${(v / MAX) * 100}%` } : {}}
                      transition={{ delay: 0.4 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1 rounded-t bg-linear-to-t from-coral/40 via-coral to-gold"
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[0.65rem] text-white/35 mt-2">
                  <span>W1</span>
                  <span>W6</span>
                  <span>W12</span>
                </div>
              </div>
            </div>
          </motion.div>
          <p className="text-center text-[0.75rem] text-foreground/40 mt-4">
            Real client example — numbers blurred for confidentiality.
          </p>
        </div>
      </section>

      {/* Offer grid */}
      <section id="offer" className="py-24 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="inline-block text-[0.75rem] font-semibold text-coral uppercase tracking-[0.15em] mb-3">
              What we build for you
            </span>
            <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
              Your whole digital, handled.
            </h2>
            <p className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350]">
              Modular offer — pick what you need, we take care of the rest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFERS.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="bg-background rounded-2xl p-6 border border-foreground/[0.06] hover:border-coral/20 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.08)] transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${o.bg} flex items-center justify-center mb-4`}>
                  <o.icon className={`w-5 h-5 ${o.color}`} />
                </div>
                <h3 className="font-bold text-[1rem] mb-2">{o.title}</h3>
                <p className="text-[0.85rem] text-foreground/55 leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Synergy with Balloon */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] bg-linear-to-br from-foreground to-[#2A2A4E] text-white p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-coral/20 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <span className="inline-block text-[0.7rem] font-bold text-gold uppercase tracking-[0.15em] mb-3">
                  Combined offer
                </span>
                <h3 className="text-[1.75rem] lg:text-[2.25rem] font-bold tracking-[-0.02em] leading-tight mb-4">
                  Become a Balloon partner — get 1 month of Balloon Business on us.
                </h3>
                <p className="text-white/65 leading-relaxed mb-5 max-w-xl">
                  Your restaurant, villa or spa joins the Balloon network? We throw in a full month
                  of Balloon Business. Content, CRM, strategy — we prove the value, you decide next.
                </p>
                <ul className="space-y-2 text-[0.9rem] text-white/75">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald shrink-0" /> Exposure to the Balloon audience (expats + tourists)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald shrink-0" /> Social & site stats dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald shrink-0" /> Free audit + action plan, no strings attached
                  </li>
                </ul>
              </div>
              <Link
                href="#contact"
                className="shrink-0 px-6 py-3.5 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/25 hover:shadow-coral/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 w-fit"
              >
                Claim the offer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 lg:py-32 bg-card">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <span className="inline-block text-[0.75rem] font-semibold text-coral uppercase tracking-[0.15em] mb-3">
            Ready to level up?
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
            Let&apos;s talk about your business.
          </h2>
          <p className="text-[1.05rem] text-foreground/45 max-w-xl mx-auto leading-relaxed font-[350] mb-8">
            Every business is different. We build a tailored offer after a first chat —
            reach out for a free audit and a custom quote.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/33600000000?text=Hi%20Balloon%20Business%20%E2%80%94%20I%27d%20like%20to%20know%20more"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
            <a
              href="mailto:business@balloon.bali?subject=Balloon%20Business%20%E2%80%94%20info%20request"
              className="px-6 py-3.5 rounded-full bg-foreground text-white font-semibold text-sm hover:bg-foreground/90 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              business@balloon.bali
            </a>
          </div>
          <p className="text-[0.75rem] text-foreground/40 mt-6">
            Replies within 24h · Based in Bali · EN / FR
          </p>
        </div>
      </section>
    </main>
  );
}
