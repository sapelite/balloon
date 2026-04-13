"use client";

import { motion } from "framer-motion";
import {
  Wifi,
  Car,
  Bike,
  Home,
  Compass,
  FileText,
  CreditCard,
  HeartPulse,
} from "lucide-react";

const arrivalItems = [
  {
    icon: Wifi,
    title: "eSIM Data",
    desc: "Activated the second you land. No queues, no physical card.",
  },
  {
    icon: Car,
    title: "Airport Transfer",
    desc: "Private driver waiting at Ngurah Rai with your name.",
  },
  {
    icon: Bike,
    title: "Scooter Delivery",
    desc: "Your ride delivered to your villa on the first morning.",
  },
];

const services = [
  {
    icon: Home,
    title: "Villa Booking",
    desc: "Curated stays with verified hosts",
    color: "bg-lagoon/10 text-lagoon",
  },
  {
    icon: Compass,
    title: "Activities",
    desc: "Temples, rice terraces, diving spots",
    color: "bg-emerald/10 text-emerald",
  },
  {
    icon: FileText,
    title: "Visa & Tax Help",
    desc: "Step-by-step guides, zero stress",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: CreditCard,
    title: "Currency Tools",
    desc: "Live IDR converter + tips calculator",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: HeartPulse,
    title: "Travel Insurance",
    desc: "Instant coverage via SafetyWing",
    color: "bg-rose-100 text-rose-500",
  },
  {
    icon: Wifi,
    title: "Emergency Info",
    desc: "Hospitals, police, embassy contacts",
    color: "bg-orange-100 text-orange-500",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-coral uppercase tracking-wider">
            Everything you need
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mt-3 mb-5">
            One app. Every service.
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            From the moment you book your flight to the last day of your trip,
            Balloon handles the logistics so you can focus on the experience.
          </p>
        </motion.div>

        {/* Arrival Package (hero card) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 rounded-3xl overflow-hidden"
        >
          <div className="animated-border p-[2px] rounded-3xl">
            <div className="bg-white rounded-3xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
                <div className="px-4 py-1.5 rounded-full bg-coral/10 text-coral text-sm font-semibold">
                  Arrival Essentials
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    Land ready. Not lost.
                  </h3>
                  <p className="text-foreground/60 mt-1">
                    One package, booked before departure. Everything activated
                    on arrival.
                  </p>
                </div>
                <div className="lg:ml-auto">
                  <span className="text-3xl font-bold gradient-text">$49</span>
                  <span className="text-foreground/40 ml-1">/person</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {arrivalItems.map((svc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.4 }}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-sand/60 hover:bg-sand transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                      <svc.icon className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">{svc.title}</h4>
                      <p className="text-sm text-foreground/50 mt-0.5">
                        {svc.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((svc, i) => (
            <motion.div
              key={i}
              variants={item}
              className="group p-6 rounded-2xl bg-white border border-foreground/5 hover:border-coral/20 hover:shadow-lg hover:shadow-coral/5 transition-all cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-xl ${svc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <svc.icon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-lg mb-1">{svc.title}</h4>
              <p className="text-sm text-foreground/50">{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
