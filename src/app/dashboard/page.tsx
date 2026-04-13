"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bike,
  Car,
  Wifi,
  QrCode,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Settings,
  LogOut,
  HeadphonesIcon,
  AlertTriangle,
  Star,
  Gift,
  Bell,
  User,
} from "lucide-react";

const bookings = [
  {
    id: "BLN-SCT-2026-0001",
    type: "scooter",
    icon: Bike,
    title: "Yamaha NMAX 155cc",
    partner: "Bali Ride Co.",
    status: "confirmed",
    date: "May 15 – May 29, 2026",
    address: "Villa Tropicana, Jl. Batu Bolong No. 88",
    price: "$112",
    color: "bg-coral/10 text-coral",
  },
  {
    id: "BLN-VTC-2026-0001",
    type: "transfer",
    icon: Car,
    title: "Airport Transfer",
    partner: "Bali Private Drivers",
    status: "confirmed",
    date: "May 15, 2026 — 14:30",
    address: "Ngurah Rai → Villa Tropicana",
    price: "$18",
    color: "bg-lagoon/10 text-lagoon",
  },
  {
    id: "BLN-SIM-2026-0001",
    type: "esim",
    icon: Wifi,
    title: "eSIM 14-Day (25GB)",
    partner: "BaliConnect",
    status: "active",
    date: "May 15 – May 29, 2026",
    address: "Scan QR code before boarding",
    price: "$15",
    color: "bg-emerald/10 text-emerald",
  },
];

const quickActions = [
  { icon: Bike, label: "Rent Scooter", href: "/services/scooter", color: "text-coral" },
  { icon: Car, label: "Book Transfer", href: "#", color: "text-lagoon" },
  { icon: Wifi, label: "Get eSIM", href: "#", color: "text-emerald" },
  { icon: Gift, label: "Bali Pass", href: "#", color: "text-gold" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2C8 2 5 5.5 5 9.5C5 14 12 19 12 19C12 19 19 14 19 9.5C19 5.5 16 2 12 2Z" fill="currentColor" opacity="0.9" />
                <circle cx="12" cy="9" r="2.5" fill="white" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Ball<span className="text-coral">oo</span>n</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-sand transition-colors">
              <Bell className="w-5 h-5 text-foreground/40" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral" />
            </button>
            <div className="w-9 h-9 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-sm">
              A
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Welcome back, Alex
          </h1>
          <p className="text-foreground/50">Your Bali trip is in <strong className="text-coral">32 days</strong>. Here&apos;s your dashboard.</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-white rounded-2xl border border-foreground/5 p-4 hover:border-coral/20 hover:shadow-md transition-all group text-center"
            >
              <action.icon className={`w-7 h-7 mx-auto mb-2 ${action.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-medium text-foreground/70">{action.label}</span>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Bookings */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
            <div className="space-y-4">
              {bookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-foreground/5 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${booking.color} flex items-center justify-center shrink-0`}>
                      <booking.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-base">{booking.title}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          booking.status === "active" ? "bg-emerald/10 text-emerald" : "bg-lagoon/10 text-lagoon"
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/40 mb-2">{booking.partner}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-foreground/50">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {booking.date}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {booking.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-3 border-t border-foreground/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground/5 text-xs font-medium text-foreground/50 hover:bg-coral/10 hover:text-coral transition-colors">
                        <QrCode className="w-3.5 h-3.5" /> Show QR
                      </button>
                      <span className="text-xs text-foreground/30 font-mono">{booking.id}</span>
                    </div>
                    <span className="font-bold text-coral">{booking.price}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-foreground/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-xl">
                  A
                </div>
                <div>
                  <h3 className="font-bold">Alex Traveler</h3>
                  <p className="text-sm text-foreground/40">demo@balloon.app</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-foreground/50">Referral Code</span>
                  <span className="font-mono text-coral font-semibold">BALLOON-ALEX</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-foreground/50">Bali Pass</span>
                  <span className="text-emerald font-semibold">Active</span>
                </div>
              </div>
            </div>

            {/* SOS */}
            <button className="w-full bg-red-50 border border-red-100 rounded-2xl p-4 flex items-center gap-3 hover:bg-red-100 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-red-700">Emergency SOS</p>
                <p className="text-xs text-red-400">Tap for instant help — 24/7</p>
              </div>
              <ChevronRight className="w-4 h-4 text-red-300 ml-auto" />
            </button>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-foreground/5 overflow-hidden">
              {[
                { icon: User, label: "Edit Profile", href: "#" },
                { icon: Star, label: "My Reviews", href: "#" },
                { icon: HeadphonesIcon, label: "Support Chat", href: "#" },
                { icon: Settings, label: "Settings", href: "#" },
                { icon: LogOut, label: "Sign Out", href: "/" },
              ].map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-sand transition-colors ${
                    i < 4 ? "border-b border-foreground/5" : ""
                  } ${link.label === "Sign Out" ? "text-red-400" : "text-foreground/60"}`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                  <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
