import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/helper";
import { UNPROTECTED_ROUTES } from "./lib/constants";

type Environment = "production" | "development" | "other";
export async function middleware(request: NextRequest) {
  const currentEnv = process.env.DEPLOY_ENV as Environment;

  if (currentEnv === 'production' && request.headers.get("x-forwarded-proto") !== "https") {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    );
  }
  const { pathname } = request.nextUrl;

  const isPublicPath = UNPROTECTED_ROUTES.includes(pathname);

  const isAuth = await isAuthenticated(request);

  const response = NextResponse.next();
  response.headers.set("x-middleware-cache", "no-cache");

  if (pathname === "/login" && isAuth) {
    return NextResponse.redirect(new URL("/home", request.url));
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
