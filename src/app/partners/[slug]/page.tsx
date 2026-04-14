import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Globe,
  BadgeCheck,
  Tag,
  Clock,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = await db.partner.findUnique({ where: { slug } });
  if (!partner) return { title: "Partner Not Found" };
  return {
    title: `${partner.name} — Skyrol Partner`,
    description: partner.description,
  };
}

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params;
  const partner = await db.partner.findUnique({
    where: { slug },
    include: {
      services: { where: { isAvailable: true } },
      reviews: {
        include: { user: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!partner) notFound();

  const features: string[] = partner.features ? JSON.parse(partner.features) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/partners" className="flex items-center gap-2 text-sm font-medium text-foreground/50 hover:text-coral transition-colors">
            <ArrowLeft className="w-4 h-4" /> Partners
          </Link>
          <Link href="/auth" className="px-5 py-2 rounded-full bg-linear-to-r from-coral to-coral-dark text-white text-sm font-semibold">
            Sign In
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
        {/* Hero section */}
        <div className="bg-white rounded-3xl border border-foreground/5 overflow-hidden mb-8">
          {/* Image area */}
          <div className="h-48 sm:h-64 bg-linear-to-br from-sand via-coral/5 to-lagoon/5 flex items-center justify-center">
            <div className="text-6xl opacity-20">
              {partner.category === "scooter" && "🏍️"}
              {partner.category === "villa" && "🏡"}
              {partner.category === "restaurant" && "🍽️"}
              {partner.category === "beach_club" && "🏖️"}
              {partner.category === "spa" && "🧖"}
              {partner.category === "transport" && "🚗"}
              {partner.category === "telecom" && "📱"}
              {partner.category === "insurance" && "🛡️"}
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold">{partner.name}</h1>
                  {partner.isVerified && <BadgeCheck className="w-6 h-6 text-lagoon" />}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/50">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <strong className="text-foreground/70">{partner.rating}</strong>
                    ({partner.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {partner.location}
                  </span>
                  {partner.priceRange && (
                    <span className="font-semibold">{partner.priceRange}</span>
                  )}
                </div>
              </div>
              {partner.discount && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 border border-coral/20 shrink-0">
                  <Tag className="w-4 h-4 text-coral" />
                  <span className="text-sm font-semibold text-coral">{partner.discount}</span>
                </div>
              )}
            </div>

            <p className="text-foreground/60 leading-relaxed mb-6">
              {partner.longDesc || partner.description}
            </p>

            {/* Features */}
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {features.map((f, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-sand text-xs font-medium text-foreground/60">
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Contact */}
            <div className="flex flex-wrap gap-3">
              {partner.phone && (
                <a href={`tel:${partner.phone}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald/10 text-emerald text-sm font-semibold hover:bg-emerald/20 transition-colors">
                  <Phone className="w-4 h-4" /> Call
                </a>
              )}
              {partner.website && (
                <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lagoon/10 text-lagoon text-sm font-semibold hover:bg-lagoon/20 transition-colors">
                  <Globe className="w-4 h-4" /> Website
                </a>
              )}
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-coral/10 text-coral text-sm font-semibold hover:bg-coral/20 transition-colors">
                <MessageCircle className="w-4 h-4" /> Contact via Skyrol
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services */}
          <div className="lg:col-span-2">
            {partner.services.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Services & Pricing</h2>
                <div className="space-y-3">
                  {partner.services.map((service) => (
                    <div key={service.id} className="bg-white rounded-2xl border border-foreground/5 p-5 flex items-center justify-between hover:border-coral/20 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{service.name}</h3>
                        <p className="text-sm text-foreground/50 mt-0.5">{service.description}</p>
                      </div>
                      <div className="text-right ml-4 shrink-0">
                        <div className="text-xl font-bold text-coral">${service.price}</div>
                        <div className="text-xs text-foreground/40">
                          {service.unit === "per_day" && "/day"}
                          {service.unit === "per_trip" && "/trip"}
                          {service.unit === "per_month" && "/month"}
                          {service.unit === "one_time" && "one-time"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {partner.reviews.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  {partner.reviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-2xl border border-foreground/5 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-sm">
                            {review.user.name?.[0] || "?"}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{review.user.name}</p>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < review.rating ? "text-gold fill-gold" : "text-foreground/10"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-foreground/30 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/60">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book CTA */}
            <div className="bg-linear-to-br from-foreground to-[#2A2A4E] rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Book via Skyrol</h3>
              <p className="text-white/60 text-sm mb-4">
                Get the best price and exclusive deals when you book through Skyrol.
              </p>
              <Link href="/auth" className="block w-full text-center py-3 rounded-xl bg-coral text-white font-semibold text-sm hover:bg-coral-dark transition-colors">
                Sign In to Book
              </Link>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-foreground/5 overflow-hidden">
              <div className="h-48 bg-lagoon/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-lagoon/30 mx-auto mb-2" />
                  <p className="text-xs text-foreground/30">Map integration coming soon</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground/60">{partner.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
