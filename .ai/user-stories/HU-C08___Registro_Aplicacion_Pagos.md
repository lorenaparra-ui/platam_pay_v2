# HU-C08 — Registro y Aplicación de Pagos

**Épica:** epic-03-core-financiero  
**Tipo:** Backend + Backoffice (analista) + Integración Payvalida  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** sistema y como analista de Platam,  
**quiero** registrar pagos de clientes y aplicarlos a sus préstamos 
siguiendo el waterfall de pagos,  
**para** mantener los saldos actualizados y notificar al cliente 
del resultado.

---

## Contexto

### Problema del core actual
En el core actual cada registro de pago solo puede afectar un préstamo. 
Cuando un pago cubre múltiples préstamos, el sistema parte el pago 
original en N pagos individuales — uno por préstamo — perdiendo 
la trazabilidad del pago original.

### Solución en v2: dos tablas separadas

```
payments              → Un registro por pago recibido (la plata real)
payment_allocations   → N registros por pago (cómo se aplicó a cada préstamo)
```

Esto permite split payments con trazabilidad completa del origen.

---

## Canales de ingreso de pagos

| Canal | Actor | Identificación del cliente | Distribución |
|---|---|---|---|
| **Payvalida webhook** | Sistema automático | Por referencia de pago | FIFO por fecha vencimiento |
| **Manual por cliente** | Analista | Busca al cliente | FIFO por fecha vencimiento |
| **Manual por préstamo** | Analista | Busca el préstamo directamente | Solo ese préstamo |

---

## Canal 1 — Payvalida Webhook

Payvalida notifica a Platam cuando un cliente paga mediante 
la pasarela. El sistema procesa automáticamente sin intervención 
del analista.

### Flujo
```
1. Recibir webhook de Payvalida
2. Identificar cliente por referencia de pago
3. Crear registro en payments
4. Buscar préstamos activos del cliente ordenados por due_date ASC (FIFO)
5. Aplicar waterfall por préstamo hasta agotar el monto
6. Crear payment_allocations por cada préstamo afectado
7. Actualizar saldos de loans
8. Notificar al cliente
```

### Datos del webhook Payvalida
```
payment_reference    → referencia del link de pago
amount               → monto pagado
payment_date         → fecha/hora del pago
transaction_id       → ID de transacción Payvalida
```

---

## Canal 2 — Ingreso Manual por Cliente

El analista registra un pago recibido por transferencia o 
consignación y lo asocia a un cliente. El sistema distribuye 
el pago automáticamente igual que Payvalida.

### Formulario backoffice

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Cliente | Búsqueda por nombre, doc o teléfono | Sí | |
| Monto | Numérico (COP) | Sí | |
| Fecha del pago | Fecha | Sí | Fecha en que el cliente realizó el pago |
| Medio de pago | Dropdown | Sí | Transferencia / Consignación / Otro |
| Comprobante | PDF o imagen, max 10 MB | Sí | |
| Referencia | Texto | No | Referencia bancaria del cliente |
| Notas | Texto libre | No | Uso interno |
| Es pago a partner | Checkbox | No | Ver nota abajo |

> **Es pago a partner:** si el cliente pagó directamente al partner 
> en lugar de a Platam, se marca este flag. El sistema aplica el 
> pago igual pero genera automáticamente un ajuste de tipo 
> `CLIENT_PAYS_PARTNER` en `partner_adjustments` para cruzarlo 
> en el próximo desembolso (ver HU-C07).

---

## Canal 3 — Ingreso Manual por Préstamo

El analista selecciona un préstamo específico y aplica el pago 
únicamente a ese préstamo. Este canal se usa para:
- Pagos muy específicos que no deben distribuirse
- Ajustes de cancelación parcial o total (del partner)

### Formulario backoffice

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Préstamo | Búsqueda por ID, order_reference o cliente | Sí | |
| Tipo de pago | Dropdown | Sí | Ver tipos abajo |
| Monto | Numérico (COP) | Sí | |
| Fecha del pago | Fecha | Sí | |
| Medio de pago | Dropdown | Sí | |
| Comprobante | PDF o imagen | Sí (si tipo = PAGO_NORMAL) | |
| Notas | Texto libre | No | |

**Tipos de pago para ingreso por préstamo:**

| Tipo | Descripción | Genera ajuste partner |
|---|---|---|
| `PAGO_NORMAL` | Pago regular del cliente | No |
| `ABONO_CUOTA` | Abono a cuota específica (cuotas) | No |
| `CANCELACION_PARCIAL` | Devolución parcial del partner | Sí — `PARTIAL_RETURN` |
| `CANCELACION_TOTAL` | Devolución total — cancela préstamo | Sí — `TOTAL_RETURN` |
| `PAGO_A_PARTNER` | Cliente pagó al partner | Sí — `CLIENT_PAYS_PARTNER` |

---

## Waterfall de Pagos

Antes de aplicar el pago, el sistema verifica si el cliente 
tiene saldo a favor en `credit_balances` con status `available`. 
Si existe, se suma al monto del pago entrante antes de correr 
el waterfall y el registro de `credit_balance` pasa a `consumed`.

Orden de aplicación por préstamo:

```
1. IVA
2. Comisiones de cobranza
3. Interés de mora
4. Interés vencido
5. Capital vencido
6. Interés corriente
7. Capital futuro (prepago)
```

Después de aplicar el pago a un préstamo:
- Si queda saldo remanente → continúa al siguiente préstamo (FIFO)
- Si el saldo del préstamo queda < `global_params.paid_tolerance` (default $2.000) → `loans.status → 'paid'` y saldo se perdona
- Si el monto pagado supera toda la deuda → crear registro en `credit_balances` con el excedente

Para préstamos en cuotas (`loan_modality = 'CUOTAS'`), después 
de un `ABONO_CUOTA` o `PAGO_NORMAL` el `schedule_current` se 
recalcula con el capital restante y las fechas futuras pendientes.

---

## Almacenamiento

### Tabla `payments`
```
credit_facility_id   → del cliente
channel              → 'PAYVALIDA' | 'MANUAL_CLIENT' | 'MANUAL_LOAN'
payment_type         → 'PAGO_NORMAL' | 'ABONO_CUOTA' | 'CANCELACION_PARCIAL' | 
                       'CANCELACION_TOTAL' | 'PAGO_A_PARTNER'
amount               → monto total recibido
payment_date         → fecha del pago
payment_method       → 'PAYVALIDA' | 'TRANSFER' | 'DEPOSIT' | 'OTHER'
reference            → referencia bancaria o de pasarela
voucher_url          → URL S3 del comprobante
payvalida_tx_id      → ID transacción Payvalida (solo canal 1)
is_partner_payment   → boolean (true si el cliente pagó al partner)
remaining_balance    → saldo a favor si el pago superó toda la deuda
notes                → notas del analista
created_by           → users.id del analista (null si automático)
status               → 'applied' | 'pending_review' | 'reversed'
```

### Tabla `payment_allocations`
```
payment_id           → payments.id
loan_id              → loans.id
allocated_amount     → monto total aplicado a este préstamo
-- Desglose del waterfall:
principal_allocated      → capital aplicado
current_interest_allocated → interés corriente aplicado
overdue_interest_allocated → interés vencido aplicado
mora_interest_allocated  → interés de mora aplicado
fees_allocated           → comisiones aplicadas
iva_allocated            → IVA aplicado
-- Estado post-pago:
loan_status_after    → estado del préstamo después del pago
```

---

## Notificaciones al Cliente

Se selecciona la variante según el estado de la deuda 
**después** de aplicar todos los pagos.

> Criterios Meta Utility: ≤1024 chars, ≤2 emojis, sin bullets con emojis.
> Las plantillas actuales usan 👉 y ⚠️ en exceso — se rediseñan 
> para cumplir con Utility.

---

### Variante 1 — Pago recibido, saldo vencido pendiente

**Condición:** después del pago aún existe `balance_principal_overdue > 0`  
**Nombre WA:** `payment_confirmed_still_overdue`

Variables: `{{1}}`=nombre cliente, `{{2}}`=monto pagado (COP),
`{{3}}`=saldo vencido pendiente (COP), `{{4}}`=saldo total pendiente (COP)

```
Hola {{1}}, recibimos tu pago de {{2}}. ✅

Saldo vencido pendiente: {{3}}
Saldo total pendiente:   {{4}}

Aún tienes un saldo en mora. Te recomendamos ponerte al día 
lo antes posible para evitar cargos adicionales.

[Pagar deuda vencida]  [Pagar otro valor]
```
~280 chars.

---

### Variante 2 — Pago recibido, saldo vencido pendiente (pago fue al partner)

**Condición:** igual a variante 1 + `is_partner_payment = true`  
**Nombre WA:** `payment_confirmed_still_overdue_partner`

Variables: mismas que variante 1

```
Hola {{1}}, recibimos tu pago de {{2}}. ✅

Saldo vencido pendiente: {{3}}
Saldo total pendiente:   {{4}}

Recuerda que los pagos de créditos Platam deben realizarse 
directamente a Platam, no al proveedor.

Aún tienes un saldo en mora. Te recomendamos ponerte al día.

[Pagar deuda vencida]  [Pagar otro valor]
```
~320 chars.

---

### Variante 3 — Pago recibido, sin mora pero saldo pendiente

**Condición:** `balance_principal_overdue = 0` y `outstanding_balance > 0`  
**Nombre WA:** `payment_confirmed_active_balance`

Variables: `{{1}}`=nombre cliente, `{{2}}`=monto pagado (COP),
`{{3}}`=saldo total pendiente (COP)

```
Hola {{1}}, recibimos tu pago de {{2}}. ✅

Saldo total pendiente: {{3}}

Cuando estés listo para hacer tu próximo pago:

[Pagar todo]  [Pagar un préstamo]  [Pagar otro valor]
```
~220 chars.

---

### Variante 4 — Pago recibido, sin mora, saldo pendiente (pago fue al partner)

**Condición:** igual a variante 3 + `is_partner_payment = true`  
**Nombre WA:** `payment_confirmed_active_balance_partner`

Variables: mismas que variante 3

```
Hola {{1}}, recibimos tu pago de {{2}}. ✅

Saldo total pendiente: {{3}}

Recuerda que los pagos de créditos Platam deben realizarse 
directamente a Platam, no al proveedor.

[Pagar todo]  [Pagar un préstamo]  [Pagar otro valor]
```
~260 chars.

---

### Variante 5 — Deuda saldada completamente

**Condición:** `outstanding_balance = 0` en todos los préstamos activos  
**Nombre WA:** `payment_confirmed_debt_cleared`

Variables: `{{1}}`=nombre cliente, `{{2}}`=monto pagado (COP),
`{{3}}`=cupo disponible (COP)

```
Hola {{1}}, recibimos tu pago de {{2}}. ✅

Pagaste toda tu deuda. Tu cupo de {{3}} está 
disponible para tu próxima compra.

¡Gracias por tu confianza en Platam!
```
~200 chars.

---

### Variante 6 — Deuda saldada con saldo a favor

**Condición:** se creó un registro en `credit_balances` tras el pago  
**Nombre WA:** `payment_confirmed_credit_balance`

Variables: `{{1}}`=nombre cliente, `{{2}}`=monto pagado (COP),
`{{3}}`=cupo disponible (COP), `{{4}}`=saldo a favor (COP)

```
Hola {{1}}, recibimos tu pago de {{2}}. ✅

Pagaste toda tu deuda. Tienes un saldo a favor de {{4}} 
que se aplicará a tu próximo préstamo.

Cupo disponible: {{3}}

¡Gracias por tu confianza en Platam!
```
~230 chars.

---

### Variante 7 — Deuda saldada con saldo a favor (pago fue al partner)

**Condición:** se creó registro en `credit_balances` + `is_partner_payment = true`  
**Nombre WA:** `payment_confirmed_credit_balance_partner`

Variables: mismas que variante 6

```
Hola {{1}}, recibimos tu pago de {{2}}. ✅

Pagaste toda tu deuda. Tienes un saldo a favor de {{4}} 
que se aplicará a tu próximo préstamo.

Cupo disponible: {{3}}

Recuerda que los pagos de créditos Platam deben realizarse 
directamente a Platam, no al proveedor.
```
~290 chars.

---

### Lógica de selección de variante

```
si credit_balance creado y is_partner_payment → Variante 7
si credit_balance creado                      → Variante 6
si outstanding_balance = 0 (deuda saldada)    → Variante 5
si overdue > 0 y is_partner_payment           → Variante 2
si overdue > 0                                → Variante 1
si saldo pendiente y is_partner_payment       → Variante 4
si saldo pendiente                            → Variante 3
```

> Todas las variantes se envían también por **email** con el 
> mismo contenido y un resumen del desglose del pago (capital, 
> intereses, comisiones aplicadas).

---

## Criterios de Aceptación

- [ ] Canal Payvalida: el webhook registra el pago y lo distribuye 
      automáticamente sin intervención humana
- [ ] Canal manual cliente: el analista puede registrar el pago 
      y el sistema lo distribuye FIFO por `due_date`
- [ ] Canal manual préstamo: el analista aplica el pago solo al 
      préstamo seleccionado
- [ ] Cada pago genera exactamente **un** registro en `payments`
- [ ] Cada préstamo afectado genera exactamente **un** registro 
      en `payment_allocations` con el desglose completo del waterfall
- [ ] El waterfall sigue el orden: IVA → Comisiones → Mora → 
      Interés vencido → Capital vencido → Interés corriente → 
      Capital futuro
- [ ] Si el saldo post-pago es menor a `global_params.paid_tolerance`, 
      el préstamo se marca como pagado y el residuo se perdona
- [ ] Préstamos en cuotas recalculan `schedule_current` después 
      de `PAGO_NORMAL` o `ABONO_CUOTA`
- [ ] Si el pago supera toda la deuda se crea un registro en `credit_balances`
- [ ] El saldo a favor se aplica automáticamente antes del waterfall en el siguiente pago
- [ ] Si el cliente solicita devolución del saldo a favor, el registro pasa a `refund_requested`
- [ ] `is_partner_payment = true` genera automáticamente ajuste 
      `CLIENT_PAYS_PARTNER` en `partner_adjustments`
- [ ] `CANCELACION_TOTAL` marca el préstamo como `cancelled` y 
      genera ajuste `TOTAL_RETURN`
- [ ] El sistema selecciona la variante de notificación correcta 
      según el estado post-pago
- [ ] Todas las notificaciones se envían por WhatsApp y email
- [ ] Las plantillas WA cumplen límites Meta Utility 
      (≤1024 chars, ≤2 emojis)
- [ ] El comprobante se almacena en S3 y referenciado en `payments`

---

## Notas de Schema

Tabla `payments`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `credit_facility_id` | bigint FK | → `credit_facilities.id` |
| `channel` | varchar | 'PAYVALIDA' \| 'MANUAL_CLIENT' \| 'MANUAL_LOAN' |
| `payment_type` | varchar | ver tipos arriba |
| `amount` | decimal(18,4) | monto total recibido |
| `remaining_balance` | decimal(18,4) | excedente que originó credit_balance (referencia contable) |
| `payment_date` | date | fecha del pago |
| `payment_method` | varchar | 'PAYVALIDA' \| 'TRANSFER' \| 'DEPOSIT' \| 'OTHER' |
| `reference` | varchar nullable | referencia bancaria |
| `voucher_url` | text nullable | URL S3 comprobante |
| `payvalida_tx_id` | varchar nullable | ID transacción Payvalida |
| `is_partner_payment` | boolean | default false |
| `notes` | text nullable | notas analista |
| `created_by` | bigint FK nullable | → `users.id` |
| `status` | varchar | 'applied' \| 'pending_review' \| 'reversed' |
| `created_at` | timestamptz | insert DB-generated |
| `updated_at` | timestamptz | insert DB-generated |

Tabla `payment_allocations`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `payment_id` | bigint FK | → `payments.id` |
| `loan_id` | bigint FK | → `loans.id` |
| `allocated_amount` | decimal(18,4) | total aplicado a este préstamo |
| `principal_allocated` | decimal(18,4) | — |
| `current_interest_allocated` | decimal(18,4) | — |
| `overdue_interest_allocated` | decimal(18,4) | — |
| `mora_interest_allocated` | decimal(18,4) | — |
| `fees_allocated` | decimal(18,4) | — |
| `iva_allocated` | decimal(18,4) | — |
| `loan_status_after` | varchar | estado del préstamo post-pago |
| `created_at` | timestamptz | insert DB-generated |

Nueva tabla `credit_balances`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `credit_facility_id` | bigint FK | → `credit_facilities.id` |
| `payment_id` | bigint FK | → `payments.id` (pago que generó el saldo) |
| `amount` | decimal(18,4) | monto del saldo a favor |
| `status` | varchar | `'available'` \| `'consumed'` \| `'refund_requested'` \| `'refunded'` |
| `consumed_by_payment_id` | bigint FK nullable | → `payments.id` (pago que lo consumió) |
| `consumed_at` | timestamptz nullable | — |
| `notes` | text nullable | — |
| `created_at` | timestamptz | insert DB-generated |
| `updated_at` | timestamptz | insert DB-generated |
