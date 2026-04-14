# HU-P05 — Desembolsos · Portal Partner

**Épica:** epic-06-portal-partner  
**Actor:** Usuario operativo del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`partners.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

Vista de solo lectura del historial de desembolsos del partner. La gestión y procesamiento de desembolsos es responsabilidad exclusiva del equipo de Platam desde el backoffice (HU-C07). El portal del partner ofrece visibilidad completa y descarga del detalle en Excel.

---

## Historia de Usuario

**Como** usuario operativo de un partner,  
**quiero** consultar el historial de desembolsos con su detalle completo y descargar el Excel de cada uno,  
**para** hacer seguimiento de pagos y conciliar internamente sin depender del equipo de Platam.

---

## Flujo Principal

```
1. Usuario navega a /desembolsos

2. Sistema carga la lista de disbursement_batches del partner
   → Ordenados por fecha descendente

3. Usuario hace clic en "Ver desembolso"
   → Abre el detalle del batch seleccionado

4. Desde el detalle puede descargar el Excel
```

---

## Pantalla — Lista de Desembolsos

### Columnas

| Campo | Fuente |
|---|---|
| ID | `disbursement_batches.id` |
| Estado | Badge: En proceso / Desembolsado |
| Fecha de desembolso | `disbursed_at` (vacío si En proceso) |
| Desembolsos (bruto) | `gross_amount` |
| Cruces | `adjustments_amount` |
| Desembolso Neto | `net_amount` |
| Acción | "Ver desembolso" |

### Estados y badges

| Estado | Badge |
|---|---|
| `pending` | Amarillo — "En proceso" |
| `disbursed` | Verde — "Desembolsado" |

> La lista no tiene filtros adicionales en esta versión — el historial es por naturaleza corto y ordenado cronológicamente es suficiente.

---

## Pantalla — Detalle del Desembolso

### Cabecera

| Elemento | Fuente |
|---|---|
| Nombre del partner | `partners.name` |
| ID del desembolso | `disbursement_batches.id` |
| Fecha de creación | `disbursement_batches.created_at` |
| Fecha de desembolso | `disbursed_at` |
| Estado | Badge |
| Botón "Descargar Excel" | Solo visible si estado = `disbursed` |

### Resumen financiero

```
Total préstamos desembolso (N)     $X
Total ajustes (N)                 -$Y
──────────────────────────────────────
Desembolso Neto                    $Z
* Total descuentos: $W
```

### Tabla — Préstamos

| Campo | Fuente |
|---|---|
| Préstamo # | `loans.id` |
| Cliente | Nombre completo |
| ID Pedido | `order_reference` |
| Venc. Desembolso | `partner_disbursement_date` |
| Principal | `facial_value` |
| Desembolso | `partner_disbursement_amount` |
| Descuento | `facial_value - partner_disbursement_amount` |

### Tabla — Ajustes

Visible solo si el batch tiene ajustes (`adjustments_amount > 0`).

| Campo | Fuente |
|---|---|
| Préstamo # | `loans.id` |
| Cliente | Nombre completo |
| ID Pedido | `order_reference` |
| Fecha ajuste | `partner_adjustments.created_at` |
| Tipo | Descripción del tipo de ajuste |
| Monto | `partner_adjustments.amount` |

---

## Excel de Desembolso

Al hacer clic en "Descargar Excel" el sistema genera o sirve el archivo ya generado desde S3 (mismo archivo que usa el backoffice).

**Hoja 1 — Resumen:** partner, fecha, monto bruto, ajustes, neto, descuentos totales.

**Hoja 2 — Préstamos:** Préstamo ID, Cliente, Documento, ID Pedido, Principal, Desembolso, Descuento, Fecha vencimiento desembolso.

**Hoja 3 — Ajustes:** Préstamo ID, Cliente, ID Pedido, Fecha ajuste, Tipo, Monto.

---

## Criterios de Aceptación

```gherkin
Scenario: Lista de desembolsos
  Given un partner con historial de desembolsos
  When navega a /desembolsos
  Then ve solo sus propios batches ordenados por fecha descendente
  And cada fila muestra bruto, cruces y neto

Scenario: Estado En proceso
  Given un batch en estado pending
  Then el badge muestra "En proceso"
  And la fecha de desembolso aparece vacía
  And el botón "Descargar Excel" no está disponible

Scenario: Estado Desembolsado
  Given un batch en estado disbursed
  Then el badge muestra "Desembolsado"
  And la fecha de desembolso está visible
  And el botón "Descargar Excel" está disponible

Scenario: Detalle con ajustes
  Given un batch que tiene ajustes aplicados
  When el usuario abre el detalle
  Then la tabla de ajustes es visible con el detalle de cada uno

Scenario: Detalle sin ajustes
  Given un batch sin ajustes
  When el usuario abre el detalle
  Then la tabla de ajustes no se muestra

Scenario: Descarga Excel
  Given un desembolso en estado disbursed
  When el usuario hace clic en "Descargar Excel"
  Then descarga el archivo con tres hojas: Resumen, Préstamos y Ajustes
```

---

## Impacto en Schema

Sin cambios. Consume datos de `disbursement_batches`, `loans`, `partner_adjustments` ya definidos en HU-C07.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Scope por partner | El endpoint filtra por `partner_id` del usuario autenticado |
| Excel | Se sirve desde S3 (mismo archivo generado por el backoffice al cerrar el batch) — no se regenera en el portal |
| Sin acciones | El partner no puede crear, editar ni cancelar desembolsos — solo lectura |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-P01 (Login) | Requiere sesión activa |
| HU-C07 (Desembolsos Backoffice) | Fuente de toda la lógica de negocio y generación del Excel |
