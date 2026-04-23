# Prompts de IA (`.ai/prompts/`)

Prompts reutilizables para desarrollo alineado con el monorepo **platam-pay-v2**.

## Mapa rápido del repositorio

- **Microservicios Nest:** `apps/<nombre>-ms/` (`transversal-ms`, `suppliers-ms`, `products-ms`, `contracts-ms`, `notifications-ms`).
- **Librías de datos TypeORM:** `libs/transversal-data`, `libs/suppliers-data`, `libs/products-data`, `libs/disbursement-data`, `libs/collections-data`, `libs/shared`.
- **Migraciones TypeORM (fuente de verdad DDL operativa):** paquete `database/` → `database/src/migrations/` (workspace `@platam/database`).
- **DDL / modelo de referencia:** `.ai/schemas/database-schema.sql` y DBML en `.ai/schemas/` (patrón `schema_ppay_v*.dbml`).
- **Historias de usuario:** `.ai/user-stories/` (subcarpetas por contexto, p. ej. `hu-products-ms/`).

## Scripts útiles (raíz del monorepo)

- Arranque en caliente por MS: `npm run start:<ms>:dev` (ver `package.json` raíz).
- Migraciones: `npm run migration:show`, `migration:run`, `migration:revert` (delegan en `-w @platam/database`).

## Índice de prompts

| Ruta | Uso |
|------|-----|
| `dev/transversal/user-story-execution-plan.md` | Plan técnico desde HU + MS elegido |
| `dev/hexa-typeorm-ddl-entity.md` | Alinear dominio + lib `*-data` + repositorio TypeORM |
| `dev/create-endpoint-swagger.md` | Capa HTTP + Swagger sobre puerto ya implementado |
| `dev/create-safe-typeorm-migration.md` | Migraciones seguras en `database/` |
| `dev/create-module-service.md` | Módulo hexagonal (dominio + aplicación; ORM según convención) |
| `dev/create-microservice-file-tree-template.md` | Plantilla para **nuevo** MS (clonar convención actual) |
| `dev/endpoint-generation.md` | CRUD REST (referencia; preferir hexa + swagger) |
| `dev/partners/hu-hexa-typeorm-ddl-entity.md` | Análisis HU partners → `suppliers-ms` |
| `examples/*` | Checklists y plantillas generales |

Respuestas esperadas: **español**, sin secretos ni PII en ejemplos.
