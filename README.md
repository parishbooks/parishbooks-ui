# ParishBooks UI

Nx monorepo for ParishBooks web applications.

| Project | Description |
| ------- | ----------- |
| [parishbooks-client-ui](apps/parishbooks-client-ui) | Parish admin client (Next.js) |
| [@parishbooks-ui/design-system](libs/shared/design-system) | Shared shadcn/ui + Tailwind theme |
| [@parishbooks-ui/api-client](libs/shared/api-client) | Kong-facing OpenAPI clients |

See [docs/architecture/monorepo-structure.md](docs/architecture/monorepo-structure.md) for layout, env conventions, and how to add another app.

## Setup

```sh
bun install
cp .env.example .env.local
cp apps/parishbooks-client-ui/.env.example apps/parishbooks-client-ui/.env.local
# Edit both files (root: gateway + service hosts; app: CLIENT_UI_ORIGIN)
```

Regenerate API clients when backend OpenAPI changes (services must be reachable):

```sh
bun run openapi:generate
```

## Run

```sh
bun run dev
bun run build
bun run lint
```

Per-project: `nx dev parishbooks-client-ui`, `nx show project parishbooks-client-ui`.
