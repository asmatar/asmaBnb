import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const isProtectedRoute = createRouteMatcher([
  "/hotel/new(.*)",
  /*  "/my-bookings(.*)", */
  "/my-hotels(.*)",
  "/checkout(.*)",
  "/thankyou(.*)",
  /*   "/hotel/:id(.*)", */
]);

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
