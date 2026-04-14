# HU-SR03 — Montar Pedido · Portal Sales Reps

**Épica:** epic-04-portal-sales-reps  
**Actor:** Sales Representative (SR) autenticado  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal,  
**quiero** crear una solicitud de préstamo para un cliente con cupo activo,  
**para** financiar su compra a través de Platam.

---

## Flujo

```
1. SR hace clic en "Montar pedido"
   (desde dashboard o desde el detalle de un cliente)

2. SR busca el cliente
   → Por número de documento, nombre o celular
   → El sistema busca en todos los clientes del partner

3. El resultado de búsqueda muestra el cliente con su estado
   → Si el cliente puede recibir un pedido: permite continuar
   → Si el cliente NO puede recibir un pedido: muestra el motivo 
     (ver tabla de estados bloqueantes abajo) — no permite continuar

4. SR selecciona el cliente (solo si puede recibir pedido)
   → El sistema muestra las categorías activas del cliente

5. SR selecciona la categoría del pedido
   → Cada categoría tiene configurado el tipo de producto (bullet o cuotas)
   → El producto se resuelve automáticamente desde la categoría

6. Según el producto resuelto:
   → Bullet  → flujo HU-C01
   → Cuotas  → flujo HU-C02

7. Al completar, el SR regresa al portal
```

---

## Estados del cliente en búsqueda

| Estado | Puede recibir pedido | Mensaje al SR |
|---|---|---|
| Cupo activo | ✅ Sí | — |
| Pendiente autorización antecedentes | ❌ No | "El cliente aún no ha autorizado la consulta de antecedentes" |
| En estudio de crédito | ❌ No | "El cliente está en proceso de evaluación crediticia" |
| Firmando contrato | ❌ No | "El cliente está firmando su contrato" |
| Sin categoría habilitada | ❌ No | "Este cliente no tiene categorías habilitadas para pedidos" |
| Cupo insuficiente para el monto | ❌ No | "El cliente no tiene cupo disponible para este pedido" |
| Rechazado | ❌ No | "El cliente fue rechazado en el proceso de vinculación" |
| Bloqueado | ❌ No | "El cliente está bloqueado. Contacta a tu coordinador" |
| No existe en el partner | ❌ No | "No encontramos un cliente con ese dato. ¿Deseas registrarlo?" |

---

## Criterios de Aceptación

```gherkin
Scenario: Cliente con cupo y una sola categoría activa
  Given un cliente con línea de crédito activa y una categoría
  When el SR lo selecciona
  Then el sistema entra directamente al flujo del producto de esa categoría

Scenario: Cliente con múltiples categorías activas
  Given un cliente con más de una categoría activa
  When el SR lo selecciona
  Then el SR debe elegir la categoría antes de continuar

Scenario: Cliente sin cupo
  Given un cliente registrado pero sin línea de crédito activa
  When el SR lo busca
  Then no aparece en los resultados de búsqueda de pedidos

Scenario: partner_id y sales_rep_id
  Given cualquier pedido creado desde el portal
  Then ambos valores se resuelven desde la sesión
  And no son campos visibles para el SR
```

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-SR01 | SR debe estar autenticado |
| HU-C01 | Flujo de pedido bullet |
| HU-C02 | Flujo de pedido en cuotas |
| HU-C11 | Línea de crédito activa del cliente (LOC) |
