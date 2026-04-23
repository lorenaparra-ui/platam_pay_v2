# HU-07 — Procesos Backend PJ (Estudio Automatizado)

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Jurídica (PJ)  
**Canal:** Interno — proceso automatizado del backend  
**Última actualización:** Abril 2026  
**Estado:** En revisión

---

## Contexto

Al igual que en PN (HU-06), el pipeline PJ se dispara cuando una solicitud cambia a `in_progress`, ya sea desde self-service (HU-03) o desde la autorización del representante legal (HU-05).

El flujo PJ es más extenso que el PN por tres razones:
1. Se consulta SARLAFT del representante legal **y** de todos los accionistas.
2. Se consulta HCPN del accionista clave (no del representante legal por defecto).
3. Se consulta HCPJ (historial crediticio de la empresa como persona jurídica).

> **Responsable de implementación:** Freddy Candelo (backend NestJS) + Juan Pablo Chacón (agente AI en n8n).

---

## Historia de Usuario

**Como** sistema backend de Platam,  
**quiero** ejecutar automáticamente duplicados, SARLAFT de todos los involucrados, HCPN del accionista clave, HCPJ de la empresa y el análisis del agente AI,  
**para** dejar la solicitud lista para decisión — por el Analista, aprobación automática o rechazo automático.

---

## Trigger

```
credit_applications.status = 'in_progress'  (solicitud PJ)
→ Backend escucha el evento y dispara el pipeline
```

---

## Pipeline Completo

```
1. Verificación de duplicados
   ├── Sí: status = 'duplicate' → FIN
   └── No: continúa

2. SARLAFT — Representante Legal + todos los accionistas
   ├── Coincidencia en cualquiera: status = 'sarlaft_match' → Alerta cumplimiento → FIN
   └── Todos limpios: continúa

3. Consulta BDME — Representante Legal + Accionista Clave
   → Guarda resultado (exitoso o error) en web_queries → Continúa

4. Consulta Rama Judicial — Representante Legal + Accionista Clave
   → Guarda resultado (exitoso o error) en web_queries → Continúa

5. Determinar accionista clave para HCPN
   └── (ver lógica de selección abajo)

6. Consulta HCPN del accionista clave
   ├── Error: status = 'experian_query_error' → Alerta técnico → FIN
   └── OK: guarda en experian_queries + actualiza persons del accionista

7. Consulta HCPJ (empresa)
   ├── Error: status = 'hcpj_query_error' → Alerta técnico → FIN
   └── OK: guarda en experian_queries de la empresa

8. Migración de documentos a S3
   └── Cámara de comercio, RUT, declaración de renta, estados financieros

9. Envío al Agente AI (n8n)
   ├── Error: status = 'ai_agent_error' → Alerta técnico → FIN
   └── OK: guarda análisis en ai_agent_analysis

10. Resultado del Agente AI
   ├── HITL → status = 'under_review' → notificación al Analista por Google Chat
   ├── Aprobación automática → status = 'approved_pending_signature' → flujo contrato
   └── Rechazo automático → status = 'rejected' → flujo notificaciones rechazo
```

---

## Paso 1 — Verificación de Duplicados

Verifica coincidencia en `tax_id` del negocio (`businesses.tax_id`), o `phone` o `email` en `persons` del representante legal, con solicitud activa existente.

**Si es duplicado:**
```
credit_applications:
  status → CreditApplicationStatus.DUPLICATE ('duplicate')
```

---

## Paso 2 — SARLAFT Representante Legal + Accionistas

A diferencia del flujo PN, en PJ se consulta SARLAFT de múltiples personas:

**Personas a consultar:**
1. Representante legal → `persons` via `legal_representatives` donde `is_primary = true`
2. Todos los accionistas personas naturales → `persons` via `shareholders` donde `business_id` = negocio de la solicitud
3. Beneficiarios finales de accionistas empresa → `persons` via `shareholders` anidados

**Por cada persona consultada se crea un registro en `sarlaft_checks`:**
```
sarlaft_checks:
  credit_application_id → ID de la solicitud
  person_id             → ID de la persona consultada
  business_id           → ID de la empresa (para contexto PJ)
  has_match             → true o false
  status                → SarlaftCheckStatuses: 'clean' | 'alert' | 'blocked'
  consulted_at          → timestamp de la consulta
  sources               → jsonb con fuentes consultadas
  detail                → descripción si hay coincidencia
```

**Si hay coincidencia en cualquiera de ellos:**
```
credit_applications:
  status → CreditApplicationStatus.SARLAFT_MATCH ('sarlaft_match')
```
→ Alerta al canal de cumplimiento en Google Chat con: nombre de la empresa, ID solicitud, nombre del involucrado con coincidencia y detalle.

> El Analista revisa y decide desde el backoffice (Tab SARLAFT en HU-B07-PJ): rechazar o liberar para continuar con las consultas web y Experian.

---

## Paso 3 — Consulta BDME (Representante Legal + Accionista Clave)

Se consultan dos personas en BDME:
1. Representante legal (siempre)
2. Accionista clave (determinado en paso 5, pero se adelanta la consulta)

**Para cada persona consultada:**

**Si la consulta falla o presenta error:**
```
web_queries:
  credit_application_id → ID de la solicitud
  query_type            → WebQueryType.BDME ('bdme')
  person_id             → ID de la persona consultada (rep legal o accionista)
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

> **Nota importante:** Los errores en esta consulta NO detienen el pipeline.

---

## Paso 4 — Consulta Rama Judicial (Representante Legal + Accionista Clave)

Se consultan dos personas en Rama Judicial:
1. Representante legal (siempre)
2. Accionista clave

**Para cada persona consultada:**

**Si la consulta falla o presenta error:**
```
web_queries:
  credit_application_id → ID de la solicitud
  query_type            → WebQueryType.RAMA_JUDICIAL ('rama_judicial')
  person_id             → ID de la persona consultada
  consulted_at          → timestamp de la consulta
  query_result          → jsonb con estructura de error
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

> **Nota importante:** Los errores en esta consulta NO detienen el pipeline.

---

## Paso 5 — Determinación del Accionista Clave para HCPN

Se consulta el historial crediticio personal (HCPN) de una sola persona: el **accionista clave**. La lógica de selección es:

**Prioridad 1 — Representante legal si es accionista:**
```
¿Existe en shareholders un person_id cuyo doc_number coincide 
con el doc_number del legal_representative is_primary = true?
  → SÍ: usar ese person como accionista clave (role = LEGAL_REP)
  → NO: continuar con prioridad 2
```

**Prioridad 2 — Accionista con mayor participación:**
```
SELECT person_id FROM shareholders
WHERE business_id = {{business_id}}
ORDER BY ownership_percentage DESC
LIMIT 1
→ usar ese person como accionista clave (role = MAX_SHAREHOLDER)
```

El `role` (LEGAL_REP o MAX_SHAREHOLDER) y el `person_id` del accionista clave se usan en el payload a n8n.

---

## Paso 6 — Consulta HCPN del Accionista Clave

Se envía la consulta de Historia de Crédito Persona Natural a Experian usando los datos del accionista clave.

**Datos enviados:** `doc_type` + `doc_number` de `persons` del accionista clave.

**Si la consulta falla:**
```
-- 1. Registrar el error:
experian_queries:
  credit_application_id → ID de la solicitud
  person_id             → ID del accionista clave
  query_type            → ExperianQueryTypes.HCPN ('hcpn')
  consulted_at          → timestamp de la consulta
  status                → ExperianQueryStatus.ERROR ('error')
  error_message         → código/mensaje de error

-- 2. Actualizar solicitud:
credit_applications:
  status → CreditApplicationStatus.EXPERIAN_QUERY_ERROR ('experian_query_error')
```
→ Alerta al canal técnico en Google Chat.

**Si la consulta es exitosa:**
```
-- 1. Insertar en experian_queries:
experian_queries:
  credit_application_id → ID de la solicitud
  person_id             → ID del accionista clave
  query_type            → ExperianQueryTypes.HCPN ('hcpn')
  credit_report         → respuesta completa de Experian HCPN (jsonb)
  credit_score          → score extraído del reporte (si disponible)
  consulted_at          → timestamp de la consulta
  status                → ExperianQueryStatus.COMPLETED ('completed')

-- 2. Actualizar persons del accionista clave con nombre validado:
persons (accionista clave):
  first_name → nombre(s) retornados por Experian
  last_name  → apellidos retornados por Experian
```

---

## Paso 7 — Consulta HCPJ (Empresa)

Se consulta el historial crediticio de la empresa como persona jurídica en Experian.

**Datos enviados:** `tax_id` (NIT) de `businesses`.

**Si la consulta falla:**
```
-- 1. Registrar el error:
experian_queries:
  credit_application_id → ID de la solicitud
  business_id           → ID del negocio
  query_type            → ExperianQueryTypes.HCPJ ('hcpj')
  consulted_at          → timestamp de la consulta
  status                → ExperianQueryStatus.ERROR ('error')
  error_message         → código/mensaje de error

-- 2. Actualizar solicitud:
credit_applications:
  status → CreditApplicationStatus.HCPJ_QUERY_ERROR ('hcpj_query_error')
```
→ Alerta al canal técnico en Google Chat.

**Si la consulta es exitosa:**
```
experian_queries:
  credit_application_id → ID de la solicitud
  business_id           → ID del negocio
  query_type            → ExperianQueryTypes.HCPJ ('hcpj')
  credit_report         → respuesta completa de Experian HCPJ (jsonb)
  consulted_at          → timestamp de la consulta
  status                → ExperianQueryStatus.COMPLETED ('completed')
```

---

## Paso 8 — Migración de Documentos a S3

Solo aplica para estados financieros, subidos cuando `requested_credit_line > $10.000.000` (ver HU-03 / HU-04). Se pueden haber subido múltiples archivos — se migran todos.

| Documento | `document_type` en `documents` | Carpeta S3 |
|---|---|---|
| Estados financieros | `estados_financieros` | `ppay/pj_client_docs/{{tax_id}}/eeff/` |

Las URLs en `documents.document_url` se actualizan con la ruta S3 final.

---

## Paso 9 — Envío al Agente AI (n8n)

El backend envía el payload al webhook del agente PJ de n8n.

**Payload enviado a n8n:**
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
    "sarlaft_checks_json": "{{Array de sarlaft_checks.sources + detail de todos consultados}}",
    "bdme_rep_legal_json": "{{web_queries.query_result donde query_type='bdme' y person_id=rep_legal}}",
    "bdme_key_shareholder_json": "{{web_queries.query_result donde query_type='bdme' y person_id=accionista_clave}}",
    "rama_judicial_rep_legal_json": "{{web_queries.query_result donde query_type='rama_judicial' y person_id=rep_legal}}",
    "rama_judicial_key_shareholder_json": "{{web_queries.query_result donde query_type='rama_judicial' y person_id=accionista_clave}}",
    "hcpn_report_url": "{{URL S3 reporte HCPN accionista clave — desde experian_queries.credit_report}}",
    "hcpj_report_url": "{{URL S3 reporte HCPJ empresa — desde experian_queries.credit_report}}"
  },
  "documents": {
    "camara_comercio_url": "{{URL S3}}",
    "rut_url": "{{URL S3}}",
    "declaracion_renta_url": "{{URL S3}}",
    "estados_financieros_urls": ["{{URL S3}}", "..."]
  }
}
```

> **Nota:** Los JSONs de SARLAFT, BDME y Rama Judicial se envían completos. Los reportes Experian se envían como URLs a S3 (las URLs se generan a partir del campo `credit_report` en `experian_queries`, que almacena la respuesta completa de Experian en jsonb).

**Si n8n falla:**
```
credit_applications:
  status → CreditApplicationStatus.AI_AGENT_ERROR ('ai_agent_error')
```
→ Alerta al canal técnico en Google Chat.

---

## Paso 10 — Resultado del Agente AI

Idéntico al flujo PN (HU-06). n8n llama al endpoint del backend con:

```json
{
  "application_id": "{{external_id}}",
  "html_url_agent_analysis": "...",
  "json_agent_analysis": { ... },
  "agent_recommended_loc": 10000000,
  "agent_recomendation": "hitl | auto_approve | auto_reject"
}
```

**Se guarda en `ai_agent_analysis`:**
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

### `hitl` — Revisión por Analista

```
credit_applications:
  status → CreditApplicationStatus.UNDER_REVIEW ('under_review')
```
→ Notificación al canal de analistas en Google Chat: nombre empresa, partner, ID solicitud, enlace backoffice.

### `auto_approve` o `auto_reject`

```
-- auto_approve:
credit_applications:
  status → CreditApplicationStatus.APPROVED_PENDING_SIGNATURE ('approved_pending_signature')
  ⚠️ Valor pendiente en enum — ver SCHEMA_PENDIENTE_LORENA.md ítem 5
```

→ Flujo de contrato / notificaciones (historia por definir).

---

## Mapa de Estados de Este Pipeline

| Estado (`CreditApplicationStatus`) | Valor en BD | Descripción |
|---|---|---|
| `IN_PROGRESS` | `'in_progress'` | Trigger — pipeline iniciado |
| `DUPLICATE` | `'duplicate'` | Solicitud activa ya existe para esta empresa |
| `SARLAFT_MATCH` | `'sarlaft_match'` | Coincidencia en listas — pendiente decisión Analista |
| `EXPERIAN_QUERY_ERROR` | `'experian_query_error'` | Fallo en HCPN del accionista clave |
| `HCPJ_QUERY_ERROR` | `'hcpj_query_error'` | Fallo en consulta HCPJ de la empresa |
| `AI_AGENT_ERROR` | `'ai_agent_error'` | Fallo en comunicación con n8n |
| `UNDER_REVIEW` | `'under_review'` | Pipeline completo — listo para revisión Analista |
| `APPROVED_PENDING_SIGNATURE` | `'approved_pending_signature'` | Aprobado — en flujo de firma ⚠️ pendiente enum |
| `REJECTED` | `'rejected'` | Rechazado automáticamente |

---

## Alertas a Google Chat

| Evento | Canal | Contenido |
|---|---|---|
| Coincidencia SARLAFT | Canal cumplimiento | Nombre empresa, ID solicitud, nombre del involucrado, detalle coincidencia |
| Error HCPN | Canal técnico | Nombre empresa, ID solicitud, código de error |
| Error HCPJ | Canal técnico | Nombre empresa, ID solicitud, código de error |
| Error agente AI | Canal técnico | Nombre empresa, ID solicitud, detalle del error |
| Solicitud `under_review` | Canal analistas | Nombre empresa, partner, ID solicitud, enlace backoffice |

---

## Criterios de Aceptación

- [ ] El pipeline se dispara automáticamente cuando `status = 'in_progress'` en solicitudes PJ
- [ ] Duplicado se detecta por `tax_id` en `businesses`, `phone` o `email` en `persons` del representante legal con solicitud activa existente
- [ ] SARLAFT se consulta para el representante legal y **todos** los accionistas (personas naturales y beneficiarios finales)
- [ ] Se crea un registro en `sarlaft_checks` por cada persona consultada con `business_id` poblado y `status` usando `SarlaftCheckStatuses` (`clean`, `alert`, `blocked`)
- [ ] Si hay coincidencia SARLAFT en cualquier involucrado, `status = 'sarlaft_match'`, alerta al canal de cumplimiento y pipeline se detiene
- [ ] BDME se consulta para representante legal y accionista clave, guardando ambos resultados en `web_queries` con `query_type = 'bdme'`
- [ ] Si BDME falla para cualquiera, el error se guarda en `query_result` como jsonb y el pipeline continúa
- [ ] Rama Judicial se consulta para representante legal y accionista clave, guardando ambos resultados en `web_queries` con `query_type = 'rama_judicial'`
- [ ] Si Rama Judicial falla para cualquiera, el error se guarda en `query_result` como jsonb y el pipeline continúa
- [ ] El accionista clave para HCPN se determina: primero si el rep legal es accionista, si no el de mayor `ownership_percentage`
- [ ] Si Experian HCPN falla, se registra en `experian_queries` con `status = 'error'`, `credit_applications.status = 'experian_query_error'` y alerta técnica
- [ ] Si Experian HCPN es exitoso, se crea el registro en `experian_queries` con `query_type = 'hcpn'` y se actualiza `persons` del accionista clave
- [ ] Si Experian HCPJ falla, se registra en `experian_queries` con `status = 'error'`, `credit_applications.status = 'hcpj_query_error'` y alerta técnica
- [ ] Si Experian HCPJ es exitoso, se crea el registro en `experian_queries` con `query_type = 'hcpj'` y `business_id` poblado
- [ ] Los documentos se migran a S3 y las URLs en `documents.document_url` se actualizan
- [ ] El payload a n8n incluye todos los campos definidos en `data_sources`: SARLAFT de todos, BDME y Rama Judicial del rep legal y accionista clave, URLs de reportes Experian
- [ ] Si n8n falla, `status = 'ai_agent_error'` y alerta técnica
- [ ] El resultado del agente se guarda en `ai_agent_analysis`
- [ ] Si resultado es `hitl`, `status = 'under_review'` y notificación al canal de analistas en Google Chat
- [ ] Si resultado es `auto_approve`, `status = 'approved_pending_signature'` y flujo pasa a historia de contratos
- [ ] Si resultado es `auto_reject`, `status = 'rejected'` y flujo pasa a historia de rechazo
- [ ] Solo SARLAFT con coincidencia, Experian (HCPN/HCPJ) con error crítico, o n8n con error detienen el pipeline
