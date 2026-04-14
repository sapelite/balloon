"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wifi,
  Car,
  Bike,
  Home,
  Compass,
  FileText,
  CreditCard,
  HeartPulse,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

const arrivalItems = [
  { icon: Wifi, title: "eSIM Data", desc: "Activated the second you land. No queues, no physical card.", accent: "coral" },
  { icon: Car, title: "Airport Transfer", desc: "Private driver at Ngurah Rai with your name on a sign.", accent: "lagoon" },
  { icon: Bike, title: "Scooter Delivery", desc: "Your ride delivered to your villa on the first morning.", accent: "gold" },
];

const services = [
  { icon: Home, title: "Villa Booking", desc: "Curated stays with verified hosts", color: "bg-cyan-50 text-cyan-600" },
  { icon: Compass, title: "Activities", desc: "Temples, rice terraces, diving spots", color: "bg-emerald-50 text-emerald-600" },
  { icon: FileText, title: "Visa & Tax Help", desc: "Step-by-step guides, zero stress", color: "bg-amber-50 text-amber-600" },
  { icon: CreditCard, title: "Currency Tools", desc: "Live IDR converter + tips calc", color: "bg-violet-50 text-violet-600" },
  { icon: HeartPulse, title: "Travel Insurance", desc: "Instant coverage via SafetyWing", color: "bg-rose-50 text-rose-500" },
  { icon: Wifi, title: "Emergency Info", desc: "Hospitals, police, embassy contacts", color: "bg-orange-50 text-orange-500" },
];

export default function Services() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionTitle
          tag="Everything you need"
          title="One app. Every service."
          subtitle="From booking to the last day of your trip — Skyrol handles the logistics."
        />

        {/* Arrival Package */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mb-14"
        >
          <div className="animated-border p-[1.5px] rounded-[1.5rem]">
            <div className="bg-card rounded-[calc(1.5rem-1.5px)] p-7 lg:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center gap-5 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight">Arrival Essentials</h3>
                    <p className="text-[0.85rem] text-foreground/40">One package. Booked before departure.</p>
                  </div>
                </div>
                <div className="lg:ml-auto flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-tight">$49</span>
                  <span className="text-foreground/30 text-sm">/person</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {arrivalItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-background hover:bg-sand transition-colors duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-coral/8 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[0.9rem] mb-0.5">{item.title}</h4>
                      <p className="text-[0.8rem] text-foreground/40 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-foreground/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[0.825rem] text-foreground/35">Includes insurance, helmets, and 24/7 concierge support.</p>
                <a href="#cta" className="group flex items-center gap-1.5 text-[0.85rem] font-semibold text-coral hover:text-coral-dark transition-colors">
                  Pre-order now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-card border border-foreground/[0.04] hover:border-foreground/[0.08] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer"
            >
              <div className={`w-11 h-11 rounded-xl ${svc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <svc.icon className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-[0.95rem] mb-1">{svc.title}</h4>
              <p className="text-[0.825rem] text-foreground/40">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
