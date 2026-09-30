import type { OrganizationDto, SessionDto, UserResponseDto } from '@parishbooks-ui/api-client/generated/auth';
import { safeNextPath } from '@/lib/auth/safe-next-path';

export type PostLoginContext = {
    user: UserResponseDto;
    session: SessionDto;
    organizations: OrganizationDto[];
    next?: string | null;
};

export type PostLoginGate = {
    id: string;
    when: (ctx: PostLoginContext) => boolean;
    path: (ctx: PostLoginContext) => string;
};

/** Ordered gates — first match wins. Add future rules here. */
export const postLoginGates: PostLoginGate[] = [
    {
        id: 'email-verification',
        when: (ctx) => !ctx.user.emailVerified,
        path: (ctx) => `/verify-email?email=${encodeURIComponent(ctx.user.email)}`,
    },
    {
        id: 'organization-setup',
        when: (ctx) => !ctx.session.activeOrganizationId,
        path: () => '/onboarding',
    },
];

export function resolvePostLoginPath(ctx: PostLoginContext): string {
    for (const gate of postLoginGates) {
        if (gate.when(ctx)) return gate.path(ctx);
    }
    return safeNextPath(ctx.next);
}
