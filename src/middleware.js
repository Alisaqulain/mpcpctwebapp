import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Define public paths
const publicPaths = ["/", "/signup", "/login", "/forget"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow all public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Skip static/image requests
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // Matches .png, .jpg, .svg, etc.
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;

  // If no token → redirect to signup
  if (!token) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return NextResponse.next();
  } catch (err) {
    console.error("JWT error", err);
    return NextResponse.redirect(new URL("/signup", request.url));
  }
}

export const config = {
  matcher: ["/((?!.*\\.(?:png|jpg|jpeg|svg|webp|ico|js|css|woff|woff2|ttf|eot)$).*)"],
};
