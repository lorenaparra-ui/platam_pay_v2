# Plan de Ejecución — HU-05: Autorización del Cliente

> **Creado:** 2026-04-20  
> **Última actualización:** 2026-04-21 — diagnóstico post-implementación  
> **Scope:** BE (`platam_pay_v2 · feature/HU-05-Auth-Client`) + FE (`platam_pay_v2_frontend · feature/HU-01-solicitud-credito-pn`)  
> **Referencia base:** `.ai/context/onboarding-module-prerequisites.md` (2026-04-19)  
> **User story:** `.ai/user-stories/HU-05___Autorizacion_del_Cliente.md`

---

## Decisiones Resueltas

| ID | Decisión | Resolución |
|---|---|---|
| **B** | Estrategia de scheduling para recordatorios T+24h y T+48h | ✅ **AWS EventBridge Scheduler** — 4 schedules por solicitud (WA + email × 2 tiempos); cancelables por nombre; `ActionAfterCompletion.DELETE`. |
| **C-01** | Estado de la solicitud después de que el cliente autoriza | ✅ **`in_progress`** — `AuthorizeCreditApplicationUseCase` actualiza status + `privacy_policy_accepted = true` + `privacy_policy_date`. |
| **C-02** | Orden variables `{{2}}`/`{{3}}` en plantillas PJ | ✅ **Confirmado**: inicial PJ = `{{2}}=partnerName, {{3}}=businessLegalName`; recordatorios PJ = `{{2}}=businessLegalName, {{3}}=partnerName` (según HU-05 §§ 7.4/7.6). |
| **C-04** | Cómo llega `external_id` al webhook de Twilio | ✅ **Variable `{{4}}`** en el campo `id` del botón (Quick Reply o URL suffix). Los templates registrados son tipo "Call to action" → autorización llega por URL al frontend; webhook como canal alternativo. |

---

## Infraestructura Operativa — COMPLETADA ✅

| Recurso | Estado | Detalle |
|---|---|---|
| 6 plantillas Twilio WhatsApp | ✅ Registradas | `platam_autorizacion_pn/pj`, `platam_recordatorio_1/2_pn/pj` — tipo Call to action, idioma Spanish |
| Content SIDs cargados en `.env` | ✅ | `TWILIO_TEMPLATE_*` — 6 variables con valores `HXxxx` reales |
| Cola SQS `notifications-inbound` | ✅ Creada | `https://sqs.us-east-2.amazonaws.com/603033204672/notifications-inbound` |
| `NOTIFICATIONS_SQS_INBOUND_QUEUE_URL` | ✅ | Configurado en `.env` |
| `APP_BASE_URL` | ✅ | `https://platampay.com` |
| EventBridge Schedule Group | ✅ Creado | `platam-auth-reminders` (us-east-2) |
| IAM Role EventBridge | ✅ Creado | `platam-scheduler-role` con policy `sqs:SendMessage` → notifications-inbound |
| Variables EventBridge en `.env` | ✅ | `EVENTBRIDGE_SCHEDULER_ROLE_ARN`, `EVENTBRIDGE_SCHEDULER_GROUP_NAME`, `EVENTBRIDGE_SCHEDULER_TARGET_ARN` |

---

## Diagnóstico de Implementación — 2026-04-21

### Estado de archivos implementados (28/28 existen)

| Bloque | Archivo | Estado |
|---|---|---|
| **notifications-ms** | `notification-channel.enum.ts` — `whatsapp_template` añadido | ✅ |
| **notifications-ms** | `twilio-messaging.port.ts` — `send_whatsapp_template()` + `TwilioWhatsappTemplateSendRequest` | ✅ |
| **notifications-ms** | `twilio-messaging.adapter.ts` — implementa `send_whatsapp_template` con `contentSid` + `contentVariables` | ✅ |
| **notifications-ms** | `send-notification-payload.dto.ts` — `WhatsappTemplateNotificationPayloadDto` | ✅ |
| **notifications-ms** | `dispatch-notification.use-case.ts` — case `whatsapp_template` | ✅ |
| **notifications-ms** | `ingest-notification-sqs-message.use-case.ts` — valida `whatsapp_template` | ✅ |
| **products-ms** | `reminder-scheduler.port.ts` — `ReminderSchedulerPort`, `ScheduleReminderParams` | ✅ |
| **products-ms** | `credit-applications.tokens.ts` — `REMINDER_SCHEDULER_PORT` | ✅ |
| **products-ms** | `eventbridge-scheduler.adapter.ts` — `schedule_reminder()`, `cancel_reminders()` | ✅ |
| **products-ms** | `infrastructure.module.ts` — `EventBridgeSchedulerAdapter` registrado | ✅ |
| **products-ms** | `publish-authorization-notification.use-case.ts` — T+0 WA+email; 4 schedules EventBridge | ✅ |
| **products-ms** | `publish-authorization-notification.command.ts` — interface + `CreditApplicationClientType` | ✅ |
| **products-ms** | `register-client-credit-application.use-case.ts` — llama publisher si `PENDING_AUTHORIZATION` | ✅ |
| **products-ms** | `register-client-credit-application.request.ts` — nuevos params al final: `status?`, `partnerName?`, `clientType?`, `businessLegalName?` | ✅ |
| **products-ms** | `get-credit-application-authorization-data.use-case.ts` | ✅ |
| **products-ms** | `authorize-credit-application.use-case.ts` — actualiza status + cancela EventBridge | ✅ |
| **products-ms** | `credit-applications-authorize.controller.ts` — GET + POST sin JWT | ✅ |
| **products-ms** | `twilio-webhook.controller.ts` — valida `X-Twilio-Signature`, extrae `ButtonPayload` | ✅ |
| **products-ms** | `authorization-data-response.dto.ts` | ✅ |
| **products-ms** | `authorize-result-response.dto.ts` | ✅ |
| **products-ms** | `credit-applications.module.ts` — controllers registrados | ✅ |
| **products-ms** | `create-credit-application.dto.ts` — `privacyPolicyAccepted` (Fix B4) | ✅ |
| **Frontend** | `app/auth/layout.tsx` — layout sin auth guards | ✅ |
| **Frontend** | `app/auth/[externalId]/page.tsx` — 4 estados | ✅ |
| **Frontend** | `app/auth/[externalId]/loading.tsx` | ✅ |
| **Frontend** | `features/auth-landing/components/PendingAuthorizationCard.tsx` | ✅ |
| **Frontend** | `features/auth-landing/components/ConfirmedCard.tsx` | ✅ |
| **Frontend** | `features/auth-landing/components/AlreadyAuthorizedCard.tsx` | ✅ |
| **Frontend** | `features/auth-landing/components/InvalidLinkCard.tsx` | ✅ |
| **Frontend** | `features/products/services/credit-applications.ts` — `getAuthorizationData()` + `authorize()` | ✅ |

---

## Bugs Resueltos — 2026-04-21

### ✅ BUG-1 — Config key incorrecta en TwilioWebhookController

**Archivo:** `apps/products-ms/src/modules/credit-applications/presentation/controllers/twilio-webhook.controller.ts`

**Problema:** Leía `config_service.get<string>('notifications.twilio_auth_token')` — namespace inexistente → siempre `undefined` → excepción en cada webhook.

**Fix aplicado:** Cambiado a `process.env.TWILIO_AUTH_TOKEN`. `ConfigService` eliminado del constructor. `tsc --noEmit` limpio.

---

### ✅ BUG-2 — Variables WA PJ incorrectas para plantillas de recordatorio

**Archivo:** `apps/products-ms/src/modules/credit-applications/application/use-cases/publish-authorization-notification/publish-authorization-notification.use-case.ts`

**Problema:** `build_wa_variables()` usaba el mismo orden para todos los PJ (`{{2}}=partnerName, {{3}}=businessLegalName`), pero `platam_recordatorio_1/2_pj` esperan orden invertido.

**Fix aplicado:** Tres helpers privados separados:
- `build_wa_variables_pn()` — PN todas las plantillas
- `build_wa_initial_variables_pj()` — PJ inicial: `{{2}}=partnerName, {{3}}=businessLegalName`
- `build_wa_reminder_variables_pj()` — PJ recordatorios: `{{2}}=businessLegalName, {{3}}=partnerName`

`build_wa_reminder_payload()` usa el helper correcto según `client_type`. `tsc --noEmit` limpio.

---

### 🟠 PENDING-1 — Falta endpoint SR que dispare el flujo HU-05

**Contexto:** `RegisterClientCreditApplicationUseCase` tiene los nuevos parámetros opcionales (`status`, `partnerName`, `clientType`, `businessLegalName`) y llama a `PublishAuthorizationNotificationUseCase` si `status = PENDING_AUTHORIZATION`. Pero ningún controller del flujo SR (HU-02 / HU-04) pasa estos parámetros.

**Impacto:** El flujo completo de HU-05 nunca se dispara en producción. Los mensajes WhatsApp + email + EventBridge schedules no se crean.

**Lo que falta:** El controller SR (registro por representante) debe:
1. Pasar `status: CreditApplicationStatus.PENDING_AUTHORIZATION`
2. Resolver y pasar `partnerName` (del partner asociado al SR)
3. Pasar `clientType: 'pn' | 'pj'` según el tipo de persona
4. Pasar `businessLegalName` para PJ

---

### 🟡 MINOR-1 — Email recordatorios no diferencia PN/PJ

**Archivo:** `publish-authorization-notification.use-case.ts` — `build_email_reminder_payload()`

**Problema:** Usa el mismo HTML para PN y PJ. HU-05 define contenido diferente para PJ (menciona razón social y rol de representante legal). No bloquea el flujo pero el email PJ pierde contexto.

---

### ✅ MINOR-2 — `from_override` en emails de recordatorio — Resuelto por configuración

`NOTIFICATIONS_EMAIL_FROM=Platam <noresponder@mail.platam.co>` configurado en `.env`. El `ResendEmailAdapter` usa este valor como `from` por defecto cuando el mensaje no incluye `from_override`. Todos los emails (inicial + recordatorios) salen con el remitente correcto.

Adicionalmente: `reply_to: 'info@platam.co'` agregado directamente en `resend-email.adapter.ts` (ambas ramas HTML y texto plano).

---

### 🟡 MINOR-3 — Tipo de botón "Autorizar Consulta" en templates Twilio

**Contexto:** Los 6 templates fueron registrados como "Call to action" (URL buttons). El `TwilioWebhookController` espera `ButtonPayload` que solo llega con Quick Reply buttons.

**Estado real del flujo de autorización WhatsApp:**
- El cliente pulsa "Autorizar Consulta" → abre URL → frontend landing `/auth/[externalId]` → llama `POST /credit-applications/authorize/:externalId`
- El webhook (`POST /webhooks/twilio/whatsapp`) **no se dispara** con este tipo de template

**Verificar:** Confirmar que el botón "Autorizar Consulta" en los templates tiene la URL `https://platampay.com/auth/` + variable `{{4}}` (sufijo dinámico). Si no, el botón no pasa el `external_id` al frontend.

**Impacto en webhook controller:** El `TwilioWebhookController` queda como dead code para el flujo actual. Puede mantenerse como canal alternativo si en el futuro se migra a Quick Reply, o eliminarse si se confirma que no se usará.

---

## Estado por Criterio de Aceptación HU-05

| # | Criterio HU-05 | Estado |
|---|---|---|
| 1 | Al crear CR vía SR (HU-02/HU-04) se envían WhatsApp + correo simultáneamente | ⚠️ Código listo — falta endpoint SR (PASO 3) |
| 2 | Plantilla correcta según tipo PN/PJ | ✅ PN y PJ inicial correctos; PJ recordatorios corregidos (BUG-2 ✅) |
| 3 | Email usa `from: Platam <noresponder@mail.platam.co>` y `reply_to: info@platam.co` | ✅ `NOTIFICATIONS_EMAIL_FROM` configurado; `reply_to` en adapter |
| 4 | Botón "Autorizar Consulta" WhatsApp → `external_id` llega al backend | ⚠️ Templates son Call to action (URL) — flujo va por frontend landing; verificar URL del botón (PASO 4) |
| 5 | Enlace del correo usa `external_id` sin token adicional | ✅ `APP_BASE_URL/auth/{externalId}` |
| 6 | Sin autorización a 24h → recordatorio 1 (WhatsApp + correo) | ✅ EventBridge schedule T+24h |
| 7 | Sin autorización a 48h → recordatorio 2 (WhatsApp + correo) | ✅ EventBridge schedule T+48h |
| 8 | Recordatorios se cancelan si el cliente autoriza antes | ✅ `cancel_reminders()` en `AuthorizeCreditApplicationUseCase` |
| 9 | Sin más recordatorios automáticos tras recordatorio 2 | ✅ `ActionAfterCompletion.DELETE`; solo 2 schedules por solicitud |
| 10 | Al autorizar: `privacy_policy_accepted=true` + `privacy_policy_date` + `status=in_progress` | ✅ `AuthorizeCreditApplicationUseCase` |
| 11 | Landing muestra confirmación tras autorizar exitosamente | ✅ `ConfirmedCard` |
| 12 | Landing muestra "ya autorizado" si solicitud ya pasó de `pending_authorization` | ✅ `AlreadyAuthorizedCard` |
| 13 | Landing muestra "no válido" si UUID no existe | ✅ `InvalidLinkCard` |
| 14 | Tras `in_progress` dispara Experian / RUES (PJ) / SARLAFT | ❌ Fuera de scope — HU-06 |
| 15 | No puede pasar a `in_progress` sin `privacy_policy_accepted = true` | ✅ Garantizado por el use case |
| 16 | Email PJ recordatorios menciona razón social y representante legal | ⚠️ Email actual es genérico (MINOR-1 — no bloquea flujo) |

---

## Pasos Siguientes

### ~~PASO 1 — Fix BUG-1~~ ✅ Resuelto 2026-04-21
### ~~PASO 2 — Fix BUG-2~~ ✅ Resuelto 2026-04-21
### ~~MINOR-2 — from_override + reply_to~~ ✅ Resuelto 2026-04-21

---

### PASO 3 — Endpoint SR con PENDING_AUTHORIZATION 🟠 CRÍTICO — desbloquea prueba E2E

**Contexto:** Ningún controller SR (HU-02/HU-04) llama hoy a `RegisterClientCreditApplicationUseCase` pasando `status = PENDING_AUTHORIZATION`. Sin esto el flujo completo de HU-05 nunca se dispara.

**Lo que hay que hacer:**
1. Identificar el controller SR de HU-02/HU-04 (registro de cliente por representante)
2. Modificar DTO y controller para pasar:
   - `status: CreditApplicationStatus.PENDING_AUTHORIZATION`
   - `partnerName` — del partner asociado al SR autenticado (JWT)
   - `clientType: 'pn' | 'pj'`
   - `businessLegalName` — solo PJ
3. Verificar que `partner_id` se resuelve y persiste correctamente (hoy `register-client` lo hardcodea a `null`)

---

### PASO 4 — Verificar URL del botón "Autorizar Consulta" en Twilio 🟡

En Twilio Console → Content Template Builder → cada uno de los 6 templates:
- Confirmar que el botón "Autorizar Consulta" (Visit Website) tiene la URL base `https://platampay.com/auth/` con sufijo variable `{{4}}`
- Si no está configurado: editar los 6 templates antes de hacer pruebas con clientes reales

Sin esta URL el cliente no puede autorizar desde WhatsApp.

---

### PASO 5 — Email recordatorios PJ con contexto de empresa 🟡 (MINOR-1)

En `build_email_reminder_payload()` del `PublishAuthorizationNotificationUseCase`:
- Agregar branch `pj` que mencione `business_legal_name` y el rol de representante legal
- Alinear con los textos de HU-05 §§ Recordatorio 1 PJ y Recordatorio 2 PJ

No bloquea el flujo — los emails actuales son funcionales pero genéricos para PJ.

---

### PASO 6 — Prueba end-to-end completa (después de PASO 3)

Secuencia de validación:
1. SR crea solicitud → verificar en DB `status = PENDING_AUTHORIZATION`
2. Verificar mensajes en cola SQS `notifications-inbound`
3. Verificar que notifications-ms procesa y envía WA + email (logs)
4. Verificar 4 schedules creados en EventBridge (`platam-auth-reminders` group)
5. Cliente abre URL del email → landing carga estado "Pendiente"
6. Cliente pulsa "Autorizar Consulta" → landing muestra "Confirmado"
7. Verificar en DB `status = in_progress`, `privacy_policy_accepted = true`, `privacy_policy_date` con timestamp
8. Verificar que los 4 schedules EventBridge fueron eliminados
9. Recargar landing → muestra "Ya autorizado"

---

### PASO 7 — Co-branding partner landing FE (bloqueado — Decisión D pendiente) ❌

`GetCreditApplicationAuthorizationDataUseCase` devuelve `partnerName`. Falta:
- Endpoint público `GET /partners/{alias}` para resolver logo y colores del partner
- Aplicar co-branding en la landing (logo, color primario)

---

### PASO 8 — Trigger HU-06 post-autorización (bloqueado — HU-06 pendiente) ❌

`AuthorizeCreditApplicationUseCase` transiciona a `in_progress` pero no dispara pipeline de análisis. Se implementa en HU-06 (Experian, RUES, SARLAFT).

---

## Variables de Entorno — Estado Final

```env
# Ejemplo — no commitear valores reales; usar .env local o gestor de secretos
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=<tu_auth_token>
TWILIO_FROM_WHATSAPP=whatsapp:+15551234567
TWILIO_TEMPLATE_AUTORIZACION_PN=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_AUTORIZACION_PJ=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_1_PN=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_1_PJ=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_2_PN=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_2_PJ=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFICATIONS_SQS_INBOUND_QUEUE_URL=https://sqs.<region>.amazonaws.com/<account-id>/<queue-name>
APP_BASE_URL=https://platampay.com
EVENTBRIDGE_SCHEDULER_ROLE_ARN=arn:aws:iam::<account-id>:role/<scheduler-role>
EVENTBRIDGE_SCHEDULER_GROUP_NAME=platam-auth-reminders
EVENTBRIDGE_SCHEDULER_TARGET_ARN=arn:aws:sqs:<region>:<account-id>:notifications-inbound

# notifications-ms / Resend
RESEND_API_KEY=re_<placeholder>
NOTIFICATIONS_EMAIL_FROM=Platam <noresponder@mail.platam.co>
```
