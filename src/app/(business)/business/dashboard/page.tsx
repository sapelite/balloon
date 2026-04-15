import { db } from "@/lib/db";
import { getCurrentUser, getCurrentUserId } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import BusinessDashboardClient from "./BusinessDashboardClient";
import { mailHref } from "@/lib/handoff";

export const dynamic = "force-dynamic";

export default async function BusinessDashboardPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/auth?next=/business/dashboard");

  const user = await getCurrentUser();
  const client = await db.businessClient.findUnique({ where: { userId } });

  if (!client) {
    return (
      <div className="min-h-screen bg-card flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full bg-white rounded-3xl border border-border shadow-airbnb p-8 lg:p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-lagoon/10 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-7 h-7 text-lagoon" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-3">
            Your dashboard is almost ready.
          </h1>
          <p className="text-foreground/55 leading-relaxed mb-7">
            {user?.email ? (
              <>
                We couldn&apos;t find an active Skyrol Business workspace for{" "}
                <span className="font-semibold text-foreground">{user.email}</span>.
              </>
            ) : (
              <>We couldn&apos;t find an active Skyrol Business workspace on this account.</>
            )}{" "}
            Reach out and we&apos;ll spin it up within 24h — or try the live demo to see what it looks like.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={mailHref("Skyrol Business — workspace access", "business")}
              className="px-5 py-3 rounded-full bg-foreground text-white font-semibold text-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              Request access
            </a>
            <Link
              href="/business/demo"
              className="px-5 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-lg shadow-coral/25 hover:shadow-coral/40 transition-all flex items-center justify-center gap-1.5"
            >
              See live demo
            </Link>
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
