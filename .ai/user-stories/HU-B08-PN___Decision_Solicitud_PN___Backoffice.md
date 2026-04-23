# HU-B08-PN — Decisión de Solicitud · Persona Natural (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin, Analista  
**Tipo de cliente:** Persona Natural (PN)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Analista o Admin del backoffice de Platam,  
**quiero** aprobar o rechazar una solicitud de crédito PN en
`under_review`, y que el sistema gestione automáticamente el contrato,
las notificaciones y el seguimiento de firma,  
**para** activar la línea de crédito del cliente o cerrar el proceso
de forma ordenada.

---

## Contexto

Esta historia cubre todo lo que ocurre desde que el analista toma
una decisión hasta que el cliente firma el contrato (o es rechazado).

Se dispara desde el menú de acciones de HU-B07-PN cuando la
solicitud está en `under_review`.

---

## Flujo General

```
Analista selecciona acción desde menú ⋮ en HU-B07-PN
      │
      ├── Aprobar ──────────────────────────────────────────────────┐
      │                                                             ▼
      │                                              Modal: confirmar LOC aprobada
      │                                                             │
      │                                              Backend: crear contrato ZapSign
      │                                                             │
      │                                        status → approved_pending_signature ⚠️
      │                                                             │
      │                              Notificar cliente (WA + email) + SR (WA)
      │                                                             │
      │                                        ┌────────────────────┤
      │                                        │                    │
      │                                   24h sin firma        48h sin firma
      │                                   Recordatorio WA      Recordatorio WA
      │                                        │                    │
      │                                        └────────────────────┤
      │                                                             │
      │                                        Cliente firma → webhook ZapSign
      │                                                             │
      │                                   Actualizar schema + rol de usuario
      │                                        status → approved_signed ⚠️
      │                                                             │
      │                              Notificar cliente (WA + email) + SR (WA)
      │
      └── Rechazar ─────────────────────────────────────────────────┐
                                                                    ▼
                                                     Modal: confirmar rechazo
                                                                    │
                                                    status → rejected
                                                                    │
                                        Notificar cliente (WA + email) + SR (WA)
                                             Google Chat notificación
```

---

## Acción: Aprobar

### 1 — Modal de confirmación

Al seleccionar "Aprobar" del menú ⋮ se abre un modal con:

| Campo | Tipo | Regla |
|---|---|---|
| LOC aprobada | Numérico (COP) | Obligatorio. Pre-carga en orden: `approved_credit_line` (si existe en tab Estudio) → `agent_recommended_loc` → `requested_credit_line` |
| Confirmación | Checkbox | "Confirmo que he revisado la solicitud y apruebo la línea de crédito" |

Botones: **Confirmar aprobación** · Cancelar

---

### 2 — Proceso backend al confirmar

#### 2.1 Actualizar solicitud

```
credit_applications:
  status               → CreditApplicationStatus.APPROVED_PENDING_SIGNATURE ('approved_pending_signature') ⚠️
  approved_credit_line → LOC confirmada por el analista en el modal
  credit_study_date    → timestamp actual
  credit_decision      → 'approved'
```

#### 2.2 Crear contrato en ZapSign

Se llama a la API de ZapSign usando la plantilla de contrato PN.

> ⚠️ **Plantilla pendiente:** para Platam Pay v2 se debe crear una
> nueva plantilla en ZapSign. El `template_id` actual del MVP
> (`997e4d5a-02d4-4806-896a-51b0a56342cd`) se usa como placeholder
> durante el desarrollo hasta que la nueva plantilla esté lista.

**Variables de reemplazo en el contrato:**

| Variable en plantilla | Fuente | Tabla |
|---|---|---|
| `NOMBRE COMPLETO` | `first_name + last_name` | `persons` |
| `NOMBRES` | `first_name` | `persons` |
| `APELLIDOS` | `last_name` | `persons` |
| `TIPO DE DOCUMENTO` | `doc_type` | `persons` |
| `NÚMERO DE DOCUMENTO` | `doc_number` | `persons` |
| `CORREO ELECTRÓNICO` | `email` | `users` |
| `CELULAR` | `phone` | `persons` |
| `p_id` | `external_id` | `credit_applications` |

> `sandbox: true` solo para el partner de pruebas
> (a configurar como parámetro operativo).

#### 2.3 Guardar contrato en schema

```
contracts:
  user_id              → de la solicitud
  application_id       → ID de la solicitud
  zapsign_token        → token retornado por ZapSign
  state                → ContractCatalogStatus.PENDING ('pending')
  original_file_url    → URL del documento generado por ZapSign

contract_signers:  ⚠️ (Lorena ítem 9)
  contract_id          → ID del contrato creado
  person_id            → person_id del cliente
  zapsign_signer_token → signer token de ZapSign
  sign_url             → URL de firma retornada por ZapSign
  state                → ContractSignerState.PENDING ('pending') ⚠️ (Lorena ítem 9)
```

#### 2.4 Notificaciones post-aprobación

##### WhatsApp al cliente — Contrato listo para firmar

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
{{first_name}}, ¡felicidades! 🎉

Hemos aprobado tu línea de crédito con Platam | {{partner.alias}}
por ${{approved_credit_line}}.

Para activarla, firma tu contrato digital aquí:
{{contract_signers.sign_url}}

Ten tu documento de identidad a la mano para el proceso de
verificación. Una vez firmado, recibirás confirmación y podrás
usar tu línea de crédito.

¡Gracias por confiar en Platam!
```

**Variables:**

| Variable | Fuente | Tabla |
|---|---|---|
| `{{first_name}}` | `first_name` | `persons` |
| `{{partner.alias}}` | `alias` | `partners` |
| `{{approved_credit_line}}` | `approved_credit_line` (COP formateado) | `credit_applications` |
| `{{contract_signers.sign_url}}` | `sign_url` | `contract_signers` ⚠️ (Lorena ítem 9) |

---

##### Email al cliente — Contrato listo para firmar

> ⚠️ Crear nueva plantilla de email.

**Asunto:** `¡Tu línea de crédito con Platam ha sido aprobada!`

**Copy:**
```
Hola {{first_name}},

¡Felicidades! Hemos aprobado tu línea de crédito con
Platam | {{partner.alias}} por ${{approved_credit_line}}.

Para activarla, solo necesitas firmar tu contrato digital.
Es un proceso rápido — ten tu documento de identidad a la mano.

[FIRMAR MI CONTRATO] → {{contract_signers.sign_url}}

Una vez firmado, recibirás confirmación y podrás comenzar a usar
tu línea de crédito de inmediato.

¿Tienes dudas? Escríbenos por WhatsApp.

El equipo de Platam
```

**Variables:** las mismas que el WhatsApp anterior.

---

##### WhatsApp al SR — Contrato enviado a cliente

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
Hola, tu cliente {{first_name}} {{last_name}} de {{partner.alias}}
ha sido aprobado con una línea de crédito de ${{approved_credit_line}}.

Le hemos enviado el contrato para que lo firme. Te avisaremos
cuando esté listo para usar su crédito.
```

**Variables:**

| Variable | Fuente | Tabla |
|---|---|---|
| `{{first_name}}` | `first_name` | `persons` |
| `{{last_name}}` | `last_name` | `persons` |
| `{{partner.alias}}` | `alias` | `partners` |
| `{{approved_credit_line}}` | `approved_credit_line` (COP formateado) | `credit_applications` |

---

##### Google Chat — Canal analistas

```
📄👤 Contrato enviado al cliente
Aliado: {{partner.alias}}
Nombre: {{first_name}} {{last_name}}
Documento: {{doc_number}}
LOC aprobada: ${{approved_credit_line}}
```

---

### 3 — Recordatorios de firma

Se programan en el momento de enviar el contrato. Se cancelan
si el cliente firma antes del trigger.

#### Recordatorio 24h

**Trigger:** `contract_signers.state = 'pending'` ⚠️ (Lorena ítem 9) a las 24h del envío.  
**Canal:** WhatsApp al cliente.

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
Hola {{first_name}}, te recordamos que tu contrato de línea
de crédito con Platam | {{partner.alias}} está pendiente de firma.

Fírmalo aquí y activa tu crédito:
{{contract_signers.sign_url}}

Ten tu documento de identidad a la mano.
```

**Variables:** `first_name`, `partner.alias`, `sign_url`

---

#### Recordatorio 48h

**Trigger:** `contract_signers.state = 'pending'` ⚠️ (Lorena ítem 9) a las 48h del envío.  
**Canal:** WhatsApp al cliente.

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
Hola {{first_name}}, tu contrato con Platam | {{partner.alias}}
sigue pendiente de firma.

No pierdas tu línea de crédito de ${{approved_credit_line}}.
Fírmalo aquí:
{{contract_signers.sign_url}}

Si tienes algún inconveniente, contáctanos por este mismo chat.
```

**Variables:** `first_name`, `partner.alias`, `approved_credit_line`, `sign_url`

---

### 4 — Webhook de firma (ZapSign → Backend)

Cuando el cliente firma, ZapSign envía un webhook al backend.

#### 4.1 Actualizar schema

```
contracts:
  state                → ContractCatalogStatus.SIGNED ('signed')
  signed_file_url      → URL del documento firmado
  form_answers_json    → respuesta completa del webhook ZapSign

contract_signers:  ⚠️ (Lorena ítem 9)
  state                → ContractSignerState.SIGNED ('signed') ⚠️ (Lorena ítem 9)
  signed_at            → timestamp de firma

credit_applications:
  status               → CreditApplicationStatus.APPROVED_SIGNED ('approved_signed') ⚠️
```

> La respuesta completa del webhook ZapSign (datos biométricos,
> IP, fotos de documento, selfie, firma) se almacena íntegra en
> `contracts.form_answers_json`.

#### 4.2 Activar usuario y crear línea de crédito

Al firmar, el cliente pasa a ser un usuario activo en el sistema y se crea su línea de crédito (LOC):

##### 4.2.1 Actualizar usuario
```
users:
  role_id → role_id del rol 'client'
  state   → UserState.ACTIVE ('active')
```

##### 4.2.2 Crear línea de crédito
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

##### 4.2.3 Crear asignaciones de categorías
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
  contract_signers.person_id,  -- el cliente que firmó
  NOW(),
  NOW(),
  NOW()
);
```

> Estas asignaciones permiten que el cliente pueda hacer pedidos con las categorías aprobadas. El portal partner (HU-P04) podrá posteriormente activar/desactivar estas categorías vía `is_active`.

#### 4.3 Notificaciones post-firma

##### WhatsApp al cliente — Línea activa

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
¡Hola {{first_name}}! 🎉

Tu línea de crédito de ${{approved_credit_line}} con
Platam | {{partner.alias}} ya está activa.

Puedes usarla en tus próximas compras con {{partner.alias}}.
¡Disfrútala!

El equipo de Platam
```

**Variables:** `first_name`, `approved_credit_line`, `partner.alias`

---

##### Email al cliente — Línea activa

> ⚠️ Crear nueva plantilla de email.

**Asunto:** `¡Tu línea de crédito Platam ya está activa!`

**Copy:**
```
Hola {{first_name}},

¡Tu firma fue exitosa! Tu línea de crédito de
${{approved_credit_line}} con Platam | {{partner.alias}}
ya está activa y lista para usar.

Podrás utilizarla en tus próximas compras con {{partner.alias}}.

Si tienes alguna pregunta, escríbenos por WhatsApp.

El equipo de Platam
```

**Variables:** las mismas que el WhatsApp anterior.

---

##### WhatsApp al SR — Cliente activo

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
¡Buenas noticias! Tu cliente {{first_name}} {{last_name}}
ya firmó su contrato con Platam | {{partner.alias}}.

Su línea de crédito de ${{approved_credit_line}} está activa
y puede comenzar a comprar.
```

**Variables:** `first_name`, `last_name`, `partner.alias`, `approved_credit_line`

---

### 5 — Cancelar y regenerar contrato (error ZapSign)

ZapSign valida identidad biométrica al firmar (cámara, registraduría,
cédula). Si los datos del cliente no coinciden con su cédula, ZapSign
genera un error y el cliente no puede firmar.

El analista gestiona este caso desde el **tab Contrato** en HU-B07-PN:

1. Identifica el error en tab Contrato (estado ZapSign en error).
2. Clic en **Cancelar contrato** → confirma en modal:
   - Llama a API ZapSign para cancelar.
   - `contracts.state` → `ContractCatalogStatus.CANCELLED ('cancelled')`
3. Corrige los datos del cliente con el **botón Editar** (HU-B07-PN).
4. Clic en **Regenerar contrato** → mismo flujo del paso 2.2.
5. Nuevo registro en `contracts` y `contract_signers`.
6. Re-envía WhatsApp + email al cliente con nueva URL de firma
   usando los mismos copies de la sección 2.4.

> El contrato cancelado queda en historial con `state = 'cancelled'`.
> Solo el último contrato activo es el operativo.

---

## Acción: Rechazar

### 1 — Modal de confirmación

| Campo | Tipo | Regla |
|---|---|---|
| Motivo de rechazo | Texto libre | Obligatorio. Máx. 500 caracteres. |
| Confirmación | Checkbox | "Confirmo el rechazo de esta solicitud" |

Botones: **Confirmar rechazo** · Cancelar

---

### 2 — Proceso backend al confirmar

#### 2.1 Actualizar solicitud

```
credit_applications:
  status            → CreditApplicationStatus.REJECTED ('rejected')
  credit_study_date → timestamp actual
  credit_decision   → 'rejected'
  rejection_reason  → motivo ingresado por el analista
```

#### 2.2 Notificaciones post-rechazo

##### WhatsApp al cliente — Rechazo

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
Hola {{first_name}},

Luego de revisar tu solicitud, lamentamos informarte que no
pudimos aprobar tu línea de crédito con Platam | {{partner.alias}}
en este momento.

Si tienes preguntas, puedes contactarnos por este mismo chat.

El equipo de Platam
```

**Variables:**

| Variable | Fuente | Tabla |
|---|---|---|
| `{{first_name}}` | `first_name` | `persons` |
| `{{partner.alias}}` | `alias` | `partners` |

---

##### Email al cliente — Rechazo

> ⚠️ Crear nueva plantilla de email.

**Asunto:** `Actualización sobre tu solicitud de crédito Platam`

**Copy:**
```
Hola {{first_name}},

Luego de revisar tu solicitud, lamentamos informarte que no
pudimos aprobar tu línea de crédito con Platam | {{partner.alias}}
en este momento.

Si tienes preguntas o deseas más información, puedes
contactarnos por WhatsApp.

El equipo de Platam
```

---

##### WhatsApp al SR — Rechazo

> ⚠️ Crear nueva plantilla en el proveedor de WhatsApp.

**Copy:**
```
Hola, te informamos que la solicitud de crédito de tu cliente
{{first_name}} {{last_name}} con Platam | {{partner.alias}}
no fue aprobada en esta ocasión.
```

**Variables:** `first_name`, `last_name`, `partner.alias`

---

##### Google Chat — Canal analistas

```
❌🚩 Cliente rechazado
Aliado: {{partner.alias}}
Nombre: {{first_name}} {{last_name}}
ID solicitud: {{application.id}}
Móvil: {{phone}}
```

---

## Criterios de Aceptación

**Aprobar:**
- [ ] El modal pre-carga LOC en orden: `approved_credit_line` → `agent_recommended_loc` → `requested_credit_line`
- [ ] El analista puede modificar la LOC antes de confirmar
- [ ] Al confirmar: `approved_credit_line`, `credit_study_date` y `credit_decision` se guardan
- [ ] Status cambia a `approved_pending_signature` ⚠️
- [ ] Se crea el contrato en ZapSign con todas las variables de reemplazo
- [ ] Se crea registro en `contracts` y `contract_signers` con tokens y URL
- [ ] WhatsApp al cliente incluye URL de firma y LOC en COP
- [ ] Email al cliente se envía con el copy correcto
- [ ] WhatsApp al SR se envía correctamente
- [ ] Google Chat recibe la notificación
- [ ] Recordatorio 24h se envía si `contract_signers.state = 'pending'` ⚠️ Lorena 9
- [ ] Recordatorio 48h se envía si `contract_signers.state = 'pending'` ⚠️ Lorena 9
- [ ] Los recordatorios no se envían si el cliente ya firmó
- [ ] El webhook de ZapSign actualiza `contracts` y `contract_signers`
- [ ] `contracts.form_answers_json` almacena la respuesta completa del webhook
- [ ] `users.role_id` cambia a `client` y `users.state` a `UserState.ACTIVE ('active')` al firmar
- [ ] Al firmar se crea la `credit_facility` con `total_limit = approved_credit_line`
- [ ] Al firmar se crean registros en `client_category_assignments` por cada categoría en `partner_category_ids`
- [ ] Todas las categorías asignadas inicialmente tienen `is_active = true`
- [ ] Status cambia a `approved_signed` ⚠️ al recibir webhook de firma
- [ ] WhatsApp y email de activación se envían al cliente post-firma
- [ ] WhatsApp de cliente activo se envía al SR post-firma
- [ ] Cancelar contrato llama a API ZapSign y actualiza status a `cancelled`
- [ ] Regenerar contrato crea nuevo registro y re-envía notificaciones
- [ ] El contrato cancelado queda en historial, no se elimina

**Rechazar:**
- [ ] El motivo de rechazo es obligatorio — botón deshabilitado si está vacío
- [ ] Al confirmar: `rejection_reason`, `credit_study_date` y `credit_decision` se guardan
- [ ] Status cambia a `rejected`
- [ ] WhatsApp y email al cliente se envían con los copies correctos
- [ ] WhatsApp al SR se envía correctamente
- [ ] Google Chat recibe la notificación

---

## Nota de Schema

Ver [SCHEMA_PENDIENTE_LORENA.md](./SCHEMA_PENDIENTE_LORENA.md) para el
detalle completo de cambios pendientes. Los que afectan esta historia:

- **Ítem 5** — `CreditApplicationStatus.APPROVED_PENDING_SIGNATURE`
- **Ítem 8** — `CreditApplicationStatus.APPROVED_SIGNED`
- **Ítem 9** — Entidad `contract_signers` y enum `ContractSignerState`

> `contracts` usa `state (ContractCatalogStatus)` y `contract_signers` usa
> `state (ContractSignerState)` — sin `status_id` FK a un catálogo externo.
> `users` usa `state (UserState)` — sin `status_id`.
> `credit_facilities` usa `state (CreditFacilityState)` — sin `status_id`.
