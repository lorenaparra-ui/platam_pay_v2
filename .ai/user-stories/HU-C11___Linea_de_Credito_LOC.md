# HU-C11 — Línea de Crédito (LOC) · Cálculo y Gestión de Cupo

**Épica:** epic-03-core-financiero  
**Tipo:** Lógica backend transversal  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** sistema,  
**quiero** calcular el cupo disponible de cada cliente en tiempo 
real y bloquearlo o liberarlo según los eventos del ciclo de vida 
de solicitudes y préstamos,  
**para** garantizar que nunca se exceda el límite aprobado.

---

## Contexto

El cupo disponible (`available_loc`) es una vista calculada — 
no se almacena como campo en la base de datos sino que se 
computa en el momento en que se necesita. Se consulta en:

- Validación al crear una solicitud (C01, C02, C03)
- Vista del cliente en portal web
- Vista del backoffice al revisar un cliente
- Vista del SR al buscar un cliente

---

## Fórmula

```sql
available_loc = credit_facilities.total_limit

  -- Solicitudes que bloquean cupo
  - SUM(lr.requested_amount - lr.initial_payment_amount
        FROM loan_requests lr
        WHERE lr.credit_facility_id = cf.id
        AND lr.status = 'pending_initial_payment')

  - SUM(lr.requested_amount
        FROM loan_requests lr
        WHERE lr.credit_facility_id = cf.id
        AND lr.status = 'pending_partner_approval')

  - SUM(lr.requested_amount
        FROM loan_requests lr
        WHERE lr.credit_facility_id = cf.id
        AND lr.status = 'pending_platam_review')

  -- Préstamos activos (solo principal)
  - SUM(l.balance_principal_current + l.balance_principal_overdue
        FROM loans l
        WHERE l.credit_facility_id = cf.id
        AND l.status NOT IN ('paid', 'cancelled'))
```

> Las moras, intereses y fees **no** bloquean cupo. 
> El cupo representa capacidad de endeudamiento en capital, 
> no deuda total.

---

## Tabla de eventos y efecto en LOC

| Evento | Estado resultante | Efecto en LOC |
|---|---|---|
| SR/API crea solicitud bullet o cuotas sin cuota inicial | `pending_client_approval` | Sin efecto |
| Cliente aprueba solicitud sin cuota inicial | `pending_partner_approval` | Bloquea `requested_amount` |
| SR/API crea solicitud cuotas con cuota inicial | `pending_client_approval` | Sin efecto |
| Cliente aprueba solicitud con cuota inicial | `pending_initial_payment` | Bloquea `requested_amount - initial_payment_amount` |
| Cliente paga cuota inicial | `pending_partner_approval` | Bloquea `requested_amount` (reemplaza bloqueo anterior) |
| Cliente crea solicitud proveedor | `pending_platam_review` | Bloquea `requested_amount` |
| Partner confirma entrega | `approved` → préstamo creado | Bloqueo `loan_request` se libera, préstamo toma el relevo por `balance_principal_current` |
| Platam desembolsa a proveedor | préstamo creado `active` | Bloqueo `loan_request` se libera, préstamo toma el relevo |
| Cliente rechaza solicitud | `rejected` | Libera cupo |
| Partner rechaza solicitud | `rejected` | Libera cupo |
| Platam rechaza solicitud | `rejected` | Libera cupo |
| Solicitud cancelada (link vencido, SR cancela) | `cancelled` | Libera cupo |
| Cliente realiza pago | — | Cupo se libera proporcionalmente al capital pagado |
| Préstamo pagado completo | `paid` | Libera cupo por saldo completo |
| Préstamo cancelado (devolución total) | `cancelled` | Libera cupo por saldo completo |

---

## Casos especiales

### Confirmed amount difiere del requested amount

Cuando el partner confirma la entrega con un monto menor 
(`confirmed_amount < requested_amount`), el préstamo se 
activa por el `confirmed_amount`. La diferencia se libera 
automáticamente al cambiar el status de `loan_request` a `approved`.

```
cupo liberado = requested_amount - confirmed_amount
```

### Confirmed amount mayor al requested amount

El partner puede confirmar hasta un 10% más que el pedido 
original (`max_invoice_diff_pct` de HU-C09). En este caso 
el préstamo se activa por el `confirmed_amount` aunque supere 
el `requested_amount`. El cupo puede quedar temporalmente en negativo.

> Esta es una decisión de negocio — si el cliente ya recibió 
> el pedido no se puede rechazar el préstamo. El equipo de 
> operaciones debe monitorear clientes con LOC negativa.

### Cliente bloqueado por mora (épica de cobranza)

La lógica de bloqueo por mora (día 7 alto riesgo / día 15 
bajo-moderado) se implementa en la épica de cobranza como 
una capa adicional sobre el cálculo del LOC. Cuando un cliente 
está bloqueado por mora, `available_loc` se reporta como 0 
independientemente del cálculo.

---

## Presentación del cupo al usuario

### Portal cliente y backoffice

| Elemento | Descripción |
|---|---|
| Cupo total | `credit_facilities.total_limit` |
| Cupo utilizado | `total_limit - available_loc` |
| Cupo disponible | `available_loc` |
| Barra de progreso | `(cupo_utilizado / total_limit) × 100%` |

### SR al buscar cliente (HU-C01, C02)

El cupo disponible se muestra en pantalla inmediatamente 
después de que el cliente pasa las validaciones del Paso 1, 
antes de que el SR ingrese el monto del pedido.

### Validación al ingresar monto

Si `requested_amount > available_loc`:

- **Canal SR:** mensaje en pantalla: *"El cliente no tiene 
  cupo suficiente. Cupo disponible: $X"*
- **Canal API:** HTTP 422 con `available_loc` en el body

> **Excepción:** confirmación de entrega del partner — si el 
> `confirmed_amount` supera el `available_loc` se permite 
> continuar porque el cliente ya recibió el pedido (HU-C05).

---

## Criterios de Aceptación

- [ ] `available_loc` se calcula en runtime — no se almacena 
      como campo persistente
- [ ] La fórmula incluye los cuatro sumandos definidos: 
      `pending_initial_payment` (neto), `pending_partner_approval`, 
      `pending_platam_review` y préstamos activos por principal
- [ ] `pending_initial_payment` bloquea solo 
      `requested_amount - initial_payment_amount`
- [ ] Al pagar la cuota inicial el bloqueo se actualiza a 
      `requested_amount` completo
- [ ] Las moras, intereses y fees no afectan el cálculo del LOC
- [ ] El cupo se libera inmediatamente al rechazar o cancelar 
      una solicitud
- [ ] Si `confirmed_amount < requested_amount` el cupo excedente 
      se libera al activar el préstamo
- [ ] El SR ve el cupo disponible antes de ingresar el monto 
      del pedido
- [ ] La validación de cupo al ingresar el monto retorna 
      el cupo disponible en el mensaje de error
- [ ] El portal cliente muestra cupo total, utilizado y disponible 
      con barra de progreso
- [ ] Clientes bloqueados por mora reportan `available_loc = 0` 
      (implementado en épica de cobranza)

---

## Nota de implementación

El cálculo del LOC se ejecuta frecuentemente — al menos una 
vez por cada solicitud nueva y cada vez que un cliente consulta 
su cupo. Se recomienda implementar como una **función PostgreSQL** 
o **vista materializada** con invalidación por evento para 
evitar recalcular desde cero en cada consulta.
