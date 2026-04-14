# HU-C07 — Desembolsos a Partners · Backoffice Platam

**Épica:** epic-03-core-financiero  
**Actor principal:** Equipo de Operaciones Platam (backoffice)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** operador de Platam,  
**quiero** gestionar los desembolsos a partners agrupando préstamos 
vencidos por partner, aplicando ajustes, y registrando el pago,  
**para** que el partner reciba el neto correcto y los préstamos 
queden trazados.

---

## Contexto

Los partners reciben un pago de Platam por cada préstamo activado, 
calculado como `facial_value × (1 - discount_percentage)`, con un 
delay configurable por categoría (`delay_days`).

Platam desembolsa **lunes y jueves**. En cada corrida se 
agrupan todos los préstamos cuya `partner_disbursement_date` 
ya venció (≤ hoy) en un solo desembolso por partner.

Al monto bruto se le restan los **ajustes** — créditos a favor 
de Platam que se cruzan antes de pagar al partner.

### Ajustes — tabla nueva `partner_adjustments`

En v2 los ajustes salen de la tabla de pagos y tienen tabla propia. 
Esto permite:
- Trazabilidad independiente del waterfall de pagos
- Soporte para ajustes que no afectan el balance del préstamo
- Extensibilidad para nuevos casos de uso

**Tipos de ajuste:**

| Código | Descripción | Afecta saldo préstamo |
|---|---|---|
| `PARTIAL_RETURN` | Devolución parcial del cliente al partner | Sí — abono a capital |
| `TOTAL_RETURN` | Devolución total — préstamo se cancela | Sí — cancela préstamo |
| `CLIENT_PAYS_PARTNER` | Cliente le pagó directamente al partner | Sí — abono a capital |
| `CATEGORY_CHANGE` | Diferencia por cambio de categoría post-desembolso | No |
| `OTHER` | Otro ajuste manual con nota obligatoria | Configurable |

---

## Vista resumen — Partners

La vista principal de desembolsos muestra una tarjeta por partner 
con préstamos pendientes de desembolso.

**Métricas por tarjeta:**

| Métrica | Descripción |
|---|---|
| Préstamos | Desembolsados / Total activos |
| Total desembolsado | Suma histórica de desembolsos completados |
| Pendiente | Suma de `partner_disbursement_amount` con `disbursement_status = 'pending'` y `partner_disbursement_date ≤ hoy` |
| Vencido | Suma de pendientes cuya `partner_disbursement_date` ya pasó |
| Pendiente por cruzar | Suma de ajustes registrados no aplicados a ningún desembolso aún |

**Acciones por tarjeta:**
- **Procesar desembolso en proceso** — si hay un batch abierto para ese partner
- **Ver detalles** — entra a la vista de detalle del partner

---

## Vista lista — Desembolsos

Tab "Desembolsos" muestra todos los batches creados, todos los partners.

**Columnas:**

| Campo | Descripción |
|---|---|
| ID | `disbursement_batches.id` |
| Partner | Nombre |
| Estado | En proceso / Desembolsado |
| Fecha de desembolso | `disbursed_at` (vacío si en proceso) |
| Desembolsos (bruto) | Suma de `partner_disbursement_amount` de los loans incluidos |
| Cruces | Suma de ajustes aplicados |
| Desembolso Neto | Bruto − Cruces |

---

## Vista detalle — Desembolso

Al abrir un desembolso el operador ve:

**Cabecera:**
- Logo + nombre del partner
- Disbursement ID + fecha de creación + fecha de desembolso
- Estado: En proceso / Desembolsado
- Botón "Descargar Excel" (si ya fue desembolsado)

**Resumen financiero:**
```
Total préstamos desembolso (N)     $X
Total ajustes (N)                 -$Y
─────────────────────────────────────
Desembolso Neto                    $Z
* Total descuentos: $W
```

**Tabla Préstamos:**

| Campo | Descripción |
|---|---|
| Préstamo ID | `loans.id` |
| Cliente | Nombre |
| ID Pedido | `order_reference` |
| Venc. Desembolso | `partner_disbursement_date` |
| Principal | `facial_value` |
| Desembolso | `partner_disbursement_amount` |
| Descuento | `facial_value - partner_disbursement_amount` |

**Tabla Ajustes:**

| Campo | Descripción |
|---|---|
| Préstamo ID | `loans.id` |
| Cliente | Nombre |
| ID Pedido | `order_reference` |
| Fecha ajuste | `partner_adjustments.created_at` |
| Tipo ajuste | Descripción del tipo |
| Monto | `partner_adjustments.amount` |

---

## Flujo de Procesamiento

### Paso 1 — Generar batch

El sistema agrupa automáticamente los loans de un partner con:
- `partner_disbursement_status = 'pending'`
- `partner_disbursement_date ≤ hoy`

Y crea un registro en `disbursement_batches` de tipo `PARTNER`:

```
partner_id          → del partner
disbursement_type   → 'PARTNER'
gross_amount        → SUM(partner_disbursement_amount) de loans incluidos
adjustments_amount  → SUM(partner_adjustments.amount) pendientes del partner
net_amount          → gross_amount - adjustments_amount
status              → 'pending'
```

Los loans incluidos se asocian al batch:
```
loans.partner_disbursement_batch_id → disbursement_batches.id
loans.partner_disbursement_status   → 'in_batch'
```

Los ajustes pendientes se asocian al batch:
```
partner_adjustments.disbursement_batch_id → disbursement_batches.id
partner_adjustments.status                → 'applied'
```

### Paso 2 — Registrar desembolso

El operador ingresa:

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Fecha de desembolso | Fecha | Sí | Fecha real en que se hizo la transferencia |
| Comprobante | PDF/imagen, max 5 MB | Sí | Comprobante bancario |

Al registrar:

```
disbursement_batches:
  status         → 'disbursed'
  disbursed_at   → fecha ingresada
  voucher_url    → URL S3 del comprobante

loans (todos los del batch):
  partner_disbursement_status → 'disbursed'
  partner_disbursement_date   → fecha real del desembolso

partner_adjustments (todos los del batch):
  applied_at     → fecha del desembolso
```

---

## Notificación al Partner — Email de Confirmación

Al registrar el desembolso (Paso 2), el sistema envía 
automáticamente un correo de confirmación al partner usando 
`partners.disbursement_notification_email`.

**Plantilla de correo — Confirmación de Desembolso:**

```
Asunto: Confirmación de Desembolso - {{1}}

Estimado equipo de {{1}},

Nos complace informarle que hemos procesado exitosamente el 
desembolso correspondiente a las operaciones de financiamiento 
realizadas a través de nuestra plataforma BNPL.

Datos del Desembolso
────────────────────────────────────────
ID del Desembolso:          {{2}}
Fecha de Procesamiento:     {{3}}
Monto Neto Transferido:     {{4}}
────────────────────────────────────────

Documentos y Enlaces

Para su revisión y archivo, ponemos a su disposición los 
siguientes recursos:

Comprobante de Transferencia:
{{5}}

Detalle Completo en Excel:
{{6}}

Portal:
{{7}}

Atentamente,
El equipo Platam

*Este es un mensaje automático. Para consultas específicas, 
 por favor contacte a su asesor comercial.
```

Variables: `{{1}}`=nombre partner, `{{2}}`=disbursement batch ID,
`{{3}}`=fecha de desembolso, `{{4}}`=monto neto formateado (COP),
`{{5}}`=link comprobante (S3, vigencia 30 días),
`{{6}}`=link Excel de detalle (S3, vigencia 30 días),
`{{7}}`=link al portal partner

> El correo se envía a `partners.disbursement_notification_email`.
> Si este campo está vacío, se omite la notificación y se 
> registra un warning en el log de operaciones.

---

## Portal del Partner — Visibilidad de Desembolsos

Los partners pueden consultar el historial y detalle de sus 
desembolsos desde el portal partner. Esto les permite hacer 
seguimiento sin necesidad de contactar a Platam.

Vistas disponibles (a profundizar en las historias del portal partner):
- Lista de desembolsos con estado, fecha y monto neto
- Detalle por desembolso: préstamos incluidos, ajustes, descuentos
- Descarga del Excel de detalle

> El portal partner muestra exactamente la misma información 
> del backoffice pero en modo solo lectura y filtrada por su partner.

---

## Registro de Ajustes

El operador puede registrar ajustes desde el detalle del partner 
o desde el detalle de un préstamo.

**Formulario:**

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Préstamo | Búsqueda por ID o pedido | Sí | |
| Tipo de ajuste | Dropdown | Sí | Ver tipos arriba |
| Monto | Numérico (COP) | Sí | |
| Fecha del evento | Fecha | Sí | Cuando ocurrió la devolución/pago |
| Notas | Texto libre | Si tipo = OTHER | |

**Efecto según tipo:**

- `PARTIAL_RETURN` / `CLIENT_PAYS_PARTNER`: crea un abono al préstamo 
  que afecta el waterfall de pagos (cubierto en HU-C08)
- `TOTAL_RETURN`: cancela el préstamo. `loans.status → 'cancelled'`
- `CATEGORY_CHANGE`: solo afecta el monto del cruce, 
  no toca el balance del préstamo
- `OTHER`: configurable por el operador

---

## Excel de desembolso completado

Al descargar el Excel de un desembolso en estado `Desembolsado`:

**Hoja 1 — Resumen:**
- Partner, fecha, monto bruto, ajustes, neto, descuentos totales

**Hoja 2 — Préstamos:**
Columnas: Préstamo ID, Cliente, Documento, ID Pedido, Principal, 
Desembolso, Descuento, Fecha vencimiento desembolso

**Hoja 3 — Ajustes:**
Columnas: Préstamo ID, Cliente, ID Pedido, Fecha ajuste, Tipo, Monto

---

## Criterios de Aceptación

- [ ] La vista de partners muestra métricas correctas: pendiente, 
      vencido y pendiente por cruzar por partner
- [ ] El sistema agrupa automáticamente los loans vencidos por 
      partner al generar un batch
- [ ] Los ajustes pendientes del partner se asocian automáticamente 
      al batch y se descuentan del neto
- [ ] El operador puede registrar ajustes de todos los tipos definidos
- [ ] `PARTIAL_RETURN` y `CLIENT_PAYS_PARTNER` generan un abono 
      al préstamo que afecta el balance
- [ ] `TOTAL_RETURN` cancela el préstamo
- [ ] `CATEGORY_CHANGE` afecta solo el cruce, no el balance del préstamo
- [ ] Al registrar el desembolso se requiere fecha y comprobante
- [ ] Todos los loans y ajustes del batch se actualizan al registrar
- [ ] El Excel descargable contiene tres hojas con la info completa
- [ ] Los desembolsos se generan lunes y jueves (el sistema 
      puede generarlos cualquier día pero la cadencia operativa 
      es esa)

---

## Notas de Schema

Nueva tabla `partner_adjustments`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `loan_id` | bigint FK | → `loans.id` |
| `partner_id` | bigint FK | → `partners.id` |
| `disbursement_batch_id` | bigint FK nullable | → `disbursement_batches.id` (se llena al cruzar) |
| `adjustment_type` | varchar | ver tipos arriba |
| `amount` | decimal(18,4) | monto del ajuste |
| `event_date` | date | fecha cuando ocurrió el evento |
| `affects_loan_balance` | boolean | true para PARTIAL_RETURN, CLIENT_PAYS_PARTNER, TOTAL_RETURN |
| `notes` | text nullable | obligatorio si tipo = OTHER |
| `status` | varchar | `'pending'` \| `'applied'` |
| `applied_at` | timestamptz nullable | cuando se cruzó en un desembolso |
| `created_by` | bigint FK | → `users.id` (operador) |
| `created_at` | timestamptz | insert DB-generated |
| `updated_at` | timestamptz | insert DB-generated |

Campos adicionales en `loans`:

| Campo | Tipo | Notas |
|---|---|---|
| `partner_disbursement_batch_id` | bigint FK nullable | → `disbursement_batches.id` |
| `partner_disbursement_status` | varchar | `'pending'` \| `'in_batch'` \| `'disbursed'` |

Campos adicionales en `disbursement_batches` (complementa HU-C06):

| Campo | Tipo | Notas |
|---|---|---|
| `partner_id` | bigint FK nullable | → `partners.id` (para batches tipo PARTNER) |
| `disbursement_type` | varchar | `'PARTNER'` \| `'SUPPLIER'` |
| `gross_amount` | decimal(18,4) | suma bruta de préstamos |
| `adjustments_amount` | decimal(18,4) | suma de ajustes cruzados |
| `net_amount` | decimal(18,4) | gross - adjustments |
| `voucher_url` | text nullable | comprobante del desembolso |
| `disbursed_at` | date nullable | fecha real del desembolso |
