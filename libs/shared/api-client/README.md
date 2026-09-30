# @parishbooks-ui/api-client

OpenAPI-generated axios clients and `createApiClient()` for the Kong gateway.

Codegen (uses workspace root `.env.local` for service hosts):

```sh
bun run openapi:generate
# or: nx run @parishbooks-ui/api-client:openapi:generate
```

```ts
import { createApiClient } from '@parishbooks-ui/api-client';
import { signIn } from '@parishbooks-ui/api-client/generated/auth';
```
