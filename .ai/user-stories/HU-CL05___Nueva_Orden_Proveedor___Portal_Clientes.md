# HU-CL05 — Nueva Orden con Proveedor · Portal Clientes

**Épica:** epic-05-portal-clientes  
**Actor:** Cliente autenticado con LOC activa  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** cliente autenticado en el portal,  
**quiero** solicitar financiamiento para pagarle a un proveedor,  
**para** que Platam le transfiera el dinero directamente y yo lo 
pague después con mi línea de crédito.

---

## Contexto

Esta HU es la interfaz del portal cliente para el flujo definido 
en **HU-C03** (Solicitud de Préstamo BNPL con Proveedor). Toda la 
lógica de negocio, almacenamiento, cálculos y notificaciones están 
especificados allí. Esta historia cubre el diseño de experiencia 
dentro del portal.

El cliente llega a este flujo desde:
- Botón "+ Nueva orden con proveedor" en el dashboard (HU-CL02)
- Menú de navegación principal del portal

**Condición de acceso:** el cliente debe tener `available_loc > 0`. 
Si su cupo es $0 (bloqueado por mora u otra razón), el botón está 
visible pero al intentar acceder se muestra una pantalla bloqueante 
explicando la situación.

---

## Flujo — Wizard 4 pasos

### Paso 1 — ¿A quién le pagamos?

El cliente selecciona o registra el proveedor al que Platam 
le va a transferir el dinero.

**Proveedores previos:**  
Lista de proveedores ya registrados por el cliente, ordenados 
por uso más reciente. Cada ítem muestra: nombre, NIT, banco 
(últimos 4 dígitos). Búsqueda por nombre o NIT.

**Proveedor nuevo:**  
Botón "+ Registrar nuevo proveedor" que expande un formulario inline:

| Campo | Requerido | Notas |
|---|---|---|
| Nombre o razón social | Sí | |
| NIT | Sí | Validar unicidad |
| Banco | Sí | Dropdown bancos Colombia |
| Tipo de cuenta | Sí | Ahorros / Corriente |
| Número de cuenta | Sí | |
| Certificación bancaria | No (recomendado) | PDF, máx. 10 MB. Advertencia si no se sube |

> La certificación bancaria no bloquea el avance — Platam la 
> valida en la revisión. Se muestra advertencia informativa si 
> no se adjunta.

**Validación para continuar:** proveedor seleccionado con cuenta bancaria registrada.

---

### Paso 2 — Documentos y plan de pago

**Documentos:**

| Campo | Requerido | Notas |
|---|---|---|
| Orden de compra | Sí | PDF, máx. 10 MB. Múltiples archivos permitidos |
| Factura del proveedor | Sí | PDF o imagen, máx. 10 MB |
| Monto a financiar | Sí | COP. Debe ser ≤ `available_loc` |
| Fecha de vencimiento de la factura | Sí | Referencia documental |
| Referencia interna | No | Para uso propio del cliente |

**Plan de pago:**

Planes disponibles agrupados en dos tabs: **"Pago único"** y **"En cuotas"**.

Cada plan se muestra como una card con:
- Plazo (ej. "30 días" / "6 meses")
- Tasa EA
- Costo estimado en pesos según el monto ingresado

Al seleccionar un plan se activa el resumen de crédito en tiempo real:

**Pago único (Bullet):**

| Etiqueta | Valor |
|---|---|
| Monto financiado | `requested_amount` |
| Tasa de interés | EA |
| Intereses estimados | `requested_amount × ((1 + EA)^(days/365) - 1)` |
| **Total a pagar al vencimiento** | Monto + intereses |
| Fecha estimada de vencimiento | Hoy + `term_days` (referencial) |

**En cuotas:**

| Etiqueta | Valor |
|---|---|
| Monto financiado | `requested_amount` |
| Tasa de interés | EA |
| Número de cuotas | `installment_count` |
| Frecuencia | Mensual / Quincenal / Semanal |
| **Cuota estimada** | Calculada con fórmula de HU-C02 |
| **Total estimado a pagar** | Suma de todas las cuotas |

> Todos los valores son estimados. El plan definitivo se genera 
> con la fecha real de desembolso (HU-C04). Esto debe ser 
> visible e inequívoco en la UI.

**Validación para continuar:** OC + factura subidos + monto > 0 + plan seleccionado + `monto ≤ available_loc`.

---

### Paso 3 — Confirmar solicitud

Resumen completo antes de enviar. Todo visible, sin colapsar:

| Campo | Valor |
|---|---|
| Proveedor | Nombre + NIT |
| Banco destino | Entidad + últimos 4 dígitos de cuenta |
| Monto a financiar | COP formateado |
| Plan seleccionado | "Pago único — 30 días" / "6 cuotas mensuales" |
| Tasa de interés | EA |
| Intereses estimados | COP |
| **Total estimado a pagar** | COP |
| Cupo que se reserva ahora | `requested_amount` |
| Cupo disponible tras solicitud | `available_loc - requested_amount` |

Aviso visible:
> ⚠️ Platam revisará los documentos antes de transferirle al 
> proveedor. El proceso toma máximo 1 día hábil. Tu cupo se 
> reserva al enviar y se libera si la solicitud es rechazada.

Botón principal: **"Enviar solicitud"**

---

### Paso 4 — Solicitud enviada

> ✓ **¡Solicitud enviada!**
>
> Recibimos tu solicitud de pago a **[nombre proveedor]** por 
> **[monto]**. Nuestro equipo revisará los documentos y realizará 
> la transferencia en máximo 1 día hábil.
>
> Referencia: **[order_reference]**

Timeline de próximos pasos:
- ✓ Hoy — Solicitud recibida. Documentos en revisión.
- ○ Máx. 1 día hábil — Transferencia al proveedor confirmada.
- ○ Vencimiento — Pago de tu cuota o saldo total.

Botones: **"Nueva solicitud"** · **"Ver mis préstamos"** (→ HU-CL03)

---

## Estado de cupo insuficiente

Si el cliente tiene `available_loc = 0` al intentar acceder al flujo:

> **Tu cupo no está disponible en este momento.**
>
> [Motivo según caso:]
> - "Tienes pagos vencidos. Regulariza tu situación para volver a usar tu línea."
> - "Tu cupo está completamente utilizado."
>
> ¿Tienes dudas? [Escríbenos] → WhatsApp soporte

---

## Criterios de Aceptación

Ver criterios completos en **HU-C03**. Criterios adicionales 
de experiencia en el portal:

```gherkin
Scenario: Acceso con cupo disponible
  Given un cliente con available_loc > 0
  When accede al flujo de nueva orden
  Then puede iniciar el wizard sin restricciones

Scenario: Acceso sin cupo
  Given un cliente con available_loc = 0
  When intenta acceder al flujo
  Then ve la pantalla de cupo no disponible con el motivo
  And no puede iniciar el wizard

Scenario: Proveedor nuevo sin certificación bancaria
  Given un cliente registrando un proveedor nuevo sin subir certificación
  When intenta continuar al paso 2
  Then ve una advertencia informativa
  And puede continuar sin bloqueo

Scenario: Resumen en tiempo real
  Given el cliente seleccionó un plan e ingresó el monto
  When cambia el monto o el plan
  Then el resumen de crédito se actualiza inmediatamente en pantalla

Scenario: Monto supera cupo disponible
  Given el cliente ingresa un monto mayor a available_loc
  When intenta continuar al paso 3
  Then ve el error "El monto supera tu cupo disponible ($X)"
  And no puede avanzar
```

---

## Impacto en Schema

Sin cambios adicionales al portal. Ver notas de schema en **HU-C03**.

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-CL01 | Requiere sesión activa |
| HU-CL02 | Dashboard tiene el acceso rápido a este flujo |
| HU-C03 | Lógica de negocio, almacenamiento y notificaciones completas |
| HU-C11 | Validación de cupo disponible en tiempo real |
