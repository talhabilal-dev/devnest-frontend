import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard", "/profile", "/settings"];

  // ✅ If accessing protected routes and no token, redirect to signin
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // ✅ If logged in and trying to access signin/signup, redirect to dashboard
  if (
    token &&
    (pathname.startsWith("/signin") || pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Otherwise, allow the request
  return NextResponse.next();
}

// ✅ Match all relevant routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/signin",
    "/signup",
  ],
};
