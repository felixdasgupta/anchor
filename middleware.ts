import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./src/lib/auth0";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Public routes (never gated)
	if (
		pathname === "/login" ||
		pathname.startsWith("/api/auth") ||
		pathname.startsWith("/_next") ||
		pathname === "/favicon.ico" ||
		pathname === "/robots.txt" ||
		pathname === "/sitemap.xml"
	) {
		return NextResponse.next();
	}

	// Run Auth0 middleware (handles session cookies etc.)
	const res = await auth0.middleware(request);

	// Enforce auth
	const session = await auth0.getSession(request);
	if (!session?.user) {
		const loginUrl = new URL("/api/auth/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return res;
}

export const config = {
	matcher: ["/((?!api/auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
