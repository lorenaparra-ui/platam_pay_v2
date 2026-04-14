# HU-C02 — Solicitud de Préstamo en Cuotas BNPL con Partner · SR y API

**Épica:** epic-03-core-financiero  
**Producto:** BNPL con Partner  
**Modalidad:** Cuotas (amortización mensual)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal de mi partner,  
**quiero** crear una solicitud de préstamo en cuotas para un cliente activo,  
**para** que Platam financie su compra con un plan de pagos mensual.

---

## Contexto

Este flujo es una extensión de HU-C01 (Bullet). Comparte la misma 
lógica de validaciones, búsqueda de cliente y canales (SR / API). 
Las diferencias están en:

1. La categoría tiene `modality = 'CUOTAS'` — expone campos de plazo 
   y parámetros de amortización.
2. Se muestra un **resumen de crédito** estimado en el formulario 
   (cuota mensual, cuota inicial si aplica) calculado en el frontend.
3. Si la categoría tiene `initial_payment_pct > 0`, el flujo incluye 
   un estado adicional `pending_initial_payment` entre la aprobación 
   del cliente y la confirmación del partner.

> La confirmación de entrega y activación del préstamo se documentan 
> en HU-C03 y HU-C04.

---

## Modelos de financiamiento (según configuración de la categoría)

| Caso | `discount_pct` | `interest_rate` | Quién cubre el costo |
|---|---|---|---|
| A | 0 | > 0 | Cliente cubre 100% |
| B | > 0 | 0 | Partner cubre 100% |
| C | > 0 | > 0 | Mixto: partner y cliente comparten |

En los tres casos la cuota mensual se calcula sobre el 
`interest_rate` de la categoría. Si `interest_rate = 0`, 
la cuota es solo capital (financiamiento gratis para el cliente).

---

## Configuración de categoría para cuotas

Los siguientes campos se agregan a la tabla `partner_categories` 
(complementan los campos existentes de HU-C01):

| Campo | Tipo | Descripción |
|---|---|---|
| `modality` | varchar not null | `'BULLET'` \| `'CUOTAS'` |
| `installment_count` | int nullable | Número de cuotas disponibles. Puede ser un valor fijo o múltiples opciones (ver nota abajo) |
| `installment_frequency` | varchar nullable | Frecuencia de pago: `'MONTHLY'` \| `'BIWEEKLY'` \| `'WEEKLY'` |
| `initial_payment_pct` | decimal(5,4) nullable | % de cuota inicial sobre el monto del pedido. 0 = sin cuota inicial |

> **Plazos múltiples:** una categoría puede ofrecer más de un plazo 
> (ej. 3, 6, 9, 12 meses con distintas tasas y cuotas iniciales). 
> Esto requiere una tabla `installment_plans` separada vinculada a 
> `partner_categories`. Se define en la sesión de schema del epic-03.

---

## Flujo de estados `loan_requests` — Cuotas

```
pending_client_approval
  ↓ cliente aprueba
[pending_initial_payment]  ← solo si initial_payment_pct > 0
  ↓ cliente paga cuota inicial (link de pago Payvalida)
pending_partner_approval   ← LOC se bloquea aquí
  ↓ partner confirma entrega
approved
  ↓ sistema activa
[préstamo creado en loans — HU-C04]
```

Sin cuota inicial: salta directo de `pending_client_approval` 
a `pending_partner_approval`.

---

## Flujo SR — Diferencias vs HU-C01

### Paso 1 — Buscar cliente
Idéntico a HU-C01. El cupo disponible se muestra en pantalla 
en cuanto el cliente pasa las validaciones.

### Paso 2 — Datos de la solicitud

| Label | Campo DB | Tabla | Tipo | Validaciones / Notas |
|---|---|---|---|---|
| Referencia del pedido * | `order_reference` | `loan_requests` | Texto | Obligatorio. Único. Sin espacios dobles consecutivos. |
| Categoría * | `category_id` | `loan_requests` | Dropdown | Solo si cliente tiene >1 categoría activa del partner (busca en `client_category_assignments`). Si tiene 1, se asigna automáticamente. |
| Monto del pedido * | `requested_amount` | `loan_requests` | Numérico (COP) | Al ingresar el monto se valida cupo y se activa el resumen de crédito. |
| Plazo * | `installment_count` | `loan_requests` | Dropdown | Muestra los plazos disponibles de la categoría (ej. 3, 6, 9, 12 meses). Obligatorio. |

### Resumen de crédito (componente frontend)

Se activa en cuanto el SR ingresa monto y selecciona plazo. 
No requiere llamada al backend — se calcula en el frontend.

Campos mostrados:

| Etiqueta | Lógica de cálculo |
|---|---|
| Monto del pedido | `requested_amount` |
| Plazo seleccionado | `installment_count` meses |
| Tasa de interés | `interest_rate` EA de la categoría / plan |
| Cuota inicial | `requested_amount × initial_payment_pct` (oculto o atenuado si = 0, muestra tag "SIN CUOTA INICIAL") |
| Cuota est. por periodo | Ver fórmula abajo. El label cambia según frecuencia: "Cuota mensual", "Cuota quincenal", "Cuota semanal" |

**Fórmula cuota por periodo (frontend):**
```
monto_financiar = requested_amount - (requested_amount × initial_payment_pct)

-- Días por periodo según frecuencia:
MONTHLY   → 30 días
BIWEEKLY  → 15 días
WEEKLY    → 7 días

tasa_periodo = (1 + interest_rate_EA)^(dias_periodo/365) - 1
cuota        = monto_financiar × (tasa_periodo × (1 + tasa_periodo)^n)
               / ((1 + tasa_periodo)^n - 1)
```
Donde `n = installment_count`.

> Si `interest_rate = 0` → cuota = `monto_financiar / n`

> Este cálculo es **estimado**. La tabla de amortización definitiva 
> se genera en HU-C04 usando la fecha real de desembolso (entrega 
> confirmada por el partner).

---

## Almacenamiento al Enviar

### 1. Crear registro en `loan_requests`
```
credit_facility_id     → de la credit_facility activa del cliente
category_id            → seleccionada o auto-asignada (apunta a partner_categories.id)
partner_id             → del partner del SR / API Key
sales_rep_id           → de la sesión del SR (null si API)
channel                → LoanRequestChannel.SR_PORTAL ('sr_portal') | LoanRequestChannel.API ('api')
order_reference        → del formulario
requested_amount       → del formulario
installment_count      → plazo seleccionado
initial_payment_amount → requested_amount × initial_payment_pct
                         (0 si initial_payment_pct = 0)
confirmed_amount       → null
product_type           → LoanRequestProductType.BNPL_PARTNER ('bnpl_partner')
loan_modality          → ModalityTypes.CUOTAS ('cuotas')
status                 → LoanRequestStatus.PENDING_CLIENT_APPROVAL ('pending_client_approval')
```

### 2. Notificación al cliente

Se selecciona la variante según `interest_rate` y 
`disbursement_fee_percent` de la categoría (igual que HU-C01), 
más la variante de cuota inicial si aplica.

---

## Plantillas de Notificación

#### WhatsApp

> Criterios Meta Utility: ≤1024 chars, ≤2 emojis, sin bullets con emojis.

**Variante A — Sin interés, sin cuota inicial**  
Nombre: `installment_request_free`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference,
`{{3}}`=nombre partner, `{{4}}`=monto pedido (COP),
`{{5}}`=número cuotas, `{{6}}`=cuota mensual est. (COP),
`{{7}}`=días gracia mora

```
¡Hola, {{1}}! 👋

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles:
- Valor del pedido: {{4}}
- Plan: {{5}} cuotas mensuales
- Cuota mensual: {{6}} (sin intereses)

*Aplican intereses de mora a partir del día {{7}}.

Usa los botones para aceptar o rechazar.
```
*Botones:* [Aprobar] [Rechazar] · ~320 chars

---

**Variante B — Con interés, sin cuota inicial**  
Nombre: `installment_request_interest`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference,
`{{3}}`=nombre partner, `{{4}}`=monto pedido (COP),
`{{5}}`=tasa EA, `{{6}}`=número cuotas,
`{{7}}`=cuota mensual est. (COP), `{{8}}`=días gracia mora

```
¡Hola, {{1}}! 👋

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles:
- Valor del pedido: {{4}}
- Tasa de interés: {{5}}
- Plan: {{6}} cuotas mensuales
- Cuota mensual est.: {{7}}

*Aplican intereses de mora a partir del día {{8}}.

Usa los botones para aceptar o rechazar.
```
*Botones:* [Aprobar] [Rechazar] · ~370 chars

---

**Variante C — Con cuota inicial (con o sin interés)**  
Nombre: `installment_request_initial_payment`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference,
`{{3}}`=nombre partner, `{{4}}`=monto pedido (COP),
`{{5}}`=cuota inicial (COP), `{{6}}`=tasa EA (omitir si = 0%),
`{{7}}`=número cuotas, `{{8}}`=cuota mensual est. (COP),
`{{9}}`=días gracia mora

```
¡Hola, {{1}}! 👋

{{3}} ha registrado una solicitud de financiamiento para tu 
pedido No. {{2}} con tu línea de crédito Platam.

Detalles:
- Valor del pedido: {{4}}
- Cuota inicial: {{5}} (se cobra antes de activar el crédito)
- Tasa de interés: {{6}}
- Plan: {{7}} cuotas mensuales sobre el saldo restante
- Cuota mensual est.: {{8}}

*Aplican intereses de mora a partir del día {{9}}.

Usa los botones para aceptar o rechazar.
```
*Botones:* [Aprobar] [Rechazar] · ~430 chars

---

**Lógica de selección de variante:**
- `initial_payment_pct > 0` → **Variante C** (siempre, independiente del interés)
- `initial_payment_pct = 0` y `interest_rate > 0` → **Variante B**
- `initial_payment_pct = 0` y `interest_rate = 0` → **Variante A**

---

#### Plantillas Email

**Variante A — Sin interés, sin cuota inicial**
```
Asunto: Solicitud de financiamiento en cuotas - Pedido No. {{2}} · Platam | {{3}}

Hola {{1}},

{{3}} ha registrado una solicitud de financiamiento en cuotas para 
tu pedido No. {{2}} con tu línea de crédito Platam.

Detalles de la solicitud:
────────────────────────────
Valor del pedido:    {{4}}
Plan de pagos:       {{5}} cuotas mensuales
Cuota mensual est.:  {{6}}
Interés:             0% (financiamiento gratis)
────────────────────────────

*Aplican intereses de mora a partir del día {{7}} de atraso.

Si autorizas esta compra, el crédito quedará activo una vez 
{{3}} confirme la entrega de tu pedido.

[Aprobar compra]  [Rechazar]

¿Tienes dudas? Escríbenos a soporte@platam.co
Platam — www.platam.co
```

---

**Variante B — Con interés, sin cuota inicial**
```
Asunto: Solicitud de financiamiento en cuotas - Pedido No. {{2}} · Platam | {{3}}

Hola {{1}},

{{3}} ha registrado una solicitud de financiamiento en cuotas para 
tu pedido No. {{2}} con tu línea de crédito Platam.

Detalles de la solicitud:
────────────────────────────
Valor del pedido:    {{4}}
Tasa de interés:     {{5}}
Plan de pagos:       {{6}} cuotas mensuales
Cuota mensual est.:  {{7}}
────────────────────────────

*Aplican intereses de mora a partir del día {{8}} de atraso.

Si autorizas esta compra, el crédito quedará activo una vez 
{{3}} confirme la entrega de tu pedido.

[Aprobar compra]  [Rechazar]

¿Tienes dudas? Escríbenos a soporte@platam.co
Platam — www.platam.co
```

---

**Variante C — Con cuota inicial**
```
Asunto: Solicitud de financiamiento en cuotas - Pedido No. {{2}} · Platam | {{3}}

Hola {{1}},

{{3}} ha registrado una solicitud de financiamiento en cuotas para 
tu pedido No. {{2}} con tu línea de crédito Platam.

Detalles de la solicitud:
────────────────────────────
Valor del pedido:    {{4}}
Cuota inicial:       {{5}}
Tasa de interés:     {{6}}
Plan de pagos:       {{7}} cuotas sobre saldo restante
Cuota mensual est.:  {{8}}
────────────────────────────

*La cuota inicial se cobra antes de activar el crédito. 
 Recibirás un enlace de pago al aprobar esta solicitud.
*Aplican intereses de mora a partir del día {{9}} de atraso.

Si autorizas esta compra, el crédito quedará activo una vez 
{{3}} confirme la entrega de tu pedido.

[Aprobar compra]  [Rechazar]

¿Tienes dudas? Escríbenos a soporte@platam.co
Platam — www.platam.co
```

---

## Notificación de link de pago (cuota inicial)

Cuando el cliente aprueba y la solicitud tiene `initial_payment_amount > 0`, 
el sistema genera un link de pago vía Payvalida y envía:

**WhatsApp** — Nombre: `initial_payment_link`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference,
`{{3}}`=monto cuota inicial (COP), `{{4}}`=link de pago,
`{{5}}`=horas vigencia del link

```
Hola {{1}}, para activar tu crédito del pedido No. {{2}} 
debes pagar la cuota inicial de {{3}}.

Usa este enlace para realizar el pago:
{{4}}

El enlace vence en {{5}} horas.
```
*Sin botones — mensaje informativo* · ~220 chars

**Email** — mismo contenido con el link como botón CTA.

> El link de pago tiene vigencia de **8 días**. Si vence sin pago,
> la solicitud pasa a `cancelled` automáticamente y se notifica al SR.

---

## Confirmación al SR

Tras el envío exitoso se muestra en pantalla:

> **Solicitud creada exitosamente**
>
> La solicitud ha sido enviada a [nombre del cliente] por WhatsApp 
> y correo. Referencia: [order_reference]  
> Plan: [n] cuotas · Cuota mensual est.: [valor]  
> [Si aplica] Cuota inicial: [valor] — pendiente de pago por el cliente.

---

## Criterios de Aceptación

- [ ] Solo categorías con `modality = 'CUOTAS'` originan este flujo
- [ ] El dropdown de plazo muestra las opciones configuradas en la 
      categoría / `installment_plans`
- [ ] El resumen de crédito se calcula en el frontend al ingresar 
      monto y plazo, sin llamada al backend
- [ ] Si `initial_payment_pct = 0` el resumen muestra el tag 
      "SIN CUOTA INICIAL" y atenúa la fila de cuota inicial
- [ ] `order_reference` es obligatorio, único y sin espacios dobles
- [ ] La solicitud se crea con `loan_modality = 'CUOTAS'` e 
      `initial_payment_amount` calculado
- [ ] Si `initial_payment_pct = 0`: estado inicial 
      `pending_client_approval` → al aprobar pasa directo a 
      `pending_partner_approval` (LOC se bloquea)
- [ ] Si `initial_payment_pct > 0`: al aprobar el cliente pasa a 
      `pending_initial_payment`; LOC se bloquea solo al completar 
      el pago inicial y pasar a `pending_partner_approval`
- [ ] Al entrar en `pending_initial_payment` se genera link de pago 
      Payvalida y se envía al cliente por WhatsApp y correo
- [ ] El sistema selecciona la variante de notificación correcta 
      (A / B / C) según la configuración de la categoría
- [ ] Las plantillas WA cumplen límites Meta Utility (≤1024 chars, ≤2 emojis)
- [ ] Canal API: mismas reglas que HU-C01 más `installment_count` 
      requerido en el request
- [ ] El SR ve confirmación en pantalla incluyendo cuota mensual 
      estimada y cuota inicial si aplica

---

## Notas de Schema

Campos adicionales en `loan_requests` vs HU-C01:

| Campo | Tipo | Notas |
|---|---|---|
| `loan_modality` | varchar | 'BULLET' \| 'CUOTAS' |
| `installment_count` | int nullable | plazo en cuotas seleccionado |
| `initial_payment_amount` | decimal(18,4) nullable | monto calculado al crear |
| `initial_payment_paid_at` | timestamptz nullable | cuando Payvalida confirma el pago |

Nuevos campos en `partner_categories`:

| Campo | Tipo | Notas |
|---|---|---|
| `modality` | varchar not null | 'BULLET' \| 'CUOTAS' |
| `installment_frequency` | varchar nullable | 'MONTHLY' \| 'BIWEEKLY' \| 'WEEKLY'. Solo aplica si `modality = 'CUOTAS'` |
| `initial_payment_pct` | decimal(5,4) nullable | 0 = sin cuota inicial |

> **`installment_plans`** es una tabla configurada por el equipo Platam
> (no editable por el partner). Estructura mínima:
> `category_id` (FK a `partner_categories`), `installment_count`, `interest_rate_ea`, `initial_payment_pct`.
> Cada categoría de tipo CUOTAS puede tener N planes. Definir detalle en sesión de schema.
