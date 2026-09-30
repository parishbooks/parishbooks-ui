import axios from 'axios';

function messageFromApiBody(data: unknown): string | undefined {
    if (typeof data !== 'object' || data === null || !('message' in data)) return undefined;
    const message = data.message;
    if (typeof message === 'string') return message;
    if (Array.isArray(message)) return message.filter((part): part is string => typeof part === 'string').join(', ');
    return undefined;
}

export function apiErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const fromBody = messageFromApiBody(error.response?.data);
        if (fromBody) return fromBody;
        if (error.response?.status === 401) return 'Your session has expired. Please sign in again.';
    }
    if (error instanceof Error && error.message) return error.message;
    return fallback;
}

/** @deprecated Use `apiErrorMessage` */
export function signInErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error) && error.response?.status === 401) return 'Invalid email or password.';
    return apiErrorMessage(error, 'Failed to sign in. Please try again.');
}
