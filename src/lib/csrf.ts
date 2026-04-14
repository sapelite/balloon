import { NextRequest } from "next/server";

// SameSite=Lax cookies already block cross-site POST with the session cookie,
// but an explicit Origin check adds defense in depth. Call on any route that
// mutates authenticated user state.
export function sameOriginOrThrow(req: NextRequest): void {
  const origin = req.headers.get("origin");
  if (!origin) return; // Server-to-server or native client — no browser origin.
  const host = req.headers.get("host");
  if (!host) throw new Error("Bad request");
  try {
    const o = new URL(origin);
    if (o.host !== host) throw new Error("Cross-origin request blocked");
  } catch {
    throw new Error("Invalid origin");
  }
}
