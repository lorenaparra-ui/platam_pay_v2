# HU-P07 — Perfil y Soporte · Portal Partner

**Épica:** epic-06-portal-partner  
**Actor:** Usuario operativo del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`partners.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

Esta HU cubre dos secciones del portal: el perfil del usuario autenticado y el canal de soporte con Platam. El perfil del partner como empresa (razón social, configuración de categorías, términos) lo gestiona exclusivamente el backoffice (HU-B03) — aquí solo se gestiona la cuenta del usuario operativo.

---

## Historia de Usuario

**Como** usuario operativo de un partner,  
**quiero** actualizar mis datos de acceso y contactar a Platam cuando necesite ayuda,  
**para** mantener mi cuenta al día y resolver problemas sin canales informales.

---

## Parte 1 — Mi Perfil

Accesible desde el menú lateral: **"Mi perfil"**

### Datos editables

| Campo | Fuente | Editable | Notas |
|---|---|---|---|
| Nombre completo | `users.full_name` ⚠️ | Sí | Campo pendiente (Lorena ítem 14) |
| Correo electrónico | `users.email` | Sí | Es también el usuario de login — ver flujo especial |
| Contraseña | — | Sí | Ver flujo especial |

### Datos de solo lectura

| Campo | Fuente | Notas |
|---|---|---|
| Partner | `partners.company_name` ⚠️ | Campo pendiente (Lorena ítem 7). El usuario no puede cambiar a qué partner pertenece |
| Rol | `users.role_id` | Asignado por Platam desde backoffice |

---

### Flujo especial — Cambio de email

El email es el identificador de login en Cognito. Cambiarlo requiere verificación.

```
1. Usuario ingresa el nuevo email
2. Sistema envía un código de verificación al email nuevo
3. Usuario ingresa el código
4. Si válido: se actualiza users.email y el atributo en Cognito
5. La sesión actual sigue activa
6. En el próximo login usará el email nuevo
```

> Si el email nuevo ya está registrado en otro usuario:
> *"Este email ya está asociado a otra cuenta."*

---

### Flujo especial — Cambio de contraseña

```
1. Usuario completa tres campos:
   → Contraseña actual
   → Nueva contraseña (mín. 8 caracteres, una mayúscula, un número)
   → Confirmar nueva contraseña

2. Sistema valida contraseña actual contra Cognito
   → Si incorrecta: "La contraseña actual no es correcta"

3. Si válida: Cognito actualiza la contraseña
4. Toast: "Contraseña actualizada correctamente"
5. La sesión actual sigue activa
```

---

## Criterios de Aceptación — Perfil

```gherkin
Scenario: Ver perfil
  Given un usuario operativo autenticado
  When accede a "Mi perfil"
  Then ve sus datos con los campos editables habilitados
  And partner y rol aparecen en solo lectura

Scenario: Editar nombre
  Given el usuario en su perfil
  When edita su nombre y guarda
  Then users.full_name se actualiza
  And ve confirmación en pantalla

Scenario: Cambio de email exitoso
  Given un email nuevo válido y no registrado
  When el usuario completa la verificación
  Then users.email y Cognito se actualizan
  And la sesión sigue activa

Scenario: Email ya registrado
  Given un email que ya pertenece a otra cuenta
  When el usuario intenta guardarlo
  Then ve el mensaje de error correspondiente

Scenario: Cambio de contraseña exitoso
  Given contraseña actual correcta y nueva contraseña válida
  When el usuario confirma el cambio
  Then Cognito actualiza la contraseña
  And la sesión sigue activa

Scenario: Contraseña actual incorrecta
  Given una contraseña actual incorrecta
  When el usuario intenta cambiarla
  Then ve el mensaje de error
  And la contraseña no se modifica
```

---

## Parte 2 — Soporte

Accesible desde el menú lateral: **"Soporte"**  
También accesible desde el botón "Soporte" en el detalle de solicitudes y desembolsos.

### Diseño de la vista

Dos bloques: FAQs y canales de contacto.

---

### Bloque 1 — Preguntas frecuentes (FAQs)

Lista colapsable organizada por categoría. Contenido a definir con el equipo de operaciones. Categorías sugeridas:

**Solicitudes de préstamo**
- ¿Cómo confirmo la entrega de un pedido?
- ¿Puedo rechazar una solicitud ya aprobada por el cliente?
- ¿Qué pasa si ingresé mal el valor de la factura?

**Desembolsos**
- ¿Cuándo se realizan los desembolsos?
- ¿Qué son los cruces o ajustes?
- ¿Cómo descargo el detalle de un desembolso?

**Clientes y categorías**
- ¿Por qué un cliente no aparece en mi lista?
- ¿Puedo agregar nuevas categorías para mis clientes?

**Mi equipo**
- ¿Cómo creo un nuevo rep. de ventas?
- ¿Qué pasa si desactivo un rep. con clientes asignados?

> Contenido estático en frontend v1. Puede migrarse a CMS en versiones futuras.

---

### Bloque 2 — Canales de contacto

| Canal | Acción | Notas |
|---|---|---|
| Ticket de soporte | Formulario inline (ver abajo) | Canal principal |
| Correo | `soporte@platam.co` | Secundario |

> No se expone número de WhatsApp directo al partner — el canal estructurado es el ticket. El correo es fallback.

---

### Formulario de Ticket

Accesible desde la sección de soporte y desde contextos específicos (detalle de solicitud, detalle de desembolso).

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| Tipo de solicitud | Dropdown | Sí | Ver lista abajo |
| Referencia | Texto | No | Pre-llenado si viene de un contexto |
| Descripción | Texto libre | Sí | |

**Tipos de solicitud:**
- Problema con una solicitud de préstamo
- Problema con un desembolso
- Problema con un cliente
- Error en el portal
- Solicitud de ajuste o corrección
- Otro

**Al enviar:**
```
→ Crea registro en support_tickets con:
   created_by_type = 'partner_ops'
   created_by_id   = users.id del usuario autenticado
   partner_id      = partner_id del usuario
   type            = tipo seleccionado
   reference       = referencia ingresada (si aplica)
   description     = descripción

→ Confirmación: "Tu solicitud fue enviada. Te contactaremos pronto."
→ Ticket visible en historial de soporte con estado "Abierto"
```

---

## Criterios de Aceptación — Soporte

```gherkin
Scenario: Navegar FAQs
  Given un usuario en la sección de soporte
  When hace clic en una pregunta
  Then el contenido se expande / colapsa

Scenario: Ticket desde menú
  Given un usuario en soporte sin contexto
  When completa y envía el formulario
  Then se crea el ticket y ve confirmación
  And el ticket aparece en su historial con estado "Abierto"

Scenario: Ticket desde detalle de solicitud
  Given un usuario en el detalle de la solicitud #11751
  When hace clic en "Soporte"
  Then el formulario abre con la referencia "#11751" pre-llenada

Scenario: Ticket desde detalle de desembolso
  Given un usuario en el detalle del desembolso #620
  When hace clic en "Soporte"
  Then el formulario abre con la referencia "#620" pre-llenada
```

---

## Impacto en Schema

### `support_tickets`

Tabla ya referenciada en HU-SR07 — se confirma el campo adicional `partner_id` para tickets del portal partner.

Campos mínimos:

| Campo | Tipo | Notas |
|---|---|---|
| `id` | bigint PK | |
| `created_by_type` | varchar | `'SR'` \| `'cliente'` \| `'partner_ops'` |
| `created_by_id` | bigint | `users.id` |
| `partner_id` | bigint FK nullable | `partners.id` — para tickets de partner_ops |
| `type` | varchar | Tipo de solicitud |
| `reference_type` | varchar nullable | `'loan_request'` \| `'disbursement'` \| etc. |
| `reference_id` | varchar nullable | ID de la referencia |
| `description` | text | |
| `status` | varchar | `'open'` \| `'in_progress'` \| `'resolved'` |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

> ⚠️ **Requiere confirmación de Freddy** — alinear con la tabla definida en HU-SR07 para que sea una sola tabla unificada.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Cambio de email | Requiere flujo de verificación en Cognito — no es un simple UPDATE en DB |
| Cambio de contraseña | Usa `ChangePassword` de Cognito con la contraseña actual como validación |
| FAQs | Texto estático en frontend v1 |
| Tickets | Gestionados por el equipo de Platam desde backoffice (épica pendiente) |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-P01 (Login) | Requiere sesión activa |
| HU-SR07 (Soporte SR) | Mismo patrón de tickets — tabla `support_tickets` compartida |
| HU-C09 (Parámetros globales) | Email de soporte parametrizado |
