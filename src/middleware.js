import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// Define public paths
const publicPaths = ["/", "/signup", "/login", "/forget"];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log("Middleware processing:", pathname);

  // Allow all public paths
  if (publicPaths.includes(pathname)) {
    console.log("Public path, allowing access");
    return NextResponse.next();
  }

  // Skip static/image requests
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || // Matches .png, .jpg, .svg, etc.
    pathname === "/favicon.ico"
  ) {
    console.log("Static/API path, allowing access");
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  console.log("Token check for", pathname, ":", token ? "Present" : "Missing");

  // If no token → redirect to signup with intended destination
  if (!token) {
    console.log("No token, redirecting to signup");
    const redirectUrl = new URL("/signup", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    console.log("Token valid, allowing access to", pathname);

    // Enforce admin-only access to /admin routes
    if (pathname.startsWith("/admin")) {
      const isAdmin = payload?.role === "admin";
      if (!isAdmin) {
        console.warn("Non-admin attempted to access admin route", pathname);
        const redirectUrl = new URL("/", request.url);
        redirectUrl.searchParams.set("error", "forbidden");
        return NextResponse.redirect(redirectUrl);
      }
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT error for", pathname, ":", err.message);
    const redirectUrl = new URL("/signup", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ["/((?!.*\\.(?:png|jpg|jpeg|svg|webp|ico|js|css|woff|woff2|ttf|eot)$).*)"],
};
