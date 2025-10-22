import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  // update user's auth session
  const { supabase, response } = await updateSession(request);

  // Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /admin routes - require admin authorization
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user || !user.email) {
      return NextResponse.redirect(new URL("/partners/login", request.url));
    }

    // Check if user is an admin
    const { data: admin } = await supabase
      .from("admins")
      .select("email")
      .eq("email", user.email)
      .single();

    if (!admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect /partners/dashboard routes - require authentication
  if (request.nextUrl.pathname.startsWith("/partners/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/partners/login", request.url));
    }
  }

  // Redirect authenticated users away from login/signup/apply pages
  if (
    user &&
    (request.nextUrl.pathname === "/partners/login" ||
      request.nextUrl.pathname === "/partners/sign-up" ||
      request.nextUrl.pathname === "/partners/apply")
  ) {
    return NextResponse.redirect(
      new URL("/partners/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Get the host from the request headers
//   const hostname = request.headers.get("host");

//   // Check if we're on the admin subdomain
//   if (hostname === "admin.pasuhealth.com") {
//     // Rewrite to admin routes in your app directory
//     return NextResponse.rewrite(
//       new URL(`/admin${request.nextUrl.pathname}`, request.url)
//     );
//   }

//   // If we're not on the admin domain, continue normally
//   return NextResponse.next();
// }

// export const config = {
//   // Define which paths this middleware applies to
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
// };
