
# HU-SR01 — Login · Portal Sales Reps

**Épica:** epic-04-portal-sales-reps  
**Actor:** Sales Representative (SR)  
**Última actualización:** Marzo 2026  
**Estado:** En revisión

---

## Contexto

Los Sales Reps son vendedores de los partners — perfil no nativo digital, 
familiarizados con WhatsApp. En la plataforma actual operan a través de un 
bot de WhatsApp y landing pages abiertas. Con este portal acceden a las 
mismas funcionalidades más nuevas capacidades, desde una interfaz web.

**Llave de identidad actual:** número de celular (el bot valida por número).  
**Email:** campo existente en base de datos, pero ~90% de SRs migrados no lo tiene.

**Estrategia de migración:**
- Los links viejos (landing pages abiertas) redirigen al nuevo portal.
- El bot de WhatsApp presenta el link al portal cuando aplique.
- Los SRs existentes no necesitan ninguna acción previa — acceden con su 
  número de celular desde el día 1.

---

## Historia de Usuario

**Como** Sales Rep de un partner,  
**quiero** acceder al portal ingresando mi número de celular y confirmando 
un código enviado por SMS,  
**para** gestionar mis clientes y solicitudes de préstamo de forma segura 
sin necesitar recordar contraseñas.

---

## Flujo Principal — Primer acceso / acceso regular

```
1. SR llega al portal
   (directo, desde link del bot, o redirigido desde URL vieja)

2. Pantalla de login
   → Campo: número de celular (formato colombiano, ej. 300 123 4567)
   → Botón: "Recibir código"

3. Sistema valida que el número existe en sales_representatives
   → Si no existe: mensaje "Este número no está registrado.
     Contacta a tu coordinador."
   → Si existe y status ≠ activo: mensaje "Tu cuenta no está activa.
     Contacta a tu coordinador."

4. Cognito envía OTP de 6 dígitos por SMS
   → Pantalla: "Ingresa el código que enviamos al XXX XXX XXXX"
   → Campo OTP (6 dígitos, autofoco)
   → Enlace: "Reenviar código" (disponible después de 30s)
   → OTP válido por 10 minutos

5. SR ingresa OTP
   → Válido: sesión iniciada, redirige al dashboard del portal
   → Inválido: mensaje de error, permite reintentar (máx. 3 intentos)
   → Expirado: mensaje + opción de solicitar nuevo código

6. Sesión activa
   → JWT almacenado en memoria de sesión (no localStorage)
   → Duración: 8 horas de inactividad
   → Al expirar: redirige al login con mensaje "Tu sesión expiró"
```

---

## Flujo Alternativo — Reenvío y bloqueo

```
- Máx. 3 intentos de OTP inválido → cuenta bloqueada temporalmente (15 min)
  Mensaje: "Demasiados intentos. Espera 15 minutos e intenta de nuevo."

- Máx. 5 solicitudes de OTP en 1 hora → bloqueo de 1 hora
  Mensaje: "Has solicitado demasiados códigos. Intenta en 1 hora."
```

---

## Pantallas

### P1 — Ingreso de número
| Elemento | Detalle |
|---|---|
| Logo Platam | Centrado, sin co-branding en login |
| Título | "Ingresa tu número de celular" |
| Campo | Número celular, prefijo +57 fijo, teclado numérico en mobile |
| CTA | "Recibir código" (deshabilitado hasta 10 dígitos) |
| Nota | "Te enviaremos un código por SMS" |

### P2 — Verificación OTP
| Elemento | Detalle |
|---|---|
| Título | "Ingresa el código" |
| Subtítulo | "Lo enviamos al [número parcialmente oculto: 3** *** **67]" |
| Campo OTP | 6 cajas individuales, autofoco, teclado numérico |
| CTA | "Verificar" (se activa al completar 6 dígitos) |
| Enlace | "Reenviar código" (contador regresivo 30s visible) |
| Enlace | "Cambiar número" (vuelve a P1) |

---

## Criterios de Aceptación

```gherkin
Scenario: Login exitoso
  Given un SR con número registrado y estado activo
  When ingresa su número y el OTP correcto
  Then accede al dashboard del portal
  And la sesión dura máx. 8 horas de inactividad

Scenario: Número no registrado
  Given un número que no existe en sales_representatives
  When el SR lo ingresa y presiona "Recibir código"
  Then ve el mensaje "Este número no está registrado"
  And NO se envía ningún SMS

Scenario: SR inactivo
  Given un SR con status ≠ activo
  When ingresa su número
  Then ve el mensaje "Tu cuenta no está activa"
  And NO se envía ningún SMS

Scenario: OTP incorrecto 3 veces
  Given un SR que ingresó OTP inválido 3 veces
  Then la cuenta se bloquea 15 minutos
  And ve el tiempo de espera restante

Scenario: Sesión expirada
  Given una sesión inactiva por más de 8 horas
  When el SR intenta navegar
  Then es redirigido al login con mensaje de sesión expirada
```

---

## Impacto en Schema

### `users` — cambio requerido
El campo `email` actualmente es `NOT NULL`. Los SRs migrados no tienen email.

```sql
-- Hacer email nullable para soportar usuarios sin correo
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
```

> ⚠️ **Requiere confirmación de Freddy antes de aplicar en producción.**  
> Verificar que no haya constraints o validaciones en aplicación que asuman email siempre presente.

### `sales_representatives` — sin cambios
El número de celular se resuelve a través de `users.phone`.  
⚠️ Este campo no existe aún en `UserEntity` — ver SCHEMA_PENDIENTE_LORENA.md ítem 13.  
El `cognito_sub` ya es nullable en el schema actual.

---

## Consideraciones Técnicas

| Tema | Decisión |
|---|---|
| Proveedor auth | AWS Cognito — OTP por SMS nativo |
| Sin WhatsApp en login | Deliberado — SMS es más universal y no requiere workaround |
| Email no requerido | Email sigue siendo opcional; se puede capturar después en perfil |
| Bot coexiste | Bot de WhatsApp no se ve afectado por esta historia |
| 2FA adicional | No aplica — OTP por SMS es el factor único |

---

## Dependencias

| Historia | Relación |
|---|---|
| HU-02, HU-04 | Requieren sesión activa del SR — dependen de esta HU |
| HU-C01, HU-C02 | Ídem |
| HU-B05 (Gestión de SRs) | El SR debe existir y estar activo en backoffice antes de poder hacer login |

---

## Notas Abiertas

- **Recuperación por SR sin número activo:** si el SR cambia de número, 
  el flujo de actualización queda pendiente para una historia de perfil (HU-SR0X).
- **Notificación al SR de activación:** cuando Platam o el partner crea un SR 
  nuevo en backoffice, ¿se le envía un mensaje de bienvenida con el link al portal? 
  Pendiente de definir en HU-B05 o historia de activación SR.
