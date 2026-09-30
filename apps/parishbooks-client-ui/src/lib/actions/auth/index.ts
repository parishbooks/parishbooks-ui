'use server';

import { createApiClient } from '@parishbooks-ui/api-client';
import type { GetSessionResponseDto, GoogleSignInResponseDto, RequestPasswordResetResponseDto, SignUpResponseDto } from '@parishbooks-ui/api-client/generated/auth';
import {
    changePassword as changePasswordApi,
    forgotPassword as forgotPasswordApi,
    getSession as getSessionApi,
    getToken as getTokenApi,
    googleSignIn as googleSignInApi,
    resetPassword as resetPasswordApi,
    sendEmailOtp as sendEmailOtpApi,
    signIn as signInApi,
    signOut as signOutApi,
    signUp as signUpApi,
    updateProfile as updateProfileApi,
    verifyEmailOtp as verifyEmailOtpApi,
} from '@parishbooks-ui/api-client/generated/auth';
import { deleteAccessToken, deleteRefreshToken, getAccessToken, setAccessToken } from '@/lib/session';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { redirect } from 'next/navigation';
import { postLoginContinueUrl } from '@/lib/auth/continue-url';
import { apiErrorMessage } from './errors';

export type ActionResult<T = void> = { success: true; data: T } | { success: false; error: string };

function clientUiOrigin(): string {
    return process.env.CLIENT_UI_ORIGIN ?? 'http://127.0.0.1:3000';
}

function callbackUrl(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${clientUiOrigin()}${normalized}`;
}

function actionFailure(error: unknown, fallback: string): ActionResult<never> {
    return { success: false, error: apiErrorMessage(error, fallback) };
}

async function persistAccessToken(token: string | null | undefined): Promise<boolean> {
    if (!token) return false;
    await setAccessToken(token);
    return true;
}

async function authClientWithSession() {
    const token = await getAccessToken();
    if (!token) return undefined;
    return createApiClient('auth', token);
}

export async function signIn(email: string, password: string, rememberMe?: boolean, next?: string | null): Promise<ActionResult> {
    try {
        const trimmedEmail = email.trim();
        if (!trimmedEmail || !password) return { success: false, error: 'Email and password are required.' };
        const client = createApiClient('auth');
        const response = await signInApi({ client, body: { email: trimmedEmail, password, rememberMe }, throwOnError: true });
        await setAccessToken(response.data.token);
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return actionFailure(error, 'Failed to sign in. Please try again.');
    }
    redirect(postLoginContinueUrl(next));
}

export async function signUp(name: string, email: string, password: string): Promise<ActionResult> {
    try {
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        if (!trimmedName || !trimmedEmail || !password) return { success: false, error: 'Name, email, and password are required.' };
        const client = createApiClient('auth');
        const response = await signUpApi({
            client,
            body: { name: trimmedName, email: trimmedEmail, password, callbackURL: callbackUrl('/verify-email') },
            throwOnError: true,
        });
        const { token, user } = response.data as SignUpResponseDto;
        if (await persistAccessToken(token)) redirect(postLoginContinueUrl());
        redirect(`/verify-email?email=${encodeURIComponent(user.email)}`);
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return actionFailure(error, 'Failed to create account. Please try again.');
    }
}

export async function googleSignIn(callbackURL?: string): Promise<ActionResult<{ url: string }>> {
    try {
        const client = createApiClient('auth');
        const response = await googleSignInApi({
            client,
            body: { callbackURL: callbackURL ?? callbackUrl('/continue') },
            throwOnError: true,
        });
        const data = response.data as GoogleSignInResponseDto;
        if (data.url) return { success: true, data: { url: data.url } };
        if (data.token && (await persistAccessToken(data.token))) redirect(postLoginContinueUrl());
        return { success: false, error: 'Google sign-in did not return a redirect URL.' };
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return actionFailure(error, 'Failed to start Google sign-in.');
    }
}

export async function signOut(): Promise<ActionResult> {
    const client = await authClientWithSession();
    if (client) {
        try {
            await signOutApi({ client, throwOnError: false });
        } catch {
            /* clear local session even if upstream sign-out fails */
        }
    }
    await deleteAccessToken();
    await deleteRefreshToken();
    redirect('/sign-in');
}

export async function getSession(): Promise<ActionResult<GetSessionResponseDto>> {
    const client = await authClientWithSession();
    if (!client) return { success: false, error: 'Not authenticated.' };
    try {
        const response = await getSessionApi({ client, throwOnError: true });
        return { success: true, data: response.data };
    } catch (error) {
        return actionFailure(error, 'Failed to load session.');
    }
}

export async function refreshAccessToken(): Promise<ActionResult<{ token: string }>> {
    const client = await authClientWithSession();
    if (!client) return { success: false, error: 'Not authenticated.' };
    try {
        const response = await getTokenApi({ client, throwOnError: true });
        await setAccessToken(response.data.token);
        return { success: true, data: { token: response.data.token } };
    } catch (error) {
        await deleteAccessToken();
        return actionFailure(error, 'Session expired. Please sign in again.');
    }
}

export async function sendEmailOtp(email: string): Promise<ActionResult<{ status: boolean }>> {
    try {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) return { success: false, error: 'Email is required.' };
        const client = createApiClient('auth');
        const response = await sendEmailOtpApi({ client, body: { email: trimmedEmail }, throwOnError: true });
        return { success: true, data: { status: response.data.status } };
    } catch (error) {
        return actionFailure(error, 'Failed to send verification code.');
    }
}

export async function verifyEmailOtp(email: string, otp: string): Promise<ActionResult> {
    try {
        const trimmedEmail = email.trim();
        if (!trimmedEmail || !otp.trim()) return { success: false, error: 'Email and verification code are required.' };
        const client = createApiClient('auth');
        await verifyEmailOtpApi({ client, body: { email: trimmedEmail, otp: otp.trim() }, throwOnError: true });
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return actionFailure(error, 'Invalid or expired verification code.');
    }
    redirect(postLoginContinueUrl());
}

export async function forgotPassword(email: string): Promise<ActionResult<{ message: string }>> {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return { success: false, error: 'Email is required.' };
    const genericMessage = 'If an account exists for that email, you will receive a reset link shortly.';
    try {
        const client = createApiClient('auth');
        const response = await forgotPasswordApi({
            client,
            body: { email: trimmedEmail, redirectTo: callbackUrl('/reset-password') },
            throwOnError: true,
        });
        const data = response.data as RequestPasswordResetResponseDto;
        return { success: true, data: { message: data.message || genericMessage } };
    } catch {
        return { success: true, data: { message: genericMessage } };
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<ActionResult> {
    try {
        if (!token.trim() || !newPassword) return { success: false, error: 'Reset token and new password are required.' };
        const client = createApiClient('auth');
        await resetPasswordApi({ client, body: { token: token.trim(), newPassword }, throwOnError: true });
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return actionFailure(error, 'Failed to reset password. The link may have expired.');
    }
    redirect('/sign-in?reset=1');
}

export async function changePassword(currentPassword: string, newPassword: string, revokeOtherSessions?: boolean): Promise<ActionResult> {
    const client = await authClientWithSession();
    if (!client) return { success: false, error: 'Not authenticated.' };
    if (!currentPassword || !newPassword) return { success: false, error: 'Current and new passwords are required.' };
    try {
        await changePasswordApi({ client, body: { currentPassword, newPassword, revokeOtherSessions }, throwOnError: true });
        return { success: true, data: undefined };
    } catch (error) {
        return actionFailure(error, 'Failed to change password.');
    }
}

export async function updateProfile(input: { name?: string; image?: string }): Promise<ActionResult<{ status: boolean }>> {
    const client = await authClientWithSession();
    if (!client) return { success: false, error: 'Not authenticated.' };
    try {
        const response = await updateProfileApi({ client, body: input, throwOnError: true });
        return { success: true, data: { status: response.data.status } };
    } catch (error) {
        return actionFailure(error, 'Failed to update profile.');
    }
}
