# HU-P01 — Login · Portal Partner

**Épica:** epic-06-portal-partner  
**Actor:** Usuario operativo del partner  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`partners.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

El portal de partners (`partners.platam.co`) es el canal self-service donde el equipo operativo de un partner gestiona sus clientes, solicitudes, desembolsos y equipo de SRs.

**Llave de identidad:** email + contraseña vía AWS Cognito.  
Este esquema es deliberado para compatibilidad con el portal actual — los usuarios existentes ya tienen credenciales email/contraseña en Cognito y no requieren ninguna acción de migración.

Los usuarios del portal partner son creados por Platam desde el backoffice (no hay autoregistro). Un partner puede tener múltiples usuarios operativos, todos bajo el mismo `partner_id`.

---

## Historia de Usuario

**Como** usuario operativo de un partner,  
**quiero** acceder al portal con mi email y contraseña,  
**para** gestionar clientes, solicitudes y mi equipo de forma segura, sin interrumpir el acceso que ya tenía.

---

## Flujo Principal

```
1. Usuario llega a partners.platam.co

2. Pantalla de login
   → Campo: email
   → Campo: contraseña (con toggle mostrar/ocultar)
   → Botón: "Ingresar"
   → Enlace: "¿Olvidaste tu contraseña?"

3. Sistema valida credenciales contra Cognito
   → Credenciales inválidas: "Email o contraseña incorrectos."
     (mensaje genérico — no especifica cuál campo falló)
   → Usuario inactivo: "Tu cuenta no está activa. Contacta a tu coordinador en Platam."
   → Tras 5 intentos fallidos consecutivos: cuenta bloqueada temporalmente (15 min)
     Mensaje: "Demasiados intentos. Espera 15 minutos e intenta de nuevo."

4. Login exitoso
   → Sesión iniciada, redirige a la lista de solicitudes de préstamo (pantalla home)
   → JWT en memoria de sesión (no localStorage)
   → Duración: 8 horas de inactividad
   → Al expirar: redirige al login con "Tu sesión expiró. Ingresa de nuevo."
```

---

## Flujo Alternativo — Recuperación de contraseña

```
1. Usuario presiona "¿Olvidaste tu contraseña?"

2. Pantalla: ingresa tu email
   → Campo: email
   → Botón: "Enviar enlace"

3. Sistema valida que el email existe en users con role = partner
   → Si existe: Cognito envía email con enlace de restablecimiento (válido 24h)
     Mensaje: "Si el email está registrado, recibirás un enlace en los próximos minutos."
   → Si no existe: mismo mensaje (no revelar si el email está o no registrado)

4. Usuario sigue el enlace del correo
   → Pantalla: nueva contraseña + confirmar contraseña
   → Validaciones: mínimo 8 caracteres, al menos una mayúscula y un número
   → Botón: "Restablecer contraseña"

5. Restablecimiento exitoso
   → Mensaje: "Contraseña actualizada. Ya puedes ingresar."
   → Redirige a login
```

---

## Pantallas

### P1 — Login

| Elemento | Detalle |
|---|---|
| Logo | Platam centrado. Sin co-branding |
| Título | "Bienvenido" |
| Subtítulo | "Ingresa con tu email y contraseña" |
| Campo 1 | Email (tipo email, teclado email en mobile) |
| Campo 2 | Contraseña (tipo password, toggle mostrar/ocultar) |
| CTA | "Ingresar" (activo siempre; validación al enviar) |
| Enlace | "¿Olvidaste tu contraseña?" |

### P2 — Recuperación de contraseña

| Elemento | Detalle |
|---|---|
| Título | "Recupera tu contraseña" |
| Campo | Email |
| CTA | "Enviar enlace" |
| Enlace | "Volver al login" |

### P3 — Nueva contraseña (desde enlace de correo)

| Elemento | Detalle |
|---|---|
| Título | "Crea una nueva contraseña" |
| Campo 1 | Nueva contraseña |
| Campo 2 | Confirmar contraseña |
| Indicador | Requisitos de contraseña (inline, no modal) |
| CTA | "Restablecer contraseña" |

---

## Criterios de Aceptación

```gherkin
Scenario: Login exitoso
  Given un usuario partner con email registrado, contraseña correcta y estado activo
  When ingresa sus credenciales y presiona "Ingresar"
  Then accede al portal en la pantalla de solicitudes de préstamo
  And la sesión dura máx. 8 horas de inactividad

Scenario: Credenciales inválidas
  Given un usuario que ingresa email o contraseña incorrectos
  When presiona "Ingresar"
  Then ve el mensaje "Email o contraseña incorrectos"
  And permanece en la pantalla de login

Scenario: 5 intentos fallidos
  Given un usuario que falla 5 veces consecutivas
  Then la cuenta se bloquea 15 minutos
  And ve el tiempo de espera restante

Scenario: Usuario inactivo
  Given un usuario con status ≠ activo en users
  When ingresa sus credenciales correctas
  Then ve el mensaje de cuenta inactiva
  And NO se inicia sesión

Scenario: Recuperación de contraseña — email registrado
  Given un usuario que solicita recuperación con email registrado
  Then recibe un correo con enlace válido por 24 horas
  And el mensaje en pantalla no confirma ni niega si el email existe

Scenario: Sesión expirada
  Given una sesión inactiva por más de 8 horas
  When el usuario intenta navegar
  Then es redirigido al login con mensaje de sesión expirada
```

---

## Impacto en Schema

Sin cambios de schema requeridos. Los usuarios del portal partner se resuelven desde `users` con el `role_id` correspondiente al rol partner. El `cognito_sub` ya es nullable en el schema actual.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Proveedor auth | AWS Cognito — email + contraseña nativo |
| Migración | Lambda migration trigger: al primer login de un usuario que no existe en Cognito, una Lambda valida la contraseña contra el hash exportado en la tabla temporal `partner_users_wp_migration` (campos: `email`, `wp_password_hash`, `migrated_at`) y lo crea en Cognito. Al migrar exitosamente se marca `migrated_at`. La DB WordPress puede apagarse desde el día 1. Tras un periodo de gracia (ej. 30 días), los registros sin `migrated_at` reciben reset forzado por correo y la tabla se elimina. ⚠️ Requiere implementación por Freddy: export de hashes + Lambda phpass + cleanup. |
| Co-branding | Ninguno — 100% marca Platam |
| Sin OTP | Deliberado — compatibilidad con portal actual y perfil técnico del usuario operativo |
| Primer acceso nuevo usuario | Platam crea el usuario desde backoffice; Cognito envía email de bienvenida con enlace para establecer contraseña (flujo nativo Cognito "force change password") |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-P02 (Solicitudes) | Requiere sesión activa — es la pantalla destino post-login |
| HU-P06 (Rep. de Ventas) | Los usuarios operativos del portal son creados por Platam en backoffice antes de poder hacer login |
