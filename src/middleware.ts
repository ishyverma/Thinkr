import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (token) {
    if (
      url.pathname.startsWith("/signin") ||
      url.pathname.startsWith("/signup")
    ) {
      return NextResponse.redirect(new URL("/thread", request.url));
    }
  } 

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/", "/thread/:path*"],
};
