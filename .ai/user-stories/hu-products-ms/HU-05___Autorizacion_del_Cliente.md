# HU-05 — Autorización del Cliente

**Épica:** epic-01-onboarding-underwriting  
**Tipo de cliente:** Persona Natural (PN) y Persona Jurídica (PJ)  
**Canal:** WhatsApp (Twilio) + Correo electrónico (Resend)  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Contexto

Cuando un SR registra a un cliente (HU-02 o HU-04), la solicitud queda en estado `pendiente_autorizacion`. El underwriting no puede iniciarse sin que el cliente autorice explícitamente:

1. La consulta en centrales de riesgo (Experian / DATACRÉDITO)
2. La política de protección de datos de Platam

Esta historia cubre el flujo completo: notificación inicial → recordatorios automáticos → autorización → cambio de estado a `en_proceso`.

> El `partner_id` de la solicitud determina el co-branding del correo y la landing de autorización.

---

## Historia de Usuario

**Como** cliente registrado por un SR,  
**quiero** recibir un mensaje claro por WhatsApp y correo para autorizar la consulta en centrales de riesgo y aceptar la política de datos,  
**para** que Platam pueda continuar con el estudio de mi solicitud de crédito.

---

## Flujo General

```
SR envía formulario (HU-02 / HU-04) →
Sistema envía WhatsApp + correo simultáneamente (mensaje inicial) →

Si no autoriza en 24h → envía recordatorio 1 (WhatsApp + correo) →
Si no autoriza en 48h → envía recordatorio 2 (WhatsApp + correo) →

Cliente hace clic en "Autorizar Consulta" (WhatsApp o correo) →
Webhook recibe application external_id + confirmación →
Sistema actualiza solicitud:
  privacy_policy_accepted = true
  privacy_policy_date     = timestamp
  status_id               = en_proceso →
Backend dispara procesos: Experian, RUES (PJ), SARLAFT →
Sistema notifica al Analista que la solicitud avanzó
```

> Si el cliente no autoriza tras el recordatorio 2, la solicitud permanece en `pendiente_autorizacion`. No se envían más mensajes automáticos.

---

## URL de Autorización

La URL de autorización usa el `external_id` (UUID) de la solicitud — no se requiere token adicional:

```
https://platampay.com/auth/{{credit_applications.external_id}}
```

La landing valida que la solicitud exista y no esté ya autorizada. No hay expiración — el enlace es válido mientras la solicitud esté en `pendiente_autorizacion`.

---

## Canal WhatsApp — Twilio

Se usan plantillas de WhatsApp aprobadas por Meta vía Twilio. Los botones de acción son botones de respuesta rápida de la plantilla.

Al presionar **"Autorizar Consulta"**, Twilio dispara un webhook al backend con el `external_id` de la solicitud — sin que el cliente navegue a ninguna URL.

Al presionar **"Ver Política de Datos"**, se abre la URL de la política de privacidad en el navegador del dispositivo.

> Las variables `{{1}}`, `{{2}}`, `{{3}}` corresponden al formato de parámetros de plantilla Twilio/Meta.

---

### WhatsApp — Mensaje Inicial PN

**Nombre:** `platam_autorizacion_pn`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` |
| `{{2}}` | `partners.company_name` |

> ¡Hola {{1}}!
>
> Para continuar con tu solicitud de línea de crédito Platam | {{2}}, necesitamos tu autorización para consultar tus antecedentes crediticios. Al autorizar, confirmas que has leído y aceptas nuestra Política de Protección de Datos.
>
> Autorizo a Platam Colombia S.A.S para que consulte mi información en centrales de riesgo como DATACRÉDITO y valide mis datos para el análisis de crédito.
>
> ¡Gracias por confiar en nosotros!  
> Platam

**Botones:** `<<Ver Política de Datos>>` · `<<Autorizar Consulta>>`

---

### WhatsApp — Mensaje Inicial PJ (Representante Legal)

**Nombre:** `platam_autorizacion_pj`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` del representante legal |
| `{{2}}` | `partners.company_name` |
| `{{3}}` | `businesses.legal_name` |

> ¡Hola {{1}}!
>
> Para continuar con tu solicitud de línea de crédito Platam | {{2}}, necesitamos tu autorización para consultar los antecedentes crediticios de la empresa. Al autorizar, confirmas que has leído y aceptas nuestra Política de Protección de Datos.
>
> Como representante legal de {{3}}, autorizo a Platam Colombia SAS para que consulte la información de la empresa en centrales de riesgo como DATACRÉDITO y valide los datos para el análisis de crédito.
>
> ¡Gracias por confiar en nosotros!  
> Platam

**Botones:** `<<Ver Política de Datos>>` · `<<Autorizar Consulta>>`

---

### WhatsApp — Recordatorio 1 (24h) PN

**Nombre:** `platam_recordatorio_1_pn`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` |
| `{{2}}` | `partners.company_name` |

> ¡Hola {{1}}! 👋
>
> Te recordamos que tu solicitud de línea de crédito con Platam | {{2}} está esperando tu autorización para avanzar.
>
> Solo toma un segundo — authoriza la consulta y tu estudio crediticio comenzará de inmediato.
>
> ¡Estamos listos para ayudarte!  
> Platam

**Botones:** `<<Ver Política de Datos>>` · `<<Autorizar Consulta>>`

---

### WhatsApp — Recordatorio 1 (24h) PJ (Representante Legal)

**Nombre:** `platam_recordatorio_1_pj`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` del representante legal |
| `{{2}}` | `businesses.legal_name` |
| `{{3}}` | `partners.company_name` |

> ¡Hola {{1}}! 👋
>
> Te recordamos que la solicitud de línea de crédito de {{2}} con Platam | {{3}} está pendiente de tu autorización.
>
> Con tu autorización como representante legal podemos iniciar el análisis crediticio de la empresa de inmediato.
>
> ¡Estamos listos para ayudarte!  
> Platam

**Botones:** `<<Ver Política de Datos>>` · `<<Autorizar Consulta>>`

---

### WhatsApp — Recordatorio 2 (48h) PN

**Nombre:** `platam_recordatorio_2_pn`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` |
| `{{2}}` | `partners.company_name` |

> ¡Hola {{1}}!
>
> Tu solicitud de línea de crédito con Platam | {{2}} sigue esperando tu autorización. Sin ella, no podemos continuar con tu estudio crediticio.
>
> Este es nuestro último recordatorio automático. Autoriza ahora para no perder tu solicitud.
>
> Platam

**Botones:** `<<Ver Política de Datos>>` · `<<Autorizar Consulta>>`

---

### WhatsApp — Recordatorio 2 (48h) PJ (Representante Legal)

**Nombre:** `platam_recordatorio_2_pj`

| Variable | Fuente |
|---|---|
| `{{1}}` | `persons.first_name` del representante legal |
| `{{2}}` | `businesses.legal_name` |
| `{{3}}` | `partners.company_name` |

> ¡Hola {{1}}!
>
> La solicitud de línea de crédito de {{2}} con Platam | {{3}} aún está pendiente de tu autorización como representante legal.
>
> Sin tu autorización no podemos iniciar el análisis crediticio de la empresa. Este es nuestro último recordatorio automático.
>
> Platam

**Botones:** `<<Ver Política de Datos>>` · `<<Autorizar Consulta>>`

---

## Canal Correo Electrónico — Resend

Proveedor: **Resend** (`api.resend.com`)

| Parámetro | Valor |
|---|---|
| `from` | `Platam <noresponder@mail.platam.co>` |
| `reply_to` | `info@platam.co` |
| `to` | `users.email` del cliente |
| `Authorization` | API key en variable de entorno — no hardcodear |

---

### Correo — Mensaje Inicial PN

**Asunto:** Autoriza tu solicitud de crédito con {{partner_name}} | Platam

| Variable | Fuente |
|---|---|
| `{{first_name}}` | `persons.first_name` |
| `{{partner_name}}` | `partners.company_name` |
| `{{authorization_url}}` | `platampay.com/auth/{{external_id}}` |

> Hola {{first_name}},
>
> Te escribimos de parte del equipo de Platam Pay.
>
> Para continuar con el análisis de tu solicitud de línea de crédito **Platam | {{partner_name}}**, necesitamos tu autorización para consultar tus antecedentes crediticios y validar tus datos.
>
> Al autorizar esta consulta, confirmas que:
> - Has leído y aceptas nuestra Política de Protección de Datos
> - Autorizas a Platam Colombia S.A.S para consultar tu información en centrales de riesgo como DATACRÉDITO y validar tus datos para el análisis de crédito
>
> **[AUTORIZAR CONSULTA CREDITICIA]** → `{{authorization_url}}`
>
> Una vez autorizada, procederemos de inmediato con la evaluación de tu solicitud.
>
> Cordialmente,  
> Equipo Platam Pay

---

### Correo — Mensaje Inicial PJ (Representante Legal)

**Asunto:** Autoriza la solicitud de crédito de {{legal_name}} con {{partner_name}} | Platam

| Variable | Fuente |
|---|---|
| `{{first_name}}` | `persons.first_name` del representante legal |
| `{{legal_name}}` | `businesses.legal_name` |
| `{{partner_name}}` | `partners.company_name` |
| `{{authorization_url}}` | `platampay.com/auth/{{external_id}}` |

> Estimado/a {{first_name}},
>
> Reciba un cordial saludo de parte del equipo de Platam Pay.
>
> Nos dirigimos a usted para solicitar su autorización como representante legal de **{{legal_name}}**, con el fin de continuar con el proceso de evaluación de su solicitud de línea de crédito **Platam | {{partner_name}}**.
>
> Al autorizar esta consulta, usted confirma que:
> - Ha leído y acepta nuestra Política de Protección de Datos
> - Actúa en calidad de representante legal de {{legal_name}}
> - Autoriza expresamente a Platam Colombia SAS para realizar las consultas crediticias necesarias
>
> **[AUTORIZAR CONSULTA CREDITICIA]** → `{{authorization_url}}`
>
> Una vez autorizada la consulta, procederemos inmediatamente con la evaluación de su solicitud de crédito.
>
> Cordialmente,  
> Equipo Platam Pay

---

### Correo — Recordatorio 1 (24h) PN

**Asunto:** ¿Olvidaste autorizar tu solicitud de crédito? | Platam

| Variable | Fuente |
|---|---|
| `{{first_name}}` | `persons.first_name` |
| `{{partner_name}}` | `partners.company_name` |
| `{{authorization_url}}` | `platampay.com/auth/{{external_id}}` |

> Hola {{first_name}},
>
> Te recordamos que tu solicitud de línea de crédito con **Platam | {{partner_name}}** está esperando tu autorización para avanzar.
>
> Solo toma un segundo — haz clic en el botón y tu estudio crediticio comenzará de inmediato.
>
> **[AUTORIZAR AHORA]** → `{{authorization_url}}`
>
> Equipo Platam Pay

---

### Correo — Recordatorio 1 (24h) PJ (Representante Legal)

**Asunto:** Pendiente: autorización de consulta crediticia de {{legal_name}} | Platam

| Variable | Fuente |
|---|---|
| `{{first_name}}` | `persons.first_name` del representante legal |
| `{{legal_name}}` | `businesses.legal_name` |
| `{{partner_name}}` | `partners.company_name` |
| `{{authorization_url}}` | `platampay.com/auth/{{external_id}}` |

> Estimado/a {{first_name}},
>
> Le recordamos que la solicitud de línea de crédito de **{{legal_name}}** con **Platam | {{partner_name}}** está pendiente de su autorización como representante legal.
>
> Con su autorización podemos iniciar el análisis crediticio de la empresa de inmediato.
>
> **[AUTORIZAR AHORA]** → `{{authorization_url}}`
>
> Equipo Platam Pay

---

### Correo — Recordatorio 2 (48h) PN

**Asunto:** Último aviso: tu solicitud de crédito está pendiente | Platam

| Variable | Fuente |
|---|---|
| `{{first_name}}` | `persons.first_name` |
| `{{partner_name}}` | `partners.company_name` |
| `{{authorization_url}}` | `platampay.com/auth/{{external_id}}` |

> Hola {{first_name}},
>
> Tu solicitud de línea de crédito con **Platam | {{partner_name}}** sigue esperando tu autorización. Sin ella, no podemos continuar con tu estudio crediticio.
>
> Este es nuestro último recordatorio automático. Si tienes alguna duda, puedes responder a este correo o contactar a tu asesor.
>
> **[AUTORIZAR CONSULTA CREDITICIA]** → `{{authorization_url}}`
>
> Equipo Platam Pay

---

### Correo — Recordatorio 2 (48h) PJ (Representante Legal)

**Asunto:** Último aviso: autorización pendiente de {{legal_name}} | Platam

| Variable | Fuente |
|---|---|
| `{{first_name}}` | `persons.first_name` del representante legal |
| `{{legal_name}}` | `businesses.legal_name` |
| `{{partner_name}}` | `partners.company_name` |
| `{{authorization_url}}` | `platampay.com/auth/{{external_id}}` |

> Estimado/a {{first_name}},
>
> La solicitud de línea de crédito de **{{legal_name}}** con **Platam | {{partner_name}}** aún está pendiente de su autorización como representante legal.
>
> Sin su autorización no podemos iniciar el análisis crediticio. Este es nuestro último recordatorio automático. Si tiene alguna duda, puede responder a este correo o contactar a su asesor.
>
> **[AUTORIZAR CONSULTA CREDITICIA]** → `{{authorization_url}}`
>
> Equipo Platam Pay

---

## Calendario de Envíos

| Evento | Acción |
|---|---|
| T+0 — SR envía formulario | Mensaje inicial (WhatsApp + correo) |
| T+24h — sin autorización | Recordatorio 1 (WhatsApp + correo) |
| T+48h — sin autorización | Recordatorio 2 (WhatsApp + correo) |
| T+48h+ — cliente autoriza | Cancela envíos pendientes si los hubiera |
| Cliente autoriza en cualquier momento | Flujo completo — no se envían más mensajes |

> Los recordatorios se cancelan automáticamente si el cliente autoriza antes del horario programado.

---

## Landing de Autorización

URL: `https://platampay.com/auth/{{external_id}}` — co-branding del partner.

| Estado | Condición | Mensaje |
|---|---|---|
| Pendiente | Solicitud en `pendiente_autorizacion` | Texto de autorización + botón "Autorizar Consulta Crediticia" |
| Confirmación | Tras autorizar | **¡Autorización recibida!** Tu solicitud de línea de crédito está en camino. Nuestro equipo especializado iniciará el estudio crediticio de inmediato y te contactaremos pronto con los resultados. Gracias por confiar en nosotros. |
| Ya autorizado | Solicitud ya en `en_proceso` o posterior | *Tu autorización ya fue registrada. Pronto recibirás novedades.* |
| No encontrado | UUID no existe | *Este enlace no es válido. Contacta a tu asesor.* |

---

## Actualización de Registros al Autorizar

```
credit_applications:
  privacy_policy_accepted  → true
  privacy_policy_date      → timestamp del momento de autorización
  status_id                → get_status_id('credit_applications', 'en_proceso')
```

---

## Procesos que se inician tras `en_proceso`

Al cambiar a `en_proceso` el backend dispara automáticamente:

- Consulta Experian (buró de crédito)
- KYB / RUES (solo PJ)
- SARLAFT (listas restrictivas)

> Estos procesos se documentan en HU-06.

---

## Criterios de Aceptación

- [ ] Al crear una solicitud vía SR (HU-02 / HU-04) se envían simultáneamente WhatsApp y correo con el mensaje inicial
- [ ] El mensaje WhatsApp y el correo usan la plantilla correcta según tipo de cliente (PN o PJ)
- [ ] El botón "Autorizar Consulta" en WhatsApp dispara el webhook de Twilio con el `external_id` de la solicitud
- [ ] El enlace del correo usa el `external_id` de la solicitud como identificador — sin token adicional
- [ ] Si no hay autorización a las 24h se envía automáticamente el recordatorio 1 (WhatsApp + correo)
- [ ] Si no hay autorización a las 48h se envía automáticamente el recordatorio 2 (WhatsApp + correo)
- [ ] Los recordatorios se cancelan si el cliente autoriza antes del horario programado
- [ ] No se envían más recordatorios automáticos tras el recordatorio 2
- [ ] Al autorizar por cualquier canal se actualiza `privacy_policy_accepted = true`, `privacy_policy_date` con timestamp exacto y `status_id = en_proceso`
- [ ] La landing muestra confirmación tras autorizar exitosamente
- [ ] La landing muestra "ya autorizado" si la solicitud ya pasó de `pendiente_autorizacion`
- [ ] La landing muestra "no válido" si el UUID no existe
- [ ] Tras cambiar a `en_proceso` el backend dispara los procesos de consulta (Experian, RUES si PJ, SARLAFT)
- [ ] La solicitud no puede pasar a `en_proceso` sin `privacy_policy_accepted = true`
