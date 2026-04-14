# HU-SR06 — Dashboard · Portal Sales Reps

**Épica:** epic-04-portal-sales-reps  
**Actor:** Sales Representative (SR) autenticado  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Sales Rep autenticado en el portal,  
**quiero** ver un resumen de mi cartera al entrar al portal,  
**para** identificar rápidamente oportunidades de venta y clientes 
que necesitan atención por mora.

---

## Diseño del Dashboard

El dashboard se organiza en tres bloques en orden de urgencia/acción:

---

### Bloque 1 — Resumen (siempre visible, parte superior)

| Métrica | Descripción |
|---|---|
| Clientes activos | Total de clientes con línea de crédito activa |
| Préstamos activos | Total de préstamos en curso |
| Préstamos en mora | Total de préstamos vencidos — en rojo si > 0 |
| Total cupo disponible | Suma de cupo disponible de todos sus clientes activos |

> El total de cupo disponible es el indicador de oportunidad de venta: 
> cupo disponible = venta potencial.

---

### Bloque 2 — Alertas de cartera (foco en cobranza)

**"Préstamos tarde"**
- Lista de clientes con préstamos vencidos
- Por cada cliente: nombre, No. pedido, balance, días de mora
- Botón WhatsApp directo al cliente
- Orden: más días de mora primero

**"Vencen en los próximos 7 días"**
- Lista de clientes con préstamos que vencen en los próximos 7 días
- Por cada cliente: nombre, No. pedido, balance, fecha de vencimiento
- Botón WhatsApp directo al cliente
- Orden: fecha de vencimiento más próxima primero

> Estos dos paneles son la herramienta de cobranza del SR — 
> si están vacíos se muestra un mensaje positivo.

---

### Bloque 3 — Oportunidades de venta

**"Clientes con cupo disponible"**
- Lista de clientes activos con cupo disponible > 0
- Por cada cliente: nombre, cupo total, cupo disponible
- Botón "Montar pedido" directo
- Orden: mayor cupo disponible primero

**"Clientes en registro"**
- Lista de clientes en proceso de vinculación con su estado actual
- Por cada cliente: nombre, estado del proceso
- Sin acción disponible (solo seguimiento)

---

## Acciones rápidas (botones fijos)

| Acción | Destino |
|---|---|
| + Registrar cliente | HU-SR02 |
| + Montar pedido | HU-SR03 |

---

## Criterios de Aceptación

```gherkin
Scenario: Resumen al entrar
  Given un SR autenticado
  When accede al dashboard
  Then ve el resumen con sus 4 métricas actualizadas en tiempo real

Scenario: Sin mora
  Given un SR sin préstamos vencidos
  Then el bloque "Préstamos tarde" muestra mensaje positivo
  And el contador de mora en el resumen aparece en verde

Scenario: Con mora
  Given un SR con al menos un préstamo vencido
  Then el contador de mora aparece en rojo
  And el bloque "Préstamos tarde" lista los clientes con días de mora
  And cada cliente tiene botón de WhatsApp

Scenario: Cupo disponible
  Given un SR con clientes activos
  Then el bloque de oportunidades lista los clientes ordenados 
  por mayor cupo disponible
  And cada cliente tiene botón "Montar pedido"

Scenario: Datos solo del SR
  Given el SR está en el dashboard
  Then todas las métricas y listas corresponden únicamente 
  a sus clientes asignados
```

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-SR01 | SR debe estar autenticado |
| HU-SR02 | Acceso rápido a registro de cliente |
| HU-SR03 | Acceso rápido a montar pedido |
| HU-SR04 | Vista completa de clientes desde el dashboard |
| HU-SR05 | Vista completa de órdenes desde el dashboard |
