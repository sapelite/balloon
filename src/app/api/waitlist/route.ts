import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const existing = await db.waitlist.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "You're already on the waitlist!" },
        { status: 200 }
      );
    }

    await db.waitlist.create({
      data: { email, source: source || "cta" },
    });

    const count = await db.waitlist.count();

    return NextResponse.json({
      message: "Welcome to the waitlist!",
      position: count,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
