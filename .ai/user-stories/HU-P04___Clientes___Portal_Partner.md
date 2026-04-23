# HU-P04 — Clientes · Portal Partner

**Épica:** epic-06-portal-partner  
**Actor:** Usuario operativo del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`partners.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

Vista de todos los clientes visibles para el partner — un cliente aparece aquí si tiene al menos una categoría activa del partner asignada. Si Platam retira todas las categorías del partner a un cliente, ese cliente deja de ser visible y gestionable desde este portal.

El partner puede consultar la información del cliente, su actividad crediticia asociada exclusivamente a ese partner, y gestionar qué categorías del partner tiene habilitadas el cliente.

Las categorías disponibles para asignar son las que Platam habilitó para el partner desde el backoffice (HU-B04) en la tabla `partner_categories`. El partner no puede crear ni modificar los términos de las categorías — solo activar o desactivar cuáles aplican a cada cliente vía `client_category_assignments`.

---

## Historia de Usuario

**Como** usuario operativo de un partner,  
**quiero** ver mis clientes activos con su información crediticia y gestionar sus categorías habilitadas,  
**para** controlar qué líneas de producto puede usar cada cliente sin depender del equipo de Platam.

---

## Flujo Principal — Lista

```
1. Usuario navega a /clientes

2. Sistema carga los clientes que tienen al menos una categoría activa
   del partner autenticado en client_category_assignments
   → Ordenados por nombre por defecto

3. Usuario puede buscar y filtrar

4. Usuario hace clic en un cliente
   → Abre el detalle del cliente
```

---

## Pantalla — Lista de Clientes

### Controles superiores

| Elemento | Detalle |
|---|---|
| Buscador | Nombre, No. documento, celular, email |
| Filtro: Estado | Todos / Activo / Bloqueado |

### Campos por cliente

| Campo | Fuente |
|---|---|
| ID | `credit_facilities.id` |
| Nombre cliente | `persons.first_name + last_name` / `businesses.legal_name` (PJ) |
| Tipo documento | `persons.doc_type` |
| No. documento | `persons.doc_number` |
| Teléfono | `persons.phone` |
| Email | `users.email` |
| Cupo total | `credit_facilities.total_limit` |
| Cupo disponible | `credit_facilities.available_loc` |
| Estado | Badge: Activo / Bloqueado |

---

## Flujo Principal — Detalle del Cliente

```
1. Usuario hace clic en un cliente de la lista

2. Pantalla de detalle carga con cabecera y tabs

3. Usuario navega entre tabs para consultar info o gestionar categorías
```

---

## Pantalla — Detalle del Cliente

### Cabecera

Dos paneles lado a lado:

**Panel izquierdo — datos de contacto:**

| Campo | Fuente |
|---|---|
| Nombre completo | `persons.first_name + last_name` / `businesses.legal_name` (PJ) |
| Teléfono | `persons.phone` |
| Tipo documento | `persons.doc_type` |
| No. documento | `persons.doc_number` |
| Email | `users.email` |
| Versión contrato | `credit_facilities.contract_version` o similar |

**Panel derecho — datos crediticios:**

| Campo | Fuente |
|---|---|
| ID Cliente | `credit_facilities.id` |
| SR asignado | Nombre del sales rep |
| Estado | Badge: Activo / Bloqueado |
| Cupo total | `credit_facilities.total_limit` |
| Cupo disponible | `credit_facilities.available_loc` |

---

### Tabs

#### Tab 1 — Info

Información adicional del cliente según el tipo (PN o PJ):

**PN:**

| Campo | Fuente |
|---|---|
| Nombre del negocio | `credit_applications.business_name` |
| Relación con el negocio | `credit_applications.business_relationship` |
| Ciudad | `credit_applications.city` |
| Dirección residencia | `credit_applications.home_address` |
| Dirección negocio | `credit_applications.business_address` |

**PJ:** campos equivalentes del formulario PJ (razón social, NIT, representante legal, dirección).

Solo lectura. El partner no puede editar datos del cliente.

---

#### Tab 2 — Solicitudes

Lista de `loan_requests` del cliente donde el `partner_id` corresponde al partner autenticado.

| Campo | Fuente |
|---|---|
| Solicitud # | `loan_requests.id` |
| ID Pedido | `order_reference` |
| Valor pedido | `requested_amount` |
| Valor factura | `confirmed_amount` |
| Fecha solicitud | `created_at` |
| Estado aprobación partner | Badge |
| Referencia préstamo | `loan.id` si fue activado |

Solo lectura.

---

#### Tab 3 — Préstamos

Lista de `loans` del cliente originados desde solicitudes de este partner específicamente.

| Campo | Fuente |
|---|---|
| Préstamo # | `loans.id` |
| Modalidad | Bullet / Cuotas |
| Monto | `loans.principal` |
| Fecha activación | `loans.disbursement_date` |
| Fecha vencimiento | `loans.due_date` |
| Estado | Badge: Activo / Pagado / En mora |

Solo lectura.

---

#### Tab 4 — Pagos

Historial de pagos aplicados a los préstamos del cliente originados desde este partner.

| Campo | Fuente |
|---|---|
| Fecha pago | `payment_applications.applied_at` |
| Monto pagado | `payment_applications.amount` |
| Préstamo | Referencia `loan.id` |
| Tipo | Capital / Interés / Mora |

Solo lectura.

---

#### Tab 5 — Categorías

Lista de las categorías que Platam habilitó para el partner. El partner puede activar o desactivar cada una para este cliente.

**Reglas de negocio:**
- El partner solo ve las categorías que Platam le habilitó en backoffice.
- Un cliente siempre debe tener al menos una categoría activa del partner. Si solo queda una activa, su toggle aparece deshabilitado con tooltip: *"El cliente debe tener al menos una categoría activa."*
- Si el partner desactiva todas las que puede y queda solo una, esa última no se puede desactivar desde el portal.

| Elemento | Detalle |
|---|---|
| Nombre categoría | `partner_categories.name` |
| Descripción | `partner_categories.description` |
| Estado para este cliente | Toggle activo / inactivo (modifica `client_category_assignments.is_active`) |
| Toggle deshabilitado | Cuando es la última categoría activa |

**Flujo de activar/desactivar:**

```
1. Usuario activa o desactiva el toggle de una categoría
   → Si es la última activa: toggle bloqueado, no hay acción posible

2. Modal de confirmación:
   → Activar: "¿Confirmas que quieres habilitar [nombre categoría]
     para [nombre cliente]?"
   → Desactivar: "¿Confirmas que quieres deshabilitar [nombre categoría]
     para [nombre cliente]? Las solicitudes en curso con esta categoría
     no se verán afectadas."

3. Usuario confirma
   → Sistema actualiza is_active en client_category_assignments
   → Toast: "Categoría actualizada correctamente"

4. Si rechaza el modal → no se hace ningún cambio
```

> ⚠️ **Nota de schema:** se requiere la tabla `client_category_assignments`
> para registrar qué categorías están habilitadas por cliente y por partner.
> Ver sección Impacto en Schema.

---

## Criterios de Aceptación

```gherkin
Scenario: Lista de clientes — filtro por categorías
  Given un partner con clientes que tienen categorías activas suyas
  When navega a /clientes
  Then ve solo los clientes con al menos una categoría activa del partner
  And un cliente sin ninguna categoría activa del partner NO aparece

Scenario: Búsqueda
  Given una búsqueda por nombre o documento
  Then la lista filtra en tiempo real

Scenario: Detalle — tabs
  Given un cliente con historial
  When el usuario abre el detalle
  Then puede navegar entre Info, Solicitudes, Préstamos, Pagos y Categorías
  And en Solicitudes y Préstamos solo ve los asociados a ese partner

Scenario: Activar categoría
  Given una categoría inactiva para un cliente
  When el usuario activa el toggle y confirma el modal
  Then la categoría queda activa en client_category_assignments
  And ve un toast de confirmación

Scenario: Desactivar categoría — quedan más de una activa
  Given un cliente con dos o más categorías activas del partner
  When el usuario desactiva una y confirma el modal
  Then la categoría queda inactiva
  And las solicitudes en curso no se ven afectadas

Scenario: Desactivar categoría — es la última activa
  Given un cliente con exactamente una categoría activa del partner
  Then el toggle de esa categoría aparece deshabilitado
  And no es posible desactivarla desde el portal

Scenario: Cancelar modal de categoría
  Given el modal de confirmación abierto
  When el usuario cancela
  Then el toggle vuelve a su estado anterior sin cambios en DB

Scenario: Categorías no asignadas al partner
  Given categorías que Platam no habilitó para este partner
  Then NO aparecen en el tab de categorías del cliente
```

---

## Impacto en Schema

### Nueva tabla — `client_category_assignments`

Registra qué categorías están habilitadas por cliente y por partner.

```sql
CREATE TABLE client_category_assignments (
  id                  SERIAL PRIMARY KEY,
  credit_facility_id  INT NOT NULL REFERENCES credit_facilities(id),
  category_id         INT NOT NULL REFERENCES categories(id),
  partner_id          INT NOT NULL REFERENCES partners(id),
  is_active           BOOLEAN NOT NULL DEFAULT TRUE,
  assigned_by         INT REFERENCES users(id),  -- usuario del portal partner
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (credit_facility_id, category_id, partner_id)
);
```

> ⚠️ **Requiere confirmación de Freddy antes de aplicar en producción.**  
> Verificar si ya existe alguna tabla o campo que maneje esta relación en el schema actual.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Scope por partner | Un cliente es visible para el partner solo si tiene ≥1 categoría activa del partner en `client_category_assignments` |
| Scope solicitudes y préstamos | Solo los originados con `partner_id` del partner autenticado — un cliente puede tener préstamos con otros partners y no son visibles aquí |
| Categorías disponibles | Solo las categorías habilitadas para el partner en `partner_categories` (backoffice HU-B04) |
| Desactivar categoría | Modifica `client_category_assignments.is_active` a false. No afecta `loan_requests` o `loans` en curso — solo bloquea nuevas solicitudes con esa categoría |
| Edición de datos del cliente | No permitida desde el portal partner — solo Platam puede modificar datos del cliente |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-P01 (Login) | Requiere sesión activa |
| HU-P03 (Solicitudes de Cupo) | El botón "Ver cliente" redirige aquí |
| HU-B04 (Gestión de Categorías) | Define las categorías disponibles por partner |
| HU-C11 (LOC) | Fuente del `available_loc` mostrado en cabecera |
