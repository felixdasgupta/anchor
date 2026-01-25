import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./src/lib/auth0";

export async function middleware(request: NextRequest) {
	const response = await auth0.middleware(request);
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/auth")) {
		return response;
	}

	const session = await auth0.getSession(request);
	if (!session?.user) {
		return NextResponse.redirect(new URL("/login", request.url));
	}

	return response;
}

export const config = {
	matcher: [
		"/((?!api/auth|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)",
	],
};
