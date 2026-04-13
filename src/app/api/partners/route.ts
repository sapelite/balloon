import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const area = searchParams.get("area");
  const featured = searchParams.get("featured");
  const search = searchParams.get("q");

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (area) where.area = area;
  if (featured === "true") where.isFeatured = true;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const partners = await db.partner.findMany({
    where,
    include: {
      services: true,
      _count: { select: { reviews: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { rating: "desc" }],
  });

  return NextResponse.json(partners);
}
