import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the host from the request headers
  const hostname = request.headers.get("host");

  // Check if we're on the admin subdomain
  if (hostname === "admin.pasuhealth.com") {
    // Rewrite to admin routes in your app directory
    return NextResponse.rewrite(
      new URL(`/admin${request.nextUrl.pathname}`, request.url)
    );
  }

  // If we're not on the admin domain, continue normally
  return NextResponse.next();
}

export const config = {
  // Define which paths this middleware applies to
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
