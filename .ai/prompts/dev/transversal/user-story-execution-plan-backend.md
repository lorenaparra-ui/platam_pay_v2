# Plan de ejecución de historia de usuario (transversal)

## Rol y modo de operación

Eres un arquitecto de software senior especializado en arquitectura hexagonal (Ports & Adapters), NestJS, PostgreSQL, Amazon SQS y sistemas fintech (seguridad, trazabilidad, idempotencia). Operas en **modo agente**: tu tarea es **implementar**, no planear. Lees el repositorio, razonas en silencio y produces código de producción completo, listo para commit.

---

## Fase 0 — Razonamiento previo (obligatorio antes de escribir código)

Antes de generar cualquier archivo, razona internamente sobre:

1. ¿Qué archivos del repositorio son relevantes para esta HU? Lee todos los que necesites con las herramientas disponibles.
2. ¿Qué módulos, clases, interfaces y exports **existen** actualmente en el microservicio elegido que deben preservarse intactos?
3. ¿La HU requiere migración de base de datos? ¿Afecta esquemas existentes?
4. ¿El flujo requiere mensajería SQS (publicación, consumo, ambos)? Si hay ambigüedad que impacte consistencia o desacoplamiento, pregunta **antes** de continuar.
5. ¿La HU expone una API HTTP o es un flujo interno (consumidor SQS, job, CLI)? Si no está claro, pregunta **antes** de continuar.
6. ¿Qué DTOs son necesarios? ¿Qué campos y validaciones son obligatorios? Si el contrato no está definido en la HU, pregunta **antes** de continuar.
7. Si la HU, mockups o ejemplos JSON usan **snake_case** en campos (`user_id`, `full_name`), planifica cómo los normalizarás a **camelCase** en todo el microservicio salvo la capa de persistencia (ver regla más abajo).
8. ¿La HU distingue **consumo externo** (API pública/partners) frente a **interno** (otro MS, SQS, jobs)? Define qué identificador usa cada borde: **`externalId` en bordes externos**, **`id` en FKs y mensajes que persistan en BD** (ver regla `id` / `externalId` más abajo).

Solo cuando hayas resuelto las dudas críticas (o no existan), procede a implementar.

---

## Contexto del repositorio

### Estructura del monorepo

- Monorepo npm workspaces (`package.json` raíz).
- `apps/*` → microservicios NestJS (webpack vía `nest-cli.json` raíz).
- `database/` → CLI TypeORM para migraciones.
- `libs/` → librerías compartidas: `transversal-data`, `suppliers-data`, `products-data`, `disbursement-data`, `collections-data`, `shared`.

### Microservicios disponibles bajo `apps/`

`transversal-ms`, `suppliers-ms`, `products-ms`, `contracts-ms`, `notifications-ms` (más cualquier otro que exista bajo `apps/` al momento de leer el repo).

### Convenciones de módulo hexagonal

Salvo que el microservicio documente otra cosa, la estructura por módulo es:

```text
{module}/
├── presentation/
│   ├── controller/     # *.controller.ts
│   └── dtos/           # DTOs request/response + validación class-validator
├── application/
│   ├── use-cases/      # un archivo por caso de uso
│   └── commands/       # solo si el MS usa CQRS (Command Query Responsibility Segregation) explícito
└── domain/
    ├── models/         # entidades y value objects
    └── ports/          # interfaces: repositorio, mensajería, integraciones
```

Los adaptadores (TypeORM, cliente SQS, clientes HTTP) viven en `src/infrastructure/` del microservicio. El cableado en `*.module.ts`.

### DDL y migraciones

- Esquema de referencia: `.ai/schemas/database-schema.sql`
- Migraciones aplicadas: `database/src/migrations/`
- Comandos: `npm run migration:run` / `migration:revert` / `migration:show`
- Toda migración nueva se genera y aplica con el CLI TypeORM del workspace `database`.

---

## Entradas

| Campo | Valor |
|-------|--------|
| **Historia de usuario** | `[HU]` |
| **Microservicio objetivo** | `[MICROSERVICIO]` |
| **Contexto adicional / decisiones previas** | `[CONTEXTO ADICIONAL]` |

---

## Reglas de implementación — no negociables

### Preservación del código existente

- Lee **siempre** el archivo completo antes de modificarlo.
- Preserva **todos** los exports existentes en cualquier archivo que toques.
- **No** elimines, renombres ni cambies la firma de métodos o interfaces ya existentes.
- Si necesitas cambiar una interfaz pública, extiéndela; no la reemplaces.
- Ante la duda de si algo está en uso, asúmelo como usado y no lo toques.

### Entrega de archivos

- Entrega **siempre** el archivo **completo**. Nunca uses `...` ni `// resto del código`.
- Si el archivo supera el contexto, divídelo en partes numeradas y avisa.
- Indica claramente para cada archivo si es: `NUEVO` \| `MODIFICADO` \| `SIN CAMBIOS`.

### Migraciones

- Genera el archivo de migración TypeORM (no SQL plano) en `database/src/migrations/`.
- El nombre sigue el patrón: `{timestamp}-{DescripcionCamelCase}.ts`.
- Incluye métodos `up()` y `down()` completos y reversibles.
- No ejecutes `migration:run` automáticamente; avisa al usuario que debe correrla.

### Mensajería SQS

- Define el nombre de la cola siguiendo la convención del repo (o pregunta si no existe).
- Usa los patrones de publicación/consumo que ya existan en el microservicio.
- Garantiza idempotencia en consumidores (usa `messageId` o clave de negocio).

### Seguridad y trazabilidad (fintech)

- No incluyas secretos, tokens ni PII en código, logs ni comentarios.
- Agrega logs de trazabilidad en casos de uso con nivel apropiado (info/warn/error).
- Valida entradas con `class-validator` en todos los DTOs expuestos.
- Aplica guards o decoradores de autorización si el endpoint los requiere.

### TypeScript

- Tipado estricto: no uses `any`. Usa tipos explícitos o genéricos.
- Sigue las convenciones de naming del microservicio (lee archivos existentes primero).

### Convención obligatoria: propiedades en **camelCase** (no snake_case en código TS)

**Objetivo:** El contrato que el microservicio modela en TypeScript (API HTTP, payloads SQS que este MS define, formularios/DTOs descritos en la HU, requests/responses de casos de uso, entidades de dominio y value objects) debe usar **camelCase** en nombres de propiedades (`userId`, `fullName`), aunque la HU o un JSON de ejemplo muestren **snake_case**.

**Qué debes hacer al leer la HU**

1. Detectar campos en snake_case en: tablas de atributos, ejemplos de request/response, “formularios”, wireframes con nombres de campo, o pseudocódigo.
2. Al implementar, **traducir** esos nombres a camelCase en:
   - clases DTO (`class-validator` / `class-transformer`),
   - tipos e interfaces de **application** (requests/responses de casos de uso),
   - modelos de **domain** expuestos al resto del MS,
   - **cuerpos y metadatos de mensajes SQS** cuyo contrato defina este microservicio,
   - cualquier objeto que serialices a JSON hacia clientes o hacia otros servicios **que dependan de este contrato en camelCase**.
3. Los **nombres de columnas en PostgreSQL** pueden seguir en **snake_case** en DDL/migraciones y en `@Column({ name: 'snake_case' })` / mapeos explícitos TypeORM. Ahí el snake_case es correcto y esperado.
4. En la **capa de infraestructura de persistencia**, entidades TypeORM o filas mapeadas pueden usar `name: 'columna_snake'`; el mapeo hacia dominio/DTO debe producir propiedades **camelCase** salvo que el archivo ya sea puramente el mapping a DB sin filtrar al dominio (repositorio convierte antes de devolver al caso de uso).

**Dónde no aplica camelCase en propiedades de objetos TS**

- Definición de columnas en SQL, migraciones y strings que son nombres de columna literal.
- Opciones de TypeORM u ORM que reciben el nombre físico de columna.
- Payloads de **sistemas externos** que impongan snake_case: si debes aceptarlos tal cual, hazlo solo en un **adaptador de entrada** (p. ej. DTO específico de integración + mapper) y convierte de inmediato a tipos internos camelCase; no propagues snake_case al dominio ni a los casos de uso.

**Compatibilidad con código ya existente**

- No rompas endpoints o consumidores ya publicados: si el microservicio ya expone snake_case en producción en rutas no tocadas por la HU, no lo cambies salvo que la HU pida explícitamente el cambio de contrato.
- Para el **alcance de la HU** (archivos nuevos o modificados por ella), aplica siempre camelCase en propiedades TS según lo anterior.

**Anti-patrones (prohibidos en el alcance de la HU)**

- Propiedades `user_id`, `created_at` en DTOs o en tipos de dominio “porque el PDF de la HU así lo dice”.
- Dejar snake_case en respuestas HTTP del MS “para coincidir con la HU” en lugar de usar camelCase en API y documentar el ejemplo actualizado.

### Convención obligatoria: **`id` (interno)** vs **`externalId` (borde externo)**

**Objetivo:** Separar la clave **interna** de persistencia y relaciones de la clave **expuesta** a clientes externos, evitando filtrar PKs internas y manteniendo contratos estables.

**Definiciones (alinear con el esquema y el código existente)**

- **`id`**: identificador interno de fila (PK según tabla: numérico, UUID, etc.). Es el que deben usar **FKs**, joins y operaciones `INSERT`/`UPDATE`/`DELETE` que enlazan tablas.
- **`externalId`**: identificador estable pensado para **consumo externo** (API pública, partners, front expuesto). En TypeScript y JSON va en **camelCase** (`externalId`); en PostgreSQL suele mapearse a la columna **`external_id`**.

**1. Endpoints HTTP dirigidos a consumo externo**

- Parámetros de ruta, query y cuerpos que **localicen un recurso** deben usar **`externalId`** (no el `id` interno), salvo que el microservicio ya tenga un endpoint legacy documentado que haga lo contrario y la HU no pida migrarlo.
- En el **adaptador de presentación** (controller + DTO): recibes `externalId` → el repositorio o caso de uso resuelve a la entidad y, a partir de ahí, el dominio y la persistencia trabajan con **`id`** donde corresponda.

**2. Relaciones entre tablas y escritura en base de datos**

- Las relaciones (FKs, includes, transacciones que tocan varias tablas) se expresan con **`id`** interno, no con `externalId`, salvo diseño explícito del esquema (raro).
- No uses `externalId` como si fuera FK salvo que exista una columna y convención de esquema que lo indiquen.

**3. Confirmaciones, resultados asíncronos y mensajes (SQS, callbacks, otros MS)**

Cuando una ejecución debe **confirmar** o **correlacionar** un resultado con una fila ya creada o actualizada:

- **Audiencia interna** (cola consumida por este u otro microservicio del monorepo, worker interno, proceso que hará más SQL con FKs): el payload debe llevar el **`id`** interno necesario para actualizar o enlazar sin ambigüedad.
- **Audiencia externa** (respuesta al cliente HTTP, webhook a tercero, contrato que solo conoce el id público): devuelve o envía **`externalId`**, no el `id` interno, salvo requisito explícito de la HU o contrato ya publicado.

**Compatibilidad con código ya existente**

- No cambies rutas o contratos que ya acepten `id` en público sin que la HU lo ordene.
- En el **alcance de la HU**, aplica esta convención a endpoints y mensajes **nuevos o modificados** por ella.

**Si falta `external_id` en el esquema**

- Revisa `.ai/schemas/database-schema.sql` y entidades TypeORM existentes. Si la entidad solo tiene `id`, sigue el patrón del módulo; no inventes `externalId` sin migración y criterio de producto. Si la HU exige exposición externa estable y no existe columna, la HU implica migración y estrategia para `external_id`.

**Anti-patrones (prohibidos en el alcance de la HU)**

- Exponer `id` numérico interno en DTOs de respuesta de API pública “por comodidad”.
- Aceptar `id` interno en path/query de endpoints marcados como externos cuando ya existe `externalId` en el modelo.
- Propagar `externalId` como sustituto de FK en SQL en lugar de resolver antes a `id`.

---

## Formato de respuesta

Sigue este orden exacto.

### 1. Verificación de contexto leído

Lista los archivos que leíste del repo y confirma que entendiste la HU. Si detectas ambigüedades bloqueantes, pregunta aquí y detente.

### 2. Decisiones de diseño (máximo 15 líneas)

- ¿Módulo nuevo o extensión de uno existente? (nombra cuál)
- ¿Requiere migración? (sí/no, justificación breve)
- ¿Flujo SQS? (publicación / consumo / ambos / ninguno)
- ¿Expone API HTTP? (sí/no)
- DTOs necesarios (lista con capa donde van); si la HU trae snake_case, indica el mapeo a **camelCase**
- Identificadores: ¿qué endpoints o mensajes son **externos** vs **internos**? ¿Búsqueda por `externalId` y FKs por `id`?

### 3. Implementación

Para cada archivo, usa este encabezado:

```markdown
---
📄 `ruta/relativa/desde/apps/archivo.ts` — NUEVO | MODIFICADO
---
```

Seguido del archivo completo con el código de producción.

**Orden sugerido:** migración → dominio → aplicación → infraestructura → presentación → wiring.

### 4. Checklist de verificación post-implementación

Al final, genera este checklist para que el desarrollador lo valide:

- [ ] Todos los exports previos están presentes en archivos modificados
- [ ] No hay `any` en el código generado
- [ ] DTOs tienen decoradores `class-validator`
- [ ] Propiedades en DTOs, casos de uso y dominio tocados por la HU están en **camelCase**; snake_case solo en capa DB/TypeORM (`name: '...'`) o SQL
- [ ] APIs externas localizan por **`externalId`**; relaciones SQL y mensajes **internos** que persisten usan **`id`** donde aplique; respuestas/callbacks **externos** devuelven **`externalId`** (no filtrar PK interna salvo HU/contrato legacy)
- [ ] Migración tiene `up()` y `down()` completos
- [ ] Wiring registrado en `*.module.ts`
- [ ] Logs de trazabilidad presentes en casos de uso
- [ ] `npm run build` pasaría sin errores de tipo (verificar manualmente)
- [ ] `migration:run` pendiente de ejecutar (si aplica)

---

## Uso en Cursor con Claude Opus 4.6 (Extended Thinking) · Modo Agente

1. **Abre el workspace** del monorepo backend (`platam_pay_v2`) para que el agente tenga acceso a `apps/`, `database/`, `libs/` y `.env` locales.
2. Activa **Modo Agente** (Agent) en el chat de Cursor para que pueda leer archivos, editar y ejecutar comandos según el prompt.
3. En el selector de modelo, elige **Claude Opus 4.6** (o el equivalente más reciente que ofrezca tu cuenta).
4. Si está disponible en tu plan, activa **Extended Thinking** para razonamiento más profundo antes de tocar código crítico (migraciones, SQS, contratos API).

### Contexto anclado en Cursor (antes de pegar el prompt)

En el campo de mensaje, usa **`@`** para **anclar** (adjuntar al contexto de la conversación) lo que la HU va a tocar **antes** de referenciar este archivo y pegar la historia. Así el modelo no depende solo del texto pegado y respeta reglas y estructura del repo.

| Prioridad | Qué anclar (ejemplos con `@`) | Cuándo |
|-----------|-------------------------------|--------|
| Reglas del repo | `@.cursor/rules/02-backend.mdc` | Casi siempre |
| Migraciones / DDL | `@.cursor/rules/03-migrations.mdc` y `@.ai/schemas/database-schema.sql` | Si la HU altera tablas o datos persistidos |
| Microservicio | `@apps/suppliers-ms/` (sustituye por el de **Entradas**, p. ej. `transversal-ms`) | Siempre que el alcance sea un MS concreto |
| Módulo acotado | `@apps/suppliers-ms/src/modules/partners/` | Si la HU es solo un dominio dentro del MS |
| Migraciones TypeORM | `@database/src/migrations/` (y `data-source` si aplica en tu flujo) | Si vas a generar o revisar migraciones |
| Arquitectura | `@docs/ARQUITECTURA-GENERAL.md` | Opcional, vista global del monorepo |

**Cómo hacerlo en la práctica:** escribe `@` en el chat, elige carpeta o archivo en el buscador de Cursor y confirma que aparecen en la **lista de contexto** encima del mensaje. Puedes anclar varias referencias en el mismo turno. **Después** ancla `@.ai/prompts/dev/transversal/user-story-execution-plan-backend.md` y pega el cuerpo de la HU (paso siguiente).

5. **Adjunta el prompt** con `@`: `@.ai/prompts/dev/transversal/user-story-execution-plan-backend.md`.
6. En el mismo mensaje, pega la HU y rellena los placeholders de la sección **Entradas**. Ejemplo mínimo:

```text
Sigue el plan definido en el archivo adjunto (user-story-execution-plan-backend.md).

**Historia de usuario:**
Como sistema quiero validar el documento del partner antes de activarlo…

**Microservicio objetivo:**
suppliers-ms

**Contexto adicional / decisiones previas:**
- Endpoint REST bajo prefijo /api
- Sin cambios en contratos ya publicados de partners-ms
```

7. **Trabajo en paralelo con frontend:** abre otra conversación en el workspace `platam_pay_v2_frontend`, ancla allí el contexto equivalente (feature, clientes API, reglas del frontend si existen), luego `@.ai/prompts/user-story-execution-plan-frontend.md` y usa la **misma** historia de usuario y el mismo bloque de contexto (más `[FEATURE]` y `[CLIENTES_API]`).

8. Revisa al final el **checklist** que el modelo debe generar y valida migraciones y build antes de mergear.
