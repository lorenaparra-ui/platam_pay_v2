# HU-B01 — Login del Equipo Platam (Backoffice)

**Épica:** epic-02-backoffice-admin  
**Roles:** Admin, Analista  
**Última actualización:** Febrero 2026  
**Estado:** En revisión

---

## Historia de Usuario

**Como** miembro del equipo Platam (Admin o Analista),  
**quiero** autenticarme en el backoffice con mi correo corporativo y Google Authenticator,  
**para** acceder de forma segura a las herramientas de gestión interna.

---

## Contexto

El backoffice tiene su propio User Pool en Cognito, completamente separado del pool de clientes, partners y Sales Reps. La URL de acceso es exclusiva y no está enlazada desde ninguna landing pública.

```
https://admin.platampay.com
```

---

## Flujo de Login

```
Usuario ingresa email + contraseña →
Cognito valida credenciales →
Sistema solicita código TOTP (Google Authenticator) →
Cognito valida TOTP →
Redirect al dashboard según rol (Admin o Analista)
```

---

## Pantalla de Login

| Elemento | Detalle |
|---|---|
| Campo email | Formato válido, requerido |
| Campo contraseña | Requerido, enmascarado |
| Botón "Ingresar" | Dispara el flujo de autenticación |
| Sin enlace "¿Olvidaste tu contraseña?" | Recovery lo gestiona el equipo de desarrollo |
| Sin opción de registro | Los usuarios los crea el Admin desde el backoffice |
| Branding | Logo Platam, diseño interno — sin co-branding de partners |

---

## Pantalla de 2FA

Aparece tras validar email + contraseña exitosamente.

| Elemento | Detalle |
|---|---|
| Campo código TOTP | 6 dígitos, requerido |
| Instrucción | *"Ingresa el código de Google Authenticator"* |
| Sin opción de omitir | 2FA obligatorio para todos los usuarios |

---

## Seguridad (Implementación)

| Configuración | Detalle |
|---|---|
| User Pool | Exclusivo para equipo Platam |
| Username | Solo email corporativo |
| 2FA | TOTP obligatorio (Google Authenticator) |
| Password policy | Mín. 12 caracteres, mayúsculas, números y símbolos |
| Bloqueo | 5 intentos fallidos bloquean la cuenta |
| Advanced Security | Cognito Advanced Security en modo Enforced |
| Adaptive auth | Bloqueo o re-auth ante IP/dispositivo nuevo o comportamiento anómalo |
| Access token | 1 hora |
| Refresh token | 8 horas |
| Recordar dispositivo | Deshabilitado |
| Recovery | Solo por Admin del pool vía consola/CLI — sin self-service |

---

## Logs y Alertas (CloudWatch)

**Eventos logueados:**
- Login exitoso (usuario, timestamp, IP, dispositivo)
- Intento fallido (usuario, timestamp, IP)
- Bloqueo de cuenta
- Validación 2FA fallida
- Cambio de contraseña

**Alertas automáticas vía CloudWatch + SNS:**
- +3 intentos fallidos en 5 minutos desde la misma IP
- Login fuera de horario laboral (7am–8pm hora Colombia)
- Acceso desde dispositivo no reconocido

---

## Manejo de Errores

| Escenario | Mensaje al usuario |
|---|---|
| Email o contraseña incorrectos | *"Credenciales incorrectas"* — sin especificar cuál falla (seguridad) |
| Cuenta bloqueada | *"Tu cuenta ha sido bloqueada. Contacta al equipo de desarrollo"* |
| Código TOTP inválido | *"Código incorrecto. Verifica Google Authenticator e intenta de nuevo"* |
| Sesión expirada | Redirect automático al login con mensaje *"Tu sesión ha expirado"* |

---

## Criterios de Aceptación

- [ ] El login solo es accesible en `admin.platampay.com`, sin vínculos desde landings públicas
- [ ] El username acepta únicamente formato email
- [ ] El 2FA con Google Authenticator es obligatorio — no se puede omitir
- [ ] Tras 5 intentos fallidos la cuenta queda bloqueada
- [ ] Los mensajes de error no revelan si el fallo fue en email o contraseña
- [ ] Todos los eventos de autenticación quedan en CloudWatch Logs
- [ ] Las alertas de CloudWatch se disparan ante los eventos definidos
- [ ] Tras login exitoso el redirect es al dashboard correspondiente según rol
- [ ] La sesión expira tras 1 hora de inactividad del access token
- [ ] No existe flujo de recuperación de contraseña en la interfaz
