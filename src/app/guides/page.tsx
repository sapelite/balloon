import { db } from "@/lib/db";
import Link from "next/link";
import {
  FileText,
  Receipt,
  Phone,
  DollarSign,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Download,
  Shield,
} from "lucide-react";
import type { Metadata } from "next";
import Wordmark from "@/components/Wordmark";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Free Bali guides",
  description:
    "Free Bali travel guides: visa, tourist tax, emergency contacts, currency, Bahasa lexicon, and first-timer tips.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Free Bali guides · Skyrol",
    description:
      "Visa, tourist tax, emergency numbers, currency tips, and Bahasa essentials — free.",
    url: "/guides",
    type: "website",
  },
};

const iconMap: Record<string, React.ElementType> = {
  FileText, Receipt, Phone, DollarSign, BookOpen, Lightbulb,
};

const categoryColors: Record<string, string> = {
  visa: "bg-lagoon/10 text-lagoon",
  tax: "bg-gold/10 text-gold",
  emergency: "bg-coral/10 text-coral",
  currency: "bg-emerald/10 text-emerald",
  lexicon: "bg-purple-100 text-purple-600",
  tips: "bg-orange-100 text-orange-500",
};

const categoryLabels: Record<string, string> = {
  visa: "Visa & Immigration",
  tax: "Taxes & Fees",
  emergency: "Emergency",
  currency: "Money & Currency",
  lexicon: "Language",
  tips: "Travel Tips",
};

export default async function GuidesPage() {
  const guides = await db.guide.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Wordmark className="text-xl" />
          </Link>
          <Link
            href="/auth"
            className="px-5 py-2 rounded-full bg-linear-to-r from-coral to-coral-dark text-white text-sm font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 lg:py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 mb-6">
            <Download className="w-4 h-4 text-emerald" />
            <span className="text-sm font-medium text-emerald">100% Free</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            Your Bali <span className="gradient-text">survival kit</span>
          </h1>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Everything you need to know before landing in Bali. No signup required — just pure, actionable travel knowledge.
          </p>
        </div>
      </section>

      {/* Guides grid */}
      <section className="pb-24 lg:pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const Icon = iconMap[guide.icon || "FileText"] || FileText;
              const colorClass = categoryColors[guide.category] || "bg-foreground/5 text-foreground/60";
              return (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="group bg-white rounded-2xl border border-foreground/5 p-6 hover:shadow-lg hover:border-coral/20 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {guide.isFree && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald/10 text-emerald text-xs font-semibold">
                        Free
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                    {categoryLabels[guide.category] || guide.category}
                  </span>
                  <h3 className="font-bold text-base mb-2 group-hover:text-coral transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-foreground/50 flex-1 mb-4">
                    {guide.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-coral gap-1 group-hover:gap-2 transition-all">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-linear-to-r from-coral/5 to-lagoon/5 border border-coral/10">
              <Shield className="w-8 h-8 text-coral" />
              <div className="text-left">
                <p className="font-semibold">Want the full Bali experience?</p>
                <p className="text-sm text-foreground/50">
                  Get the Arrival Essentials package — eSIM, transfer, and scooter in one click.
                </p>
              </div>
              <Link
                href="/#pricing"
                className="px-6 py-2.5 rounded-full bg-coral text-white font-semibold text-sm hover:bg-coral-dark transition-colors shrink-0"
              >
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
