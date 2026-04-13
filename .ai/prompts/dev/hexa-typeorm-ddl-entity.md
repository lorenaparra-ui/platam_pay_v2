# CONTEXTO
Monorepo NestJS + TypeScript + TypeORM con arquitectura hexagonal. Cada aplicación vive en **`apps/<microservicio>/`**; el código fuente del MS está en **`apps/<microservicio>/src/`**.

- **Dominio y casos de uso:** `src/modules/<feature>/` (un bounded context por carpeta; nombre en **kebab-case**: `bank-accounts`, `credit-facilities`, `users`, etc.).
- **Infraestructura del MS (persistencia, mensajería, adaptadores):** `src/infrastructure/` (p. ej. `database/repositories`, `database/mappers`, `database/adapters`, `messaging/`).
- **Entidades TypeORM y módulos `TypeOrmModule.forFeature` compartibles:** librerías **`libs/*-data/`** (`transversal-data`, `suppliers-data`, `products-data`), no en `src/infrastructure/database/entities/` del app (ese árbol no es la convención vigente).

Objetivo del prompt: implementar o alinear **una** entidad de dominio (modelo + puerto) con su persistencia (entidad ORM en lib cuando corresponda + mapper + repositorio TypeORM en el MS) y el cableado DI acorde al monorepo.

# MICROSERVICIOS EN `apps/` Y DÓNDE VIVE LA ORM

| Microservicio        | TypeORM / BD | Librería(s) de entidades típica(s) | Notas |
|---------------------|--------------|-------------------------------------|--------|
| `transversal-ms`    | Sí           | `@app/transversal-data`             | `typeorm.config` usa `TRANSVERSAL_DATA_ENTITIES`. `InfrastructureModule` importa `TransversalDataModule`. |
| `suppliers-ms`     | Sí           | `@app/suppliers-data` + `@app/transversal-data` | `entities` en `typeorm.config`: `SUPPLIERS_DATA_ENTITIES` + entidades transversales usadas en ese MS. `TypeOrmModule.forFeature` en `InfrastructureModule`. |
| `products-ms`       | Sí           | `@app/products-data`                | `PRODUCTS_MS_TYPEORM_ENTITIES` / `ProductsDataModule`; `typeorm.config` importa desde `@app/products-data`. |
| `contracts-ms`      | Sí           | `@app/products-data` (p. ej. contratos) | Alcance reducido: entidades pueden vivir en `products-data` y consumirse desde este MS (no duplicar tabla/entidad). |
| `notifications-ms`  | No (actual)  | N/A                                 | **Fuera de alcance** de este prompt para capa ORM: no hay flujo estándar `entity + mapper + TypeORM repo` como en los MS anteriores. |

**Librerías de esquemas dedicados (BNPL / cobranza):** viven en `libs/disbursement-data` y `libs/collections-data`. Las migraciones del monorepo cargan sus listas de entidades desde `@platam/database` / `data-source.ts` para generar DDL coherente. Un MS solo debe importar `DisbursementDataModule` / `CollectionsDataModule` si ese bounded context expone casos de uso con persistencia en ese esquema; **no** duplicar `@Entity` para tablas ya modeladas ahí.

**`libs/shared`:** utilidades de dominio/mensajería comunes; **no** es el lugar habitual de nuevas `@Entity` de negocio (salvo decisión explícita de arquitectura).

# VARIABLES DE ENTRADA (RELLENAR)
- **TargetMicroservice:** `<REEMPLAZAR>` — nombre de carpeta bajo `apps/` (ej. `transversal-ms`, `suppliers-ms`).
- **TargetDataLib:** `<REEMPLAZAR | N/A>` — `transversal-data` | `suppliers-data` | `products-data` | `disbursement-data` | `collections-data` | reutilizar entidad existente en otra lib (documentar cuál).
- **DomainModelName:** `<REEMPLAZAR>`
- **OrmEntityName:** `<REEMPLAZAR>`
- **TypeOrmRepoName:** `<REEMPLAZAR>`
- **DomainPortName:** `<REEMPLAZAR>`
- **RepositoryToken:** `<REEMPLAZAR>` (suele exportarse desde `src/modules/<feature>/<feature>.tokens.ts`)
- **FeatureModuleName:** `<REEMPLAZAR kebab-case>` — carpeta bajo `src/modules/` (ej. `users`, `partners`, `credit-facilities`).
- **SqlTableName:** `<REEMPLAZAR>`
- **DdlFields:** `<REEMPLAZAR lista exacta>`
- **ForeignKeys:** `<REEMPLAZAR lista exacta de FKs con tabla_origen.columna -> tabla_destino.columna, nullability, onDelete, onUpdate>`
- Convención de identidad: **id interno BIGINT** y **external_id UUID** para exposición pública cuando el DDL lo defina así (alinear con `BaseExternalIdEntity` de la lib que corresponda).

# ESTRUCTURA OBJETIVO POR MICROSERVICIO (HEXAGONAL EN `src/modules/`)

Convención real del repo (adaptar nombres al feature):

- **`apps/<TargetMicroservice>/src/modules/<FeatureModuleName>/`**
  - `<feature>.module.ts` — a menudo solo **providers/exports de casos de uso**; los repositorios TypeORM suelen registrarse en **`InfrastructureModule`**, no aquí.
  - `<feature>.tokens.ts` (o equivalente) — tokens `Symbol` o constantes para el puerto del repositorio.
  - `domain/models/<entity>.model.ts` (o `*.models.ts` si el módulo agrupa varios modelos).
  - `domain/ports/<entity>.repository.port.ts` (u otro nombre alineado al módulo).
  - `application/use-cases/<nombre-caso>/<nombre-caso>.use-case.ts` — subcarpeta por caso (ej. `create-user/create-user.use-case.ts`).
  - `application/dto/` — requests/responses de aplicación cuando aplique.
  - `presentation/<feature>.controller.ts` o `presentation/dto/` — solo si el MS expone HTTP para ese feature.
- **Módulos transversales dentro de un MS:** p. ej. `src/modules/transversal/` en `transversal-ms` (catálogos, puertos compartidos de ese MS). **No** asumir que todo MS debe copiar la misma carpeta `transversal`; cada app organiza sus `modules/` según sus bounded contexts.
- **`src/modules/messaging/`:** presente en varios MS (SQS, DTOs de cola); separar mensajería de persistencia de dominio salvo que el caso de uso lo integre de forma explícita.

# ENTIDAD ORM Y LIB `*-data`

1. **Nueva tabla acotada a un contexto de datos ya existente**  
   - Añadir **`libs/<TargetDataLib>/src/entities/<entity>.entity.ts`**.  
   - Extender la base del proyecto si aplica (p. ej. `BaseExternalIdEntity` en esa misma lib o en la que ya use el MS).  
   - Exportar la entidad en **`libs/<TargetDataLib>/src/index.ts`** (o el barrel que use la lib).  
   - Incluir la clase en el arreglo **`..._DATA_ENTITIES`** del **`*DataModule`** correspondiente (`TransversalDataModule`, `ProductsDataModule`, `SuppliersDataModule`, etc.) para `TypeOrmModule.forFeature([...])`.

2. **`typeorm.config.ts` del MS** (`apps/<TargetMicroservice>/src/config/typeorm.config.ts`)  
   - Debe listar la entidad en `entities: [...]` (directamente o vía spread de constantes exportadas desde `@app/...-data`), en línea con el resto del MS.

3. **Entidad ya definida en otra lib y consumida por el MS** (ej. `contracts-ms` ↔ `products-data`)  
   - **No** crear una segunda `@Entity` para la misma tabla. Registrar/reutilizar la existente y solo añadir mapper/repo/adapters en `apps/<TargetMicroservice>/src/infrastructure/database/` si el MS es dueño de esa persistencia.

4. **Mappers y repositorios TypeORM** — siempre en el microservicio que implementa el puerto:  
   - `apps/<TargetMicroservice>/src/infrastructure/database/mappers/<entity>.mapper.ts`  
   - `apps/<TargetMicroservice>/src/infrastructure/database/repositories/typeorm-<entity>.repository.ts`  
   - Adaptadores auxiliares: `.../database/adapters/`, `.../database/common/` según patrones ya usados en ese MS.

# CABLEADO DI (PATRÓN DEL REPO)

- En este monorepo, el **`InfrastructureModule`** de cada MS (`apps/<MS>/src/infrastructure/infrastructure.module.ts`) es **`@Global()`** y concentra **`TypeOrmModule.forRootAsync`**, imports de **`*DataModule`** o `TypeOrmModule.forFeature([...])`, y **providers** `{ provide: REPOSITORY_TOKEN, useClass: TypeormXRepository }`.
- El **módulo de feature** importa casos de uso y, gracias al módulo global de infraestructura, **inyecta el token del repositorio** sin re-declarar el provider del adapter TypeORM (salvo que se introduzca un patrón distinto de forma explícita y localizada).

# ALIAS DE RUTAS (TYPESCRIPT)

Por MS, usar los `paths` de su `apps/<MS>/tsconfig.json`, típicamente:

- `@config/*`, `@common/*`, `@modules/*`, `@infrastructure/*`, `@messaging/*`
- `@app/transversal-data`, `@app/suppliers-data`, `@app/products-data`, `@platam/shared`

No inventar alias; copiar el estilo de imports del MS objetivo.

# OBJETIVO
Implementar de forma completa y alineada:
1) Dominio: model + port (bajo `src/modules/<FeatureModuleName>/`).
2) Infraestructura: entidad ORM en **`libs/*-data`** cuando sea nueva tabla del contexto; mapper + repositorio TypeORM en **`apps/<MS>/src/infrastructure/database/`**.
3) Wiring: registro del provider por token en **`InfrastructureModule`** del MS; tokens exportados desde el módulo de feature cuando otros módulos los necesiten.
4) Mantener dominio desacoplado de TypeORM/Nest.

# ÁRBOL DE PENSAMIENTO (ToT) - DECISIONES OBLIGATORIAS
Evaluar y decidir brevemente (sin razonamiento largo):
1. Modelo dominio: ¿id solo o id + externalId? → justificar según DDL y API pública.
2. Entidad ORM: ¿extiende `BaseExternalIdEntity` (u otra base de la lib)? → justificar.
3. Mapping: ¿mapper dedicado o mapeo inline? → justificar (el repo favorece mapper dedicado).
4. Repo: ¿adapter implementa puerto de dominio? → sí, con justificación breve.
5. DI: ¿token + `useClass`? → alineado a `<feature>.tokens.ts` + `InfrastructureModule`.
6. Consultas públicas: ¿`external_id` y no id incremental? → justificar.
7. Foreign keys: representación en dominio vs infraestructura; orden de persistencia y transacciones.
8. **Monorepo:** ¿nueva entidad en qué `*-data` y qué arrays (`TRANSVERSAL_DATA_ENTITIES`, `PRODUCTS_DATA_ENTITIES`, `DISBURSEMENT_*` / `COLLECTIONS_*` según lib, etc.) y `typeorm.config` del MS **y** entidades registradas en `@platam/database` (migraciones) hay que actualizar?

# REGLAS OBLIGATORIAS
- El dominio **no** depende de TypeORM ni de decoradores de Nest.
- El adapter TypeORM implementa el puerto del dominio.
- Mapper obligatorio `toDomain` / `toEntity` (o equivalente claro).
- `external_id` generado por BD cuando el DDL lo define así (no inventar valores en create salvo regla explícita).
- Alinear nombres y tipos con DDL (`snake_case` en columnas con `name:` en `@Column` cuando aplique).
- Alinear FKs con DDL: `onDelete`, `onUpdate`, nullability; documentar en `ForeignKeys` del prompt.
- Para **nuevo recurso con HTTP propio**, el controller vive bajo `src/modules/<FeatureModuleName>/presentation/`, no en la raíz de `src/`.
- **Ejemplo `users` en este repo:** en `transversal-ms` la ruta objetivo es `apps/transversal-ms/src/modules/users/` con `domain/`, `application/`, `presentation/` según necesidad; no asumir que `users` existe en otros MS.

# DO
- Identificar **`TargetMicroservice`** y si la tabla es **nueva** (lib `*-data` + `*DataModule` + `typeorm.config`) o **reutilización** de entidad ya publicada por otra lib.
- Crear/actualizar:
  - Dominio bajo `apps/<MS>/src/modules/<FeatureModuleName>/`.
  - ORM en `libs/<TargetDataLib>/src/entities/` + exports + registro en módulo de la lib.
  - Mapper y `typeorm-*.repository.ts` bajo `apps/<MS>/src/infrastructure/database/`.
  - Provider en `apps/<MS>/src/infrastructure/infrastructure.module.ts`.
- Si el MS ya registra entidades con listas compuestas (p. ej. `products-ms` / `suppliers-ms`), actualizar **todas** las constantes que alimentan `forRoot` y `forFeature` para evitar entidades huérfanas en runtime.
- Para FKs: detallar en `ForeignKeys`; en dominio preferir IDs / external IDs; en ORM relaciones solo si aportan; flujo transaccional explícito en escrituras multi-tabla.
- Métodos mínimos razonables en el puerto (ajustar al caso): p. ej. `findAll`, `findById`, `findByExternalId` cuando la API pública use UUID.

# DON'T
- No importar TypeORM en dominio.
- No usar entidades ORM fuera de infraestructura / capa de persistencia.
- No exponer id autoincremental en rutas públicas.
- No duplicar mapeo en repositorio (delegar en mapper).
- **No** colocar por defecto nuevas `@Entity` solo en `apps/.../infrastructure/database/entities/` si el bounded context ya tiene lib `*-data` (salvo excepción acordada).
- No aplicar este checklist completo a **`notifications-ms`** como si fuera un MS con el mismo stack de persistencia hexagonal-TypeORM.

# CRITERIOS DE ACEPTACIÓN
- [ ] Build sin errores del MS y de la(s) lib(s) `*-data` tocadas.
- [ ] `apps/<MS>/src/modules/<FeatureModuleName>/` con dominio (y aplicación/presentación según el caso).
- [ ] Entidad ORM en la lib correcta **o** reutilización documentada; registrada en `*DataModule` / `forFeature` y en `typeorm.config`.
- [ ] Mapper + repositorio en `apps/<MS>/src/infrastructure/database/`.
- [ ] Provider del repositorio en `InfrastructureModule` con token desde el módulo de feature.
- [ ] Dominio desacoplado de TypeORM.
- [ ] Campos y FKs alineados con DDL; estrategia id vs `external_id` en API coherente.

# DEFINITION OF DONE (DoD)
- [ ] Código completo en capas indicadas (dominio → lib ORM → infra del MS → DI).
- [ ] Build/lint en verde en el alcance del cambio.
- [ ] Sin imports cruzados indebidos entre dominio y TypeORM.
- [ ] Si hay relaciones multi-tabla, flujo transaccional y validaciones de FK definidos.
- [ ] Resumen de cambios + riesgos remanentes.
- [ ] Siguientes pasos (migración DDL, tests, DTOs, endpoints).

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones ToT (breve, incl. elección de lib y registros TypeORM).
2) Archivos creados/modificados (apps + libs).
3) Implementación por capas (dominio → entidad en lib → mapper/repo → `InfrastructureModule`).
4) Evidencia de validación (build/lint/tests).
5) Riesgos y siguientes pasos
