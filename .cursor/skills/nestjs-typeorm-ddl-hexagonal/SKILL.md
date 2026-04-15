---
name: nestjs-typeorm-ddl-hexagonal
description: Alinea dominio hexagonal (NestJS) con entidades TypeORM en libs de datos, mappers/repositorios en apps/<ms>/src/infrastructure/database y migraciones @platam/database frente al DDL (.ai/schemas/database-schema.sql). Usar al crear entidades o corregir desalineación dominio ↔ ORM ↔ DDL.
---

# NestJS + TypeORM + DDL (arquitectura hexagonal)

## Objetivo

Aplicar una plantilla consistente para desarrollar o alinear una entidad backend en:

- Dominio: modelo + puerto (sin TypeORM).
- Infraestructura: entidad ORM + mapper + repositorio TypeORM + provider DI.
- Módulos Nest: binding por token.

Con foco en:

- dominio desacoplado de TypeORM
- alineación real con **`.ai/schemas/database-schema.sql`** (y DBML en `.ai/schemas/` cuando aplique)
- soporte de `external_id` en BD y `externalId` / `external_id` en dominio según convención del módulo
- migraciones versionadas en **`database/src/migrations/`** (skill relacionada: `platam-typeorm-migrations`; regla: `.cursor/rules/03-migrations.mdc`)

## Inputs mínimos requeridos

- Nombre de entidad de dominio (ej: `Partner`, `Contract`)
- Nombre de entidad ORM (ej: `PartnerEntity`)
- Tabla DDL objetivo (ej: `partners`)
- Campos de tabla (tipos, nullability, defaults)
- Token de puerto (ej: `PARTNER_REPOSITORY`)

## Flujo recomendado (ToT resumido)

1. **Decisión de identidad**
   - Interno: `id` / bigint (según DDL)
   - Público: `external_id` en columna, expuesto en dominio/API según patrón del MS

2. **Decisión de mapeo**
   - Mapear ORM → dominio con mapper dedicado
   - No mapear directamente en controladores/casos de uso

3. **Decisión de contratos**
   - Puerto en dominio define operaciones (`findAll`, `findById`, `findByExternalId` cuando aplique)
   - Repositorio TypeORM implementa el puerto

4. **Decisión de wiring**
   - Registrar `provide: TOKEN` + `useClass: TypeOrm...Repository`
   - Inyectar por token en capa superior

## Do

- Crear o actualizar (sustituir `<ms>` y `<module>` por el microservicio y bounded context reales):

  - Dominio bajo `apps/<ms>/src/modules/<module>/domain/`:
    - **`entities/*.ts`** o **`models/*.ts`** (el repo usa ambas convenciones según módulo; copiar el estilo del bounded context vecino).
    - **`ports/*.repository.port.ts`** (o subcarpeta `ports/...` si el módulo ya la usa).

  - Entidad **TypeORM** (mapeo a tabla): en **`libs/<lib-de-datos>/src/entities/<entity>.entity.ts`** (nombre de lib según `nest-cli.json` y `package.json`), con export en el barrel / arreglo de entidades de esa lib, consumido por `database/src/data-source.ts` y por los MS que importen esa lib.

  - Infraestructura del MS (patrón habitual):
    - `apps/<ms>/src/infrastructure/database/mappers/<entity>.mapper.ts`
    - `apps/<ms>/src/infrastructure/database/repositories/typeorm-<entity>.repository.ts`

  - Módulo DI (`*.module.ts`) donde se registra el provider.

- Alinear nombres de columna con `@Column({ name: '...' })` cuando el DDL use snake_case.
- Si la tabla incluye `external_id` y la lib expone una base común, extender **`BaseExternalIdEntity`** (u homólogo) definido en esa misma lib de datos.
- Validar build y lints luego de cambios.

## Don't

- No importar TypeORM en dominio.
- No exponer entidades ORM fuera de infraestructura.
- No usar `id` autoincremental en rutas públicas cuando el producto exija `externalId` en el borde HTTP.
- No meter lógica de negocio en repositorios.
- No dejar mapeos implícitos que contradigan el DDL.

## Criterios de aceptación

- [ ] Dominio sin dependencias de framework/ORM
- [ ] Entidad ORM alineada al DDL (tabla/campos/tipos)
- [ ] Mapper completo `toDomain` y `toEntity` (o equivalente del repo)
- [ ] Puerto implementado por repositorio TypeORM
- [ ] Provider registrado con token
- [ ] Build en verde
- [ ] Sin lints nuevos

## Definición de Terminado (DoD)

- [ ] Endpoints/servicios consumen modelo de dominio, no ORM entity
- [ ] Identificador público disponible cuando el modelo y la API lo requieran
- [ ] Consultas internas pueden seguir usando claves internas según DDL
- [ ] Cambios documentados brevemente (qué se alineó con DDL y por qué)

## Plantilla de prompt reutilizable

```md
Actúa como backend senior en NestJS + TypeORM con arquitectura hexagonal.

Tarea:
Implementar/alinear la entidad <DomainModelName> usando el DDL de la tabla <table_name>.

Objetivo:
1) Dominio: modelo + puerto
2) Infraestructura: entidad ORM + mapper + repositorio TypeORM
3) DI: provider por token

Restricciones:
- El dominio NO depende de TypeORM/NestJS.
- Mapear ORM <-> dominio con mapper dedicado.
- Alinear con `.ai/schemas/database-schema.sql` y migración en `database/src/migrations/` si aplica.
- Respetar convención de nombres del microservicio (DTO vs dominio).

Do:
- Crear/actualizar modelo, puerto, entidad en la lib de datos adecuada, mapper, repositorio y módulo de providers.
- Agregar `findByExternalId` cuando aplique exposición pública.

Don't:
- No usar ORM entities en dominio.
- No inyectar implementaciones concretas donde deba ir token.

Entrega esperada:
1) Resumen breve de decisiones técnicas
2) Lista de archivos cambiados
3) Implementación por capas (domain -> infra -> DI)
4) Validación (build/lint)
5) Riesgos y próximos pasos
```
