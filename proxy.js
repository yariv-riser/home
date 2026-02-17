import { NextResponse } from 'next/server';

export function proxy(req) {
  const isLoginPage = req.nextUrl.pathname.startsWith('/login');

  const authCookie = req.cookies.get('riser_auth');
  const isAuthenticated = authCookie?.value === 'authenticated';

  if (!isAuthenticated && !isLoginPage) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && isLoginPage) {
    const homeUrl = new URL('/', req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};