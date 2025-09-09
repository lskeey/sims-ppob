import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/",
  "/topup",
  "/transactions",
  "/profile",
  "/payment",
];
const authRoutes = ["/auth/login", "/auth/register"];

const isProtectedRoute = (pathname: string): boolean => {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
};

const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some(() => pathname.startsWith("/auth"));
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  if (token && isAuthRoute(pathname)) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  if (isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname) && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/topup/:path*",
    "/transactions/:path*",
    "/profile/:path*",
    "/payment/:path*",
  ],
};
