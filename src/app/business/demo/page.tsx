import Link from "next/link";
import { ArrowLeft, PlayCircle } from "lucide-react";
import { db } from "@/lib/db";
import BusinessDashboardClient from "../dashboard/BusinessDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Business dashboard — live demo",
  description: "A live preview of the Skyrol Business dashboard with real-looking data.",
  alternates: { canonical: "/business/demo" },
  robots: { index: true, follow: true },
};

export default async function BusinessDemoPage() {
  const client = await db.businessClient.findFirst({
    orderBy: { createdAt: "asc" },
  });
  if (!client) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-border shadow-airbnb p-8 lg:p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-coral/10 flex items-center justify-center mx-auto mb-5">
            <PlayCircle className="w-7 h-7 text-coral" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-3">
            Live demo is warming up.
          </h1>
          <p className="text-foreground/55 leading-relaxed mb-7">
            Our demo workspace hasn&apos;t been seeded on this environment yet.
            In the meantime, let&apos;s jump on a 15-minute call — we&apos;ll walk you through it live.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:business@skyrol.bali?subject=Skyrol%20Business%20%E2%80%94%20live%20walkthrough"
              className="px-5 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/25 hover:shadow-coral/40 transition-all"
            >
              Book a walkthrough
            </a>
            <Link
              href="/business"
              className="px-5 py-3 rounded-full bg-foreground/4 hover:bg-foreground/7 text-foreground font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [briefing, metrics, insights, content] = await Promise.all([
    db.clientBriefing.findFirst({
      where: { clientId: client.id },
      orderBy: { forDate: "desc" },
    }),
    db.clientMetric.findMany({
      where: { clientId: client.id },
      orderBy: { recordedAt: "asc" },
    }),
    db.clientInsight.findMany({
      where: { clientId: client.id, status: { not: "dismissed" } },
      orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
      take: 10,
    }),
    db.clientContent.findMany({
      where: { clientId: client.id },
      orderBy: { views: "desc" },
      take: 10,
    }),
  ]);

  return (
    <div>
      <div className="bg-coral/10 border-b border-coral/20 py-2.5 text-xs font-semibold text-coral flex items-center justify-center gap-4 relative">
        <a href="/business" className="absolute left-4 sm:left-6 inline-flex items-center gap-1.5 hover:underline">
          ← Back
        </a>
        <span>DEMO — real-looking data, shareable with prospects</span>
      </div>
      <BusinessDashboardClient
        client={{
          id: client.id,
          businessName: client.businessName,
          industry: client.industry,
          plan: client.plan,
          instagramHandle: client.instagramHandle,
          tiktokHandle: client.tiktokHandle,
        }}
        briefing={briefing}
        metrics={metrics}
        insights={insights}
        content={content}
      />
    </div>
  );
}
