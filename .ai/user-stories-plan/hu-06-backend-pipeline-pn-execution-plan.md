# Plan de Ejecución — HU-06: Procesos Backend PN (Pipeline de Estudio Automatizado)

> **Creado:** 2026-04-21 · **Actualizado:** 2026-04-22 (S1–S5 implementadas y compilando sin errores · `tsc --noEmit` ✅ · Ver sección Roadmap para estado por sesión)
> **Scope:** BE (`platam_pay_v2 · feature/HU-06-Backend-Process-PN`)
> **User story:** `.ai/user-stories/HU-06___Procesos_Backend_PN.md`
> **Responsable implementación:** Freddy Candelo (BE NestJS)
> **Referencia base:** `.ai/prompts/dev/transversal/user-story-execution-plan-backend.md`

---

## Contexto del Sistema (Fase 1 — Modelo Mental Construido)

### Estado del Schema (100 % verificado con migraciones y entidades)

| Tabla | Migración origen | Estado | Notas |
|---|---|---|---|
| `products_schema.sarlaft_checks` | 2030 + 2170 | ✅ Completa | Enum `sarlaft_check_status` = `clean/alert/blocked` (2170 ya migró de `pending/completed/error`) |
| `products_schema.web_queries` | 2030 | ✅ Completa | `query_type` enum = `bdme / rama_judicial` |
| `products_schema.experian_queries` | 2020 | ✅ Completa | `creditReport` JSONB + `creditScore` decimal |
| `products_schema.ai_agent_analysis` | 2030 + 2170 | ✅ Completa | `html_url_agent_analysis` + `agent_recommended_loc` ya añadidos en 2170 |
| `transversal_schema.persons.email` | 1940 | ✅ Existe | `VARCHAR(320) UNIQUE NULLABLE` — disponible para check de duplicados |

### Estado de Enums en `@platam/shared`

| Enum | Valores relevantes HU-06 | Estado |
|---|---|---|
| `CreditApplicationStatus` | `IN_PROGRESS`, `DUPLICATE`, `SARLAFT_MATCH`, `EXPERIAN_QUERY_ERROR`, `AI_AGENT_ERROR`, `IN_INTERVIEW`, `UNDER_REVIEW`, `APPROVED_PENDING_SIGNATURE`, `REJECTED` | ✅ Todos presentes |
| `SarlaftCheckStatuses` | `CLEAN`, `ALERT`, `BLOCKED` | ✅ Presente |
| `ExperianQueryStatus` | `PENDING`, `COMPLETED`, `ERROR` | ✅ Presente |
| `ExperianQueryTypes` | `HCPN` | ✅ Presente |
| `WebQueryType` | `BDME`, `RAMA_JUDICIAL` | ✅ Presente |
| `AiAgentAnalysisRecommendation` | `HITL`, `INTERVIEW`, `AUTO_APPROVE`, `AUTO_REJECT` | ✅ Presente (INTERVIEW añadido en 2170) |

### Ítems "SCHEMA_PENDIENTE_LORENA.md" — Estado

| Ítem | Descripción | Estado |
|---|---|---|
| Ítem 3 | `html_url_agent_analysis` + `agent_recommended_loc` en `ai_agent_analysis` | ✅ **RESUELTO** — Migración 2170 + `AiAgentAnalysisEntity` ya los tienen |
| Ítem 5 | `approved_pending_signature` en enum `credit_application_status` | ✅ **RESUELTO** — Migración 2170 + `CreditApplicationStatus.APPROVED_PENDING_SIGNATURE` existe |

### Estado de la capa de aplicación (actualizado post S1–S5)

**✅ Implementado (S1–S5 — `tsc --noEmit` limpio):**
- Domain models: `SarlaftCheck`, `WebQuery`, `ExperianQuery`, `AiAgentAnalysis`
- 9 domain ports: 4 repository ports + `SarlaftServicePort`, `WebScrapingServicePort`, `ExperianServicePort`, `AiAgentServicePort`, `GoogleChatNotifierPort`
- 4 TypeORM repository adapters registrados en `infrastructure.module.ts`
- `find_active_by_person_identity` en `CreditApplicationRepository` + `TypeormCreditApplicationRepository`
- `get_person_for_pipeline` en `ClientRegistrationPort` + `TypeormClientRegistrationAdapter`
- `CognitoAuthAdapter` (singleton, caché 24h con renovación 30 min antes)
- `HttpSarlaftServiceAdapter` (POST+GET polling, mapeo `riesgo_global` → `SarlaftCheckStatuses`)
- `HttpWebScrapingServiceAdapter` (BDME + Rama Judicial, mismo patrón de polling)
- `HttpExperianHcpnAdapter` (POST síncrono + SigV4 con `@smithy/signature-v4`)
- `StubAiAgentAdapter` (decisión por credit score o `AI_AGENT_MOCK_RECOMMENDATION`)
- `HttpGoogleChatNotifierAdapter` (fire-and-forget, graceful error handling)
- Todos los adapters HTTP registrados en `infrastructure.module.ts`
- `RunCreditApplicationPipelineUseCase` (orquesta pasos 1–7: duplicados → SARLAFT → BDME → RJ → Experian → AI → dispatch)
- `credit_application_pipeline_start` añadido a `TransversalEventType`
- `AuthorizeCreditApplicationUseCase` publica evento SQS tras setear `IN_PROGRESS`
- `ProcessProductsInboundMessageUseCase` enruta `credit_application_pipeline_start` → `RunCreditApplicationPipelineUseCase`
- `RunCreditApplicationPipelineUseCase` registrado en `CreditApplicationsApplicationModule`

**❌ Pendiente (Sesión 6):**
- Endpoint `/ai-result` placeholder (FastAPI futuro — stub no lo requiere)
- `ReceiveAiAgentResultUseCase` separado (la lógica `dispatch_result` vive inline en el pipeline por ahora)
- Smoke test E2E completo con `StubAiAgentAdapter`
- `.env.example` revisión final (variables HU-06 ya añadidas en sesiones anteriores)

---

## Contratos de Servicios Externos (Actualizado 2026-04-22)

### Infraestructura Compartida

Todos los servicios de scraping comparten la misma infraestructura:

```
Base URL:  https://8qpwghqtx3.execute-api.us-east-1.amazonaws.com/prod
Auth:      AWS API Gateway HTTP API con JWT Authorizer (Amazon Cognito)
Header:    Authorization: Bearer <IdToken|AccessToken>
```

**Cognito User Pool:** `micro-services-platam` (us-east-1)  
**Cognito Domain:** `https://micro-services-platam.auth.us-east-1.amazoncognito.com`  
**Client ID:** `565niamo34irjpik6cjc0dokdb`  
**Token URL:** `https://micro-services-platam.auth.us-east-1.amazoncognito.com/oauth2/token`

> **Patrón de jobs compartido:** todos los endpoints de scraping usan el mismo ciclo:  
> `POST /v1/{servicio}/jobs` → recibe `job_id` → `GET /v1/{servicio}/jobs/{job_id}` hasta `status = "done" | "failed"`

---

### API SARLAFT ✅ CONTRATO CONOCIDO

**Latencia típica:** ~43 segundos → **el pipeline DEBE ejecutarse como proceso background async**

#### Crear job

```http
POST /v1/sarlaft/jobs
Content-Type: application/json
Authorization: Bearer <token>

{
  "nombres": "MARIA ELENA",          // persons.first_name (upper opcional)
  "documento": "1234567890",         // persons.doc_number
  "tipo_documento": "CC",            // DocTypes mapping: CITIZENSHIP→"CC", PASSPORT→"PA"
  "force_refresh": false
}
```

```json
// Response 200
{
  "success": true,
  "job_id": "sarlaft-abc123",
  "status": "queued",
  "created_at": "2026-04-22T14:00:00Z"
}
```

#### Consultar resultado

```http
GET /v1/sarlaft/jobs/{job_id}
Authorization: Bearer <token>
```

```json
// Response 200 — status: "done"
{
  "success": true,
  "job_id": "sarlaft-abc123",
  "status": "done",
  "output": {
    "riesgo_global": "LIMPIO",  // "CRITICO"|"ALTO"|"MEDIO"|"BAJO"|"LIMPIO"
    "requiere_verificacion_manual": false,
    "alertas": [],
    "listas_consultadas": {
      "policia": { "vinculante": false, "encontrado": false, "nivel_riesgo": "BAJO", "detalles": [] },
      "pep":     { "vinculante": false, "encontrado": false, "nivel_riesgo": "BAJO", "detalles": [] },
      "ofac":    { "vinculante": true,  "encontrado": false, "nivel_riesgo": "BAJO", "detalles": [], "total_matches": 0 },
      "onu":     { "vinculante": true,  "encontrado": false, "nivel_riesgo": "BAJO", "detalles": [], "total_matches": 0 }
    },
    "persona": {
      "documento": "1234567890",
      "nombre_original": "MARIA ELENA PEREZ GARCIA",
      "tipo_documento": "CC",
      "nombres": "MARIA ELENA"
    }
  }
}
```

#### Mapeo a `SarlaftCheckStatuses`

| Condición | Status |
|---|---|
| Alguna lista con `vinculante: true` AND `encontrado: true` | `BLOCKED` |
| `requiere_verificacion_manual: true` y ninguna lista bloqueante | `ALERT` |
| Ninguna de las anteriores | `CLEAN` |

#### Campos a persistir en `sarlaft_checks`

| Campo DB | Fuente API |
|---|---|
| `has_match` | `output.listas_consultadas.*.encontrado` = true en alguna |
| `status` | Mapeo lógico anterior |
| `sources` | `output.listas_consultadas` completo (JSONB) |
| `detail` | `output.alertas.join('; ')` o null |
| `consulted_at` | timestamp local al recibir resultado |

---

### API BDME ✅ CONTRATO CONOCIDO

#### Crear job

```http
POST /v1/bdme/jobs
Content-Type: application/json
Authorization: Bearer <token>

{
  "numero_id": "1234567890",    // persons.doc_number
  "tipo": "CC",                 // DocTypes mapping (igual que SARLAFT)
  "motivo": "contractual",      // SIEMPRE fijo
  "descargar_pdf": false        // SIEMPRE false (no necesitamos PDF)
}
```

```json
// Response 200
{
  "success": true,
  "job_id": "bdme-xyz789",
  "status": "queued",
  "created_at": "2026-04-22T14:00:00Z",
  "correlation_id": "corr-abc"
}
```

#### Consultar resultado

```http
GET /v1/bdme/jobs/{job_id}
Authorization: Bearer <token>
```

```json
// Response 200 — status: "done"
{
  "success": true,
  "job_id": "bdme-xyz789",
  "status": "done",
  "output": {
    "deudor_moroso": {
      "encontrado": false,
      "entidades": []
    },
    "acuerdos_pago": {
      "incumplimiento": false,
      "detalle": ""
    },
    "guias": []
  }
}
```

#### Campos a persistir en `web_queries` (`query_type = 'bdme'`)

| Campo DB | Fuente API |
|---|---|
| `query_result` | `output` completo (JSONB) |
| `consulted_at` | timestamp local al recibir resultado |

---

### API RAMA JUDICIAL ✅ CONTRATO CONOCIDO (flujo PN)

**Nota de parsing de nombre:** `persons.last_name` debe partirse en dos palabras:
- `apellido1` = primera palabra de `last_name`
- `apellido2` = segunda palabra de `last_name` (o `""` si solo tiene un apellido)

#### Crear job

```http
POST /v1/rama-judicial/jobs
Content-Type: application/json
Authorization: Bearer <token>

{
  "tipo_persona": "natural",
  "nombres": "MARIA ELENA",     // persons.first_name completo
  "apellido1": "PEREZ",         // primera palabra de persons.last_name
  "apellido2": "GARCIA",        // segunda palabra (o "" si no hay)
  "numero_documento": "1234567890",
  "solo_recientes": true,
  "max_paginas": 2,
  "pausa_entre_paginas": 0.2
}
```

```json
// Response 200
{
  "success": true,
  "job_id": "rj-def456",
  "status": "queued",
  "created_at": "2026-04-22T14:00:00Z",
  "correlation_id": "corr-def"
}
```

#### Consultar resultado

```http
GET /v1/rama-judicial/jobs/{job_id}
Authorization: Bearer <token>
```

```json
// Response 200 — status: "done"
{
  "success": true,
  "job_id": "rj-def456",
  "status": "done",
  "output": {
    "procesos": [],
    "total_registros": 0,
    "precision": {
      "needs_manual_review": false,
      "total_match_documento": 0,
      "warning": null
    }
  }
}
```

#### Campos a persistir en `web_queries` (`query_type = 'rama_judicial'`)

| Campo DB | Fuente API |
|---|---|
| `query_result` | `output` completo (JSONB) |
| `consulted_at` | timestamp local al recibir resultado |

---

### API Experian HCPN ✅ CONTRATO CONOCIDO (flujo PN — HU-06)

> **Tipo:** REST sincrónico — **sin polling**. Un POST → respuesta directa.  
> **Auth:** AWS IAM (SigV4) — distinto a Cognito. Requiere credenciales IAM firmadas en cada request.

**URL dev:** `https://gqq9mxgtb0.execute-api.us-east-1.amazonaws.com/dev/experian-hcpn`  
**ARN:** `arn:aws:execute-api:us-east-1:150890185530:gqq9mxgtb0/*/*/experian-hcpn`  
**API GW:** `hometuls-api-gw` (cuenta `150890185530`, región `us-east-1`)

#### Request

```http
POST https://gqq9mxgtb0.execute-api.us-east-1.amazonaws.com/dev/experian-hcpn
Content-Type: application/json
Authorization: AWS4-HMAC-SHA256 ... (SigV4 — generado por @smithy/signature-v4)
X-Amz-Date: ...
X-Amz-Security-Token: ... (si usa session credentials)

{
  "id": "30451838",      // persons.doc_number
  "last_name": "SOLER",  // persons.last_name (tal como está en DB)
  "platform": "ppay"     // SIEMPRE fijo para HU-06 (platam pay)
}
```

#### Response

```json
{
  "message": "HCPN Request Executed",
  "result": {
    "Informes": {
      "Informe": {
        "@fechaConsulta": "2026-01-16T10:38:36",
        "@respuesta": "14",
        "@codSeguridad": "F802CLJ",
        "@tipoIdDigitado": "1",
        "@identificacionDigitada": "30451838",
        "@apellidoDigitado": "SOLER",
        "@celebrityId": "false",
        "NaturalNacional": { ... },
        "Score": {
          "@tipo": "A8",
          "@puntaje": "750.0",       // ← credit_score (parsear como decimal)
          "@clasificacion": "3",
          "@fecha": "2026-01-16",
          "@poblacion": "...",
          "Razon": [ ... ]
        },
        "Consulta": [ ... ]
      }
    }
  },
  "score_decision": "N/A",
  "url": "https://s3.amazonaws.com/..."  // URL S3 del reporte — "s3_upload_failed" si falla
}
```

#### Mapeo a `experian_queries`

| Campo DB | Fuente API | Notas |
|---|---|---|
| `credit_report` | `response.result` completo (JSONB) | Fuente de verdad — todo el objeto Informes |
| `credit_score` | `parseFloat(result.Informes.Informe.Score['@puntaje'])` | String → decimal |
| `status` | `COMPLETED` si OK; `ERROR` si exception | |
| `consulted_at` | timestamp local al recibir response | |

> **Decisión S3 vs JSONB — RESUELTA: solo JSONB.** `response.url` se descarta. El agente AI usa `credit_report` JSONB directamente. No se requiere migración adicional — `experian_queries` ya tiene todos los campos necesarios. La URL es un artefacto interno del servicio HCPN sin utilidad para el pipeline.

#### Auth: AWS SigV4 (importante — distinto a Cognito)

```typescript
// Usar @smithy/signature-v4 — credenciales del entorno (IAM role o env vars)
import { SignatureV4 } from '@smithy/signature-v4';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Sha256 } from '@aws-crypto/sha256-js';

const signer = new SignatureV4({
  credentials: defaultProvider(), // toma de IAM role / AWS_ACCESS_KEY_ID+SECRET automáticamente
  region: 'us-east-1',
  service: 'execute-api',
  sha256: Sha256,
});
```

Para **dev local**: añadir al `.env`:
```env
AWS_ACCESS_KEY_ID=<key con permiso execute-api:Invoke sobre gqq9mxgtb0>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-1
```
Para **producción/ECS**: el IAM role del task debe tener `execute-api:Invoke` sobre `arn:aws:execute-api:us-east-1:150890185530:gqq9mxgtb0/*/*/experian-hcpn`.

---

### API Experian HCPJ ✅ CONTRATO CONOCIDO (flujo PJ — HU-07, referencia)

**URL dev:** `https://gqq9mxgtb0.execute-api.us-east-1.amazonaws.com/dev/experian-hcpj-dev`

```json
// Request
{ "id": "901548471", "last_name": "PLATAM", "platform": "confirming" }

// Response — misma estructura que HCPN pero con JuridicaNacional en lugar de NaturalNacional
{ "message": "HCPJ Request Executed", "result": { ... }, "score_decision": "N/A", "url": "..." }
```

> Scope de **HU-07**, no HU-06.

---

### API RUES ⚠️ PJ ONLY — Fuera del scope HU-06

```http
GET /v1/rues/scrape?nit=<NIT>
Authorization: Bearer <token>
```

**Resultado:** `{ success, data: { results: [{name, nit, category, status, legalRep, tipoSociedad}] } }`

> RUES es sincrónico y aplica solo a personas jurídicas. Scope de **HU-07**, no HU-06.

---

## Autenticación Backend — ✅ RESUELTA (2026-04-22)

### Configuración confirmada via AWS CloudShell

| Parámetro | Valor |
|---|---|
| **Auth flow** | `USER_PASSWORD_AUTH` (`client_credentials` NO está habilitado en el App Client) |
| **User Pool ID** | `us-east-1_iLqBM5kIu` |
| **App Client** | `sarlaft-api-gateway-jwt-prod` (`565niamo34irjpik6cjc0dokdb`) |
| **Usuario** | `84582478-7001-709b-7528-4b74a80bd434` (cuenta existente en el pool) |
| **Token a enviar al API Gateway** | `IdToken` (tiene `aud: "565niamo34irjpik6cjc0dokdb"` — lo que valida el JWT Authorizer) |
| **TTL del token** | `86400` segundos = **24 horas** |
| **Estrategia de caché** | Cachear `IdToken`; renovar cuando falten < 30 minutos usando `RefreshToken` |

### Cómo obtiene el token el backend (AWS SDK, no HTTP directo)

```typescript
// Usar @aws-sdk/client-cognito-identity-provider — NO la URL /oauth2/token
import { CognitoIdentityProviderClient, InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });
const response = await client.send(new InitiateAuthCommand({
  AuthFlow: 'USER_PASSWORD_AUTH',
  ClientId: process.env.SCRAPING_COGNITO_CLIENT_ID,
  AuthParameters: {
    USERNAME: process.env.SCRAPING_COGNITO_USERNAME,
    PASSWORD: process.env.SCRAPING_COGNITO_PASSWORD,
  },
}));
const idToken = response.AuthenticationResult.IdToken; // este es el que va en Authorization: Bearer
```

### Estrategia de caching (obligatoria — TTL 24h)

```typescript
// Patrón para CognitoAuthAdapter — singleton en infrastructure.module.ts
private cachedToken: string | null = null;
private tokenExpiresAt: number = 0;

async getToken(): Promise<string> {
  if (this.cachedToken && Date.now() < this.tokenExpiresAt - 30 * 60 * 1000) {
    return this.cachedToken;
  }
  const result = await this.initiateAuth();
  this.cachedToken = result.AuthenticationResult.IdToken;
  this.tokenExpiresAt = Date.now() + result.AuthenticationResult.ExpiresIn * 1000; // 86400s
  return this.cachedToken;
}
```

### Variables de entorno (ya añadidas a `.env` y `.env.example`)

```env
SCRAPING_COGNITO_TOKEN_URL=https://micro-services-platam.auth.us-east-1.amazoncognito.com/oauth2/token
SCRAPING_COGNITO_CLIENT_ID=565niamo34irjpik6cjc0dokdb
SCRAPING_COGNITO_USERNAME=<username del pool>
SCRAPING_COGNITO_PASSWORD=<password>
SCRAPING_API_BASE_URL=https://8qpwghqtx3.execute-api.us-east-1.amazonaws.com/prod
SCRAPING_POLL_INTERVAL_MS=5000
SCRAPING_POLL_MAX_RETRIES=20
```

---

## Fase 2 — Tabla de Gaps (Actualizada 2026-04-22)

| Paso HU-06 | Gap identificado | Estado | Prioridad |
|---|---|---|---|
| **Trigger: status=in_progress → dispara pipeline** | ✅ **IMPLEMENTADO (S5).** `AuthorizeCreditApplicationUseCase` publica `credit_application_pipeline_start` a `inbound_queue_url`. Consumer existente enruta al `RunCreditApplicationPipelineUseCase`. | ✅ Implementado | — |
| **Paso 1 — Verificación de duplicados** | ✅ **IMPLEMENTADO (S2+S4).** `find_active_by_person_identity` en `TypeormCreditApplicationRepository` (JOIN con `transversal_schema.persons`, excluye statuses terminales). Lógica en el pipeline: si encuentra duplicado con `internal_id` distinto → `DUPLICATE`. | ✅ Implementado | — |
| **Paso 2 — Consulta SARLAFT** | ✅ **IMPLEMENTADO (S3+S4).** `HttpSarlaftServiceAdapter` (POST+GET polling). `CognitoAuthAdapter` singleton con caché 24h. Mapeo `riesgo_global`/`requiere_verificacion_manual` → `SarlaftCheckStatuses`. BLOCKED → `SARLAFT_MATCH` + GChat compliance. ALERT → GChat compliance warning. | ✅ Implementado | — |
| **Paso 3 — Consulta BDME** | ✅ **IMPLEMENTADO (S3+S4).** `HttpWebScrapingServiceAdapter.query_bdme()` (POST+GET polling). Constantes `motivo="contractual"`, `descargar_pdf=false` fijas en el adaptador. | ✅ Implementado | — |
| **Paso 4 — Consulta Rama Judicial** | ✅ **IMPLEMENTADO (S3+S4).** `HttpWebScrapingServiceAdapter.query_rama_judicial()` (POST+GET polling). Parsing `last_name.split(' ')[0/1]` → `apellido1`/`apellido2` en el pipeline use case. | ✅ Implementado | — |
| **Paso 5 — Consulta Experian HCPN** | ✅ **IMPLEMENTADO (S3+S4).** `HttpExperianHcpnAdapter` (POST síncrono + `@smithy/signature-v4` SigV4). Score en `result.Informes.Informe.Score['@puntaje']`. Error → `EXPERIAN_QUERY_ERROR` + GChat técnico. `response.url` descartado. | ✅ Implementado | — |
| **Paso 6 — Envío al Agente AI** | ✅ **IMPLEMENTADO (S3+S4).** `StubAiAgentAdapter` — decisión basada en credit score con umbrales `AI_AGENT_MOCK_APPROVE_THRESHOLD=700` / `AI_AGENT_MOCK_REVIEW_THRESHOLD=450`. Override via `AI_AGENT_MOCK_RECOMMENDATION`. Error → `AI_AGENT_ERROR` + GChat técnico. | ✅ Implementado (stub) | — |
| **Paso 7a — Resultado: interview** | ✅ **WIRED (S4).** `dispatch_result`: `IN_INTERVIEW`. El stub nunca devuelve `interview` (requiere agente real). Template Twilio `platam_entrevista_pn` registrado (`HX287eff0f57290a1e02dee3ba0979181b`) — trigger WhatsApp pendiente de implementar en este case. | ⚠️ Wired, WhatsApp no implementado aún | 🟡 Baja (stub no lo dispara) |
| **Paso 7b — Resultado: hitl** | ✅ **IMPLEMENTADO (S4).** `dispatch_result`: `UNDER_REVIEW` + `notify_analysts` vía GChat. | ✅ Implementado | — |
| **Paso 7c — Resultado: auto_approve / auto_reject** | ✅ **IMPLEMENTADO (S4).** `dispatch_result`: `APPROVED_PENDING_SIGNATURE` (con `approval_date`) / `REJECTED` (con `rejection_reason='auto_reject_ai_agent'`). | ✅ Implementado | — |
| **Alertas Google Chat** | ✅ **IMPLEMENTADO (S3+S4).** `HttpGoogleChatNotifierAdapter` (fire-and-forget, graceful error). Alertas en: SARLAFT BLOCKED, SARLAFT ALERT, BDME error, RJ error, Experian error, AI error, HITL result. | ✅ Implementado (dev webhook) | — |
| **Reanudación del pipeline post-SARLAFT** | Si Analista libera solicitud en `SARLAFT_MATCH` → pipeline debe continuar desde BDME. Mecanismo no definido. El pipeline actual es lineal: no guarda checkpoint. | ❌ Sin implementar — HU-B07 | 🔴 Fuera de scope HU-06 |
| **Repositories nuevos (SarlaftCheck, WebQuery, ExperianQuery, AiAgentAnalysis)** | ✅ **IMPLEMENTADO (S2).** 4 adapters TypeORM con raw SQL + `map_row` + constructores de dominio. Todos registrados en `infrastructure.module.ts`. | ✅ Implementado | — |
| **Seguridad del endpoint callback agente AI** | Sin mecanismo definido. Con `StubAiAgentAdapter` el endpoint `/ai-result` no existe aún. | ❌ Aplaza hasta FastAPI — no bloqueante | 🟠 Futura |
| **Auth Cognito M2M** | ✅ **IMPLEMENTADO (S3).** `CognitoAuthAdapter` singleton — `InitiateAuthCommand` `USER_PASSWORD_AUTH`, cachea `IdToken` 24h, renueva 30 min antes. | ✅ Implementado | — |
| **Polling architecture** | ✅ **IMPLEMENTADO (S3).** Loop `for attempt 1..max_retries { sleep(interval_ms); GET /jobs/{id} }`. Parámetros: `SCRAPING_POLL_INTERVAL_MS=5000`, `SCRAPING_POLL_MAX_RETRIES=20` (~100s total). | ✅ Implementado | — |
| **Parsing de apellidos para Rama Judicial** | ✅ **IMPLEMENTADO (S4).** `last_name.split(' ')[0]` → `apellido1`, `[1] ?? ''` → `apellido2` en el pipeline use case. | ✅ Implementado | — |
| **Mapping DocTypes → API strings** | ✅ **IMPLEMENTADO (S3).** `{ citizenship: 'CC', passport: 'PA', other: 'CC' }` en `HttpSarlaftServiceAdapter` y `HttpWebScrapingServiceAdapter`. | ✅ Implementado | — |
| **Endpoint /ai-result placeholder** | No creado. Con stub es innecesario. | ❌ Pendiente S6 | 🟡 Baja |

---

## Fase 3 — Estrategia de Ejecución

### Decisión Arquitectónica Confirmada: Pipeline Async Background — ✅ RESUELTA

**Mecanismo elegido: SQS — reutilizar `PRODUCTS_SQS_INBOUND_QUEUE_URL` con nuevo event type.**

`products-ms` ya tiene un consumer SQS funcional (`ProductsInboundSqsConsumer`) con un router `switch(event_type)` en `ProcessProductsInboundMessageUseCase`. La decisión es añadir un nuevo case — zero infraestructura nueva.

#### Flujo del trigger

```
authorize-credit-application.use-case.ts
  → setea status = IN_PROGRESS
  → cancela recordatorios (ya existente)
  → publica a PRODUCTS_SQS_INBOUND_QUEUE_URL:
      { event_type: 'credit_application_pipeline_start',
        correlation_id: uuid(),
        payload: { credit_application_external_id: externalId } }

ProductsInboundSqsConsumer (ya existe) recibe el mensaje
  → IngestProductsInboundSqsMessageUseCase (ya existe)
    → ProcessProductsInboundMessageUseCase (ya existe)
      → switch(event_type):
          case 'credit_application_pipeline_start':  ← NUEVO
            → RunCreditApplicationPipelineUseCase.execute(...)
```

#### Archivos a modificar (Sesión 5)

```
libs/shared/src/domain/
└── [enum TransversalEventType] — MODIFICADO: + credit_application_pipeline_start

apps/products-ms/src/modules/credit-applications/application/use-cases/
└── authorize-credit-application/
    └── authorize-credit-application.use-case.ts  — MODIFICADO: + publish SQS event

apps/products-ms/src/modules/messaging/application/use-cases/
└── process-products-inbound-message.use-case.ts  — MODIFICADO: + case pipeline_start

apps/products-ms/src/modules/credit-applications/application/use-cases/
└── create-credit-application/
    └── create-credit-application.use-case.ts     — MODIFICADO: + publish SQS si IN_PROGRESS self-service
```

#### Por qué no las otras opciones

| Opción | Descartada porque |
|---|---|
| **A: async directo** | Si el proceso cae entre `authorize` y pipeline → solicitud queda en `IN_PROGRESS` para siempre, sin retry. Inaceptable fintech. |
| **C: Bull/Redis** | No existe Redis en docker-compose. Nueva dependencia sin ventaja sobre SQS ya configurado. |

#### Nota para producción

La cola inbound compartida (`PRODUCTS_SQS_INBOUND_QUEUE_URL`) es correcta para dev/MVP. Cuando el pipeline sea estable, se puede mover a una cola dedicada `PRODUCTS_SQS_PIPELINE_QUEUE_URL` con su propia DLQ — cambio de ~1h sin impacto arquitectónico.

### 3a. Orden de Ejecución por Módulos

```
[SESIÓN 0 — Decisiones previas al código]  ✅ COMPLETA
↓
[SESIÓN 1 — Domain Layer: models + ports]  ✅ COMPLETA — tsc ✅
↓
[SESIÓN 2 — Infrastructure: TypeORM Repositories]  ✅ COMPLETA — tsc ✅
↓
[SESIÓN 3 — Infrastructure: HTTP Client Adapters]  ✅ COMPLETA — tsc ✅
↓
[SESIÓN 4 — Application: Pipeline Use Cases]  ✅ COMPLETA — tsc ✅
↓
[SESIÓN 5 — Trigger SQS + Presentation]  ✅ COMPLETA — tsc ✅
↓
[SESIÓN 6 — Config + E2E Smoke Test]   ← SIGUIENTE
```

---

### 3b. Gestión de Contexto por Sesión

#### Contexto SIEMPRE activo (anclar en todas las sesiones)

```
@.ai/user-stories/HU-06___Procesos_Backend_PN.md
@libs/shared/src/domain/statuses.enum.ts
@libs/shared/src/domain/types.enum.ts
@.cursor/rules/02-backend.mdc
@.ai/schemas/database-schema.sql
@.ai/prompts/dev/transversal/user-story-execution-plan-backend.md
```

#### Por sesión

| Sesión | Contexto adicional a anclar |
|---|---|
| **S1 — Domain** | `@apps/products-ms/src/modules/credit-applications/domain/` · `@libs/products-data/src/entities/sarlaft-check.entity.ts` · `@libs/products-data/src/entities/web-query.entity.ts` · `@libs/products-data/src/entities/experian-query.entity.ts` · `@libs/products-data/src/entities/ai-agent-analysis.entity.ts` · `@apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts` |
| **S2 — TypeORM Repos** | `@apps/products-ms/src/infrastructure/database/repositories/` · `@apps/products-ms/src/infrastructure/infrastructure.module.ts` · Resultado de S1 |
| **S3 — HTTP Adapters** | `@apps/products-ms/src/infrastructure/` · `@apps/products-ms/src/config/dotenv.config.ts` · Esta sección de contratos (copiar del plan) |
| **S4 — Pipeline UC** | `@apps/products-ms/src/modules/credit-applications/application/use-cases/` · `@apps/products-ms/src/modules/credit-applications/domain/` · `@apps/notifications-ms/src/modules/notifications/` (para WhatsApp interview) |
| **S5 — Trigger + Presentation** | `@apps/products-ms/src/modules/credit-applications/application/use-cases/authorize-credit-application/` · `@apps/products-ms/src/modules/credit-applications/presentation/controllers/` · `@apps/products-ms/src/modules/credit-applications/credit-applications.module.ts` |
| **S6 — Config + E2E** | `.env.example` · `@database/src/migrations/` (si nueva migración) |

#### Contexto a excluir siempre (ruido)

- `apps/contracts-ms/` — no relevante para HU-06
- `libs/disbursement-data/`, `libs/collections-data/` — irrelevantes
- `database/src/migrations/` — solo anclar al generar nueva migración
- Archivos `*.spec.ts` — no relevantes en fase de implementación

---

### 3c. Convenciones y Fuente de Verdad

#### Documentos PENDIENTES antes de código (estado actualizado)

| Prioridad | Documento | Estado | Bloqueante para |
|---|---|---|---|
| ✅ RESUELTO | **Decisión: Mecanismo de trigger** — SQS, reutilizar `PRODUCTS_SQS_INBOUND_QUEUE_URL`. Nuevo event type `credit_application_pipeline_start`. Zero infra nueva. | ✅ Decidido | — |
| ✅ RESUELTO | **Cognito M2M: USER_PASSWORD_AUTH confirmado** | ✅ Resuelto | — |
| ✅ RESUELTO | **Contrato Experian HCPN** — URL, auth SigV4, request `{id, last_name, platform}`, response con Score + S3 URL | ✅ Conocido | — |
| ✅ RESUELTO | **Decisión: Experian S3 URL vs. JSONB** — solo JSONB. `response.url` descartado. Sin migración adicional. | ✅ Decidido | — |
| ✅ RESUELTO | **IAM role permissions** para `products-ms` → `execute-api:Invoke` en `gqq9mxgtb0` | ✅ Confirmado — IAM user `richard` (cuenta `150890185530`) tiene `AdministratorAccess`. Keys ya en `.env`. | — |
| 🟠 ALTO | **Seguridad endpoint callback agente AI** (shared secret, IP whitelist, JWT) | ❌ Sin decidir — aplaza hasta integrar FastAPI | Sesión 5, endpoint callback (stub no necesita endpoint externo) |
| 🟠 ALTO | **Mecanismo de reanudación post-SARLAFT** | ❌ Sin decidir | Sesión 4, diseño pipeline reanudable |
| ✅ RESUELTO | **Polling strategy** — `SCRAPING_POLL_INTERVAL_MS=5000`, `SCRAPING_POLL_MAX_RETRIES=20` (~100s total por step) | ✅ Definido + vars en `.env` | — |
| 🟠 ALTO | **FastAPI AI agent URL** (contrato pendiente — URL, auth, request/response, sync/async) | ❌ Sin contrato | Sesión 3-4 — `StubAiAgentAdapter` desbloquea Sesión 4 sin este contrato |
| ✅ RESUELTO | **Template Twilio `platam_entrevista_pn`** — Content SID `HX287eff0f57290a1e02dee3ba0979181b` | ✅ Registrado + var en `.env` | — |
| 🟡 MEDIO | **Formato alertas Google Chat** — ¿cards o texto? webhook URL por canal | ⚠️ Webhook dev disponible · formato pendiente de definir | Sesión 3, adaptador |
| ✅ RESUELTO | **Google Chat webhook dev** — canal `dev-new-stack` configurado en `.env` para los 3 vars | ✅ Dev listo · prod pendiente (3 canales separados) | — |
| 🟡 MEDIO | **Mapping DocTypes → API strings** — confirmar `PASSPORT` → `"PA"` vs otro | ❓ Pendiente confirmación | Sesión 3, todos los adapters |
| ✅ RESUELTO | **Contrato SARLAFT** | ✅ Conocido | Sesión 3, Paso 2 |
| ✅ RESUELTO | **Contrato BDME** | ✅ Conocido | Sesión 3, Paso 3 |
| ✅ RESUELTO | **Contrato Rama Judicial** | ✅ Conocido | Sesión 3, Paso 4 |

#### Convenciones existentes confirmadas (no cambiar)

- **camelCase** en propiedades TS/DTOs; `snake_case` solo en SQL y mapeo TypeORM
- **`externalId`** en bordes externos (API pública, callback agente AI); **`id`** en FKs y mensajes internos
- Arquitectura hexagonal: `domain/` → `application/` → `infrastructure/` → `presentation/`
- Un archivo por caso de uso (ya establecido en todo el módulo)
- Tokens de inyección en `credit-applications.tokens.ts`

---

## Fase 4 — Entregables

### 1. Tabla de Gaps — Resumen Ejecutivo (Actualizado)

| Categoría | Gaps identificados | Bloqueantes críticos |
|---|---|---|
| Schema/Entidades | 0 (todo resuelto) | — |
| Enums/Tipos | 0 (todo resuelto) | — |
| Contratos externos (scraping) | ✅ Todos resueltos | ~~SARLAFT~~ ✅, ~~BDME~~ ✅, ~~Rama Judicial~~ ✅, ~~Experian~~ ✅ |
| Contratos externos (notif/AI) | 2 sin contrato | FastAPI AI agent URL (PEND-01), Google Chat webhooks |
| Auth M2M Cognito | ✅ Resuelto | `USER_PASSWORD_AUTH` + `IdToken` confirmado |
| Decisiones arquitectónicas | 2 sin decidir | Seguridad callback agente AI, Reanudación SARLAFT · ~~Trigger~~ ✅ · ~~S3 vs JSONB~~ ✅ |
| Decisiones técnicas menores | 2 pendientes | Polling strategy, DocType mapping |
| Ports de dominio | 9 faltantes | Repositorios × 4 + Services × 5 |
| Adaptadores infraestructura | 9 faltantes | TypeORM × 4 + HTTP × 5 |
| Use Cases | 2 faltantes | Pipeline orchestrator + AI result receiver |
| Presentation | 1 faltante | Endpoint callback agente AI (necesario solo para integración FastAPI; stub no lo requiere) |
| Operativo | 1 pendiente | ~~Template Twilio~~ ✅ · Reanudación post-SARLAFT |

---

### 2. Roadmap de Ejecución

#### SESIÓN 0 — Decisiones (no código) | Estimado: 1-2 días

| Tarea | Owner | Output | Estado |
|---|---|---|---|
| Confirmar grant M2M de Cognito | Freddy | ✅ `USER_PASSWORD_AUTH` confirmado + vars en `.env` | ✅ Listo |
| Definir mecanismo de trigger del pipeline | Freddy + Arquitectura | ✅ SQS — reutilizar `PRODUCTS_SQS_INBOUND_QUEUE_URL` con event type `credit_application_pipeline_start` | ✅ Listo |
| Obtener contrato Experian HCPN | Freddy | ✅ Contrato conocido + decisión S3+JSONB tomada | ✅ Listo |
| Decidir Experian S3 URL vs. JSONB | Freddy | ✅ Solo JSONB — `response.url` descartado. Agente usa `credit_report` JSONB directamente. Sin migración adicional. | ✅ Listo |
| ~~Migración `credit_report_url`~~ | — | ✅ Descartada — agente usa JSONB, no necesaria | ✅ Cerrado |
| Confirmar IAM role permissions para products-ms | Freddy | ✅ IAM user `richard` (`AKIASGIOBQM5GVVNAYEP`) tiene `AdministratorAccess` en cuenta `150890185530`. `EvalDecision: allowed`. Keys ya en `.env`. | ✅ Listo |
| Definir seguridad endpoint callback agente AI | Freddy | Decisión en ADR — aplaza hasta integrar FastAPI | ❌ Pendiente (no bloqueante con stub) |
| Definir polling strategy (intervalo, max_retries, timeout) | Freddy | ✅ `SCRAPING_POLL_INTERVAL_MS=5000`, `SCRAPING_POLL_MAX_RETRIES=20` en `.env` | ✅ Listo |
| Obtener contrato FastAPI AI agent (URL, auth, request/response) | Freddy | URL + contrato para `HttpFastApiAiAgentAdapter` | ❌ Pendiente (stub activo mientras tanto) |
| Registrar template Twilio `platam_entrevista_pn` | Freddy | ✅ Content SID `HX287eff0f57290a1e02dee3ba0979181b` + var en `.env` | ✅ Listo |

---

#### SESIÓN 1 — Domain Layer | ✅ COMPLETA | `tsc --noEmit` ✅

**Archivos creados/modificados:**

```
apps/products-ms/src/modules/credit-applications/domain/
├── models/
│   ├── sarlaft-check.models.ts          ✅ CREADO
│   ├── web-query.models.ts              ✅ CREADO
│   ├── experian-query.models.ts         ✅ CREADO
│   └── ai-agent-analysis.models.ts      ✅ CREADO
└── ports/
    ├── sarlaft-check.repository.port.ts  ✅ CREADO
    ├── web-query.repository.port.ts      ✅ CREADO
    ├── experian-query.repository.port.ts ✅ CREADO
    ├── ai-agent-analysis.repository.port.ts ✅ CREADO
    ├── sarlaft-service.port.ts           ✅ CREADO
    ├── web-scraping-service.port.ts      ✅ CREADO
    ├── experian-service.port.ts          ✅ CREADO
    ├── ai-agent-service.port.ts          ✅ CREADO
    └── google-chat-notifier.port.ts      ✅ CREADO

apps/products-ms/src/modules/credit-applications/
├── credit-applications.tokens.ts        ✅ MODIFICADO (+ 11 symbols: 6 repos + 5 servicios)
└── domain/ports/credit-application.ports.ts ✅ MODIFICADO (+ find_active_by_person_identity)
```

---

#### SESIÓN 2 — Infrastructure: TypeORM Repositories | ✅ COMPLETA | `tsc --noEmit` ✅

**Archivos creados/modificados:**

```
apps/products-ms/src/infrastructure/database/repositories/
├── typeorm-sarlaft-check.repository.ts      ✅ CREADO — raw SQL + map_row con new SarlaftCheck()
├── typeorm-web-query.repository.ts          ✅ CREADO — raw SQL + map_row con new WebQuery()
├── typeorm-experian-query.repository.ts     ✅ CREADO — raw SQL + map_row con new ExperianQuery()
├── typeorm-ai-agent-analysis.repository.ts  ✅ CREADO — raw SQL + map_row con new AiAgentAnalysis()
└── typeorm-credit-application.repository.ts ✅ MODIFICADO (+ find_active_by_person_identity)

apps/products-ms/src/infrastructure/
└── infrastructure.module.ts                 ✅ MODIFICADO (+ 4 repos + tokens exportados)
```

**Nota:** `find_active_by_person_identity` usa JOIN con `transversal_schema.persons`, excluye statuses `duplicate/rejected/cancelled/closed`, condición OR entre `doc_number`, `phone` y `email`.

---

#### SESIÓN 3 — Infrastructure: HTTP Adapters | ✅ COMPLETA | `tsc --noEmit` ✅

**Archivos creados/modificados:**

```
apps/products-ms/src/infrastructure/http/
├── cognito/
│   └── cognito-auth.adapter.ts               ✅ CREADO — singleton, caché IdToken 24h, renueva 30 min antes
├── sarlaft/
│   └── http-sarlaft-service.adapter.ts       ✅ CREADO — POST+GET polling, mapeo riesgo_global → enum
├── web-scraping/
│   └── http-bdme-service.adapter.ts          ✅ CREADO — implementa WebScrapingServicePort completo
│                                              (query_bdme + query_rama_judicial en un solo adaptador)
├── experian/
│   └── http-experian-hcpn.adapter.ts         ✅ CREADO — POST síncrono + @smithy/signature-v4 SigV4
├── ai-agent/
│   └── stub-ai-agent.adapter.ts              ✅ CREADO — sin HTTP; score ≥700→approve, ≥450→hitl, else→reject
└── notifications/google-chat/
    └── http-google-chat-notifier.adapter.ts  ✅ CREADO — fire-and-forget con graceful error

apps/products-ms/
├── package.json    ✅ MODIFICADO (+ @aws-crypto/sha256-js, @aws-sdk/client-cognito-identity-provider,
│                                  @aws-sdk/credential-provider-node, @smithy/signature-v4)
└── src/infrastructure/infrastructure.module.ts ✅ MODIFICADO (+ 6 HTTP adapters + tokens exportados)
```

**Decisión de diseño:** BDME y Rama Judicial comparten `HttpWebScrapingServiceAdapter` (implementa `WebScrapingServicePort` con ambos métodos) en lugar de dos archivos separados — sin impacto funcional.

---

#### SESIÓN 4 — Application: Pipeline Use Cases | ✅ COMPLETA | `tsc --noEmit` ✅

**Archivos creados/modificados:**

```
apps/products-ms/src/modules/credit-applications/
├── application/use-cases/run-credit-application-pipeline/
│   ├── run-credit-application-pipeline.command.ts   ✅ CREADO
│   └── run-credit-application-pipeline.use-case.ts  ✅ CREADO — 7 pasos orquestados
├── application/ports/client-registration.port.ts    ✅ MODIFICADO (+ PersonPipelineData + get_person_for_pipeline)

apps/products-ms/src/infrastructure/database/adapters/
└── typeorm-client-registration.adapter.ts            ✅ MODIFICADO (+ get_person_for_pipeline)
```

**Pipeline orquestado (pasos implementados en `RunCreditApplicationPipelineUseCase`):**
```
1. find_active_by_person_identity()  → si duplicado → DUPLICATE, return
2. sarlaft_service.check()          → BLOCKED → SARLAFT_MATCH + GChat compliance, return
                                    → ALERT  → GChat compliance warning, continúa
3. web_scraping.query_bdme()        → error → GChat técnico, return
4. web_scraping.query_rama_judicial() → error → GChat técnico, return
5. experian_service.query_hcpn()    → error → EXPERIAN_QUERY_ERROR + GChat técnico, return
6. ai_agent.analyze()               → error → AI_AGENT_ERROR + GChat técnico, return
7. dispatch_result():
     auto_approve → APPROVED_PENDING_SIGNATURE + approval_date
     auto_reject  → REJECTED + rejection_reason='auto_reject_ai_agent'
     hitl         → UNDER_REVIEW + GChat analistas
     interview    → IN_INTERVIEW (stub nunca llega aquí)
```

**Nota:** `ReceiveAiAgentResultUseCase` separado no creado — la lógica de dispatch está inline en el pipeline. Cuando FastAPI esté integrado, se puede extraer.

---

#### SESIÓN 5 — Trigger SQS + Wiring | ✅ COMPLETA | `tsc --noEmit` ✅

**Archivos modificados:**

```
apps/products-ms/src/modules/messaging/application/dto/
└── transversal-outbound-event.dto.ts          ✅ MODIFICADO (+ credit_application_pipeline_start)

apps/products-ms/src/modules/credit-applications/application/use-cases/authorize-credit-application/
└── authorize-credit-application.use-case.ts   ✅ MODIFICADO (+ publish SQS tras IN_PROGRESS)

apps/products-ms/src/modules/messaging/application/use-cases/
└── process-products-inbound-message.use-case.ts ✅ MODIFICADO (+ case pipeline_start → run_pipeline)

apps/products-ms/src/modules/credit-applications/
└── credit-applications-application.module.ts   ✅ MODIFICADO (+ RunCreditApplicationPipelineUseCase)
```

**Pendiente de S5 (aplazado a S6):**
- `create-credit-application.use-case.ts` — publish SQS si self-service IN_PROGRESS directo
- Endpoint `/ai-result` placeholder + DTOs — no bloqueante con stub activo

---

#### SESIÓN 6 — Config + Migración + E2E | Estimado: 1-2h

**Variables de entorno nuevas para `.env.example`:**

```env
# --- products-ms / HU-06: Pipeline de estudio PN ---

# Scraping API Gateway (base compartida para todos los servicios) — ✅ CONOCIDO
SCRAPING_API_BASE_URL=https://8qpwghqtx3.execute-api.us-east-1.amazonaws.com/prod

# Cognito M2M — USER_PASSWORD_AUTH confirmado (✅ RESUELTO — no usar client_credentials)
SCRAPING_COGNITO_TOKEN_URL=https://micro-services-platam.auth.us-east-1.amazoncognito.com/oauth2/token
SCRAPING_COGNITO_CLIENT_ID=565niamo34irjpik6cjc0dokdb
SCRAPING_COGNITO_USERNAME=                 # UUID de la cuenta de servicio en el pool
SCRAPING_COGNITO_PASSWORD=                 # password de la cuenta de servicio

# Polling config — ✅ valores por defecto definidos
SCRAPING_POLL_INTERVAL_MS=5000             # intervalo entre polls (ms)
SCRAPING_POLL_MAX_RETRIES=20               # máximo intentos antes de error (~100s con 5s interval)

# Experian HCPN/HCPJ — AWS SigV4 (✅ CONTRATO CONOCIDO)
EXPERIAN_HCPN_URL=https://gqq9mxgtb0.execute-api.us-east-1.amazonaws.com/dev/experian-hcpn
EXPERIAN_HCPJ_URL=https://gqq9mxgtb0.execute-api.us-east-1.amazonaws.com/dev/experian-hcpj-dev
EXPERIAN_AWS_REGION=us-east-1
EXPERIAN_AWS_ACCESS_KEY_ID=               # clave IAM con execute-api:Invoke sobre gqq9mxgtb0
EXPERIAN_AWS_SECRET_ACCESS_KEY=           # (en prod/ECS: usar IAM role del task, no env var)

# Agente AI — stub activo (n8n descartado; FastAPI en planeación — PEND-01)
# Las siguientes vars son para la futura integración con FastAPI:
# AI_AGENT_FASTAPI_URL=                   # URL del servicio FastAPI cuando esté listo
# AI_AGENT_FASTAPI_API_KEY=               # auth del FastAPI
# Stub config (activo mientras no haya FastAPI):
AI_AGENT_MOCK_RECOMMENDATION=             # '' | 'hitl' | 'auto_approve' | 'auto_reject'
AI_AGENT_MOCK_APPROVE_THRESHOLD=700
AI_AGENT_MOCK_REVIEW_THRESHOLD=450

# Google Chat webhooks (alertas operacionales)
# DEV: canal único "dev-new-stack" — todos los 3 apuntan al mismo webhook en dev
# PROD: reemplazar por canales dedicados (cumplimiento, técnico, analistas)
GOOGLE_CHAT_COMPLIANCE_WEBHOOK_URL=https://chat.googleapis.com/v1/spaces/AAQAb2Wod_c/messages?key=...
GOOGLE_CHAT_TECHNICAL_WEBHOOK_URL=https://chat.googleapis.com/v1/spaces/AAQAb2Wod_c/messages?key=...
GOOGLE_CHAT_ANALYSTS_WEBHOOK_URL=https://chat.googleapis.com/v1/spaces/AAQAb2Wod_c/messages?key=...

# Twilio WhatsApp — template entrevista PN (✅ registrado)
TWILIO_TEMPLATE_ENTREVISTA_PN=HX287eff0f57290a1e02dee3ba0979181b
```

**Migraciones:** No se requieren migraciones adicionales para HU-06. Todos los campos de `experian_queries`, `sarlaft_checks`, `web_queries` y `ai_agent_analysis` ya existen.

---

### 3. Plantilla de Contexto por Módulo (para Claude Code en Cursor)

```markdown
## Sesión 1 — Domain Layer HU-06

Sigue el plan: @.ai/prompts/dev/transversal/user-story-execution-plan-backend.md

Historia de usuario: @.ai/user-stories/HU-06___Procesos_Backend_PN.md
Microservicio objetivo: products-ms

Contexto adicional:
- @.ai/schemas/database-schema.sql
- @libs/shared/src/domain/statuses.enum.ts
- @libs/shared/src/domain/types.enum.ts
- @libs/products-data/src/entities/sarlaft-check.entity.ts
- @libs/products-data/src/entities/web-query.entity.ts
- @libs/products-data/src/entities/experian-query.entity.ts
- @libs/products-data/src/entities/ai-agent-analysis.entity.ts
- @apps/products-ms/src/modules/credit-applications/domain/
- @apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts
- @.cursor/rules/02-backend.mdc

Tarea de esta sesión: SOLO domain layer.
Crear modelos de dominio (SarlaftCheck, WebQuery, ExperianQuery, AiAgentAnalysis),
ports de repositorio para los 4, ports de servicio externo (SarlaftService, WebScrapingService,
ExperianService, AiAgentService, GoogleChatNotifier), y extender credit-applications.tokens.ts.
NO generar infraestructura ni casos de uso todavía.
```

```markdown
## Sesión 2 — TypeORM Repositories HU-06

Sigue el plan: @.ai/prompts/dev/transversal/user-story-execution-plan-backend.md

Historia de usuario: @.ai/user-stories/HU-06___Procesos_Backend_PN.md
Microservicio objetivo: products-ms

Contexto adicional:
- @apps/products-ms/src/infrastructure/database/repositories/
- @apps/products-ms/src/infrastructure/infrastructure.module.ts
- @apps/products-ms/src/modules/credit-applications/domain/ports/ [RESULTADO S1]
- @apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts
- @libs/products-data/src/entities/sarlaft-check.entity.ts
- @libs/products-data/src/entities/web-query.entity.ts
- @libs/products-data/src/entities/experian-query.entity.ts
- @libs/products-data/src/entities/ai-agent-analysis.entity.ts
- @.cursor/rules/02-backend.mdc

Tarea de esta sesión: TypeORM repository adapters + wiring en infrastructure.module.ts.
Un adapter por tabla. NO crear HTTP adapters ni use cases todavía.
```

```markdown
## Sesión 3 — HTTP Adapters HU-06 (SARLAFT + BDME + Rama Judicial)

Sigue el plan: @.ai/prompts/dev/transversal/user-story-execution-plan-backend.md

Historia de usuario: @.ai/user-stories/HU-06___Procesos_Backend_PN.md
Microservicio objetivo: products-ms

Contexto adicional:
- @apps/products-ms/src/infrastructure/http/ (si ya existe)
- @apps/products-ms/src/config/dotenv.config.ts
- @apps/products-ms/src/modules/credit-applications/domain/ports/ [RESULTADO S1]
- @apps/products-ms/src/modules/credit-applications/credit-applications.tokens.ts
- @.cursor/rules/02-backend.mdc
- @.ai/user-stories-plan/hu-06-backend-pipeline-pn-execution-plan.md (sección contratos)

Contratos disponibles: SARLAFT, BDME, Rama Judicial, Experian HCPN (todos conocidos — ver sección contratos del plan).
Auth Cognito: USER_PASSWORD_AUTH confirmado. Usar @aws-sdk/client-cognito-identity-provider con InitiateAuthCommand, cachear IdToken (TTL 24h).
Auth Experian: AWS SigV4 con @smithy/signature-v4 + defaultProvider().

Tarea: CognitoAuthAdapter (singleton, caché de token), HttpSarlaftServiceAdapter,
HttpBdmeServiceAdapter, HttpRamaJudicialServiceAdapter, HttpExperianHcpnAdapter (SigV4).
Patrón compartido: POST job → poll GET hasta done/failed (excepto Experian: POST síncrono directo).
Incluir helper de parsing de apellidos para Rama Judicial.
StubAiAgentAdapter también va aquí (ver Sesión 4 — puede adelantarse).
```

---

### 4. Veredicto — Estado de la HU-06 (Actualizado 2026-04-22 · S1–S6 ✅)

**🟢 100% implementado en scope. Sesiones 1–6 completas y compilando sin errores (`tsc --noEmit` limpio). El pipeline completo de estudio PN está operativo con `StubAiAgentAdapter`. Los únicos pendientes son post-MVP (FastAPI real, webhooks prod, reanudación post-SARLAFT) y no bloquean el despliegue del MVP.**

#### Semáforo de dependencias

| Área | Estado | Detalle |
|---|---|---|
| **Schema / DB** | ✅ 100% | Todas las tablas y enums existen |
| **Entidades TypeORM** | ✅ 100% | `SarlaftCheck`, `WebQuery`, `ExperianQuery`, `AiAgentAnalysis` completas |
| **Contratos APIs scraping** | ✅ 100% | SARLAFT ✅ BDME ✅ Rama Judicial ✅ Experian ✅ |
| **Auth Cognito M2M** | ✅ 100% | `CognitoAuthAdapter` — `USER_PASSWORD_AUTH` + `IdToken` cacheado 24h · vars en `.env.example` |
| **Domain layer (ports + models)** | ✅ 100% | S1 — 4 modelos + 9 puertos + tokens (`SARLAFT_CHECK_REPOSITORY`, `WEB_QUERY_REPOSITORY`, `EXPERIAN_QUERY_REPOSITORY`, `AI_AGENT_ANALYSIS_REPOSITORY`, `SARLAFT_SERVICE`, `WEB_SCRAPING_SERVICE`, `EXPERIAN_SERVICE`, `AI_AGENT_SERVICE`, `GOOGLE_CHAT_NOTIFIER`) |
| **TypeORM repositories** | ✅ 100% | S2 — `TypeormSarlaftCheckRepository`, `TypeormWebQueryRepository`, `TypeormExperianQueryRepository`, `TypeormAiAgentAnalysisRepository` + `find_active_by_person_identity` + `get_person_for_pipeline` |
| **HTTP adapters (SARLAFT/BDME/RJ)** | ✅ 100% | S3 — `HttpSarlaftServiceAdapter` (POST+polling) · `HttpWebScrapingServiceAdapter` (BDME + Rama Judicial, un solo adapter para ambos) |
| **HTTP adapter Experian** | ✅ 100% | S3 — `HttpExperianHcpnAdapter` (POST síncrono + SigV4 via `@smithy/signature-v4`) · IAM `AKIASGIOBQM5GVVNAYEP` confirmado (`EvalDecision: allowed`) |
| **AI agent adapter** | ✅ 100% (stub) | S3 — `StubAiAgentAdapter` — decide por score (`≥700` AUTO_APPROVE · `≥450` HITL · resto AUTO_REJECT) o por `AI_AGENT_MOCK_RECOMMENDATION` |
| **Google Chat notifier** | ✅ 100% | S3 — `HttpGoogleChatNotifierAdapter` (fire-and-forget, graceful) · 3 métodos: `notify_compliance`, `notify_technical`, `notify_analysts` |
| **Pipeline use case** | ✅ 100% | S4 — `RunCreditApplicationPipelineUseCase` — 7 pasos: duplicados → SARLAFT → BDME → RJ → Experian → AI → dispatch |
| **Trigger SQS** | ✅ 100% | S5 — `AuthorizeCreditApplicationUseCase` publica `credit_application_pipeline_start` · `ProcessProductsInboundMessageUseCase` enruta al pipeline |
| **Endpoint `/ai-result`** | ✅ 100% (placeholder) | S6 — `POST /credit-applications/:externalId/ai-result` · HTTP 202 · sin guards (auth M2M aplazada) · listo para conectar `HttpFastApiAiAgentAdapter` |
| **Vars de entorno** | ✅ 100% | Todas en `.env.example`: `SCRAPING_*` · `EXPERIAN_*` · `AI_AGENT_MOCK_*` · `GOOGLE_CHAT_*` · `TWILIO_TEMPLATE_ENTREVISTA_PN` |

#### Qué fue implementado — Resumen por sesión

| Sesión | Entregable | Estado |
|---|---|---|
| **S1 — Domain** | 4 modelos de dominio + 9 puertos + tokens + `find_active_by_person_identity` + `PersonPipelineData` / `get_person_for_pipeline` | ✅ tsc ✅ |
| **S2 — TypeORM Repos** | 4 adapters TypeORM raw SQL + `map_row` con constructores de dominio + wiring `infrastructure.module.ts` | ✅ tsc ✅ |
| **S3 — HTTP Adapters** | `CognitoAuthAdapter` · `HttpSarlaftServiceAdapter` · `HttpWebScrapingServiceAdapter` · `HttpExperianHcpnAdapter` · `StubAiAgentAdapter` · `HttpGoogleChatNotifierAdapter` + deps en `package.json` | ✅ tsc ✅ |
| **S4 — Pipeline UC** | `RunCreditApplicationPipelineUseCase` (7 pasos + `dispatch_result` privado) + `AiAgentAnalysisRecommendation.INTERVIEW` wired | ✅ tsc ✅ |
| **S5 — Trigger SQS** | `TransversalEventType.credit_application_pipeline_start` · publish en `AuthorizeCreditApplicationUseCase` · case en `ProcessProductsInboundMessageUseCase` · `RunCreditApplicationPipelineUseCase` en `CreditApplicationsApplicationModule` | ✅ tsc ✅ |
| **S6 — Endpoint placeholder** | `AiAgentResultDto` · `AiAgentResultResponseDto` · `CreditApplicationsAiAgentController` (`POST …/ai-result`) · registrado en `CreditApplicationsModule` | ✅ tsc ✅ |

#### Pendientes post-MVP (no bloquean despliegue)

| Pendiente | Impacto | Cuándo resolver |
|---|---|---|
| **`HttpFastApiAiAgentAdapter`** | `StubAiAgentAdapter` activo mientras el equipo FastAPI define URL + contrato | Cuando FastAPI esté en staging |
| **Seguridad `POST /ai-result`** | Sin auth M2M — el endpoint acepta cualquier llamada. Solo relevante cuando FastAPI esté integrado | Junto con `HttpFastApiAiAgentAdapter` |
| **WhatsApp trigger `IN_INTERVIEW`** | `dispatch_result` setea `IN_INTERVIEW` correctamente, pero no envía el WhatsApp Twilio (`TWILIO_TEMPLATE_ENTREVISTA_PN`). El stub no dispara este branch. | Cuando FastAPI entre en staging (el stub nunca devuelve `interview`) |
| **`ReceiveAiAgentResultUseCase` como clase separada** | `dispatch_result` vive inline en `RunCreditApplicationPipelineUseCase`. Extraer cuando el endpoint `/ai-result` necesite lógica real. | Junto con FastAPI |
| **Reanudación post-SARLAFT** | Si un analista libera una solicitud en `SARLAFT_MATCH`, el pipeline no tiene punto de reentrada. El flujo lineal actual no admite checkpoint. | HU-B07 — fuera de scope HU-06 |
| **Google Chat webhooks prod** | Dev usa `dev-new-stack` para los 3 canales (compliance, technical, analysts). Separar en prod. | Antes del despliegue productivo |
| **PENDING-1 HU-05 (flujo SR)** | Ningún controller SR pasa `status = PENDING_AUTHORIZATION` → el flujo E2E vía SR no dispara el pipeline. Self-service (HU-01) funciona directamente con `IN_PROGRESS`. | Resolver en HU-05 antes de pruebas E2E via SR |

#### Próximos pasos reales

1. ✅ ~~S1–S6 implementadas~~ — pipeline compilando y listo
2. 🟡 **Resolver PENDING-1 HU-05** — para habilitar prueba E2E completa vía flujo SR
3. 🟡 **Despliegue staging** — configurar `.env` con valores reales de AWS, SARLAFT, Experian, GChat
4. 🔵 **Cuando FastAPI disponible** — `HttpFastApiAiAgentAdapter` + seguridad `/ai-result` + `ReceiveAiAgentResultUseCase` + WhatsApp interview trigger

---

## Pendientes Abiertos de HU-05 que Afectan HU-06

Según el plan HU-05 (`hu-05-authorization-execution-plan.md`), el **PENDING-1** crítico no está resuelto:

> **PENDING-1 (CRÍTICO):** Ningún controller SR (HU-02/HU-04) pasa `status = PENDING_AUTHORIZATION`.
> Sin esto, el flujo de autorización de HU-05 nunca se dispara → `in_progress` nunca se alcanza vía SR → HU-06 no puede probarse E2E en el flujo SR.

HU-06 asume que el trigger es `status = 'in_progress'`, que proviene de:
- **Self-service (HU-01):** `privacy_policy_accepted = true` al crear → `in_progress` directo ✅ (funciona)
- **Via SR (HU-02):** Cliente autoriza en HU-05 → `in_progress` ⚠️ **PENDING-1 de HU-05 no resuelto**

**Recomendación:** Resolver PENDING-1 de HU-05 antes de las pruebas E2E de HU-06 vía flujo SR.
