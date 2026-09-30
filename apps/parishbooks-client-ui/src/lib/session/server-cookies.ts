import 'server-only';

import { cookies } from 'next/headers';

export type CookieOptions = {
    path?: string;
    domain?: string;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
};

const defaultOptions: CookieOptions = {
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
};

export async function setCookie(name: string, value: string, options: CookieOptions): Promise<void> {
    const store = await cookies();
    store.set(name, value, { ...defaultOptions, ...options });
}

export async function getCookie(name: string): Promise<string | undefined> {
    const store = await cookies();
    return store.get(name)?.value;
}

export async function deleteCookie(name: string): Promise<void> {
    const store = await cookies();
    store.delete(name);
}
