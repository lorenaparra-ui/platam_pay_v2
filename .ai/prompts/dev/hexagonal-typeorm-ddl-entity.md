# CONTEXTO
Proyecto NestJS + TypeScript + TypeORM con arquitectura hexagonal. Toda la estructura de dominio y features vive bajo **src/modules/**; la infraestructura (ORM) vive en **src/infrastructure/database/**.
Quiero implementar/adaptar UNA entidad de dominio y su adapter de persistencia.
En este monorepo existen servicios (`users`, `partners`, `products`, `suppliers`, `transversal`) y una librería compartida de entidades `libs/database`.

# ENTIDAD OBJETIVO
- DomainModelName: <REEMPLAZAR>
- OrmEntityName: <REEMPLAZAR>
- TypeOrmRepoName: <REEMPLAZAR>
- DomainPortName: <REEMPLAZAR>
- RepositoryToken: <REEMPLAZAR>
- FeatureModuleName: <REEMPLAZAR en kebab-case; ej: users, onboarding>
- SqlTableName: <REEMPLAZAR>
- DdlFields: <REEMPLAZAR lista exacta>
- ForeignKeys: <REEMPLAZAR lista exacta de FKs con tabla_origen.columna -> tabla_destino.columna, nullability, onDelete, onUpdate>
- Usa id interno BIGINT y external_id UUID para exposición pública.

# ESTRUCTURA OBJETIVO (REUTILIZABLE PARA MÓDULOS NUEVOS)
Usar SIEMPRE la misma convención base de `src/modules/transversal/` para módulos nuevos, adaptando nombres al feature:

- **Módulo feature completo (`src/modules/<FeatureModuleName>/`):**
  - `<feature>.module.ts`
  - `domain/models/<entity>.model.ts`
  - `domain/ports/<entity>.repository.port.ts`
  - `application/use-cases/` (si aplica)
  - `application/dto/` (response DTOs y/o DTOs de aplicación)
  - `presentation/<feature>.controller.ts` (o `<resource>.controller.ts`)
- **Infraestructura (siempre fuera de modules):**
  - `src/infrastructure/database/entities/`
  - `src/infrastructure/database/mappers/`
  - `src/infrastructure/database/repositories/`

Caso explícito `users`:
- Debe existir una carpeta nueva `src/modules/users/`.
- Dentro de `users` debe quedar la estructura hexagonal completa: `domain/`, `application/`, `presentation/` y `users.module.ts`.
- Los endpoints HTTP de `users` deben vivir en `src/modules/users/presentation/` (no en la raíz de `src`).
- Si `users` reutiliza providers compartidos, `users.module.ts` puede importar `TransversalModule`.

# OBJETIVO
Implementa de forma completa y alineada:
1) Dominio: model + port
2) Infraestructura: ORM entity + mapper + TypeORM repository
3) Wiring DI: provider por token personalizado en módulo
4) Mantener dominio desacoplado de TypeORM
5) Definir si la entidad vive local al servicio o en `@libs/database` (compartida)

# ToT mínimo (decisiones obligatorias)
Responde breve:
1. ¿Identidad del dominio: `id` interno + `externalId` público?
2. ¿Entidad ORM extiende `BaseExternalIdEntity`?
3. ¿Entidad local o compartida en `@libs/database`?
4. ¿Cómo se validan/resuelven FKs (id interno vs externalId)?
5. ¿Dónde se registra DI por token?

# REGLAS OBLIGATORIAS
- El dominio NO depende de TypeORM/Nest.
- El adapter TypeORM implementa el puerto del dominio.
- Mapper obligatorio toDomain/toEntity.
- `external_id` lo genera DB (no setear manualmente en create).
- Alinear nombres/tipos con DDL (snake_case con `name:` cuando aplique).
- Si la entidad es transversal entre microservicios, priorizar `libs/database` para evitar duplicidad de entidades.
- Alinear constraints relacionales con DDL: declarar explícitamente todas las foreign keys relevantes y su comportamiento (`onDelete`, `onUpdate`, nullability).
- Si existe relación foránea en el DDL, NO asumir: especificar en el prompt la FK exacta y reflejarla en diseño de repositorio/caso de uso (orden de persistencia y transaccionalidad cuando aplique).
- Para recursos nuevos con endpoint propio, crear SIEMPRE módulo feature en `src/modules/<FeatureModuleName>/` con estructura completa `domain/application/presentation` (no mezclar DTO/controller en raíz de `src`).
- Para `users`, la ruta objetivo es obligatoria: `src/modules/users/` con estructura equivalente a `transversal` (adaptada al feature).

# DO
- Crear/actualizar:
  - `src/modules/<FeatureModuleName>/<feature>.module.ts`
  - `src/modules/<FeatureModuleName>/domain/models/<entity>.model.ts`
  - `src/modules/<FeatureModuleName>/domain/ports/<entity>.repository.port.ts`
  - `src/infrastructure/database/entities/<entity>.entity.ts`
  - `src/infrastructure/database/mappers/<entity>.mapper.ts`
  - `src/infrastructure/database/repositories/typeorm-<entity>.repository.ts`
- Registrar DI por token (`provide` + `useClass`) en el modulo dueño y exportarlo si aplica.
- Registrar modulo feature en `AppModule`.
- Usar los alias de rutas del proyecto cuando existan (p. ej. @infrastructure/database/entities, @transversal/domain/models, @<feature>/... según tsconfig paths).
- Para entidades con FKs:
  - Detallar en la entrada `ForeignKeys` cada relación (`source_table.source_column -> target_table.target_column`) y su semántica.
  - En dominio, priorizar desacople (normalmente IDs/ExternalIDs y reglas), evitando acoplar el modelo a TypeORM.
  - En infraestructura, mapear columnas FK y relaciones ORM solo si aportan al caso de uso (evitar eager innecesario).
  - En creación/actualización que toque múltiples tablas relacionadas, diseñar flujo transaccional explícito.
  - Definir si la API recibe IDs internos o `external_id` para resolver FKs y documentar conversión/validación.
- Incluir métodos mínimos:
  - findAll()
  - findById(id: number)
  - findByExternalId(externalId: string) (si aplica uso público)

# DON'T
- No importar TypeORM en dominio.
- No usar entidades ORM fuera de infraestructura.
- No exponer id autoincremental en rutas públicas.
- No duplicar lógica de mapeo en repositorio.

# CRITERIOS DE ACEPTACIÓN
- [ ] Build sin errores.
- [ ] Para caso users: existe `src/modules/users/` con `domain/`, `application/`, `presentation/` y `users.module.ts`.
- [ ] Para cualquier módulo nuevo: existe `src/modules/<FeatureModuleName>/` con la misma plantilla base (`domain/application/presentation` + `<feature>.module.ts`).
- [ ] Dominio desacoplado de TypeORM.
- [ ] Mapper implementado y usado.
- [ ] Repositorio adapter implementa puerto.
- [ ] Provider registrado por token.
- [ ] Campos alineados con DDL.
- [ ] Foreign keys alineadas con DDL y documentadas en la entrada (`ForeignKeys`).
- [ ] Estrategia de validación/resolución de FKs definida (id vs external_id) y consistente con la API.
- [ ] externalId disponible para APIs públicas.

# DEFINITION OF DONE (DoD)
- [ ] Código completo en las capas indicadas.
- [ ] Build/lint ejecutados en verde.
- [ ] Sin imports cruzados indebidos.
- [ ] Si hay relaciones entre tablas, flujo transaccional y validaciones de FK definidos.
- [ ] Resumen de cambios + riesgos remanentes.
- [ ] Lista de siguientes pasos (tests/DTOs/endpoints).

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones ToT (breve, 5-8 bullets)
2) Archivos creados/modificados
3) Implementación por capas (dominio -> infra -> DI)
4) Evidencia de validación (build/lint/tests)
5) Riesgos y siguientes pasos