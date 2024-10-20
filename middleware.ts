import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isProtectedRoute = createRouteMatcher(["/hotel/new(.*)"]);
export default clerkMiddleware(async (auth, req) => {
  if (
    isProtectedRoute(req) &&
    auth().sessionClaims?.metadata?.role !== "host"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(.*)", "/(api|trpc)(.*)"],
};
