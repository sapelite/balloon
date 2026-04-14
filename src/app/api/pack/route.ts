import { setPackCookie } from "@/lib/session";
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
    const pack = oneOf(body.pack, "pack", ["lite", "essentials", "full"] as const);
    await setPackCookie(pack);
    return NextResponse.json({ ok: true, pack });
  } catch (e) {
    if (e instanceof ValidationError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
