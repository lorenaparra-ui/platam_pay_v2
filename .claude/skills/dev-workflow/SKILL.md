---
name: dev-workflow
description: Comandos para correr el proyecto localmente, ejecutar tests, migraciones de base de datos, linting y build. Usar cuando se necesita saber cómo arrancar un microservicio específico, correr migraciones, ejecutar tests de un módulo, o hacer build para producción.
---

# Dev Workflow — Platam Pay V2

## Prerrequisitos

Requiere un `.env` en la raíz del monorepo. Copiar de `.env.example` y completar:
- Credenciales AWS (IAM key/secret o SSO profile)
- IDs de Cognito pool y cliente
- URLs de colas SQS
- Buckets S3
- API keys externas (Twilio, Resend, ZapSign)
- Para dev local: `LOCALSTACK_ENDPOINT=http://localhost:4566`

## Arrancar microservicios en modo desarrollo (watch)

```bash
# Desde la raíz del monorepo
npm run start:transversal-ms:dev    # Puerto 8080
npm run start:suppliers-ms:dev      # Puerto 8081
npm run start:products-ms:dev       # Puerto 8083
npm run start:contracts-ms:dev      # Puerto 8084
npm run start:notifications-ms:dev
```

## Arrancar con Docker Compose (entorno completo)

```bash
# Levantar PostgreSQL + todos los microservicios
docker compose up

# Solo la base de datos (para desarrollo local de servicios sin Docker)
docker compose up postgres

# Reconstruir imágenes tras cambios
docker compose up --build
```

## LocalStack (SQS local)

```bash
# Inicializar LocalStack con las colas SQS
npm run localstack:sqs:init
```

## Base de Datos y Migraciones

El CLI de TypeORM está centralizado en el workspace `database/`.

```bash
# Ver migraciones pendientes
npm run migration:show

# Ejecutar migraciones pendientes
npm run migration:run

# Revertir la última migración
npm run migration:revert

# Generar nueva migración (desde database/)
cd database
npx typeorm migration:generate src/migrations/{timestamp}-{NombreMigracion} -d src/data-source.ts
```

Convención de nombres de migración: `{timestamp}-{DescripcionPascalCase}`, ej:
`1770000000000-PartnerCreateUserSqsIdempotency`

## Tests

```bash
# Correr todos los tests
npm test

# Tests de un microservicio específico
npm test -- --testPathPattern=apps/transversal-ms

# Tests de un módulo específico
npm test -- --testPathPattern=create-role.use-case

# Tests en modo watch
npm test -- --watch

# Coverage
npm test -- --coverage
```

Los tests están en archivos `*.spec.ts` junto a su implementación.

## Build para producción

```bash
# Build de un microservicio con webpack
cd apps/transversal-ms && npm run build
# Equivalente desde raíz:
npx nest build transversal-ms --builder webpack

# Build de todos (no hay script unificado — correr por servicio)
```

## Linting y Formato

```bash
# Lint
npx eslint "apps/**/*.ts" "libs/**/*.ts"

# El proyecto usa ESLint + TypeScript — no hay Prettier configurado
# Seguir el estilo de código existente al editar
```

## Agregar Dependencias

```bash
# Dependencia de producción en el workspace raíz
npm install <paquete>

# Dependencia solo para un microservicio específico
# (raras veces — la mayoría se instala en el root)
cd apps/transversal-ms && npm install <paquete>
```

**Nota:** Es un monorepo npm workspaces. Las dependencias compartidas van en el `package.json` raíz.

## Variables de Entorno Clave

| Variable | Descripción |
|----------|-------------|
| `AWS_PROFILE` | Perfil AWS SSO para desarrollo |
| `COGNITO_POOL_ID` | Pool de Cognito para autenticación |
| `TRANSVERSAL_MS_PORT` | Puerto del servicio (default 8080) |
| `LOCALSTACK_ENDPOINT` | `http://localhost:4566` en dev local |
| `DATABASE_URL` | Conexión PostgreSQL |
| `ZAPSIGN_API_TOKEN` | API de firma electrónica |
