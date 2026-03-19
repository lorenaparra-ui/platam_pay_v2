# CONTEXTO
Proyecto NestJS en monorepo (`platam_pay_users`, `platam_pay_partners`, `platam_pay_products`, `platam_pay_suppliers`, `platam_pay_transversal`) con arquitectura hexagonal y Swagger en `/docs`.

Este prompt implementa o ajusta **solo la capa HTTP** de un feature:
- `application/dto/*`
- `presentation/*controller.ts`
- wiring mínimo de módulo

No modifica dominio/infraestructura si ya están alineados con `hexa-typeorm-ddl-entity`.

## Rol y misión
Rol: Arquitecto de Software Senior (NestJS, DDD, Hexagonal).  
Misión: generar endpoints REST completos (CRUD o lectura), con Swagger y validaciones, sin exponer IDs internos.

## Prerrequisito
El feature ya debe tener:
- `domain/models/*`
- `domain/ports/*`
- repositorio TypeORM implementando el port
- token DI registrado (`RepositoryToken`)

## Identificadores de entrada
- **FeatureModuleName:** `<kebab-case>` (ej: `users`, `credit-applications`)
- **RepositoryToken:** `<TOKEN_DI>` (ej: `USERS_REPOSITORY`)
- **DomainPortName:** `<PortName>` (ej: `UserRepositoryPort`)
- **DomainModelName:** `<ModelName>` (ej: `User`)
- **EntityName:** `<singular-lower>` (ej: `user`)
- **BaseSegment:** `<segmento-opcional>` (ej: `register`; vacío permitido)
- **ParamName:** `<param-uuid>` (ej: `externalId`)
- **ApiTag:** `<swagger-tag>` (ej: `users`)

## Estructura objetivo
Feature:
- `src/modules/<FeatureModuleName>/application/dto/<entity>-response.dto.ts`
- `src/modules/<FeatureModuleName>/application/dto/create-<entity>-request.dto.ts`
- `src/modules/<FeatureModuleName>/application/dto/update-<entity>-request.dto.ts`
- `src/modules/<FeatureModuleName>/presentation/<feature>.controller.ts`
- `src/modules/<FeatureModuleName>/<feature>.module.ts` (solo wiring necesario)

Opcional transversal (catálogos read-only):
- `src/modules/transversal/application/dto/*`
- `src/modules/transversal/presentation/*controller.ts`

## Objetivo funcional
Implementar endpoints según capacidades del port:
- Si existe `findAll` -> `GET list`
- Si existe `findByExternalId` -> `GET by externalId`
- Si existe `create` -> `POST`
- Si existe `updateByExternalId` -> `PATCH`
- Si existe `deleteByExternalId` -> `DELETE`

Ruta base:
- `/<FeatureModuleName>/<BaseSegment>` (si BaseSegment no está vacío)
- `/<FeatureModuleName>` (si BaseSegment está vacío)

## Reglas obligatorias
- No exponer `id` incremental en rutas ni response.
- Siempre usar `externalId` (UUID) en rutas públicas con `ParseUUIDPipe`.
- Controller no importa entidades ORM.
- Response DTO: `@ApiProperty` (sin validadores).
- Request DTOs: `@ApiProperty` + `class-validator`.
- `ValidationPipe` global con `whitelist: true` (y `transform: true` recomendado).
- Manejo de no encontrado: `NotFoundException` (404).
- `DELETE` exitoso: `204 No Content`.
- No usar `console.log` en producción.

## Validación recomendada por tipo
- UUID: `@IsUUID('4')` (+ `@IsOptional()` si aplica)
- Email: `@IsEmail()`
- String: `@IsString()` + `@MaxLength(n)`
- Entero: `@IsInt()` + `@Min(0)` según regla
- Fecha ISO: `@IsDateString()` o `@IsISO8601()`
- Montos: string/entero según convención del proyecto (nunca float)

## Swagger mínimo por endpoint
- `@ApiTags(ApiTag)`
- `@ApiOperation`
- `@ApiParam` (si hay param UUID)
- `@ApiBody` (POST/PATCH)
- `@ApiResponse` (200/201/204/400/404)

## Checklist de implementación (DO)
1. Crear/actualizar DTOs `create/update/response`.
2. Crear/actualizar controller mapeando DTO -> payload del port.
3. Inyectar port por `RepositoryToken` (no implementación concreta).
4. Registrar controller en `<feature>.module.ts`.
5. Si token está en otro módulo, importar ese módulo.
6. Verificar rutas y contratos en `/docs`.

## No hacer (DON'T)
- No exponer modelo de dominio directamente al cliente.
- No duplicar mapeo en múltiples capas (usar helpers de mapeo).
- No meter lógica de negocio en validadores DTO.
- No usar `id` incremental en URLs públicas.

## Criterios de aceptación
- [ ] Build sin errores.
- [ ] Endpoints visibles en `/docs`.
- [ ] UUID validado con `ParseUUIDPipe`.
- [ ] `POST` retorna 201 con response DTO sin id interno.
- [ ] `GET/PATCH/DELETE by externalId` devuelven 404 si no existe.
- [ ] Body inválido retorna 400 con errores de validación.

## Definition of Done (DoD)
- [ ] Capa HTTP completa (`application/dto` + `presentation/controller`).
- [ ] Dominio e infraestructura no alterados innecesariamente.
- [ ] Build/lint en verde.
- [ ] Resumen final con pruebas y siguientes pasos.

## Formato de respuesta esperado
1) Decisiones ToT (4-6 bullets)  
2) Archivos creados/modificados  
3) Implementación (DTOs -> controller -> DI/wiring)  
4) Evidencia de validación (build/lint)  
5) Cómo probar en `/docs` + siguientes pasos

## Plantilla de rutas reutilizable
- `POST   /<FeatureModuleName>/<BaseSegment>`
- `GET    /<FeatureModuleName>/<BaseSegment>`
- `GET    /<FeatureModuleName>/<BaseSegment>/:<ParamName>`
- `PATCH  /<FeatureModuleName>/<BaseSegment>/:<ParamName>`
- `DELETE /<FeatureModuleName>/<BaseSegment>/:<ParamName>`

Si `BaseSegment` es vacío:
- `POST   /<FeatureModuleName>`
- `GET    /<FeatureModuleName>`
- `GET    /<FeatureModuleName>/:<ParamName>`
- `PATCH  /<FeatureModuleName>/:<ParamName>`
- `DELETE /<FeatureModuleName>/:<ParamName>`
