# HU-B08-PJ — Decisión de Solicitud · Persona Jurídica (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin, Analista  
**Tipo de cliente:** Persona Jurídica (PJ)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Analista o Admin del backoffice de Platam,  
**quiero** aprobar o rechazar una solicitud de crédito PJ en
`under_review`, configurar los firmantes del contrato y que el
sistema gestione automáticamente la generación, firma y activación,  
**para** activar la línea de crédito de la empresa o cerrar el
proceso de forma ordenada.

---

## Contexto

Esta historia cubre desde la decisión del analista hasta la
activación de la línea de crédito. A diferencia de PN, las
solicitudes PJ pueden requerir codeudores adicionales (accionistas),
lo que determina cuál plantilla de ZapSign se usa y cuántos
firmantes participan en el proceso.

> **RUES:** el agente AI realiza scraping a RUES para verificar
> las atribuciones del rep. legal y su capacidad de tomar crédito.
> Este análisis se visualiza directamente en el iframe del tab
> Análisis AI — no requiere almacenamiento adicional en el schema.

---

## Casos de Uso de Firma

El analista define en el modal de aprobación si se requieren
codeudores. Los codeudores siempre son accionistas ya registrados
en el sistema.

| Caso | Firmantes | Plantilla ZapSign |
|---|---|---|
| 1 — Rep. legal firma, sin codeudor | Rep. legal | **Template A** (1 firmante) |
| 2 — Rep. legal firma y es codeudor | Rep. legal | **Template A** (1 firmante) |
| 3 — Rep. legal + 1 codeudor | Rep. legal + Codeudor 1 | **Template B** (2 firmantes) |
| 4 — Rep. legal es codeudor + 1 codeudor adicional | Rep. legal + Codeudor 1 | **Template B** (2 firmantes) |
| 5 — Rep. legal + 2 codeudores | Rep. legal + Codeudor 1 + Codeudor 2 | **Template C** (3 firmantes) |

> ⚠️ **Plantillas pendientes:** para Platam Pay v2 se debe crear
> un nuevo documento base de contrato (basado en la estructura del
> contrato de cuotas para mayor flexibilidad) y 3 nuevas plantillas
> en ZapSign. Las plantillas del MVP son placeholders durante el
> desarrollo:
> - Template A (1 firmante): `0e77bddc-3189-48d2-ad47-f563e6fc1dc9`
> - Template B (2 firmantes): `a66b36b6-d3eb-4449-a57b-3b13c0c427d7`
> - Template C (3 firmantes): `b5a79769-eb9f-43d4-b357-feb636691255`

---

## Flujo General

```
Analista selecciona acción desde menú ⋮ en HU-B07-PJ
      │
      ├── Aprobar ────────────────────────────────────────────────────┐
      │                                                               ▼
      │                                Modal: LOC + selección de codeudores + emails
      │                                                               │
      │                                 Backend: seleccionar template → crear contrato
      │                                                               │
      │                                          status → approved_pending_signature ⚠️
      │                                                               │
      │                         Notificar rep. legal (WA + email) + SR (WA)
      │                         Notificar codeudores (email) si aplica
      │                                                               │
      │                                          ┌────────────────────┤
      │                                          │                    │
      │                                     24h sin firmas       48h sin firmas
      │                                  Recordatorios WA/email  Recordatorios WA/email
      │                                          │                    │
      │                                          └────────────────────┤
      │                                                               │
      │                          Webhook por firma individual → ignorar (status pending)
      │                          Webhook todos firmaron → status signed
      │                                                               │
      │                              Activar usuario + status → approved_signed ⚠️
      │                              Notificar rep. legal (WA + email) + SR (WA)
      │
      └── Rechazar ───────────────────────────────────────────────────┐
                                                                      ▼
                                                       Modal: confirmar rechazo
                                                                      │
                                                      status → rejected
                                                                      │
                                          Notificar rep. legal (WA + email) + SR (WA)
                                                      Google Chat notificación
```

---

## Acción: Aprobar

### 1 — Modal de confirmación

Al seleccionar "Aprobar" del menú ⋮ se abre un modal con:

**Sección — LOC:**

| Campo | Tipo | Regla |
|---|---|---|
| LOC aprobada | Numérico (COP) | Obligatorio. Pre-carga en orden: `approved_credit_line` (tab Estudio) → `agent_recommended_loc` → `requested_credit_line` |

**Sección — Codeudores (opcional):**

El analista puede agregar 0, 1 o 2 codeudores. Los codeudores se
seleccionan de la lista de accionistas ya registrados en `shareholders`.

| Campo | Tipo | Regla |
|---|---|---|
| Codeudor 1 | Dropdown de accionistas | Opcional |
| Email codeudor 1 | Email | Obligatorio si se selecciona codeudor 1. Pre-cargado si `persons.email` existe. |
| Codeudor 2 | Dropdown de accionistas | Opcional. Solo visible si se seleccionó codeudor 1. |
| Email codeudor 2 | Email | Obligatorio si se selecciona codeudor 2. |

> Si el email del codeudor se ingresa o modifica en este modal,
> se persiste en `persons.email` del accionista correspondiente.

**Confirmación:**

| Campo | Tipo |
|---|---|
| Checkbox | "Confirmo que he revisado la solicitud y apruebo la línea de crédito" |

Botones: **Confirmar aprobación** · Cancelar

---

### 2 — Proceso backend al confirmar

#### 2.1 Actualizar solicitud

```
credit_applications:
  status               → CreditApplicationStatus.APPROVED_PENDING_SIGNATURE ('approved_pending_signature') ⚠️
  approved_credit_line → LOC confirmada por el analista
  credit_study_date    → timestamp actual
  credit_decision      → 'approved'
```

#### 2.2 Seleccionar plantilla y crear contrato en ZapSign

La plantilla se determina por el número de codeudores seleccionados:

| Codeudores | Plantilla |
|---|---|
| 0 | Template A (1 firmante) |
| 1 | Template B (2 firmantes) |
| 2 | Template C (3 firmantes) |

**Variables de reemplazo comunes (todos los casos):**

| Variable en plantilla | Fuente | Tabla |
|---|---|---|
| `p_id` | `external_id` | `credit_applications` |
| `RAZÓN SOCIAL` | `legal_name` | `businesses` |
| `NIT` | `tax_id` | `businesses` |
| `DIRECCIÓN` | `business_address` | `businesses` |
| `NOMBRE COMPLETO` | `first_name + last_name` rep. legal | `persons` (via `legal_representatives`) |
| `TIPO DE DOCUMENTO` | `doc_type` rep. legal | `persons` |
| `NÚMERO DE DOCUMENTO` | `doc_number` rep. legal | `persons` |
| `CORREO ELECTRÓNICO` | `email` | `users` |
| `CELULAR` | `phone` | `persons` |

**Variables adicionales — Template B y C (Codeudor 1):**

| Variable en plantilla | Fuente | Tabla |
|---|---|---|
| `NOMBRE COMPLETO CODEUDOR` | `first_name + last_name` | `persons` del codeudor 1 |
| `TIPO DE DOCUMENTO CODEUDOR` | `doc_type` | `persons` |
| `NÚMERO DE DOCUMENTO CODEUDOR` | `doc_number` | `persons` |
| `CORREO ELECTRÓNICO CODEUDOR` | email ingresado en modal | `persons` |
| `CELULAR CODEUDOR` | `phone` (si existe) | `persons` |

**Variables adicionales — Template C (Codeudor 2):**

Mismo patrón que codeudor 1 con sufijo `CODEUDOR 2`.

**Firmantes registrados en ZapSign:**

ZapSign recibe un firmante por cada participante. El rep. legal
firma con verificación biométrica (igual que PN). Los codeudores
firman únicamente con su correo electrónico (no biometría).

#### 2.3 Guardar contrato en schema

```
contracts:
  user_id              → de la solicitud
  application_id       → ID de la solicitud
  zapsign_token        → token retornado por ZapSign
  state                → ContractCatalogStatus.PENDING ('pending')
  original_file_url    → URL del documento generado por ZapSign

-- Un registro por firmante (⚠️ Lorena ítem 9 — entidad contract_signers pendiente):
contract_signers (rep. legal):
  contract_id          → ID del contrato
  person_id            → person_id del rep. legal
  zapsign_signer_token → signer token ZapSign
  sign_url             → URL de firma ZapSign
  state                → ContractSignerState.PENDING ('pending') ⚠️ (Lorena ítem 9)

contract_signers (codeudor 1, si aplica):
  contract_id          → ID del contrato
  person_id            → person_id del codeudor 1
  zapsign_signer_token → signer token ZapSign
  sign_url             → URL de firma ZapSign (enviada por email)
  state                → ContractSignerState.PENDING ('pending') ⚠️ (Lorena ítem 9)

-- Ídem codeudor 2 si aplica
```

#### 2.4 Notificaciones post-aprobación

##### WhatsApp al rep. legal — Contrato listo para firmar

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
{{legal_rep_first_name}}, ¡felicidades! 🎉

Hemos aprobado la línea de crédito de {{legal_name}} con
Platam | {{partner.alias}} por ${{approved_credit_line}}.

Para activarla, firma el contrato digital aquí:
{{rep_sign_url}}

Ten tu documento de identidad a la mano para la verificación.
Una vez firmado por todos los participantes, recibirás
confirmación y podrán usar la línea de crédito.

¡Gracias por confiar en Platam!
```

**Variables:**

| Variable | Fuente | Tabla |
|---|---|---|
| `{{legal_rep_first_name}}` | `first_name` rep. legal | `persons` |
| `{{legal_name}}` | `legal_name` | `businesses` |
| `{{partner.alias}}` | `alias` | `partners` |
| `{{approved_credit_line}}` | `approved_credit_line` (COP) | `credit_applications` |
| `{{rep_sign_url}}` | `sign_url` del rep. legal | `contract_signers` ⚠️ (Lorena ítem 9) |

---

##### Email al rep. legal — Contrato listo para firmar

> ⚠️ Crear nueva plantilla de email.

**Asunto:** `¡La línea de crédito de {{legal_name}} ha sido aprobada!`

**Copy:**
```
Hola {{legal_rep_first_name}},

¡Felicidades! Hemos aprobado la línea de crédito de {{legal_name}}
con Platam | {{partner.alias}} por ${{approved_credit_line}}.

Para activarla, firma el contrato digital. Ten tu documento
de identidad a la mano para el proceso de verificación.

[FIRMAR CONTRATO] → {{rep_sign_url}}

Una vez firmado por todos los participantes, recibirás
confirmación y podrán comenzar a usar la línea de crédito.

El equipo de Platam
```

---

##### Email al codeudor — Invitación a firmar *(si aplica)*

> ⚠️ Crear nueva plantilla de email.
> Canal exclusivo para codeudores: **solo email**, no WhatsApp.

**Asunto:** `Tu firma es requerida — Contrato Platam | {{legal_name}}`

**Copy:**
```
Hola {{codeudor_first_name}},

Has sido incluido como codeudor solidario en el contrato de
línea de crédito de {{legal_name}} con Platam | {{partner.alias}}.

Tu firma es requerida para activar la línea de crédito.
Haz clic en el enlace para revisar y firmar el contrato:

[FIRMAR CONTRATO] → {{codeudor_sign_url}}

Si tienes dudas, comunícate con el representante legal de
{{legal_name}} o escríbenos a info@platam.co.

El equipo de Platam
```

**Variables:**

| Variable | Fuente |
|---|---|
| `{{codeudor_first_name}}` | `first_name` del codeudor |
| `{{legal_name}}` | `businesses.legal_name` |
| `{{partner.alias}}` | `partners.alias` |
| `{{codeudor_sign_url}}` | `sign_url` del codeudor en `contract_signers` ⚠️ (Lorena ítem 9) |

*(Repetir para codeudor 2 si aplica)*

---

##### WhatsApp al SR — Contrato enviado

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
Hola, la empresa {{legal_name}} de {{partner.alias}} ha sido
aprobada con una línea de crédito de ${{approved_credit_line}}.

Le hemos enviado el contrato para firma. Te avisaremos cuando
esté lista para usar su crédito.
```

**Variables:** `legal_name`, `partner.alias`, `approved_credit_line`

---

##### Google Chat — Canal analistas

```
📄🏬 Contrato enviado al cliente
Aliado: {{partner.alias}}
Empresa: {{legal_name}}
NIT: {{tax_id}}
LOC aprobada: ${{approved_credit_line}}
```

---

### 3 — Recordatorios de firma

Se programan al enviar el contrato. Se cancelan si todos han firmado.

#### Recordatorio 24h — Rep. legal

**Trigger:** `contract_signers.state = 'pending'` ⚠️ (Lorena ítem 9) del rep. legal a 24h.  
**Canal:** WhatsApp.

> ⚠️ Crear nueva plantilla.

**Copy:**
```
Hola {{legal_rep_first_name}}, te recordamos que el contrato
de línea de crédito de {{legal_name}} con Platam | {{partner.alias}}
está pendiente de tu firma.

Fírmalo aquí: {{rep_sign_url}}

Ten tu documento de identidad a la mano.
```

#### Recordatorio 48h — Rep. legal

**Canal:** WhatsApp.

> ⚠️ Crear nueva plantilla.

**Copy:**
```
Hola {{legal_rep_first_name}}, el contrato de {{legal_name}}
con Platam sigue pendiente de firma.

No pierdas la línea de crédito de ${{approved_credit_line}}.
Fírmalo aquí: {{rep_sign_url}}
```

#### Recordatorios codeudores *(si aplica)*

**Trigger:** igual — 24h y 48h si `contract_signers.status = pending`.  
**Canal:** solo email.

> ⚠️ Crear nuevas plantillas de email para recordatorio 24h y 48h
> de codeudores. Mismo copy que el email de invitación inicial con
> texto introductorio de recordatorio.

---

### 4 — Webhooks de firma (ZapSign → Backend)

ZapSign envía un webhook por cada firma individual.

#### 4.1 Firma individual (status `pending` en ZapSign)

Actualizar el `contract_signers` correspondiente:

```
contract_signers:  ⚠️ (Lorena ítem 9)
  state      → ContractSignerState.SIGNED ('signed') ⚠️ (Lorena ítem 9)
  signed_at  → timestamp de firma
```

**No** cambiar el estado de la solicitud. No enviar notificaciones.

#### 4.2 Todos firmaron (status `signed` en ZapSign)

```
contracts:
  state             → ContractCatalogStatus.SIGNED ('signed')
  signed_file_url   → URL del documento firmado
  form_answers_json → respuesta completa del webhook ZapSign

credit_applications:
  status            → CreditApplicationStatus.APPROVED_SIGNED ('approved_signed') ⚠️
```

#### 4.3 Activar usuario y crear línea de crédito

Al completarse todas las firmas, el cliente (empresa) pasa a ser un usuario activo y se crea su línea de crédito:

##### 4.3.1 Actualizar usuario
```
users:
  role_id → role_id del rol 'client'
  state   → UserState.ACTIVE ('active')
```

##### 4.3.2 Crear línea de crédito
```sql
INSERT INTO credit_facilities (
  user_id,
  total_limit,
  contract_id,
  state,
  created_at,
  updated_at
) VALUES (
  users.id,
  credit_applications.approved_credit_line,
  contracts.id,
  CreditFacilityState.ACTIVE ('active'),
  NOW(),
  NOW()
);
```

##### 4.3.3 Crear asignaciones de categorías
Se copian las categorías seleccionadas en la solicitud (`partner_category_ids`) a `client_category_assignments`:

```sql
-- Por cada category_id en credit_applications.partner_category_ids:
INSERT INTO client_category_assignments (
  credit_facility_id,
  category_id,
  partner_id,
  is_active,
  assigned_by,
  assigned_at,
  created_at,
  updated_at
) VALUES (
  credit_facilities.id,  -- LOC recién creada
  category_id,           -- del array partner_category_ids
  credit_applications.partner_id,
  true,
  legal_rep_signer.person_id,  -- rep legal que firmó
  NOW(),
  NOW(),
  NOW()
);
```

> Estas asignaciones permiten que el cliente pueda hacer pedidos con las categorías aprobadas. El portal partner (HU-P04) podrá posteriormente activar/desactivar estas categorías vía `is_active`.

#### 4.4 Notificaciones post-firma total

##### WhatsApp al rep. legal — Línea activa

> ⚠️ Crear nueva plantilla.

**Copy:**
```
¡Hola {{legal_rep_first_name}}! 🎉

El contrato de {{legal_name}} fue firmado por todos los
participantes. Su línea de crédito de ${{approved_credit_line}}
con Platam | {{partner.alias}} ya está activa.

¡Pueden comenzar a usarla en sus próximas compras!

El equipo de Platam
```

##### Email al rep. legal — Línea activa

> ⚠️ Crear nueva plantilla de email.

**Asunto:** `¡La línea de crédito de {{legal_name}} ya está activa!`

**Copy:**
```
Hola {{legal_rep_first_name}},

¡Excelente! El contrato fue firmado por todos los participantes.
La línea de crédito de {{legal_name}} por ${{approved_credit_line}}
con Platam | {{partner.alias}} ya está activa.

Pueden comenzar a usarla en sus próximas compras con
{{partner.alias}}.

El equipo de Platam
```

##### WhatsApp al SR — Cliente activo

> ⚠️ Crear nueva plantilla.

**Copy:**
```
¡Buenas noticias! La empresa {{legal_name}} firmó su contrato
con Platam | {{partner.alias}}. Su línea de crédito de
${{approved_credit_line}} ya está activa.
```

---

### 5 — Cancelar y regenerar contrato (error ZapSign)

Mismo flujo que PN. El analista identifica el error en el tab
Contrato de HU-B07-PJ, cancela el contrato en ZapSign, corrige
los datos con el botón Editar y regenera.

Al regenerar, el sistema vuelve a ejecutar el paso 2.2 completo:
determina la plantilla según los codeudores previamente seleccionados
y re-envía notificaciones a todos los firmantes.

> El contrato cancelado queda en historial con `state = 'cancelled'`.

---

## Acción: Rechazar

### 1 — Modal de confirmación

| Campo | Tipo | Regla |
|---|---|---|
| Motivo de rechazo | Texto libre | Obligatorio. Máx. 500 caracteres. |
| Confirmación | Checkbox | "Confirmo el rechazo de esta solicitud" |

Botones: **Confirmar rechazo** · Cancelar

### 2 — Proceso backend

```
credit_applications:
  status            → CreditApplicationStatus.REJECTED ('rejected')
  credit_study_date → timestamp actual
  credit_decision   → 'rejected'
  rejection_reason  → motivo ingresado por el analista
```

#### Notificaciones post-rechazo

##### WhatsApp al rep. legal

> ⚠️ Crear nueva plantilla.

**Copy:**
```
Hola {{legal_rep_first_name}},

Luego de revisar la solicitud de {{legal_name}}, lamentamos
informarte que no pudimos aprobar la línea de crédito con
Platam | {{partner.alias}} en este momento.

Si tienes preguntas, puedes contactarnos por este mismo chat.

El equipo de Platam
```

##### Email al rep. legal

> ⚠️ Crear nueva plantilla de email.

**Asunto:** `Actualización sobre la solicitud de crédito de {{legal_name}}`

**Copy:**
```
Hola {{legal_rep_first_name}},

Luego de revisar la solicitud de {{legal_name}}, lamentamos
informarte que no pudimos aprobar la línea de crédito con
Platam | {{partner.alias}} en este momento.

Si tienes preguntas, puedes contactarnos por WhatsApp o
escribirnos a info@platam.co.

El equipo de Platam
```

##### WhatsApp al SR

> ⚠️ Crear nueva plantilla.

**Copy:**
```
Hola, te informamos que la solicitud de crédito de {{legal_name}}
con Platam | {{partner.alias}} no fue aprobada en esta ocasión.
```

##### Google Chat — Canal analistas

```
❌🚩 Cliente rechazado
Aliado: {{partner.alias}}
Empresa: {{legal_name}}
NIT: {{tax_id}}
ID solicitud: {{application.id}}
```

---

## Criterios de Aceptación

**Aprobar:**
- [ ] El modal pre-carga LOC en orden: `approved_credit_line` → `agent_recommended_loc` → `requested_credit_line`
- [ ] El dropdown de codeudores muestra solo los accionistas registrados en `shareholders`
- [ ] Codeudor 2 solo es seleccionable si se eligió codeudor 1
- [ ] El email del codeudor es obligatorio si se selecciona el codeudor
- [ ] Si el codeudor ya tiene email en `persons`, se pre-carga
- [ ] El email nuevo/modificado se persiste en `persons.email` del accionista
- [ ] La plantilla ZapSign se selecciona correctamente según número de codeudores (0→A, 1→B, 2→C)
- [ ] El contrato incluye las variables correctas según la plantilla
- [ ] Se crean registros en `contract_signers` para cada firmante
- [ ] Status cambia a `approved_pending_signature` ⚠️
- [ ] Rep. legal recibe WA + email con su URL de firma
- [ ] Codeudores reciben solo email con su URL de firma
- [ ] SR recibe WA
- [ ] Google Chat recibe notificación
- [ ] Recordatorios 24h y 48h se envían al rep. legal por WA si sigue pendiente
- [ ] Recordatorios 24h y 48h se envían a codeudores por email si siguen pendientes
- [ ] Webhooks de firma individual actualizan `contract_signers` sin cambiar status de solicitud
- [ ] Cuando todos los `contract_signers` tienen `state = 'signed'` ⚠️ Lorena 9, se procede a activar
- [ ] `contracts.form_answers_json` almacena respuesta completa del webhook final
- [ ] `users.role_id → client` y `users.state → UserState.ACTIVE` al completarse todas las firmas
- [ ] Al completarse todas las firmas se crea la `credit_facility` con `total_limit = approved_credit_line`
- [ ] Al completarse todas las firmas se crean registros en `client_category_assignments` por cada categoría en `partner_category_ids`
- [ ] Todas las categorías asignadas inicialmente tienen `is_active = true`
- [ ] Status cambia a `approved_signed` ⚠️ solo cuando todos firmaron
- [ ] Rep. legal recibe WA + email de activación
- [ ] SR recibe WA de cliente activo
- [ ] Cancelar contrato llama API ZapSign y marca `state = 'cancelled'`
- [ ] Regenerar contrato usa los codeudores previamente seleccionados y re-envía a todos

**Rechazar:**
- [ ] Motivo obligatorio — botón deshabilitado si está vacío
- [ ] `rejection_reason`, `credit_study_date` y `credit_decision` se guardan
- [ ] Status cambia a `rejected`
- [ ] Rep. legal recibe WA + email de rechazo
- [ ] SR recibe WA
- [ ] Google Chat recibe notificación

---

## Nota de Schema

Ver [SCHEMA_PENDIENTE_LORENA.md](./SCHEMA_PENDIENTE_LORENA.md) para el
detalle completo de cambios pendientes. Los que afectan esta historia:

- **Ítem 5** — `CreditApplicationStatus.APPROVED_PENDING_SIGNATURE`
- **Ítem 8** — `CreditApplicationStatus.APPROVED_SIGNED`
- **Ítem 9** — Entidad `contract_signers` y enum `ContractSignerState`

> `contracts` usa `state (ContractCatalogStatus)` — sin `status_id` FK
> a catálogo externo. Ídem `users.state (UserState)` y
> `credit_facilities.state (CreditFacilityState)`.
>
> Confirmar con Freddy si `persons.email` es el campo correcto para el
> email del codeudor, o si se requiere campo separado en `shareholders`.
