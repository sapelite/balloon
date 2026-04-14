import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import BusinessDashboardClient from "../dashboard/BusinessDashboardClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Skyrol Business — Live Demo",
  description: "A live preview of the Skyrol Business dashboard with real-looking data.",
};

export default async function BusinessDemoPage() {
  const client = await db.businessClient.findFirst({
    orderBy: { createdAt: "asc" },
  });
  if (!client) notFound();

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
