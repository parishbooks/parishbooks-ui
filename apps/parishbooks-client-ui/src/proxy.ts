import { NextResponse, type NextRequest } from 'next/server';
import { POST_LOGIN_CONTINUE_PATH } from '@/lib/auth/continue-url';
import { isValidAccessToken } from '@/lib/proxy/access-token';
import { ACCESS_COOKIE_NAME, clearSessionCookies } from '@/lib/session';

/** Signed-in users are sent here instead of sign-in / sign-up. */
const GUEST_ONLY_PREFIXES = ['/sign-in', '/sign-up'];

/** Requires a valid access token (JWT shape + unexpired). */
const PROTECTED_PREFIXES = ['/dashboard', '/onboarding'];

function matchesPrefix(pathname: string, prefixes: string[]): boolean {
    return prefixes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function signInRedirect(request: NextRequest, pathname: string): NextResponse {
    const url = new URL('/sign-in', request.url);
    if (pathname !== '/' && !matchesPrefix(pathname, GUEST_ONLY_PREFIXES)) url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
}

function resolveSession(request: NextRequest): { valid: boolean; raw: string | undefined } {
    const raw = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
    return { valid: isValidAccessToken(raw), raw };
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const { valid: hasValidSession, raw: accessToken } = resolveSession(request);
    if (accessToken && !hasValidSession) {
        if (matchesPrefix(pathname, PROTECTED_PREFIXES) || pathname === '/' || pathname === POST_LOGIN_CONTINUE_PATH) {
            const response = signInRedirect(request, pathname);
            clearSessionCookies(response);
            return response;
        } else {
            const response = NextResponse.next();
            clearSessionCookies(response);
            return response;
        }
    }

    if (!hasValidSession && pathname === POST_LOGIN_CONTINUE_PATH) return signInRedirect(request, pathname);
    if (!hasValidSession && matchesPrefix(pathname, PROTECTED_PREFIXES)) return signInRedirect(request, pathname);
    if (hasValidSession && pathname === '/') return NextResponse.redirect(new URL(POST_LOGIN_CONTINUE_PATH, request.url));
    if (hasValidSession && matchesPrefix(pathname, GUEST_ONLY_PREFIXES)) return NextResponse.redirect(new URL(POST_LOGIN_CONTINUE_PATH, request.url));
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
