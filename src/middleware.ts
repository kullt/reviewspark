import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define which routes require authentication
const protectedRoutes = ["/dashboard", "/api/scrape-reviews", "/api/generate-posts"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for Supabase auth session cookie
  // Supabase sets sb-access-token cookie when user is authenticated
  const accessToken = request.cookies.get("sb-access-token");
  const authToken = request.cookies.get("sb-auth-token");
  const supabaseSession = request.cookies.get("sb-jilhqlznhnchvmmvumxd-auth-token");

  const isAuthenticated = accessToken || authToken || supabaseSession;

  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    // Redirect to login if accessing dashboard without auth
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
