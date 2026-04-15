"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Star,
  MapPin,
  BadgeCheck,
  Tag,
  Filter,
  Bike,
  Home,
  UtensilsCrossed,
  Palmtree,
  Car,
  Wifi,
  Shield,
  Sparkles,
} from "lucide-react";
import Wordmark from "@/components/Wordmark";

type Partner = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  area: string;
  priceRange: string | null;
  isVerified: boolean;
  isFeatured: boolean;
  discount: string | null;
};

const categories = [
  { value: "", label: "All", icon: Sparkles },
  { value: "scooter", label: "Scooters", icon: Bike },
  { value: "villa", label: "Villas", icon: Home },
  { value: "restaurant", label: "Restaurants", icon: UtensilsCrossed },
  { value: "beach_club", label: "Beach Clubs", icon: Palmtree },
  { value: "spa", label: "Spas", icon: Sparkles },
  { value: "transport", label: "Transport", icon: Car },
  { value: "telecom", label: "eSIM", icon: Wifi },
  { value: "insurance", label: "Insurance", icon: Shield },
];

const areas = [
  { value: "", label: "All Areas" },
  { value: "canggu", label: "Canggu" },
  { value: "seminyak", label: "Seminyak" },
  { value: "ubud", label: "Ubud" },
  { value: "kuta", label: "Kuta" },
  { value: "uluwatu", label: "Uluwatu" },
];

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (area) params.set("area", area);
    if (search) params.set("q", search);

    fetch(`/api/partners?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setPartners(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, area, search]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Wordmark className="text-xl" />
          </Link>
          <Link href="/auth" className="px-5 py-2 rounded-full bg-linear-to-r from-coral to-coral-dark text-white text-sm font-semibold">
            Sign In
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Our <span className="gradient-text">Partners</span>
          </h1>
          <p className="text-foreground/50">Handpicked local businesses, verified for quality and reliability.</p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
            <input
              type="text"
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-foreground/10 focus:outline-none focus:border-coral/30 focus:ring-2 focus:ring-coral/10 transition-all text-sm"
            />
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat.value
                    ? "bg-coral text-white shadow-md shadow-coral/20"
                    : "bg-white border border-foreground/10 text-foreground/60 hover:border-coral/20"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Area filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-foreground/30" />
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white border border-foreground/10 text-sm text-foreground/60 focus:outline-none focus:border-coral/30"
            >
              {areas.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-foreground/5 p-6 animate-pulse">
                <div className="w-full h-40 bg-sand rounded-xl mb-4" />
                <div className="h-5 bg-sand rounded w-3/4 mb-2" />
                <div className="h-4 bg-sand rounded w-full mb-4" />
                <div className="h-4 bg-sand rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-foreground/40">No partners found for this filter.</p>
            <button onClick={() => { setCategory(""); setArea(""); setSearch(""); }} className="mt-4 text-coral font-semibold text-sm hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  href={`/partners/${partner.slug}`}
                  className="block bg-white rounded-2xl border border-foreground/5 overflow-hidden hover:shadow-lg hover:border-coral/20 transition-all group"
                >
                  {/* Image placeholder */}
                  <div className="relative h-44 bg-linear-to-br from-sand to-foreground/5 flex items-center justify-center">
                    <div className="text-4xl opacity-20">
                      {partner.category === "scooter" && "🏍️"}
                      {partner.category === "villa" && "🏡"}
                      {partner.category === "restaurant" && "🍽️"}
                      {partner.category === "beach_club" && "🏖️"}
                      {partner.category === "spa" && "🧖"}
                      {partner.category === "transport" && "🚗"}
                      {partner.category === "telecom" && "📱"}
                      {partner.category === "insurance" && "🛡️"}
                    </div>
                    {partner.isFeatured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-coral text-white text-xs font-bold">
                        Featured
                      </div>
                    )}
                    {partner.discount && (
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-coral text-white text-xs font-bold flex items-center gap-1 shadow-[0_2px_8px_rgba(255,56,92,0.35)]">
                        <Tag className="w-3 h-3" /> {partner.discount}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-base group-hover:text-coral transition-colors flex items-center gap-1.5">
                        {partner.name}
                        {partner.isVerified && <BadgeCheck className="w-4 h-4 text-lagoon" />}
                      </h3>
                      <div className="flex items-center gap-1 text-sm shrink-0">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span className="font-semibold">{partner.rating}</span>
                        <span className="text-foreground/30">({partner.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-sm text-foreground/50 line-clamp-2 mb-3">
                      {partner.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-foreground/40">
                        <MapPin className="w-3.5 h-3.5" />
                        {partner.area.charAt(0).toUpperCase() + partner.area.slice(1)}
                      </div>
                      {partner.priceRange && (
                        <span className="text-xs font-bold text-foreground px-2 py-1 rounded-md bg-sand">
                          {partner.priceRange}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
