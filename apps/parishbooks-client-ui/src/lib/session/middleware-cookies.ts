import { NextResponse } from 'next/server';
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from './constants';

const cleared = { path: '/', maxAge: 0, httpOnly: true, sameSite: 'lax' as const };

/** Clear auth cookies on a middleware/proxy `NextResponse` (invalid or expired session). */
export function clearSessionCookies(response: NextResponse): void {
    response.cookies.set(ACCESS_COOKIE_NAME, '', cleared);
    response.cookies.set(REFRESH_COOKIE_NAME, '', cleared);
}
