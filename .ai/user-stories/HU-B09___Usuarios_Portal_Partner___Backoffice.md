# HU-B09 — Usuarios del Portal Partner (Backoffice)

**Épica:** epic-07-backoffice-extended  
**Roles:** Admin (CRUD completo) · Analista (solo lectura)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

> ⚠️ Las URLs y dominios usados en este documento son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

---

## Historia de Usuario

**Como** Admin del backoffice de Platam,  
**quiero** crear, editar y administrar los usuarios que acceden al portal partner de cada partner,  
**para** controlar quién tiene acceso operativo al portal sin depender del equipo de desarrollo.

---

## Contexto

Los usuarios del portal partner son creados exclusivamente por Platam desde el backoffice — no hay autoregistro. Un partner puede tener múltiples usuarios operativos, todos vinculados al mismo `partner_id`. La autenticación usa email + contraseña vía AWS Cognito.

Este módulo es accesible desde dos rutas:
- **Módulo global:** menú principal → "Usuarios Partner"
- **Anidado:** perfil del partner (HU-B03) → tab "Usuarios"

> Se recomienda agregar el **tab "Usuarios"** al perfil del partner en HU-B03 como cuarta pestaña, equivalente al tab "Sales Reps".

---

## Listado de Usuarios Partner

Tabla con buscador y filtro por partner. Columnas:

| Columna | Campo DB | Tabla |
|---|---|---|
| ID | `id` | `users` |
| Logo partner | `logo_url` | `partners` |
| Partner | `company_name` | `businesses` (via `users.partner_id → partners`) ⚠️ campo pendiente (Lorena ítem 7) |
| Nombre completo | `full_name` | `users` ⚠️ campo pendiente (Lorena ítem 14) |
| Email | `email` | `users` |
| Rol | `name` | `roles` |
| Último acceso | `last_login_at` | `users` |
| Estado | `state` | `users` |
| Acciones | Editar · Activar/Desactivar · Restablecer contraseña | — |

---

## Formulario de Creación / Edición

| Label | Campo DB | Tabla | Tipo | Validaciones |
|---|---|---|---|---|
| Partner * | `partner_id` | `users` | Dropdown | Partners activos. No editable tras la creación |
| Nombre completo * | `full_name` | `users` | Texto | — |
| Email * | `email` | `users` | Email | Único en el sistema. No editable tras la creación |
| Rol * | `role_id` | `users` | Dropdown | Roles disponibles para portal partner. Ver sección Roles |

---

## Roles disponibles para portal partner

| Rol (code) | Display | Descripción |
|---|---|---|
| `partner_admin` | Administrador | Acceso completo al portal: clientes, solicitudes, desembolsos, SRs |
| `partner_ops` | Operaciones | Acceso operativo: solicitudes y desembolsos. Sin gestión de SRs |

> Los roles se gestionan en la tabla `roles`. El Admin de Platam no puede crear roles nuevos desde esta vista — los roles disponibles son los precargados en el seed.

---

## Flujo de Creación

### 1 — Crear registro en `users`
```
full_name   → del formulario  -- ⚠️ campo pendiente (Lorena ítem 14)
email       → del formulario
partner_id  → del formulario
role_id     → rol seleccionado (FK a roles tabla)
state       → UserState.ACTIVE ('active')
cognito_sub → null (se asigna al primer login via Cognito)
```

### 2 — Crear usuario en AWS Cognito
```
Username    → email del usuario
Email       → email del usuario
Estado      → FORCE_CHANGE_PASSWORD
```
Cognito envía automáticamente un email al usuario con un enlace para establecer su contraseña (flujo nativo "force change password").

**Asunto del email (Cognito):** `Tu acceso al portal partner de Platam`

---

## Activar / Desactivar Usuario

- Cambia `users.state` entre `UserState.ACTIVE ('active')` e `UserState.INACTIVE ('inactive')`.
- El usuario inactivo no puede iniciar sesión (validado en el login, HU-P01).
- Si el usuario tiene sesión activa, la sesión expira en el próximo request.
- Modal de confirmación: *"¿Estás seguro de que deseas desactivar a [nombre]? Perderá acceso inmediato al portal."*
- No requiere herencia — los usuarios partner no son propietarios de registros.

---

## Restablecer Contraseña

Acción disponible en el listado para usuarios activos.

```
Admin hace clic en "Restablecer contraseña" →
Modal de confirmación: "Se enviará un enlace de restablecimiento al correo [email]. ¿Confirmar?" →
Backend llama a Cognito: AdminResetUserPassword →
Cognito envía email con enlace válido por 24 horas →
Toast: "Enlace de restablecimiento enviado a [email]"
```

> El Admin no puede ver ni establecer la contraseña directamente — siempre se gestiona vía Cognito.

---

## Criterios de Aceptación

- [ ] Solo el rol Admin puede crear, editar, activar/desactivar y restablecer contraseñas
- [ ] El Analista puede ver el listado y el detalle en modo lectura
- [ ] El listado se puede filtrar por partner y buscar por nombre o email
- [ ] Al crear un usuario se crea el registro en `users` (con `partner_id`) y en Cognito
- [ ] Cognito envía automáticamente el email de bienvenida con enlace para establecer contraseña
- [ ] El email no es editable una vez creado el usuario
- [ ] El partner asignado no es editable una vez creado el usuario
- [ ] Al desactivar se muestra modal de confirmación y el usuario pierde acceso inmediato
- [ ] La acción "Restablecer contraseña" llama a `AdminResetUserPassword` de Cognito y muestra confirmación
- [ ] El Admin no puede ver ni establecer la contraseña directamente
- [ ] El módulo es accesible desde el menú global y desde el tab "Usuarios" en el perfil del partner (HU-B03)
- [ ] Los roles disponibles en el dropdown son solo los roles de portal partner precargados en seed

---

## Nota de Schema — Cambios Pendientes

> ⚠️ Requiere los siguientes cambios en `users` antes del desarrollo:
>
> **1. Campo `partner_id` en `users`**  
> Nullable — solo se llena para usuarios con rol partner. Null para todos los demás roles.
> ```
> partner_id bigint [ref: > partners.id, note: "Solo para usuarios con rol partner. Null para otros roles."]
> ```
>
> **2. Campo `full_name` en `users`**  
> Referenciado en HU-P07 como `users.full_name`. Verificar con Freddy si ya existe o agregar:
> ```
> full_name varchar(255)
> ```

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-B03 | Tab "Usuarios" se agrega al perfil del partner |
| HU-P01 | Login del portal partner — valida `status_id` y `role_id` |
| HU-P07 | El usuario puede editar su propio nombre y email desde el portal |
