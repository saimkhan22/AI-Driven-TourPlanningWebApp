import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const protectedRoutes = [
    '/dashboard',
    '/plan-trip',
    '/hotels',
    '/vehicles',
    '/destinations',
  ];

  const isProtected = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If NOT logged in & trying to access protected page
  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/plan-trip/:path*',
    '/hotels/:path*',
    '/vehicles/:path*',
    '/destinations/:path*',
  ],
};
