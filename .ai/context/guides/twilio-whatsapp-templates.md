# Guía operativa: plantillas Twilio WhatsApp (ambiente desarrollo) para HU-05 — Autorización del cliente

**Historia de usuario:** [HU-05 — Autorización del Cliente](../user-stories/HU-05___Autorizacion_del_Cliente.md)  
**Objetivo:** Crear en Twilio las **plantillas de contenido (Content Templates)** necesarias para notificar por WhatsApp el flujo de autorización (mensaje inicial + dos recordatorios), con botones **“Ver Política de Datos”** y **“Autorizar Consulta”**, listas para pruebas en cuenta de desarrollo y posterior envío desde el backend (`notifications-ms` y consumidores relacionados).

**Referencias oficiales Twilio (conservar enlaces para el equipo):**

- [Content Template Builder](https://www.twilio.com/docs/content/create-templates-with-the-content-template-builder)
- [Variables en plantillas de contenido](https://www.twilio.com/docs/content/using-variables-with-content-api) (reglas específicas de WhatsApp / Meta)
- `[twilio/quick-reply](https://www.twilio.com/docs/content/twilio-quick-reply)`
- [Botones en WhatsApp](https://www.twilio.com/docs/whatsapp/buttons)
- [Enviar notificaciones con plantillas WhatsApp](https://www.twilio.com/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates)
- [Webhook de mensajes entrantes (parámetros WhatsApp)](https://www.twilio.com/docs/messaging/guides/webhook-request#whatsapp-specific-parameters)

---

## 1. Qué significa aquí “ambiente Develop”

Twilio **no tiene un segundo “tier” llamado Develop** dentro de la misma cuenta igual que otros proveedores. Lo habitual es una de estas opciones (definir con DevOps cuál usar):


| Enfoque                                           | Descripción práctica                                                                                                                                                                                                                                      |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Subcuenta Twilio “develop” / “staging”**        | Subaccount en Twilio Console con su propio `AC…` SID. Aislamiento de números, plantillas y costos; las plantillas hay que crearlas **por subcuenta** (no se copian solas).                                                                                |
| **Una sola cuenta con número WhatsApp de prueba** | Se usa la cuenta administrada; “develop” = uso en sandbox o número WABA de QA. Menos aislamiento, más simple.                                                                                                                                             |
| **Credenciales Test vs Live**                     | Twilio usa **Account SID + Auth Token** (o API Keys). Para automatizar creación de plantillas vía [Content API](https://www.twilio.com/docs/content/content-api-resources) se usan las credenciales de la **subcuenta o cuenta** elegida para desarrollo. |


**Recomendación:** Para equipos regulados (fintech), prefiera **subcuenta “develop”** + variables de entorno distintas del backend (`TWILIO_ACCOUNT_SID`, etc.) para no mezclar plantillas aprobadas en producción con experimentación.

---

## 2. Prerrequisitos antes de crear plantillas

### 2.1 Cuenta y permisos

- Acceso **administrador** (o rol que permita **Messaging**, **Content Template Builder** y **WhatsApp senders**).
- Rol en **Meta Business** suficiente para gestionar el **WhatsApp Business Account (WABA)** vinculado a Twilio (según cómo esté conectado el proveedor).

### 2.2 WhatsApp Business API vía Twilio

- Un **número de teléfono** habilitado para WhatsApp en Twilio (**Messaging → Senders → WhatsApp senders**), en estado que permita envío y plantillas.
- Si aún está en configuración inicial, completar el flujo de onboarding de Twilio + Meta descrito en la documentación de [WhatsApp con Twilio](https://www.twilio.com/docs/whatsapp).

### 2.3 Política de privacidad (URL del botón)

HU-05 indica que **“Ver Política de Datos”** abre la política en el navegador. En la plantilla tipo **Call to action → URL** debe usarse una **URL HTTPS pública** (por ejemplo la página oficial de Platam). No incluya secretos ni parámetros con datos personales en la URL del botón.

Defina con legal/compliance la URL definitiva y úsala como plantilla **estática** o con **variable de ruta** si Meta/Twilio lo aprueban (las reglas de variables en URLs son estrictas; ver [Using Variables](https://www.twilio.com/docs/content/using-variables-with-content-api)).

### 2.4 Categoría Meta de las plantillas

Las notificaciones de autorización para continuar un trámite iniciado por el cliente encajan típicamente en **Utility** (mensaje relacionado con un proceso/transacción ya iniciado). Evite redacción promocional para no ser reclasificado como **Marketing** (mayor fricción de aprobación y restricciones).

---

## 3. Inventario de plantillas según HU-05

Deben existir **6 plantillas** con estos **friendly names** (coincidir exactamente con lo acordado con backend / configuración):


| Orden | `friendly_name` (HU-05)    | Variables cuerpo          | Botón Quick Reply `id` | Variable de entorno                 |
| ----- | -------------------------- | ------------------------- | ---------------------- | ----------------------------------- |
| 1     | `platam_autorizacion_pn`   | `{{1}}`, `{{2}}`          | `{{4}}`                | `TWILIO_TEMPLATE_AUTORIZACION_PN`   |
| 2     | `platam_autorizacion_pj`   | `{{1}}`, `{{2}}`, `{{3}}` | `{{4}}`                | `TWILIO_TEMPLATE_AUTORIZACION_PJ`   |
| 3     | `platam_recordatorio_1_pn` | `{{1}}`, `{{2}}`          | `{{4}}`                | `TWILIO_TEMPLATE_RECORDATORIO_1_PN` |
| 4     | `platam_recordatorio_1_pj` | `{{1}}`, `{{2}}`, `{{3}}` | `{{4}}`                | `TWILIO_TEMPLATE_RECORDATORIO_1_PJ` |
| 5     | `platam_recordatorio_2_pn` | `{{1}}`, `{{2}}`          | `{{4}}`                | `TWILIO_TEMPLATE_RECORDATORIO_2_PN` |
| 6     | `platam_recordatorio_2_pj` | `{{1}}`, `{{2}}`, `{{3}}` | `{{4}}`                | `TWILIO_TEMPLATE_RECORDATORIO_2_PJ` |


**Mapeo de variables por plantilla — CONFIRMADO (usar exactamente este orden al enviar `contentVariables`):**


| Plantilla               | `{{1}}`                 | `{{2}}`             | `{{3}}`             | `{{4}}`                                 |
| ----------------------- | ----------------------- | ------------------- | ------------------- | --------------------------------------- |
| PN (todas)              | `firstName` del cliente | `partnerName`       | —                   | `credit_application.external_id` (UUID) |
| PJ autorizacion inicial | `firstName` rep. legal  | `partnerName`       | `businessLegalName` | UUID                                    |
| PJ recordatorios 1 y 2  | `firstName` rep. legal  | `businessLegalName` | `partnerName`       | UUID                                    |


> ⚠️ **Orden diferente en PJ según mensaje**: El mensaje inicial PJ tiene `{{2}}` = partner, `{{3}}` = razón social. Los recordatorios PJ invierten ese orden: `{{2}}` = razón social, `{{3}}` = partner. Esto es intencional por la redacción de HU-05. El backend envía el `contentVariables` correspondiente a cada Content SID; **no intercambiar** los SIDs entre inicial y recordatorio PJ.

---

## 4. Botones: diseño técnico alineado con Twilio y HU-05

HU-05 exige dos acciones:

1. **Ver Política de Datos** → abrir URL en el navegador → en Twilio/Meta corresponde típicamente a botón tipo **URL** (Call to action).
2. **Autorizar Consulta** → sin abrir navegador; debe llegar un **webhook** al backend con identificación de la solicitud → corresponde a **Quick Reply** con campo `**id`** (payload opaco que Twilio devuelve como `ButtonPayload` en el webhook cuando el usuario pulsa).

Documentación Twilio sobre quick reply: el botón tiene `title` (texto visible, máximo ~20 caracteres en WhatsApp) y `**id**` (payload para el webhook, hasta ~200 caracteres). El `id` **puede** estar parametrizado según tipo de plantilla y canal; validar en el Content Template Builder que Meta acepte la definición para envíos **fuera de sesión** (plantilla).

### 4.1 Variable `{{4}}` en el Quick Reply — DECISIÓN CONFIRMADA

La variable `**{{4}}`** se usa **exclusivamente** en el campo `id` del botón Quick Reply “Autorizar Consulta”. Su valor en cada envío es el `credit_applications.external_id` (UUID v4). El backend (`PublishAuthorizationNotificationUseCase`) lo envía en `contentVariables` como `”4”: externalId`.

Cuando el cliente pulsa “Autorizar Consulta”, Twilio incluye en el webhook:

```
ButtonText=Autorizar Consulta
ButtonPayload=<el UUID>
```

El endpoint `POST /webhooks/twilio/whatsapp` extrae `ButtonPayload` como `external_id` y llama a `AuthorizeCreditApplicationUseCase`.

Si Meta rechazara variables en el campo `id` del botón (poco probable con el tipo `call-to-action`), el plan B es correlacionar por número de teléfono + estado `PENDING_AUTHORIZATION` activo al momento del webhook. **No desplegar a producción sin validar que `ButtonPayload` llega correctamente en pruebas manuales.**

---

## 5. Reglas de Meta/Twilio que deben cumplir los textos (antes de enviar a aprobación)

Resumen basado en [Using Variables with Content Templates](https://www.twilio.com/docs/content/using-variables-with-content-api):

- Los índices de variables deben ser **secuenciales** (`{{1}}`, `{{2}}`, … sin saltos).
- No colocar dos variables **adyacentes** solo separadas por espacio; debe haber texto suficiente entre ellas (ej.: “Platam  {{2}}” con texto alrededor está bien).
- Evitar que el **cuerpo empiece o termine** de forma que Meta interprete mal el límite de variable (si hay rechazo, añadir línea final fija como firma o frase corta).
- Relación cantidad de variables vs longitud del mensaje: regla orientativa **2x+1 palabras no variables por cada x variables** (detalle en documentación oficial).
- Los valores enviados en variables **no deben contener saltos de línea** para WhatsApp fuera de sesión.

Si una plantilla es rechazada, revisar el mensaje de Meta en Twilio Console y ajustar redacción (menos genérica, más ligada al trámite).

---

## 6. Crear una plantilla en Twilio Console (Content Template Builder)

### 6.1 Pantalla “Select one of the message types below” — qué elegir para HU-05

En el modal **Edit**, después de **Template Name** y **Template Language**, Twilio muestra tarjetas de tipo de contenido. Para HU-05 necesitas **texto largo + botón que abre una URL + botón que devuelve respuesta rápida (payload al webhook)**. La opción correcta es `**Call to action`** — **no** uses **Card** para esta historia.


| Opción en la lista         | ¿Usarla para HU-05?                                           | Motivo                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Text**                   | No                                                            | Es solo texto. Fuera de la ventana de 24 h, WhatsApp exige plantilla con botones; este tipo no define los botones URL/Quick Reply de HU-05.                                                                                                                                                                                                                                                                                                                                   |
| **Media**                  | No                                                            | HU-05 no requiere imagen, video ni audio en el mensaje.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **List Picker**            | No                                                            | Es una lista desplegable de opciones, no el par URL + autorización de HU-05.                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Call to action**         | **Sí (recomendado)**                                          | En Twilio, el tipo `twilio/call-to-action` permite un **cuerpo** (`body`) con variables y un arreglo `**actions`** que puede mezclar acciones `**URL**` (abrir política en el navegador) y `**QUICK_REPLY**` con campo `**id**` (payload para `ButtonPayload` en el webhook). Ver [componentes comunes](https://www.twilio.com/docs/content/content-types-overview#common-components) y `[twilio/call-to-action](https://www.twilio.com/docs/content/twilio-call-to-action)`. |
| **Quick Reply**            | Solo si no mezclas URL                                        | Sirve para cuerpo + solo botones de respuesta rápida. **No** cubre por sí solo el botón “Ver Política de Datos” como enlace HTTP; para **URL + Quick Reply** en la misma plantilla usa **Call to action**.                                                                                                                                                                                                                                                                    |
| **Card**                   | **No** (en la UI que mostraste estaba seleccionado por error) | Pensado para tarjeta con estructura tipo imagen/título/subtítulo; añade complejidad y reglas extra de aprobación en WhatsApp. HU-05 es un mensaje de texto con dos acciones — no necesitas formato “card”.                                                                                                                                                                                                                                                                    |
| **Catalog** / **Carousel** | No                                                            | Comercio / carruseles; no aplica.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **WhatsApp Card**          | Opcional / avanzado                                           | Variante específica de WhatsApp; no es necesaria si **Call to action** te deja configurar URL + Quick Reply.                                                                                                                                                                                                                                                                                                                                                                  |
| **Authentication**         | No                                                            | OTP y flujos de código; no es este caso.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Flows**                  | No                                                            | Integración Twilio Flows; fuera del alcance de HU-05.                                                                                                                                                                                                                                                                                                                                                                                                                         |


**Resumen:** deselecciona **Card** y elige `**Call to action`**. En el siguiente paso del builder: pega el cuerpo del §7, añade **dos acciones** — (1) tipo URL, título acortado si hace falta (límite típico ~20–25 caracteres en WhatsApp para el título del botón), URL HTTPS de la política; (2) tipo Quick reply, título “Autorizar Consulta” (o texto equivalente dentro del límite), `**id`** con el UUID o variable `{{4}}` según acuerdo con backend.

### 6.2 Límite de longitud del cuerpo

En la documentación de `[twilio/call-to-action](https://www.twilio.com/docs/content/twilio-call-to-action)`, el campo `body` indica hasta **640 caracteres**. Los borradores de HU-05 del §7 (PN/PJ iniciales y recordatorios) están por debajo de ese tope en plantilla con variables; si Twilio Console muestra error de longitud, acorte líneas manteniendo compliance y vuelva a enviar a aprobación.

### 6.3 Pasos operativos (después de elegir el tipo)

Pasos generales (la UI puede variar ligeramente):

1. Inicie sesión en [Twilio Console](https://console.twilio.com/).
2. Vaya a **Messaging → Content Template Builder** (o busque “Content Template Builder”).
3. Pulse **Create new** / **Crear**.
4. Configure **Template Name** = uno de los seis nombres del §3 (minúsculas, números y guiones bajos, p. ej. `platam_autorizacion_pn`). **Language:** Spanish.
5. Seleccione **Call to action** (ver §6.1).
6. **Body:** texto del §7 con `{{1}}`, `{{2}}`, `{{3}}` según corresponda. Samples para Meta con datos ficticios.
7. **Actions:** (a) **URL** — política de datos; (b) **Quick reply** — autorizar, con `**id`** / payload acordado (p. ej. UUID vía variable adicional).
8. **Save** → **Submit for WhatsApp approval** cuando el builder lo permita.
9. Anote el **Content SID** (`H…`) para `contentSid` en el backend.

Repita para las **seis** plantillas.

---

## 7. Textos completos por plantilla (copiar desde HU-05)

Los siguientes bloques son los mismos que la historia HU-05; manténgalos al crear la plantilla salvo ajustes obligados por aprobación Meta.

### 7.1 `platam_autorizacion_pn`

**Variables:** `{{1}}` = nombre persona, `{{2}}` = nombre partner.

```
¡Hola {{1}}!

Para continuar con tu solicitud de línea de crédito Platam | {{2}}, necesitamos tu autorización para consultar tus antecedentes crediticios. Al autorizar, confirmas que has leído y aceptas nuestra Política de Protección de Datos.

Autorizo a Platam Colombia S.A.S para que consulte mi información en centrales de riesgo como DATACRÉDITO y valide mis datos para el análisis de crédito.

¡Gracias por confiar en nosotros!
Platam
```

**Botones:** «Ver Política de Datos» · «Autorizar Consulta»

---

### 7.2 `platam_autorizacion_pj`

**Variables:** `{{1}}` nombre rep. legal, `{{2}}` partner, `{{3}}` razón social empresa.

```
¡Hola {{1}}!

Para continuar con tu solicitud de línea de crédito Platam | {{2}}, necesitamos tu autorización para consultar los antecedentes crediticios de la empresa. Al autorizar, confirmas que has leído y aceptas nuestra Política de Protección de Datos.

Como representante legal de {{3}}, autorizo a Platam Colombia SAS para que consulte la información de la empresa en centrales de riesgo como DATACRÉDITO y valide los datos para el análisis de crédito.

¡Gracias por confiar en nosotros!
Platam
```

**Botones:** «Ver Política de Datos» · «Autorizar Consulta»

---

### 7.3 `platam_recordatorio_1_pn`

```
¡Hola {{1}}! 

Te recordamos que tu solicitud de línea de crédito con Platam | {{2}} está esperando tu autorización para avanzar.

Solo toma un segundo — autoriza la consulta y tu estudio crediticio comenzará de inmediato.

¡Estamos listos para ayudarte!
Platam
```

**Botones:** «Ver Política de Datos» · «Autorizar Consulta»

*(Nota: HU-05 incluye “authoriza”; si desea ortografía “autoriza”, alinee documentación y plantilla en el mismo cambio.)*

---

### 7.4 `platam_recordatorio_1_pj`

**Variables:** `{{1}}` rep. legal, `{{2}}` razón social, `{{3}}` partner.

```
¡Hola {{1}}! 

Te recordamos que la solicitud de línea de crédito de {{2}} con Platam | {{3}} está pendiente de tu autorización.

Con tu autorización como representante legal podemos iniciar el análisis crediticio de la empresa de inmediato.

¡Estamos listos para ayudarte!
Platam
```

**Botones:** «Ver Política de Datos» · «Autorizar Consulta»

---

### 7.5 `platam_recordatorio_2_pn`

```
¡Hola {{1}}!

Tu solicitud de línea de crédito con Platam | {{2}} sigue esperando tu autorización. Sin ella, no podemos continuar con tu estudio crediticio.

Este es nuestro último recordatorio automático. Autoriza ahora para no perder tu solicitud.

Platam
```

**Botones:** «Ver Política de Datos» · «Autorizar Consulta»

---

### 7.6 `platam_recordatorio_2_pj`

```
¡Hola {{1}}!

La solicitud de línea de crédito de {{2}} con Platam | {{3}} aún está pendiente de tu autorización como representante legal.

Sin tu autorización no podemos iniciar el análisis crediticio de la empresa. Este es nuestro último recordatorio automático.

Platam
```

**Botones:** «Ver Política de Datos» · «Autorizar Consulta»

---

## 8. Después de la aprobación: artefactos que debe entregar “Develop” al backend

Para cada una de las 6 plantillas:


| Artefacto                         | Ejemplo                              | Uso en backend                                                   |
| --------------------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| **Content SID**                   | `HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | Parámetro `contentSid` / variable de entorno por tipo de mensaje |
| **Friendly name**                 | `platam_autorizacion_pn`             | Logs, feature flags, tablas de configuración                     |
| **Lista de índices de variables** | `1..3` o `1..4` si añaden UUID       | JSON `contentVariables` al enviar                                |
| **Estado de aprobación WhatsApp** | Approved                             | Bloquear despliegue si está Pending/Rejected                     |


El código actual de `TwilioMessagingAdapter` en `notifications-ms` envía `**body` plano** por WhatsApp; para HU-05 será necesario **extender** el puerto/adaptador para soportar envío con **Content Template** (`contentSid` + `contentVariables`), según la documentación [Send Templates Created with Content Template Builder](https://www.twilio.com/docs/content/send-templates-created-with-the-content-template-builder).

---

## 9. Webhook de respuesta (“Autorizar Consulta”)

Cuando el usuario pulse **Autorizar Consulta**:

1. Twilio enviará una petición HTTP al **webhook** configurado en el número o en el Messaging Service (**Messaging → WhatsApp senders → [número] → webhook URL**, o la URL del Messaging Service).
2. Para mensajes entrantes de WhatsApp, revise los parámetros descritos en [Webhook request](https://www.twilio.com/docs/messaging/guides/webhook-request#whatsapp-specific-parameters): en particular `**ButtonText`** y `**ButtonPayload**` (este último correspondiente al `id` definido en el Quick Reply si aplica).
3. El backend debe validar el `external_id`, idempotencia y estado `pending_authorization` antes de actualizar `credit_applications` (ver HU-05).

Configure el webhook en desarrollo con una URL accesible (túnel HTTPS tipo ngrok/cloudflared) apuntando al endpoint Nest que implemente la historia.

---

## 10. Pruebas en desarrollo sin romper compliance

1. Use **números de prueba** autorizados en WhatsApp y destinatarios internos.
2. No use datos reales de clientes en muestras de Meta ni en logs.
3. Verifique primero envío **manual** desde Console (si está disponible “Send test”) o con un script curl/SDK usando `ContentSid` y `ContentVariables` de ejemplo.
4. Confirme que los tres disparadores de HU-05 (T+0, T+24h, T+48h) mapean a la plantilla correcta PN/PJ en configuración; los recordatorios no deben enviarse tras autorización.

---

## 11. Variables de entorno a completar tras la aprobación

```env
# --- products-ms / notifications-ms (HU-05) ---
# Content SIDs de plantillas WhatsApp (obtener desde Twilio Console → Content Template Builder)
TWILIO_TEMPLATE_AUTORIZACION_PN=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_AUTORIZACION_PJ=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_1_PN=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_1_PJ=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_2_PN=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_TEMPLATE_RECORDATORIO_2_PJ=HXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Cola SQS de notifications-ms (products-ms publica aquí las notificaciones de autorización)
NOTIFICATIONS_SQS_INBOUND_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/ACCOUNT/notifications-inbound

# URL base del frontend (para el enlace de autorización en emails)
APP_BASE_URL=https://platampay.com

# EventBridge Scheduler (recordatorios T+24h y T+48h)
EVENTBRIDGE_SCHEDULER_ROLE_ARN=arn:aws:iam::ACCOUNT:role/platam-scheduler-role
EVENTBRIDGE_SCHEDULER_GROUP_NAME=platam-auth-reminders
EVENTBRIDGE_SCHEDULER_TARGET_ARN=arn:aws:sqs:us-east-1:ACCOUNT:notifications-inbound

# Twilio credenciales (ya existentes; verificar en env)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_FROM_WHATSAPP=+14155238886
```

---

## 12. Checklist final antes de dar por cerrada la capa Twilio (Develop)

- WABA y número WhatsApp activos en la subcuenta/cuenta Develop.
- 6 plantillas creadas con nombres exactos según §3.
- Todas en estado **Approved** para WhatsApp en Twilio Console.
- URL del botón “Ver Política de Datos” validada por legal y accesible públicamente.
- `{{4}}` confirmado como payload de “Autorizar Consulta” en prueba manual (verificar `ButtonPayload` en logs del webhook).
- 6 Content SIDs (`HX...`) cargados en `.env` con los nombres exactos del §11.
- Webhook Twilio apuntando a `POST /webhooks/twilio/whatsapp` (en dev: túnel HTTPS activo).
- `TWILIO_AUTH_TOKEN` en `.env` (valida firma `X-Twilio-Signature` en el webhook controller).
- `NOTIFICATIONS_SQS_INBOUND_QUEUE_URL` accesible desde products-ms.
- IAM Role de EventBridge con permisos `sqs:SendMessage` sobre la cola de notifications.
- Variable de entorno `APP_BASE_URL` apunta al frontend desplegado (para el enlace de email).

Con esto el entorno Develop queda listo para implementar y cerrar los criterios de aceptación de WhatsApp en HU-05 junto con el correo (Resend) y la landing `https://platampay.com/auth/{externalId}`.