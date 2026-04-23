# HU-B04 — Gestión de Categorías de Partners (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin (CRUD completo) · Analista (solo lectura — ver listado y detalle)  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Admin del backoffice de Platam,  
**quiero** crear, editar y administrar las categorías de cada partner,  
**para** configurar las condiciones financieras con las que operan los formularios de solicitud y las órdenes de compra.

---

## Contexto

Las categorías definen las condiciones financieras de cada partner (descuento, tasa, plazo, etc.). Un partner puede tener múltiples categorías activas. Las categorías también se pueden crear desde el flujo de creación de partners (HU-B03), pero este módulo permite gestionarlas de forma independiente.

---

## Listado de Categorías

Tabla con buscador y filtro por partner. Columnas visibles:

| Columna | Campo DB | Tabla |
|---|---|---|
| ID | `id` | `partner_categories` |
| Logo partner | `logo_url` | `partners` |
| Partner | `partner_id` | `partner_categories` |
| Nombre de la categoría | `name` | `partner_categories` |
| Descuento % | `discount_percentage` | `partner_categories` |
| Retraso (días) | `delay_days` | `partner_categories` |
| Plazo (días) | `term_days` | `partner_categories` |
| Comisión de desembolso % | `disbursement_fee_percent` | `partner_categories` |
| Comisión mínima de desembolso | `minimum_disbursement_fee` | `partner_categories` |
| Estado | `state` | `partner_categories` |
| Acciones | Editar · Activar/Desactivar · Eliminar | — |

---

## Formulario de Creación / Edición

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Partner * | `partner_id` | `partner_categories` | Dropdown | Partners activos en el sistema |
| Nombre de la categoría * | `name` | `partner_categories` | Texto | — |
| Descripción | `description` | `partner_categories` | Texto | Opcional. Máx. 255 caracteres. Visible para el SR al seleccionar la categoría |
| Descuento % * | `discount_percentage` | `partner_categories` | Decimal | — |
| Tasa de interés % | `interest_rate` | `partner_categories` | Decimal | — |
| Comisión de desembolso % | `disbursement_fee_percent` | `partner_categories` | Decimal | — |
| Comisión mínima de desembolso | `minimum_disbursement_fee` | `partner_categories` | Numérico (COP) | — |
| Retraso (días) * | `delay_days` | `partner_categories` | Numérico | — |
| Plazo (días) * | `term_days` | `partner_categories` | Numérico | — |

---

## Activar / Desactivar Categoría

Desde el listado el Admin puede cambiar el estado entre `active` e `inactive`.

**Validaciones antes de desactivar:**

1. **Si la categoría está en `default_category_ids` del partner:**
   - Advertencia: *"Esta categoría es predeterminada del partner. Desactivarla puede afectar los formularios de solicitud. ¿Deseas continuar?"*

2. **Si la categoría tiene clientes activos asignados:**
   - Sistema cuenta registros en `client_category_assignments` WHERE `category_id` = esta categoría AND `is_active` = true
   - Si hay clientes asignados:
     - Advertencia: *"Esta categoría tiene [N] cliente(s) activo(s) asignado(s). Desactivarla impedirá nuevas solicitudes pero no afectará préstamos existentes. ¿Deseas continuar?"*

**Efecto de desactivar:**
- Nueva solicitudes: la categoría no aparece disponible en formularios ni órdenes
- Solicitudes en curso (`loan_requests`): no se ven afectadas
- Préstamos activos (`loans`): no se ven afectados (usan snapshot de términos)
- Asignaciones a clientes: permanecen en `client_category_assignments` pero la categoría no se puede usar en nuevas solicitudes

---

## Flujo de Almacenamiento — Creación

```
partner_id                → del formulario
name                      → del formulario
discount_percentage       → del formulario
interest_rate             → del formulario
disbursement_fee_percent  → del formulario
minimum_disbursement_fee  → del formulario
delay_days                → del formulario
term_days                 → del formulario
state                     → CategoryState.ACTIVE ('active')
```

---

## Criterios de Aceptación

- [ ] El rol Admin tiene acceso completo: crear, editar, activar/desactivar
- [ ] El rol Analista puede ver el listado y el detalle pero los formularios y acciones de edición están deshabilitados
- [ ] El listado se puede filtrar por partner
- [ ] Se puede crear una categoría de forma independiente desde este módulo
- [ ] Se puede editar cualquier campo de una categoría existente
- [ ] Al desactivar una categoría que está en `default_category_ids` del partner se muestra advertencia con confirmación
- [ ] Al desactivar una categoría con clientes activos asignados se muestra advertencia indicando cuántos clientes tienen esa categoría
- [ ] Una categoría inactiva no aparece disponible en formularios ni en órdenes de compra
- [ ] Al editar, todos los campos precargados muestran los valores actuales
- [ ] Los campos `delay_days` y `term_days` solo aceptan valores numéricos positivos

---

## Nota de Schema — Cambio Pendiente

> ⚠️ Esta historia requiere el siguiente cambio en el schema antes del desarrollo:
>
> **Campo `description` en `partner_categories`**  
> ```
> description varchar(255) [note: "Descripción corta opcional. Visible para el SR al seleccionar la categoría"]
> ```
