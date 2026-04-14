import { clearSession } from "@/lib/session";
import { sameOriginOrThrow } from "@/lib/csrf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    sameOriginOrThrow(req);
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  await clearSession();
  return NextResponse.json({ ok: true });
}
