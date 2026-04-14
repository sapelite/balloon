"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "When will Balloon be available?", a: "We're launching in Q3 2026. Join the waitlist for early access pricing and be the first to try it." },
  { q: "How does the eSIM work?", a: "After booking, you receive a QR code via email. Scan it before boarding — your data plan activates automatically when your plane lands. No physical SIM needed." },
  { q: "Is the airport transfer a shared shuttle?", a: "No. Every transfer is a private car with a driver waiting at arrivals with your name. Direct ride to your accommodation." },
  { q: "Can I book just a scooter without the full package?", a: "Absolutely. Every service is available à la carte. The Arrival Essentials bundle simply offers a better price for the three most-requested services." },
  { q: "What scooter models are available?", a: "Honda Scoopy, Yamaha NMAX, and Honda PCX. All include helmets, insurance, phone mount, and roadside assistance." },
  { q: "How do the partner deals (Bali Pass) work?", a: "Your Bali Pass generates a unique QR code. Show it at partner venues — beach clubs, spas, restaurants — for instant 10-15% discounts and queue skip." },
  { q: "Is there customer support?", a: "Yes. 24/7 chat concierge in English, French, and Bahasa Indonesia. Plus a one-tap SOS button for emergencies." },
  { q: "How do I become a partner?", a: "Free listing for the first 6 months. After that, a simple commission model — you only pay when Balloon brings you a customer." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start justify-between gap-4 p-5 text-left rounded-xl transition-colors duration-200 ${
          open ? "bg-coral/[0.04]" : "hover:bg-foreground/[0.02]"
        }`}
      >
        <span className={`font-semibold text-[0.9rem] leading-relaxed transition-colors ${open ? "text-coral" : ""}`}>
          {q}
        </span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
          open ? "bg-coral text-white rotate-0" : "bg-foreground/[0.04] text-foreground/30"
        }`}>
          {open ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-[0.85rem] text-foreground/50 leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-card relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-foreground/[0.06] to-transparent" />

      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[0.75rem] font-semibold text-coral uppercase tracking-[0.15em] mb-3">
            Got questions?
          </span>
          <h2 className="text-[2rem] sm:text-[2.5rem] font-bold tracking-[-0.03em]">
            Frequently asked questions
          </h2>
        </motion.div>

        <div className="bg-background rounded-2xl border border-foreground/[0.04] p-2 divide-y-0">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
