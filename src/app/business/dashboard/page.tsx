import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { redirect } from "next/navigation";
import BusinessDashboardClient from "./BusinessDashboardClient";

export const dynamic = "force-dynamic";

export default async function BusinessDashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/auth?next=/business/dashboard");

  const client = await db.businessClient.findUnique({
    where: { userId },
  });

  if (!client) redirect("/business?no_access=1");

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
  );
}
