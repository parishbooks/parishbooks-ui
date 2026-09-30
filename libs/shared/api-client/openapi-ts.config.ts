import { resolve } from 'node:path';
import { defineConfig } from '@hey-api/openapi-ts';
import dotenv from 'dotenv';

/** Workspace root — shared `.env.local` holds gateway + service host URLs for codegen. */
const workspaceRoot = resolve(import.meta.dirname, '../../..');
dotenv.config({ path: resolve(workspaceRoot, '.env.local') });
dotenv.config({ path: resolve(workspaceRoot, '.env') });

/** Nest Swagger JSON at `{serviceHost}/api/docs-json` (see parishbooks-svc). */
export function openApiDocsUrl(serviceHost: string): string {
    return `${serviceHost.replace(/\/$/, '')}/api/docs-json`;
}

const SERVICE_HOSTS = [
    { slug: 'auth', envKey: 'AUTH_SERVICE_HOST' },
    { slug: 'billing', envKey: 'BILLING_SERVICE_HOST' },
    { slug: 'member', envKey: 'MEMBER_SERVICE_HOST' },
    { slug: 'events', envKey: 'EVENTS_SERVICE_HOST' },
    { slug: 'giving', envKey: 'GIVING_SERVICE_HOST' },
    { slug: 'ledger', envKey: 'LEDGER_SERVICE_HOST' },
    { slug: 'org', envKey: 'ORG_SERVICE_HOST' },
] as const;

const plugins = ['@hey-api/typescript', '@hey-api/sdk', { name: '@hey-api/client-axios', exportFromIndex: true }] as const;

function requireServiceHost(envKey: string): string {
    const host = process.env[envKey];
    if (!host) throw new Error(`Set ${envKey} in the workspace root .env.local (see .env.example)`);
    return host;
}

export default defineConfig(
    SERVICE_HOSTS.map(({ slug, envKey }) => ({
        input: openApiDocsUrl(requireServiceHost(envKey)),
        output: `./src/generated/${slug}`,
        plugins: [...plugins],
    })),
);
