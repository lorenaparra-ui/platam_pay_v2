# HU-06 — Procesos Backend PN (Estudio Automatizado)

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Natural (PN)  
**Canal:** Interno — proceso automatizado del backend  
**Última actualización:** Abril 2026  
**Estado:** En revisión

---

## Contexto

El pipeline de estudio automatizado se dispara en dos escenarios:

1. **Self-service (HU-01):** el cliente envía el formulario con `privacy_policy_accepted = true` → status pasa directamente a `in_progress`.
2. **Registro por SR (HU-02):** el cliente autoriza desde HU-05 → status cambia de `pending_authorization` a `in_progress`.

El resultado de este pipeline es una solicitud en uno de estos tres estados finales:
- `under_review` — lista para revisión del Analista (HITL)
- `approved_pending_signature` — aprobación automática por el agente AI → contrato generado (⚠️ pendiente en schema — ver `SCHEMA_PENDIENTE_LORENA.md` ítem 5)
- `rejected` — rechazo automático por el agente AI → notificaciones al cliente (se detalla en historia siguiente)

Los estados de error detienen el pipeline y requieren intervención del equipo técnico o de cumplimiento.

> **Responsable de implementación:** Freddy Candelo (backend NestJS).

---

## Historia de Usuario

**Como** sistema backend de Platam,  
**quiero** ejecutar automáticamente la verificación de duplicados, SARLAFT, Experian y el análisis del agente AI al recibir una solicitud autorizada,  
**para** dejar la solicitud lista para decisión — ya sea por el Analista, aprobación automática o rechazo automático.

---

## Trigger

```
credit_applications.status = 'in_progress'
→ Backend escucha el evento y dispara el pipeline
```

---

## Pipeline Completo

```
1. Verificación de duplicados
   ├── Sí: status = 'duplicate' → FIN
   └── No: continúa

2. Consulta SARLAFT
   ├── Coincidencia: status = 'sarlaft_match' → Alerta cumplimiento → FIN (pendiente analista)
   └── Limpio: continúa

3. Consulta BDME (Boletín de Deudores Morosos del Estado)
   → Guarda resultado (exitoso o error) en web_queries → Continúa

4. Consulta Rama Judicial (Procesos judiciales)
   → Guarda resultado (exitoso o error) en web_queries → Continúa

5. Consulta Experian (HCPN)
   ├── Error: status = 'experian_query_error' → Alerta técnico → FIN
   └── OK: guarda en experian_queries + actualiza persons

6. Envío al Agente AI (n8n)
   ├── Error: status = 'ai_agent_error' → Alerta técnico → FIN
   └── OK: guarda análisis en ai_agent_analysis

7. Resultado del Agente AI
   ├── Requiere entrevista → status = 'in_interview' → WhatsApp al cliente → n8n hace entrevista → vuelve al paso 7
   ├── HITL → status = 'under_review' → notificación al Analista
   ├── Aprobación automática → flujo contrato (HU-07)
   └── Rechazo automático → flujo notificaciones rechazo (HU-07)
```

---

## Paso 1 — Verificación de Duplicados

El sistema verifica si ya existe una solicitud activa para el mismo cliente en el producto BNPL.

**Criterios de duplicado** (cualquiera de los tres):
- Mismo `doc_number` en `persons`
- Mismo `phone` en `persons`
- Mismo `email` en `persons`

…con una solicitud en `credit_applications` en estado diferente a `rejected` o `duplicate`.

**Si es duplicado:**
```
credit_applications:
  status → CreditApplicationStatus.DUPLICATE ('duplicate')
```

> El manejo de duplicados (rescate, fusión o descarte) se gestiona en un flujo separado — pendiente de definir.

---

## Paso 2 — Consulta SARLAFT

Se verifica al solicitante contra listas restrictivas y fuentes gubernamentales **antes** de consumir servicios adicionales de scraping y Experian, ya que estos tienen costo.

**Datos enviados:** `doc_type` + `doc_number` + `first_name` + `last_name` de `persons`.

**Si hay coincidencia en listas:**
```
-- 1. Insertar en sarlaft_checks:
sarlaft_checks:
  credit_application_id → ID de la solicitud
  person_id             → ID de la persona consultada
  has_match             → true
  status                → SarlaftCheckStatuses.ALERT ('alert') o SarlaftCheckStatuses.BLOCKED ('blocked') según severidad
  consulted_at          → timestamp de la consulta
  sources               → jsonb con fuentes donde aparece (OFAC, ONU, PEP, etc.)
  detail                → descripción de las coincidencias

-- 2. Actualizar solicitud:
credit_applications:
  status → CreditApplicationStatus.SARLAFT_MATCH ('sarlaft_match')
```
→ Se envía alerta al canal de cumplimiento en Google Chat con: nombre, documento, ID solicitud y detalle de la coincidencia.

> El Analista revisa la coincidencia y toma una de dos acciones desde el backoffice (Tab SARLAFT en HU-B07):
> - **Rechazar:** envía notificación de rechazo al cliente y cierra la solicitud.
> - **Continuar:** libera el flujo para que avance a las consultas web (BDME, Rama Judicial) y Experian.
>
> Este flujo de decisión del Analista sobre SARLAFT se detalla en HU-B07-PN.

**Si sale limpio:**
```
sarlaft_checks:
  credit_application_id → ID de la solicitud
  person_id             → ID de la persona consultada
  has_match             → false
  status                → SarlaftCheckStatuses.CLEAN ('clean')
  consulted_at          → timestamp de la consulta
  sources               → jsonb con fuentes consultadas
  detail                → null
```
→ Continúa al paso 3.

---

## Paso 3 — Consulta BDME (Boletín de Deudores Morosos del Estado)

Se consulta el microservicio de scraping desarrollado por Freddy para verificar si el solicitante aparece en el Boletín de Deudores Morosos del Estado.

**Datos enviados:** `doc_type` + `doc_number` de `persons`.

**Si la consulta falla o presenta error:**
```
web_queries:
  credit_application_id → ID de la solicitud
  query_type            → WebQueryType.BDME ('bdme')
  person_id             → ID de la persona consultada
  consulted_at          → timestamp de la consulta
  query_result          → jsonb con estructura de error:
                          {
                            "status": "error",
                            "error_message": "detalle del error",
                            "error_code": "código de error si aplica"
                          }
```

**Si la consulta es exitosa:**
```
web_queries:
  credit_application_id → ID de la solicitud
  query_type            → WebQueryType.BDME ('bdme')
  person_id             → ID de la persona consultada
  consulted_at          → timestamp de la consulta
  query_result          → jsonb con respuesta completa del microservicio
```

> **Nota importante:** Los errores en esta consulta NO detienen el pipeline. El agente AI en el paso 6 recibe el resultado (exitoso o error) y lo interpreta como parte de su análisis. Los servicios de scraping son inherentemente inestables.

---

## Paso 4 — Consulta Rama Judicial (Procesos Judiciales)

Se consulta el microservicio de scraping desarrollado por Freddy para verificar procesos judiciales asociados al solicitante.

**Datos enviados:** `doc_type` + `doc_number` de `persons`.

**Si la consulta falla o presenta error:**
```
web_queries:
  credit_application_id → ID de la solicitud
  query_type            → WebQueryType.RAMA_JUDICIAL ('rama_judicial')
  person_id             → ID de la persona consultada
  consulted_at          → timestamp de la consulta
  query_result          → jsonb con estructura de error:
                          {
                            "status": "error",
                            "error_message": "detalle del error",
                            "error_code": "código de error si aplica"
                          }
```

**Si la consulta es exitosa:**
```
web_queries:
  credit_application_id → ID de la solicitud
  query_type            → WebQueryType.RAMA_JUDICIAL ('rama_judicial')
  person_id             → ID de la persona consultada
  consulted_at          → timestamp de la consulta
  query_result          → jsonb con respuesta completa del microservicio
```

> **Nota importante:** Los errores en esta consulta NO detienen el pipeline. El agente AI en el paso 6 recibe el resultado (exitoso o error) y lo interpreta como parte de su análisis.

---

## Paso 5 — Consulta Experian (HCPN)

Se envía la consulta de Historia de Crédito Persona Natural a Experian.

**Datos enviados:** `doc_type` + `doc_number` de `persons`.

**Si la consulta falla:**
```
-- 1. Registrar el error:
experian_queries:
  credit_application_id → ID de la solicitud
  person_id             → ID de la persona consultada
  query_type            → ExperianQueryTypes.HCPN ('hcpn')
  consulted_at          → timestamp de la consulta
  status                → ExperianQueryStatus.ERROR ('error')
  error_message         → código/mensaje de error retornado por Experian

-- 2. Actualizar solicitud:
credit_applications:
  status → CreditApplicationStatus.EXPERIAN_QUERY_ERROR ('experian_query_error')
```
→ Se envía alerta al canal técnico en Google Chat.

**Si la consulta es exitosa:**
```
-- 1. Insertar en experian_queries:
experian_queries:
  credit_application_id → ID de la solicitud
  person_id             → ID de la persona consultada
  query_type            → ExperianQueryTypes.HCPN ('hcpn')
  credit_report         → respuesta completa de Experian (jsonb)
  credit_score          → score extraído del reporte (si disponible)
  consulted_at          → timestamp de la consulta
  status                → ExperianQueryStatus.COMPLETED ('completed')

-- 2. Actualizar persons con el nombre validado por Experian:
persons:
  first_name → nombre(s) retornados por Experian
  last_name  → apellidos retornados por Experian
```

> El nombre retornado por Experian es la fuente de verdad para el estudio crediticio.

---

---

## ⚠️ Plan Alterno — Integración Agente AI (Pendiente de Resolución)

> **Contexto:** n8n ya no es el orquestador de agentes AI. El servicio está siendo migrado a una API propia con FastAPI. Dicho servicio se encuentra en etapa de **planeación/desarrollo** y no tiene contrato definido aún.  
> Para que esto **no sea un bloqueante** de HU-06, se implementa un **stub configurable** que simula el comportamiento del agente AI, con una estrategia clara de integración futura.

### Estrategia de implementación: Stub desacoplado por Hexagonal Architecture

El port `AiAgentServicePort` aísla completamente el use case del proveedor concreto. El stub implementa este port devolviendo un resultado determinístico sin llamada HTTP externa.

```
RunCreditApplicationPipelineUseCase
  → AiAgentServicePort.analyze(payload): Promise<AiAgentResult>
        ↑
  [StubAiAgentAdapter]  ← implementación actual (sin HTTP)
  [HttpFastApiAiAgentAdapter]  ← futura implementación (swap en infrastructure.module.ts)
```

### `StubAiAgentAdapter` — Lógica de decisión

El stub toma la decisión basándose en el **credit score de Experian** con un override vía variable de entorno para testing:

```typescript
// Prioridad 1: override por env var (para QA — probar cada rama)
// AI_AGENT_MOCK_RECOMMENDATION = 'hitl' | 'auto_approve' | 'auto_reject'
// Si no está definida, usa lógica basada en score:

if (creditScore >= 700)      → recommendation = 'auto_approve'
else if (creditScore >= 450) → recommendation = 'hitl'
else                         → recommendation = 'auto_reject'
// creditScore = null o 0    → recommendation = 'hitl'
```

> **Nota:** El stub **nunca devuelve `interview`**. Ese flujo requiere el agente real y se validará en la integración con FastAPI.

### Comportamiento del stub respecto al callback

Con el stub, la decisión es **síncrona**: `AiAgentServicePort.analyze()` retorna el resultado directamente al `RunCreditApplicationPipelineUseCase`, que lo procesa inline. No hay llamada HTTP, no hay callback externo.

El endpoint `POST /credit-applications/ai-result` **se implementa de todas formas** — será el punto de entrada para el agente FastAPI real. El stub simplemente no lo usa.

### Variables de entorno del stub

```env
# Stub — override de recomendación para QA (dejar vacío para usar lógica de score)
AI_AGENT_MOCK_RECOMMENDATION=        # '' | 'hitl' | 'auto_approve' | 'auto_reject'
# Thresholds del stub (opcionales — tienen defaults en el código)
AI_AGENT_MOCK_APPROVE_THRESHOLD=700
AI_AGENT_MOCK_REVIEW_THRESHOLD=450
```

### Estrategia de integración futura (FastAPI)

Cuando el servicio FastAPI esté disponible con contrato definido:

1. Crear `HttpFastApiAiAgentAdapter` implementando `AiAgentServicePort`
2. Si FastAPI es **síncrono** (POST → respuesta directa): el adapter hace la llamada y retorna el resultado — arquitectura idéntica al stub
3. Si FastAPI es **asíncrono** (POST → callback): el adapter lanza el job y el callback (`POST /credit-applications/ai-result`) despacha a `ReceiveAiAgentResultUseCase`
4. Cambiar en `infrastructure.module.ts`: `useClass: StubAiAgentAdapter` → `useClass: HttpFastApiAiAgentAdapter`
5. Los use cases no cambian — el port los aísla completamente

> **Pendiente por resolver:** Contrato de la API FastAPI (URL, auth, request/response, sync vs async). Sin este contrato `HttpFastApiAiAgentAdapter` no puede implementarse.

---

## Paso 6 — Envío al Agente AI

> **Implementación actual:** `StubAiAgentAdapter` (ver sección Plan Alterno). El payload se construye igual; el stub lo recibe y toma la decisión sin llamada HTTP.  
> **Implementación futura:** `HttpFastApiAiAgentAdapter` — mismo payload, distinto adaptador.

El backend construye un payload con toda la información recopilada y lo envía al agente AI.

**Payload enviado a n8n:**
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

> **Nota sobre data_sources:** Los JSONs de SARLAFT, BDME y Rama Judicial se envían completos para que el agente AI los analice. El reporte Experian se envía como URL a S3 por su tamaño.

**Si el agente falla o no responde:**
```
credit_applications:
  status → CreditApplicationStatus.AI_AGENT_ERROR ('ai_agent_error')
```
→ Se envía alerta al canal técnico en Google Chat.

---

## Paso 7 — Resultado del Agente AI

> **Implementación actual (stub):** el resultado llega directamente como retorno de `AiAgentServicePort.analyze()` dentro del pipeline use case. No hay callback externo.  
> **Implementación futura (FastAPI async):** el agente llama a `POST /credit-applications/ai-result`. El endpoint existe desde la primera implementación.

El agente puede retornar cuatro resultados posibles. El stub solo devuelve `hitl`, `auto_approve` o `auto_reject` (nunca `interview` — requiere agente real).

**Payload recibido del agente:**
```json
{
  "application_id": "{{external_id}}",
  "html_url_agent_analysis": "{{URL análisis HTML en S3}}",
  "json_agent_analysis": { ... },
  "agent_recommended_loc": 5000000,
  "agent_recomendation": "hitl | auto_approve | auto_reject | interview"
}
```

**Al recibir el resultado, siempre se guarda:**
```
ai_agent_analysis:
  credit_application_id    → ID de la solicitud
  analysis_result          → json_agent_analysis del resultado (jsonb)
  recommendation           → AiAgentAnalysisRecommendation del resultado (enum)
  html_url_agent_analysis  → URL del análisis HTML en S3
                             ⚠️ Campo pendiente en schema — ver SCHEMA_PENDIENTE_LORENA.md ítem 3
  agent_recommended_loc    → monto de LOC recomendado por el agente
                             ⚠️ Campo pendiente en schema — ver SCHEMA_PENDIENTE_LORENA.md ítem 3
  analyzed_at              → timestamp de recepción
```

---

### Resultado: `interview` — Requiere entrevista

El agente n8n consume directamente el endpoint de cambio de estado:

```
credit_applications:
  status → CreditApplicationStatus.IN_INTERVIEW ('in_interview')
```

Se envía el siguiente mensaje de WhatsApp al cliente vía Twilio:

**Plantilla:** `platam_entrevista_pn`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` |
| `{{2}}` | Número de teléfono del agente AI de n8n (configurable) |

> ¡Hola {{1}}! Para continuar con tu solicitud de crédito en Platam Pay necesitamos validar algunos datos adicionales.
>
> En los próximos 2 minutos recibirás una llamada desde el número {{2}} de nuestro equipo para validar datos de tu solicitud y continuar con tu proceso de evaluación.
>
> La llamada será breve (2-5 min) y es necesaria para avanzar con tu solicitud. Si no puedes contestar ahora, te volvemos a llamar en 1 hora.
>
> ¡Gracias por tu tiempo!  
> Platam

El agente AI de n8n conduce la entrevista y, al finalizarla, retorna el resultado al mismo endpoint del paso 6 con `agent_recomendation` actualizado (`hitl`, `auto_approve` o `auto_reject`). El flujo continúa desde ahí.

---

### Resultado: `hitl` — Revisión por Analista

```
credit_applications:
  status → CreditApplicationStatus.UNDER_REVIEW ('under_review')
```

→ Se notifica al equipo de Analistas por Google Chat: nombre del cliente, partner, ID solicitud, enlace al backoffice.

---

### Resultado: `auto_approve` o `auto_reject`

```
-- auto_approve:
credit_applications:
  status → CreditApplicationStatus.APPROVED_PENDING_SIGNATURE ('approved_pending_signature')
  ⚠️ Valor pendiente en enum — ver SCHEMA_PENDIENTE_LORENA.md ítem 5
```

→ El flujo continúa en **HU-07** (generación de contrato y notificaciones de aprobación/rechazo).

---

## Mapa de Estados de Este Pipeline

| Estado (`CreditApplicationStatus`) | Valor en BD | Descripción |
|---|---|---|
| `IN_PROGRESS` | `'in_progress'` | Trigger — pipeline iniciado |
| `DUPLICATE` | `'duplicate'` | Solicitud activa ya existe para este cliente |
| `SARLAFT_MATCH` | `'sarlaft_match'` | Cliente en lista restrictiva — pendiente decisión Analista |
| `EXPERIAN_QUERY_ERROR` | `'experian_query_error'` | Fallo técnico en consulta Experian |
| `AI_AGENT_ERROR` | `'ai_agent_error'` | Fallo técnico en comunicación con n8n |
| `IN_INTERVIEW` | `'in_interview'` | Agente AI requiere entrevista — en curso |
| `UNDER_REVIEW` | `'under_review'` | Pipeline completo — listo para revisión Analista (HITL) |
| `APPROVED_PENDING_SIGNATURE` | `'approved_pending_signature'` | Aprobado — en flujo de firma ⚠️ pendiente enum |
| `REJECTED` | `'rejected'` | Rechazado automáticamente por agente AI |

---

## Alertas a Google Chat

| Evento | Canal | Contenido |
|---|---|---|
| Coincidencia SARLAFT | Canal cumplimiento | Nombre, documento, ID solicitud, detalle coincidencia |
| Error Experian | Canal técnico | Nombre, ID solicitud, código de error |
| Error agente AI | Canal técnico | Nombre, ID solicitud, detalle del error |
| Solicitud `under_review` | Canal analistas en Google Chat | Nombre, partner, ID solicitud, enlace backoffice |

> **Nota:** Los errores de BDME y Rama Judicial NO generan alertas ya que se guardan en `web_queries.query_result` y el agente AI los interpreta.

---

## Criterios de Aceptación

- [ ] El pipeline se dispara automáticamente cuando `status = 'in_progress'`, tanto desde HU-01 como desde HU-05
- [ ] Duplicado se detecta por coincidencia en `doc_number`, `phone` o `email` en `persons` con solicitud activa existente
- [ ] Si hay duplicado, `status = 'duplicate'` y el pipeline se detiene
- [ ] SARLAFT se consulta **antes** que BDME, Rama Judicial y Experian
- [ ] Si hay coincidencia SARLAFT, se crea registro en `sarlaft_checks` con `has_match = true`, `status = 'alert'` o `'blocked'`, se actualiza `credit_applications.status = 'sarlaft_match'`, se envía alerta al canal de cumplimiento y el pipeline se detiene hasta decisión del Analista
- [ ] Si SARLAFT sale limpio, se crea registro en `sarlaft_checks` con `has_match = false`, `status = 'clean'` y continúa
- [ ] Si el Analista libera la solicitud desde el backoffice, el pipeline continúa desde BDME
- [ ] BDME siempre se ejecuta y guarda el resultado en `web_queries` con `query_type = 'bdme'`, sin importar si es exitoso o error
- [ ] Si BDME falla, el error se guarda en `query_result` como jsonb con estructura `{"status": "error", "error_message": "..."}` y el pipeline continúa
- [ ] Rama Judicial siempre se ejecuta y guarda el resultado en `web_queries` con `query_type = 'rama_judicial'`, sin importar si es exitoso o error
- [ ] Si Rama Judicial falla, el error se guarda en `query_result` como jsonb y el pipeline continúa
- [ ] Si Experian falla, se crea registro en `experian_queries` con `status = 'error'` y `error_message`, se actualiza `credit_applications.status = 'experian_query_error'` y se envía alerta técnica
- [ ] Si Experian es exitoso, se crea el registro en `experian_queries` con `query_type = 'hcpn'`, `credit_report` y `credit_score`, y se actualizan `persons.first_name` / `last_name`
- [ ] El payload enviado a n8n incluye todos los campos definidos + JSONs de SARLAFT, BDME y Rama Judicial en `data_sources` (incluyendo errores si los hubo)
- [ ] Si n8n falla, `status = 'ai_agent_error'` y se envía alerta técnica
- [ ] El resultado del agente AI se almacena en `ai_agent_analysis`
- [ ] Si el resultado es `interview`, n8n cambia el estado a `in_interview` y se envía el WhatsApp al cliente con la plantilla `platam_entrevista_pn`
- [ ] Tras la entrevista, el agente retorna el resultado final y el flujo continúa normalmente
- [ ] Si el resultado es `hitl`, `status = 'under_review'` y se notifica al equipo de analistas
- [ ] Si el resultado es `auto_approve` o `auto_reject`, el flujo pasa a HU-07
- [ ] Solo SARLAFT con coincidencia, Experian con error crítico, o el agente AI con error detienen el pipeline
- [ ] **[STUB]** El stub toma la decisión basada en el credit score de Experian (o `AI_AGENT_MOCK_RECOMMENDATION` si está definido) sin llamada HTTP externa
- [ ] **[STUB]** El stub nunca devuelve `interview` — ese criterio se validará con el agente real (FastAPI)
- [ ] El endpoint `POST /credit-applications/ai-result` existe y es funcional (preparado para la integración con FastAPI)

---

## ⚠️ Pendientes por Resolver (Fuera del Scope de Implementación Actual)

| Pendiente | Descripción | Bloqueante para |
|---|---|---|
| **Contrato FastAPI AI Agent** | URL, auth, formato request/response, sync vs async | `HttpFastApiAiAgentAdapter` |
| **Flujo `interview` completo** | Requiere agente real que conduzca la entrevista vía WhatsApp | Criterios de aceptación del flujo interview |
| **Template Twilio `platam_entrevista_pn`** | Registro en Twilio Console y obtención de Content SID | Envío de WhatsApp en flujo interview |
| **Reanudación post-SARLAFT** | Mecanismo por el cual el Analista libera la solicitud desde backoffice | Criterio de aceptación: "Si el Analista libera..." (HU-B07) |
