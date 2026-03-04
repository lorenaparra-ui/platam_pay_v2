# HU-B03 — Gestión de Partners (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin (CRUD completo) · Analista (solo lectura — ver listado y detalle)  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Admin del backoffice de Platam,  
**quiero** crear, editar y administrar partners desde el backoffice,  
**para** que el sistema esté configurado correctamente antes de que los formularios de solicitud y los Sales Reps puedan operar.

---

## Listado de Partners

Tabla con buscador. Columnas visibles:

| Columna | Campo DB | Tabla |
|---|---|---|
| ID | `id` | `partners` |
| Nombre comercial | `trade_name` | `partners` |
| Acrónimo | `acronym` | `partners` |
| Logo | `logo_url` | `partners` |
| SR Predeterminado | `default_rep_id` | `partners` |
| Categoría Predeterminada | `default_category_id` | `partners` |
| Estado | `status_id` | `partners` |
| Acciones | Editar · Activar/Desactivar · Eliminar | — |

---

## Formulario de Creación / Edición

Organizado en 4 tabs.

---

### Tab 1 — General

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Razón Social * | `company_name` | `partners` | Texto | — |
| Nombre comercial * | `trade_name` | `partners` | Texto | Único en el sistema, sin espacios y en minúsculas (`^[a-z0-9_]+$`) |
| Acrónimo * | `acronym` | `partners` | Texto | Máx. 10 caracteres |
| País * | `country_code` | `partners` | Dropdown | Países activos en el sistema |
| Nombre del rol SR (singular) | `sales_rep_role_name` | `partners` | Texto | Default: *"Sales Rep"* |
| Nombre del rol SR (plural) | `sales_rep_role_name_plural` | `partners` | Texto | Default: *"Sales Reps"* |

---

### Tab 2 — Logos y Colores

| Label | Campo DB | Tabla | Tipo |
|---|---|---|---|
| Logo principal | `logo_url` | `partners` | Upload de imagen → S3 |
| Logo co-branding | `co_branding_logo_url` | `partners` | Upload de imagen → S3 |
| Color primario | `primary_color` | `partners` | Color picker (hex) |
| Color secundario | `secondary_color` | `partners` | Color picker (hex) |
| Color claro | `light_color` | `partners` | Color picker (hex) |

---

### Tab 3 — Predeterminados

| Label | Campo DB | Tabla | Tipo | Notas |
|---|---|---|---|---|
| SR Predeterminado | `default_rep_id` | `partners` | Dropdown | SRs activos del partner. Se puede asignar después de crear el primer SR |
| Categoría Predeterminada | `default_category_id` | `partners` | Dropdown | Categorías activas del partner. Se puede asignar en el mismo flujo de creación (ver sección Categorías) |

---

### Tab 4 — Integración y Notificaciones

| Label | Campo DB | Tabla | Tipo | Notas |
|---|---|---|---|---|
| API Key | `api_key_hash` | `partners` | Generado automáticamente | Botón *"Generar API Key"*. Se muestra una sola vez al generar — no se puede consultar después. Se almacena como hash |
| SR predeterminado para webservices | `default_rep_id` | `partners` | Dropdown | SR que se asigna cuando la solicitud llega vía API sin `sales_rep_id` |
| Email de notificación | `notification_email` | `partners` | Email | Notificaciones generales del partner |
| Webhook | `webhook_url` | `partners` | URL | Endpoint del partner para eventos del sistema |
| Email notificaciones de desembolsos | `disbursement_notification_email` | `partners` | Email | Notificaciones específicas de desembolsos |
| Comprobante de solicitud SR | `send_sales_rep_voucher` | `partners` | Toggle | Activa el envío de comprobante al SR tras registrar una solicitud |

---

## Creación de Categorías en el Mismo Flujo

Al crear un nuevo partner, el sistema ofrece la opción de agregar una o más categorías antes de guardar. El Admin puede agregar múltiples categorías con el botón **"Agregar categoría"**.

**Campos por categoría:**

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Nombre de la categoría * | `name` | `partner_categories` | Texto | — |
| Descuento % * | `discount_percentage` | `partner_categories` | Decimal | — |
| Tasa de interés % | `interest_rate` | `partner_categories` | Decimal | — |
| Comisión de desembolso % | `disbursement_fee_percent` | `partner_categories` | Decimal | — |
| Comisión mínima de desembolso | `minimum_disbursement_fee` | `partner_categories` | Numérico (COP) | — |
| Retraso (días) * | `delay_days` | `partner_categories` | Numérico | — |
| Plazo (días) * | `term_days` | `partner_categories` | Numérico | — |

> Una vez guardado el partner, las categorías también se pueden gestionar desde el módulo independiente HU-B04.

---

## Activar / Desactivar Partner

Desde el listado, el Admin puede cambiar el estado del partner entre `active` e `inactive`.

- Un partner inactivo no aparece disponible en los formularios de solicitud ni en el portal de SRs.
- La acción requiere confirmación con modal: *"¿Estás seguro de que deseas desactivar este partner? Los formularios y Sales Reps asociados dejarán de estar disponibles."*

---

## Flujo de Almacenamiento — Creación

Al guardar:

### 1. Crear registro en `partners`
```
company_name                    → del formulario
trade_name                      → del formulario (único, minúsculas y sin espacios)
acronym                         → del formulario
country_code                    → del formulario
logo_url                        → URL S3 del logo subido
co_branding_logo_url            → URL S3 del logo co-branding
primary_color                   → del formulario
secondary_color                 → del formulario
light_color                     → del formulario
sales_rep_role_name             → del formulario (default: 'Sales Rep')
sales_rep_role_name_plural      → del formulario (default: 'Sales Reps')
notification_email              → del formulario
webhook_url                     → del formulario
disbursement_notification_email → del formulario
send_sales_rep_voucher          → del formulario
api_key_hash                    → hash del API key generado
status_id                       → get_status_id('partners', 'active')
```

### 2. Crear registros en `partner_categories` (si se agregaron)
```
-- Por cada categoría agregada en el flujo:
partner_id                → ID del partner recién creado
name                      → del formulario
discount_percentage       → del formulario
interest_rate             → del formulario
disbursement_fee_percent  → del formulario
minimum_disbursement_fee  → del formulario
delay_days                → del formulario
term_days                 → del formulario
status_id                 → get_status_id('partner_categories', 'active')
```

### 3. Actualizar `default_category_id` en `partners` (si aplica)
```
default_category_id → ID de la categoría marcada como predeterminada
```

---

## Criterios de Aceptación

- [ ] El rol Admin tiene acceso completo: crear, editar, activar/desactivar
- [ ] El rol Analista puede ver el listado y el detalle de partners y categorías, pero los formularios y acciones de edición están deshabilitados
- [ ] El listado muestra todos los partners con buscador por razón social o nombre comercial (`trade_name`)
- [ ] Se puede crear un partner con sus categorías en un solo flujo
- [ ] El `trade_name` es único en el sistema, sin espacios y en minúsculas
- [ ] El API Key se genera desde el backoffice, se muestra una sola vez y se almacena como hash
- [ ] Los logos se suben a S3 y se almacena la URL
- [ ] Se puede activar y desactivar un partner con confirmación modal
- [ ] Un partner inactivo no aparece disponible en formularios ni portal SR
- [ ] `default_category_id` y `default_rep_id` se pueden asignar y editar
- [ ] Al editar, todos los campos precargados muestran los valores actuales
- [ ] Las categorías creadas en el flujo quedan asociadas al partner correcto

---