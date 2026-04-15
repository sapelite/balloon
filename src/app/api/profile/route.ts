import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { readJson, oneOf, str, ValidationError } from "@/lib/validate";
import { sameOriginOrThrow } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ profile: null });
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { profileAudience: true, profileData: true, profileCompletedAt: true },
  });
  if (!user) return NextResponse.json({ profile: null });
  let data: unknown = null;
  if (user.profileData) {
    try { data = JSON.parse(user.profileData); } catch {}
  }
  return NextResponse.json({
    profile: {
      audience: user.profileAudience,
      data,
      completedAt: user.profileCompletedAt,
    },
  });
}

export async function POST(req: NextRequest) {
  try { sameOriginOrThrow(req); } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const userId = await getCurrentUserId();
  if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  try {
    const body = await readJson(req);
    const audience = oneOf(body.audience, "audience", [
      "traveler",
      "entrepreneur",
    ] as const);
    const answers = body.answers;
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      throw new ValidationError("answers must be an object");
    }
    // size guard
    const serialized = JSON.stringify(answers);
    if (serialized.length > 8000) throw new ValidationError("answers too large");

    // lightweight sanitization on common fields
    const email = body.email ? str(body.email, "email", { max: 254, optional: true }) : undefined;

    await db.user.update({
      where: { id: userId },
      data: {
        profileAudience: audience,
        profileData: serialized,
        profileCompletedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, email });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
