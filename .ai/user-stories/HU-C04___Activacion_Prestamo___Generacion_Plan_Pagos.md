# HU-C04 — Activación del Préstamo y Generación del Plan de Pagos

**Épica:** epic-03-core-financiero  
**Tipo:** Proceso backend (sin UI propia)  
**Modalidad:** Bullet y Cuotas  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** sistema,  
**quiero** activar el préstamo y generar el plan de pagos definitivo 
cuando se dispara el evento de activación correspondiente,  
**para** que el cliente tenga un préstamo activo con un cronograma 
preciso basado en la fecha real de desembolso.

---

## Contexto

Esta historia cubre el proceso backend que se ejecuta cuando una 
`loan_request` pasa a estado `approved` o es activada directamente.

El evento de activación es diferente según el producto:

| Producto | HU origen | Evento activador | `disbursement_date` |
|---|---|---|---|
| BNPL Partner Bullet | C01 | Partner confirma entrega | Fecha de confirmación |
| BNPL Partner Cuotas | C02 | Partner confirma entrega (post cuota inicial si aplica) | Fecha de confirmación |
| BNPL Proveedor | C03 | Platam ejecuta desembolso al proveedor | Fecha del desembolso |

> La confirmación de entrega del partner (C01/C02) y la revisión 
> Platam + desembolso al proveedor (C03) se documentan en HU-C05.
> Esta historia asume que el evento ya ocurrió y solo cubre 
> lo que pasa después.

---

## Proceso de Activación

### 1. Validaciones previas

Antes de crear el préstamo el sistema verifica:

| Validación | Condición de error | Acción |
|---|---|---|
| `loan_request.status` correcto | No está en estado activable | Abortar, loggear error |
| Cliente activo | `users.status != active` | Abortar, notificar operaciones |
| LOC vigente | `credit_facilities.status != active` | Abortar, notificar operaciones |
| Cupo suficiente | `confirmed_amount > available_loc` | Abortar, notificar operaciones |

> `confirmed_amount` puede diferir de `requested_amount` cuando el 
> partner ajusta el monto al confirmar la entrega (ej. un ítem no 
> estaba en stock). Si `confirmed_amount` es null se usa 
> `requested_amount`.

---

### 2. Generar cronograma

#### Bullet

```
dias_reales      = dias_habiles(disbursement_date, disbursement_date + term_days)
interes_total    = confirmed_amount × ((1 + interest_rate_ea)^(dias_reales/365) - 1)
fecha_vencimiento = ajustar_dia_habil(disbursement_date + term_days)

schedule_original = [{
  cuota_numero:   1,
  fecha:          fecha_vencimiento,
  capital:        confirmed_amount,
  interes:        interes_total,
  cuota_total:    confirmed_amount + interes_total
}]
```

#### Cuotas

```
tasa_diaria = (1 + interest_rate_ea)^(1/365) - 1

fechas[] = generar_fechas_cuotas(
  disbursement_date, 
  installment_count, 
  installment_frequency,   -- MONTHLY | BIWEEKLY | WEEKLY
  ajustar_dia_habil
)

-- Cuota fija (método de valor presente)
sum_factores = Σ 1 / (1 + tasa_diaria)^(dias_desde_desembolso_a_fecha_i)
cuota_fija   = confirmed_amount / sum_factores

-- Amortización cuota a cuota
saldo = confirmed_amount
por cada fecha_i:
  dias_periodo = dias(fecha_anterior, fecha_i)
  interes_i    = saldo × ((1 + interest_rate_ea)^(dias_periodo/365) - 1)
  capital_i    = cuota_fija - interes_i
  -- última cuota: capital_i = saldo (elimina residuos de redondeo)
  saldo       -= capital_i

schedule_original = [{ cuota_numero, fecha, capital, interes, cuota_total, saldo_despues }]
```

> `schedule_original` se guarda en JSONB y **nunca se modifica** 
> después de la creación. Es la referencia del contrato original.  
> `schedule_current` se recalcula después de cada pago (cubierto en HU-C06).

---

### 3. Crear registro en `loans`

```
loan_request_id          → loan_request.id
credit_facility_id       → loan_request.credit_facility_id
category_id              → loan_request.category_id
partner_id               → loan_request.partner_id (null si proveedor)
supplier_id              → loan_request.supplier_id (null si partner)
product_type             → loan_request.product_type
loan_modality            → loan_request.loan_modality
channel                  → loan_request.channel

-- Montos
facial_value             → loan_request.confirmed_amount ?? requested_amount
disbursement_fee_amount  → calcular según category (ver abajo)
disbursement_fee_iva     → disbursement_fee_amount × 0.19

-- Tasas (snapshot al momento de activación)
interest_rate_ea         → partner_categories.interest_rate
mora_rate_type           → parámetro global ('USURA' para Colombia)

-- Fechas
disbursement_date        → fecha del evento activador
due_date                 → schedule_original.last().fecha  (bullet y cuotas)

-- Cronograma
schedule_original        → JSONB generado arriba
schedule_current         → igual a schedule_original al crear

-- Saldos iniciales
outstanding_balance      → facial_value + disbursement_fee_amount + disbursement_fee_iva
balance_principal_current → facial_value
balance_principal_overdue → 0
balance_interest_current  → 0
balance_interest_overdue  → 0
balance_interest_mora     → 0
balance_fees              → disbursement_fee_amount
balance_iva               → disbursement_fee_iva

-- Estado
status                   → LoanStatus.ACTIVE ('active')
dias_mora                → 0

-- Desembolso al partner (solo BNPL_PARTNER)
partner_disbursement_amount → facial_value × (1 - discount_percentage)
partner_disbursement_date   → ajustar_dia_habil(disbursement_date + delay_days)
partner_disbursement_status → 'pending'
```

**Cálculo `disbursement_fee_amount`:**
```
si partner_categories.disbursement_fee_percent > 0:
  fee = MAX(
    facial_value × disbursement_fee_percent,
    minimum_disbursement_fee ?? 0
  )
sino:
  fee = 0
```

---

### 4. Actualizar `loan_request`

```
status        → LoanRequestStatus.APPROVED ('approved')
confirmed_amount → confirmed_amount usado (si no estaba)
loan_id       → ID del préstamo recién creado
```

---

### 5. Actualizar LOC

El préstamo activo toma el relevo en el cálculo de `available_loc`. 
El bloqueo previo de la `loan_request` se libera automáticamente 
al cambiar su estado a `approved`.

```
-- La loan_request ya no bloquea (status = approved)
-- El loan nuevo bloquea por outstanding_balance
-- Net effect: sin cambio en available_loc si confirmed_amount == requested_amount
-- Si confirmed_amount < requested_amount: el cupo se libera por la diferencia
```

---

### 6. Notificaciones al cliente

#### BNPL Partner Bullet — Comprobante de activación

**WhatsApp** — Nombre: `loan_activated_bullet`

Variables: `{{1}}`=nombre cliente, `{{2}}`=nombre partner,
`{{3}}`=order_reference, `{{4}}`=monto (COP),
`{{5}}`=fecha vencimiento, `{{6}}`=total a pagar (COP)

```
Hola {{1}}, tu crédito con {{2}} ha sido activado. 👍

Pedido: {{3}}
Monto financiado: {{4}}
Fecha de pago: {{5}}
Total a pagar: {{6}}

Recibirás un recordatorio antes del vencimiento.
```
~220 chars.

**Email:** mismo contenido con botón "Ver mi crédito".

---

#### BNPL Partner Cuotas — Comprobante + cronograma

**WhatsApp** — Nombre: `loan_activated_installments`

Variables: `{{1}}`=nombre cliente, `{{2}}`=nombre partner,
`{{3}}`=order_reference, `{{4}}`=monto (COP),
`{{5}}`=número cuotas, `{{6}}`=frecuencia (mensual/quincenal/semanal),
`{{7}}`=valor cuota (COP), `{{8}}`=fecha primera cuota

```
Hola {{1}}, tu crédito con {{2}} ha sido activado. 👍

Pedido: {{3}}
Monto financiado: {{4}}
Plan: {{5}} cuotas {{6}}s de {{7}}
Primera cuota: {{8}}

Te enviamos el cronograma completo por correo.
```
~250 chars.

**Email:** incluye tabla de amortización completa generada en PDF 
adjunto (o tabla HTML inline). Columnas: N° cuota, Fecha, Capital, 
Interés, Cuota total.

---

#### BNPL Proveedor — Comprobante de desembolso

**WhatsApp** — Nombre: `supplier_loan_activated`

Variables: `{{1}}`=nombre cliente, `{{2}}`=nombre proveedor,
`{{3}}`=order_reference, `{{4}}`=monto (COP),
`{{5}}`=plan (ej. "30 días" o "6 cuotas mensuales"),
`{{6}}`=fecha primer pago

```
Hola {{1}}, realizamos la transferencia a {{2}}. 👍

Referencia: {{3}}
Monto financiado: {{4}}
Plan: {{5}}
Primer pago: {{6}}

Tu crédito está activo. Recibirás recordatorios de pago.
```
~240 chars.

**Email:** mismo contenido + cronograma si es cuotas.

---

## Criterios de Aceptación

- [ ] El proceso se dispara correctamente desde los tres eventos 
      activadores (entrega partner C01/C02, desembolso proveedor C03)
- [ ] Si alguna validación previa falla, el proceso aborta y notifica 
      al equipo de operaciones sin crear el préstamo
- [ ] Para bullet: `schedule_original` contiene exactamente 1 cuota 
      con fecha ajustada a día hábil
- [ ] Para cuotas: `schedule_original` contiene N cuotas con fechas 
      ajustadas a día hábil, cuota fija calculada correctamente, 
      última cuota ajusta residuo de redondeo
- [ ] `schedule_original` nunca se modifica después de la creación
- [ ] `schedule_current` es igual a `schedule_original` al crear 
      el préstamo
- [ ] Los saldos iniciales en `loans` son correctos según el monto 
      confirmado y la comisión de desembolso
- [ ] Las tasas se guardan como snapshot en `loans` — cambios 
      futuros en `partner_categories` no afectan préstamos activos
- [ ] `loan_request.status` pasa a `approved` con referencia al 
      `loan_id` creado
- [ ] Si `confirmed_amount < requested_amount`, el cupo excedente 
      se libera correctamente
- [ ] Para BNPL_PARTNER: `partner_disbursement_date` y 
      `partner_disbursement_amount` se calculan y almacenan correctamente
- [ ] El cliente recibe notificación por WhatsApp y correo 
      inmediatamente tras la activación
- [ ] Para cuotas: el email incluye el cronograma completo
- [ ] Todas las plantillas WA cumplen límites Meta Utility 
      (≤1024 chars, ≤2 emojis)

---

## Notas de Schema

Tabla `loans` — campos principales identificados:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `loan_request_id` | bigint FK | → `loan_requests.id` |
| `credit_facility_id` | bigint FK | → `credit_facilities.id` |
| `category_id` | bigint FK | → `partner_categories.id` |
| `partner_id` | bigint FK nullable | → `partners.id` |
| `supplier_id` | bigint FK nullable | → `suppliers.id` |
| `product_type` | varchar | 'BNPL_PARTNER' \| 'BNPL_SUPPLIER' |
| `loan_modality` | varchar | 'BULLET' \| 'CUOTAS' |
| `channel` | varchar | origen de la solicitud |
| `facial_value` | decimal(18,4) | monto financiado |
| `disbursement_fee_amount` | decimal(18,4) | comisión de desembolso |
| `disbursement_fee_iva` | decimal(18,4) | IVA sobre comisión |
| `interest_rate_ea` | decimal(8,6) | snapshot de la tasa al activar |
| `mora_rate_type` | varchar | 'USURA' \| 'FIJA' \| 'CORRIENTE' |
| `installment_count` | int nullable | solo cuotas |
| `installment_frequency` | varchar nullable | solo cuotas |
| `disbursement_date` | date | fecha real de activación |
| `due_date` | date | última fecha de pago |
| `schedule_original` | jsonb | tabla original — inmutable |
| `schedule_current` | jsonb | tabla recalculada tras pagos |
| `outstanding_balance` | decimal(18,4) | saldo total adeudado |
| `balance_principal_current` | decimal(18,4) | capital vigente |
| `balance_principal_overdue` | decimal(18,4) | capital vencido |
| `balance_interest_current` | decimal(18,4) | interés corriente acumulado |
| `balance_interest_overdue` | decimal(18,4) | interés vencido |
| `balance_interest_mora` | decimal(18,4) | interés de mora acumulado |
| `balance_fees` | decimal(18,4) | comisiones pendientes |
| `balance_iva` | decimal(18,4) | IVA pendiente |
| `dias_mora` | int | días de mora (mayor cuota vencida) |
| `partner_disbursement_amount` | decimal(18,4) nullable | monto a pagar al partner |
| `partner_disbursement_date` | date nullable | fecha estimada de pago al partner |
| `partner_disbursement_status` | varchar nullable | 'pending' \| 'disbursed' |
| `status_id` | bigint FK | → `statuses.id` |
| `created_at` | timestamptz | insert DB-generated |
| `updated_at` | timestamptz | insert DB-generated |

> Schema detallado y FK completas se definen en la sesión de 
> schema del epic-03.
