import { NextResponse, type NextRequest } from "next/server";

// Routes that require auth. Checked at the edge — we only verify that a
// session cookie is present; full signature verification happens server-side
// in getCurrentUserId() (middleware can't import Node crypto safely).
const PROTECTED_PATHS = ["/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!needsAuth) return NextResponse.next();

  const token = req.cookies.get("balloon_session")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
