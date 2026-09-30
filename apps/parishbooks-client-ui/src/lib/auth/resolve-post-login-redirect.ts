import 'server-only';

import { createApiClient } from '@parishbooks-ui/api-client';
import { getSession as getSessionApi, listOrganizations as listOrganizationsApi } from '@parishbooks-ui/api-client/generated/auth';
import { resolvePostLoginPath } from '@/lib/auth/post-login-destination';
import { getAccessToken } from '@/lib/session';

export async function resolvePostLoginRedirect(next?: string | null): Promise<string> {
    const token = await getAccessToken();
    if (!token) return '/sign-in';

    try {
        const client = createApiClient('auth', token);
        const sessionResponse = await getSessionApi({ client, throwOnError: true });
        let organizations: Awaited<ReturnType<typeof listOrganizationsApi>>['data'] = [];
        try {
            const orgsResponse = await listOrganizationsApi({ client, throwOnError: true });
            organizations = orgsResponse.data;
        } catch {
            organizations = [];
        }
        return resolvePostLoginPath({
            user: sessionResponse.data.user,
            session: sessionResponse.data.session,
            organizations,
            next,
        });
    } catch {
        return '/sign-in';
    }
}
