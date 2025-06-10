import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicPaths = ["/", "/signup", "/login", "/forget"];
  const isPublicPath = publicPaths.includes(request.nextUrl.pathname);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Apply the middleware to all routes except:
      - /api/*
      - /_next/*
      - /favicon.ico
      - any file extension (like .jpg, .png, .svg, etc.)
    */
    "/((?!api|_next|favicon.ico|.*\\..*).*)",
  ],
};
