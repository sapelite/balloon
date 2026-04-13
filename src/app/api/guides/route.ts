import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const guides = await db.guide.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      excerpt: true,
      icon: true,
      isFree: true,
      order: true,
    },
  });

  return NextResponse.json(guides);
}
