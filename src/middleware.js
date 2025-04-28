import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  if (token && request.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow request to continue
  return NextResponse.next();
}

// Only run on these routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};
