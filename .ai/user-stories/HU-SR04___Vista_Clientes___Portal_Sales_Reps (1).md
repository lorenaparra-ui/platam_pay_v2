# HU-SR04 — Vista de Clientes · Portal Sales Reps

**Épica:** epic-04-portal-sales-reps  
**Actor:** Sales Representative (SR) autenticado  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal,  
**quiero** ver el listado de mis clientes y poder consultar cualquier 
cliente del partner mediante búsqueda exacta,  
**para** hacer seguimiento al estado de sus solicitudes y préstamos, 
y poder atender clientes de otros SRs cuando sea necesario.

---

## Flujo

```
1. SR accede a "Mis clientes"
   → Ve la lista de sus clientes asignados (sales_rep_id = el suyo)
   → Puede filtrar por estado
   → Puede buscar dentro de su lista por nombre o documento

2. SR puede buscar cualquier cliente del partner
   → Ingresa número de celular, correo o número de identificación (exacto)
   → El sistema busca en todos los clientes del partner
   → Si existe: muestra ficha completa del cliente
   → Si no existe: "No encontramos un cliente con ese dato. ¿Deseas registrarlo?"

3. SR accede al detalle de cualquier cliente del partner
   → Ve datos básicos del cliente
   → Ve historial de solicitudes de crédito y sus estados
   → Ve historial de préstamos y sus estados
   → Puede montar pedido si el cliente tiene cupo activo
```

---

## Lista de clientes propios

| Columna | Detalle |
|---|---|
| Nombre | Nombre completo o razón social |
| Documento | Número de identificación |
| Estado solicitud | Badge con estado actual |
| Cupo disponible | Solo visible si tiene línea de crédito activa |
| Acción | "Ver detalle" / "Montar pedido" (si aplica) / Botón WhatsApp (abre chat directo con el cliente) |

**Orden por defecto:** últimos registrados primero.

---

## Detalle del cliente

### Solicitudes de crédito
| Estado (`CreditApplicationStatus`) | Etiqueta visible |
|---|---|
| `pending_authorization` | Pendiente de autorización |
| `under_review` | En evaluación |
| `approved_pending_signature` ⚠️ | Firmando contrato |
| `approved_signed` ⚠️ | Activo |
| `rejected` | Rechazado |
| `sarlaft_match` / `experian_query_error` / `ai_agent_error` | Bloqueado |

> ⚠️ Los estados `approved_pending_signature` y `approved_signed` están pendientes de agregar al enum (Lorena ítem 5 y 8).

### Préstamos
| Estado interno | Etiqueta visible |
|---|---|
| `pending_client_approval` | Aprobación del cliente pendiente |
| `pending_partner_approval` | Confirmación de entrega pendiente |
| `active` | Activo |
| `paid` | Pagado |
| `overdue` | En mora |
| `rejected` / `cancelled` | Rechazado / Cancelado |

---

## Criterios de Aceptación

```gherkin
Scenario: Lista propia
  Given un SR autenticado
  When accede a "Mis clientes"
  Then ve solo los clientes con sales_rep_id = el suyo

Scenario: Búsqueda de cliente de otro SR
  Given un SR busca por dato exacto un cliente del partner asignado a otro SR
  Then ve la ficha completa del cliente
  And puede montar un pedido si el cliente tiene cupo activo

Scenario: Búsqueda sin resultado
  Given un dato que no corresponde a ningún cliente del partner
  Then ve el mensaje "No encontramos un cliente con ese dato"
  And se le ofrece registrarlo

Scenario: Aislamiento por partner
  Given un dato que corresponde a un cliente de un partner diferente
  Then no aparece en los resultados

Scenario: Detalle con historial
  Given un SR accede al detalle de cualquier cliente del partner
  Then ve sus solicitudes de crédito con estados
  And ve sus préstamos con estados
```

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-SR01 | SR debe estar autenticado |
| HU-SR02 | Registro de nuevo cliente desde esta vista |
| HU-SR03 | Montar pedido desde el detalle del cliente |
