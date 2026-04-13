---
name: hexagonal-typeorm-ddl-entity-alignment
description: Implementa y alinea entidades TypeORM, mappers, puertos y repositorios con un DDL PostgreSQL bajo arquitectura hexagonal. Usar cuando se creen nuevas entidades backend o cuando haya desalineación entre dominio e infraestructura.
---

# Hexagonal TypeORM DDL Entity Alignment

## Objetivo

Aplicar una plantilla consistente para desarrollar o alinear una entidad backend en:
- Dominio: modelo + puerto
- Infraestructura: entidad ORM + mapper + repositorio TypeORM + provider DI
- Configuración de módulos: binding por token

Con foco en:
- dominio desacoplado de TypeORM
- alineación real con DDL
- soporte de `external_id` como identificador público

## Inputs mínimos requeridos

- Nombre de entidad de dominio (ej: `BusinessSeniority`)
- Nombre de entidad ORM (ej: `BusinessSeniorityEntity`)
- Tabla DDL objetivo (ej: `business_seniority`)
- Campos de tabla (tipos, nullability, defaults)
- Token de puerto (ej: `BUSINESS_SENIORITY_REPOSITORY`)

## Flujo recomendado (ToT resumido)

1. **Decisión de identidad**
   - Interno: `id` (bigint)
   - Público: `externalId` (uuid)

2. **Decisión de mapeo**
   - Mapear ORM -> dominio con mapper dedicado
   - No mapear directamente en controladores/casos de uso

3. **Decisión de contratos**
   - Puerto en dominio define operaciones (`findAll`, `findById`, `findByExternalId` cuando aplique)
   - Repositorio TypeORM implementa el puerto

4. **Decisión de wiring**
   - Registrar `provide: TOKEN` + `useClass: TypeOrm...Repository`
   - Inyectar por token en capa superior

## Do

- Crear o actualizar (sustituir `<ms>` y `<module>` por el microservicio y bounded context reales, p. ej. `transversal-ms` + `transversal`):
  - `apps/<ms>/src/modules/<module>/domain/models/<entity>.model.ts`
  - `apps/<ms>/src/modules/<module>/domain/ports/<entity>.repository.port.ts` (o subcarpeta `ports/...` si el módulo ya la usa)
  - Entidad **TypeORM** (mapeo a tabla): preferentemente en `libs/<*-data>/src/entities/<entity>.entity.ts` con export en el barrel de esa lib (no confundir con entidades de **dominio** tipo `apps/<ms>/src/modules/<module>/domain/entities/*.ts`, que son modelos ricos sin decoradores ORM)
  - `apps/<ms>/src/infrastructure/database/mappers/<entity>.mapper.ts`
  - `apps/<ms>/src/infrastructure/database/repositories/typeorm-<entity>.repository.ts`
  - Módulo DI donde se registra el provider
- Alinear nombres de columna con `@Column({ name: '...' })` cuando el DDL use `snake_case`.
- Usar `BaseExternalIdEntity` si la tabla tiene `external_id`, `created_at`, `updated_at`.
- Validar build y lints luego de cambios.

## Don't

- No importar TypeORM en dominio.
- No exponer entidades ORM fuera de infraestructura.
- No usar `id` autoincremental en rutas públicas.
- No meter lógica de negocio en repositorios.
- No dejar mapeos implícitos que contradigan el DDL.

## Criterios de aceptación

- [ ] Dominio sin dependencias de framework/ORM
- [ ] Entidad ORM alineada al DDL (tabla/campos/tipos)
- [ ] Mapper completo `toDomain` y `toEntity`
- [ ] Puerto implementado por repositorio TypeORM
- [ ] Provider registrado con token
- [ ] Build en verde
- [ ] Sin lints nuevos

## Definición de Terminado (DoD)

- [ ] Endpoints/servicios consumen modelo de dominio, no ORM entity
- [ ] `externalId` disponible para casos públicos cuando aplica
- [ ] Consultas internas pueden seguir usando `id`
- [ ] Cambios documentados brevemente (qué se alineó con DDL y por qué)

## Plantilla de prompt reutilizable

Usa este prompt para implementar una nueva entidad o alinear una existente:

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
- Exponer `externalId` para APIs públicas y mantener `id` para uso interno.
- Alinear nombres y tipos con el DDL real.

Do:
- Crear/actualizar modelo, puerto, entidad, mapper, repositorio y módulo de providers.
- Agregar `findByExternalId` cuando aplique exposición pública.

Don't:
- No usar ORM entities en dominio.
- No inyectar implementaciones concretas donde deba ir token.
- No exponer `id` autoincremental en endpoints públicos.

Entrega esperada:
1) Resumen breve de decisiones técnicas
2) Lista de archivos cambiados
3) Implementación por capas (domain -> infra -> DI)
4) Validación (build/lint)
5) Riesgos y próximos pasos
```
