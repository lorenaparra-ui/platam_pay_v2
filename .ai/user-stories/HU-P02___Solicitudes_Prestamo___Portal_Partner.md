# HU-P02 — Solicitudes de Préstamo · Portal Partner

**Épica:** epic-06-portal-partner  
**Actor:** Usuario operativo del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`partners.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

Esta es la pantalla home del portal — la primera que ve el usuario tras el login. Centraliza todas las solicitudes de préstamo asociadas al partner, priorizando visualmente las que requieren acción inmediata: las pendientes de aprobación del partner (`pending_partner_approval`).

La acción de confirmar o rechazar entrega está documentada en **HU-C05**. Esta HU documenta únicamente la capa UI.

---

## Historia de Usuario

**Como** usuario operativo de un partner,  
**quiero** ver todas las solicitudes de préstamo de mis clientes con las pendientes destacadas al tope,  
**para** procesar las confirmaciones de entrega sin perder ninguna solicitud que requiera mi acción.

---

## Flujo Principal

```
1. Usuario inicia sesión
   → Redirige automáticamente a /solicitudes

2. Pantalla carga la lista de solicitudes del partner
   → Ordenadas por defecto: pendientes de aprobación partner primero,
     luego el resto por fecha de solicitud descendente
   → Cada solicitud muestra su estado visualmente diferenciado

3. Usuario puede filtrar, buscar y ordenar la lista

4. Usuario hace clic en una solicitud pendiente
   → Abre el formulario de confirmación de entrega (HU-C05)
   → Puede aprobar o rechazar

5. Usuario hace clic en una solicitud ya procesada
   → Abre vista de detalle (solo lectura)
```

---

## Pantalla — Lista de Solicitudes

### Controles superiores

| Elemento | Detalle |
|---|---|
| Buscador | Búsqueda libre: nombre cliente, No. documento, ID pedido |
| Filtro: Estado | Todas / Pendiente aprobación partner / Aprobada / Rechazada |
| Filtro: SR | Dropdown con SRs del partner |
| Orden | Fecha solicitud (desc/asc) |

### Tarjeta de solicitud

Cada solicitud se muestra como una tarjeta con la siguiente información:

| Campo | Fuente |
|---|---|
| Solicitud # | `loan_requests.id` |
| Nombre cliente | `users.full_name` |
| ID Pedido | `order_reference` |
| No. Documento | Documento del cliente |
| SR | Nombre del sales rep |
| Valor pedido | `requested_amount` |
| Fecha solicitud | `created_at` |
| Aprobación cliente | Badge (siempre Aprobada en este listado) |
| Valor factura | `confirmed_amount` (vacío si pendiente) |
| Fecha facturación | `partner_approved_at` (vacío si pendiente) |
| Aprobación partner | Badge de estado (ver tabla abajo) |
| Referencia préstamo | `loan.id` (si ya fue activado) |

### Estados y tratamiento visual

| Estado | Badge | Prioridad en lista | CTA |
|---|---|---|---|
| `pending_partner_approval` | Amarillo — "Aprobación pendiente" | 🔝 Primero siempre | "Procesar" |
| `approved` | Verde — "Aprobada" | Después de pendientes | Solo lectura |
| `rejected` | Rojo — "Rechazada" | Después de aprobadas | Solo lectura |

> Las solicitudes en `pending_partner_approval` se destacan con un borde o fondo diferenciado además del badge, para que sean inmediatamente reconocibles sin leer el estado.

---

## Formulario de Confirmación de Entrega

Al hacer clic en "Procesar" sobre una solicitud pendiente, se abre el formulario definido en **HU-C05** (cabecera de solo lectura + campos editables: No. orden, Valor factura, Fecha entrega, Aprobación).

Esta HU no redocumenta la lógica de negocio — todo está en HU-C05.

---

## Vista de Detalle (solo lectura)

Al hacer clic en una solicitud ya procesada (aprobada o rechazada):

| Sección | Contenido |
|---|---|
| Cabecera | Todos los campos de la tarjeta |
| Si aprobada | Valor factura, fecha entrega, referencia préstamo, fecha desembolso estimada |
| Si rechazada | Motivo de rechazo, fecha de rechazo |

---

## Criterios de Aceptación

```gherkin
Scenario: Home — pendientes al tope
  Given un partner con solicitudes en distintos estados
  When el usuario accede al portal
  Then las solicitudes en pending_partner_approval aparecen primeras
  And tienen un indicador visual diferenciado del resto

Scenario: Filtro por estado
  Given la lista con solicitudes en múltiples estados
  When el usuario selecciona "Pendiente aprobación partner"
  Then solo se muestran solicitudes en pending_partner_approval

Scenario: Búsqueda libre
  Given una búsqueda por nombre de cliente
  Then solo se muestran solicitudes que coincidan con ese cliente

Scenario: Clic en solicitud pendiente
  Given una solicitud en pending_partner_approval
  When el usuario hace clic en "Procesar"
  Then se abre el formulario de confirmación de HU-C05

Scenario: Clic en solicitud aprobada
  Given una solicitud en estado aprobada
  When el usuario hace clic
  Then se abre la vista de detalle en solo lectura
  And se muestra la referencia del préstamo activado

Scenario: Lista vacía de pendientes
  Given un partner sin solicitudes pendientes
  Then la lista muestra un mensaje "No tienes solicitudes pendientes"
  And las solicitudes procesadas siguen visibles bajo el filtro correspondiente
```

---

## Impacto en Schema

Sin cambios. Esta pantalla consume datos existentes de `loan_requests`, `users`, `sales_representatives` y `loans`.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Ordenamiento | Backend ordena: `pending_partner_approval` primero, luego `created_at DESC` |
| Scope por partner | El endpoint filtra por `partner_id` del usuario autenticado — nunca expone solicitudes de otros partners |
| Paginación | Lista paginada (recomendado 20 por página); pendientes siempre en primera página independientemente de la paginación |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-P01 (Login) | Requiere sesión activa |
| HU-C05 (Confirmación de Entrega) | Lógica de negocio del formulario de procesamiento |
| HU-C04 (Activación Préstamo) | Se dispara al aprobar desde esta pantalla |
| HU-P03 (Solicitudes de Cupo) | Pantalla separada — solicitudes de onboarding de clientes |
