# HU-06 — Procesos Backend PN (Estudio Automatizado)

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Natural (PN)  
**Canal:** Interno — proceso automatizado del backend  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Contexto

El pipeline de estudio automatizado se dispara en dos escenarios:

1. **Self-service (HU-01):** el cliente envía el formulario con `privacy_policy_accepted = true` → status pasa directamente a `en_proceso`.
2. **Registro por SR (HU-02):** el cliente autoriza desde HU-05 → status cambia de `pendiente_autorizacion` a `en_proceso`.

El resultado de este pipeline es una solicitud en uno de estos tres estados finales:
- `en_estudio` — lista para revisión del Analista (HITL)
- `aprobado_en_firma` — aprobación automática por el agente AI → contrato generado (se detalla en historia por definir)
- `rechazado` — rechazo automático por el agente AI → notificaciones al cliente (se detalla en historia siguiente)

Los estados de error detienen el pipeline y requieren intervención del equipo técnico o de cumplimiento.

> **Responsable de implementación:** Freddy Candelo (backend NestJS) + Juan Pablo Chacón (agente AI en n8n).

---

## Historia de Usuario

**Como** sistema backend de Platam,  
**quiero** ejecutar automáticamente la verificación de duplicados, SARLAFT, Experian y el análisis del agente AI al recibir una solicitud autorizada,  
**para** dejar la solicitud lista para decisión — ya sea por el Analista, aprobación automática o rechazo automático.

---

## Trigger

```
credit_applications.status_id = en_proceso
→ Backend escucha el evento y dispara el pipeline
```

---

## Pipeline Completo

```
1. Verificación de duplicados
   ├── Sí: status = duplicado → FIN
   └── No: continúa

2. Consulta SARLAFT
   ├── Coincidencia: status = coincidencia_sarlaft → Alerta cumplimiento → FIN (pendiente analista)
   └── Limpio: continúa

3. Consulta Experian (HCPN)
   ├── Error: status = error_consulta_experian → Alerta técnico → FIN
   └── OK: guarda credit_report + actualiza persons

4. Envío al Agente AI (n8n)
   ├── Error: status = error_agente_ai → Alerta técnico → FIN
   └── OK: guarda análisis en ai_agent_analysis

5. Resultado del Agente AI
   ├── Requiere entrevista → status = en_entrevista → WhatsApp al cliente → n8n hace entrevista → vuelve al paso 5
   ├── HITL → status = en_estudio → notificación al Analista
   ├── Aprobación automática → flujo contrato (HU-07)
   └── Rechazo automático → flujo notificaciones rechazo (HU-07)
```

---

## Paso 1 — Verificación de Duplicados

El sistema verifica si ya existe una solicitud activa para el mismo cliente en el producto BNPL.

**Criterios de duplicado** (cualquiera de los tres):
- Mismo `doc_number` en `persons`
- Mismo `phone` en `users`
- Mismo `email` en `users`

…con una solicitud en `credit_applications` en estado diferente a `rechazado` o `duplicado`.

**Si es duplicado:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'duplicado')
```

> El manejo de duplicados (rescate, fusión o descarte) se gestiona en un flujo separado — pendiente de definir.

---

## Paso 2 — Consulta SARLAFT

Se verifica al solicitante contra listas restrictivas y fuentes gubernamentales **antes** de consumir Experian, ya que tiene costo por consulta.

**Si hay coincidencia en listas:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'coincidencia_sarlaft')
```
→ Se envía alerta al canal de cumplimiento en Google Chat con: nombre, documento, ID solicitud y detalle de la coincidencia.

> El Analista revisa la coincidencia y toma una de dos acciones desde el backoffice:
> - **Rechazar:** envía notificación de rechazo al cliente y cierra la solicitud.
> - **Continuar:** libera el flujo para que avance a la consulta Experian.
>
> Este flujo de decisión del Analista sobre SARLAFT se detalla en la épica de backoffice.

**Si sale limpio:** continúa al paso 3.

---

## Paso 3 — Consulta Experian (HCPN)

Se envía la consulta de Historia de Crédito Persona Natural a Experian.

**Datos enviados:** `doc_type` + `doc_number` de `persons`.

**Si la consulta falla:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'error_consulta_experian')
  -- Se almacena el código de error retornado por Experian
```
→ Se envía alerta al canal técnico en Google Chat.

**Si la consulta es exitosa:**
```
-- 1. Insertar en credit_reports:
credit_reports:
  user_id          → de la solicitud
  person_id        → de la solicitud
  application_id   → ID de la solicitud
  report_date      → fecha de la consulta
  bureau_name      → 'experian'
  full_report_json → respuesta completa de Experian

-- 2. Actualizar persons con el nombre validado por Experian:
persons:
  first_name → nombre(s) retornados por Experian
  last_name  → apellidos retornados por Experian
```

> El nombre retornado por Experian es la fuente de verdad para el estudio crediticio.

---

## Paso 4 — Envío al Agente AI (n8n)

El backend envía un payload al webhook del agente AI de n8n con toda la información recopilada.

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
  "credit_report_url": "{{URL del reporte Experian en S3}}"
}
```

**Si n8n falla o no responde:**
```
credit_applications:
  status_id → get_status_id('credit_applications', 'error_agente_ai')
```
→ Se envía alerta al canal técnico en Google Chat.

---

## Paso 5 — Resultado del Agente AI

n8n procesa la solicitud y llama a un endpoint del backend con el resultado. El agente puede retornar cuatro resultados posibles.

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
  application_id              → ID de la solicitud
  html_url_agent_analysis     → del resultado
  json_agent_analysis         → del resultado
  agent_analysis_timestamptz  → timestamp de recepción
  agent_recommended_loc       → del resultado
  agent_recomendation         → del resultado
```

---

### Resultado: `interview` — Requiere entrevista

El agente n8n consume directamente el endpoint de cambio de estado:

```
credit_applications:
  status_id → get_status_id('credit_applications', 'en_entrevista')
```

Se envía el siguiente mensaje de WhatsApp al cliente vía Twilio:

**Plantilla:** `platam_entrevista_pn`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` |
| `{{2}}` | Número de teléfono del agente AI de n8n (configurable) |

> 🚀 ¡Hola {{1}}! Para continuar con tu solicitud de crédito en Platam Pay necesitamos validar algunos datos adicionales.
>
> 📞 En los próximos 2 minutos recibirás una llamada desde el número {{2}} de nuestro equipo para validar datos de tu solicitud y continuar con tu proceso de evaluación.
>
> ⏰ La llamada será breve (2-5 min) y es necesaria para avanzar con tu solicitud. Si no puedes contestar ahora, te volvemos a llamar en 1 hora.
>
> ¡Gracias por tu tiempo!  
> Platam

El agente AI de n8n conduce la entrevista y, al finalizarla, retorna el resultado al mismo endpoint del paso 5 con `agent_recomendation` actualizado (`hitl`, `auto_approve` o `auto_reject`). El flujo continúa desde ahí.

---

### Resultado: `hitl` — Revisión por Analista

```
credit_applications:
  status_id → get_status_id('credit_applications', 'en_estudio')
```

→ Se notifica al equipo de Analistas por Google Chat: nombre del cliente, partner, ID solicitud, enlace al backoffice.

---

### Resultado: `auto_approve` o `auto_reject`

→ El flujo continúa en **HU-07** (aprobación/rechazo automático, generación de contrato y notificaciones).

---

## Mapa de Estados de Este Pipeline

| Estado | Descripción |
|---|---|
| `en_proceso` | Trigger — pipeline iniciado |
| `duplicado` | Solicitud activa ya existe para este cliente |
| `coincidencia_sarlaft` | Cliente en lista restrictiva — pendiente decisión Analista |
| `error_consulta_experian` | Fallo técnico en consulta Experian |
| `error_agente_ai` | Fallo técnico en comunicación con n8n |
| `en_entrevista` | Agente AI requiere entrevista — en curso |
| `en_estudio` | Pipeline completo — listo para revisión Analista (HITL) |

---

## Alertas a Google Chat

| Evento | Canal | Contenido |
|---|---|---|
| Coincidencia SARLAFT | Canal cumplimiento | Nombre, documento, ID solicitud, detalle coincidencia |
| Error Experian | Canal técnico | Nombre, ID solicitud, código de error |
| Error agente AI | Canal técnico | Nombre, ID solicitud, detalle del error |
| Solicitud `en_estudio` | Canal analistas en Google Chat | Nombre, partner, ID solicitud, enlace backoffice |

---

## Nota de Schema — Cambios Pendientes

> ⚠️ Los nuevos estados requieren registros en `statuses`:
>
> ```
> entity_type = 'credit_applications'
> códigos a agregar (verificar cuáles ya existen en el seed):
>   - duplicado
>   - coincidencia_sarlaft
>   - error_consulta_experian
>   - error_agente_ai
>   - en_entrevista
>   - en_estudio
>   - aprobado_en_firma    ← se usa en HU-07
>   - rechazado            ← se usa en HU-07
> ```

---

## Criterios de Aceptación

- [ ] El pipeline se dispara automáticamente cuando `status_id = en_proceso`, tanto desde HU-01 como desde HU-05
- [ ] Duplicado se detecta por coincidencia en `doc_number`, `phone` o `email` con solicitud activa existente
- [ ] Si hay duplicado, `status_id = duplicado` y el pipeline se detiene
- [ ] SARLAFT se consulta **antes** que Experian
- [ ] Si hay coincidencia SARLAFT, `status_id = coincidencia_sarlaft`, se envía alerta al canal de cumplimiento y el pipeline se detiene hasta decisión del Analista
- [ ] Si el Analista libera la solicitud desde el backoffice, el pipeline continúa desde Experian
- [ ] Si Experian falla, `status_id = error_consulta_experian`, se almacena el código de error y se envía alerta técnica
- [ ] Si Experian es exitoso, se crea el registro en `credit_reports` y se actualizan `persons.first_name` / `last_name`
- [ ] El payload enviado a n8n incluye todos los campos definidos
- [ ] Si n8n falla, `status_id = error_agente_ai` y se envía alerta técnica
- [ ] El resultado del agente AI se almacena en `ai_agent_analysis`
- [ ] Si el resultado es `interview`, n8n cambia el estado a `en_entrevista` y se envía el WhatsApp al cliente con la plantilla `platam_entrevista_pn`
- [ ] Tras la entrevista, el agente retorna el resultado final y el flujo continúa normalmente
- [ ] Si el resultado es `hitl`, `status_id = en_estudio` y se notifica al equipo de analistas
- [ ] Si el resultado es `auto_approve` o `auto_reject`, el flujo pasa a HU-07
- [ ] Ningún paso avanza si el paso anterior falló o está pendiente de resolución
