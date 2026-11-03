
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = pathname.startsWith("/create-event");

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const sessionResponse = await fetch(
    new URL("/api/auth/get-session", request.url),
    {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      cache: "no-store",
    }
  );

  if (!sessionResponse.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const session = await sessionResponse.json();

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create-event/:path*"],
};
