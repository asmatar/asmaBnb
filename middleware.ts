import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const protectedRoutesPatern = routing.locales.flatMap((locale) => [
  `/${locale}/hotel/new(.*)`,
  `/${locale}/my-hotels(.*)`,
  `/${locale}/checkout(.*)`,
  `/${locale}/thankyou(.*)`,
  `/${locale}/hotel/new(.*)`,
]);

const isProtectedRoute = createRouteMatcher(protectedRoutesPatern);

// Create middleware for internationalization
const handleI18nRouting = createMiddleware(routing);

// Integrate the internationalization middleware with Clerk
export default clerkMiddleware((auth, req) => {
  // Check for protected routes
  if (
    isProtectedRoute(req) &&
    auth().sessionClaims?.metadata?.role !== "host"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  // Forward the request to the internationalization middleware
  return handleI18nRouting(req);
});

/* export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(.*)", "/(api|trpc)(.*)"],
}; */
export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en|es)/:path*"],
};
