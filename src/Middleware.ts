import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || req.nextUrl.searchParams.get("token");

  // Protect both /profile and /employer-dashboard routes
  if (!token && (req.nextUrl.pathname.startsWith("/profile") )) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}
