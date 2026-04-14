import { db } from "@/lib/db";
import { setSession } from "@/lib/session";
import { email as emailVal, readJson, str, oneOf, ValidationError } from "@/lib/validate";
import { getClientIp, rateLimit } from "@/lib/rateLimit";
import { sameOriginOrThrow } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    sameOriginOrThrow(request);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  // Rate limit: 8 attempts per 5 minutes per IP
  const ip = getClientIp(request);
  const rl = rateLimit(`login:${ip}`, { limit: 8, windowMs: 5 * 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
    );
  }

  try {
    const body = await readJson(request);
    const email = emailVal(body.email);
    const name = str(body.name, "name", { optional: true, max: 80 });
    const provider = oneOf(body.provider ?? "email", "provider", [
      "email",
      "google",
      "apple",
    ] as const);

    let user = await db.user.findUnique({ where: { email } });

    if (!user) {
      const derivedName =
        name ||
        email
          .split("@")[0]
          .replace(/[._-]+/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

      const referralCode = `BALLOON-${derivedName.split(" ")[0].toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`;

      user = await db.user.create({
        data: { email, name: derivedName, provider, referralCode },
      });
    }

    await setSession(user.id);

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error("login error", e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
