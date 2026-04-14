"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bike,
  Car,
  Wifi,
  QrCode,
  MapPin,
  Calendar,
  ChevronRight,
  Settings,
  LogOut,
  HeadphonesIcon,
  AlertTriangle,
  Star,
  Gift,
  Bell,
  User,
  Sparkles,
  Compass,
  TrendingUp,
  Zap,
} from "lucide-react";
import Wordmark from "@/components/Wordmark";

const categoryIcon: Record<string, typeof Bike> = {
  scooter: Bike,
  transport: Car,
  telecom: Wifi,
  villa: MapPin,
  restaurant: Star,
  beach_club: Sparkles,
  spa: Sparkles,
  insurance: Settings,
};

const categoryColor: Record<string, string> = {
  scooter: "bg-coral/10 text-coral",
  transport: "bg-lagoon/10 text-lagoon",
  telecom: "bg-emerald/10 text-emerald",
  villa: "bg-gold/10 text-gold",
  restaurant: "bg-coral/10 text-coral",
  beach_club: "bg-lagoon/10 text-lagoon",
  spa: "bg-emerald/10 text-emerald",
  insurance: "bg-foreground/10 text-foreground/60",
};

const packLabel: Record<string, string> = {
  lite: "Bali Lite",
  essentials: "Arrival Essentials",
  full: "Full Stay Pass",
};

type UserShape = {
  id: string;
  email: string;
  name: string | null;
  referralCode: string | null;
};

type BookingShape = {
  id: string;
  status: string;
  startDate: Date;
  endDate: Date | null;
  totalPrice: number;
  address: string | null;
  partner: { name: string; category: string; slug: string };
  service: { name: string; unit: string | null };
};

const quickActions = [
  { icon: Bike, label: "Rent Scooter", href: "/services/scooter", color: "text-coral" },
  { icon: Compass, label: "Trip Guide", href: "/trip-guide", color: "text-lagoon" },
  { icon: Wifi, label: "Get eSIM", href: "/partners?category=telecom", color: "text-emerald" },
  { icon: Gift, label: "Partners", href: "/partners", color: "text-gold" },
];

function daysUntil(d: Date) {
  const diff = new Date(d).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function DashboardClient({
  user,
  bookings,
  pack,
  purchased,
}: {
  user: UserShape;
  bookings: BookingShape[];
  pack: string;
  purchased: string | null;
}) {
  const router = useRouter();
  const firstInitial = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase();
  const firstName = user.name?.split(" ")[0] || "traveler";

  const upcomingBooking = bookings
    .filter((b) => new Date(b.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
  const daysLeft = upcomingBooking ? daysUntil(new Date(upcomingBooking.startDate)) : null;

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Wordmark className="text-xl" />
          </Link>
          <div className="flex items-center gap-3">
            <button aria-label="Notifications" className="relative p-2 rounded-lg hover:bg-sand transition-colors">
              <Bell className="w-5 h-5 text-foreground/40" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral" />
            </button>
            <div className="w-9 h-9 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-sm">
              {firstInitial}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Welcome back, {firstName}
          </h1>
          <p className="text-foreground/50">
            {daysLeft !== null ? (
              <>Your Bali trip is in <strong className="text-coral">{daysLeft} days</strong>. Here&apos;s your dashboard.</>
            ) : (
              <>No upcoming bookings yet. Ready to plan something?</>
            )}
          </p>
        </div>

        {/* Upsell banner — shown when user has not purchased a pack yet */}
        {!purchased && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl bg-linear-to-br from-coral via-coral-dark to-[#B23A3A] text-white p-6 relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[0.7rem] uppercase tracking-wider text-white/70 font-semibold">
                    Complete your trip
                  </p>
                  <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" /> Save up to 42%
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-tight">Your dashboard is ready — unlock the full Bali experience.</h3>
                <p className="text-sm text-white/75 mt-1">
                  Scooter delivered, eSIM live on landing, 24/7 concierge. All in one click.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/checkout/essentials"
                    className="px-4 py-2 rounded-full bg-white text-coral text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    Get Essentials — $89
                  </Link>
                  <Link
                    href="/#pricing"
                    className="px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white text-sm font-semibold hover:bg-white/20 transition-colors"
                  >
                    Compare packs
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pack banner */}
        <Link
          href="/trip-guide"
          className="block mb-8 rounded-2xl bg-linear-to-r from-foreground to-[#2A2A4E] text-white p-5 hover:shadow-lg transition-shadow group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6 text-coral" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-white/40 mb-0.5">Your Pack</p>
              <h3 className="font-bold">{packLabel[pack] || "Arrival Essentials"}</h3>
              <p className="text-sm text-white/60">Open your interactive trip guide — tips, spots & deals.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/30 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

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
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-foreground/5 p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center text-coral mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-1">No bookings yet</h3>
                <p className="text-sm text-foreground/50 mb-5">Start with a scooter or check your trip guide.</p>
                <div className="flex gap-3 justify-center">
                  <Link href="/services/scooter" className="px-5 py-2.5 rounded-full bg-coral text-white text-sm font-semibold hover:bg-coral-dark transition-colors">
                    Rent a scooter
                  </Link>
                  <Link href="/partners" className="px-5 py-2.5 rounded-full bg-foreground/5 text-foreground/70 text-sm font-semibold hover:bg-foreground/10 transition-colors">
                    Browse partners
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking, i) => {
                  const Icon = categoryIcon[booking.partner.category] || Sparkles;
                  const color = categoryColor[booking.partner.category] || "bg-foreground/5 text-foreground/60";
                  const start = new Date(booking.startDate).toLocaleDateString(undefined, { month: "short", day: "numeric" });
                  const end = booking.endDate
                    ? new Date(booking.endDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                    : null;
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white rounded-2xl border border-foreground/5 p-5 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1 gap-2">
                            <h3 className="font-bold text-base truncate">{booking.service.name}</h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${
                              booking.status === "active" ? "bg-emerald/10 text-emerald" :
                              booking.status === "confirmed" ? "bg-lagoon/10 text-lagoon" :
                              booking.status === "pending" ? "bg-gold/10 text-gold" :
                              "bg-foreground/5 text-foreground/50"
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/40 mb-2">{booking.partner.name}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs text-foreground/50">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {start}{end ? ` – ${end}` : ""}
                            </span>
                            {booking.address && (
                              <span className="flex items-center gap-1 truncate">
                                <MapPin className="w-3.5 h-3.5 shrink-0" /> {booking.address}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-foreground/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground/5 text-xs font-medium text-foreground/50 hover:bg-coral/10 hover:text-coral transition-colors">
                            <QrCode className="w-3.5 h-3.5" /> Show QR
                          </button>
                          <span className="text-xs text-foreground/30 font-mono">{booking.id.slice(-8).toUpperCase()}</span>
                        </div>
                        <span className="font-bold text-coral">${booking.totalPrice}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-foreground/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-xl">
                  {firstInitial}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold truncate">{user.name || "Traveler"}</h3>
                  <p className="text-sm text-foreground/40 truncate">{user.email}</p>
                </div>
              </div>
              <div className="space-y-1">
                {user.referralCode && (
                  <div className="flex items-center justify-between text-sm py-2">
                    <span className="text-foreground/50">Referral</span>
                    <span className="font-mono text-coral font-semibold text-xs">{user.referralCode}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm py-2">
                  <span className="text-foreground/50">Current Pack</span>
                  <span className="text-emerald font-semibold">{packLabel[pack] || "Essentials"}</span>
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
              <Link href="/trip-guide" className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-sand transition-colors border-b border-foreground/5 text-foreground/60">
                <Compass className="w-4 h-4" />
                Trip Guide
                <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
              </Link>
              <Link href="/guides" className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-sand transition-colors border-b border-foreground/5 text-foreground/60">
                <User className="w-4 h-4" />
                Free Guides
                <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
              </Link>
              <Link href="/partners" className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-sand transition-colors border-b border-foreground/5 text-foreground/60">
                <HeadphonesIcon className="w-4 h-4" />
                Partners
                <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-red-50 transition-colors text-red-400"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
                <ChevronRight className="w-4 h-4 ml-auto opacity-30" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
