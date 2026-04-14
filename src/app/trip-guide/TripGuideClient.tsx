"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Lightbulb,
  MapPin,
  Tag,
  Sparkles,
  Bike,
  Wifi,
  Car,
  Utensils,
  Waves,
  Flower2,
  Shield,
  AlertTriangle,
  Smartphone,
  DollarSign,
  Sun,
  Coffee,
  Mountain,
  Palmtree,
  Church,
  Check,
  ChevronRight,
  Star,
} from "lucide-react";

type Partner = {
  id: string;
  name: string;
  slug: string;
  category: string;
  area: string;
  location: string;
  discount: string | null;
  rating: number;
  priceRange: string | null;
};

type UserShape = {
  id: string;
  email: string;
  name: string | null;
} | null;

type TabId = "tips" | "spots" | "deals" | "vip";

const packs: { id: string; label: string; price: string; tagline: string; sections: TabId[] }[] = [
  {
    id: "lite",
    label: "Bali Lite",
    price: "$19",
    tagline: "eSIM + Guide",
    sections: ["tips", "spots"],
  },
  {
    id: "essentials",
    label: "Arrival Essentials",
    price: "$89",
    tagline: "eSIM + Transfer + Scooter",
    sections: ["tips", "spots", "deals"],
  },
  {
    id: "full",
    label: "Full Stay Pass",
    price: "$199",
    tagline: "Everything + priority",
    sections: ["tips", "spots", "deals", "vip"],
  },
];

const tips = [
  {
    icon: Smartphone,
    color: "bg-emerald/10 text-emerald",
    title: "Gojek & Grab are your best friends",
    body: "Download both BEFORE you land. Food, rides, groceries, even massages. Cash or card. Way cheaper than taxis.",
    tag: "Essential",
  },
  {
    icon: AlertTriangle,
    color: "bg-coral/10 text-coral",
    title: "Canggu–Seminyak traffic = hell 4–7pm",
    body: "Plan your south moves in the morning or evening. A 6km ride can take 90min. Scooter is fastest.",
    tag: "Traffic",
  },
  {
    icon: DollarSign,
    color: "bg-gold/10 text-gold",
    title: "Always carry small cash (10–50k IDR)",
    body: "Warungs, parking attendants, beach showers — they rarely take card. ATM BCA/Mandiri = safe. Avoid street ATMs.",
    tag: "Money",
  },
  {
    icon: Bike,
    color: "bg-lagoon/10 text-lagoon",
    title: "Scooter helmet ALWAYS",
    body: "Cops WILL stop you. €25 on the spot 'fine'. Also — you're safer. Never rent without checking brakes & lights first.",
    tag: "Scooter",
  },
  {
    icon: Sun,
    color: "bg-coral/10 text-coral",
    title: "Sun is brutal from 11am to 3pm",
    body: "Reef-safe SPF50. Sunglasses. Hydrate with coconut water (5–10k IDR anywhere). Tropical sun burns fast.",
    tag: "Health",
  },
  {
    icon: Shield,
    color: "bg-emerald/10 text-emerald",
    title: "Keep a photo of passport + visa",
    body: "Police checkpoints exist. Never hand over original — show the photo. Also save emergency numbers offline.",
    tag: "Safety",
  },
  {
    icon: Coffee,
    color: "bg-gold/10 text-gold",
    title: "Bintang is 25k at warung, 60k at clubs",
    body: "Same beer, 3x price. Pre-game at warungs, club for vibes only. Arak is local rum — cheap but strong.",
    tag: "Nightlife",
  },
  {
    icon: Waves,
    color: "bg-lagoon/10 text-lagoon",
    title: "Surf beginner? Go Kuta. Intermediate? Canggu. Pro? Uluwatu",
    body: "Rip currents are real. Respect red flags. Local surf schools are gold — 300k IDR for 2h.",
    tag: "Surf",
  },
];

const spots = [
  {
    area: "Canggu",
    icon: Palmtree,
    color: "from-coral/20 to-gold/20",
    vibe: "Digital nomad · Surf · Cafés",
    mustDo: [
      "Watch sunset at Echo Beach with a Bintang",
      "Brunch at Crate or Milu by Nook",
      "Sunday sessions at La Brisa",
    ],
    food: "Warung Sunset (cheap local), Shady Shack (vegan)",
    avoid: "Don't drive the main Batu Bolong road at 5pm. Use Pererenan bypass.",
  },
  {
    area: "Uluwatu",
    icon: Mountain,
    color: "from-lagoon/20 to-coral/20",
    vibe: "Cliffs · World-class surf · Sunset",
    mustDo: [
      "Uluwatu Temple + Kecak fire dance at 6pm",
      "Single Fin Sundays if you like crowds",
      "Swim at Padang Padang or Nyang Nyang",
    ],
    food: "Drifter Cafe, The Loft, Warung Local",
    avoid: "Monkeys at the temple STEAL sunglasses & phones. Stash them.",
  },
  {
    area: "Ubud",
    icon: Flower2,
    color: "from-emerald/20 to-gold/20",
    vibe: "Jungle · Yoga · Culture",
    mustDo: [
      "Tegalalang rice terraces at 7am (before buses)",
      "Campuhan Ridge Walk at sunrise",
      "Sunday market at Ubud Food Market",
    ],
    food: "Nasi Campur House (authentic), Clear Cafe (healthy)",
    avoid: "Monkey Forest — keep bags ZIPPED. They can unzip them.",
  },
  {
    area: "Seminyak",
    icon: Waves,
    color: "from-gold/20 to-coral/20",
    vibe: "Beach clubs · Shopping · Upscale",
    mustDo: [
      "Sunset cocktail at Potato Head or Ku De Ta",
      "Shop Seminyak Square for local brands",
      "Double Six Beach sunset walk",
    ],
    food: "Sisterfields (brunch), Mama San (Asian fusion)",
    avoid: "Beach club deposits can be 500k+. Check minimum spend before sitting.",
  },
  {
    area: "Nusa Penida",
    icon: Mountain,
    color: "from-lagoon/20 to-emerald/20",
    vibe: "Day trip · Crystal waters · Epic cliffs",
    mustDo: [
      "Kelingking Beach (the T-Rex viewpoint)",
      "Angel's Billabong + Broken Beach combo",
      "Snorkel with manta rays at Manta Point",
    ],
    food: "Bring snacks. Penida Colada for sunset.",
    avoid: "The boat from Sanur can be ROUGH. Take Dramamine if you get seasick.",
  },
  {
    area: "Sidemen / East Bali",
    icon: Church,
    color: "from-emerald/20 to-lagoon/20",
    vibe: "Off-beat · Rice fields · Quiet",
    mustDo: [
      "Sunrise trek Mt. Batur (4am start, 1000m)",
      "Tirta Gangga water palace",
      "Lempuyang 'Gates of Heaven' (skip the fake reflection!)",
    ],
    food: "Roadside warungs — 15-25k for nasi goreng",
    avoid: "Mt. Agung is closed if rumbling. Always check volcano alerts.",
  },
];

const categoryMeta: Record<string, { label: string; icon: typeof Bike; color: string }> = {
  scooter: { label: "Scooter", icon: Bike, color: "text-coral" },
  transport: { label: "Transfer", icon: Car, color: "text-lagoon" },
  telecom: { label: "eSIM", icon: Wifi, color: "text-emerald" },
  villa: { label: "Villa", icon: MapPin, color: "text-gold" },
  restaurant: { label: "Food", icon: Utensils, color: "text-coral" },
  beach_club: { label: "Beach Club", icon: Waves, color: "text-lagoon" },
  spa: { label: "Spa", icon: Flower2, color: "text-emerald" },
  insurance: { label: "Insurance", icon: Shield, color: "text-foreground/60" },
};

const areaLabel: Record<string, string> = {
  canggu: "Canggu",
  seminyak: "Seminyak",
  ubud: "Ubud",
  kuta: "Kuta",
  uluwatu: "Uluwatu",
  nusa_dua: "Nusa Dua",
};

export default function TripGuideClient({
  user,
  initialPack,
  partners,
}: {
  user: UserShape;
  initialPack: string;
  partners: Partner[];
}) {
  const [pack, setPack] = useState(initialPack);
  const [tab, setTab] = useState<TabId>("tips");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [savingPack, setSavingPack] = useState(false);

  const currentPack = packs.find((p) => p.id === pack) || packs[1];
  const availableTabs: TabId[] = (["tips", "spots", "deals", "vip"] as TabId[]).filter((t) =>
    currentPack.sections.includes(t)
  );

  async function changePack(newPack: string) {
    setPack(newPack);
    setSavingPack(true);
    await fetch("/api/pack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pack: newPack }),
    });
    setSavingPack(false);
    if (!availableTabs.includes(tab)) setTab("tips");
  }

  const dealPartners = useMemo(
    () => partners.filter((p) => p.discount && (areaFilter === "all" || p.area === areaFilter)),
    [partners, areaFilter]
  );

  const areas = useMemo(() => {
    const set = new Set(partners.map((p) => p.area));
    return Array.from(set);
  }, [partners]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-coral transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="text-xs text-foreground/40">
            {user ? (
              <>Signed in as <span className="text-foreground/70 font-semibold">{user.name?.split(" ")[0] || user.email}</span></>
            ) : (
              <Link href="/auth" className="text-coral font-semibold">Sign in</Link>
            )}
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-coral/5 via-gold/5 to-lagoon/5 border-b border-foreground/5">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-coral rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-lagoon rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-foreground/10 text-xs font-semibold text-foreground/70 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            Your interactive Bali guide
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            {user?.name ? user.name.split(" ")[0] + "'s" : "Your"} Bali <span className="gradient-text">cheat sheet</span>
          </h1>
          <p className="text-foreground/60 max-w-xl">
            No 15-page PDF. Just the stuff that matters — tips, spots, and deals — adapted to your pack.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        {/* Pack selector */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-wider text-foreground/40 font-semibold mb-3">Choose your pack</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {packs.map((p) => {
              const active = p.id === pack;
              return (
                <button
                  key={p.id}
                  onClick={() => changePack(p.id)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all ${
                    active
                      ? "border-coral bg-coral/5 shadow-lg shadow-coral/10"
                      : "border-foreground/5 bg-white hover:border-foreground/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold text-sm ${active ? "text-coral" : "text-foreground/80"}`}>
                      {p.label}
                    </span>
                    {active && <Check className="w-4 h-4 text-coral" />}
                  </div>
                  <p className="text-xs text-foreground/50 mb-2">{p.tagline}</p>
                  <span className={`text-xs font-semibold ${active ? "text-coral" : "text-foreground/40"}`}>{p.price}</span>
                </button>
              );
            })}
          </div>
          {savingPack && <p className="text-xs text-foreground/40 mt-2">Saving…</p>}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {availableTabs.map((t) => {
            const active = tab === t;
            const meta: Record<TabId, { label: string; icon: typeof Lightbulb }> = {
              tips: { label: "Tips", icon: Lightbulb },
              spots: { label: "Spots", icon: MapPin },
              deals: { label: "Deals", icon: Tag },
              vip: { label: "VIP", icon: Sparkles },
            };
            const Icon = meta[t].icon;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  active
                    ? "bg-foreground text-white shadow-md"
                    : "bg-white border border-foreground/10 text-foreground/60 hover:border-foreground/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                {meta[t].label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "tips" && (
              <div className="grid sm:grid-cols-2 gap-4">
                {tips.map((tip, i) => (
                  <motion.div
                    key={tip.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-2xl border border-foreground/5 p-5 hover:shadow-md hover:border-coral/20 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl ${tip.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        <tip.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[0.65rem] uppercase tracking-wider font-bold text-foreground/30">
                            {tip.tag}
                          </span>
                        </div>
                        <h3 className="font-bold text-base mb-1.5 leading-tight">{tip.title}</h3>
                        <p className="text-sm text-foreground/60 leading-relaxed">{tip.body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "spots" && (
              <div className="space-y-5">
                {spots.map((spot, i) => (
                  <motion.div
                    key={spot.area}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-3xl border border-foreground/5 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className={`h-24 bg-gradient-to-br ${spot.color} flex items-end p-5 relative`}>
                      <div className="absolute top-4 right-5 opacity-15">
                        <spot.icon className="w-20 h-20" />
                      </div>
                      <div className="relative">
                        <h3 className="text-2xl font-bold">{spot.area}</h3>
                        <p className="text-xs text-foreground/60 font-semibold">{spot.vibe}</p>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider font-bold text-coral mb-2">Must-do</p>
                        <ul className="space-y-1.5">
                          {spot.mustDo.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-foreground/70">
                              <Check className="w-4 h-4 text-emerald mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-foreground/5">
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-foreground/40 mb-1">Food</p>
                          <p className="text-sm text-foreground/70">{spot.food}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider font-bold text-foreground/40 mb-1">Heads up</p>
                          <p className="text-sm text-foreground/70">{spot.avoid}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "deals" && (
              <div>
                {/* Area filter */}
                <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                  <button
                    onClick={() => setAreaFilter("all")}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      areaFilter === "all" ? "bg-coral text-white" : "bg-white border border-foreground/10 text-foreground/50"
                    }`}
                  >
                    All areas
                  </button>
                  {areas.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAreaFilter(a)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                        areaFilter === a ? "bg-coral text-white" : "bg-white border border-foreground/10 text-foreground/50"
                      }`}
                    >
                      {areaLabel[a] || a}
                    </button>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {dealPartners.length === 0 && (
                    <div className="sm:col-span-2 bg-white rounded-2xl border border-foreground/5 p-10 text-center text-sm text-foreground/40">
                      No deals in this area yet.
                    </div>
                  )}
                  {dealPartners.map((partner, i) => {
                    const meta = categoryMeta[partner.category] || categoryMeta.restaurant;
                    const Icon = meta.icon;
                    return (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={`/partners/${partner.slug}`}
                          className="block bg-white rounded-2xl border border-foreground/5 p-5 hover:shadow-md hover:border-coral/20 transition-all group h-full"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-foreground/5 ${meta.color} flex items-center justify-center`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-[0.65rem] uppercase tracking-wider font-bold text-foreground/40">
                              {meta.label} · {areaLabel[partner.area] || partner.area}
                            </span>
                          </div>
                          <h3 className="font-bold text-base mb-1 group-hover:text-coral transition-colors">
                            {partner.name}
                          </h3>
                          <p className="text-xs text-foreground/40 mb-3 flex items-center gap-1">
                            <Star className="w-3 h-3 text-gold fill-gold" />
                            {partner.rating} · {partner.priceRange || "$$"}
                          </p>
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-coral/5 border border-coral/10">
                            <Tag className="w-4 h-4 text-coral shrink-0" />
                            <span className="text-xs font-semibold text-coral">{partner.discount}</span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === "vip" && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-foreground to-[#2A2A4E] rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-coral/20 blur-[100px]" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      Full Stay Perks
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Unlocked by your pack</h3>
                    <p className="text-white/60 mb-6">Priority support + curated VIP perks while you&apos;re on the island.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: Shield, label: "24/7 priority WhatsApp concierge" },
                        { icon: Car, label: "Free one-way airport transfer" },
                        { icon: Flower2, label: "Complimentary spa session (60 min)" },
                        { icon: Waves, label: "Queue skip at partner beach clubs" },
                      ].map((perk) => (
                        <div key={perk.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                          <div className="w-9 h-9 rounded-lg bg-coral/20 text-coral flex items-center justify-center">
                            <perk.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm text-white/80">{perk.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/partners"
                  className="flex items-center justify-between p-5 rounded-2xl bg-white border border-foreground/5 hover:border-coral/20 hover:shadow-md transition-all group"
                >
                  <div>
                    <p className="font-bold">Browse VIP partner network</p>
                    <p className="text-sm text-foreground/50">Every partner shows your personalized VIP discount.</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground/30 group-hover:text-coral group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-coral/5 to-lagoon/5 border border-coral/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Sparkles className="w-8 h-8 text-coral shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Want more spots?</p>
            <p className="text-sm text-foreground/50">We add new tips every week based on what travelers share.</p>
          </div>
          <Link href="/partners" className="px-5 py-2.5 rounded-full bg-coral text-white font-semibold text-sm hover:bg-coral-dark transition-colors shrink-0">
            See partners
          </Link>
        </div>
      </div>
    </div>
  );
}
