import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/helper";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = ["/login"];
  const isPublicPath = publicPaths.includes(pathname);

  const isAuth = await isAuthenticated(request);

  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");

  if (isPublicPath && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !isAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.png|site.webmanifest|Images|icon-512.png|signin).*)",
  ],
};
