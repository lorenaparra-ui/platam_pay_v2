# migrations-runner

## DataSource único

- **Entidades:** `@libs/database` → `DATABASE_ENTITIES`.
- **Migraciones:** carpeta `src/infrastructure/database/migrations/` (alias TS **`@migrations`** / `@migrations/*` en `tsconfig.json`).
- **Config:** `src/config/typeorm.config.ts` exporta `default` = instancia `DataSource`.

## Scripts (desde esta carpeta)

| Script | Descripción |
|--------|-------------|
| `npm run migration:create --name=MiMigracion` | Crea migración vacía |
| `npm run migration:generate --name=Descripcion` | Genera diff entidades ↔ BD |
| `npm run migration:run` | Ejecuta migraciones pendientes (CLI TypeORM) |
| `npm run migration:revert` | Revierte la última |
| `npm run migration:run:locked` | Igual que `start`: corre migraciones con `pg_try_advisory_lock` |

Variables: `POSTGRES_HOST`, `POSTGRES_USERNAME`, `POSTGRES_PASSWORD`, `POSTGRES_DATABASE`, `TYPEORM_PORT` (opcional).

**Windows / PowerShell:** usar siempre `--name=Algo` (con valor) para que `$npm_config_name` se rellene.

## Timestamps

Un solo orden global: prefijo numérico creciente en el nombre del archivo (`1700000000001-...`). Coordinar entre equipos para no duplicar.
