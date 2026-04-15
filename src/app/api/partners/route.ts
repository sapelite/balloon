import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_CATEGORIES = new Set([
  "scooter", "villa", "restaurant", "beach_club", "spa",
  "transport", "telecom", "insurance",
]);
const ALLOWED_AREAS = new Set([
  "canggu", "seminyak", "ubud", "kuta", "uluwatu", "nusa_dua",
]);
const MAX_SEARCH_LEN = 80;
const PAGE_SIZE = 60;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") ?? "";
  const area = searchParams.get("area") ?? "";
  const featured = searchParams.get("featured");
  const rawSearch = (searchParams.get("q") ?? "").trim().slice(0, MAX_SEARCH_LEN);

  const where: Record<string, unknown> = {};
  if (category && ALLOWED_CATEGORIES.has(category)) where.category = category;
  if (area && ALLOWED_AREAS.has(area)) where.area = area;
  if (featured === "true") where.isFeatured = true;
  if (rawSearch.length >= 2) {
    where.OR = [
      { name: { contains: rawSearch } },
      { description: { contains: rawSearch } },
    ];
  }

  const partners = await db.partner.findMany({
    where,
    include: {
      services: true,
      _count: { select: { reviews: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { rating: "desc" }],
    take: PAGE_SIZE,
  });

  return NextResponse.json(partners, {
    headers: { "Cache-Control": "public, max-age=0, s-maxage=60, stale-while-revalidate=300" },
  });
}
