# CONTEXTO
Proyecto NestJS + TypeScript + TypeORM con arquitectura hexagonal. Toda la estructura de dominio y features vive bajo **src/modules/**; la infraestructura (ORM) vive en **src/infrastructure/database/**.
Quiero implementar/adaptar UNA entidad de dominio y su adapter de persistencia.

# ENTIDAD OBJETIVO
- DomainModelName: <REEMPLAZAR>
- OrmEntityName: <REEMPLAZAR>
- TypeOrmRepoName: <REEMPLAZAR>
- DomainPortName: <REEMPLAZAR>
- RepositoryToken: <REEMPLAZAR>
- FeatureModuleName: <REEMPLAZAR en kebab-case; ej: users, onboarding>
- SqlTableName: <REEMPLAZAR>
- DdlFields: <REEMPLAZAR lista exacta>
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

# ÁRBOL DE PENSAMIENTO (ToT) - DECISIONES OBLIGATORIAS
Evalúa y decide brevemente (sin razonamiento largo):
1. Modelo dominio: ¿id solo o id+externalId? -> justificar.
2. Entidad ORM: ¿extiende BaseExternalIdEntity? -> justificar.
3. Mapping: ¿mapper dedicado o mapeo inline? -> justificar.
4. Repo: ¿adapter implementa port de dominio? -> justificar.
5. DI: ¿token personalizado o clase concreta? -> justificar.
6. Consultas públicas: ¿externalId y no id incremental? -> justificar.

# REGLAS OBLIGATORIAS
- El dominio NO depende de TypeORM/Nest.
- El adapter TypeORM implementa el puerto del dominio.
- Mapper obligatorio toDomain/toEntity.
- `external_id` lo genera DB (no setear manualmente en create).
- Alinear nombres/tipos con DDL (snake_case con `name:` cuando aplique).
- Para recursos nuevos con endpoint propio, crear SIEMPRE módulo feature en `src/modules/<FeatureModuleName>/` con estructura completa `domain/application/presentation` (no mezclar DTO/controller en raíz de `src`).
- Para `users`, la ruta objetivo es obligatoria: `src/modules/users/` con estructura equivalente a `transversal` (adaptada al feature).

# DO
- Crear/actualizar respetando la estructura bajo **src/modules/** e **src/infrastructure/**:
  - **Módulo feature completo (reutilizable):**
    - `src/modules/<FeatureModuleName>/<feature>.module.ts`
    - `src/modules/<FeatureModuleName>/domain/models/<entity>.model.ts`
    - `src/modules/<FeatureModuleName>/domain/ports/<entity>.repository.port.ts`
    - `src/modules/<FeatureModuleName>/application/use-cases/` (si aplica)
    - `src/modules/<FeatureModuleName>/application/dto/`
    - `src/modules/<FeatureModuleName>/presentation/<feature>.controller.ts`
  - **Para catálogos estrictamente transversales/compartidos:** se permite `src/modules/transversal/domain/...`, `src/modules/transversal/application/...`, `src/modules/transversal/presentation/...`.
  - **Infraestructura (fuera de modules):** src/infrastructure/database/entities/<entity>.entity.ts, src/infrastructure/database/mappers/<entity>.mapper.ts, src/infrastructure/database/repositories/typeorm-<entity>.repository.ts.
  - **DI:** Registrar el provider (token + useClass del repositorio TypeORM) en el módulo dueño del contexto (`src/modules/<FeatureModuleName>/<feature>.module.ts` o `src/modules/transversal/transversal.module.ts` si es compartido). Exportar el token cuando deba ser consumido por otros módulos.
  - **Wiring de módulo:** Registrar el módulo feature en AppModule.
- Usar los alias de rutas del proyecto cuando existan (p. ej. @infrastructure/database/entities, @transversal/domain/models, @<feature>/... según tsconfig paths).
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
- [ ] externalId disponible para APIs públicas.

# DEFINITION OF DONE (DoD)
- [ ] Código completo en las capas indicadas.
- [ ] Build/lint ejecutados en verde.
- [ ] Sin imports cruzados indebidos.
- [ ] Resumen de cambios + riesgos remanentes.
- [ ] Lista de siguientes pasos (tests/DTOs/endpoints).

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones ToT (breve, 5-8 bullets)
2) Archivos creados/modificados
3) Implementación por capas (dominio -> infra -> DI)
4) Evidencia de validación (build/lint/tests)
5) Riesgos y siguientes pasos