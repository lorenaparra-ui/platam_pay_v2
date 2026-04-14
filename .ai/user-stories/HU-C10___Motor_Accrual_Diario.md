# HU-C10 — Motor de Accrual Diario

**Épica:** epic-03-core-financiero  
**Tipo:** Proceso backend batch (sin UI)  
**Trigger:** Cron job diario  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** sistema,  
**quiero** ejecutar un proceso diario que calcule intereses 
corrientes, intereses de mora y comisiones de cobranza para 
todos los préstamos activos,  
**para** mantener los saldos actualizados y gestionar los 
estados de los préstamos automáticamente.

---

## Contexto

El accrual diario es el corazón del core financiero. Se ejecuta 
una vez por día para todos los préstamos en estado `active` 
o `late` y actualiza sus saldos.

Complementa la función `recalculate-loan` del prototipo de 
Rodrigo, que hace el cálculo completo on-demand por préstamo 
individual. El accrual diario hace el cálculo incremental 
para todos los préstamos en batch.

**Parámetros que consume de HU-C09:**
- `mora_grace_days` — días de gracia antes de mora
- `default_days` — días para pasar a `default`
- `paid_tolerance` — tolerancia para marcar como pagado
- `collection_day_of_week` — día de cobro de comisiones
- `usura_rates` — tasas de mora tipo USURA
- `collection_fee_rules` — escalones de comisión por días mora

---

## Préstamos procesados

| Estado | Se procesa |
|---|---|
| `active` | Sí |
| `late` | Sí |
| `default` | Sí (solo mora, sin corriente) |
| `paid` | No |
| `cancelled` | No |

---

## Flujo del Batch

```
1. Obtener todos los loans en status IN ('active', 'late', 'default')
2. Obtener parámetros vigentes de global_params y usura_rates
3. Por cada préstamo:
   a. Calcular interés corriente del día
   b. Evaluar vencimientos de cuotas
   c. Calcular interés de mora si aplica
   d. Evaluar comisiones de cobranza si aplica
   e. Insertar registros en accruals
   f. Actualizar saldos en loans
   g. Evaluar y actualizar estado del préstamo
4. Loggear resultados del batch
```

---

## Cálculos por Préstamo

### A — Interés Corriente Diario

Aplica a préstamos con `balance_principal_current > 0` 
y estado `active` o `late`.

```
tasa_diaria     = (1 + interest_rate_ea)^(1/365) - 1
interes_diario  = balance_principal_current × tasa_diaria
```

Acumula en `loans.balance_interest_current`.

---

### B — Vencimiento de Cuotas

Para préstamos `loan_modality = 'CUOTAS'`, el sistema evalúa 
diariamente si alguna cuota del `schedule_current` venció hoy.

Cuando una cuota vence:
```
-- El capital esperado de esa cuota pasa de corriente a vencido
balance_principal_current  -= cuota.capital
balance_principal_overdue  += cuota.capital

-- El interés esperado pasa a vencido
balance_interest_current   -= cuota.interes
balance_interest_overdue   += cuota.interes

-- Se registra la cuota como vencida con su fecha
loan_overdue_installments:
  loan_id        → loans.id
  installment_no → número de cuota
  due_date       → fecha de vencimiento
  capital        → capital esperado de la cuota
  interest       → interés esperado
  dias_mora      → 0 (empieza a crecer cada día)
```

Para préstamos `loan_modality = 'BULLET'`, el vencimiento 
ocurre una sola vez en `due_date`.

---

### C — Interés de Mora

Aplica cuando existe `balance_principal_overdue > 0` y 
han pasado más de `mora_grace_days` desde el primer vencimiento.

```
-- Tasa de mora según tipo configurado en el préstamo:
USURA      → tasa vigente de usura_rates según loans.mora_category
FIJA       → loans.mora_rate_fixed
CORRIENTE  → loans.interest_rate_ea

tasa_mora_diaria = (1 + tasa_mora_ea)^(1/365) - 1
interes_mora_dia = balance_principal_overdue × tasa_mora_diaria
```

Acumula en `loans.balance_interest_mora`.

**Envejecimiento por cuota (para préstamos en cuotas):**
Cada cuota vencida acumula sus propios `dias_mora` 
independientemente. El `dias_mora` del préstamo es 
el máximo entre todas las cuotas vencidas.

---

### D — Comisiones de Cobranza

Las comisiones se disparan cuando una cuota vencida 
supera un umbral de días definido en `collection_fee_rules`.

**Reglas de disparo:**
```
por cada cuota en loan_overdue_installments:
  por cada regla en collection_fee_rules:
    si cuota.dias_mora alcanza regla.days_overdue hoy:
      -- Calcular fecha de cobro: siguiente día configurado
      -- en global_params.collection_day_of_week
      fecha_cobro = siguiente_dia_semana(hoy, collection_day_of_week)
      fecha_cobro = ajustar_dia_habil(fecha_cobro)
      
      comision = cuota.capital × regla.fee_rate
      iva      = comision × iva_rate
      
      -- Registrar para cobrar en fecha_cobro
      agregar a balance_fees (con fecha futura)
```

> Las comisiones se registran en la fecha exacta en que 
> deben cobrarse, no en el día que se calculan.

> ⚠️ **Pendiente — épica de cobranza:** cuando una comisión 
> se cobra efectivamente se debe:
> 1. Enviar notificación al cliente informando el cargo
> 2. Generar factura electrónica con IVA (19%) sobre el valor 
>    de la comisión
>
> Estos flujos se profundizan en la épica de cobranza. 
> El IVA sobre comisiones ya está incluido en el waterfall 
> de pagos (HU-C08) y en los saldos de `loans.balance_iva`.

---

### E — Actualizar Estado del Préstamo

Al final del cálculo diario se evalúa el nuevo estado:

```
si outstanding_balance < paid_tolerance  → 'paid'
si dias_mora >= default_days             → 'default'
si balance_principal_overdue > 0         → 'late'
sino                                     → 'active'
```

---

### F — Actualizar `outstanding_balance`

```
outstanding_balance = 
  balance_principal_current +
  balance_principal_overdue +
  balance_interest_current  +
  balance_interest_overdue  +
  balance_interest_mora     +
  balance_fees              +
  balance_iva
```

---

## Registro en `accruals`

Por cada préstamo procesado se inserta un registro diario:

| Campo | Valor |
|---|---|
| `loan_id` | préstamo procesado |
| `calculation_date` | fecha del batch |
| `balance_principal_overdue` | capital vencido al momento |
| `daily_interest_current` | interés corriente calculado |
| `daily_interest_mora` | interés de mora calculado |
| `daily_fees` | comisiones causadas (0 si no aplica) |
| `status_after` | estado del préstamo después del cálculo |

---

## Logs del Batch

Al finalizar el batch se registra en `batch_logs`:

| Campo | Valor |
|---|---|
| `batch_type` | `'DAILY_ACCRUAL'` |
| `execution_date` | fecha de ejecución |
| `loans_processed` | total de préstamos procesados |
| `loans_to_late` | préstamos que pasaron a `late` |
| `loans_to_default` | préstamos que pasaron a `default` |
| `loans_to_paid` | préstamos que se marcaron como pagados |
| `total_interest_accrued` | suma de intereses causados |
| `total_mora_accrued` | suma de mora causada |
| `started_at` | timestamp inicio |
| `finished_at` | timestamp fin |
| `status` | `'success'` \| `'partial'` \| `'failed'` |
| `error_log` | detalle de errores si los hay |

---

## Manejo de Errores

- Si un préstamo individual falla, el batch continúa con los demás
- Los errores se registran en `batch_logs.error_log`
- Si más del 10% de préstamos fallan → status `'partial'` 
  y alerta al equipo de operaciones
- Si el batch falla completamente → status `'failed'` 
  y alerta crítica

---

## Consideraciones de Rendimiento

- El batch debe completarse antes de las 6:00 AM hora Colombia
- Se procesa en chunks de 500 préstamos para evitar timeouts
- Los parámetros globales y tasas de usura se cargan una sola 
  vez al inicio del batch, no por préstamo

---

## Criterios de Aceptación

- [ ] El batch se ejecuta diariamente vía cron a las 2:00 AM hora Colombia
- [ ] Solo procesa préstamos en estado `active`, `late`, `default`
- [ ] El interés corriente diario se calcula con tasa compuesta 
      diaria sobre `balance_principal_current`
- [ ] Las cuotas vencidas se detectan y se mueven de corriente 
      a vencido en la fecha exacta de vencimiento
- [ ] El interés de mora respeta `mora_grace_days` antes de comenzar
- [ ] El envejecimiento de mora es por cuota individual para 
      préstamos en cuotas
- [ ] Las comisiones de cobranza se disparan en el día exacto 
      definido en `collection_fee_rules` y se programan para 
      cobrarse el siguiente día configurado en 
      `collection_day_of_week` (ajustado a día hábil)
- [ ] El estado del préstamo se actualiza correctamente según 
      las reglas definidas
- [ ] Préstamos con `outstanding_balance < paid_tolerance` 
      se marcan como pagados automáticamente
- [ ] Se inserta un registro en `accruals` por cada préstamo procesado
- [ ] Se genera un registro en `batch_logs` al finalizar
- [ ] Si un préstamo individual falla, el batch continúa
- [ ] Todos los parámetros se leen de `global_params` y 
      `usura_rates` — sin valores hardcodeados
- [ ] El batch completa su ejecución antes de las 6:00 AM

---

## Notas de Schema

Nueva tabla `accruals`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `loan_id` | bigint FK | → `loans.id` |
| `calculation_date` | date | fecha del cálculo |
| `balance_principal_overdue` | decimal(18,4) | capital vencido al momento |
| `daily_interest_current` | decimal(18,4) | interés corriente del día |
| `daily_interest_mora` | decimal(18,4) | interés de mora del día |
| `daily_fees` | decimal(18,4) | comisiones causadas |
| `status_after` | varchar | estado del préstamo post-cálculo |
| `created_at` | timestamptz | insert DB-generated |

Nueva tabla `loan_overdue_installments`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `loan_id` | bigint FK | → `loans.id` |
| `installment_no` | int | número de cuota |
| `due_date` | date | fecha original de vencimiento |
| `capital` | decimal(18,4) | capital esperado de la cuota |
| `interest` | decimal(18,4) | interés esperado |
| `capital_pending` | decimal(18,4) | capital pendiente (baja con pagos) |
| `dias_mora` | int | días de mora acumulados |
| `created_at` | timestamptz | insert DB-generated |
| `updated_at` | timestamptz | insert DB-generated |

Nueva tabla `batch_logs`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `batch_type` | varchar | `'DAILY_ACCRUAL'` \| otros futuros |
| `execution_date` | date | — |
| `loans_processed` | int | — |
| `loans_to_late` | int | — |
| `loans_to_default` | int | — |
| `loans_to_paid` | int | — |
| `total_interest_accrued` | decimal(18,4) | — |
| `total_mora_accrued` | decimal(18,4) | — |
| `started_at` | timestamptz | — |
| `finished_at` | timestamptz | — |
| `status` | varchar | `'success'` \| `'partial'` \| `'failed'` |
| `error_log` | jsonb nullable | detalle de errores por préstamo |

Campos adicionales en `loans` (complementa HU-C04):

| Campo | Tipo | Notas |
|---|---|---|
| `mora_rate_type` | varchar | `'USURA'` \| `'FIJA'` \| `'CORRIENTE'` |
| `mora_rate_fixed` | decimal(8,6) nullable | solo si `mora_rate_type = 'FIJA'` |
| `mora_category` | varchar nullable | categoría usura si `mora_rate_type = 'USURA'` |
| `dias_mora` | int | días de mora de la cuota más antigua vencida |
| `last_accrual_date` | date | última fecha en que se corrió el accrual |
