import { db } from "@/lib/db";
import { getCurrentUser, getCurrentUserId, getPackCookie, getPurchasedPack } from "@/lib/session";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import InvestorDashboardClient from "./InvestorDashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const userId = await getCurrentUserId();
  const profile = userId
    ? await db.user.findUnique({
        where: { id: userId },
        select: { profileAudience: true },
      })
    : null;

  const audience = profile?.profileAudience ?? null;

  if (audience === "entrepreneur") {
    redirect("/business/dashboard");
  }

  if (audience === "investor") {
    return <InvestorDashboardClient user={user} />;
  }

  const bookings = await db.booking.findMany({
    where: { userId: user.id },
    include: {
      partner: { select: { name: true, category: true, slug: true } },
      service: { select: { name: true, unit: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const pack = await getPackCookie();
  const purchased = await getPurchasedPack();

  return <DashboardClient user={user} bookings={bookings} pack={pack} purchased={purchased} />;
}
