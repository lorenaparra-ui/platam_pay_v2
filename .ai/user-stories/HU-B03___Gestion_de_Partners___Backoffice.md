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
| Alias | `alias` | `partners` |
| Acrónimo | `acronym` | `partners` |
| Logo | `logo_url` | `partners` |
| SR Predeterminado | `default_rep_id` | `partners` |
| Categorías Predeterminadas | `default_category_ids` | `partners` |
| Estado | `state` | `partners` |
| Acciones | Editar · Activar/Desactivar · Eliminar | — |

---

## Perfil del Partner

Al hacer clic en un partner se accede a su perfil con el encabezado de datos principales (razón social, alias, acrónimo, país, estado, logo) y 3 tabs:

### Tab 1 — Detalle
Muestra todos los campos del formulario en modo lectura. El Admin puede hacer clic en **Editar** para modificarlos.

### Tab 2 — Categorías
Lista de categorías de este partner. Mismas columnas que HU-B04. El Admin puede crear, editar, activar/desactivar y marcar categorías como predeterminadas directamente desde aquí. El Analista solo puede verlas.

### Tab 3 — Sales Reps
Lista de SRs de este partner. Mismas columnas que HU-B05. El Admin y el Analista pueden crear, editar y activar/desactivar SRs desde aquí. Al hacer clic en un SR se navega al perfil completo del SR (HU-B05).

> La navegación soporta dos rutas para llegar a un SR:
> - **Anidada:** Partners → perfil del partner → tab Sales Reps → perfil del SR
> - **Directa:** módulo global de Sales Reps (HU-B05) → buscador → perfil del SR

---

## Formulario de Creación / Edición

Organizado en 4 tabs.

---

### Tab 1 — General

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Razón Social * | `company_name` | `partners` | Texto | ⚠️ Pendiente Lorena (ítem 7 y 15 de SCHEMA_PENDIENTE_LORENA.md) |
| Alias * | `alias` | `partners` | Texto | Sin espacios, minúsculas. Define la URL de la landing: `platampay.com/{{alias}}` |
| Acrónimo * | `acronym` | `partners` | Texto | Máx. 10 caracteres |
| País * | `country_code` | `partners` | Dropdown | Países activos en el sistema. ⚠️ Pendiente Lorena (ítem 15) |
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
| Categorías Predeterminadas | `default_category_ids` | `partners` | Multiselect | Categorías activas del partner. Sin orden ni prioridad. Se pueden marcar una o más. Se puede asignar en el mismo flujo de creación (ver sección Categorías) |

---

### Tab 4 — Integración y Notificaciones

| Label                               | Campo DB                          | Tabla      | Tipo                     | Notas                                                                                                                |
| ----------------------------------- | --------------------------------- | ---------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| API Key                             | `api_key_hash`                    | `partners` | Generado automáticamente | Botón *"Generar API Key"*. Se muestra una sola vez al generar — no se puede consultar después. Se almacena como hash |
| SR predeterminado para webservices  | `default_rep_id`                  | `partners` | Dropdown                 | SR que se asigna cuando la solicitud llega vía API sin `sales_rep_id`                                                |
| Email de notificación               | `notification_email`              | `partners` | Email                    | Notificaciones generales del partner                                                                                 |
| Webhook                             | `webhook_url`                     | `partners` | URL                      | Endpoint del partner para eventos del sistema                                                                        |
| Email notificaciones de desembolsos | `disbursement_notification_email` | `partners` | Email                    | Notificaciones específicas de desembolsos                                                                            |
| Comprobante de solicitud SR         | `send_sales_rep_voucher`          | `partners` | Toggle                   | Activa el envío de comprobante al SR tras registrar una solicitud                                                    |

---

## Creación de Categorías en el Mismo Flujo

Al crear un nuevo partner, el sistema ofrece la opción de agregar una o más categorías antes de guardar. El Admin puede agregar múltiples categorías con el botón **"Agregar categoría"** y marcar cuáles son predeterminadas.

**Campos por categoría:**

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Nombre de la categoría * | `name` | `partner_categories` | Texto | — |
| Descripción | `description` | `partner_categories` | Texto | Opcional. Descripción corta visible para el SR al seleccionar la categoría |
| Descuento % * | `discount_percentage` | `partner_categories` | Decimal | — |
| Tasa de interés % | `interest_rate` | `partner_categories` | Decimal | — |
| Comisión de desembolso % | `disbursement_fee_percent` | `partner_categories` | Decimal | — |
| Comisión mínima de desembolso | `minimum_disbursement_fee` | `partner_categories` | Numérico (COP) | — |
| Retraso (días) * | `delay_days` | `partner_categories` | Numérico | — |
| Plazo (días) * | `term_days` | `partner_categories` | Numérico | — |
| ¿Predeterminada? | `default_category_ids` | `partners` | Checkbox | Marca esta categoría como predeterminada del partner |

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
company_name                    → del formulario  -- ⚠️ campo pendiente (Lorena ítem 7)
alias                           → del formulario
acronym                         → del formulario
country_code                    → del formulario  -- ⚠️ campo pendiente (Lorena ítem 15)
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
state                           → PartnerState.ACTIVE ('active')
```

### 2. Crear registros en `partner_categories` (si se agregaron)
```
-- Por cada categoría agregada en el flujo:
partner_id                → ID del partner recién creado
name                      → del formulario
description               → del formulario (opcional)
discount_percentage       → del formulario
interest_rate             → del formulario
disbursement_fee_percent  → del formulario
minimum_disbursement_fee  → del formulario
delay_days                → del formulario
term_days                 → del formulario
state                     → CategoryState.ACTIVE ('active')
```

### 3. Actualizar `default_category_ids` en `partners` (si aplica)
```
default_category_ids → array JSON con los IDs de las categorías marcadas como predeterminadas
-- Ejemplo: [120, 121]
```

---

## Criterios de Aceptación

- [ ] El rol Admin tiene acceso completo: crear, editar, activar/desactivar
- [ ] El rol Analista puede ver el listado y el detalle de partners y categorías, pero los formularios y acciones de edición están deshabilitados
- [ ] El listado muestra todos los partners con buscador por nombre o alias
- [ ] Se puede crear un partner con sus categorías en un solo flujo
- [ ] El alias es único en el sistema y no acepta espacios ni mayúsculas
- [ ] El API Key se genera desde el backoffice, se muestra una sola vez y se almacena como hash
- [ ] Los logos se suben a S3 y se almacena la URL
- [ ] Se puede activar y desactivar un partner con confirmación modal
- [ ] Un partner inactivo no aparece disponible en formularios ni portal SR
- [ ] Se pueden marcar múltiples categorías como predeterminadas sin orden ni prioridad
- [ ] `default_category_ids` se almacena como array JSON en la tabla `partners`
- [ ] `default_rep_id` se puede asignar y editar
- [ ] Al editar, todos los campos precargados muestran los valores actuales
- [ ] Las categorías creadas en el flujo quedan asociadas al partner correcto
- [ ] El perfil del partner muestra los 3 tabs: Detalle, Categorías y Sales Reps
- [ ] Desde el tab Categorías se pueden gestionar las categorías del partner y marcar predeterminadas
- [ ] Desde el tab Sales Reps se pueden gestionar los reps del partner
- [ ] Al hacer clic en un SR desde el tab Sales Reps se navega a su perfil completo

---

## Nota de Schema — Cambios Pendientes

> ⚠️ Esta historia requiere los siguientes cambios en el schema antes del desarrollo:
>
> **1. Campo `alias` en `partners`**  
> ```
> alias varchar(50) [unique, not null]
> ```
>
> **2. Reemplazar `default_category_id` por `default_category_ids` en `partners`**  
> ```
> -- Eliminar:
> default_category_id bigint [ref: > partner_categories.id]
> -- Agregar:
> default_category_ids jsonb [note: "Array de IDs de categorías predeterminadas. Ej: [120, 121]"]
> ```
>
> **3. Campo `description` en `partner_categories`**  
> ```
> description varchar(255) [note: "Descripción corta opcional. Visible para el SR al seleccionar la categoría"]
> ```
