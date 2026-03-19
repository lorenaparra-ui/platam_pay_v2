# CONTEXTO
Proyecto NestJS + TypeScript + TypeORM con arquitectura hexagonal en monorepo.

Este prompt es una variante de `hexagonal-typeorm-ddl-entity.md` para casos donde el servicio es **interno** y **no requiere controlador HTTP**.

Aplica cuando:
- la lógica será consumida por otros módulos internos,
- se ejecuta por jobs/workers/eventos,
- o se usa como capacidad interna sin exponer endpoints REST.

---

# OBJETIVO
Implementar/alinear una capacidad interna por entidad con:
1) dominio desacoplado (modelo + puerto),
2) infraestructura TypeORM (entity + mapper + repositorio),
3) wiring DI por token en módulo,
4) capa de aplicación interna (use-case/service), **sin `presentation/controller`**.

---

# INPUTS OBLIGATORIOS
- `FeatureModuleName` (kebab-case)
- `DomainModelName`
- `DomainPortName`
- `RepositoryToken`
- `OrmEntityName`
- `TypeOrmRepoName`
- `SqlTableName`
- `DdlFields` (tipos, nullability, defaults)
- `ForeignKeys` (source -> target, onDelete/onUpdate)
- `UseCaseName` o `InternalServiceName` (caso de uso interno consumidor)

---

# TO T MÍNIMO (DECISIONES)
Responde breve:
1. ¿Entidad local del servicio o compartida en `@libs/database`?
2. ¿Identidad interna (`id`) y pública (`externalId`) necesaria o solo interna?
3. ¿Qué método del puerto necesita la capa interna (lectura, escritura, ambos)?
4. ¿Se requiere transacción para operaciones multi-tabla?
5. ¿En qué módulo registrar y exportar el token para consumo interno?

---

# REGLAS OBLIGATORIAS
- El dominio no depende de NestJS ni TypeORM.
- Repositorio TypeORM implementa el puerto del dominio.
- Mapper obligatorio (`toDomain`, `toEntity` o equivalente).
- Alinear entidad ORM con DDL real (`name` snake_case, tipos, nullability, defaults).
- No crear controlador ni DTOs HTTP para este caso.
- No exponer `id` incremental fuera del boundary interno.
- Si hay FKs, documentar validación y estrategia transaccional.
- No usar `synchronize: true` fuera de desarrollo local.

---

# ESTRUCTURA OBJETIVO (SIN PRESENTATION)
Crear/actualizar:

```txt
src/modules/<FeatureModuleName>/
├─ <feature>.module.ts
├─ domain/
│  ├─ models/<entity>.model.ts
│  └─ ports/<entity>.repository.port.ts
└─ application/
   └─ use-cases/<internal-use-case>.ts   (o servicio interno)

src/infrastructure/database/
├─ entities/<entity>.entity.ts
├─ mappers/<entity>.mapper.ts
└─ repositories/typeorm-<entity>.repository.ts
```

Si la entidad es compartida, usar `@libs/database` de forma consistente en build/runtime.

---

# DO (PASOS)
1. Definir/ajustar modelo y puerto de dominio.
2. Implementar entidad ORM alineada al DDL.
3. Implementar mapper dedicado.
4. Implementar repositorio TypeORM que cumpla el puerto.
5. Registrar provider en módulo:
   - `provide: <RepositoryToken>`
   - `useClass: <TypeOrmRepoName>`
6. Crear caso de uso interno que inyecte el puerto por token.
7. Exportar token/use-case si lo consumirá otro módulo.
8. Registrar módulo en `AppModule` solo si aplica al flujo de arranque.

---

# DON'T
- No crear `controller.ts` ni rutas Swagger en esta variante.
- No importar entidades ORM en dominio o casos de uso.
- No meter reglas de negocio en repositorio.
- No duplicar mapeo en múltiples capas.

---

# CRITERIOS DE ACEPTACIÓN
- [ ] Sin capa `presentation` para este caso.
- [ ] Dominio desacoplado y puerto definido.
- [ ] Repositorio TypeORM implementa puerto.
- [ ] Mapper completo y consistente con DDL.
- [ ] Provider por token registrado en módulo.
- [ ] Caso de uso interno compilando y usando el puerto.
- [ ] Build/lint en verde.

---

# DEFINITION OF DONE (DoD)
- [ ] Archivos de dominio + aplicación interna + infraestructura completos.
- [ ] Wiring DI correcto (token y exports/imports entre módulos).
- [ ] Validación de FKs y transacciones definida si aplica.
- [ ] Evidencia de build/lint y riesgos remanentes.

---

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones ToT (5-8 bullets)  
2) Archivos creados/modificados  
3) Implementación por capas (domain -> application interno -> infra -> DI)  
4) Evidencia de validación (build/lint/tests si aplica)  
5) Riesgos y siguientes pasos  
