"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Shield,
  Check,
  ChevronRight,
  Bike,
  Star,
  Fuel,
  Wrench,
} from "lucide-react";

const scooters = [
  {
    id: "scoopy",
    name: "Honda Scoopy 110cc",
    tagline: "Easy rider",
    price: 5,
    image: "🛵",
    features: ["Automatic", "Light & agile", "Great for town"],
    specs: { engine: "110cc", fuel: "3.5L tank", weight: "93 kg", storage: "Small" },
    popular: false,
  },
  {
    id: "nmax",
    name: "Yamaha NMAX 155cc",
    tagline: "Best seller",
    price: 8,
    image: "🏍️",
    features: ["ABS brakes", "USB charger", "Comfortable seat", "Long range"],
    specs: { engine: "155cc", fuel: "7.1L tank", weight: "127 kg", storage: "Large" },
    popular: true,
  },
  {
    id: "pcx",
    name: "Honda PCX 160cc",
    tagline: "Premium touring",
    price: 12,
    image: "🏎️",
    features: ["Keyless ignition", "Traction control", "LED lights", "Smooth ride"],
    specs: { engine: "160cc", fuel: "8.1L tank", weight: "132 kg", storage: "Extra large" },
    popular: false,
  },
];

export default function ScooterPage() {
  const [step, setStep] = useState(1);
  const [selectedScooter, setSelectedScooter] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [address, setAddress] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selected = scooters.find((s) => s.id === selectedScooter);
  const days = startDate && endDate
    ? Math.max(1, Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))
    : 0;
  const total = selected ? selected.price * days : 0;

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-coral transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          {/* Progress */}
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s ? "bg-coral text-white" : "bg-sand text-foreground/30"
                }`}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-coral" : "bg-sand"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: Choose scooter */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Choose your ride</h1>
              <p className="text-foreground/50 mb-8">All scooters include insurance, 2 helmets, phone mount, and 24/7 roadside assistance.</p>

              <div className="grid sm:grid-cols-3 gap-5">
                {scooters.map((scooter) => (
                  <button
                    key={scooter.id}
                    onClick={() => setSelectedScooter(scooter.id)}
                    className={`relative text-left p-6 rounded-2xl border-2 transition-all ${
                      selectedScooter === scooter.id
                        ? "border-coral bg-coral/5 shadow-lg shadow-coral/10"
                        : "border-foreground/5 bg-white hover:border-coral/20"
                    }`}
                  >
                    {scooter.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-coral text-white text-xs font-bold">
                        Most Popular
                      </div>
                    )}
                    <div className="text-4xl mb-4">{scooter.image}</div>
                    <h3 className="font-bold text-lg">{scooter.name}</h3>
                    <p className="text-sm text-foreground/40 mb-3">{scooter.tagline}</p>
                    <div className="text-2xl font-bold text-coral mb-4">
                      ${scooter.price}<span className="text-sm text-foreground/30 font-normal">/day</span>
                    </div>
                    <ul className="space-y-1.5">
                      {scooter.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/50">
                          <Check className="w-3.5 h-3.5 text-emerald shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => selectedScooter && setStep(2)}
                  disabled={!selectedScooter}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-coral to-coral-dark text-white font-semibold shadow-lg shadow-coral/25 hover:shadow-coral/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Dates & address */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">When & where?</h1>
              <p className="text-foreground/50 mb-8">We&apos;ll deliver the scooter directly to your accommodation.</p>

              <div className="max-w-lg space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" /> Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/30 focus:ring-2 focus:ring-coral/10 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" /> End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/30 focus:ring-2 focus:ring-coral/10 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/60 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" /> Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="Villa name, street address, or hotel..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/30 focus:ring-2 focus:ring-coral/10 text-sm"
                  />
                  <p className="text-xs text-foreground/30 mt-1">
                    Delivery available in Canggu, Seminyak, Kuta, and Ubud
                  </p>
                </div>

                {/* Included */}
                <div className="p-4 rounded-xl bg-emerald/5 border border-emerald/10">
                  <p className="text-sm font-semibold text-emerald mb-2">Included with every rental:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Full insurance", "2 premium helmets", "Phone mount", "Rain poncho", "24/7 support", "Free delivery"].map((item) => (
                      <span key={item} className="flex items-center gap-1.5 text-xs text-foreground/50">
                        <Check className="w-3 h-3 text-emerald" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-3 rounded-full border border-foreground/10 text-foreground/60 font-medium text-sm hover:border-coral/20 transition-colors">
                  Back
                </button>
                <button
                  onClick={() => startDate && endDate && address && setStep(3)}
                  disabled={!startDate || !endDate || !address}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-coral to-coral-dark text-white font-semibold shadow-lg shadow-coral/25 transition-all disabled:opacity-30 flex items-center gap-2"
                >
                  Review Order <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Confirmation */}
          {step === 3 && !confirmed && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Review & confirm</h1>
              <p className="text-foreground/50 mb-8">Double-check your booking details before confirming.</p>

              <div className="max-w-lg">
                <div className="bg-white rounded-2xl border border-foreground/5 p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4 pb-4 border-b border-foreground/5">
                    <div className="text-3xl">{selected?.image}</div>
                    <div>
                      <h3 className="font-bold">{selected?.name}</h3>
                      <p className="text-sm text-foreground/40">via Bali Ride Co.</p>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="font-bold text-coral">${selected?.price}/day</div>
                      <div className="text-xs text-foreground/30 flex items-center gap-1">
                        <Star className="w-3 h-3 text-gold fill-gold" /> 4.8 (342)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/50 flex items-center gap-2"><Calendar className="w-4 h-4" /> Dates</span>
                      <span className="font-medium">{startDate} → {endDate} ({days} days)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50 flex items-center gap-2"><MapPin className="w-4 h-4" /> Delivery</span>
                      <span className="font-medium max-w-[200px] text-right">{address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50 flex items-center gap-2"><Shield className="w-4 h-4" /> Insurance</span>
                      <span className="font-medium text-emerald">Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50 flex items-center gap-2"><Fuel className="w-4 h-4" /> Fuel</span>
                      <span className="font-medium text-emerald">Free full tank (Balloon deal)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50 flex items-center gap-2"><Wrench className="w-4 h-4" /> Support</span>
                      <span className="font-medium">24/7 roadside assistance</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-foreground/5 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-coral">${total}</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={() => setStep(2)} className="px-6 py-3 rounded-full border border-foreground/10 text-foreground/60 font-medium text-sm">
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-coral to-coral-dark text-white font-semibold shadow-lg shadow-coral/25 hover:shadow-coral/40 transition-all flex items-center gap-2"
                  >
                    <Bike className="w-4 h-4" /> Confirm Booking
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Confirmed */}
          {confirmed && (
            <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-emerald" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-foreground/50 mb-2">
                Your {selected?.name} will be delivered to your address on {startDate}.
              </p>
              <p className="text-sm text-foreground/30">Redirecting to dashboard...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
