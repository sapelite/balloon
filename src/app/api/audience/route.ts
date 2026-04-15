import { setAudienceCookie } from "@/lib/session";
import { readJson, oneOf, ValidationError } from "@/lib/validate";
import { sameOriginOrThrow } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    sameOriginOrThrow(req);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const body = await readJson(req);
    const audience = oneOf(body.audience, "audience", [
      "traveler",
      "entrepreneur",
      "investor",
    ] as const);
    await setAudienceCookie(audience);
    return NextResponse.json({ ok: true, audience });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
