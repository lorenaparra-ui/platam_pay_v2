# HU-CL03 — Historial de Préstamos y Solicitudes · Portal Clientes

**Épica:** epic-05-portal-clientes  
**Actor:** Cliente autenticado  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** cliente autenticado en el portal,  
**quiero** ver el historial completo de mis solicitudes y préstamos,  
**para** consultar el estado de cada operación, revisar mis saldos 
y entender mi plan de pagos.

---

## Flujo

```
1. Cliente accede a "Mis préstamos" desde el menú o desde el dashboard
   → Ve la lista unificada de solicitudes y préstamos, ordenada por fecha

2. Cliente filtra o busca si lo necesita

3. Cliente accede al detalle de una solicitud o préstamo
   → Vista adaptada según tipo (solicitud en curso vs préstamo activo)
```

---

## Lista de solicitudes y préstamos

Vista unificada. Mezcla `loan_requests` y `loans` en una sola lista 
ordenada por fecha de creación descendente.

| Columna | Fuente | Detalle |
|---|---|---|
| Logo | `partners.logo_url` / `suppliers.name` | Identifica visualmente con quién es la operación |
| Referencia | `loan_requests.order_reference` | |
| Tipo | `loans.loan_modality` / `loan_requests` | Bullet / Cuotas N meses / Proveedor |
| Monto | `requested_amount` / `facial_value` | |
| Estado | Ver tabla de estados abajo | Badge de color |
| Fecha | `created_at` | |
| Acción | — | "Ver detalle" |

**Filtros disponibles:**
- Estado (todas / activas / en mora / pagadas / rechazadas / canceladas)
- Tipo (bullet / cuotas / proveedor)

---

### Etiquetas de estado visibles al cliente

| Estado interno | Etiqueta visible | Color |
|---|---|---|
| `pending_client_approval` | Pendiente de tu aprobación | Amarillo |
| `pending_initial_payment` | Cuota inicial pendiente | Amarillo |
| `pending_partner_approval` | En proceso | Gris |
| `pending_platam_review` | En revisión | Gris |
| `pending_disbursement` | En proceso | Gris |
| `active` | Activo | Verde |
| `overdue` / `late` | En mora | Rojo |
| `default` | En mora grave | Rojo oscuro |
| `paid` | Pagado | Verde apagado |
| `rejected` | No aprobado | Rojo apagado |
| `cancelled` | Cancelado | Gris apagado |

> Los estados internos intermedios (`pending_partner_approval`, 
> `pending_disbursement`) se agrupan bajo "En proceso" para no 
> generar confusión — el cliente no necesita distinguirlos.

---

## Vista de detalle

### Detalle — Solicitud en curso (loan_request no convertida aún)

Aplica a solicitudes en `pending_client_approval`, 
`pending_initial_payment`, `pending_partner_approval`, 
`pending_platam_review`, `rejected`, `cancelled`.

| Sección | Contenido |
|---|---|
| Encabezado | Logo del partner, referencia, estado badge |
| Resumen | Monto solicitado, modalidad, partner o proveedor |
| Estado actual | Descripción amigable del estado y siguiente paso esperado |
| Acciones | Si `pending_client_approval` → botón "Aprobar / Rechazar" (→ HU-CL04) |
| | Si `pending_initial_payment` → botón "Pagar cuota inicial" (link Payvalida) |
| | Si rechazada/cancelada → motivo visible si existe |

---

### Detalle — Préstamo activo (loan)

Aplica a préstamos en `active`, `late`, `default`, `paid`.

#### Sección 1 — Resumen del préstamo

| Campo | Fuente |
|---|---|
| Logo | `partners.logo_url` / `suppliers.name` |
| Referencia | `loan_requests.order_reference` |
| Monto financiado | `loans.facial_value` |
| Modalidad | Bullet / Cuotas N meses |
| Fecha de activación | `loans.disbursement_date` |
| Fecha de vencimiento | `loans.due_date` |
| Estado | Badge según estado del préstamo |

#### Sección 2 — Saldo actual

| Campo | Fuente | Notas |
|---|---|---|
| Saldo total a pagar | `outstanding_balance` | Monto total adeudado |
| Capital pendiente | `balance_principal_current + balance_principal_overdue` | |
| Interés corriente acumulado | `balance_interest_current + balance_interest_overdue` | Siempre visible |
| Interés de mora | `balance_interest_mora` | Visible siempre — $0 si no aplica |
| Fee de desembolso | `balance_fees` | Visible siempre — $0 si no aplica |
| IVA sobre fee | `balance_iva` | Visible siempre — $0 si no aplica |

> El desglose completo es siempre visible — no colapsable. Platam 
> prioriza transparencia total con el cliente sobre simplicidad visual.

#### Sección 3 — Plan de pagos (solo modalidad CUOTAS)

Tabla de amortización basada en `loans.schedule_current`.

| Columna | Detalle |
|---|---|
| N° cuota | Número de la cuota |
| Fecha | Fecha de vencimiento |
| Cuota total | Capital + interés de esa cuota |
| Estado | Pagada ✓ / Pendiente / Vencida |

> Para préstamos bullet no se muestra tabla — solo la fecha de 
> vencimiento y el total a pagar.

#### Sección 4 — Historial de pagos

Pagos registrados en `movements` para este préstamo.

| Columna | Detalle |
|---|---|
| Fecha | `transaction_date` |
| Monto pagado | `amount` |
| Aplicación | Capital / Interés / Mora (desglose colapsable) |

Si no hay pagos: *"Aún no tienes pagos registrados para este préstamo."*

#### Sección 5 — Acción principal

Botón prominente: **"Ver instrucciones de pago"** → HU-CL06

---

## Criterios de Aceptación

```gherkin
Scenario: Lista unificada
  Given un cliente con solicitudes y préstamos en distintos estados
  When accede a "Mis préstamos"
  Then ve todas sus operaciones en una lista ordenada por fecha
  And cada operación tiene logo del partner/proveedor, referencia, 
      monto, estado y fecha

Scenario: Filtro por estado
  Given el cliente está en la lista
  When aplica un filtro por estado
  Then la lista muestra solo las operaciones que aplican

Scenario: Solicitud pendiente de aprobación
  Given una solicitud en pending_client_approval
  When el cliente accede al detalle
  Then ve el botón "Aprobar / Rechazar"
  And puede continuar al flujo HU-CL04

Scenario: Préstamo activo — saldo y plan de pagos
  Given un préstamo en estado active con modalidad CUOTAS
  When el cliente accede al detalle
  Then ve el saldo total a pagar de forma prominente
  And puede expandir el desglose de saldo
  And ve la tabla de amortización con el estado de cada cuota

Scenario: Préstamo en mora
  Given un préstamo en estado late o default
  When el cliente accede al detalle
  Then el estado en mora es visible con color rojo
  And el interés de mora aparece en el desglose de saldo
  And el botón "Ver instrucciones de pago" está visible

Scenario: Préstamo pagado
  Given un préstamo en estado paid
  When el cliente accede al detalle
  Then ve el historial de pagos completo
  And no aparece el botón "Ver instrucciones de pago"
```

---

## Consideraciones

- **Terminología amigable:** el cliente no ve términos como `loan_request`, 
  `accrual`, `mora_interest`. Todo se traduce a lenguaje natural.
- **Estados intermedios agrupados:** `pending_partner_approval` y 
  `pending_disbursement` se muestran como "En proceso" — el cliente 
  no necesita distinguirlos.
- **Desglose de saldo colapsable:** el saldo total es el dato prioritario. 
  El desglose (capital, intereses, mora, fees) se muestra solo si el 
  cliente lo despliega.
- **Préstamos de proveedores:** se identifican con el nombre del proveedor 
  en lugar del logo del partner.

---

## Impacto en Schema

Sin cambios requeridos. Se consultan: `loan_requests`, `loans`, 
`movements`, `partners`, `suppliers`, `statuses`.

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-CL01 | Requiere sesión activa |
| HU-CL02 | Dashboard enlaza a esta vista |
| HU-CL04 | Aprobación de órdenes — se accede desde el detalle |
| HU-CL06 | Instrucciones de pago — se accede desde el detalle |
| HU-C04 | Define el schema de `loans` y `schedule_current` |
| HU-C08 | Define la tabla `movements` |
| HU-C10 | Motor de accrual que actualiza los saldos diariamente |
