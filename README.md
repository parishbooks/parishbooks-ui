# ParishBooks UI

Nx monorepo for ParishBooks web applications.

| Project | Description |
| ------- | ----------- |
| [parishbooks-client-ui](apps/parishbooks-client-ui) | Parish admin client (Next.js) |
| [parishbooks-web-ui](apps/parishbooks-web-ui) | Marketing site (Next.js) |
| [@parishbooks-ui/design-system](libs/shared/design-system) | Shared shadcn/ui + Tailwind theme |
| [@parishbooks-ui/site-ui](libs/shared/site-ui) | Shared brand, layout, marketing shell components |
| [@parishbooks-ui/api-client](libs/shared/api-client) | Kong-facing OpenAPI clients |

See [docs/architecture/monorepo-structure.md](docs/architecture/monorepo-structure.md) for layout, env conventions, and how to add another app.

## Setup

```sh
bun install
cp .env.example .env.local
cp apps/parishbooks-client-ui/.env.example apps/parishbooks-client-ui/.env.local
cp apps/parishbooks-web-ui/.env.example apps/parishbooks-web-ui/.env.local
# Edit app env files (CLIENT_UI_ORIGIN, MARKETING_WEB_ORIGIN); root: gateway + service hosts
```

Regenerate API clients when backend OpenAPI changes (services must be reachable):

```sh
bun run openapi:generate
```

## Run

```sh
bun run dev          # client UI — port from CLIENT_UI_PORT in app .env.local (default 3000)
bun run dev:web      # marketing site — port from MARKETING_WEB_UI_PORT (default 3001)
bun run build
bun run lint
```

Per-project: `nx dev parishbooks-client-ui`, `nx dev parishbooks-web-ui`, `nx show project parishbooks-client-ui`.
