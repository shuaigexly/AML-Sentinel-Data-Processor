import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getLocaleFromHeaders, locales, defaultLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Skip static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Files with extensions
  ) {
    return NextResponse.next();
  }

  // Redirect root to detected locale
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    const locale = getLocaleFromHeaders(acceptLanguage);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // For other paths without locale, redirect to default locale
  return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Skip internal paths
    '/((?!_next|api|favicon.ico|.*\\.).*)',
  ],
};
