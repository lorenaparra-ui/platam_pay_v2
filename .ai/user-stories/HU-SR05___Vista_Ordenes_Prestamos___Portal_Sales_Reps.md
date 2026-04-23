# HU-SR05 — Vista de Órdenes y Préstamos · Portal Sales Reps

**Épica:** epic-04-portal-sales-reps  
**Actor:** Sales Representative (SR) autenticado  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal,  
**quiero** ver todas las órdenes y préstamos de los clientes del partner,  
**para** hacer seguimiento al estado de cada operación y actuar 
cuando sea necesario.

---

## Flujo

```
1. SR accede a "Órdenes y préstamos"
   → Ve el listado de todas las solicitudes de préstamo y 
     préstamos activos del partner
   → Puede filtrar por: estado, tipo (bullet / cuotas), fecha
   → Puede buscar por nombre del cliente o número de documento

2. SR accede al detalle de una solicitud de préstamo
   → Ve los datos de la solicitud (cliente, monto, categoría, fecha)
   → Ve el estado actual y el siguiente paso esperado
   → Si está en pending_client_approval: puede reenviar la 
     notificación al cliente

3. SR accede al detalle de un préstamo activo
   → Ve el plan de pagos y el estado de cada cuota
   → Ve si hay cuotas vencidas o en mora
```

---

## Lista de órdenes y préstamos

| Columna | Detalle |
|---|---|
| Cliente | Nombre completo o razón social |
| Tipo | Bullet / Cuotas |
| Monto | Monto solicitado / desembolsado |
| Estado | Badge con estado actual |
| Fecha | Fecha de creación |
| Acción | "Ver detalle" |

**Orden por defecto:** más recientes primero.

---

## Estados de solicitudes de préstamo

| Estado interno | Etiqueta visible |
|---|---|
| `pending_client_approval` | Aprobación del cliente pendiente |
| `pending_partner_approval` | Confirmación de entrega pendiente |
| `approved` | Aprobada |
| `rejected` | Rechazada |
| `cancelled` | Cancelada |

## Estados de préstamos

| Estado interno | Etiqueta visible |
|---|---|
| `active` | Activo |
| `paid` | Pagado |
| `overdue` | En mora |
| `cancelled` | Cancelado |

---

## Criterios de Aceptación

```gherkin
Scenario: Visibilidad del partner
  Given un SR autenticado
  When accede a "Órdenes y préstamos"
  Then ve todas las solicitudes y préstamos de clientes del partner
  And no ve operaciones de otros partners

Scenario: Filtros
  Given el SR está en la vista de órdenes
  When aplica un filtro por estado o fecha
  Then la lista se actualiza mostrando solo los registros que aplican

Scenario: Reenvío de notificación
  Given una solicitud en estado pending_client_approval
  When el SR accede al detalle
  Then tiene la opción de reenviar la notificación al cliente

Scenario: Detalle de préstamo activo
  Given un préstamo en estado active
  When el SR accede al detalle
  Then ve el plan de pagos con el estado de cada cuota
```

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-SR01 | SR debe estar autenticado |
| HU-C01 | Solicitudes bullet |
| HU-C02 | Solicitudes en cuotas |
| HU-C04 | Activación y plan de pagos |
