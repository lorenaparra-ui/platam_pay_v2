# HU-B05 — Gestión de Sales Reps (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin (CRUD completo) · Analista (crear, editar y activar/desactivar)  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** Admin o Analista del backoffice de Platam,  
**quiero** gestionar los Sales Reps de cada partner, sus jerarquías de equipo y la herencia de clientes y operaciones,  
**para** que puedan operar correctamente y los cambios de vendedor no dejen clientes y operaciones huérfanas.

---

## Contexto

Cada Sales Rep pertenece a un partner específico. Los SRs tienen dos niveles de jerarquía: **Líder** y **Vendedor**. Un Líder puede ver la gestión de su equipo completo; un Vendedor solo ve la suya. Esta jerarquía se gestiona a través de la tabla `teams`.

Los SRs no tienen login tradicional. El acceso al portal se hace exclusivamente a través de **magic links generados desde el bot de WhatsApp** — canal que ya usan en su operación diaria. Esto elimina la fricción de contraseñas para un perfil de usuario no necesariamente tech-savvy.

> 🚧 **El portal web del SR se desarrolla en una épica futura.** Esta historia cubre únicamente la gestión de SRs desde el backoffice, el mecanismo de autenticación vía magic link y las notificaciones de bienvenida.

---

## Listado de Sales Reps

Tabla con buscador y filtros por partner, estado, rol y líder asignado. Columnas visibles:

| Columna | Campo DB | Tabla |
|---|---|---|
| ID | `id` | `sales_representatives` |
| Logo partner | `logo_url` | `partners` |
| Nombre | `name` | `sales_representatives` |
| Email | `email` | `users` |
| Teléfono | `phone` | `users` ⚠️ campo pendiente (Lorena ítem 13) |
| Rol | `role` | `sales_representatives` |
| Líder | `leader_id` | `teams` |
| Estado | `state` | `sales_representatives` |
| Acciones | Ver · Editar · Activar/Desactivar | — |

---

## Perfil del Sales Rep

Al hacer clic en un SR se accede a su perfil con la siguiente información en el encabezado:

| Campo | Fuente |
|---|---|
| Logo partner | `partners.logo_url` |
| Nombre | `sales_representatives.name` |
| ID Rep. Ventas | `sales_representatives.id` |
| Teléfono | `users.phone` ⚠️ campo pendiente (Lorena ítem 13) |
| Email | `users.email` |
| Rol | `sales_representatives.role` |
| Líder | `teams.leader_id` |
| Estado | `sales_representatives.state` |

El perfil contiene 5 tabs. Los tabs marcados como **🚧 Bloqueante** no se pueden desarrollar hasta que los módulos correspondientes estén completos:

### Tab 1 — Registros
Solicitudes de cupo registradas por este SR. Lista con: ID, nombre del cliente, número de documento, teléfono, email, estado.

### Tab 2 — Clientes
Clientes activos asignados a este SR. Lista con: ID, nombre, número de documento, teléfono, email, estado.

### Tab 3 — Solicitudes 🚧 Bloqueante: epic-02-loan-request
Solicitudes de préstamo (órdenes de compra) gestionadas por este SR. Lista con: ID, ID pedido, cliente, valor pedido, valor factura, fecha factura, estado.

### Tab 4 — Préstamos 🚧 Bloqueante: epic-02-loan-request
Préstamos activos de los clientes de este SR. Lista con: ID, ID pedido, principal, balance total, desembolso, fecha límite, estado.

### Tab 5 — Reporte 🚧 Bloqueante: epic-03-collections
Métricas de desempeño del SR. Contenido por definir al desarrollar la épica de cobranza.

---

## Formulario de Creación / Edición

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Partner * | `partner_id` | `sales_representatives` | Dropdown | Partners activos en el sistema |
| Nombre completo * | `name` | `sales_representatives` | Texto | — |
| Rol * | `role` | `sales_representatives` | Texto | Se sugiere el valor de `sales_rep_role_name` del partner |
| Correo electrónico * | `email` | `users` | Email | Formato válido. No editable tras la creación |
| Teléfono * | `phone` | `users` | Selector país + numérico | Requerido — es el identificador en WhatsApp |
| ¿Es líder? | — | `teams` | Toggle | Si activo: este SR es líder — no se le asigna líder. Si inactivo: se habilita el dropdown de líder |
| Líder asignado | `leader_id` | `teams` | Dropdown | **Condicional:** solo visible si el SR no es líder. Muestra únicamente SRs con rol líder del mismo partner |

---

## Autenticación del SR — Magic Link vía WhatsApp

Los SRs no tienen usuario ni contraseña. El acceso al portal se gestiona mediante tokens de sesión generados desde el bot.

**Flujo:**
```
SR envía comando al bot (ej. "acceder al portal") →
Bot valida que el número está registrado como SR activo →
Backend genera token único con TTL →
Bot envía magic link por WhatsApp →
SR abre el link → sesión activa →
Inactividad de 20 min → sesión expirada →
Portal muestra: "Tu sesión ha expirado. Ve al bot de 
WhatsApp y solicita un nuevo enlace de acceso."
```

**Especificaciones del token:**
- Token único por solicitud — un nuevo link invalida el anterior
- TTL de sesión: 20 minutos de inactividad
- Almacenamiento temporal del token: Redis o DynamoDB con TTL (a definir con Freddy)
- No requiere Cognito para SRs

**Disclaimer en el portal:**
> *"Este enlace es personal e intransferible. Compartirlo con terceros puede comprometer la seguridad de tu cuenta y la información de tus clientes."*

---

## Notificación de Bienvenida — WhatsApp

Al crear un SR el sistema envía automáticamente el siguiente mensaje de WhatsApp al número registrado:

> Hola {{nombre_sr}}, Estamos emocionados de tenerte como parte de nuestro equipo de {{sales_rep_role_name_plural}} en Platam | {{partner_name}}.
>
> Con el Bot de Platam | {{partner_name}}, tienes acceso a guías y herramientas para ofrecer financiamiento a tus clientes, lo que les permitirá disfrutar de una experiencia de compra aún mejor en {{partner_name}}.
>
> Nuestro bot está lleno de recursos útiles, desde el proceso de registro hasta la solicitud de financiamiento y más. Si alguna vez te encuentras con preguntas o necesitas orientación, no dudes en consultar nuestra sección de ayuda en el Bot de Platam | {{partner_name}}.
>
> Estamos aquí para brindarte todo el apoyo que necesitas. Además, recuerda que puedes acceder al portal de {{sales_rep_role_name_plural}} haciendo clic en el siguiente enlace 👇 {{portal_url}}
>
> ¡Explora y utiliza el bot para hacer tu trabajo de manera más efectiva! 🤖 Siéntete libre de activar el bot escribiendo cualquier cosa en este chat.
>
> Atentamente,  
> El Equipo de Platam

**Variables del mensaje:**

| Variable | Fuente |
|---|---|
| `{{nombre_sr}}` | `sales_representatives.name` |
| `{{sales_rep_role_name_plural}}` | `partners.sales_rep_role_name_plural` |
| `{{partner_name}}` | `partners.company_name` |
| `{{portal_url}}` | URL base del portal SR del partner |

---

## Jerarquía de Equipos

La jerarquía se gestiona a través de la tabla `teams`.

**Reglas:**
- Un SR solo puede pertenecer a un equipo
- Si un SR es líder, `leader_id` en `teams` queda en null
- Si un SR no es líder, debe tener un líder asignado del mismo partner
- Desde el portal SR, un líder ve la gestión de todos los miembros de su equipo; un vendedor solo ve la suya

---

## Activar / Desactivar Sales Rep

Al desactivar un SR el sistema verifica si tiene clientes o operaciones asignadas. Si los tiene, muestra obligatoriamente el **flujo de herencia** antes de completar la desactivación.

---

## Herencia de Clientes y Operaciones

Cuando un SR se desactiva y tiene clientes o operaciones asignadas, el sistema muestra un modal con:

1. Resumen de lo que quedará huérfano:
   - Cantidad de clientes activos asignados
   - Solicitudes de cupo en proceso
   - Préstamos activos *(cuando el módulo esté disponible)*

2. Dropdown para seleccionar el SR destino (SRs activos del mismo partner)

3. Confirmación: *"¿Estás seguro de que deseas transferir todos los clientes y operaciones de [nombre SR] a [nombre SR destino]?"*

Al confirmar, el sistema reasigna masivamente todos los registros al SR destino.

> ⚠️ No se puede desactivar un SR con clientes u operaciones asignadas sin completar la herencia.

---

## Flujo de Almacenamiento — Creación

### 1. Crear registro en `users`
```
email  → del formulario
phone  → del formulario  -- ⚠️ campo pendiente (Lorena ítem 13)
state  → UserState.ACTIVE ('active')
```

### 2. Crear registro en `sales_representatives`
```
partner_id → del formulario
user_id    → ID del usuario recién creado
name       → del formulario
role       → del formulario
state      → SalesRepresentativeRecordState.ACTIVE ('active')
```

### 3. Crear registro en `teams`
```
team_type → 'sales_rep'
member_id → ID del SR recién creado
leader_id → ID del líder seleccionado (null si es líder)
```

### 4. Enviar mensaje de bienvenida por WhatsApp
Mensaje automático al número registrado con las variables del template resueltas.

---

## Flujo de Almacenamiento — Herencia

```
-- Reasignar clientes:
businesses.sales_rep_id             → ID del SR destino

-- Reasignar solicitudes de cupo:
credit_applications.sales_rep_id    → ID del SR destino

-- Préstamos y solicitudes de pedido:
🚧 Pendiente de mapear al desarrollar epic-02-loan-request
```

---

## Criterios de Aceptación

- [ ] Admin y Analista pueden crear, editar y activar/desactivar Sales Reps
- [ ] El teléfono es obligatorio al crear un SR
- [ ] Al crear un SR se envía automáticamente el mensaje de bienvenida por WhatsApp con las variables correctas
- [ ] Los SRs no tienen usuario ni contraseña — el acceso al portal es exclusivamente por magic link
- [ ] El magic link se genera desde el bot y expira tras 20 minutos de inactividad
- [ ] Un nuevo magic link invalida el anterior
- [ ] Al expirar la sesión el portal muestra el mensaje indicando que solicite un nuevo link en el bot
- [ ] El portal muestra el disclaimer de uso personal del link
- [ ] El email no es editable una vez creado el SR
- [ ] Un SR marcado como líder no puede tener líder asignado
- [ ] Un SR no líder debe tener un líder asignado del mismo partner
- [ ] El dropdown de líder solo muestra SRs líder del mismo partner
- [ ] El listado se puede filtrar por partner, estado, rol y líder
- [ ] El perfil del SR muestra los 5 tabs correctamente
- [ ] Los tabs de Solicitudes, Préstamos y Reporte muestran placeholder hasta que los módulos estén disponibles
- [ ] No se puede desactivar un SR con clientes u operaciones asignadas sin completar la herencia
- [ ] El flujo de herencia reasigna masivamente todos los clientes y operaciones al SR destino
- [ ] Un SR inactivo no aparece en dropdowns de formularios ni como destino en el flujo de herencia

---

## Nota de Schema — Cambios Pendientes

> ⚠️ Esta historia requiere los siguientes cambios en el schema antes del desarrollo:
>
> **1. Nueva tabla `teams`**
> ```
> Table teams {
>   id bigint [pk]
>   external_id uuid [not null, unique]
>   team_type varchar(50) [not null, note: "sales_rep | internal | etc."]
>   member_id bigint [not null, note: "FK según team_type — ej: sales_representatives.id"]
>   leader_id bigint [note: "FK según team_type — null si el miembro es líder"]
>   created_at timestamptz [default: `now()`]
>   updated_at timestamptz [default: `now()`]
> }
> ```
>
> **2. Campo `sales_rep_id` en `businesses`**  
> Necesario para reasignar clientes durante la herencia.  
> ```
> sales_rep_id bigint [ref: > sales_representatives.id]
> ```
