# Guia Operativa: Cognito + Auth Backoffice (OTP)

## Objetivo
Documentar comandos y flujo de prueba para:
- Crear y preparar usuarios en AWS Cognito.
- Configurar MFA TOTP (Google Authenticator).
- Probar los endpoints de autenticacion del modulo `auth` en `platam_pay_users`.
- Diagnosticar errores comunes.

Esta guia esta alineada con el modulo `auth` actual:
- `POST /auth/login`
- `POST /auth/login/totp`
- `POST /auth/mfa/setup`
- `POST /auth/mfa/verify`

---

## Parametros base usados en esta guia

```bash
REGION=us-east-2
USER_POOL_ID=us-east-2_Nx4vYRz63
APP_CLIENT_ID=k2fca9hhf0he0tadlhfcj7ntj
USERNAME=freddy@platampay.com
```

Si usas perfil AWS:

```bash
AWS_PROFILE=<tu_perfil>
```

---

## Prerrequisitos

- AWS CLI autenticado con permisos sobre Cognito.
- User Pool existente en `us-east-2`.
- App client configurado (en este caso `platam_pay_v2`).
- En backend:
  - `COGNITO_REGION`
  - `COGNITO_USER_POOL_ID`
  - `COGNITO_CLIENT_ID`
  - `COGNITO_CLIENT_SECRET`

---

## Comandos utiles para inspeccion general de Cognito

### Ver configuracion MFA del user pool

```bash
aws cognito-idp get-user-pool-mfa-config \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63
```

### Ver detalle del user pool

```bash
aws cognito-idp describe-user-pool \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63
```

### Ver detalle del app client

```bash
aws cognito-idp describe-user-pool-client \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --client-id k2fca9hhf0he0tadlhfcj7ntj
```

### Listar usuarios

```bash
aws cognito-idp list-users \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63
```

### Buscar usuario por email

```bash
aws cognito-idp list-users \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --filter "email = \"freddy@platampay.com\""
```

### Ver estado y MFA de un usuario

```bash
aws cognito-idp admin-get-user \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --username freddy@platampay.com
```

---

## Crear usuario y preparar acceso

### 1) Crear usuario (sin enviar correo automatico)

```bash
aws cognito-idp admin-create-user \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --username freddy@platampay.com \
  --user-attributes Name=email,Value=freddy@platampay.com Name=email_verified,Value=true \
  --message-action SUPPRESS
```

### 2) Definir contrasena permanente (comando solicitado)

```bash
aws cognito-idp admin-set-user-password \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --username freddy@platampay.com \
  --password 'Freddy12345#' \
  --permanent
```

### 3) Validar estado del usuario

```bash
aws cognito-idp admin-get-user \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --username freddy@platampay.com
```

Esperado:
- `Enabled: true`
- `UserStatus: CONFIRMED`
- `email_verified: true`

### 4) (Opcional) Marcar MFA TOTP como preferido en usuario

Si ya tienes un `accessToken` valido del usuario:

```bash
aws cognito-idp set-user-mfa-preference \
  --region us-east-2 \
  --access-token "<ACCESS_TOKEN>" \
  --software-token-mfa-settings Enabled=true,PreferredMfa=true
```

---

## Configurar MFA TOTP en el pool

Si aparece error `SoftwareTokenMFANotFoundException`, habilita TOTP en el pool:

```bash
aws cognito-idp set-user-pool-mfa-config \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --mfa-configuration ON \
  --software-token-mfa-configuration Enabled=true
```

Nota:
- `ON` exige MFA para todos los usuarios.
- `OPTIONAL` permite coexistencia temporal durante migracion.

---

## Flujo de prueba de endpoints (configuracion actual)

Base URL ejemplo:

```bash
http://localhost:3000
```

### Endpoint 1: `POST /auth/login`

Payload:

```json
{
  "email": "freddy@platampay.com",
  "password": "Freddy12345#"
}
```

Posibles respuestas:
- `AUTHENTICATED`: entrega tokens directamente.
- `MFA_REQUIRED`: requiere `session` para `/auth/login/totp`.
- `MFA_SETUP_REQUIRED`: requiere completar setup con `/auth/mfa/setup`.
- `PASSWORD_CHANGE_REQUIRED`: requiere cambio de contrasena en Cognito.

---

### Endpoint 2: `POST /auth/mfa/setup`

Se usa solo si `login` retorna `MFA_SETUP_REQUIRED`.

Payload:

```json
{
  "session": "<SESSION_DE_LOGIN>"
}
```

Respuesta esperada:

```json
{
  "secretCode": "JBSWY3DPEHPK3PXP",
  "session": "<SESSION_ACTUALIZADA>"
}
```

Accion:
- Registrar `secretCode` en Google Authenticator/Authy (TOTP tiempo).

---

### Endpoint 3: `POST /auth/mfa/verify`

Finaliza challenge `MFA_SETUP` y debe devolver tokens JWT.

Payload:

```json
{
  "email": "freddy@platampay.com",
  "session": "<SESSION_DEVUELTA_EN_MFA_SETUP>",
  "totpCode": "123456"
}
```

Respuesta esperada:
- Tokens (`accessToken`, `idToken`, `refreshToken`, `expiresIn`, `tokenType`).

---

### Endpoint 4: `POST /auth/login/totp`

Se usa cuando `login` retorna `MFA_REQUIRED`.

Payload:

```json
{
  "email": "freddy@platampay.com",
  "session": "<SESSION_DE_LOGIN>",
  "totpCode": "123456"
}
```

Respuesta esperada:
- Tokens JWT de autenticacion completa.

---

## Comprobacion de MFA habilitada en usuario

```bash
aws cognito-idp admin-get-user \
  --region us-east-2 \
  --user-pool-id us-east-2_Nx4vYRz63 \
  --username freddy@platampay.com
```

Campos clave:
- `UserMFASettingList` incluye `SOFTWARE_TOKEN_MFA`.
- `PreferredMfaSetting` idealmente `SOFTWARE_TOKEN_MFA`.

---

## Troubleshooting

### 1) `500 No fue posible completar la autenticacion`
Causa probable:
- Challenge no esperado o estado intermedio en Cognito.

Acciones:
- Revisar respuesta de `/auth/login` (status/challengeName/session).
- Validar estado de usuario con `admin-get-user`.
- Confirmar pool y app client correctos.

### 2) `SoftwareTokenMFANotFoundException`
Causa:
- TOTP no habilitado a nivel user pool.

Accion:
- Ejecutar `set-user-pool-mfa-config` con `software-token-mfa-configuration Enabled=true`.

### 3) `User does not have delivery config set to turn on SOFTWARE_TOKEN_MFA`
Causa:
- Se intento activar preferencia MFA sin enrolar/verificar TOTP.

Accion:
- Completar flujo: `login` -> `mfa/setup` -> registrar en app -> `mfa/verify`.

### 4) `MFA_SETUP_REQUIRED` constante
Causa:
- Usuario no completo verificacion TOTP o app autenticadora no sincronizada.

Acciones:
- Repetir `mfa/setup` y `mfa/verify` con codigo vigente.
- Verificar hora del dispositivo (sin desfase).

### 5) `SESSION_EXPIRED` / `NotAuthorizedException` con session
Causa:
- Session de challenge vencida.

Accion:
- Repetir desde `POST /auth/login` para obtener nueva session.

### 6) `INVALID_TOTP`
Causa:
- Codigo TOTP incorrecto o fuera de ventana de tiempo.

Acciones:
- Usar codigo actual (6 digitos).
- Verificar reloj del celular.

### 7) `INVALID_CREDENTIALS`
Causa:
- Usuario/contrasena incorrectos o usuario no confirmado.

Acciones:
- Confirmar usuario con `admin-get-user`.
- Reaplicar `admin-set-user-password --permanent`.

---

## Buenas practicas de seguridad

- No versionar archivos `.env` con secretos reales.
- No compartir `accessToken`, `idToken`, `refreshToken` en tickets o chats.
- Rotar contrasenas de prueba despues de demos.
- Usar usuarios de testing separados de usuarios productivos.

