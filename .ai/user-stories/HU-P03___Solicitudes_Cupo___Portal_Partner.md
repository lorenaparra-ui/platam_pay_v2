# HU-P03 — Solicitudes de Cupo · Portal Partner

**Épica:** epic-06-portal-partner  
**Actor:** Usuario operativo del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`partners.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

Vista de solo lectura donde el partner hace seguimiento al estado de las solicitudes de crédito (onboarding) de sus clientes. Las decisiones de aprobación o rechazo las toma el equipo de Platam desde el backoffice (HU-B06, HU-B07, HU-B08) — el partner no tiene acción aquí.

---

## Historia de Usuario

**Como** usuario operativo de un partner,  
**quiero** ver el estado de todas las solicitudes de cupo de mis clientes,  
**para** hacer seguimiento al pipeline de onboarding sin tener que contactar al equipo de Platam.

---

## Flujo Principal

```
1. Usuario navega a /solicitudes-cupo

2. Sistema carga la lista de solicitudes de credit_applications
   asociadas al partner autenticado
   → Ordenadas por fecha de solicitud descendente por defecto

3. Usuario puede filtrar y buscar

4. Usuario hace clic en una solicitud con estado Aprobado-Firmado
   → Botón "Ver cliente" disponible → redirige a HU-P04 (detalle cliente)

5. Para cualquier otro estado: solo lectura, sin CTA
```

---

## Pantalla — Lista de Solicitudes de Cupo

### Controles superiores

| Elemento | Detalle |
|---|---|
| Buscador | Nombre cliente, No. documento, email, teléfono |
| Filtro: Estado | Todos / En proceso / En estudio / Aprobado – En Firma / Aprobado – Firmado / Rechazado |
| Orden | Fecha solicitud (desc/asc) |

### Campos por solicitud

| Campo | Fuente |
|---|---|
| ID | `credit_applications.id` |
| Nombre cliente | `persons.first_name + last_name` / `businesses.legal_name` (PJ) |
| Tipo documento | `persons.doc_type` |
| No. documento | `persons.doc_number` |
| Teléfono | `persons.phone` |
| Email | `users.email` |
| SR | Nombre del sales rep que registró la solicitud |
| Fecha solicitud | `created_at` |
| Estado | Badge (ver tabla abajo) |

### Estados y badges

| Estado (`CreditApplicationStatus`) | Badge | CTA |
|---|---|---|
| `in_progress` | Gris — "En proceso" | — |
| `under_review` | Amarillo — "En estudio" | — |
| `approved_pending_signature` ⚠️ | Azul claro — "Aprobado – En Firma" | — |
| `approved_signed` ⚠️ | Verde — "Aprobado – Firmado" | "Ver cliente" → HU-P04 |
| `rejected` | Rojo — "Rechazado" | — |
| `duplicate` | Gris — "Duplicado" | — |

> El partner no ve el estado `pending_authorization` — ese estado es interno al flujo de onboarding del cliente (HU-05) y se resuelve antes de que la solicitud sea visible en el pipeline del partner.
> ⚠️ Los estados `approved_pending_signature` y `approved_signed` están pendientes de agregar al enum (Lorena ítem 5 y 8).

---

## Criterios de Aceptación

```gherkin
Scenario: Lista carga correctamente
  Given un partner con solicitudes en distintos estados
  When navega a solicitudes de cupo
  Then ve solo las solicitudes asociadas a su partner_id
  And están ordenadas por fecha descendente

Scenario: Filtro por estado
  Given la lista con solicitudes en múltiples estados
  When selecciona "En estudio"
  Then solo se muestran solicitudes en ese estado

Scenario: Búsqueda por cliente
  Given una búsqueda por nombre o documento
  Then solo se muestran solicitudes que coincidan

Scenario: Ver cliente desde aprobado-firmado
  Given una solicitud en estado aprobado_firmado
  Then el botón "Ver cliente" está disponible
  When hace clic
  Then redirige al detalle del cliente en HU-P04

Scenario: Solicitud en cualquier otro estado
  Given una solicitud que no está en aprobado_firmado
  Then no hay CTA disponible — solo lectura

Scenario: Sin solicitudes
  Given un partner sin solicitudes registradas
  Then ve un mensaje "No hay solicitudes de cupo registradas"
```

---

## Impacto en Schema

Sin cambios adicionales. Consume datos de `credit_applications`, `persons`, `users`, `businesses`, `sales_representatives`.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Scope por partner | El endpoint filtra por `partner_id` del usuario autenticado |
| Sin acciones | El partner no puede modificar ni escalar solicitudes desde este portal — debe contactar a Platam por el canal de soporte (HU-P07) |
| Paginación | 20 registros por carga, infinite scroll |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-P01 (Login) | Requiere sesión activa |
| HU-P04 (Clientes) | Destino del botón "Ver cliente" |
| HU-B06 / B07 / B08 | Backoffice gestiona las decisiones sobre estas solicitudes |
