---
name: project-conventions
description: Convenciones de nomenclatura, estructura de carpetas y patrones de código del monorepo NestJS de Platam Pay. Usar cuando se crea un nuevo módulo, servicio, entidad, use case, DTO, repositorio o cualquier archivo nuevo en apps/ o libs/. También útil al revisar si un archivo cumple las convenciones del proyecto.
---

# Convenciones del Proyecto — Platam Pay V2

## Estructura del Monorepo

```
platam_pay_v2/
├── apps/
│   ├── transversal-ms/   # Port 8080 — Auth, Cognito, S3, catálogos
│   ├── suppliers-ms/     # Port 8081 — Onboarding de partners
│   ├── products-ms/      # Port 8083 — Productos crediticios y préstamos
│   ├── contracts-ms/     # Port 8084 — Contratos y firma electrónica (ZapSign)
│   └── notifications-ms/ # Emails (Resend), SMS/WhatsApp (Twilio)
├── libs/
│   ├── shared/           # Enums, tipos y domain interfaces transversales
│   ├── transversal-data/ # Entidades TypeORM del dominio transversal
│   ├── products-data/
│   ├── suppliers-data/
│   ├── disbursement-data/
│   └── collections-data/
└── database/             # TypeORM CLI centralizado + migraciones
```

## Estructura Interna de Cada Módulo (Clean Architecture)

```
src/modules/{modulo}/
├── domain/
│   ├── models/           # Interfaces de dominio puras (no TypeORM)
│   ├── ports/            # Interfaces de repositorios y servicios externos
│   └── entities/         # Entidades de dominio (no confundir con TypeORM entities)
├── application/
│   ├── dto/              # Payloads internos (entre capas de la app)
│   ├── use-cases/        # Un archivo por caso de uso, un solo método execute()
│   ├── services/         # Servicios de orquestación (si hay lógica cross-use-case)
│   ├── mappers/          # Funciones de transformación domain ↔ dto
│   └── exceptions/       # Excepciones de dominio específicas del módulo
├── infrastructure/
│   ├── repositories/     # Implementaciones TypeORM de los puertos de dominio
│   ├── adapters/         # Adaptadores AWS (Cognito, S3, SQS, EventBridge)
│   └── database/         # Config de TypeORM local si aplica
└── presentation/
    ├── controllers/      # Controladores HTTP — solo orquestan, sin lógica
    ├── decorators/       # Decoradores custom (@RequireRoles, etc.)
    └── dto/              # DTOs de request/response de la API (con Swagger)
```

## Nomenclatura de Archivos

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Use Case | `{accion}-{entidad}.use-case.ts` | `create-role.use-case.ts` |
| Repository interface | `{entidad}.repository.ts` | `role.repository.ts` |
| Repository impl | `{entidad}.repository.impl.ts` | `role.repository.impl.ts` |
| TypeORM Entity | `{entidad}.entity.ts` | `role.entity.ts` — en libs/ |
| Controller | `{entidad}s.controller.ts` | `roles.controller.ts` |
| DTO | `{accion}-{entidad}.dto.ts` | `create-role.dto.ts` |
| Mapper | `{entidad}.mapper.ts` o función `to_{entidad}_response_dto()` |
| Módulo NestJS | `{modulo}.module.ts` | `transversal.module.ts` |

## Nomenclatura de Variables y Funciones

- **snake_case** para variables, parámetros y propiedades privadas:
  ```typescript
  private readonly role_repository: RoleRepository
  const saga_id = await this.create_partner_orchestrator.start_async(...)
  ```
- **camelCase** para propiedades de DTOs y entidades TypeORM:
  ```typescript
  externalId: string;
  createdAt: Date;
  ```
- **SCREAMING_SNAKE_CASE** para tokens de inyección:
  ```typescript
  export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
  @Inject(ROLE_REPOSITORY) private readonly role_repository: RoleRepository
  ```
- **PascalCase** para clases, interfaces, enums y tipos:
  ```typescript
  export class CreateRoleUseCase { ... }
  export interface RoleRepository { ... }
  ```

## Esquema de Base de Datos (TypeORM)

- Cada dominio tiene su propio schema de PostgreSQL: `transversal_schema`, `suppliers_schema`, etc.
- Todas las entidades extienden `BaseExternalIdEntity`:
  ```typescript
  @Entity({ name: 'roles', schema: 'transversal_schema' })
  export class RoleEntity extends BaseExternalIdEntity {
    // BaseExternalIdEntity provee: id (bigint PK), externalId (uuid, unique), createdAt, updatedAt
  }
  ```
- Nombres de columnas en `snake_case` con decorador explícito: `@Column({ name: 'external_id' })`
- Enums de PostgreSQL con `enumName` explícito para evitar colisiones

## Inyección de Dependencias

Siempre usar tokens string exportados, no referencias directas a clases:

```typescript
// En el módulo:
{ provide: ROLE_REPOSITORY, useClass: RoleRepositoryImpl }

// En el use case:
constructor(@Inject(ROLE_REPOSITORY) private readonly role_repository: RoleRepository) {}
```

## Imports

- Paths absolutos via tsconfig paths: `@platam/shared`, `@platam/transversal-data`, etc.
- Nunca imports relativos cruzando capas (infrastructure no importa de presentation)
- Orden: NestJS → librerías externas → `@platam/*` → rutas relativas internas

## Logger

Cada use case y servicio instancia su propio logger:
```typescript
private readonly logger = new Logger(CreateRoleUseCase.name);
```
