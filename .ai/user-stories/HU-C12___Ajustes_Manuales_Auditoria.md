# HU-C12 — Ajustes Manuales y Log de Auditoría

**Épica:** epic-03-core-financiero  
**Actor principal:** Admin Platam (rol admin)  
**Tipo:** Backoffice  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** administrador de Platam,  
**quiero** poder realizar ajustes manuales sobre préstamos, 
pagos y solicitudes,  
**para** corregir errores operativos, con trazabilidad completa 
de cada cambio.

---

## Contexto

Este módulo es de uso exclusivo de usuarios con rol `admin`. 
Cada ajuste genera un registro en `audit_logs` con el estado 
anterior, el estado nuevo, el motivo y el usuario que lo realizó. 
Cuando el ajuste afecta cálculos financieros, el sistema 
recalcula el préstamo automáticamente.

---

## Casos de Uso

### 1 — Ajuste de Fechas de Préstamo

**Campos ajustables:**

| Campo | Tabla | Impacto |
|---|---|---|
| `disbursement_date` | `loans` | Recalcula todo el schedule y accruals desde esa fecha |
| `due_date` | `loans` | Solo para bullet — ajusta fecha de vencimiento |
| Fechas de cuotas en `schedule_current` | `loans` (jsonb) | Ajusta fechas individualmente |
| `partner_disbursement_date` | `loans` | Ajusta fecha de desembolso al partner |

**Motivos frecuentes (dropdown + campo libre):**
- Fecha de entrega incorrecta reportada por partner
- Devolución o cambio del pedido
- Corrección de error operativo
- Solicitud del partner
- Otro (requiere nota)

**Comportamiento:**
Al cambiar `disbursement_date` el sistema recalcula:
- `schedule_current` completo desde la nueva fecha
- `partner_disbursement_date` = nueva fecha + `delay_days`
- Accruals desde la nueva fecha (elimina y recrea)

> `schedule_original` **nunca se modifica** — es la referencia 
> del contrato original. Solo `schedule_current` cambia.

---

### 2 — Ajuste de Monto (Principal)

**Campos ajustables:**

| Campo | Tabla | Notas |
|---|---|---|
| `facial_value` | `loans` | Monto original del préstamo |
| `balance_principal_current` | `loans` | Saldo de capital vigente |

**Motivos frecuentes:**
- Partner olvidó calcular retenciones
- Descuento aplicado incorrectamente
- Retenciones aplicadas que no correspondían
- Corrección de error de digitación
- Otro (requiere nota)

**Comportamiento:**
Al cambiar el principal el sistema:
1. Registra el delta en `audit_logs`
2. Recalcula `schedule_current` con el nuevo capital
3. Recalcula `outstanding_balance`
4. Si hay un `partner_disbursement_amount` pendiente, 
   recalcula con el nuevo `facial_value`

> Cambios de monto significativos (> 20% del principal) 
> requieren confirmación explícita con nota obligatoria.

---

### 3 — Cambio de Categoría

**Campos ajustables:**

| Campo | Tabla | Notas |
|---|---|---|
| `category_id` | `loans` | Nueva categoría del préstamo |
| `interest_rate_ea` | `loans` | Se actualiza con la tasa de la nueva categoría |
| `term_days` / `installment_count` | `loans` | Se actualiza con los parámetros de la nueva categoría |

**Restricciones:**
- Solo se puede cambiar a una categoría del mismo partner
- Si el préstamo ya fue desembolsado al partner y el descuento 
  difiere, el ajuste financiero se maneja manualmente como 
  un `CATEGORY_CHANGE` en `partner_adjustments` (HU-C07)

**Motivos frecuentes:**
- Error del SR al seleccionar la categoría
- Cambio acordado con el cliente post-activación
- Solicitud del partner
- Otro (requiere nota)

**Comportamiento:**
1. Actualiza `category_id` y campos financieros en `loans`
2. Recalcula `schedule_current` con nuevos parámetros
3. Si `discount_percentage` difiere → alerta al admin para 
   crear ajuste manual en `partner_adjustments`

---

### 4 — Corrección de Pagos

**Subcasos:**

#### 4a — Corregir campo de un pago existente

| Campo corregible | Notas |
|---|---|
| `payment_type` | Cambio de tipo de pago |
| `amount` | Solo si el pago no ha sido aplicado aún (`status = 'pending_review'`) |
| `payment_date` | Fecha real del pago |
| `payment_method` | Medio de pago incorrecto |
| `is_partner_payment` | Si se marcó incorrectamente |
| `notes` | Agregar o corregir notas |

> Si el pago ya está en estado `applied`, el monto no se 
> puede editar directamente — se debe reversar y reingresar.

#### 4b — Reversar un pago mal aplicado

Si un pago fue aplicado al cliente equivocado o con datos 
incorrectos:

1. Admin selecciona el pago a reversar
2. Ingresa motivo obligatorio
3. El sistema:
   - Marca `payments.status → 'reversed'`
   - Revierte todas las `payment_allocations` asociadas
   - Recalcula los saldos de los préstamos afectados
   - Registra en `audit_logs`
4. El admin puede luego ingresar el pago correctamente

#### 4c — Reasignar pago a otro cliente o préstamo

Si el pago fue registrado contra el cliente o préstamo incorrecto:
1. Reversar el pago original (4b)
2. Ingresar nuevo pago con los datos correctos

---

## Formulario de Ajuste

Todos los ajustes siguen el mismo patrón en backoffice:

1. **Buscar** — préstamo por ID, order_reference o cliente; 
   pago por ID o cliente
2. **Ver estado actual** — campos con valores actuales 
   claramente visibles
3. **Modificar** — campos editables resaltados
4. **Seleccionar motivo** — dropdown + nota libre (obligatoria 
   para ajustes de monto > 20%)
5. **Confirmar** — resumen del cambio antes de aplicar
6. **Resultado** — confirmación con link al registro en audit_log

---

## Log de Auditoría (`audit_logs`)

Todo ajuste genera un registro inmutable:

| Campo | Descripción |
|---|---|
| `entity_type` | `'loan'` \| `'payment'` \| `'loan_request'` |
| `entity_id` | ID del registro modificado |
| `action` | `'field_update'` \| `'reversal'` \| `'recalculation'` |
| `field_name` | Campo modificado (ej. `'disbursement_date'`) |
| `old_value` | Valor anterior (jsonb) |
| `new_value` | Valor nuevo (jsonb) |
| `reason_code` | Código del motivo seleccionado |
| `notes` | Nota libre del admin |
| `performed_by` | `users.id` del admin |
| `performed_at` | Timestamp del ajuste |

> Los registros de `audit_logs` son inmutables — no se pueden 
> editar ni eliminar. Solo se pueden agregar.

---

## Recálculo Automático

Después de cualquier ajuste que afecte cálculos financieros, 
el sistema ejecuta automáticamente:

```
1. Recalcular schedule_current
2. Recalcular outstanding_balance
3. Recalcular balance_* según nuevos valores
4. Evaluar y actualizar status del préstamo
5. Eliminar accruals desde la fecha de ajuste y recalcular
```

El recálculo se ejecuta de forma síncrona para ajustes 
individuales. Si falla, el ajuste se revierte completamente 
y se notifica al admin.

---

## Criterios de Aceptación

- [ ] Solo usuarios con rol `admin` pueden ejecutar ajustes
- [ ] Todo ajuste genera al menos un registro en `audit_logs` 
      con valores anterior y nuevo
- [ ] Los registros de `audit_logs` son inmutables
- [ ] Ajuste de fecha `disbursement_date` recalcula schedule, 
      accruals y `partner_disbursement_date` automáticamente
- [ ] `schedule_original` nunca se modifica en ningún ajuste
- [ ] Ajuste de monto > 20% del principal requiere confirmación 
      y nota obligatoria
- [ ] Cambio de categoría solo permite categorías del mismo partner
- [ ] Cambio de categoría con descuento diferente genera alerta 
      para crear ajuste en `partner_adjustments`
- [ ] Pagos en estado `applied` no permiten edición de monto — 
      requieren reversal
- [ ] El reversal de un pago revierte todas las 
      `payment_allocations` y recalcula saldos de préstamos
- [ ] El recálculo post-ajuste es atómico — si falla se 
      revierte el ajuste completo
- [ ] El admin ve un resumen del cambio antes de confirmar
- [ ] Cada ajuste muestra link al registro en `audit_logs`

---

## Notas de Schema

Nueva tabla `audit_logs`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `entity_type` | varchar | `'loan'` \| `'payment'` \| `'loan_request'` |
| `entity_id` | bigint | ID del registro modificado |
| `action` | varchar | `'field_update'` \| `'reversal'` \| `'recalculation'` |
| `field_name` | varchar nullable | campo modificado |
| `old_value` | jsonb nullable | valor anterior |
| `new_value` | jsonb nullable | valor nuevo |
| `reason_code` | varchar nullable | código del motivo |
| `notes` | text nullable | nota libre del admin |
| `performed_by` | bigint FK | → `users.id` |
| `performed_at` | timestamptz | insert DB-generated |

> No incluir `updated_at` — los registros son inmutables.

Campos adicionales en `payments`:

| Campo | Tipo | Notas |
|---|---|---|
| `status` | varchar | agregar valor `'reversed'` a los existentes |
| `reversed_by_payment_id` | bigint FK nullable | pago de reemplazo si fue reversado y reingresado |
