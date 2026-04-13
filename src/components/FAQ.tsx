"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "When will Balloon be available?",
    a: "We're launching in Q3 2026. Join the waitlist now to get early access pricing and be the first to try it before your Bali trip.",
  },
  {
    q: "How does the eSIM work?",
    a: "After booking, you'll receive a QR code via email. Simply scan it before boarding — your data plan activates automatically the moment your plane lands in Bali. No physical SIM needed.",
  },
  {
    q: "Is the airport transfer a shared shuttle?",
    a: "No. Every transfer is a private VTC (voiture de tourisme avec chauffeur). Your driver waits at Ngurah Rai arrivals with your name, and drives you directly to your accommodation.",
  },
  {
    q: "Can I book just a scooter without the full package?",
    a: "Absolutely. Every service is available à la carte. The Arrival Essentials package simply bundles the three most-requested services at a better price.",
  },
  {
    q: "What scooter models are available?",
    a: "Our partners offer Honda Scoopy, Yamaha NMAX, and Honda PCX. All come with helmets, insurance, and roadside assistance included.",
  },
  {
    q: "How do the partner deals (Bali Pass) work?",
    a: "Your Bali Pass generates a unique QR code. Show it at any partner venue — beach clubs, spas, restaurants — for instant discounts (typically 10-15%) and queue skip privileges.",
  },
  {
    q: "Is there customer support if something goes wrong?",
    a: "Yes. Balloon includes 24/7 chat concierge support in English, French, and Bahasa Indonesia. For emergencies, you also get a one-tap SOS button with hospital and embassy contacts.",
  },
  {
    q: "I'm a local business — how do I become a partner?",
    a: "We offer free listing for the first 6 months. After that, it's a simple commission model — you only pay when Balloon brings you a customer. Apply via the Partner section above.",
  },
];

function FAQItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border-b border-foreground/5 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-base group-hover:text-coral transition-colors pr-4">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-foreground/30 transition-transform ${
            open ? "rotate-180 text-coral" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-foreground/55 leading-relaxed max-w-3xl">
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
    <section
      id="faq"
      className="py-24 lg:py-32 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-coral uppercase tracking-wider">
            Got questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
            Frequently asked questions
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="bg-background rounded-3xl p-6 lg:p-8 border border-foreground/5">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
