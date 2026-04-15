"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, Check, MapPin, CalendarRange, Sparkles } from "lucide-react";
import { whatsappHref } from "@/lib/handoff";

type Area = "canggu" | "uluwatu" | "ubud" | "any";
type Duration = "lt7" | "1-2w" | "2-4w" | "1m+";
type Tier = "quick" | "signature" | "premium";

const AREAS: { value: Area; label: string; hint: string }[] = [
  { value: "canggu", label: "Canggu", hint: "Surf & sunsets" },
  { value: "uluwatu", label: "Uluwatu", hint: "Cliffs & clubs" },
  { value: "ubud", label: "Ubud", hint: "Jungle & wellness" },
  { value: "any", label: "Mix it up", hint: "We pick the base" },
];

const DURATIONS: { value: Duration; label: string; multiplier: number }[] = [
  { value: "lt7", label: "Under a week", multiplier: 0.6 },
  { value: "1-2w", label: "1 – 2 weeks", multiplier: 1 },
  { value: "2-4w", label: "2 – 4 weeks", multiplier: 1.8 },
  { value: "1m+", label: "A month +", multiplier: 3 },
];

const TIERS: {
  value: Tier;
  pack: "lite" | "essentials" | "full";
  name: string;
  base: number;
  tagline: string;
  includes: string[];
}[] = [
  {
    value: "quick",
    pack: "lite",
    name: "Quick Start",
    base: 800,
    tagline: "Land, unpack, go — essentials handled.",
    includes: ["Hand-picked stay", "Airport pickup", "eSIM + scooter", "WhatsApp concierge"],
  },
  {
    value: "signature",
    pack: "essentials",
    name: "Signature",
    base: 1490,
    tagline: "Full trip, zero logistics. Most-booked.",
    includes: ["Hotel or villa", "Private driver", "Restaurant tables", "Editable daily plan"],
  },
  {
    value: "premium",
    pack: "full",
    name: "Premium",
    base: 2900,
    tagline: "White-glove. Designers, chefs, experiences.",
    includes: ["Villa-tier stays", "Private chef", "Senior trip designer", "Priority 24/7 line"],
  },
];

function formatPrice(n: number) {
  return `€${Math.round(n).toLocaleString("en-US")}`;
}

export default function PackagePicker() {
  const [area, setArea] = useState<Area>("canggu");
  const [duration, setDuration] = useState<Duration>("1-2w");
  const [tier, setTier] = useState<Tier>("signature");

  const selected = useMemo(() => TIERS.find((t) => t.value === tier)!, [tier]);
  const mult = useMemo(() => DURATIONS.find((d) => d.value === duration)!.multiplier, [duration]);
  const price = selected.base * mult;

  const checkoutHref = `/checkout/${selected.pack}?area=${area}&duration=${duration}`;
  const areaLabel = AREAS.find((a) => a.value === area)!.label;
  const durationLabel = DURATIONS.find((d) => d.value === duration)!.label;
  const waHref = whatsappHref(
    `Hi Skyrol — ${selected.name} in ${areaLabel}, ${durationLabel.toLowerCase()}. Estimate ${formatPrice(price)} pp.`
  );

  return (
    <div className="bg-white rounded-[1.5rem] border border-foreground/[0.06] shadow-[0_20px_60px_-25px_rgba(0,0,0,0.2)] overflow-hidden">
      <div className="p-5 lg:p-6 space-y-5">
        {/* Area */}
        <div>
          <Label icon={<MapPin className="w-3.5 h-3.5" />}>Where</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {AREAS.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => setArea(a.value)}
                className={chip(area === a.value, "text-left")}
              >
                <div className="font-semibold text-sm">{a.label}</div>
                <div className="text-[0.7rem] font-normal text-foreground/45 mt-0.5">{a.hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <Label icon={<CalendarRange className="w-3.5 h-3.5" />}>How long</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDuration(d.value)}
                className={chip(duration === d.value, "flex items-center justify-between text-sm font-semibold")}
              >
                <span>{d.label}</span>
                {duration === d.value && <Check className="w-3.5 h-3.5 text-coral" />}
              </button>
            ))}
          </div>
        </div>

        {/* Tier */}
        <div>
          <Label icon={<Sparkles className="w-3.5 h-3.5" />}>How hands-on</Label>
          <div className="grid gap-2 mt-2">
            {TIERS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTier(t.value)}
                className={chip(tier === t.value, "text-left")}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{t.name}</span>
                  <span className="text-[0.7rem] font-semibold text-foreground/50">
                    from {formatPrice(t.base)}
                  </span>
                </div>
                <div className="text-[0.72rem] text-foreground/50 mt-0.5">{t.tagline}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live total */}
      <div className="bg-foreground text-white p-5 lg:p-6">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/50">
            {selected.name} · {areaLabel}
          </span>
          <motion.span
            key={price}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[1.75rem] font-bold tracking-tight"
          >
            {formatPrice(price)}
            <span className="text-[0.7rem] font-medium text-white/50 ml-1">pp</span>
          </motion.span>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-white/60 mb-4">
          {selected.includes.map((line) => (
            <li key={line} className="flex items-center gap-1.5">
              <Check className="w-3 h-3 text-coral" />
              {line}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={checkoutHref}
            className="group inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/30 hover:shadow-coral/50 hover:scale-[1.02] transition-all"
          >
            Book this
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function Label({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground/45">
      {icon}
      {children}
    </div>
  );
}

function chip(selected: boolean, extra = "") {
  return `px-3 py-2.5 rounded-xl border transition-all ${extra} ${
    selected
      ? "border-coral bg-coral/5 text-foreground"
      : "border-foreground/[0.08] text-foreground/70 hover:border-foreground/20 hover:bg-sand/40"
  }`;
}
