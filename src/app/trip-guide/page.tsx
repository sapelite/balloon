import { db } from "@/lib/db";
import { getCurrentUser, getPackCookie } from "@/lib/session";
import TripGuideClient from "./TripGuideClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Trip Guide — Skyrol",
  description: "Fun, bite-sized Bali guide: tips, spots, deals — all in one place.",
};

export default async function TripGuidePage() {
  const [user, pack, partners] = await Promise.all([
    getCurrentUser(),
    getPackCookie(),
    db.partner.findMany({
      where: { isVerified: true },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        area: true,
        location: true,
        discount: true,
        rating: true,
        priceRange: true,
      },
      orderBy: { isFeatured: "desc" },
    }),
  ]);

  return <TripGuideClient user={user} initialPack={pack} partners={partners} />;
}
