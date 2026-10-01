# UI monorepo structure

Nx workspace for ParishBooks web UIs. Multiple Next.js apps share libraries; each app keeps routing, layouts, and product-specific features.

## Layout

```
apps/
  parishbooks-client-ui/       # Parish admin client (Next.js App Router)
  parishbooks-web-ui/          # Marketing site (Next.js App Router)
  <future-app>/                # e.g. kiosk — same patterns

libs/
  shared/
    design-system/             # shadcn/ui, theme, Tailwind globals, cn()
    site-ui/                   # Cross-app shell: Container, SiteBrand, marketing primitives
    api-client/                # OpenAPI-generated clients + createApiClient()
  client/                      # (future) auth/session shared by parish-facing apps
```

## Apps vs libs

| Layer | Owns |
| ----- | ---- |
| **App** | `src/app` routes, `proxy.ts`, server actions, dashboard/auth shells, env overrides (`CLIENT_UI_ORIGIN`) |
| **design-system** | Reusable UI primitives, `globals.css`, `ThemeProvider`, hooks like `useIsMobile` |
| **site-ui** | Shared layout/brand between `parishbooks-web-ui` and `parishbooks-client-ui`; marketing token bridge CSS |
| **api-client** | Gateway axios clients generated from `parishbooks-svc` OpenAPI |

New apps should depend on `@parishbooks-ui/design-system` and `@parishbooks-ui/api-client`, not copy components. Parish-facing surfaces also use `@parishbooks-ui/site-ui`.

## Nx tags & boundaries

| Tag | Meaning |
| --- | ------- |
| `type:app` | Deployable Next.js application |
| `type:ui` | Presentational / design-system code |
| `type:data-access` | API clients and similar I/O |
| `scope:shared` | Safe for any app to import |
| `scope:<app>` | App-specific (e.g. `scope:client-ui`) |

Enforced via `@nx/enforce-module-boundaries` in the root `eslint.config.mjs`: apps may only import `scope:shared` libs; shared libs never import apps.

## Environment files

Two layers (unlike `parishbooks-svc`, where one root `.env` feeds every Nest app):

| File | Purpose |
| ---- | ------- |
| **Root** `.env.example` → `.env.local` | Shared gateway URL, `NEXT_PUBLIC_*`, service hosts for OpenAPI codegen |
| **Per app** `apps/<name>/.env.example` → `.env.local` | Dev port (`CLIENT_UI_PORT` / `MARKETING_WEB_UI_PORT`, `PORT`), public origin URL, app secrets |

Next.js loads env from the **app directory**; `next.config.js` also loads the **workspace root** so you do not duplicate gateway/service host variables in every app.

OpenAPI generation reads the **workspace root** `.env.local` (`libs/shared/api-client/openapi-ts.config.ts`).

## Commands

```bash
bun run dev                    # parishbooks-client-ui
bun run dev:web                # parishbooks-web-ui (port from apps/parishbooks-web-ui/.env.local)
bun run build
bun run build:web
bun run openapi:generate       # @parishbooks-ui/api-client
bun run lint                   # all projects
nx g @nx/next:app <name>       # scaffold another UI app
```

## Adding a new UI app

1. `nx g @nx/next:app <name> --directory=apps/<name> --tags=scope:<name>,type:app`
2. Add `@parishbooks-ui/design-system` and `@parishbooks-ui/api-client` to the app `package.json`.
3. In `next.config.js`: `transpilePackages`, root + app `dotenv` (copy from `parishbooks-client-ui`).
4. Root layout: `import '@parishbooks-ui/design-system/styles/globals.css'`.
5. Add `apps/<name>/.env.example` for app-only variables; keep shared values at repo root.

Extract cross-app logic (e.g. session cookies) into `libs/client/*` when a second app needs it — not before.
