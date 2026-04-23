# HU-C01 — Solicitud de Préstamo Bullet BNPL con Partner · SR y API

**Épica:** epic-03-core-financiero  
**Producto:** BNPL con Partner  
**Modalidad:** Bullet (pago único al vencimiento)  
**Canales:** Sales Rep (portal web) · API del Partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal de mi partner,  
**quiero** crear una solicitud de préstamo **bullet** para un cliente activo,  
**para** que Platam financie su compra una vez el cliente la apruebe 
y confirmemos la entrega.

---

## Contexto

Este flujo cubre la originación de un préstamo **bullet** BNPL donde 
el cliente paga el total en una sola cuota al vencimiento del plazo.
Existe un partner que entrega el producto y confirma la entrega 
antes de que el préstamo se active.

> Préstamos en cuotas con partner se documentan en **HU-C02**.

El flujo tiene tres actores secuenciales:
1. **SR / API** — crea la solicitud
2. **Cliente** — aprueba el uso de su cupo
3. **Partner ops** — confirma la entrega y el monto final facturado

La confirmación de entrega activa el préstamo (cubierto en HU-C03).

> La tabla que gestiona todo el ciclo previo al préstamo activo es 
> `loan_requests`. Una vez aprobada, esta tabla origina un registro 
> en `loans` (cubierto en HU-C04).

---

## Estados de `loan_requests`

| Código | Nombre visible | Bloquea LOC | Descripción |
|---|---|---|---|
| `pending_client_approval` | Aprobación del cliente pendiente | No | Estado inicial al crear la solicitud |
| `pending_partner_approval` | Aprobación partner pendiente | **Sí** | Cliente aprobó, esperando confirmación de entrega |
| `approved` | Aprobada | No (el préstamo toma el relevo) | Partner confirmó — se creó el préstamo |
| `rejected` | Rechazada | No | Rechazada por cliente o por partner |
| `cancelled` | Cancelada | No | Cancelada por el SR o por el sistema |

---

## Flujo SR — Crear Solicitud

### Paso 1 — Buscar cliente

El SR busca al cliente por cualquiera de estos identificadores:
- Número de documento
- Correo electrónico
- Número de celular

El sistema valida en el orden que se muestra a continuación. 
En todos los casos de error se muestra feedback en pantalla al SR.

| Validación                                    | Condición de error                                                                                                             | Mensaje al SR                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| El cliente existe                             | No se encuentra en `persons` / `users`                                                                                         | "El cliente no está registrado en Platam. Puedes registrarlo aquí." + enlace al flujo de onboarding |
| El cliente está activo                        | `users.status_id != active`                                                                                                    | "El cliente se encuentra bloqueado. Comunícate con el equipo de Platam."                            |
| El cliente tiene LOC activa                   | No existe `credit_facilities` activa para el cliente                                                                           | "El cliente no tiene una línea de crédito activa."                                                  |
| El cliente tiene categoría activa del partner | No existe ninguna categoría activa con `partner_id` del SR y `credit_facility_id` del cliente en `client_category_assignments` | "El cliente no tiene una categoría activa con este partner."                                        |
| El cliente tiene cupo suficiente              | `available_loc < monto_solicitado` (ver cálculo abajo)                                                                         | "El cliente no tiene cupo suficiente. Cupo disponible: $X"                                          |

**Cálculo de cupo disponible:**
```
available_loc = credit_facilities.total_limit
  - SUM(loan_requests.requested_amount 
        WHERE status = 'pending_partner_approval' 
        AND credit_facility_id = cliente)
  - SUM(loans.outstanding_balance 
        WHERE status NOT IN ('paid', 'cancelled')
        AND credit_facility_id = cliente)
```

> En cuanto el cliente pasa las validaciones de existencia, estado 
> activo, LOC activa y categoría activa, el sistema muestra el 
> **cupo disponible** antes de que el SR ingrese datos del pedido. 
> La validación de cupo suficiente se ejecuta al ingresar el monto.

---

### Paso 2 — Datos de la solicitud

Si el cliente pasa las validaciones del Paso 1, se muestra el 
formulario de solicitud junto con el cupo disponible visible en pantalla:

| Label | Campo DB | Tabla | Tipo | Validaciones / Notas |
|---|---|---|---|---|
| Referencia del pedido * | `order_reference` | `loan_requests` | Texto | Obligatorio. Único (error si ya existe en `loan_requests`). Sin espacios dobles consecutivos (validación frontend + backend). |
| Categoría * | `category_id` | `loan_requests` | Dropdown | **Condicional:** solo se muestra si el cliente tiene >1 categoría activa del partner (busca en `client_category_assignments` WHERE `credit_facility_id` = cliente AND `partner_id` = partner del SR AND `is_active` = true). Si tiene exactamente 1, se asigna automáticamente y no se muestra. El dropdown lista las categorías disponibles desde `partner_categories`. |
| Monto del pedido * | `requested_amount` | `loan_requests` | Numérico (COP) | Min: $1. Al ingresar el monto se ejecuta la validación de cupo disponible. |

> El `partner_id` y `sales_rep_id` se resuelven automáticamente 
> desde la sesión autenticada del SR.  
> El `credit_facility_id` se resuelve desde el cliente encontrado 
> en el Paso 1.

---

### Paso 3 — Confirmación y envío

El SR revisa un resumen antes de enviar:
- Nombre del cliente
- Categoría seleccionada (con plazo y condiciones visibles)
- Monto del pedido
- Referencia del pedido

Al confirmar, el sistema ejecuta el flujo de almacenamiento.

---

## Flujo API — Diferencias con el canal SR

El canal API sigue exactamente la misma lógica de validaciones y 
almacenamiento. Las diferencias son:

| Aspecto | Canal SR | Canal API |
|---|---|---|
| Identificador del cliente | Documento, email o celular | Solo número de documento |
| Selección de categoría | Dropdown si hay >1 | Se envía `category_external_id` en el request. Si el cliente no tiene esa categoría activa → error 422 |
| Feedback de errores | Mensajes en pantalla | HTTP response codes + mensaje descriptivo en body |

---

## Almacenamiento al Enviar

### 1. Crear registro en `loan_requests`
```
credit_facility_id   → de la credit_facility activa del cliente
category_id          → seleccionada o auto-asignada (apunta a partner_categories.id)
partner_id           → del partner del SR / API Key
sales_rep_id         → de la sesión del SR (null si canal API)
channel              → LoanRequestChannel.SR_PORTAL ('sr_portal') | LoanRequestChannel.API ('api')
order_reference      → del formulario
requested_amount     → del formulario
confirmed_amount     → null (se llena cuando partner confirma entrega)
product_type         → LoanRequestProductType.BNPL_PARTNER ('bnpl_partner')
loan_modality        → ModalityTypes.BULLET ('bullet')
status               → LoanRequestStatus.PENDING_CLIENT_APPROVAL ('pending_client_approval')
```

### 2. Enviar notificación al cliente

Se envían simultáneamente WhatsApp y correo. Hay dos variantes 
según si la categoría tiene `disbursement_fee_percent > 0` o no.

> Los botones de aprobación y rechazo corresponden al flujo 
> descrito en HU-C03.

---

#### Plantillas WhatsApp (Meta Utility Templates)

> **Criterios de diseño:** máximo 1024 caracteres, máximo 2 emojis 
> por mensaje, sin bullets con emojis (disparan reclasificación a 
> Marketing). Botones de respuesta rápida: "Aprobar" / "Rechazar".

**Variante A — Sin fee de desembolso**  
Nombre de plantilla: `loan_request_no_fee`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference, 
`{{3}}`=nombre partner, `{{4}}`=monto pedido formateado (COP), 
`{{5}}`=term_days, `{{6}}`=días gracia mora

```
¡Hola, {{1}}! 👋

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles:
- Valor del pedido: {{4}}
- Plazo: {{5}} días
- Interés: 0% (financiamiento gratis)

*Aplican intereses de mora a partir del día {{6}}.

Usa los botones para aceptar o rechazar.
```
*Botones:* [Aprobar] [Rechazar]

~320 caracteres. Seguro como Utility.

---

**Variante B — Con fee de desembolso**  
Nombre de plantilla: `loan_request_with_fee`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference, 
`{{3}}`=nombre partner, `{{4}}`=monto pedido formateado (COP), 
`{{5}}`=valor fee formateado (COP), `{{6}}`=porcentaje fee,
`{{7}}`=total a pagar (monto + fee + IVA del fee) formateado (COP),
`{{8}}`=term_days, `{{9}}`=días gracia mora

```
¡Hola, {{1}}! 👋

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles:
- Valor del pedido: {{4}}
- Comisión de desembolso: {{5}} ({{6}}% + IVA)
- Total a pagar: {{7}}
- Plazo: {{8}} días

*Aplican intereses de mora a partir del día {{9}}.

Usa los botones para aceptar o rechazar.
```
*Botones:* [Aprobar] [Rechazar]

~380 caracteres. Seguro como Utility.

---

#### Plantillas Email

**Variante A — Sin fee de desembolso**

```
Asunto: Solicitud de financiamiento - Pedido No. {{2}} · Platam | {{3}}

Hola {{1}},

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles de la solicitud:
────────────────────────────
Valor del pedido:   {{4}}
Plazo:              {{5}} días
Interés:            0% (financiamiento gratis)
────────────────────────────

*Aplican intereses de mora a partir del día {{5}} de atraso.

Si autorizas esta compra, el crédito quedará activo una vez 
{{3}} confirme la entrega de tu pedido.

[Aprobar compra]  [Rechazar]

¿Tienes dudas? Escríbenos a soporte@platam.co

Platam — www.platam.co
```

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference, 
`{{3}}`=nombre partner, `{{4}}`=monto formateado (COP), 
`{{5}}`=term_days

---

**Variante B — Con fee de desembolso**

```
Asunto: Solicitud de financiamiento - Pedido No. {{2}} · Platam | {{3}}

Hola {{1}},

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles de la solicitud:
────────────────────────────
Valor del pedido:          {{4}}
Comisión de desembolso:    {{5}} ({{6}}% + IVA)
Total a pagar:             {{7}}
Plazo:                     {{8}} días
────────────────────────────

*Aplican intereses de mora a partir del día {{9}} de atraso.

Si autorizas esta compra, el crédito quedará activo una vez 
{{3}} confirme la entrega de tu pedido.

[Aprobar compra]  [Rechazar]

¿Tienes dudas? Escríbenos a soporte@platam.co

Platam — www.platam.co
```

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference, 
`{{3}}`=nombre partner, `{{4}}`=monto pedido (COP), 
`{{5}}`=valor fee (COP), `{{6}}`=porcentaje fee, 
`{{7}}`=total a pagar (COP), `{{8}}`=term_days, 
`{{9}}`=días gracia mora

---

---

#### Variante C — Con interés corriente (sin fee de desembolso)

Nombre de plantilla WA: `loan_request_with_interest`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference,
`{{3}}`=nombre partner, `{{4}}`=monto pedido (COP),
`{{5}}`=tasa EA (ej. "24% EA"), `{{6}}`=intereses totales (COP),
`{{7}}`=total a pagar (capital + intereses) (COP), `{{8}}`=term_days, `{{9}}`=días gracia mora

**WhatsApp:**
```
¡Hola, {{1}}! 👋

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles:
- Valor del pedido: {{4}}
- Tasa de interés: {{5}}
- Intereses totales: {{6}}
- Total a pagar al vencimiento: {{7}}
- Plazo: {{8}} días

*Aplican intereses de mora a partir del día {{9}}.

Usa los botones para aceptar o rechazar.
```
*Botones:* [Aprobar] [Rechazar]

~400 caracteres. Seguro como Utility.

**Email:**
```
Asunto: Solicitud de financiamiento - Pedido No. {{2}} · Platam | {{3}}

Hola {{1}},

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles de la solicitud:
────────────────────────────
Valor del pedido:            {{4}}
Tasa de interés:             {{5}}
Intereses totales:           {{6}}
Total a pagar al vencimiento: {{7}}
Plazo:                       {{8}} días
────────────────────────────

*Aplican intereses de mora a partir del día {{9}} de atraso.

Si autorizas esta compra, el crédito quedará activo una vez 
{{3}} confirme la entrega de tu pedido.

[Aprobar compra]  [Rechazar]

¿Tienes dudas? Escríbenos a soporte@platam.co

Platam — www.platam.co
```

---

> **Lógica de selección de variante** (aplica igual WA y email):
>
> - `disbursement_fee_percent > 0` y `interest_rate = 0` → **Variante B** (fee)
> - `interest_rate > 0` y `disbursement_fee_percent = 0` → **Variante C** (interés)
> - ambos = 0 o null → **Variante A** (gratis)
>
> ⚠️ Si `fee > 0` e `interest_rate > 0` simultáneamente → requiere
> Variante D combinada antes de implementar. Bloqueante de desarrollo.

---

## Confirmación al SR

Tras el envío exitoso se muestra en pantalla:

> **Solicitud creada exitosamente**
>
> La solicitud ha sido enviada al cliente [nombre] por WhatsApp 
> y correo electrónico para que autorice el uso de su línea de 
> crédito. Referencia: [order_reference]

---

## Criterios de Aceptación

- [ ] El SR puede buscar un cliente por documento, email o celular
- [ ] El sistema valida en orden: existencia → estado activo → 
      LOC activa → categoría activa del partner
- [ ] Cada error de validación muestra un mensaje específico y 
      accionable al SR
- [ ] Al pasar las validaciones del Paso 1 el sistema muestra el 
      cupo disponible antes de que el SR ingrese datos del pedido
- [ ] `order_reference` es obligatorio y único — error si ya existe 
      un registro con ese valor en `loan_requests`
- [ ] El frontend valida que `order_reference` no contenga dos o 
      más espacios consecutivos; el backend también lo valida
- [ ] El dropdown de categorías solo aparece si el cliente tiene 
      más de una categoría activa del partner; si tiene exactamente 
      una, se asigna automáticamente sin mostrarse
- [ ] La validación de cupo suficiente se ejecuta al ingresar el 
      monto y muestra el cupo disponible en caso de ser insuficiente
- [ ] Al crear la solicitud, `status_id` queda en 
      `pending_client_approval`
- [ ] La solicitud en `pending_client_approval` **no** afecta el 
      `available_loc` del cliente
- [ ] El sistema selecciona la variante de notificación correcta 
      (con fee / sin fee) según `categories.disbursement_fee_percent`
- [ ] Se envían automáticamente WhatsApp y correo al cliente con 
      botones de aprobación y rechazo
- [ ] Las plantillas de WhatsApp cumplen con los límites de Meta 
      para Utility Templates (≤1024 chars, ≤2 emojis)
- [ ] El SR ve confirmación en pantalla con la referencia del pedido
- [ ] Canal API: identificación del cliente solo por número de 
      documento; `category_external_id` requerido en el request
- [ ] Canal API: errores de validación retornan HTTP 422 con 
      mensaje descriptivo en body

---

## Notas de Schema

Esta HU requiere la tabla `loan_requests` (nueva). Campos mínimos 
identificados para esta HU:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `credit_facility_id` | bigint FK | → `credit_facilities.id` |
| `category_id` | bigint FK | → `partner_categories.id` |
| `partner_id` | bigint FK | → `partners.id` |
| `sales_rep_id` | bigint FK nullable | → `sales_representatives.id` |
| `channel` | varchar enum | `LoanRequestChannel`: 'sr_portal', 'client_portal', 'api' |
| `product_type` | varchar enum | `LoanRequestProductType`: 'bnpl_partner', 'bnpl_supplier' |
| `order_reference` | varchar | referencia externa del pedido |
| `requested_amount` | decimal(18,4) | monto solicitado por el SR |
| `confirmed_amount` | decimal(18,4) nullable | monto confirmado por partner al entregar |
| `status` | varchar enum | `LoanRequestStatus`: 'pending_client_approval', 'pending_partner_approval', etc. |
| `client_approved_at` | timestamptz nullable | — |
| `partner_approved_at` | timestamptz nullable | — |
| `rejected_by` | varchar nullable | 'CLIENT', 'PARTNER', 'SYSTEM' |
| `rejection_reason` | text nullable | — |
| `created_at` | timestamptz | insert DB-generated |
| `updated_at` | timestamptz | insert DB-generated |

> El schema detallado y las FK adicionales se definen en la 
> sesión de schema del epic-03.
