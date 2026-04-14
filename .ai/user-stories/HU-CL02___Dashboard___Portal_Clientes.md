# HU-CL02 — Dashboard · Portal Clientes

**Épica:** epic-05-portal-clientes  
**Actor:** Cliente autenticado (PN o PJ — en PJ actúa el representante legal)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** cliente autenticado en el portal,  
**quiero** ver al entrar un resumen de mi situación crediticia actual,  
**para** identificar rápidamente qué acciones tengo pendientes y cómo 
está mi línea de crédito.

---

## Diseño del Dashboard

El dashboard se organiza en cuatro bloques en orden de urgencia:

---

### Bloque 1 — Mi línea de crédito (siempre visible)

| Elemento | Fuente |
|---|---|
| Cupo total | `credit_facilities.total_limit` |
| Cupo utilizado | `total_limit - available_loc` |
| Cupo disponible | `available_loc` (calculado en runtime — ver HU-C11) |
| Barra de progreso | `(cupo_utilizado / total_limit) × 100%` |

> Si el cliente está bloqueado por mora, el cupo disponible 
> muestra $0 con un mensaje: *"Tu cupo está temporalmente 
> suspendido por pagos vencidos."* (lógica de cobranza — épica futura)

---

### Bloque 2 — Acciones pendientes (solo si hay pendientes)

Este bloque aparece **únicamente** cuando el cliente tiene acciones 
que requieren su respuesta. Si no hay pendientes, el bloque no se muestra.

#### 2a — Órdenes por aprobar

Solicitudes creadas por un SR en estado `pending_client_approval`.

Por cada solicitud:

| Elemento | Fuente |
|---|---|
| Logo del partner | `partners.logo_url` |
| Referencia del pedido | `loan_requests.order_reference` |
| Monto | `loan_requests.requested_amount` |
| Modalidad | Bullet / Cuotas N meses |
| Botón principal | "Ver y aprobar" → lleva a HU-CL04 |

> Si hay más de 3 pendientes se muestran las 3 más recientes 
> y un enlace "Ver todas (N)".

#### 2b — Cuota inicial por pagar

Solicitudes en estado `pending_initial_payment` (cuotas con cuota inicial requerida).

Por cada solicitud:

| Elemento | Fuente |
|---|---|
| Logo del partner | `partners.logo_url` |
| Referencia del pedido | `loan_requests.order_reference` |
| Monto cuota inicial | `requested_amount × initial_payment_pct` |
| Botón principal | "Pagar cuota inicial" → link de pago Payvalida |

---

### Bloque 3 — Próximos vencimientos (solo si hay préstamos activos)

Préstamos con cuotas o fecha de vencimiento en los próximos 15 días.
Ordenados por fecha de vencimiento más próxima primero.

Por cada préstamo:

| Elemento | Fuente |
|---|---|
| Logo del partner o proveedor | `partners.logo_url` / `suppliers.name` |
| Referencia del pedido | `loan_requests.order_reference` |
| Valor a pagar | Cuota o saldo total según modalidad |
| Fecha de vencimiento | Próxima cuota o fecha bullet |
| Días restantes | Calculado — resaltado en rojo si ≤ 3 días |
| Botón | "Ver instrucciones de pago" → HU-CL06 |

> Si hay préstamos vencidos (mora), aparecen primero con badge 
> *"Vencido hace N días"* en rojo.

---

### Bloque 4 — Mis préstamos activos

Lista resumida de todos los préstamos en estado `active` u `overdue`.

Por cada préstamo:

| Elemento | Fuente |
|---|---|
| Logo del partner o proveedor | `partners.logo_url` / `suppliers.name` |
| Referencia | `loan_requests.order_reference` |
| Saldo pendiente | `balance_principal_current + balance_principal_overdue` |
| Estado | Badge: Activo / En mora |
| Botón | "Ver detalle" → HU-CL03 |

Si no hay préstamos activos:  
> *"No tienes préstamos activos en este momento."*

---

## Acciones rápidas (siempre visibles)

| Acción | Destino |
|---|---|
| + Nueva orden con proveedor | HU-CL05 (BNPL proveedor) |
| Ver historial completo | HU-CL03 |
| Información de pago | HU-CL06 |

---

## Estados del cliente sin línea activa

Si el cliente autenticado tiene `status = pending` (solicitud en curso 
pero sin LOC aprobada aún), no ve el dashboard completo — ve la pantalla 
de estado de solicitud definida en HU-CL01 P3.

---

## Criterios de Aceptación

```gherkin
Scenario: Cliente con LOC activa y sin pendientes
  Given un cliente autenticado con LOC activa y sin acciones pendientes
  When accede al dashboard
  Then ve el bloque 1 con cupo total, utilizado y disponible
  And el bloque 2 no aparece
  And ve el bloque 3 solo si tiene vencimientos en los próximos 15 días
  And ve el bloque 4 con sus préstamos activos

Scenario: Cliente con órdenes por aprobar
  Given un cliente con solicitudes en pending_client_approval
  When accede al dashboard
  Then ve el bloque 2a con las solicitudes pendientes
  And cada solicitud muestra logo del partner, referencia y monto
  And tiene botón "Ver y aprobar"

Scenario: Cliente con cuota inicial pendiente
  Given un cliente con solicitudes en pending_initial_payment
  When accede al dashboard
  Then ve el bloque 2b con el monto de la cuota inicial
  And tiene botón de pago directo

Scenario: Cliente con préstamo vencido
  Given un cliente con al menos un préstamo en mora
  When accede al dashboard
  Then el préstamo vencido aparece primero en bloque 3
  And el badge muestra "Vencido hace N días" en rojo
  And el cupo disponible muestra $0 con mensaje de suspensión 
      (cuando se implemente épica de cobranza)

Scenario: Cliente sin préstamos activos
  Given un cliente activo sin préstamos
  When accede al dashboard
  Then el bloque 4 muestra mensaje de estado vacío
  And el bloque 1 muestra cupo disponible igual al cupo total

Scenario: Cliente pending (solicitud en curso)
  Given un cliente con status pending
  When accede al portal tras el login
  Then ve la pantalla de estado de solicitud (HU-CL01 P3)
  And NO ve el dashboard
```

---

## Consideraciones

- Los logos de partners y proveedores son el identificador visual 
  principal — el cliente puede tener préstamos con varios partners 
  y debe distinguirlos fácilmente.
- El cupo disponible se calcula en runtime (ver HU-C11) — no se 
  almacena en base de datos.
- El bloque de vencimientos usa un horizonte de **15 días** 
  (vs 7 días del portal SR) porque el cliente necesita más tiempo 
  de anticipación para organizar su pago.

---

## Impacto en Schema

Sin cambios de schema requeridos. Todas las consultas se resuelven 
con las tablas existentes: `credit_facilities`, `loan_requests`, 
`loans`, `partners`, `suppliers`.

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-CL01 | Requiere sesión activa |
| HU-CL03 | Detalle de préstamos |
| HU-CL04 | Aprobación de órdenes pendientes |
| HU-CL05 | Nueva orden con proveedor |
| HU-CL06 | Información de pago |
| HU-C11 | Cálculo de available_loc en runtime |
