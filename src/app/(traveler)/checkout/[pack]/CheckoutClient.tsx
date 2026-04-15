"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Shield,
  Sparkles,
  Bike,
  Flower2,
  Waves,
  CreditCard,
  Lock,
  MapPin,
  Calendar,
  Star,
  Gift,
  Clock,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";
import { whatsappHref } from "@/lib/handoff";

type Pack = "lite" | "essentials" | "full";

const PACK_META: Record<Pack, { label: string; tagline: string; price: number; includes: string[]; includesScooter: boolean }> = {
  lite: {
    label: "Bali Lite",
    tagline: "eSIM + Interactive guide",
    price: 19,
    includes: ["eSIM 14-day (25GB)", "Interactive trip guide", "Offline area map"],
    includesScooter: false,
  },
  essentials: {
    label: "Arrival Essentials",
    tagline: "The one everyone picks",
    price: 89,
    includes: [
      "eSIM 14-day (25GB)",
      "Private airport transfer",
      "Scooter delivered to your villa",
      "Interactive trip guide",
      "24/7 chat concierge",
    ],
    includesScooter: true,
  },
  full: {
    label: "Full Stay Pass",
    tagline: "VIP everything",
    price: 199,
    includes: [
      "Everything in Essentials",
      "Priority WhatsApp concierge",
      "Free spa session (60min)",
      "Queue skip at partner beach clubs",
      "-15% at all partner venues",
    ],
    includesScooter: true,
  },
};

const ADDONS = [
  { id: "scooter_upgrade", label: "Upgrade to Honda PCX 160cc", sub: "Keyless, ABS, more comfort", price: 20, icon: Bike, popular: true },
  { id: "spa", label: "Welcome spa session (60min)", sub: "Zen Garden Spa in Ubud", price: 29, icon: Flower2, popular: false },
  { id: "beach_vip", label: "Beach club VIP queue-skip", sub: "Coral Beach Club, Seminyak", price: 19, icon: Waves, popular: false },
  { id: "insurance", label: "Travel insurance (7 days)", sub: "Medical + trip cancellation", price: 14, icon: Shield, popular: false },
] as const;

const AREAS = [
  { id: "canggu", label: "Canggu", hint: "Surfer · cafés · digital nomads" },
  { id: "seminyak", label: "Seminyak", hint: "Beach clubs · shopping · upscale" },
  { id: "ubud", label: "Ubud", hint: "Jungle · yoga · culture" },
  { id: "uluwatu", label: "Uluwatu", hint: "Cliffs · surf · sunsets" },
  { id: "kuta", label: "Kuta", hint: "Budget · beginner-surf · buzz" },
  { id: "nusa_dua", label: "Nusa Dua", hint: "Resorts · calm · families" },
] as const;

const SCOOTERS = [
  { id: "scoopy", label: "Honda Scoopy 110cc", note: "Light · easy", priceDay: 5 },
  { id: "nmax", label: "Yamaha NMAX 155cc", note: "Most popular", priceDay: 8 },
  { id: "pcx", label: "Honda PCX 160cc", note: "Premium · comfort", priceDay: 12 },
] as const;

type AddonId = (typeof ADDONS)[number]["id"];
type AreaId = (typeof AREAS)[number]["id"];
type ScooterId = (typeof SCOOTERS)[number]["id"];

const today = () => new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
const plus = (iso: string, d: number) =>
  new Date(new Date(iso).getTime() + d * 86400000).toISOString().slice(0, 10);

export default function CheckoutClient({
  pack,
  user,
}: {
  pack: Pack;
  user: { email: string; name: string | null } | null;
}) {
  const meta = PACK_META[pack];
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState(today());
  const [days, setDays] = useState(14);
  const [area, setArea] = useState<AreaId>("canggu");
  const [address, setAddress] = useState("");
  const [scooterId, setScooterId] = useState<ScooterId>("nmax");
  const [addons, setAddons] = useState<AddonId[]>([]);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [card, setCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ orderRef: string; total: number } | null>(null);

  const endDate = useMemo(() => plus(startDate, days), [startDate, days]);
  const addonTotal = useMemo(
    () => addons.reduce((s, a) => s + (ADDONS.find((x) => x.id === a)?.price || 0), 0),
    [addons]
  );
  const total = meta.price + addonTotal;

  // Perceived savings — what this would cost separately, heuristic
  const separateCost = useMemo(() => {
    const esim = 15;
    const transfer = pack !== "lite" ? 25 : 0;
    const scooter = meta.includesScooter ? (SCOOTERS.find((s) => s.id === scooterId)?.priceDay || 0) * days : 0;
    const concierge = pack === "full" ? 40 : 0;
    const spa = pack === "full" ? 45 : 0;
    const booking_fees = Math.round((esim + transfer + scooter + concierge + spa) * 0.08);
    return Math.max(total + 5, esim + transfer + scooter + concierge + spa + booking_fees);
  }, [days, scooterId, meta.includesScooter, pack, total]);

  const savings = Math.max(0, separateCost - total);

  function toggleAddon(id: AddonId) {
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pack,
          scooterId,
          startDate,
          endDate,
          address: address || `${AREAS.find((a) => a.id === area)?.label}, Bali`,
          area,
          addons,
          email: user ? undefined : email,
          name: user ? undefined : name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      setSuccess({ orderRef: data.orderRef, total: data.total });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/#pricing" className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-coral transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex items-center gap-2 text-xs text-foreground/40">
            <Lock className="w-3.5 h-3.5" /> Secure checkout
          </div>
        </div>
        {/* Progress */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-4">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                    step >= s ? "bg-coral text-white" : "bg-sand text-foreground/30"
                  }`}
                >
                  {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                </div>
                <div className={`flex-1 h-0.5 rounded-full transition-colors ${step > s ? "bg-coral" : "bg-sand"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        {success ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-emerald" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">You&apos;re all set, {name || "traveler"} 🎉</h1>
            <p className="text-foreground/60 max-w-lg mx-auto mb-6">
              Your {meta.label} pack is confirmed. We&apos;re DMing you now on WhatsApp —
              expect a reply within 2 minutes to lock the details.
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-foreground/5 mb-8">
              <span className="text-xs text-foreground/40">Order</span>
              <span className="font-mono font-bold text-sm">{success.orderRef}</span>
              <span className="w-px h-4 bg-foreground/10" />
              <span className="font-bold text-coral">${success.total}</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={whatsappHref(
                  `Hi Skyrol — order ${success.orderRef}, ${meta.label}. Here to confirm details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all"
              >
                Open WhatsApp
              </a>
              <Link href="/guides" className="px-6 py-3 rounded-full bg-coral text-white font-semibold text-sm hover:bg-coral-dark transition-colors">
                Open your guides →
              </Link>
              <Link href="/dashboard" className="px-6 py-3 rounded-full bg-foreground/5 font-semibold text-sm hover:bg-foreground/10 transition-colors">
                Dashboard
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Left: steps */}
            <div>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">When are you coming to Bali?</h1>
                    <p className="text-foreground/50 mb-6">We deliver everything to your door the day you land.</p>

                    <div className="space-y-5">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-foreground/40 mb-2 block">Arrival date</label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 pointer-events-none" />
                          <input
                            type="date"
                            value={startDate}
                            min={today()}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-foreground/40 mb-2 flex items-center justify-between">
                          <span>Trip length</span>
                          <span className="text-coral font-bold text-sm">{days} days</span>
                        </label>
                        <input
                          type="range"
                          min={3}
                          max={60}
                          value={days}
                          onChange={(e) => setDays(parseInt(e.target.value))}
                          className="w-full accent-coral"
                        />
                        <div className="flex justify-between text-xs text-foreground/30 mt-1">
                          <span>3d</span><span>14d</span><span>30d</span><span>60d</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-foreground/40 mb-2 block">Where are you staying?</label>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {AREAS.map((a) => {
                            const active = area === a.id;
                            return (
                              <button
                                key={a.id}
                                onClick={() => setArea(a.id)}
                                className={`text-left p-3 rounded-xl border-2 transition-all ${
                                  active ? "border-coral bg-coral/5" : "border-foreground/5 bg-white hover:border-foreground/20"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className={`font-semibold text-sm ${active ? "text-coral" : ""}`}>{a.label}</span>
                                  {active && <Check className="w-4 h-4 text-coral" />}
                                </div>
                                <span className="text-xs text-foreground/40">{a.hint}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-foreground/40 mb-2 block">Address (optional, share later via WhatsApp)</label>
                        <input
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Villa Name, Jl. …"
                          className="w-full px-4 py-3.5 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all"
                        />
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 rounded-full bg-linear-to-r from-coral to-coral-dark text-white font-semibold text-sm shadow-lg shadow-coral/20 hover:shadow-coral/40 transition-all flex items-center gap-2"
                      >
                        Continue <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Make it your trip.</h1>
                    <p className="text-foreground/50 mb-6">Optional add-ons — skip anything you don&apos;t want.</p>

                    {meta.includesScooter && (
                      <div className="mb-6">
                        <label className="text-xs uppercase tracking-wider font-bold text-foreground/40 mb-2 block">Pick your scooter</label>
                        <div className="grid sm:grid-cols-3 gap-2">
                          {SCOOTERS.map((s) => {
                            const active = scooterId === s.id;
                            return (
                              <button
                                key={s.id}
                                onClick={() => setScooterId(s.id)}
                                className={`text-left p-3 rounded-xl border-2 transition-all relative ${
                                  active ? "border-coral bg-coral/5" : "border-foreground/5 bg-white hover:border-foreground/20"
                                }`}
                              >
                                <Bike className="w-5 h-5 mb-2 text-coral" />
                                <div className="font-semibold text-sm">{s.label}</div>
                                <div className="text-xs text-foreground/40">{s.note}</div>
                                {active && <Check className="w-4 h-4 text-coral absolute top-2 right-2" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      {ADDONS.map((a) => {
                        const active = addons.includes(a.id);
                        return (
                          <button
                            key={a.id}
                            onClick={() => toggleAddon(a.id)}
                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                              active ? "border-coral bg-coral/5" : "border-foreground/5 bg-white hover:border-foreground/20"
                            }`}
                          >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-coral text-white" : "bg-foreground/5 text-foreground/60"}`}>
                              <a.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-sm">{a.label}</span>
                                {a.popular && (
                                  <span className="text-[0.6rem] font-bold uppercase tracking-wider text-coral bg-coral/10 px-2 py-0.5 rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-foreground/50 mt-0.5">{a.sub}</p>
                            </div>
                            <div className="shrink-0 text-right">
                              <div className="font-bold text-sm">+${a.price}</div>
                              <div
                                className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                                  active ? "border-coral bg-coral" : "border-foreground/20"
                                }`}
                              >
                                {active && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex justify-between">
                      <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border border-foreground/10 text-foreground/60 font-semibold text-sm">
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="px-6 py-3 rounded-full bg-linear-to-r from-coral to-coral-dark text-white font-semibold text-sm shadow-lg shadow-coral/20 hover:shadow-coral/40 transition-all flex items-center gap-2"
                      >
                        Review order <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">Payment</h1>
                    <p className="text-foreground/50 mb-6">Demo checkout — no real card is charged.</p>

                    {!user && (
                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="px-4 py-3.5 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="px-4 py-3.5 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all"
                        />
                      </div>
                    )}

                    <div className="bg-white rounded-2xl border border-foreground/5 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="w-4 h-4 text-foreground/40" />
                        <span className="text-sm font-semibold">Card details</span>
                        <span className="ml-auto text-xs text-emerald flex items-center gap-1">
                          <Lock className="w-3 h-3" /> 256-bit SSL
                        </span>
                      </div>
                      <input
                        value={card}
                        onChange={(e) => setCard(e.target.value.replace(/[^\d ]/g, ""))}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        className="w-full px-4 py-3.5 rounded-xl bg-sand border border-transparent focus:bg-white focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all font-mono"
                      />
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <input placeholder="MM / YY" className="px-4 py-3.5 rounded-xl bg-sand border border-transparent focus:bg-white focus:border-coral/50 transition-all" />
                        <input placeholder="CVC" className="px-4 py-3.5 rounded-xl bg-sand border border-transparent focus:bg-white focus:border-coral/50 transition-all" />
                      </div>
                    </div>

                    <div className="mt-4 flex items-start gap-3 p-3 rounded-xl bg-emerald/5 border border-emerald/10">
                      <Shield className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald/90">
                        <strong>7-day money-back guarantee</strong> — if we miss a single thing on arrival day, full refund.
                      </p>
                    </div>

                    {error && <p className="text-sm text-red-500 mt-4 text-center">{error}</p>}

                    <div className="mt-8 flex justify-between">
                      <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-foreground/10 text-foreground/60 font-semibold text-sm">
                        Back
                      </button>
                      <button
                        onClick={submit}
                        disabled={loading}
                        className="px-8 py-3 rounded-full bg-linear-to-r from-coral to-coral-dark text-white font-semibold text-sm shadow-lg shadow-coral/30 hover:shadow-coral/50 transition-all flex items-center gap-2 disabled:opacity-60"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing…
                          </>
                        ) : (
                          <>
                            Pay ${total} <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: sticky summary */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="bg-white rounded-2xl border border-foreground/5 overflow-hidden shadow-sm">
                <div className="p-5 bg-linear-to-br from-foreground to-[#2A2A4E] text-white">
                  <div className="flex items-center gap-2 mb-1 text-xs uppercase tracking-wider text-white/50 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-coral" /> Your order
                  </div>
                  <h3 className="text-lg font-bold">{meta.label}</h3>
                  <p className="text-xs text-white/60">{meta.tagline}</p>
                </div>

                <div className="p-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{meta.label}</span>
                    <span className="font-semibold">${meta.price}</span>
                  </div>
                  {addons.map((id) => {
                    const a = ADDONS.find((x) => x.id === id)!;
                    return (
                      <div key={id} className="flex justify-between text-foreground/60">
                        <span>+ {a.label}</span>
                        <span>${a.price}</span>
                      </div>
                    );
                  })}

                  <div className="pt-3 border-t border-foreground/5 space-y-1">
                    <div className="flex justify-between text-xs text-foreground/40">
                      <span>Separately</span>
                      <span className="line-through">${separateCost}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-coral">${total}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald font-semibold">
                        <TrendingUp className="w-3.5 h-3.5" /> You save ${savings}
                      </div>
                    )}
                  </div>
                </div>

                {/* Trip summary chip */}
                <div className="px-5 pb-5">
                  <div className="text-[0.7rem] uppercase tracking-wider font-bold text-foreground/40 mb-2">Your trip</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-foreground/60"><Calendar className="w-3.5 h-3.5" /> {startDate} → {endDate} · {days}d</div>
                    <div className="flex items-center gap-2 text-foreground/60"><MapPin className="w-3.5 h-3.5" /> {AREAS.find((a) => a.id === area)?.label}</div>
                  </div>
                </div>

                {/* Trust bar */}
                <div className="border-t border-foreground/5 p-4 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <BadgeCheck className="w-4 h-4 text-emerald" />
                    <span className="text-[0.65rem] font-semibold text-foreground/60">Verified partners</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Clock className="w-4 h-4 text-lagoon" />
                    <span className="text-[0.65rem] font-semibold text-foreground/60">Arrives on landing</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Gift className="w-4 h-4 text-gold" />
                    <span className="text-[0.65rem] font-semibold text-foreground/60">7-day refund</span>
                  </div>
                </div>
              </div>

              {/* Live social proof */}
              <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-white border border-foreground/5">
                <div className="flex -space-x-2">
                  {["bg-coral", "bg-lagoon", "bg-gold"].map((c, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${c}/20 border-2 border-white flex items-center justify-center text-[0.65rem] font-bold ${c.replace("bg-", "text-")}`}>
                      {["S", "M", "J"][i]}
                    </div>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold">37 travelers booked this week</p>
                  <p className="text-[0.7rem] text-foreground/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-gold text-gold" /> 4.9/5 from 892 reviews
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
