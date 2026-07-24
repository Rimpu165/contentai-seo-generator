import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const protectedPaths = ["/dashboard", "/generate", "/content", "/settings", "/profile"]; 

  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Note: 'jsonwebtoken' relies on Node.js core modules (like 'crypto') 
    // which are not available in Next.js Edge runtime (middleware).
    // For now, simply checking for the token's presence allows the dashboard to open.
    // If you need strict verification in middleware, use the 'jose' package.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};