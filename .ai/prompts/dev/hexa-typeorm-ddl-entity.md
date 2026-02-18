# CONTEXTO
Proyecto NestJS + TypeScript + TypeORM con arquitectura hexagonal.
Quiero implementar/adaptar UNA entidad de dominio y su adapter de persistencia.

# ENTIDAD OBJETIVO
- DomainModelName: <REEMPLAZAR>
- OrmEntityName: <REEMPLAZAR>
- TypeOrmRepoName: <REEMPLAZAR>
- DomainPortName: <REEMPLAZAR>
- RepositoryToken: <REEMPLAZAR>
- SqlTableName: <REEMPLAZAR>
- DdlFields: <REEMPLAZAR lista exacta>
- Usa id interno BIGINT y external_id UUID para exposición pública.

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

# DO
- Crear/actualizar:
  - domain/models/<entity>.model.ts
  - domain/ports/<entity>.repository.port.ts
  - infrastructure/database/entities/<entity>.entity.ts
  - infrastructure/database/mappers/<entity>.mapper.ts
  - infrastructure/database/repositories/typeorm-<entity>.repository.ts
  - módulo de DI con token de repositorio
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