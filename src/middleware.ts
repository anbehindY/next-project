import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const isPublic =
		request.nextUrl.pathname === '/login' ||
		request.nextUrl.pathname === '/signup' ||
		request.nextUrl.pathname === '/verification' ||
		request.nextUrl.pathname === '/' ||
		request.nextUrl.pathname === '/reset' ||
		request.nextUrl.pathname === '/reset/newPassword';

	const token = '' || request.cookies.get('token');

	if (isPublic && token)
		return NextResponse.redirect(new URL('/profile', request.nextUrl));
	else if (!isPublic && !token)
		return NextResponse.redirect(new URL('/login', request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/', '/profile', '/profile/:path*', '/login', '/signup', '/verification', '/reset', '/reset/newPassword'],
};
