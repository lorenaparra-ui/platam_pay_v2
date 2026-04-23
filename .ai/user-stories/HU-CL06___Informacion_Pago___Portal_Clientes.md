# HU-CL06 — Información de Pago · Portal Clientes

**Épica:** epic-05-portal-clientes  
**Actor:** Cliente autenticado con préstamos activos  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** cliente autenticado en el portal,  
**quiero** ver claramente cuánto debo pagar, cuándo, y cómo hacerlo,  
**para** pagar a tiempo sin necesitar contactar a nadie.

---

## Contexto

Esta vista centraliza toda la información necesaria para que el 
cliente realice su pago. Aplica a cualquier préstamo activo 
(`active`, `late`, `default`).

El cliente puede llegar desde:
- Botón "Ver instrucciones de pago" en el dashboard (bloque 3)
- Botón "Ver instrucciones de pago" en el detalle de préstamo (HU-CL03)
- Acción rápida "Información de pago" en el menú principal

---

## Diseño de la vista

La vista tiene dos secciones principales: **¿Cuánto pagar?** y 
**¿Cómo pagar?** Ambas siempre visibles, sin colapsar.

---

### Sección 1 — ¿Cuánto pagar?

Si el cliente tiene **un solo préstamo activo**, se muestra 
directamente el detalle de ese préstamo.

Si tiene **múltiples préstamos activos**, se muestra primero un 
resumen consolidado y luego el detalle por préstamo.

#### Resumen consolidado (solo si hay más de un préstamo)

| Campo | Valor |
|---|---|
| Total a pagar hoy | Suma de saldos de todos los préstamos activos |
| De los cuales en mora | Suma de capital vencido + mora (si aplica) — en rojo |

#### Detalle por préstamo

Por cada préstamo activo, ordenado por urgencia (en mora primero, 
luego por fecha de vencimiento más próxima):

| Campo | Fuente | Notas |
|---|---|---|
| Logo del partner / proveedor | `partners.logo_url` / `suppliers.name` | |
| Referencia | `loan_requests.order_reference` | |
| Estado | Badge: Activo / En mora / Vencido | En mora en rojo |
| Capital pendiente | `balance_principal_current + balance_principal_overdue` | |
| Interés corriente | `balance_interest_current + balance_interest_overdue` | Siempre visible |
| Interés de mora | `balance_interest_mora` | Siempre visible — $0 si no aplica |
| Fee de desembolso | `balance_fees` | Siempre visible — $0 si no aplica |
| IVA sobre fee | `balance_iva` | Siempre visible — $0 si no aplica |
| **Total a pagar** | `outstanding_balance` | Destacado visualmente |
| Próximo vencimiento | Fecha de cuota o fecha bullet | En rojo si ya venció |

> El desglose completo es siempre visible — transparencia total.

---

### Sección 2 — ¿Cómo pagar?

Dos opciones de pago presentadas en tabs o cards:

#### Opción A — Pagar en línea (Payvalida)

El cliente puede generar un link de pago Payvalida en tres variantes:

| Botón | Monto del link | Visible cuando |
|---|---|---|
| **"Pagar todo"** | `outstanding_balance` de todos los préstamos activos | Siempre (si hay deuda) |
| **"Pagar solo lo vencido"** | Suma de `balance_principal_overdue + balance_interest_overdue + balance_interest_mora` de todos los préstamos | Solo si hay mora |
| **"Pagar préstamo específico"** | `outstanding_balance` del préstamo seleccionado | Al ver detalle de un préstamo individual |

Adicionalmente, campo de **monto libre**:

> *¿Quieres pagar otro monto?*  
> Campo numérico (COP) + botón **"Generar link"**

**Mecánica de generación del link:**

```
1. Cliente selecciona variante o ingresa monto libre
2. Frontend llama al backend: POST /payments/link
   Body: { credit_facility_id, amount }
3. Backend llama a Payvalida con los datos del cliente y el monto
4. Payvalida retorna checkout URL
5. Frontend redirige al cliente al link
6. TTL del link: 48 horas
```

> ℹ️ *El link abre en una ventana nueva. El pago puede tomar unos minutos en reflejarse en el portal.*

**Nota de implementación:** Este endpoint reemplaza el webhook de Make.com 
actual (`pp_pv_create_payment_link`). La lógica es idéntica — cambia solo 
el orquestador (NestJS en lugar de Make.com). El payload a Payvalida 
sigue siendo `{ cl_id, amount }` y la respuesta `{ payment_link: url }`.

#### Opción B — Transferencia o consignación

Datos bancarios de Platam para pago manual:

| Campo | Valor |
|---|---|
| Banco | [Banco de Platam — a definir] |
| Tipo de cuenta | [Tipo — a definir] |
| Número de cuenta | [Número — a definir] |
| NIT | [NIT Platam Colombia S.A.S. — a definir] |
| Beneficiario | Platam Colombia S.A.S. |
| Referencia de pago | `users.external_id` (UUID del cliente) |

> ⚠️ **Importante:** incluye siempre tu referencia de pago en la 
> transferencia para que podamos identificarla y aplicarla automáticamente. 
> Sin referencia el pago puede tomar más tiempo en procesarse.

Botón: **"Copiar referencia"** — copia el UUID al portapapeles.

> Los datos bancarios de Platam se parametrizan en `global_params` 
> (HU-C09) — nunca hardcodeados en el frontend.

---

### Sección 3 — Soporte

Al pie de la vista, siempre visible:

> ¿Tienes preguntas sobre tu pago? 
> [Escríbenos por WhatsApp] — abre chat de soporte directo

---

## Estado — Sin préstamos activos

Si el cliente no tiene préstamos activos al acceder a esta vista:

> *"No tienes pagos pendientes en este momento. ¡Todo al día! ✓"*

---

## Criterios de Aceptación

```gherkin
Scenario: Cliente con un préstamo activo
  Given un cliente con un préstamo en estado active
  When accede a información de pago
  Then ve el desglose completo del saldo de ese préstamo
  And ve las dos opciones de pago (Payvalida y transferencia)
  And el desglose muestra $0 en las líneas que no aplican

Scenario: Cliente con múltiples préstamos activos
  Given un cliente con más de un préstamo activo
  When accede a información de pago
  Then ve el total consolidado primero
  And ve el detalle de cada préstamo ordenado por urgencia

Scenario: Cliente con préstamos en mora
  Given un cliente con al menos un préstamo en mora
  When accede a información de pago
  Then el préstamo en mora aparece primero
  And el interés de mora es visible con valor > $0
  And el badge de estado es rojo

Scenario: Pago en línea
  Given un cliente con préstamos activos
  When hace clic en "Pagar ahora"
  Then el sistema genera un link Payvalida con el monto total adeudado
  And el cliente es redirigido al flujo de pago

Scenario: Copiar referencia
  Given el cliente ve los datos de transferencia
  When hace clic en "Copiar referencia"
  Then el UUID del cliente queda copiado al portapapeles
  And el botón muestra confirmación visual breve ("¡Copiado!")

Scenario: Sin préstamos activos
  Given un cliente sin préstamos en estado active, late o default
  When accede a información de pago
  Then ve el mensaje de estado vacío positivo
```

---

## Nota sobre datos bancarios

Los datos de la cuenta bancaria de Platam (banco, tipo, número, NIT) 
se definen como parámetros de configuración en `global_params` 
(HU-C09) y se consumen desde el backend — nunca hardcodeados en el 
frontend. Esto permite actualizarlos sin deploys.

---

## Impacto en Schema

Sin cambios de schema requeridos. Se añade una nota a HU-C09 para 
incluir los datos bancarios de Platam en `global_params`.

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-CL01 | Requiere sesión activa |
| HU-CL02 | Dashboard enlaza a esta vista |
| HU-CL03 | Detalle de préstamo enlaza a esta vista |
| HU-C08 | Lógica de aplicación de pagos — FIFO y waterfall |
| HU-C09 | Parámetros globales — incluye datos bancarios de Platam |
| HU-C11 | Cálculo de outstanding_balance por préstamo |
