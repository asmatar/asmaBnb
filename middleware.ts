import { clerkMiddleware } from "@clerk/nextjs/server";

/*const isProtectedRoute = createRouteMatcher(["/hotel-new(.*)"]);
 export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
}); */
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(.*)", "/(api|trpc)(.*)"],
};
