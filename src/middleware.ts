import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = new Set<string>([
  "/api/public-config",
  "/favicon.ico"
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const email =
    req.headers.get("cf-access-authenticated-user-email") ||
    req.headers.get("Cf-Access-Authenticated-User-Email") ||
    "";

  const devEmail = process.env.DEV_USER_EMAIL || "";

  if (!email && !devEmail) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
