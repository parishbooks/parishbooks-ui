import type { CookieOptions } from './server-cookies';

/** Match auth-svc JWT access token lifetime (~15 minutes). */
export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 15;

export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export function accessTokenCookieOptions(): CookieOptions {
    return {
        path: '/',
        maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
    };
}
