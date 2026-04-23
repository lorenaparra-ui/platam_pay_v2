# HU-CL01 — Login · Portal Clientes

**Épica:** epic-05-portal-clientes  
**Actor:** Cliente (PN o PJ — en PJ actúa el representante legal)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

> ⚠️ **Nota:** Las URLs y dominios usados en este documento (`clientes.platam.co`, etc.) son ejemplos de referencia. Los dominios finales se definen en una etapa posterior.

El portal de clientes (`clientes.platam.co`) es el canal self-service donde 
el cliente gestiona su línea de crédito, préstamos y perfil. Es 100% marca 
Platam — sin co-branding de partner.

La llave de identidad del cliente es su número de celular, registrado en 
`users.phone` durante el onboarding. El flujo de autenticación es idéntico 
al del portal de Sales Reps (HU-SR01): OTP por SMS vía AWS Cognito.

> En caso de PJ, el número corresponde al representante legal registrado.

---

## Historia de Usuario

**Como** cliente de Platam,  
**quiero** acceder al portal ingresando mi número de celular y confirmando 
un código enviado por SMS,  
**para** consultar y gestionar mi línea de crédito sin necesitar contraseña.

---

## Flujo Principal

```
1. Cliente llega a clientes.platam.co

2. Pantalla de login
   → Campo: número de celular
   → Botón: "Recibir código"

3. Sistema valida que el número existe en users con role = cliente
   → Si no existe: "Este número no está registrado. 
     Si tienes una solicitud en curso, accede por el 
     enlace que te enviamos."
   → Si existe y status = pending: ver Flujo Alternativo A
   → Si existe y status = blocked: "Tu cuenta está bloqueada. 
     Escríbenos a soporte@platam.co"

4. Cognito envía OTP de 6 dígitos por SMS
   → Pantalla: "Ingresa el código que enviamos al [número parcial]"
   → Campo OTP (6 dígitos, autofoco)
   → "Reenviar código" disponible después de 30s
   → OTP válido por 10 minutos

5. Cliente ingresa OTP
   → Válido: sesión iniciada → redirige al dashboard
   → Inválido: mensaje de error, permite reintentar (máx. 3 intentos)
   → Expirado: mensaje + opción de solicitar nuevo código

6. Sesión activa
   → JWT en memoria de sesión (no localStorage)
   → Duración: 8 horas de inactividad
   → Al expirar: redirige al login con "Tu sesión expiró"
```

---

## Flujo Alternativo A — Cliente con solicitud en curso (status = pending)

Un cliente puede intentar acceder al portal mientras su solicitud de crédito 
aún está en evaluación o pendiente de aprobación.

```
→ Se permite el login con OTP normalmente
→ Tras autenticarse, el portal muestra una pantalla de estado reducida:
  - Estado actual de su solicitud (en estudio / aprobada / rechazada)
  - Mensaje de orientación según el estado
  - Sin acceso a las demás secciones del portal
```

> Esto evita que el cliente quede sin respuesta si intenta acceder antes 
> de tener línea activa.

---

## Flujo Alternativo B — Reenvío y bloqueo

```
- Máx. 3 OTPs inválidos → bloqueo temporal 15 min
  Mensaje: "Demasiados intentos. Espera 15 minutos e intenta de nuevo."

- Máx. 5 solicitudes de OTP en 1 hora → bloqueo de 1 hora
  Mensaje: "Has solicitado demasiados códigos. Intenta en 1 hora."
```

---

## Pantallas

### P1 — Ingreso de número

| Elemento | Detalle |
|---|---|
| Logo | Platam centrado. Sin co-branding |
| Título | "Ingresa tu número de celular" |
| Campo | Prefijo +57 fijo, teclado numérico en mobile |
| CTA | "Recibir código" (deshabilitado hasta 10 dígitos) |
| Nota | "Te enviaremos un código por SMS" |

### P2 — Verificación OTP

| Elemento | Detalle |
|---|---|
| Título | "Ingresa el código" |
| Subtítulo | "Lo enviamos al [número parcial: 3** *** **67]" |
| Campo OTP | 6 cajas individuales, autofoco, teclado numérico |
| CTA | "Verificar" (activo al completar 6 dígitos) |
| Enlace | "Reenviar código" (contador regresivo 30s) |
| Enlace | "Cambiar número" (vuelve a P1) |

### P3 — Estado de solicitud (solo clientes pending)

| Elemento | Detalle |
|---|---|
| Ícono de estado | Visual según estado de la solicitud |
| Título | Según estado (ver tabla abajo) |
| Mensaje | Orientación sobre qué esperar |
| CTA secundario | "¿Tienes dudas? Escríbenos" → abre WhatsApp soporte |

| Estado solicitud | Título | Mensaje |
|---|---|---|
| `en_estudio` | "Tu solicitud está en evaluación" | "Nuestro equipo está revisando tu información. Te contactaremos pronto." |
| `aprobada` | "¡Tu línea de crédito fue aprobada!" | "Pronto recibirás instrucciones para activarla." |
| `rechazada` | "Tu solicitud no fue aprobada" | "Puedes contactarnos si tienes preguntas." |
| `pendiente_autorizacion` | "Falta tu autorización" | "Revisa el mensaje que te enviamos por WhatsApp o correo para continuar." |

---

## Criterios de Aceptación

```gherkin
Scenario: Login exitoso — cliente activo
  Given un cliente con número registrado y status activo
  When ingresa su número y el OTP correcto
  Then accede al dashboard del portal
  And la sesión dura máx. 8 horas de inactividad

Scenario: Login exitoso — cliente pending
  Given un cliente con número registrado y status pending
  When ingresa su número y el OTP correcto
  Then ve la pantalla de estado de su solicitud
  And NO tiene acceso a las demás secciones

Scenario: Número no registrado
  Given un número que no existe en users con role cliente
  When el cliente lo ingresa y presiona "Recibir código"
  Then ve el mensaje correspondiente
  And NO se envía ningún SMS

Scenario: Cuenta bloqueada
  Given un cliente con status = blocked
  When ingresa su número
  Then ve el mensaje de cuenta bloqueada
  And NO se envía ningún SMS

Scenario: OTP incorrecto 3 veces
  Given un cliente que ingresó OTP inválido 3 veces
  Then la cuenta se bloquea 15 minutos
  And ve el tiempo de espera restante

Scenario: Sesión expirada
  Given una sesión inactiva por más de 8 horas
  When el cliente intenta navegar
  Then es redirigido al login con mensaje de sesión expirada
```

---

## Impacto en Schema

El número de celular se resuelve desde `users.phone`.  
⚠️ Este campo no existe aún en `UserEntity` — ver SCHEMA_PENDIENTE_LORENA.md ítem 13.  
El `role_id` distingue clientes de SRs y admins.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Proveedor auth | AWS Cognito — OTP por SMS nativo |
| Co-branding | Ninguno — 100% marca Platam |
| Clientes PJ | Autentican con el número del representante legal |
| Bot WhatsApp coexiste | Sin cambios — el portal es canal adicional, no reemplazo |
| 2FA adicional | No aplica — OTP por SMS es el factor único |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-01 a HU-04 | El cliente debe existir en `users` tras el onboarding |
| HU-CL02 (Dashboard) | Depende de esta HU — requiere sesión activa |
| HU-SR01 | Referencia de implementación — mismo patrón de auth |
