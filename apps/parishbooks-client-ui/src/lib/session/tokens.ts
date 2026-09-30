import 'server-only';

import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from './constants';
import { accessTokenCookieOptions } from './cookie-options';
import { deleteCookie, getCookie, setCookie } from './server-cookies';

export async function getAccessToken(): Promise<string | undefined> {
    return getCookie(ACCESS_COOKIE_NAME);
}

export async function setAccessToken(accessToken: string): Promise<void> {
    await setCookie(ACCESS_COOKIE_NAME, accessToken, accessTokenCookieOptions());
}

export async function deleteAccessToken(): Promise<void> {
    await deleteCookie(ACCESS_COOKIE_NAME);
}

export async function deleteRefreshToken(): Promise<void> {
    await deleteCookie(REFRESH_COOKIE_NAME);
}
