# Análisis de Integraciones — Microservicios Externos en `platam_pay_v2`

> **Fecha:** 2026-04-17
> **Scope:** HU-06 (Procesos Backend PN) y HU-07 (Procesos Backend PJ)
> **Tipo de sesión:** Solo lectura / análisis arquitectural
> **Autor del análisis:** Claude Code (arquitecto de integración backend)
> **API_BASE_URL de referencia:** `https://8qpwghqtx3.execute-api.us-east-1.amazonaws.com`

---

## Tabla de contenidos

1. [Contratos de los microservicios (fuente de verdad: guías AWS)](#1-contratos-de-los-microservicios)
2. [Mapa de integraciones actual](#2-mapa-de-integraciones-actual)
3. [Flujo de orquestación](#3-flujo-de-orquestación)
4. [Gaps de implementación](#4-gaps-de-implementación)
5. [Inconsistencias detectadas](#5-inconsistencias-detectadas)
6. [Paso a paso para vincular las integraciones](#6-paso-a-paso-para-vincular-las-integraciones)

---

## 1. Contratos de los microservicios

### Infraestructura compartida

Todos los microservicios de `platam_microservices` comparten **una sola HTTP API** en AWS API Gateway v2:

- **Base URL:** `https://8qpwghqtx3.execute-api.us-east-1.amazonaws.com/{stage}`
- **Autenticación:** JWT Cognito — `Authorization: Bearer <IdToken>` validado en el gateway; las Lambdas y el contenedor RUES **no** reimplementan validación JWT en el código de aplicación.
- **Stage obligatorio:** las peticiones deben incluir el segmento `/{stage}/` antes de `/v1/...` (sin él → 404 genérico de API Gateway).
- **Issuer JWT:** `https://cognito-idp.{region}.amazonaws.com/{pool_id}`
- **Audience JWT:** Client ID del App client de Cognito.
- **Header de trazas:** `x-correlation-id` (UUID, opcional; el backend genera uno si no se envía).
- **Guía operativa JWT:** `platam_microservices/jwt/jwt-api-gateway-config.md`

---

### 1.1 RUES (Registro Único Empresarial y Social)

| Campo | Valor |
|---|---|
| **Runbook** | `platam_microservices/docs/rues-main/aws-deploy-rues.md` |
| **Runtime** | ECS Fargate + Playwright → ALB interno → VPC Link → API Gateway |
| **Tipo de llamada** | Síncrono (alta latencia — Playwright/Chromium) |
| **Uso en pipeline** | HU-07: verificación de empresa en Registro Mercantil (por NIT) |

**Endpoints:**

| Ruta | Método | Descripción |
|---|---|---|
| `/v1/rues/scrape?nit=<NIT>` | GET | Consulta síncrona principal |
| `/v1/health` | GET | Health check para clientes |
| `/api/health` | GET | Alias útil para TG del ALB (health check interno) |

**Request:**
```
GET /v1/rues/scrape?nit=901548471
Authorization: Bearer <IdToken>
x-correlation-id: <uuid> (opcional)
```

**Response exitosa:**
```json
{
  "success": true,
  "data": { /* datos empresa RUES */ },
  "meta": { "service": "rues", "version": "v1" },
  "correlation_id": "uuid"
}
```

**Códigos de error:**
| Código | Causa |
|---|---|
| 401 | JWT vacío, expirado, o AccessToken en lugar de IdToken |
| 404 | Falta `/{stage}/` en la URL (genérico de API Gateway) |
| 504 | VPC Link o ECS inalcanzable; timeout de integración (30 s default) |

**Variables de entorno del contenedor:**
- `PORT` (default 3000)
- `SCRAPE_TIMEOUT_MS` (default 120000)
- `API_STAGE_PREFIX` (si el stage se antepone en la ruta hacia el contenedor)
- `CONCURRENT_SCRAPE_LIMIT`
- `RUES_VERBOSE_LOGS=true` (solo dev)

---

### 1.2 SARLAFT (validación listas restrictivas)

| Campo | Valor |
|---|---|
| **Runbook** | `platam_microservices/docs/sarlaft-main/aws-deploy-sarlaft.md` |
| **Runtime** | Lambda API → DynamoDB + SQS → Lambda Worker → DynamoDB |
| **Tipo de llamada** | Asíncrono: `POST /jobs` → 202 + `job_id` → polling `GET /jobs/{job_id}` |
| **Uso en pipeline** | HU-06 paso 2 (PN); HU-07 paso 2 (rep. legal + todos los accionistas) |

**Endpoints:**

| Ruta | Método | Descripción |
|---|---|---|
| `POST /v1/sarlaft/jobs` | POST | Crear job de validación; responde 202 |
| `GET /v1/sarlaft/jobs/{job_id}` | GET | Consultar estado y resultado |

**Request body (POST):**
```json
{
  "nombres": "Gustavo Francisco Petro Urrego",
  "documento": "208079",
  "tipo_documento": "CC",
  "user_id": "",
  "ip_address": "",
  "force_refresh": true
}
```
*(Fuente de verdad: `platam_microservices/docs/sarlaft-main/sarlaft-main/input/test-case.json`)*

**Response 202 (submit):**
```json
{
  "job_id": "<uuid>",
  "status": "queued"
}
```

**Response GET (poll):**
```json
{
  "job_id": "<uuid>",
  "status": "queued | processing | done | failed",
  "output": { /* resultado validación si status=done */ },
  "output_truncated": false
}
```

**Estados del job en DynamoDB:** `queued` → `processing` → `done` | `failed` (y `unknown` como caso anómalo)

**Variables de entorno de las Lambdas:**

| Variable | Lambda | Descripción |
|---|---|---|
| `SARLAFT_JOBS_TABLE` | API + Worker | Nombre tabla DynamoDB (sin ARN) |
| `SARLAFT_QUEUE_URL` | **Solo API** | URL HTTPS de la cola SQS principal |
| `ENABLE_POLICIA_SCRAPING` | Worker | Activa scraping Policía (opcional) |
| `POLICIA_2CAPTCHA_KEY` | Worker | API key de 2captcha para Policía |

---

### 1.3 BDME (Boletín de Deudores Morosos del Estado)

| Campo | Valor |
|---|---|
| **Runbook** | `platam_microservices/docs/scraper-bdme-main/aws-deploy-bdme.md` |
| **Runtime** | Lambda bdme-api → SQS → ECS Fargate worker (o VPS Colombia) con Playwright + 2captcha |
| **Tipo de llamada** | Asíncrono: `POST /jobs` → 202 + `job_id` → polling `GET /jobs/{job_id}` |
| **Uso en pipeline** | HU-06 paso 3 (PN); HU-07 paso 3 (rep. legal + accionista clave) |
| **Nota operativa** | No puede haber dos consumidores (ECS + VPS) sobre la misma cola simultáneamente |

**Endpoints:**

| Ruta | Método | Descripción |
|---|---|---|
| `POST /v1/bdme/jobs` | POST | Crear job de consulta; responde 202 |
| `GET /v1/bdme/jobs/{job_id}` | GET | Consultar estado y resultado |
| `GET /v1/health` | GET | Health (ruta compartida en la HTTP API) |

**Request body (POST):**
```json
{
  "numero_id": "12345678",
  "tipo": "CC",
  "motivo": "contractual",
  "descargar_pdf": false
}
```
*(Nota: el motivo `autoconsulta` se normaliza internamente a `contractual` en pruebas locales)*

**Response GET (poll):**
```json
{
  "status": "queued | processing | done | failed",
  "output": { /* resultado inline en DynamoDB cuando done */ },
  "output_truncated": false
}
```

**Variables de entorno de Lambda/worker:**

| Variable | Dónde | Descripción |
|---|---|---|
| `BDME_JOBS_TABLE` | Lambda API + Worker | Nombre tabla DynamoDB |
| `BDME_QUEUE_URL` | Lambda API | URL cola SQS |
| `BDME_USE_LOCAL_STORE` | Lambda API | `false` en prod |
| `BDME_DEFAULT_DESCARGAR_PDF` | Lambda API | `false` por defecto |
| `TWOCAPTCHA_API_KEY` | Lambda API + Worker | Clave 2captcha |
| `BDME_USUARIO` | Lambda API + Worker | Usuario portal BDME |
| `BDME_PASSWORD` | Lambda API + Worker | Contraseña portal BDME |
| `BDME_PLAYWRIGHT_PROXY_SERVER` | Worker | Proxy para Playwright (si IP AWS no aceptada por BDME) |

---

### 1.4 Rama Judicial (consulta procesos judiciales)

| Campo | Valor |
|---|---|
| **Runbook** | `platam_microservices/docs/scraper-rama-judicial-main/aws-deploy-rama-judicial.md` |
| **Runtime** | Lambda API + Lambda Worker — scraping HTTP (`requests`) a `consultaprocesos.ramajudicial.gov.co` |
| **Tipo de llamada** | Asíncrono: `POST /jobs` → 202 + `job_id` → polling `GET /jobs/{job_id}` |
| **Uso en pipeline** | HU-06 paso 4 (PN); HU-07 paso 4 (rep. legal + accionista clave) |

**Endpoints:**

| Ruta | Método | Descripción |
|---|---|---|
| `POST /v1/rama-judicial/jobs` | POST | Crear job de consulta; responde 202 |
| `GET /v1/rama-judicial/jobs/{job_id}` | GET | Consultar estado y resultado |
| `GET /v1/health` | GET | Health (ruta compartida) |

**Request body (POST) — Persona Jurídica (documentado):**
```json
{
  "tipo_persona": "juridica",
  "razon_social": "LEZAG COLOMBIA",
  "solo_recientes": true
}
```

**Request body (POST) — Persona Natural (⚠️ ver inconsistencia §5.4):**
```
No documentado explícitamente en las guías de despliegue.
Se asume: { "tipo_persona": "natural", "documento": "...", "tipo_documento": "CC" }
```

**Response 202 (submit):**
```json
{
  "success": true,
  "job_id": "job_01JABCXYZ",
  "status": "queued",
  "created_at": "2026-03-24T10:00:00Z",
  "correlation_id": "4d7cb73f-cf24-4a87-9e44-0e8cb2361cd8"
}
```

**Response GET (poll):**
```json
{
  "status": "queued | processing | done | failed",
  "output": { /* resultado inline */ },
  "output_truncated": false
}
```

**Variables de entorno de las Lambdas:**

| Variable | Descripción |
|---|---|
| `RAMA_JOBS_TABLE` | Nombre tabla DynamoDB |
| `RAMA_QUEUE_URL` | URL cola SQS principal (solo Lambda API) |
| `RAMA_USE_LOCAL_STORE` | `false` en prod |

---

### 1.5 Tabla de rutas estándar (inventario completo HTTP API)

| Servicio | Método | Ruta | Auth |
|---|---|---|---|
| SARLAFT | POST | `/v1/sarlaft/jobs` | JWT |
| SARLAFT | GET | `/v1/sarlaft/jobs/{job_id}` | JWT |
| RUES | GET | `/v1/rues/scrape` | JWT |
| Health (única ruta) | GET | `/v1/health` | JWT |
| Rama Judicial | POST | `/v1/rama-judicial/jobs` | JWT |
| Rama Judicial | GET | `/v1/rama-judicial/jobs/{job_id}` | JWT |
| BDME | POST | `/v1/bdme/jobs` | JWT |
| BDME | GET | `/v1/bdme/jobs/{job_id}` | JWT |

*(Fuente: `platam_microservices/jwt/jwt-api-gateway-config.md` §4)*

---

## 2. Mapa de integraciones actual

### Estado del código en `platam_pay_v2`

| Microservicio | Archivo cliente HTTP | Variables de entorno | DTO request/response | Entidad resultado BD | Estado general |
|---|---|---|---|---|---|
| **RUES** | ❌ No existe | ⚠️ `RUES_API_BASE_URL` en `.env.example` — cargada en `transversal-ms` y `suppliers-ms` (MS equivocado; fallback apunta a servidor externo dev, no a execute-api) | ❌ No existe | ❌ No existe entidad para resultado RUES | ❌ Faltante |
| **SARLAFT** | ❌ No existe | ❌ No hay ninguna variable | ❌ No existe | ✅ `SarlaftCheckEntity` en `libs/products-data/src/entities/sarlaft-check.entity.ts` | ⚠️ Parcial |
| **BDME** | ❌ No existe | ❌ No hay ninguna variable | ❌ No existe | ✅ `WebQueryEntity` con `WebQueryType.BDME` en `libs/products-data/src/entities/web-query.entity.ts` | ⚠️ Parcial |
| **Rama Judicial** | ❌ No existe | ❌ No hay ninguna variable | ❌ No existe | ✅ `WebQueryEntity` con `WebQueryType.RAMA_JUDICIAL` | ⚠️ Parcial |
| **n8n (AI Agent)** | ❌ No existe | ❌ No hay variable (`N8N_WEBHOOK_URL`) | ❌ No existe | ✅ `AiAgentAnalysisEntity` en `libs/products-data/src/entities/ai-agent-analysis.entity.ts` | ⚠️ Parcial |
| **Experian HCPN/HCPJ** | ❌ No existe | ❌ No hay variable | ❌ No existe | ✅ `ExperianQueryEntity` en `libs/products-data/src/entities/experian-query.entity.ts` | ⚠️ Parcial |

### Enums de dominio confirmados en `libs/shared/src/domain/types.enum.ts`

| Enum | Valores | Estado |
|---|---|---|
| `SarlaftCheckStatuses` | `clean`, `alert`, `blocked` | ✅ Correcto |
| `WebQueryType` | `bdme`, `rama_judicial` | ⚠️ Falta `rues` (ver inconsistencia §5.5) |
| `AiAgentAnalysisRecommendation` | `hitl`, `interview`, `auto_approve`, `auto_reject` | ✅ Correcto |
| `ExperianQueryTypes` | `hcpn`, `hcpj` | ✅ Correcto |
| `DocTypes` | `citizenship`, `passport`, `other` | ⚠️ Requiere mapeo hacia formatos de los microservicios |

### Patrón HTTP existente en el monorepo (referencia de implementación)

El proyecto usa **`fetch()` nativo** (no `HttpModule` de NestJS ni Axios). El patrón de referencia más cercano es:

- **ZapSign adapter:** `apps/contracts-ms/src/infrastructure/signature-providers/zapsign/zapsign-signature-provider.adapter.ts`
  - Injectable con `ConfigService`
  - Headers: `Content-Type: application/json`, `Authorization: Bearer {api_token}`
  - Verifica `response.ok` para errores

- **Remote file fetch:** `apps/transversal-ms/src/infrastructure/storage/http/http-remote-file-fetch.adapter.ts`
  - Timeout configurable (60.000 ms)
  - Valida protocolo de URL, content-length, manejo de errores

### Variable `RUES_API_BASE_URL` — ubicación actual

```typescript
// apps/transversal-ms/src/config/app.config.ts
rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',

// apps/suppliers-ms/src/config/app.config.ts
rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',
```

⚠️ **Fallback incorrecto:** `https://ollama-rues.5n921h.easypanel.host` apunta a un servidor externo dev, NO al endpoint productivo `execute-api.amazonaws.com`. Además está cargada en los MS equivocados.

---

## 3. Flujo de orquestación

### Estado actual

**No existe ningún módulo de pipeline.** Las entidades y enums de dominio están definidos, pero no hay código que los use para llamar a los microservicios externos. Los módulos existentes en `products-ms` son:

```
apps/products-ms/src/modules/
├── categories/      ← implementado, no tocar
├── credit-facilities/  ← implementado, no tocar
└── messaging/
```

### Flujo propuesto (basado en HU-06 y HU-07)

```
Trigger: credit_applications.status = 'in_progress'
   │
   ├─ PASO 1 (Sync, BD interna) ── Verificación duplicados
   │   Busca coincidencia en doc_number / phone / email (PN)
   │   o tax_id / phone / email rep. legal (PJ)
   │   con solicitud activa (status ≠ rejected ∧ status ≠ duplicate)
   │   → Si duplicado: status = 'duplicate' → FIN
   │
   ├─ PASO 2 (Async, SECUENCIAL OBLIGATORIO) ── SARLAFT
   │   POST /v1/sarlaft/jobs (por cada persona a consultar)
   │   → Guardar job_id → polling hasta done/failed
   │   → Guardar en sarlaft_checks (has_match, status, sources, detail)
   │   → Si coincidencia: status = 'sarlaft_match' + alerta Google Chat cumplimiento → FIN
   │   (En PJ: rep. legal + todos los accionistas PN + beneficiarios finales)
   │
   ├─ PASOS 3-4 (Async, PARALELIZABLES entre sí) ── BDME + Rama Judicial
   │   ├─ POST /v1/bdme/jobs → guardar job_id → polling → guardar en web_queries (query_type='bdme')
   │   └─ POST /v1/rama-judicial/jobs → polling → guardar en web_queries (query_type='rama_judicial')
   │   (errores NO detienen el pipeline; se guardan en query_result como jsonb de error)
   │   (En PJ: rep. legal + accionista clave para ambos)
   │
   ├─ PASO 5 (Sync, BD interna) ── Solo PJ: Determinación del accionista clave para HCPN
   │   Prioridad 1: ¿rep. legal es accionista? → usar ese (role=LEGAL_REP)
   │   Prioridad 2: shareholders ORDER BY ownership_percentage DESC LIMIT 1 (role=MAX_SHAREHOLDER)
   │
   ├─ PASO 6 (Async, SECUENCIAL OBLIGATORIO) ── Experian HCPN
   │   → Guardar en experian_queries (query_type='hcpn', credit_report, credit_score)
   │   → Actualizar persons.first_name / last_name con datos Experian
   │   → Si error: status = 'experian_query_error' + alerta técnica → FIN
   │
   ├─ PASO 7 (Solo PJ, Async, SECUENCIAL) ── Experian HCPJ
   │   Datos: tax_id (NIT) de businesses
   │   → Guardar en experian_queries (query_type='hcpj', business_id poblado)
   │   → Si error: status = 'hcpj_query_error' + alerta técnica → FIN
   │
   ├─ PASO 8 (Solo PJ) ── Migración documentos a S3
   │   Solo si requested_credit_line > $10.000.000
   │   Documentos: estados_financieros → s3://ppay/pj_client_docs/{tax_id}/eeff/
   │   → Actualizar documents.document_url con URL S3 final
   │
   └─ PASO 9 (Async, esperar callback de n8n) ── Agente AI
       POST webhook n8n con payload completo (ver §3.1 Payloads n8n)
       → Si error: status = 'ai_agent_error' + alerta técnica → FIN
       Esperar callback POST desde n8n al endpoint `/internal/n8n-callback`
       → Guardar en ai_agent_analysis (recommendation, analysis_result, html_url, agent_recommended_loc)
       → Según recommendation:
           hitl         → status = 'under_review' + alerta analistas Google Chat
           auto_approve → status = 'approved_pending_signature' → flujo HU contrato
           auto_reject  → status = 'rejected' → flujo notificaciones rechazo
           interview    → status = 'in_interview' + WhatsApp cliente (solo PN)
                          → n8n conduce entrevista → retorna con recommendation final → repite paso 9
```

### 3.1 Payloads n8n

**Payload PN (HU-06, enviado al webhook de n8n):**
```json
{
  "application_id": "{{credit_applications.external_id}}",
  "person": {
    "first_name": "{{persons.first_name}}",
    "last_name": "{{persons.last_name}}",
    "doc_type": "{{persons.doc_type}}",
    "doc_number": "{{persons.doc_number}}",
    "birth_date": "{{persons.birth_date}}"
  },
  "business": {
    "business_name": "{{businesses.business_name}}",
    "business_type": "{{businesses.business_type}}",
    "city_id": "{{businesses.city_id}}",
    "business_seniority": "{{credit_applications.business_seniority}}",
    "number_of_employees": "{{credit_applications.number_of_employees}}",
    "number_of_locations": "{{credit_applications.number_of_locations}}",
    "business_flagship_m2": "{{credit_applications.business_flagship_m2}}",
    "business_has_rent": "{{credit_applications.business_has_rent}}",
    "business_rent_amount": "{{credit_applications.business_rent_amount}}"
  },
  "financials": {
    "total_assets": "{{credit_applications.total_assets}}",
    "monthly_income": "{{credit_applications.monthly_income}}",
    "monthly_expenses": "{{credit_applications.monthly_expenses}}",
    "is_current_client": "{{credit_applications.is_current_client}}",
    "monthly_purchases": "{{credit_applications.monthly_purchases}}",
    "current_purchases": "{{credit_applications.current_purchases}}",
    "requested_credit_line": "{{credit_applications.requested_credit_line}}"
  },
  "data_sources": {
    "sarlaft_check_json": "{{sarlaft_checks.sources + detail en JSON}}",
    "bdme_check_json": "{{web_queries.query_result donde query_type='bdme'}}",
    "rama_judicial_check_json": "{{web_queries.query_result donde query_type='rama_judicial'}}",
    "credit_report_url": "{{URL del reporte Experian en S3}}"
  }
}
```

**Payload PJ (HU-07, enviado al webhook de n8n):**
```json
{
  "application_id": "{{credit_applications.external_id}}",
  "company": {
    "legal_name": "{{businesses.legal_name}}",
    "tax_id": "{{businesses.tax_id}}",
    "business_type": "{{businesses.business_type}}",
    "city_id": "{{businesses.city_id}}",
    "year_of_establishment": "{{businesses.year_of_establishment}}",
    "business_seniority": "{{credit_applications.business_seniority}}",
    "number_of_employees": "{{credit_applications.number_of_employees}}",
    "number_of_locations": "{{credit_applications.number_of_locations}}",
    "business_flagship_m2": "{{credit_applications.business_flagship_m2}}",
    "business_has_rent": "{{credit_applications.business_has_rent}}",
    "business_rent_amount": "{{credit_applications.business_rent_amount}}"
  },
  "legal_representative": {
    "first_name": "{{persons.first_name}}",
    "last_name": "{{persons.last_name}}",
    "doc_type": "{{persons.doc_type}}",
    "doc_number": "{{persons.doc_number}}"
  },
  "key_shareholder": {
    "role": "LEGAL_REP | MAX_SHAREHOLDER",
    "person_id": "{{persons.external_id del accionista clave}}",
    "first_name": "{{persons.first_name}}",
    "last_name": "{{persons.last_name}}",
    "doc_number": "{{persons.doc_number}}",
    "ownership_percentage": "{{shareholders.ownership_percentage}}"
  },
  "shareholders": [
    {
      "first_name": "...",
      "last_name": "...",
      "doc_type": "...",
      "doc_number": "...",
      "ownership_percentage": "..."
    }
  ],
  "financials": { /* mismos campos que PN */ },
  "data_sources": {
    "sarlaft_checks_json": "{{Array de sarlaft_checks de todos consultados}}",
    "bdme_rep_legal_json": "{{web_queries.query_result bdme + person_id=rep_legal}}",
    "bdme_key_shareholder_json": "{{web_queries.query_result bdme + person_id=accionista_clave}}",
    "rama_judicial_rep_legal_json": "{{web_queries.query_result rama_judicial + person_id=rep_legal}}",
    "rama_judicial_key_shareholder_json": "{{web_queries.query_result rama_judicial + person_id=accionista_clave}}",
    "hcpn_report_url": "{{URL S3 reporte HCPN accionista clave}}",
    "hcpj_report_url": "{{URL S3 reporte HCPJ empresa}}"
  },
  "documents": {
    "camara_comercio_url": "{{URL S3}}",
    "rut_url": "{{URL S3}}",
    "declaracion_renta_url": "{{URL S3}}",
    "estados_financieros_urls": ["{{URL S3}}", "..."]
  }
}
```

**Callback de n8n → backend (recibido en `/internal/n8n-callback`):**
```json
{
  "application_id": "{{external_id}}",
  "html_url_agent_analysis": "{{URL análisis HTML en S3}}",
  "json_agent_analysis": { "...": "..." },
  "agent_recommended_loc": 5000000,
  "agent_recomendation": "hitl | auto_approve | auto_reject | interview"
}
```

---

## 4. Gaps de implementación

### Gaps críticos — bloquean HU-06 y HU-07 completamente

- [ ] **Gap 1: Decisión arquitectural C no resuelta**
  ¿El pipeline vive en `products-ms` como módulo `credit-analysis-pipeline` o en un worker SQS separado?
  Sin esta decisión no se puede crear ningún archivo del pipeline.
  *Impacto: bloquea todos los gaps siguientes.*

- [ ] **Gap 2: Variables de entorno faltantes**
  Agregar al `.env.example` y al `app.config.ts` del MS designado:
  ```
  # URL base unificada (todos los microservicios comparten el mismo API Gateway)
  PLATAM_MS_API_BASE_URL=https://8qpwghqtx3.execute-api.us-east-1.amazonaws.com/prod
  PLATAM_MS_COGNITO_CLIENT_ID=          # App client para obtener token de máquina
  PLATAM_MS_COGNITO_CLIENT_SECRET=      # Solo si el client tiene secret

  # n8n
  N8N_WEBHOOK_PN_URL=                   # URL webhook agente PN
  N8N_WEBHOOK_PJ_URL=                   # URL webhook agente PJ
  N8N_CALLBACK_SECRET=                  # Shared secret para validar callbacks

  # Google Chat (3 canales distintos)
  GOOGLE_CHAT_COMPLIANCE_WEBHOOK_URL=   # Alertas SARLAFT
  GOOGLE_CHAT_TECHNICAL_WEBHOOK_URL=    # Errores Experian / n8n
  GOOGLE_CHAT_ANALYSTS_WEBHOOK_URL=     # Solicitudes under_review

  # Experian (contrato pendiente de documentar)
  EXPERIAN_BASE_URL=
  EXPERIAN_API_KEY=
  ```

- [ ] **Gap 3: Módulo del pipeline no existe**
  No hay ningún módulo NestJS para el proceso de análisis crediticio.
  Debe crearse en: `apps/products-ms/src/modules/credit-analysis-pipeline/`

- [ ] **Gap 4: Clientes HTTP externos — ninguno existe**
  Deben crearse siguiendo el patrón de `zapsign-signature-provider.adapter.ts`:
  - `apps/products-ms/src/modules/credit-analysis-pipeline/infrastructure/clients/sarlaft.client.ts`
  - `apps/products-ms/src/modules/credit-analysis-pipeline/infrastructure/clients/bdme.client.ts`
  - `apps/products-ms/src/modules/credit-analysis-pipeline/infrastructure/clients/rama-judicial.client.ts`
  - `apps/products-ms/src/modules/credit-analysis-pipeline/infrastructure/clients/rues.client.ts`
  - `apps/products-ms/src/modules/credit-analysis-pipeline/infrastructure/clients/n8n-webhook.client.ts`
  - `apps/products-ms/src/modules/credit-analysis-pipeline/infrastructure/clients/google-chat-alert.client.ts`
  - `apps/products-ms/src/modules/credit-analysis-pipeline/infrastructure/clients/experian.client.ts`

- [ ] **Gap 5: DTOs de integración — ninguno existe**
  Interfaces TypeScript para contratos de cada microservicio:
  - `SarlaftJobRequestDto`, `SarlaftJobStatusResponseDto`
  - `BdmeJobRequestDto`, `BdmeJobStatusResponseDto`
  - `RamaJudicialJobRequestDto`, `RamaJudicialJobStatusResponseDto`
  - `RuesScraperQueryDto`, `RuesScraperResponseDto`
  - `N8nWebhookPayloadPnDto`, `N8nWebhookPayloadPjDto`, `N8nCallbackPayloadDto`
  - `GoogleChatAlertDto`
  - `ExperianHcpnRequestDto`, `ExperianHcpnResponseDto`, `ExperianHcpjRequestDto`, `ExperianHcpjResponseDto`

- [ ] **Gap 6: Endpoint callback de n8n — no existe**
  n8n necesita hacer `POST` al backend con el resultado del análisis.
  Debe crearse un endpoint protegido por el `N8N_CALLBACK_SECRET`.
  Ruta propuesta: `POST /internal/n8n-callback`
  Archivo: `apps/products-ms/src/modules/credit-analysis-pipeline/presentation/n8n-callback.controller.ts`

- [ ] **Gap 7: Estrategia de autenticación máquina-a-máquina no definida**
  NestJS necesita un JWT válido de Cognito para llamar a la HTTP API de `platam_microservices`.
  No está definido si se usará:
  - Service account (usuario Cognito dedicado para el backend)
  - Flujo `client_credentials` de Cognito
  - Token estático de larga duración (no recomendado)
  Sin resolver esto, todas las llamadas a execute-api recibirán **401**.

- [ ] **Gap 8: Mecanismo de trigger del pipeline no definido**
  ¿Cómo detecta el backend que `status = 'in_progress'`?
  Opciones:
  - Subscriber TypeORM con `@AfterUpdate()` en `CreditApplicationEntity`
  - Mensaje SQS desde el endpoint `PATCH /credit-applications/:id/status`
  - Llamada directa en el use-case de cambio de estado

### Gaps secundarios — bloquean funcionalidades específicas

- [ ] **Gap 9: Google Chat alerts — sin implementar**
  Necesario para: coincidencia SARLAFT, errores Experian, errores n8n, solicitudes `under_review`.
  No hay cliente ni webhooks configurados.

- [ ] **Gap 10: Experian (HCPN/HCPJ) — contrato no documentado**
  `api-integrations.md` solo menciona propósito y estados de error. No hay:
  - Base URL de Experian
  - Método de autenticación
  - Payload de request HCPN y HCPJ
  - Formato de response (ni cómo extraer `credit_score`)
  Clasificado como Tier 2 en `onboarding-module-prerequisites.md` (bloquea HU-07).

- [ ] **Gap 11: Entidad resultado RUES — no existe**
  RUES se usa en HU-07 (verificación empresa registro mercantil) pero no hay entidad
  donde guardar el resultado. `WebQueryType` no incluye `rues` (ver inconsistencia §5.5).

- [ ] **Gap 12: Idempotencia del pipeline no definida**
  Si el mismo `credit_application_id` dispara el pipeline dos veces (evento duplicado),
  el comportamiento no está especificado. Riesgo de doble consulta en servicios de pago.

- [ ] **Gap 13: Polling strategy para jobs async**
  No hay lógica de polling con backoff exponencial ni manejo de timeout para
  SARLAFT, BDME y Rama Judicial. Debe definirse:
  - Número máximo de intentos
  - Intervalo entre intentos (fijo o exponencial)
  - Qué hacer si se supera el timeout (¿marcar job como failed?)

---

## 5. Inconsistencias detectadas

### Inconsistencia 1 — `RUES_API_BASE_URL` cargada en los MS equivocados

- **Archivos afectados:**
  - `apps/transversal-ms/src/config/app.config.ts`
  - `apps/suppliers-ms/src/config/app.config.ts`
  - `.env.example`

- **Problema:** `RUES_API_BASE_URL` está configurada en `transversal-ms` y `suppliers-ms`, pero RUES se necesita en el pipeline de análisis crediticio que debe vivir en `products-ms` (o un worker separado). El MS que gestiona `credit_applications` no tiene acceso a esta variable.

- **Contradicción vs. documentación:** `onboarding-module-prerequisites.md` identifica el pipeline en `products-ms`; el código actual la tiene en MS sin relación con el pipeline.

---

### Inconsistencia 2 — Fallback hardcodeado con URL de servidor dev externo

- **Archivo:** `apps/transversal-ms/src/config/app.config.ts` y `apps/suppliers-ms/src/config/app.config.ts`

- **Código:**
  ```typescript
  rues_api_base_url: process.env.RUES_API_BASE_URL || 'https://ollama-rues.5n921h.easypanel.host',
  ```

- **Problema:** El fallback apunta a un servidor externo (`easypanel.host`), no al endpoint productivo de AWS (`execute-api.amazonaws.com`). Esto significa que en `development` sin `.env` configurado, las llamadas van a un endpoint diferente al documentado como fuente de verdad, sin JWT de Cognito y potencialmente sin disponibilidad garantizada.

- **Contradicción vs. documentación:** Las guías AWS establecen `execute-api.amazonaws.com` como la URL correcta; el código usa una URL no documentada como fallback.

- **Riesgo adicional:** `suppliers-ms/config/app.config.ts` también hardcodea valores de Cognito (`COGNITO_USER_POOL_ID`, `COGNITO_CLIENT_ID`, `COGNITO_CLIENT_SECRET`) como fallbacks, lo que es un riesgo de seguridad si `.env` no se configura correctamente en el entorno de despliegue.

---

### Inconsistencia 3 — Una variable por servicio vs. URL base unificada

- **Prerequisito y `api-integrations.md`:** recomiendan `PLATAM_MS_API_BASE_URL` (una sola URL base para todos los microservicios, ya que todos comparten el mismo API Gateway).

- **Código actual:** solo existe `RUES_API_BASE_URL`, sin variables para SARLAFT, BDME, Rama Judicial. El patrón de configuración es inconsistente con la arquitectura real (single API Gateway, single JWT authorizer).

---

### Inconsistencia 4 — Formato `tipo_documento` SARLAFT vs. enum interno `DocTypes`

- **Contrato SARLAFT** (fuente de verdad: `test-case.json`): usa `"tipo_documento": "CC"` (abreviatura colombiana estándar)

- **Enum interno `DocTypes`** (`libs/shared/src/domain/types.enum.ts`):
  ```typescript
  export enum DocTypes {
    CITIZENSHIP = 'citizenship',
    PASSPORT = 'passport',
    OTHER = 'other',
  }
  ```

- **Brecha:** Se necesita una capa de mapeo explícita antes de llamar a SARLAFT, BDME y posiblemente Rama Judicial. La tabla de mapeo necesaria:

  | `DocTypes` (platam_pay_v2) | SARLAFT `tipo_documento` | BDME `tipo` |
  |---|---|---|
  | `citizenship` | `CC` | `CC` |
  | `passport` | `PA` | `PA` (verificar) |
  | `other` | *(indefinido)* | *(indefinido)* |

- **No está documentado ni implementado** este mapeo en ningún archivo del proyecto.

---

### Inconsistencia 5 — `WebQueryType` no incluye `RUES`

- **Enum actual:**
  ```typescript
  export enum WebQueryType {
    BDME = 'bdme',
    RAMA_JUDICIAL = 'rama_judicial',
  }
  ```

- **HU-07:** RUES se consulta para verificar la empresa en el Registro Mercantil y debe persistir su resultado en alguna entidad.

- **Brecha:** No hay un `WebQueryType.RUES`, ni entidad definida para guardar el resultado de RUES, ni claridad sobre si el resultado va en `web_queries` (con nuevo tipo) o en una tabla/entidad separada.

---

### Inconsistencia 6 — Contrato Rama Judicial para Persona Natural no documentado

- **Fuente de verdad (guías AWS y README):** Solo documenta el request para PJ:
  ```json
  { "tipo_persona": "juridica", "razon_social": "LEZAG COLOMBIA", "solo_recientes": true }
  ```

- **HU-06 (PN) y HU-07 (accionistas/rep. legal):** requieren consultar Rama Judicial con datos de personas naturales (`doc_type` + `doc_number`).

- **Brecha:** El contrato para buscar personas naturales en Rama Judicial no aparece en ninguna guía de despliegue. El cuerpo del request debe confirmarse con el equipo de `platam_microservices` antes de implementar.

---

### Inconsistencia 7 — `ExperianQueryEntity` existe sin contrato de API

- **Entidad:** `libs/products-data/src/entities/experian-query.entity.ts` — bien definida con campos `queryType` (hcpn/hcpj), `creditReport`, `creditScore`, `status`, `errorMessage`.

- **`api-integrations.md` sección Experian:** solo menciona propósito, dos tipos de query (HCPN/HCPJ) y estados de error. No hay base URL, método de autenticación, payload de request ni estructura de response.

- **Brecha:** Imposible implementar los pasos 5-7 de HU-06/07 sin el contrato Experian. Clasificado como "Tier 2 — bloquea HU-07" en `onboarding-module-prerequisites.md`.

---

## 6. Paso a paso para vincular las integraciones

### Pre-requisitos: decisiones humanas (antes de código)

| Decisión | Pregunta | Impacto |
|---|---|---|
| **Decisión C** | ¿El pipeline vive en `products-ms` o en un worker SQS separado? | Bloquea todos los gaps de implementación |
| **Auth M2M** | ¿Service account Cognito o `client_credentials`? | Sin esto → 401 en todas las llamadas |
| **Contrato Experian** | Base URL, auth, payload HCPN y HCPJ | Bloquea pasos 5-7 de HU-07 |
| **Contrato Rama PN** | Body del POST para persona natural | Bloquea pasos 3-4 de HU-06 |

---

### Paso 1 — Corregir y ampliar variables de entorno

**1a.** Eliminar el fallback hardcodeado `'https://ollama-rues.5n921h.easypanel.host'` en:
- `apps/transversal-ms/src/config/app.config.ts`
- `apps/suppliers-ms/src/config/app.config.ts`

**1b.** Agregar al `.env.example`:
```bash
# === Microservicios platam_microservices (API Gateway compartida) ===
PLATAM_MS_API_BASE_URL=https://8qpwghqtx3.execute-api.us-east-1.amazonaws.com/prod
# Token de máquina: obtener via Cognito client_credentials o service account
PLATAM_MS_COGNITO_CLIENT_ID=
PLATAM_MS_COGNITO_CLIENT_SECRET=

# === n8n (AI Agent) ===
N8N_WEBHOOK_PN_URL=
N8N_WEBHOOK_PJ_URL=
N8N_CALLBACK_SECRET=

# === Google Chat (alertas operativas) ===
GOOGLE_CHAT_COMPLIANCE_WEBHOOK_URL=
GOOGLE_CHAT_TECHNICAL_WEBHOOK_URL=
GOOGLE_CHAT_ANALYSTS_WEBHOOK_URL=

# === Experian ===
EXPERIAN_BASE_URL=
EXPERIAN_API_KEY=
```

**1c.** Agregar estas variables al `app.config.ts` del MS del pipeline.

---

### Paso 2 — Crear la estructura del módulo del pipeline

```
apps/products-ms/src/modules/credit-analysis-pipeline/
├── credit-analysis-pipeline.module.ts
│
├── application/
│   ├── use-cases/
│   │   ├── run-pn-pipeline.use-case.ts      # Orquesta HU-06 completo
│   │   └── run-pj-pipeline.use-case.ts      # Orquesta HU-07 completo
│   └── services/
│       ├── duplicate-check.service.ts       # Paso 1: duplicados (BD interna)
│       ├── sarlaft-check.service.ts         # Paso 2: llama sarlaft.client + persiste
│       ├── web-query.service.ts             # Pasos 3-4: BDME + Rama Judicial
│       ├── experian.service.ts              # Pasos 5-6-7: HCPN + HCPJ
│       ├── s3-document-migration.service.ts # Paso 8 (solo PJ)
│       └── ai-agent.service.ts             # Paso 9: n8n webhook + callback
│
├── infrastructure/
│   ├── clients/
│   │   ├── sarlaft.client.ts
│   │   ├── bdme.client.ts
│   │   ├── rama-judicial.client.ts
│   │   ├── rues.client.ts
│   │   ├── n8n-webhook.client.ts
│   │   ├── google-chat-alert.client.ts
│   │   └── experian.client.ts
│   └── dtos/
│       ├── sarlaft-job.dto.ts
│       ├── bdme-job.dto.ts
│       ├── rama-judicial-job.dto.ts
│       ├── rues-scrape.dto.ts
│       ├── n8n-payload.dto.ts
│       └── experian.dto.ts
│
└── presentation/
    └── n8n-callback.controller.ts           # Recibe resultado del agente AI
```

---

### Paso 3 — Implementar los clientes HTTP

Cada cliente debe:
- Ser un `@Injectable()` con `ConfigService`
- Usar `fetch()` nativo (patrón del monorepo)
- Incluir `Authorization: Bearer <token>` con el JWT obtenido de Cognito
- Incluir `x-correlation-id` para trazabilidad

**Patrón de cliente async con polling:**
```typescript
@Injectable()
export class SarlaftClient {
  private readonly baseUrl: string;
  private readonly maxPollAttempts = 30;
  private readonly pollIntervalMs = 5000;

  constructor(private readonly config: ConfigService) {
    this.baseUrl = config.get('config.platam_ms_api_base_url');
  }

  async checkPerson(data: SarlaftJobRequestDto, jwtToken: string): Promise<SarlaftJobStatusResponseDto> {
    const submitRes = await fetch(`${this.baseUrl}/v1/sarlaft/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`,
        'x-correlation-id': crypto.randomUUID(),
      },
      body: JSON.stringify(data),
    });
    if (!submitRes.ok) throw new Error(`SARLAFT submit failed: ${submitRes.status}`);
    const { job_id } = await submitRes.json();

    return this.pollUntilDone(job_id, jwtToken);
  }

  private async pollUntilDone(jobId: string, jwtToken: string): Promise<SarlaftJobStatusResponseDto> {
    for (let i = 0; i < this.maxPollAttempts; i++) {
      await new Promise(r => setTimeout(r, this.pollIntervalMs));
      const res = await fetch(`${this.baseUrl}/v1/sarlaft/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${jwtToken}` },
      });
      const data = await res.json();
      if (data.status === 'done' || data.status === 'failed') return data;
    }
    throw new Error(`SARLAFT polling timeout for job ${jobId}`);
  }
}
```

**Tabla de mapeo `DocTypes` → formato microservicio (debe implementarse):**
```typescript
// infrastructure/clients/mappers/doc-type.mapper.ts
export function mapDocTypeToSarlaft(docType: DocTypes): string {
  const map: Record<DocTypes, string> = {
    [DocTypes.CITIZENSHIP]: 'CC',
    [DocTypes.PASSPORT]: 'PA',
    [DocTypes.OTHER]: 'CE',  // verificar con platam_microservices
  };
  return map[docType];
}
```

---

### Paso 4 — Paralelismo BDME + Rama Judicial

Los pasos 3 y 4 pueden ejecutarse en paralelo con `Promise.allSettled`:

```typescript
const [bdmeResult, ramaResult] = await Promise.allSettled([
  this.bdmeClient.checkPerson(bdmePayload, jwtToken),
  this.ramaJudicialClient.checkPerson(ramaPayload, jwtToken),
]);

// Guardar ambos resultados en web_queries independientemente del éxito/error
await this.webQueryService.saveResult(applicationId, WebQueryType.BDME, bdmeResult);
await this.webQueryService.saveResult(applicationId, WebQueryType.RAMA_JUDICIAL, ramaResult);
// El pipeline siempre continúa, incluso si alguno falló
```

---

### Paso 5 — Endpoint receptor del callback de n8n

```typescript
// presentation/n8n-callback.controller.ts
@Controller('internal')
export class N8nCallbackController {
  constructor(private readonly aiAgentService: AiAgentService) {}

  @Post('n8n-callback')
  async handleCallback(
    @Headers('x-n8n-secret') secret: string,
    @Body() payload: N8nCallbackPayloadDto,
  ) {
    if (secret !== this.config.get('config.n8n_callback_secret')) {
      throw new UnauthorizedException('Invalid n8n callback secret');
    }
    await this.aiAgentService.handleCallback(payload);
    return { received: true };
  }
}
```

---

### Paso 6 — Agregar `RUES` al enum `WebQueryType`

```typescript
// libs/shared/src/domain/types.enum.ts
export enum WebQueryType {
  BDME = 'bdme',
  RAMA_JUDICIAL = 'rama_judicial',
  RUES = 'rues',  // ← agregar para HU-07
}
```

Y crear la migración TypeORM correspondiente para actualizar el enum en PostgreSQL.

---

### Paso 7 — Mecanismo de trigger del pipeline

**Recomendación:** SQS message desde el use-case de cambio de estado, patrón alineado con el monorepo:

```typescript
// En el use-case que actualiza credit_applications.status → 'in_progress'
if (newStatus === CreditApplicationStatus.IN_PROGRESS) {
  await this.sqsClient.sendMessage({
    queueUrl: this.config.get('config.credit_analysis_pipeline_queue_url'),
    body: JSON.stringify({ creditApplicationId, applicationType: 'pn' | 'pj' }),
  });
}
```

El módulo `credit-analysis-pipeline` consume esta cola y dispara el pipeline correspondiente.

---

### Resumen ejecutivo del estado

| Dimensión | Estado actual | Lo que falta |
|---|---|---|
| **Schema de BD** | ✅ 100% listo | Nada (migraciones ya ejecutadas) |
| **Enums de dominio** | ✅ 95% correcto | Agregar `WebQueryType.RUES` |
| **Contratos microservicios** | ✅ Documentados en guías AWS | Confirmar Rama Judicial PN + Experian |
| **Variables de entorno** | ⚠️ 10% (solo RUES, en MS equivocado) | Todas las demás variables y corrección de fallback |
| **Clientes HTTP** | ❌ 0% | 7 clientes por crear |
| **DTOs de integración** | ❌ 0% | ~15 DTOs por crear |
| **Módulo orquestador** | ❌ 0% | Módulo completo por crear |
| **Endpoint callback n8n** | ❌ 0% | Endpoint por crear |
| **Decisiones arquitecturales** | ⚠️ Pendiente | Decisión C (MS pipeline), Auth M2M |

**Conclusión:** El esquema de base de datos está 100% listo para recibir resultados. Los contratos de los microservicios están documentados en las guías AWS. Lo que falta es el **100% del código de integración**: clientes HTTP, DTOs, módulo orquestador, endpoint callback n8n, variables de entorno, y la Decisión C que desbloquea todo.

---

*Documento generado por análisis estático del repositorio `platam_pay_v2` y lectura de las guías de despliegue en `platam_microservices`. Actualizar al resolverse las Decisiones pendientes y al iniciar la implementación de HU-06/HU-07.*
