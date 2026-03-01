import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing",
    "/proof",
    "/blog",
    "/help",
    "/how-it-works",
    "/database",
    "/privacy",
    "/terms",
    "/api/webhook",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
