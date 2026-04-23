# Prerrequisitos y Plan de Ejecución — Módulo Onboarding
## HU-01 → HU-07 · epic-01-onboarding-underwriting

> **Fecha de análisis:** 2026-04-16 · **Actualizado:** 2026-04-19  
> **Scope:** Backend (`platam_pay_v2`) + Frontend (`platam_pay_v2_frontend`)  
> **Basado en:** HU-01 a HU-07, `SCHEMA_PENDIENTE_LORENA(REALIZADO).md`, prompts maestros, código fuente actual, lectura completa del historial de migraciones

---

## 1. Estado del Schema — Revisado 2026-04-19

> ⚠️ **Corrección:** La afirmación anterior de que "todas las migraciones fueron ejecutadas" era incorrecta.
> El análisis del historial de migraciones (`1700000000000`..`2190000000000`) cruzado con la estructura
> de DB reportada por el usuario (columnas reales de `suppliers_schema.partners`) confirma que la BD local
> está en **estado inicial (migración 1700)** — la mayoría de migraciones post-1700 no han sido aplicadas.

### 1a. Evidencia del diagnóstico

La tabla `suppliers_schema.partners` en la BD local tiene las columnas:
`id, external_id, business_id, acronym, logo_url, ..., default_rep_id, status_id, created_at, updated_at`

Esto coincide exactamente con el schema inicial (migración `1700000000000`). Las migraciones posteriores habrían modificado la tabla así:
- **Mig 1850** elimina `default_rep_id`, `status_id`, `business_id` y agrega `state` (ENUM) — **no aplicada** (columnas aún presentes)
- **Mig 1980** agrega `alias`, `country_code`, re-agrega `business_id` — **no aplicada** (columnas ausentes)
- **Mig 2170** agrega `categories.is_default` — **estado desconocido** (verificar con script)

**Script de validación:** `database/scripts/validate-migrations.sql` — ejecutar en PostgreSQL local para confirmar estado exacto.

### 1b. Estado de SCHEMA_PENDIENTE por ítem

| Ítem | Cambio requerido | Migración | Estado |
|------|-----------------|-----------|--------|
| 1 | `credit_applications.partner_category_ids` jsonb (reemplaza FK singular) | `2200000000000` ← **NUEVA** | ⚠️ Creada, pendiente de ejecutar |
| 2a | `partners.default_rep_id` | Schema inicial `1700` | ✅ Ya existe en BD inicial |
| 2b | `partners.default_category_id` | `2200000000000` ← **NUEVA** | ⚠️ Creada, pendiente de ejecutar |
| 3 | `ai_agent_analysis.html_url_agent_analysis` + `agent_recommended_loc` | `2170000000000` | ⚠️ Migración escrita, estado BD desconocido |
| 4 | `AiAgentAnalysisRecommendation.INTERVIEW` (enum PG) | `2170000000000` | ⚠️ Migración escrita, estado BD desconocido |
| 5 | `CreditApplicationStatus.APPROVED_PENDING_SIGNATURE` (enum PG) | `2170000000000` | ⚠️ Migración escrita, estado BD desconocido |
| 6 | `sarlaft_checks.status` → `clean/alert/blocked` | `2170000000000` | ⚠️ Migración escrita, estado BD desconocido |
| 7 | `partners.company_name` | Sin migración escrita | ❌ Sin decisión (usar `businesses.business_name` via JOIN como alternativa) |
| 8 | `CreditApplicationStatus.APPROVED_SIGNED` | Sin migración escrita | ❌ HU-B08, fuera de scope HU-01..07 |
| 9–12 | `contract_signers`, `application_edit_logs`, `documents.uploaded_by`, `sarlaft_checks` revisión | Sin migración escrita | ❌ HU-B07/B08, fuera de scope HU-01..07 |
| 13 | `users.phone` | Schema inicial `1700` | ✅ Ya existe en BD inicial |
| 14 | `users.full_name` | Sin migración escrita | ❌ HU-B09/P03/P07, fuera de scope HU-01..07 |
| 15 | `partners.country_code` | `1980000000000` | ⚠️ Depende de si mig 1980 fue aplicada |

### 1c. Pasos para sincronizar la BD local

```bash
# 1. Verificar estado actual
psql -d <tu_db> -f database/scripts/validate-migrations.sql

# 2. Aplicar todas las migraciones pendientes (1710 → 2200)
cd database && npx typeorm migration:run -d src/data-source.ts

# Después de migration:run, la BD tendrá:
# - partners.state (ENUM), alias, country_code (migs 1850, 1980)
# - credit_applications con status ENUM, todos los campos del módulo (migs 1900+)
# - categories.is_default (mig 2170)
# - credit_applications.partner_category_ids jsonb (mig 2200) ← NUEVA
# - partners.default_category_id (mig 2200) ← NUEVA
```

> **Nota importante sobre `PartnerEntity`:** La entidad mapea el campo `state` (mig 1850),
> `alias` (mig 1980) y `acronym` (schema inicial). Los tres deben existir en la BD tras ejecutar
> las migraciones. El campo `status_id` desaparece al aplicar mig 1850. El campo `default_rep_id`
> también desaparece en mig 1850 (solo `default_category_id` de la nueva mig 2200 y
> `categories.is_default` de mig 2170 dan la categoría predeterminada).

**Impacto para generación de código:** Los bugs B1 y B5 tienen parte de causa en schema no sincronizado.
Resolver B1 (partner_id: null) y B5 (singular FK vs jsonb) requiere primero ejecutar `migration:run`.

---

## 2. Modelo Mental del Sistema

### Backend
NestJS monorepo · 5 microservicios · Arquitectura hexagonal · PostgreSQL (3 schemas) · AWS SQS/S3/Cognito

| MS | Relevancia para HU-01..07 | Estado actual |
|----|--------------------------|---------------|
| `transversal-ms` | Crea `persons`, gestiona `users`, auth | ✅ Producción |
| `suppliers-ms` | Lookup de `partners`, `businesses`, `sales_reps`, `legal_reps` | ✅ 80% |
| `products-ms` | **Dueño de `credit_applications`** — módulo creado, ~55% completo para HU-01..04 | ⚠️ Ver §2a |
| `notifications-ms` | Twilio + Resend para HU-05 | ⚠️ 40% (sin HTTP, sin templates) |
| `contracts-ms` | ZapSign post-aprobación | ✅ 60% (no impacta HU-01..07 directamente) |

### §2a — Estado real del módulo `credit-applications` en `products-ms`

> **Revisado:** 2026-04-18 · Archivos leídos: 49 archivos del módulo + infraestructura

**Estructura completa** (`domain/` + `application/` + `presentation/` + infraestructura en `src/infrastructure/`): ✅

#### Lo que YA está implementado

| Componente | Detalle | Estado |
|------------|---------|--------|
| **Domain model** | `CreditApplication` (34 campos) + `CreditApplicationRepository` port + excepción `NotFound` | ✅ |
| **12 use cases** | create, register-client, get, list, list-by-partner, list-by-sales-rep, update, delete, approve, reject, save-pre-study, upload-document | ✅ |
| **2 controllers** | Público: `POST /credit-applications` · Privado (JWT + roles): 9 endpoints (list, get, update, approve, reject, pre-study, upload, by-partner, by-sales-rep) | ✅ |
| **6 DTOs** | create, response, update, approve, reject, save-pre-study | ✅ |
| **TypeORM repository** | `TypeormCreditApplicationRepository` cableado como `CREDIT_APPLICATION_REPOSITORY` | ✅ |
| **ClientRegistration adapter** | `TypeormClientRegistrationAdapter`: find/create person + business vía SQL crudo en `transversal_schema` y `suppliers_schema` | ✅ |
| **Auth guards** | Cognito JWT + `RolesGuard` + `@RequireRoles()` | ✅ |
| **Wiring** | `InfrastructureModule` (global) provee todos los tokens | ✅ |

#### Bugs y gaps encontrados en el código existente

| # | Archivo | Problema | HU afectada | Severidad |
|---|---------|----------|-------------|-----------|
| B1 | `register-client...use-case.ts:L59-61` | `partner_id: null`, `partner_category_id: null`, `sales_representative_id: null` hardcodeados — ninguna solicitud se asocia a un partner | HU-01, HU-02, HU-03, HU-04 | 🔴 Bug crítico |
| B2 | `create-credit-application.dto.ts` | Sin campo `partnerAlias` ni `partnerId` — el endpoint público no sabe de qué partner viene la solicitud | HU-01, HU-02, HU-03, HU-04 | 🔴 Bug crítico |
| B3 | `create-credit-application.dto.ts` | Sin campo `birthDate` — HU-01/02 requieren fecha de nacimiento de la persona | HU-01, HU-02 | 🟡 Faltante |
| B4 | `register-client...use-case.ts:L65` | `privacy_policy_accepted: true` hardcodeado — no viene del formulario; omite la validación del checkbox | HU-01, HU-03 | 🟡 Faltante |
| B5 | `credit-application.models.ts:L9` | Domain model usa `partner_category_id: number \| null` (singular FK) — tras ejecutar mig 2200 la columna pasa a `partner_category_ids jsonb`; entity, mapper y domain model necesitan actualizarse | HU-01..HU-04 | 🔴 Desync schema/código (bloqueado hasta `migration:run`) |
| B6 | `credit-applications-private.controller.ts:L89,L102` | `GET partner/:partnerId` y `GET sales-rep/:salesRepId` usan `ParseIntPipe` (ID interno) en lugar de `ParseUUIDPipe` (externalId) — expone PK interna | Backoffice HUs | 🟡 Convención |
| B7 | `stub-credit-application-document-storage.adapter.ts` | Adaptador S3 es STUB que lanza `NotImplementedException` — upload de documentos no funciona | HU-03/04 (eeff), backoffice | 🟠 Pendiente |

#### Lo que falta implementar (no existe aún)

| # | Componente faltante | HU que lo necesita |
|---|--------------------|--------------------|
| F1 | Endpoint/variante SR: `POST /credit-applications` con `status=PENDING_AUTHORIZATION` y `partnerCategoryIds[]` | HU-02, HU-04 |
| F2 | Campos PJ en DTO y use case: `taxId`, `yearEstablished`, `legalRepresentative*`, `shareholders[]` | HU-03, HU-04 |
| F3 | `legal_representatives` creation en `ClientRegistrationPort` | HU-03, HU-04 |
| F4 | `shareholders` creation y persistencia | HU-03, HU-04 |
| F5 | Endpoint `POST /credit-applications/:externalId/authorize` (cliente autoriza, PENDING_AUTHORIZATION → IN_PROGRESS) | HU-05 |
| F6 | Dispatch de notificación cuando status = `PENDING_AUTHORIZATION` (trigger a notifications-ms) | HU-02, HU-04, HU-05 |
| F7 | Pipeline de análisis: trigger cuando status = `IN_PROGRESS` (SARLAFT, Experian, n8n) | HU-06, HU-07 |
| F8 | S3 adapter real para `CreditApplicationDocumentStoragePort` (reemplazar STUB) | HU-03/04, backoffice |
| F9 | Endpoint/route pública por `partnerAlias` para resolver partner_id + co-branding | HU-01, HU-03, HU-05 |

---

### Frontend
Next.js 16 + React 19 · Feature `onboarding` ~70% estructural · Gaps funcionales relevantes:
- Formularios PN (3 pasos) y PJ (5 pasos): constantes, schemas Zod, servicios y cliente HTTP existen
- Variantes SR: páginas duplicadas sin diferenciación
- Sin feedback de éxito/error al usuario
- Sin componente `Repeater` para accionistas PJ
- Sin ruta `/auth/[externalId]` para la landing de autorización (HU-05)

---

## 3. Análisis de Cobertura — Tabla de Gaps

| User Story | BE cubierto | FE cubierto | Gaps principales | Prioridad |
|------------|-------------|-------------|-----------------|-----------|
| **HU-01** PN Self-Service | ⚠️ Parcial | ⚠️ Parcial | Sin contrato API; MS no asignado; resolución alias→partner_id no definida; FE sin feedback UI | **Alta** |
| **HU-02** PN SR | ⚠️ Parcial | ❌ | Auth SR no definida; cola SQS sin nombre; FE SR es duplicado; multiselect categorías sin wiring | **Alta** |
| **HU-03** PJ Self-Service | ⚠️ Parcial | ⚠️ Parcial | Sin Repeater FE; beneficiarios anidados sin arquitectura; FileInput no integrado; transacción multi-entidad sin patrón | **Alta** |
| **HU-04** PJ SR | ⚠️ Parcial | ❌ | Hereda HU-03 + HU-02; destinatario notificación es rep. legal | **Alta** |
| **HU-05** Autorización | ❌ | ❌ | Landing `/auth/[externalId]` no existe; scheduler T+24/48h sin decisión; webhook Twilio sin validación; templates sin registrar | **Alta** |
| **HU-06** Backend PN | ⚠️ Parcial | N/A | MS pipeline no asignado; n8n sin patrón integración; contratos externos incompletos; Google Chat no documentado | **Alta** |
| **HU-07** Backend PJ | ⚠️ Parcial | N/A | Hereda HU-06; SARLAFT recursivo; RUES/HCPJ sin contrato; S3 migration sin patrón | **Alta** |

---

## 4. Gaps Detallados por Historia

### HU-01 — Solicitud de Crédito PN · Self-Service

**Gaps bloqueantes:**

| # | Gap | Tipo | Impacto |
|---|-----|------|---------|
| 1 | No existe endpoint HTTP para crear solicitudes PN en ningún MS | Arquitectural | Bloquea todo |
| 2 | MS responsable no asignado (`products-ms` tiene la tabla, pero sin módulo credit-applications) | Decisión | Bloquea todo |
| 3 | Resolución `alias_partner` (URL) → `partner_id` (BD) no documentada ni implementada | Diseño | Bloquea FE |

**Gaps no bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 4 | FE: sin toast/feedback de éxito — hay `// TODO` en `natural-person/page.tsx` | FE menor |
| 5 | FE: manejo de errores solo con `console.error` | FE menor |
| 6 | FE: typo `patnerId` en constants de `natural-person.ts` | FE menor |
| 7 | Contrato de request/response no especificado en ningún prompt | Documentación |

---

### HU-02 — Solicitud de Crédito PN · Registrada por SR

**Gaps bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 1 | Mecanismo de autenticación del SR para el formulario de onboarding no definido (¿JWT con rol `sales_representative`? ¿sesión pública?) | Seguridad/decisión |
| 2 | Nombre de cola SQS para disparar notificación de autorización no especificado | Mensajería |
| 3 | FE: páginas SR (`/sales-representative/natural-person/`) son código idéntico al flujo self-service — no usan `naturalPersonsalesRepresentativeFormFields` | FE crítico |

**Gaps no bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 4 | FE: multiselect de categorías no cargado dinámicamente desde API | FE |
| 5 | Mecanismo de disparo de notificación (¿HTTP directo a `notifications-ms`? ¿SQS?) no definido | Diseño |

---

### HU-03 — Solicitud de Crédito PJ · Self-Service

**Gaps bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 1 | No existe componente `Repeater` en el repositorio FE — `FieldType.REPEATER` está definido en tipos pero sin implementación UI | FE crítico |
| 2 | Beneficiarios anidados (accionista empresa → sus propios accionistas) no abordados en ningún prompt ni skill | Arquitectural |
| 3 | Patrón de transacción multi-entidad (business + persons + legal_representative + shareholders en una sola operación atómica) no definido para el BE | Diseño |

**Gaps no bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 4 | FE: `FileInput` existe en `components/transversal/` pero no está integrado en el formulario para `clrPjEeff` | FE |
| 5 | FE: paso 5 condicional (`dependency: "applicationType"`) definido en schema pero Stepper no implementa lógica condicional | FE |

---

### HU-04 — Solicitud de Crédito PJ · Registrada por SR

Hereda todos los gaps de HU-03 y HU-02.

**Gap adicional:**

| # | Gap | Tipo |
|---|-----|------|
| 1 | La notificación de autorización va al representante legal (no al cliente directo como en PN) — el destinatario y el payload de la notificación son distintos y no están documentados en los prompts | Diseño |

---

### HU-05 — Autorización del Cliente

**Gaps bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 1 | **Ruta `/auth/[externalId]` no existe en FE** — es una ruta pública que no tiene implementación ni en `app/` | FE crítico |
| 2 | **Estrategia de scheduling para T+24h y T+48h no definida** — el código de implementación es radicalmente diferente según la decisión: AWS EventBridge Scheduler, SQS delay messages, cron job en `notifications-ms`, o Lambda + CloudWatch Events | Arquitectural crítico |
| 3 | Validación del webhook de Twilio (¿header de firma? ¿secret compartido?) no especificada en ningún prompt ni en `api-integrations.md` | Seguridad |
| 4 | Templates de Twilio (`platam_autorizacion_pn/pj`, `platam_recordatorio_1/2_pn/pj`) y Resend deben estar pre-registrados en las plataformas respectivas antes de que el código pueda usarlos | Infra/ops |

**Gaps no bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 5 | La landing pública `/auth/[externalId]` requiere datos de co-branding del partner sin auth — necesita endpoint público `GET /partners/alias/{alias}` que no está definido ni implementado | Diseño |
| 6 | No está documentado cómo la landing conoce el `alias` del partner a partir del `externalId` de la solicitud | Lógica |

---

### HU-06 — Procesos Backend PN

**Gaps bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 1 | **MS asignado para el pipeline de análisis no definido** — el prompt master explícitamente dice "no asignes por convicción"; se requiere decisión antes de implementar | Arquitectural |
| 2 | **Patrón de integración con n8n no definido** — `api-integrations.md` dice "recibe webhook / devuelve resultado vía callback a API NestJS" pero no especifica: ¿qué endpoint recibe el callback? ¿qué autenticación usa? ¿qué payload exacto? | Integración |

**Gaps no bloqueantes:**

| # | Gap | Tipo |
|---|-----|------|
| 3 | Integración con Google Chat (alertas SARLAFT, errores Experian, solicitudes bajo revisión) no documentada — `api-integrations.md` solo menciona el propósito | Integración |
| 4 | Contratos de APIs externas incompletos en `api-integrations.md`: SARLAFT, BDME y Rama Judicial no tienen base URL, auth, payload ni formato de respuesta | Documentación |
| 5 | Experian HCPN tiene mención de campos de resultado pero no el contrato completo de request | Documentación |
| 6 | Estrategia de idempotencia del pipeline (si el mismo `credit_application_id` dispara el pipeline dos veces) no definida | Diseño |
| 7 | Máquina de estados completa de `credit_applications` existe dispersa en el texto de HU-06 pero no está formalizada como diagrama — esto genera riesgo de inconsistencias entre sesiones de Claude Code | Documentación |

---

### HU-07 — Procesos Backend PJ

Hereda todos los gaps de HU-06, más:

| # | Gap | Tipo |
|---|-----|------|
| 1 | SARLAFT recursivo (legal rep + todos los accionistas + beneficiarios de accionistas empresa) — la complejidad algorítmica no está abordada en ningún prompt | Arquitectural |
| 2 | RUES no tiene contrato en `api-integrations.md` (ni base URL, ni auth, ni formato de respuesta) | Documentación |
| 3 | HCPJ (Experian crédito empresarial) no tiene contrato — distinto al HCPN | Documentación |
| 4 | Migración de documentos a S3 (`ppay/pj_client_docs/{tax_id}/eeff/`) — el patrón de ejecución (¿cuándo? ¿qué MS? ¿asíncrono?) no está definido | Diseño |

---

## 5. Decisiones Pendientes — Bloqueantes para Generación de Código

Estas son las decisiones que **una persona debe tomar** antes de que Claude Code pueda generar código coherente. No son gaps documentales — son elecciones arquitecturales o de negocio con consecuencias directas en el código.

### ~~Decisión A — MS responsable de `credit_applications` (HTTP)~~
✅ **RESUELTA** — El módulo `credit-applications` está implementado en `products-ms`. Confirmado por lectura de código.

---

### Decisión B — Estrategia de scheduling para recordatorios HU-05
**Pregunta:** ¿Cómo se implementan los mensajes de T+24h y T+48h?  
**Opciones:**
- **AWS EventBridge Scheduler** (crea job único por solicitud; requiere permisos IAM adicionales)
- **SQS delay messages** (mensaje inicial con `DelaySeconds` máximo 15min; requiere cadena de mensajes para 24/48h)
- **Cron job en `notifications-ms`** (query a BD cada N minutos; más simple pero polling)
- **AWS Step Functions** (máquina de estados serverless; más robusto, más infra)

**Impacto:** El código de HU-05 BE es radicalmente diferente según la opción elegida.  
**Requiere respuesta de:** Freddy / equipo de infra.

---

### Decisión C — MS y endpoint del pipeline de análisis (HU-06/07)
**Pregunta:** ¿El pipeline de análisis crediticio vive en `products-ms` junto a `credit_applications`, o en un worker/proceso separado?  
**Opciones:**
- `products-ms` con un módulo `credit-analysis-pipeline` (cohesivo con las entidades — **recomendado**, ya tiene el patrón)
- Worker separado activado por SQS (desacoplado; puede escalar independientemente)

**Impacto:** Determina qué archivos toca Claude Code, cómo recibe el trigger y cómo hace callback al status de la solicitud.  
**Requiere respuesta de:** Freddy / arquitectura.

---

### Decisión D — Endpoint público de partners por alias
**Pregunta:** ¿Existe o debe crearse un endpoint `GET /partners/alias/{alias}` sin autenticación que devuelva datos de co-branding?  
**Contexto:** La landing `/{{alias_partner}}` (HU-01) y la landing de autorización `/auth/{externalId}` (HU-05) necesitan cargar logo, colores y nombre del partner sin que el usuario esté autenticado.  
**Requiere respuesta de:** Freddy.

---

## 6. Documentos Faltantes — Priorizados

### Tier 1 — Bloquean sesiones específicas de Claude Code

| Documento | Bloquea | Quién crea |
|-----------|---------|------------|
| **Contrato de API `credit_applications`**: endpoint(s), verbo(s), request body (camelCase), response de éxito y errores | Módulo 0 (foundation de HU-01..04) | Arquitecto + se genera con Claude tras Decisión A |
| **Respuesta a Decisión A** (MS credit-applications) | Módulo 0 y toda la épica | Freddy |
| **Respuesta a Decisión B** (scheduler) | HU-05 BE | Freddy + infra |
| **Respuesta a Decisión C** (pipeline MS) | HU-06, HU-07 | Freddy |

### Tier 2 — Bloquean HUs específicas

| Documento | Bloquea | Quién crea |
|-----------|---------|------------|
| **Spec del componente Repeater FE**: qué props, cómo integra con react-hook-form, manejo de arrays Zod | HU-03 FE, HU-04 FE | Dev FE |
| **Contrato RUES API**: base URL, auth, payload request, formato de respuesta | HU-07 BE | Revisar `api-integrations.md` / Lorena |
| **Contrato HCPJ Experian**: diferencia con HCPN, campos de response | HU-07 BE | Revisar `api-integrations.md` / Lorena |
| **Validación webhook Twilio**: método de verificación de firma | HU-05 BE | Revisar docs Twilio + documentar en `api-integrations.md` |
| **Payload exacto n8n → backend**: qué endpoint recibe el callback, con qué token, qué body | HU-06, HU-07 BE | n8n owner / Lorena |

### Tier 3 — Mejoran precisión sin bloquear

| Documento | Beneficio |
|-----------|-----------|
| Diagrama formal de máquina de estados `credit_applications` | Evita inconsistencias entre sesiones de Claude Code |
| Especificación OpenAPI para `products-ms` (credit-applications) | Genera código preciso; usar skill `create-endpoint-swagger.md` tras Módulo 0 |
| Contratos completos SARLAFT, BDME, Rama Judicial en `api-integrations.md` | Permite implementar HU-06/07 sin stubs |
| Mapa de permisos por endpoint: público / `sales_representative` / `back_office_analyst` | Guards NestJS precisos sin suposiciones |
| Seed data para `credit_applications` en estados `in_progress` y `pending_authorization` | Permite probar pipelines HU-06/07 sin crear datos manualmente |

---

## 7. Roadmap de Ejecución

```
SEMANA 1 — Fundaciones (4 decisiones + 1 componente)
│
├── Día 1 — Decisiones bloqueantes (humano)
│   ├── Decisión A: MS para credit_applications → products-ms recomendado
│   ├── Decisión B: scheduler HU-05 → EventBridge o Cron en MS
│   ├── Decisión C: pipeline HU-06/07 → products-ms o worker SQS
│   └── Decisión D: endpoint público partners/alias
│
├── Día 2-3 — Módulo 0: credit-applications en products-ms (BE)
│   ├── Módulo hexagonal: domain / application / infrastructure / presentation
│   ├── POST /credit-applications (PN y PJ variantes)
│   ├── GET /credit-applications/:externalId
│   ├── PATCH /credit-applications/:externalId/status
│   └── Actualizar onboarding-client.ts con contratos reales (FE)
│
└── Día 3-4 — Componente Repeater (FE, independiente)
    └── Implementar FieldType.REPEATER en components/transversal/

SEMANA 2 — Bloque B: Captura de solicitudes (paralelo BE + FE)
│
├── HU-01 BE + FE (2-3 días)
│   ├── BE: endpoint POST PN en products-ms + resolución alias_partner
│   └── FE: toast + error handling + typo fix + alias resolution
│
├── HU-02 BE + FE (1-2 días sobre HU-01)
│   ├── BE: variante SR con status=pending_authorization + SQS notificación
│   └── FE: SR pages diferenciadas + categorías dinámicas
│
├── HU-03 BE + FE (3-4 días)
│   ├── BE: endpoint POST PJ + transacción multi-entidad
│   └── FE: integrar Repeater + FileInput + conditional step
│
└── HU-04 BE + FE (1-2 días sobre HU-03)
    └── BE + FE: SR PJ diferenciado, notificación → rep. legal

SEMANA 3 — HU-05: Autorización
│
├── BE (3-4 días)
│   ├── notifications-ms: templates Twilio + Resend
│   ├── Scheduler: implementar estrategia elegida en Decisión B
│   ├── Webhook Twilio: endpoint + validación
│   └── Transición de estado → in_progress al autorizar
│
└── FE (2-3 días, paralelo con BE)
    ├── app/auth/[externalId]/page.tsx (ruta pública)
    └── Co-branding dinámico por partner

SEMANA 4 — Bloque D: Pipelines backend (paralelo)
│
├── HU-06 BE (3-4 días)
│   ├── Pipeline PN: verificación duplicados → SARLAFT → BDME → Rama
│   ├── Experian HCPN → n8n → resultado
│   └── Google Chat alerts
│
└── HU-07 BE (3-4 días, puede correr en paralelo con HU-06)
    ├── Pipeline PJ: SARLAFT recursivo → RUES → BDME → HCPN/HCPJ
    ├── S3 document migration
    └── n8n payload PJ → resultado
```

---

## 8. Plantillas de Contexto por Sesión de Claude Code

### Módulo 0 — Credit Applications (sesión backend)
```
@apps/products-ms/src/
@libs/products-data/src/entities/credit-application.entity.ts
@libs/products-data/src/entities/
@libs/shared/src/domain/statuses.enum.ts
@libs/shared/src/domain/types.enum.ts
@.ai/schemas/database-schema.sql
@apps/transversal-ms/src/modules/persons/        ← patrón hexagonal de referencia
@.cursor/rules/02-backend.mdc
@.cursor/skills/nestjs-typeorm-ddl-hexagonal/SKILL.md

Plan: user-story-execution-plan-backend.md
Microservicio: products-ms
Decisiones previas: [pegar respuesta a Decisión A + contrato de API acordado]
```

### HU-01 / HU-02 — Backend
```
@apps/products-ms/src/modules/credit-applications/     ← creado en Módulo 0
@apps/transversal-ms/src/modules/persons/
@apps/suppliers-ms/src/modules/partners/
@apps/suppliers-ms/src/modules/sales-representatives/
@libs/products-data/src/entities/credit-application.entity.ts
@.ai/user-stories/HU-01___Solicitud_de_Crédito_PN___Self-Service.md  ← o HU-02
@.cursor/rules/02-backend.mdc
@.cursor/rules/03-migrations.mdc
@.cursor/skills/nestjs-typeorm-ddl-hexagonal/SKILL.md
[HU-02 solo:] @.cursor/skills/nestjs-sqs-messaging/SKILL.md

Plan: user-story-execution-plan-backend.md
```

### HU-01 / HU-02 — Frontend
```
@features/onboarding/
@infrastructure/api/onboarding-client.ts
@components/transversal/
@app/onboarding/[id]/natural-person/
@.ai/context/ui/
@.ai/prompts/crear-pagina-formulario-multipaso.md
@.cursor/rules/features-structure.mdc
@.cursor/rules/multistep-form-pattern.mdc

Plan: user-story-execution-plan-frontend.md
HU: [misma que backend]
Feature: onboarding
Clientes API: onboarding-client + NEXT_PUBLIC_ONBOARDING_API_URL
Contexto adicional:
- Typo a corregir: patnerId → partnerId en features/onboarding/constants/natural-person.ts
- SR pages deben usar naturalPersonsalesRepresentativeFormFields (HU-02)
- Añadir toast éxito (react-toastify ya instalado) y error handling en pages
```

### HU-03 / HU-04 — Backend
```
@apps/products-ms/src/modules/credit-applications/
@apps/suppliers-ms/src/modules/businesses/
@apps/suppliers-ms/src/modules/legal-representatives/
@libs/suppliers-data/src/entities/shareholder.entity.ts
@libs/suppliers-data/src/entities/legal-representative.entity.ts
@libs/suppliers-data/src/entities/business.entity.ts
@.ai/user-stories/HU-03___Solicitud_de_Crédito_PJ___Self-Service.md  ← o HU-04
@.cursor/rules/02-backend.mdc
@.cursor/skills/nestjs-typeorm-ddl-hexagonal/SKILL.md
[HU-04 solo:] @.cursor/skills/nestjs-sqs-messaging/SKILL.md

Plan: user-story-execution-plan-backend.md
Contexto adicional: transacción atómica para (persons + business + legal_rep + shareholders)
```

### HU-03 / HU-04 — Frontend
```
@features/onboarding/
@infrastructure/api/onboarding-client.ts
@components/transversal/
@components/transversal/forms/Repeater.tsx    ← creado antes de esta sesión
@app/onboarding/[id]/legal-entity/
@.ai/context/ui/
@.ai/prompts/crear-pagina-formulario-multipaso.md
@.cursor/rules/features-structure.mdc

Plan: user-story-execution-plan-frontend.md
HU: [misma que backend]
Contexto adicional:
- Repeater ya disponible en components/transversal/
- Integrar FileInput para clrPjEeff (estados financieros)
- Implementar conditional step 5 en Stepper (dependency: applicationType)
```

### HU-05 — Backend
```
@apps/notifications-ms/src/
@apps/products-ms/src/modules/credit-applications/
@.ai/user-stories/HU-05___Autorizacion_del_Cliente.md
@.ai/context/api-integrations.md
@.cursor/skills/nestjs-sqs-messaging/SKILL.md
@.cursor/rules/02-backend.mdc

Plan: user-story-execution-plan-backend.md
Decisiones previas: [pegar respuesta a Decisión B — estrategia scheduler elegida]
Contexto adicional: templates Twilio = platam_autorizacion_pn/pj, platam_recordatorio_1/2_pn/pj
```

### HU-05 — Frontend
```
@features/onboarding/
@infrastructure/api/onboarding-client.ts
@app/onboarding/[id]/                            ← ruta pública de referencia
@.ai/context/ui/
@.ai/context/mockup/                             ← si existe mockup de la landing
@.cursor/rules/features-structure.mdc

Plan: user-story-execution-plan-frontend.md
HU: HU-05
Contexto adicional:
- Ruta NUEVA pública: app/auth/[externalId]/page.tsx (no auth, con co-branding)
- Co-branding: cargar datos de partner por externalId de la solicitud
- Tres estados de UI: pendiente / autorizado / expirado
```

### HU-06 — Backend
```
@apps/products-ms/src/modules/credit-applications/
@libs/products-data/src/entities/sarlaft-check.entity.ts
@libs/products-data/src/entities/experian-query.entity.ts
@libs/products-data/src/entities/ai-agent-analysis.entity.ts
@libs/products-data/src/entities/web-query.entity.ts
@.ai/user-stories/HU-06___Procesos_Backend_PN.md
@.ai/context/api-integrations.md
@.cursor/skills/nestjs-sqs-messaging/SKILL.md
@.cursor/rules/02-backend.mdc

Plan: user-story-execution-plan-backend.md
Decisiones previas: [Decisión C — pipeline en products-ms o worker]
Contexto adicional:
- Estados de solicitud relevantes: in_progress → (duplicate | sarlaft_match | under_review | in_interview | approved_pending_signature | rejected)
- n8n callback endpoint debe crearse en este módulo
```

### HU-07 — Backend
```
@apps/products-ms/src/modules/credit-applications/
@apps/products-ms/src/modules/credit-analysis-pipeline/  ← creado en HU-06
@libs/suppliers-data/src/entities/shareholder.entity.ts
@libs/suppliers-data/src/entities/legal-representative.entity.ts
@libs/products-data/src/entities/sarlaft-check.entity.ts
@libs/products-data/src/entities/experian-query.entity.ts
@.ai/user-stories/HU-07___Procesos_Backend_PJ.md
@.ai/context/api-integrations.md
@.cursor/skills/nestjs-sqs-messaging/SKILL.md

Plan: user-story-execution-plan-backend.md
Contexto adicional: SARLAFT recursivo para rep.legal + accionistas + beneficiarios de accionistas empresa
```

---

## 9. Archivos a Excluir del Contexto (Ruido)

Nunca anclar estas rutas en sesiones del módulo onboarding:

- `database/src/migrations/` completo (solo cargar 2-3 migraciones recientes como referencia de patrón)
- `apps/contracts-ms/` (no relevante hasta HU-B07/B08 post-aprobación)
- `apps/products-ms/src/modules/categories/` y `credit-facilities/` (ya implementados, no modificar)
- `features/partners/` (módulo independiente, no tocar)
- `features/auth/` (módulo independiente, no tocar)
- `*.spec.ts` de módulos no activos
- `libs/disbursement-data/` y `libs/collections-data/` (fuera de scope)

---

## 10. Veredicto — ¿Se puede iniciar la generación de código?

> **Actualizado:** 2026-04-18 tras lectura del módulo `credit-applications` existente.

### ✅ Lo que puede iniciar HOY (sin decisiones pendientes)

| Tarea | Archivos a tocar | Prioridad |
|-------|-----------------|-----------|
| **Fix B1+B2**: añadir `partnerAlias` al DTO y resolver `partner_id` en `register-client` use case | `create-credit-application.dto.ts`, `register-client...use-case.ts`, `client-registration.port.ts` | 🔴 Alta |
| **Fix B5**: actualizar domain model y TypeORM mapper para `partner_category_ids` (jsonb array) | `credit-application.models.ts`, `credit-application.mapper.ts` | 🔴 Alta |
| **Fix B3**: añadir `birthDate` al DTO y al use case | `create-credit-application.dto.ts`, `register-client...request.ts`, `client-registration.port.ts` | 🟡 Media |
| **Fix B4**: recibir `privacyPolicyAccepted` del DTO en lugar de hardcodear `true` | `create-credit-application.dto.ts`, `register-client...use-case.ts` | 🟡 Media |
| **Fix B6**: cambiar `ParseIntPipe` a `ParseUUIDPipe` en endpoints by-partner / by-sales-rep | `credit-applications-private.controller.ts` | 🟡 Baja |
| **FE**: Fix typo `patnerId` → `partnerId` | `features/onboarding/constants/natural-person.ts` | 🟡 Baja |
| **FE**: Toast y error handling en `natural-person/page.tsx` y `legal-entity/page.tsx` | Ambas páginas | 🟡 Media |
| **FE**: Diferenciar SR pages para usar `naturalPersonsalesRepresentativeFormFields` | `app/onboarding/[id]/sales-representative/natural-person/page.tsx` | 🟡 Media |
| **FE**: Componente `Repeater` | Nuevo componente en `components/transversal/` | 🟡 Media |

### ⚠️ Lo que puede iniciar con decisión mínima

| Tarea | Decisión requerida |
|-------|-------------------|
| HU-02 BE: endpoint SR con `PENDING_AUTHORIZATION` + trigger notificación | Decisión B parcial: ¿SQS o HTTP directo para notificar? |
| HU-03/04 BE: campos PJ + legal_representative + shareholders | Ninguna decisión — solo implementación |
| HU-05 BE: endpoint `/authorize` + scheduler recordatorios | Decisión B (estrategia scheduler) |
| HU-06/07 BE: pipeline de análisis | Decisión C (pipeline en products-ms o worker) |

### ❌ Lo que NO puede iniciar

| Tarea | Razón |
|-------|-------|
| HU-05 FE landing `/auth/[externalId]` | Decisión D (endpoint público partners por alias) pendiente |
| HU-06/07 completos | Decisión C + contratos APIs externas (RUES, HCPJ, n8n callback) sin documentar |
| S3 real para documentos | Decisión de estructura de carpetas S3 para credit-applications |

### Progreso actual del módulo hacia los prerequisites

| Prerrequisito del doc | Estado anterior | Estado actual | Delta |
|-----------------------|----------------|---------------|-------|
| Decisión A (MS asignado) | ❌ Pendiente | ✅ Resuelta (products-ms) | +1 decisión |
| Módulo 0 (HTTP endpoints base) | ❌ Pendiente | ⚠️ 55% (10 endpoints, 12 use cases; 7 bugs/gaps) | +55% |
| Schema migrations (BD local) | ✅ Asumidas ejecutadas | ⚠️ BD en schema inicial — ejecutar `migration:run` (migraciones 1710→2200 escritas) | ⬇️ Regresión |
| Mig 2200 (items 1 y 2b SCHEMA_PENDIENTE) | ❌ Sin migración escrita | ✅ Migración `2200000000000` creada | +1 migración |
| Decisión B (scheduler HU-05) | ❌ Pendiente | ❌ Pendiente | = |
| Decisión C (pipeline MS) | ❌ Pendiente | ❌ Pendiente | = |
| Decisión D (endpoint público partners) | ❌ Pendiente | ❌ Pendiente | = |

### Tiempo estimado para desbloquearse totalmente

- **Fixes del módulo existente** (B1-B7): ~0.5 días → módulo funcional para HU-01 self-service básico
- **HU-02/03/04** (SR + PJ): ~3-4 días una vez fixes aplicados  
- **HU-05** (autorización): ~3-4 días tras Decisión B
- **HU-06/07** (pipelines): ~5-6 días tras Decisión C + contratos externos

---

## 11. Contradicciones Detectadas en los Prompts Maestros

> Documentadas como referencia — las HUs tienen precedencia sobre los prompts.

| Contradicción | Prompt maestro BE | Prompt maestro FE | Fuente de verdad |
|---------------|-------------------|-------------------|-----------------|
| Identificador en URL | "externalId en bordes externos" | "externalId en rutas públicas" | Coherente — HU confirma `externalId` en `/auth/{{external_id}}` |
| camelCase en FE | "camelCase en tipos TS siempre" | "aunque la HU muestre snake_case" | Coherente — ambos prohíben snake_case en tipos TS |
| MS asignado | "no asignes por convicción, deriva de HU" | No menciona MS | **Ambigüedad real** — ningún prompt resuelve cuál MS maneja credit_applications → **Decisión A** |
| Paralelismo BE/FE | "misma HU, mismos textos" | "lanzar en paralelo" | Coherente pero el FE puede generar stubs si BE no termina primero |

---

*Documento generado por análisis arquitectural de platam_pay_v2 y platam_pay_v2_frontend.*  
*Actualizar al resolverse cada Decisión (A, B, C, D) y al iniciar cada bloque de HUs.*
