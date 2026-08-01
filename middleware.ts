import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/admin-auth";

// Protects everything under /admin (except the login page itself) behind
// a single shared password. See lib/admin-auth.ts for the session model.
//
// Note: this uses the deprecated `middleware.ts` convention (not the newer
// `proxy.ts`) intentionally. Next.js 16's `proxy.ts` always runs on the
// Node.js runtime, but @opennextjs/cloudflare doesn't support Node.js
// middleware/proxy yet — only Edge Middleware, i.e. this file. Switch back
// to proxy.ts once OpenNext adds that support.
// See: https://github.com/cloudflare/workers-sdk/issues/13755
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    // Fail closed: if the secret isn't configured, nobody gets in rather
    // than accidentally leaving the admin area open.
    return new NextResponse("Admin area not configured (ADMIN_PASSWORD is not set).", {
      status: 503,
    });
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const valid = await isValidSessionToken(token, adminPassword);

  if (!valid) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
