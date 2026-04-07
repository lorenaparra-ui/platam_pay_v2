# HU-07 — Procesos Backend PJ (Estudio Automatizado)

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Jurídica (PJ)  
**Canal:** Interno — proceso automatizado del backend  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Contexto

Al igual que en PN (HU-06), el pipeline PJ se dispara cuando una solicitud cambia a `en_proceso`, ya sea desde self-service (HU-03) o desde la autorización del representante legal (HU-05).

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
credit_applications.status_id = en_proceso  (solicitud PJ)
→ Backend escucha el evento y dispara el pipeline
```

---

## Pipeline Completo

```
1. Verificación de duplicados
   ├── Sí: status = duplicado → FIN
   └── No: continúa

2. SARLAFT — Representante Legal + todos los accionistas
   ├── Coincidencia en cualquiera: status = coincidencia_sarlaft → Alerta cumplimiento → FIN
   └── Todos limpios: continúa

3. Determinar accionista clave para HCPN
   └── (ver lógica de selección abajo)

4. Consulta HCPN del accionista clave
   ├── Error: status = error_consulta_experian → Alerta técnico → FIN
   └── OK: guarda credit_report + actualiza persons del accionista

5. Consulta HCPJ (empresa)
   ├── Error: status = error_consulta_hcpj → Alerta técnico → FIN
   └── OK: guarda credit_report de la empresa

6. Migración de documentos a S3
   └── Cámara de comercio, RUT, declaración de renta, estados financieros

7. Envío al Agente AI (n8n)
   ├── Error: status = error_agente_ai → Alerta técnico → FIN
   └── OK: guarda análisis en ai_agent_analysis

8. Resultado del Agente AI
   ├── HITL → status = en_estudio → notificación al Analista por Google Chat
   ├── Aprobación automática → flujo contrato (historia por definir)
   └── Rechazo automático → flujo notificaciones rechazo (historia por definir)
```

---

## Paso 1 — Verificación de Duplicados

Igual que en PN. Verifica coincidencia en `doc_number` de la empresa (`businesses.tax_id`), `phone` o `email` en `users` con solicitud activa existente.

**Si es duplicado:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'duplicado')
```

---

## Paso 2 — SARLAFT Representante Legal + Accionistas

A diferencia del flujo PN, en PJ se consulta SARLAFT de múltiples personas:

**Personas a consultar:**
1. Representante legal → `persons` via `legal_representatives` donde `is_primary = true`
2. Todos los accionistas personas naturales → `persons` via `shareholders` donde `business_id` = negocio de la solicitud
3. Beneficiarios finales de accionistas empresa → `persons` via `shareholders` anidados

**Si hay coincidencia en cualquiera de ellos:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'coincidencia_sarlaft')
```
→ Alerta al canal de cumplimiento en Google Chat con: nombre de la empresa, ID solicitud, nombre del involucrado con coincidencia y detalle.

> El Analista revisa y decide desde el backoffice: rechazar o liberar para continuar con Experian.

---

## Paso 3 — Determinación del Accionista Clave para HCPN

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

> Esta lógica traduce la query del MVP a la nueva estructura de datos. El resultado se usa en el paso 4.

El `role` (LEGAL_REP o MAX_SHAREHOLDER) y el `person_id` del accionista clave se usan en el payload a n8n.

---

## Paso 4 — Consulta HCPN del Accionista Clave

Se envía la consulta de Historia de Crédito Persona Natural a Experian usando los datos del accionista clave determinado en el paso anterior.

**Datos enviados:** `doc_type` + `doc_number` de `persons` del accionista clave.

**Si la consulta falla:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'error_consulta_experian')
```
→ Alerta al canal técnico en Google Chat.

**Si la consulta es exitosa:**
```
-- 1. Insertar en credit_reports:
credit_reports:
  user_id          → user_id de la solicitud (empresa)
  person_id        → person_id del accionista clave
  application_id   → ID de la solicitud
  report_date      → fecha de la consulta
  bureau_name      → 'experian_hcpn'
  full_report_json → respuesta completa de Experian

-- 2. Actualizar persons del accionista clave con nombre validado:
persons (accionista clave):
  first_name → nombre(s) retornados por Experian
  last_name  → apellidos retornados por Experian
```

---

## Paso 5 — Consulta HCPJ (Empresa)

Se consulta el historial crediticio de la empresa como persona jurídica en Experian.

**Datos enviados:** `tax_id` (NIT) de `businesses`.

**Si la consulta falla:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'error_consulta_hcpj')
```
→ Alerta al canal técnico en Google Chat.

**Si la consulta es exitosa:**
```
credit_reports:
  user_id          → user_id de la solicitud
  business_id      → ID del negocio
  application_id   → ID de la solicitud
  report_date      → fecha de la consulta
  bureau_name      → 'experian_hcpj'
  full_report_json → respuesta completa de Experian HCPJ
```

---

## Paso 6 — Migración de Documentos a S3

Solo aplica para estados financieros, subidos cuando `requested_credit_line > $10.000.000` (ver HU-03 / HU-04). Se pueden haber subido múltiples archivos — se migran todos.

| Documento | Tipo en `documents` | Carpeta S3 |
|---|---|---|
| Estados financieros | `estados_financieros` | `ppay/pj_client_docs/{{tax_id}}/eeff/` |

Las URLs en `documents` se actualizan con la ruta S3 final.

---

## Paso 7 — Envío al Agente AI (n8n)

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
  "documents": {
    "hcpn_report_url": "{{URL S3 reporte HCPN accionista clave}}",
    "hcpj_report_url": "{{URL S3 reporte HCPJ empresa}}",
    "camara_comercio_url": "{{URL S3}}",
    "rut_url": "{{URL S3}}",
    "declaracion_renta_url": "{{URL S3}}",
    "estados_financieros_urls": ["{{URL S3}}", "..."]
  }
}
```

**Si n8n falla:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'error_agente_ai')
```
→ Alerta al canal técnico en Google Chat.

---

## Paso 8 — Resultado del Agente AI

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

Se guarda en `ai_agent_analysis` igual que en PN.

### `hitl` — Revisión por Analista

```
credit_applications:
  status_id → get_status_id('credit_applications', 'en_estudio')
```
→ Notificación al canal de analistas en Google Chat: nombre empresa, partner, ID solicitud, enlace backoffice.

### `auto_approve` o `auto_reject`

→ Flujo de contrato / notificaciones (historia por definir).

---

## Mapa de Estados de Este Pipeline

| Estado | Descripción |
|---|---|
| `en_proceso` | Trigger — pipeline iniciado |
| `duplicado` | Solicitud activa ya existe para esta empresa |
| `coincidencia_sarlaft` | Coincidencia en listas — pendiente decisión Analista |
| `error_consulta_experian` | Fallo en HCPN del accionista clave |
| `error_consulta_hcpj` | Fallo en consulta HCPJ de la empresa |
| `error_agente_ai` | Fallo en comunicación con n8n |
| `en_estudio` | Pipeline completo — listo para revisión Analista |

---

## Alertas a Google Chat

| Evento | Canal | Contenido |
|---|---|---|
| Coincidencia SARLAFT | Canal cumplimiento | Nombre empresa, ID solicitud, nombre del involucrado, detalle coincidencia |
| Error HCPN | Canal técnico | Nombre empresa, ID solicitud, código de error |
| Error HCPJ | Canal técnico | Nombre empresa, ID solicitud, código de error |
| Error agente AI | Canal técnico | Nombre empresa, ID solicitud, detalle del error |
| Solicitud `en_estudio` | Canal analistas | Nombre empresa, partner, ID solicitud, enlace backoffice |

---

## Nota de Schema — Cambios Pendientes

> ⚠️ Nuevo estado específico de PJ:
> ```
> entity_type = 'credit_applications'
> código a agregar:
>   - error_consulta_hcpj
> ```
>
> El campo `bureau_name` en `credit_reports` debe soportar al menos:
> `'experian_hcpn'` y `'experian_hcpj'` para distinguir los dos tipos de reporte.
>
> Verificar con Freddy si se agrega un campo `report_type` o si `bureau_name` es suficiente.

---

## Criterios de Aceptación

- [ ] El pipeline se dispara automáticamente cuando `status_id = en_proceso` en solicitudes PJ
- [ ] Duplicado se detecta por `tax_id` en `businesses`, `phone` o `email` en `users`
- [ ] SARLAFT se consulta para el representante legal y **todos** los accionistas (personas naturales y beneficiarios finales)
- [ ] Si hay coincidencia SARLAFT en cualquier involucrado, `status_id = coincidencia_sarlaft`, alerta al canal de cumplimiento y pipeline se detiene
- [ ] El accionista clave para HCPN se determina: primero si el rep legal es accionista, si no el de mayor `ownership_percentage`
- [ ] Si Experian HCPN falla, `status_id = error_consulta_experian` y alerta técnica
- [ ] Si Experian HCPN es exitoso, se crea el registro en `credit_reports` con `bureau_name = 'experian_hcpn'` y se actualiza `persons` del accionista clave
- [ ] Si Experian HCPJ falla, `status_id = error_consulta_hcpj` y alerta técnica
- [ ] Si Experian HCPJ es exitoso, se crea el registro en `credit_reports` con `bureau_name = 'experian_hcpj'`
- [ ] Los documentos se migran a S3 y las URLs en `documents` se actualizan
- [ ] El payload a n8n incluye todos los campos definidos, incluyendo el `key_shareholder` con su `role`
- [ ] Si n8n falla, `status_id = error_agente_ai` y alerta técnica
- [ ] El resultado del agente se guarda en `ai_agent_analysis`
- [ ] Si resultado es `hitl`, `status_id = en_estudio` y notificación al canal de analistas en Google Chat
- [ ] Si resultado es `auto_approve` o `auto_reject`, flujo pasa a historia de contratos/rechazo
- [ ] Ningún paso avanza si el anterior falló o está pendiente de resolución
ENDOFFILE