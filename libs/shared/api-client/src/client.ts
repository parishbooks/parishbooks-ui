import axios from 'axios';
import { createClient as createAuthClient, type Client as AuthClient } from './generated/auth/client';
import { createClient as createBillingClient, type Client as BillingClient } from './generated/billing/client';
import { createClient as createEventsClient, type Client as EventsClient } from './generated/events/client';
import { createClient as createGivingClient, type Client as GivingClient } from './generated/giving/client';
import { createClient as createLedgerClient, type Client as LedgerClient } from './generated/ledger/client';
import { createClient as createMemberClient, type Client as MemberClient } from './generated/member/client';
import { createClient as createOrgClient, type Client as OrgClient } from './generated/org/client';

export type ApiService = 'auth' | 'billing' | 'member' | 'events' | 'giving' | 'ledger' | 'org';

export type ServiceClient = AuthClient | BillingClient | MemberClient | EventsClient | GivingClient | LedgerClient | OrgClient;

/** Kong/gateway origin without `/api` — OpenAPI paths include `/api/...`. */
export function apiGatewayOrigin(): string {
    const base = process.env.API_BASE_URL ?? process.env.KONG_PROXY_URL ?? 'http://127.0.0.1:8000/api';
    return base.replace(/\/api\/?$/, '');
}

function axiosClientConfig(token?: string) {
    const instance = axios.create();
    return {
        baseURL: apiGatewayOrigin(),
        headers: { 'Content-Type': 'application/json' },
        axios: instance,
        auth: token ? async () => token : undefined,
    } as const;
}

export function createApiClient(service: 'auth', token?: string): AuthClient;
export function createApiClient(service: 'billing', token?: string): BillingClient;
export function createApiClient(service: 'member', token?: string): MemberClient;
export function createApiClient(service: 'events', token?: string): EventsClient;
export function createApiClient(service: 'giving', token?: string): GivingClient;
export function createApiClient(service: 'ledger', token?: string): LedgerClient;
export function createApiClient(service: 'org', token?: string): OrgClient;
export function createApiClient(service: ApiService, token?: string): ServiceClient {
    const config = axiosClientConfig(token);
    if (service === 'auth') return createAuthClient(config);
    if (service === 'billing') return createBillingClient(config);
    if (service === 'member') return createMemberClient(config);
    if (service === 'events') return createEventsClient(config);
    if (service === 'giving') return createGivingClient(config);
    if (service === 'ledger') return createLedgerClient(config);
    if (service === 'org') return createOrgClient(config);
    throw new Error(`Unknown API service: ${service satisfies never}`);
}
