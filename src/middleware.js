import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_ROUTES = ["/signin", "/signup"];
const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings"];

// ✅ Utility function to verify JWT
async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Always encode
    const { payload } = await jwtVerify(token, secret);
    return payload;
    
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
    
  }
}

export async function middleware(request) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  let isAuthenticated = false;

  if (token) {
    const validPayload = await verifyToken(token); // 👈 verify using jose
    if (validPayload) {
      isAuthenticated = true;
    }
  }

  // ✅ Redirect to /signin if not authenticated and accessing protected route
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // ✅ Redirect to /dashboard if already authenticated and trying to access signin/signup
  if (
    isAuthenticated &&
    PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Otherwise allow
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
