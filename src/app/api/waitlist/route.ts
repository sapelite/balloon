import { db } from "@/lib/db";
import { email as emailVal, readJson, str, ValidationError } from "@/lib/validate";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = rateLimit(`waitlist:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Slow down." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const body = await readJson(request);
    const email = emailVal(body.email);
    const source = str(body.source, "source", { optional: true, max: 32 });

    const existing = await db.waitlist.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "You're already on the waitlist!" });
    }

    await db.waitlist.create({ data: { email, source: source || "cta" } });
    const count = await db.waitlist.count();

    return NextResponse.json({
      message: "Welcome to the waitlist!",
      position: count,
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
