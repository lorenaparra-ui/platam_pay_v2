# HU-C05 — Confirmación de Entrega · Portal Partner

**Épica:** epic-03-core-financiero  
**Actor principal:** Partner Operations (usuario autenticado en portal partner)  
**Canal secundario:** API del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** usuario de operaciones de un partner,  
**quiero** confirmar la entrega de un pedido e ingresar el monto 
final facturado,  
**para** que Platam active el préstamo del cliente y programe 
el desembolso al partner.

---

## Contexto

Este flujo ocurre después de que el cliente aprueba la solicitud 
(y paga la cuota inicial si aplica en HU-C02). La solicitud queda 
en `pending_partner_approval` esperando que el partner confirme 
que el pedido fue entregado y valide el monto final facturado.

El partner puede aprobar o rechazar. Aprobar dispara HU-C04 
(activación del préstamo). Rechazar libera el cupo del cliente.

---

## Vista de Lista — Solicitudes Pendientes

El portal partner muestra la lista de solicitudes en 
`pending_partner_approval` para ese partner.

**Filtros disponibles:**
- Por estado (pendiente / aprobada / rechazada)
- Por SR
- Por fecha de solicitud
- Búsqueda libre (nombre cliente, No. documento, ID pedido)

**Columnas por solicitud:**

| Campo | Descripción |
|---|---|
| Solicitud # | `loan_requests.id` |
| Cliente | Nombre completo |
| ID Pedido | `order_reference` |
| No. Documento | Documento del cliente |
| SR | Nombre del sales rep (si aplica) |
| Valor pedido | `requested_amount` |
| Fecha solicitud | `created_at` |
| Aprobación cliente | Badge: Aprobada |
| Valor factura | `confirmed_amount` (vacío si aún no procesada) |
| Fecha facturación | `partner_approved_at` (vacío si pendiente) |
| Aprobación partner | Badge: Pendiente / Aprobada / Rechazada |
| Préstamo | Referencia al `loan.id` si ya fue aprobada |

---

## Formulario de Procesamiento

Al hacer clic en una solicitud pendiente, el partner accede 
al formulario de procesamiento.

**Cabecera (solo lectura):**

| Campo | Valor |
|---|---|
| Solicitud # | ID |
| Cliente | Nombre |
| ID Pedido | `order_reference` |
| No. Documento | Documento cliente |
| SR | Nombre del sales rep |
| Valor pedido | `requested_amount` |
| Fecha solicitud | `created_at` |
| Aprobación cliente | Aprobada |
| Plazo | `categories.term_days` días (bullet) o `installment_count` cuotas |

**Campos editables:**

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| No. de orden | Texto | Sí | Pre-llenado con `order_reference`. Editable solo si el partner necesita corregirlo. Muestra hint: *"Utiliza este campo solo si necesitas cambiar el número de orden"* |
| Valor factura | Numérico (COP) | Sí (si aprueba) | Monto final facturado al cliente. Muestra preview formateado en tiempo real. Puede ser hasta un 10% mayor que `requested_amount` para cubrir ajustes de última hora. |
| Fecha de entrega | Fecha | Sí (si aprueba) | Fecha real en que se entregó el pedido. No puede ser futura. |
| Aprobación | Dropdown | Sí | Opciones: Aprobada / Rechazada |

**Campos condicionales — si selecciona Rechazada:**

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Motivo de rechazo | Dropdown | Sí | Ver lista de motivos abajo |

**Motivos de rechazo:**
- Orden duplicada
- Cancelación de pedido por cliente
- Cancelación de pedido por indisponibilidad de producto
- Rechazado por el cliente
- Monto incorrecto
- Número de orden incorrecto
- Cancelación por solicitud de Hunter

> Si el motivo no está en la lista, el partner debe contactar 
> al equipo de Platam.

Botón: **Aprobar** (o **Rechazar** según selección)

Aviso antes de confirmar:
> *Asegúrate de revisar la información ingresada antes de aprobar 
> la solicitud.*

---

## Flujo al Aprobar

### 1. Validaciones

| Validación | Condición de error | Mensaje |
|---|---|---|
| Valor factura ingresado | Vacío o 0 | "Ingresa el valor de la factura" |
| Valor factura ≤ requested_amount × 1.10 | Mayor al 110% del pedido original | "El valor facturado no puede superar el 10% del valor del pedido ($X máximo permitido: $Y)" |
| Fecha de entrega válida | Fecha futura o con más de 20 días de antigüedad | "La fecha de entrega no puede ser futura ni tener más de 20 días de antigüedad" |

### 2. Actualizar `loan_request`
```
status               → LoanRequestStatus.APPROVED ('approved')
confirmed_amount     → valor factura ingresado
order_reference      → No. de orden (si fue editado)
partner_approved_at  → timestamp actual
```

### 3. Disparar HU-C04
El sistema ejecuta el proceso de activación del préstamo 
con `disbursement_date = fecha_de_entrega`.

### 4. Feedback al partner
Mensaje en pantalla:

> **Solicitud aprobada**
>
> La solicitud #[ID] para [nombre cliente] ha sido aprobada. 
> El préstamo ha sido activado y el desembolso está programado 
> para [partner_disbursement_date].  
> Préstamo: [loan_external_id]

---

## Flujo al Rechazar

### 1. Actualizar `loan_request`
```
status            → LoanRequestStatus.REJECTED ('rejected')
rejected_by       → 'PARTNER'
rejection_reason  → motivo seleccionado
partner_approved_at → timestamp actual
```

### 2. Liberar cupo del cliente
El `available_loc` del cliente se libera automáticamente 
al cambiar el status de la `loan_request`.

### 3. Notificación al cliente

**WhatsApp** — Nombre: `loan_request_rejected_partner`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference,
`{{3}}`=nombre partner, `{{4}}`=motivo (texto simplificado)

```
Hola {{1}}, la solicitud de financiamiento para tu pedido 
No. {{2}} con {{3}} fue cancelada.

Motivo: {{4}}

Tu cupo ha sido liberado. Si tienes dudas contáctanos.
```
~200 chars. Sin botones — informativo.

### 4. Feedback al partner
Mensaje en pantalla:

> **Solicitud rechazada**
>
> La solicitud #[ID] ha sido rechazada. El cupo del cliente 
> ha sido liberado.

---

## Canal API — Diferencias

El partner puede aprobar o rechazar vía API con los mismos campos. 

| Campo | Requerido al aprobar | Requerido al rechazar |
|---|---|---|
| `order_reference` | No (opcional, solo si cambia) | No |
| `confirmed_amount` | Sí | No |
| `delivery_date` | Sí | No |
| `action` | `'approve'` | `'reject'` |
| `rejection_reason` | No | Sí (código del motivo) |

Errores retornan HTTP 422 con mensaje descriptivo.

---

## Reporte de Rechazadas

El portal partner incluye una vista de historial de solicitudes 
rechazadas con columnas:

| Campo | Descripción |
|---|---|
| Timestamp | Fecha y hora del rechazo |
| ID Rep | SR que originó la solicitud |
| Evento | "Solicitud Rechazada" |
| Detalle | Descripción completa: cliente, ID pedido, motivo |

---

## Criterios de Aceptación

- [ ] La lista muestra solo solicitudes en `pending_partner_approval` 
      del partner autenticado
- [ ] Los filtros y búsqueda funcionan correctamente
- [ ] El formulario pre-llena `order_reference` y permite editarlo
- [ ] El preview del valor factura se actualiza en tiempo real
- [ ] No se puede ingresar valor factura mayor al valor del pedido
- [ ] No se puede ingresar fecha de entrega futura
- [ ] Al aprobar: `loan_request` pasa a `approved`, se dispara HU-C04 
      con `disbursement_date = fecha_entrega`
- [ ] Si `confirmed_amount < requested_amount` el cupo excedente 
      se libera correctamente (manejado en HU-C04)
- [ ] Al rechazar: `loan_request` pasa a `rejected`, cupo se libera, 
      cliente recibe WhatsApp
- [ ] El dropdown de motivos de rechazo contiene exactamente los 
      motivos definidos
- [ ] El feedback post-acción muestra la fecha estimada de desembolso 
      al aprobar
- [ ] Canal API: mismas reglas de validación, errores retornan HTTP 422
- [ ] El reporte de rechazadas muestra historial completo con detalle


---

## Procesamiento en Bulk — Carga de Archivo

Para partners con alto volumen de confirmaciones, el portal 
ofrece un flujo de carga masiva como alternativa al procesamiento 
individual.

### Descarga de plantilla

El partner descarga una plantilla CSV/Excel desde el portal con 
las columnas pre-definidas y las solicitudes en 
`pending_partner_approval` pre-cargadas:

| Columna | Descripción | Requerido |
|---|---|---|
| `order_id` | `order_reference` de la solicitud | Sí (no editable) |
| `loan_request_id` | ID interno de la solicitud | Sí (no editable, referencia) |
| `client_name` | Nombre del cliente | No (solo lectura, referencia) |
| `requested_amount` | Valor original del pedido | No (solo lectura, referencia) |
| `confirmed_amount` | Valor final facturado (COP, sin símbolos) | Sí |
| `delivery_date` | Fecha de entrega (DD/MM/YYYY) | Sí |
| `action` | `APPROVE` o `REJECT` | Sí |
| `rejection_reason` | Motivo de rechazo (ver lista de códigos abajo) | Solo si `action = REJECT` |

**Códigos de motivo de rechazo para bulk:**

| Código | Descripción |
|---|---|
| `DUPLICATE_ORDER` | Orden duplicada |
| `CLIENT_CANCELLATION` | Cancelación de pedido por cliente |
| `OUT_OF_STOCK` | Cancelación por indisponibilidad de producto |
| `CLIENT_REJECTION` | Rechazado por el cliente |
| `INCORRECT_AMOUNT` | Monto incorrecto |
| `INCORRECT_ORDER_ID` | Número de orden incorrecto |
| `HUNTER_CANCELLATION` | Cancelación por solicitud de Hunter |

---

### Carga y procesamiento

El partner sube el archivo completado (CSV o XLSX, max 5 MB).

El sistema procesa fila por fila aplicando las mismas validaciones 
del flujo individual:
- `confirmed_amount` ≤ `requested_amount × 1.10`
- `delivery_date` no futura y no mayor a 20 días de antigüedad
- `action` válido
- `rejection_reason` requerido si `action = REJECT`

**El sistema procesa todas las filas válidas** aunque haya errores 
en algunas — no aborta el batch completo.

---

### Reporte de resultados

Al finalizar el procesamiento se muestra una tabla de resultados 
y se ofrece descarga en CSV:

| Columna | Descripción |
|---|---|
| `order_id` | Referencia del pedido |
| `status` | `SUCCESS` \| `ERROR` |
| `action_taken` | `APPROVED` \| `REJECTED` \| `SKIPPED` |
| `loan_id` | ID del préstamo creado (si fue aprobada) |
| `error_detail` | Descripción del error si `status = ERROR` |

Resumen visible en pantalla:
> ✓ **X solicitudes procesadas exitosamente**  
> ✗ **Y solicitudes con error** — descarga el reporte para ver el detalle.

---

### Criterios de Aceptación — Bulk

- [ ] El partner puede descargar la plantilla con sus solicitudes 
      pendientes pre-cargadas en formato CSV y XLSX
- [ ] El sistema acepta archivos CSV y XLSX de hasta 5 MB
- [ ] Se aplican las mismas validaciones del flujo individual 
      a cada fila
- [ ] Filas con error no bloquean el procesamiento de las demás
- [ ] El reporte de resultados muestra claramente éxitos y errores
- [ ] El reporte es descargable en CSV
- [ ] Las solicitudes aprobadas en bulk disparan HU-C04 
      individualmente por cada una
- [ ] Las solicitudes rechazadas en bulk liberan el cupo del cliente 
      y notifican por WhatsApp igual que el flujo individual

---

## Respuestas API (códigos de referencia)

| Código | Status | Descripción |
|---|---|---|
| 200 | `order_approval_registered` | Aprobación registrada exitosamente |
| 400 | `rejected_order_value_difference_too_high` | Valor factura supera el límite permitido vs pedido original |
| 400 | `rejected_order_delivery_date_too_old` | Fecha de entrega con más de 20 días de antigüedad |
| 401 | `incorrect_api_key` | API key incorrecta |
| 403 | `rejected_already_approved` | Solicitud ya fue aprobada previamente |
| 403 | `rejected_no_client_approval` | Cliente no ha aprobado la solicitud |
| 404 | `rejected_not_found` | `order_id` no encontrado |

**Cancelación vía API:** el partner puede cancelar una solicitud 
que aún no haya sido aprobada por el cliente usando el endpoint 
de cancelación. Una vez aprobada por el cliente no se puede 
cancelar por API.

---

## Notas de Schema

Campos en `loan_requests` ya definidos en HU-C01, confirmados aquí:

| Campo | Comportamiento en esta HU |
|---|---|
| `confirmed_amount` | Se llena al aprobar con el valor factura |
| `partner_approved_at` | Timestamp de la acción del partner |
| `rejected_by` | `'PARTNER'` al rechazar |
| `rejection_reason` | Motivo seleccionado |
| `order_reference` | Puede ser actualizado si el partner lo corrige |
