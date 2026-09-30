/** Edge-safe JWT checks for `proxy.ts` (format + expiry only; signature verified by API). */

const CLOCK_SKEW_MS = 30_000;

function decodeBase64Url(segment: string): string {
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    return atob(padded);
}

export function accessTokenExpiresAt(token: string): number | null {
    const parts = token.trim().split('.');
    if (parts.length !== 3) return null;
    try {
        const payload = JSON.parse(decodeBase64Url(parts[1])) as { exp?: unknown };
        return typeof payload.exp === 'number' ? payload.exp : null;
    } catch {
        return null;
    }
}

export function isValidAccessToken(token: string | undefined): boolean {
    if (!token?.trim()) return false;
    const exp = accessTokenExpiresAt(token);
    if (exp === null) return false;
    return exp * 1000 > Date.now() + CLOCK_SKEW_MS;
}
