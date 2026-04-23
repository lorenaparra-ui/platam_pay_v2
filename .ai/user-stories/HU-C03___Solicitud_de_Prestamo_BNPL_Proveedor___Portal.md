# HU-C03 — Solicitud de Préstamo BNPL con Proveedor · Portal Cliente

**Épica:** epic-03-core-financiero  
**Producto:** BNPL con Proveedor  
**Modalidad:** Bullet o Cuotas (según plan seleccionado)  
**Canal:** Portal web del cliente (único canal)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** cliente activo con línea de crédito Platam,  
**quiero** solicitar financiamiento para pagarle a un proveedor,  
**para** que Platam le transfiera el dinero al proveedor y yo lo 
pague después según el plan que elija.

---

## Contexto

Este flujo es iniciado por el cliente desde su portal web. 
A diferencia de HU-C01 y HU-C02 (donde el SR origina la solicitud), 
aquí el cliente es el originador.

Diferencias clave vs BNPL con Partner:

| Aspecto | BNPL con Partner | BNPL con Proveedor |
|---|---|---|
| Quien origina | SR o API | Cliente |
| Categorías | Por partner, configuradas por Platam | Globales, `partner_id = null` |
| Costo | Discount + fee + interés según negociación | Solo interés corriente |
| Activador | Partner confirma entrega | Platam revisa docs y desembolsa |
| Desembolso | Al partner (en lote) | Al proveedor (individual) |

### Categorías globales de proveedor

Platam configura categorías globales con `partner_id = null` 
disponibles para todos los clientes. Dos tipos:

**Bullet** — plazo en días, pago único al vencimiento:

| Ejemplo | `term_days` | `interest_rate` |
|---|---|---|
| 15 días | 15 | EA configurada |
| 30 días | 30 | EA configurada |
| 45 días | 45 | EA configurada |

**Cuotas** — amortización mensual/quincenal/semanal:

| Ejemplo | `installment_count` | `installment_frequency` | `interest_rate` |
|---|---|---|---|
| 3 meses | 3 | MONTHLY | EA configurada |
| 6 meses | 6 | MONTHLY | EA configurada |

> Todas las categorías de proveedor tienen `discount_percentage = 0` 
> y `disbursement_fee_percent = 0`. El único costo es `interest_rate`.

---

## Estados de `loan_requests` — Proveedor

```
pending_platam_review   ← cliente envía solicitud con documentos
  ↓ Platam revisa, aprueba y ejecuta desembolso al proveedor
[préstamo creado en loans — estado: active — HU-C04]

  ↓ alternativa: Platam rechaza
rejected
```

> No hay estado `pending_partner_approval` ni `pending_client_approval` 
> — el cliente es quien inicia y aprueba en el mismo acto de enviar.
> El cupo se bloquea al crear la solicitud. Si Platam rechaza, el cupo se libera.
> El préstamo se activa directamente cuando Platam desembolsa.

---

## Flujo — Wizard 4 pasos

### Paso 1 — Proveedor

El cliente selecciona a quién le quiere pagar.

**Opción A — Proveedor registrado:**  
Lista de proveedores vinculados a la cuenta del cliente 
(tabla `suppliers` donde `business_id` del proveedor está 
relacionado al cliente). Búsqueda por nombre o NIT.

Cada fila muestra: nombre, NIT, banco destino (últimos 4 dígitos).

**Opción B — Proveedor nuevo:**  
El cliente puede registrar un proveedor nuevo desde este mismo 
flujo. Campos requeridos:

| Campo | Tabla | Notas |
|---|---|---|
| Nombre o razón social | `businesses.business_name` | — |
| NIT | `businesses.tax_id` | Validar que no exista ya |
| Banco | `bank_accounts.bank_entity` | Dropdown bancos Colombia |
| Tipo de cuenta | `bank_accounts.account_type` | Ahorros / Corriente |
| Número de cuenta | `bank_accounts.account_number` | Cifrado en app |
| Certificación bancaria | `bank_accounts.bank_certification` | PDF, max 10 MB |

> El proveedor nuevo queda vinculado al cliente y disponible 
> para futuras solicitudes.

**Validación al continuar:**  
El proveedor seleccionado debe tener cuenta bancaria registrada. 
Si el proveedor nuevo no tiene certificación bancaria, mostrar 
advertencia pero permitir continuar (Platam valida en la revisión).

---

### Paso 2 — Documentos y Plan

**Documentos:**

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Orden de compra | PDF, max 10 MB | Sí | Múltiples archivos permitidos |
| Factura del proveedor | PDF o imagen, max 10 MB | Sí | — |
| Monto a pagar | Numérico (COP) | Sí | Debe coincidir con la factura |
| Fecha de vencimiento de la factura | Fecha | Sí | Referencia documental, no define plazo del crédito |
| Referencia interna | Texto | No | Referencia del cliente para sus propios registros |

**Plan de pago:**

El cliente selecciona el plan de financiamiento. 
Se muestran las categorías globales activas agrupadas por modalidad.

| Elemento UI | Descripción |
|---|---|
| Tabs o sección separada | "Pago único" (Bullet) y "En cuotas" |
| Cards por plan | Muestra plazo, tasa EA, costo estimado |
| Selección | Una sola opción activa a la vez |

Al seleccionar plan + ingresar monto se activa el **resumen de crédito**:

**Bullet:**

| Etiqueta | Valor |
|---|---|
| Monto financiado | `requested_amount` |
| Tasa de interés | `interest_rate` EA |
| Intereses estimados | `requested_amount × ((1 + EA)^(days/365) - 1)` |
| Total a pagar al vencimiento | Monto + intereses |
| Fecha estimada de vencimiento | Hoy + `term_days` (referencial) |

**Cuotas:**

| Etiqueta | Valor |
|---|---|
| Monto financiado | `requested_amount` |
| Tasa de interés | `interest_rate` EA |
| Número de cuotas | `installment_count` |
| Frecuencia | Mensual / Quincenal / Semanal |
| Cuota estimada | Calculada con fórmula de HU-C02 |

> Todos los valores son **estimados**. La tabla definitiva se genera 
> en HU-C04 con la fecha real de desembolso.

**Validación al continuar:**  
OC + factura subidas + monto > 0 + plan seleccionado.  
Validar que `requested_amount ≤ available_loc` antes de permitir el envío.

---

### Paso 3 — Confirmar

Resumen completo antes de enviar:

| Campo | Valor |
|---|---|
| Proveedor | Nombre + NIT |
| Banco destino | Entidad + últimos 4 dígitos |
| Monto | Formateado COP |
| Plan seleccionado | "30 días" / "6 cuotas mensuales" |
| Tasa de interés | EA |
| Costo estimado | Intereses totales o cuota mensual |
| Total a pagar | Monto + intereses est. |
| Cargo a tu línea | `requested_amount` (bloquea cupo al enviar) |
| Cupo restante tras solicitud | `available_loc - requested_amount` |

Aviso visible:
> ⚠️ Platam revisará los documentos antes de realizar la 
> transferencia al proveedor. El proceso toma máximo 1 día hábil. 
> Tu cupo disponible se reserva al enviar la solicitud y se libera 
> si Platam la rechaza.

Botón: **Enviar solicitud**

---

### Paso 4 — Éxito

Confirmación de envío:

> ✓ **Solicitud enviada**
>
> Hemos recibido tu solicitud de pago a [nombre proveedor] 
> por [monto]. Nuestro equipo revisará los documentos y 
> realizará la transferencia en máximo 1 día hábil.
>
> Referencia: [order_reference generado por sistema]

Timeline:
- ✓ Hoy — Solicitud recibida. Documentos en revisión.
- ○ Máx. 1 día hábil — Transferencia al proveedor confirmada.
- ○ Vencimiento — Cobro automático de tu línea por el monto financiado.

Botones: **Nueva solicitud** · **Ver mis pagos**

---

## Almacenamiento al Enviar

### 1. Crear registro en `loan_requests`
```
credit_facility_id      → de la credit_facility activa del cliente
category_id             → plan seleccionado (categoría global)
supplier_id             → proveedor seleccionado o recién creado
partner_id              → null
sales_rep_id            → null
channel                 → LoanRequestChannel.CLIENT_PORTAL ('client_portal')
product_type            → LoanRequestProductType.BNPL_SUPPLIER ('bnpl_supplier')
loan_modality           → ModalityTypes.BULLET ('bullet') | ModalityTypes.CUOTAS ('cuotas')
order_reference         → generado por sistema (ej. REF-AP-YYYY-NNNNN)
requested_amount        → del formulario
invoice_due_date        → fecha vencimiento factura
installment_count       → del plan (null si bullet)
confirmed_amount        → null
status                  → LoanRequestStatus.PENDING_PLATAM_REVIEW ('pending_platam_review')
```

### 2. Crear registros en `loan_request_documents`
```
loan_request_id         → ID recién creado
document_type           → 'PURCHASE_ORDER' | 'INVOICE'
file_url                → URL en S3
```

### 3. Notificación interna a Platam
Alerta al equipo de operaciones que hay una solicitud pendiente 
de revisión. Canal: email a operaciones + notificación en backoffice.

### 4. Notificación de confirmación al cliente
**WhatsApp** — Nombre: `supplier_request_received`

Variables: `{{1}}`=nombre cliente, `{{2}}`=order_reference,
`{{3}}`=nombre proveedor, `{{4}}`=monto (COP)

```
Hola {{1}}, recibimos tu solicitud de pago a {{3}} 
por {{4}}. Referencia: {{2}}.

Revisaremos los documentos y te confirmaremos el 
desembolso en máximo 1 día hábil.
```
~210 chars. Sin botones — informativo.

---

## Criterios de Aceptación

- [ ] El cliente puede buscar proveedores registrados por nombre o NIT
- [ ] El cliente puede registrar un proveedor nuevo con datos bancarios 
      desde el mismo flujo
- [ ] OC y factura son obligatorios para continuar al paso 3
- [ ] Se muestran las categorías globales activas agrupadas por 
      modalidad (bullet / cuotas)
- [ ] El resumen de crédito se calcula en frontend al seleccionar 
      plan y monto
- [ ] Se valida que `requested_amount ≤ available_loc` antes de 
      permitir el envío
- [ ] Al enviar, el `status_id` queda en `pending_platam_review`
- [ ] La solicitud en `pending_platam_review` **sí** bloquea el 
      `available_loc` desde el momento del envío
- [ ] Si Platam rechaza la solicitud, el cupo se libera automáticamente
- [ ] El `order_reference` es generado automáticamente por el sistema
- [ ] Los documentos se almacenan en S3 y se registran en 
      `loan_request_documents`
- [ ] Se envía notificación interna al equipo de operaciones Platam
- [ ] El cliente recibe confirmación por WhatsApp con la referencia
- [ ] El paso 4 muestra el timeline con los próximos pasos

---

## Notas de Schema

Campos adicionales en `loan_requests` vs HU-C01/C02:

| Campo | Tipo | Notas |
|---|---|---|
| `supplier_id` | bigint FK nullable | → `suppliers.id`. Solo para BNPL_SUPPLIER |
| `invoice_due_date` | date nullable | Fecha vencimiento factura del proveedor |
| `channel` | varchar | `'CLIENT_PORTAL'` — este producto no soporta API ni SR |
| `product_type` | varchar | Agregar `'BNPL_SUPPLIER'` |

Nueva tabla `loan_request_documents`:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | — |
| `external_id` | uuid | insert DB-generated |
| `loan_request_id` | bigint FK | → `loan_requests.id` |
| `document_type` | varchar | 'PURCHASE_ORDER' \| 'INVOICE' |
| `file_url` | text | URL S3 |
| `created_at` | timestamptz | insert DB-generated |

> El cupo se bloquea al crear la solicitud (`pending_platam_review`).
> Si Platam rechaza, el cupo se libera. Esto significa que la fórmula
> de `available_loc` debe incluir solicitudes en `pending_platam_review`
> además de las de `pending_partner_approval`.
