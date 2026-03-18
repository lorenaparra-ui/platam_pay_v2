# Migraciones centralizadas (`@migrations`)

Todas las migraciones del monorepo viven aquí. **Un solo orden global:** prefijo numérico en el nombre del archivo (`1700000000001-...ts`).

- Generar: `npm run migration:generate --name=DescripcionCambio` (desde `migrations-runner/`).
- Evitar timestamps duplicados entre equipos: coordinar secuencia o usar timestamp único (ms).
