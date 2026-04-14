"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";

type Event = {
  name: string;
  city: string;
  action: string;
  ago: string;
};

const EVENTS: Event[] = [
  { name: "Sarah", city: "Berlin", action: "booked Arrival Essentials", ago: "2 min ago" },
  { name: "Marco", city: "Milan", action: "grabbed the Full Stay Pass", ago: "5 min ago" },
  { name: "Amélie", city: "Paris", action: "booked a scooter in Canggu", ago: "7 min ago" },
  { name: "Jake", city: "Sydney", action: "activated an eSIM", ago: "11 min ago" },
  { name: "Lina", city: "Amsterdam", action: "booked Arrival Essentials", ago: "14 min ago" },
  { name: "Tomás", city: "Lisbon", action: "unlocked the Trip Guide", ago: "18 min ago" },
  { name: "Yuki", city: "Tokyo", action: "added a welcome spa", ago: "22 min ago" },
  { name: "Emma", city: "London", action: "booked the Full Stay Pass", ago: "26 min ago" },
];

export default function SocialProof() {
  const [idx, setIdx] = useState(-1);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const start = setTimeout(() => setIdx(0), 4000);
    return () => clearTimeout(start);
  }, [dismissed]);

  useEffect(() => {
    if (dismissed || idx < 0) return;
    const cycle = setTimeout(() => {
      // hide briefly, then advance
      setIdx(-2);
      setTimeout(() => setIdx((i) => (i < 0 ? 1 : (i + 1) % EVENTS.length)), 600);
    }, 5500);
    return () => clearTimeout(cycle);
  }, [idx, dismissed]);

  const e = idx >= 0 ? EVENTS[idx] : null;

  return (
    <div className="fixed bottom-4 left-4 z-40 pointer-events-none">
      <AnimatePresence>
        {e && !dismissed && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto bg-white/95 backdrop-blur border border-foreground/[0.06] shadow-[0_10px_40px_-8px_rgba(0,0,0,0.15)] rounded-2xl px-4 py-3 flex items-center gap-3 max-w-[19rem]"
          >
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-coral to-gold flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.78rem] font-semibold text-foreground leading-tight">
                {e.name} from {e.city}
              </p>
              <p className="text-[0.72rem] text-foreground/55 leading-tight mt-0.5 truncate">
                {e.action} · {e.ago}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="text-foreground/30 hover:text-foreground/60 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
