# CONTEXTO
Monorepo **platam-pay-v2**: NestJS + TypeScript + TypeORM, arquitectura hexagonal, **un solo `nest-cli.json` en la raíz** y aplicaciones bajo `apps/<microservicio>/`.

- Orquestación local: `docker-compose.yml` en raíz (si aplica al nuevo MS).
- Convención de features: `apps/<MS>/src/modules/<feature>/` con `domain/`, `application/`, `presentation/`.
- Infraestructura por MS: `apps/<MS>/src/infrastructure/` (TypeORM, SQS, storage, etc.).
- Entidades TypeORM compartibles: librerías `libs/*-data/` (no duplicar tablas entre libs).

Este prompt define la **plantilla de árbol de archivos** para incorporar un **nuevo microservicio** al monorepo, clonando la convención de un MS existente (recomendado: uno con perfil similar, p. ej. `notifications-ms` si no hay BD, o `transversal-ms` / `suppliers-ms` si hay TypeORM + SQS).

# OBJETIVO
1. Añadir proyecto de aplicación bajo `apps/<MicroserviceFolderName>/` siguiendo el patrón de los MS actuales.
2. Registrar el proyecto en `nest-cli.json` (raíz) y el workspace en `package.json` raíz (`"workspaces": ["apps/*", "database"]` ya incluye `apps/*`).
3. Añadir script de arranque en raíz: `start:<MicroserviceFolderName>:dev` → `npx nest start <MicroserviceFolderName> --watch --builder webpack` (mismo estilo que los MS existentes).
4. Actualizar `docker-compose.yml` solo si el nuevo servicio debe contenerrizarse igual que los demás.

# IDENTIFICADORES (REEMPLAZAR)
- **MicroserviceFolderName:** `<REEMPLAZAR>` — carpeta bajo `apps/`, kebab-case con sufijo `-ms` (ej: `risk-ms`).
- **NestProjectKey:** `<REEMPLAZAR>` — clave en `nest-cli.json` (coincidir con `MicroserviceFolderName` salvo decisión explícita).
- **ComposeServiceName:** `<REEMPLAZAR>` (ej: `risk-ms`)
- **ContainerName:** `<REEMPLAZAR>` (ej: `platam_risk_ms`)
- **SwaggerTitle:** `<REEMPLAZAR>`
- **DefaultHttpPort:** `<REEMPLAZAR>` (ej: `8090`; evitar colisiones con otros MS en `.env` / compose)

# ÁRBOL MÍNIMO ESPERADO (GENÉRICO)

```txt
<repo-root>/
├─ nest-cli.json                    (agregar bloque "NestProjectKey": { ... })
├─ package.json                     (script start:<MicroserviceFolderName>:dev)
├─ docker-compose.yml               (opcional: nuevo servicio)
└─ apps/<MicroserviceFolderName>/
   ├─ package.json
   ├─ tsconfig.json
   ├─ tsconfig.build.json
   └─ src/
      ├─ main.ts
      ├─ app.module.ts
      ├─ config/                    (app.config, dotenv, typeorm si aplica)
      ├─ infrastructure/
      │  ├─ infrastructure.module.ts   (@Global() si sigue patrón actual)
      │  └─ ...
      └─ modules/
         └─ <feature>/
            ├─ <feature>.module.ts
            ├─ domain/
            ├─ application/
            └─ presentation/
```

# REGLAS OBLIGATORIAS
- **No** crear un microservicio como carpeta suelta en la raíz (`platam_pay_*`); todo bajo `apps/<MicroserviceFolderName>/`.
- **TypeORM:** si el MS persiste en PostgreSQL, reutilizar el patrón `PostgresTypeOrmConfigService` + entidades en la lib `*-data` que corresponda al bounded context; `synchronize: false`; migraciones en `database/src/migrations/`.
- Prefijo global HTTP: en MS existentes suele usarse `app.setGlobalPrefix('api')`; mantener consistencia.
- Swagger en `/docs`, salvo que el MS sea solo consumidor SQS sin HTTP.
- Logger de NestJS; **no** `console.log` en producción.

# DO (PASOS DE IMPLEMENTACIÓN)
1. Copiar `apps/<ms-plantilla>/` → `apps/<MicroserviceFolderName>/` y renombrar `package.json`, imports, prefijos Swagger y puerto.
2. Añadir proyecto en `nest-cli.json` (copiar bloque de otro `*-ms`, ajustar `root` y `sourceRoot`).
3. Ajustar `tsconfig.json` paths del nuevo MS (`@modules/*`, `@infrastructure/*`, `@app/...-data` si aplica).
4. Registrar módulos en `app.module.ts`; si hay BD, cablear `InfrastructureModule` como en el MS plantilla.
5. Si aplica Docker: añadir servicio en `docker-compose.yml` (build context `apps/<MicroserviceFolderName>` o Dockerfile compartido según patrón del repo).

# DON'T
- No duplicar `nest-cli.json` dentro del app (la convención del monorepo es un solo archivo raíz).
- No hardcodear secretos ni credenciales.
- No crear entidades ORM duplicadas para la misma tabla en dos libs distintas.

# CRITERIOS DE ACEPTACIÓN
- [ ] `npx nest build <NestProjectKey>` compila.
- [ ] `npm run start:<MicroserviceFolderName>:dev` arranca en watch.
- [ ] Si expone HTTP: `/docs` y health según patrón del MS plantilla.

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones clave (BD sí/no, SQS sí/no, libs `*-data` a usar).  
2) Árbol de archivos (genérico + rutas concretas creadas).  
3) Archivos tocados en raíz (`nest-cli.json`, `package.json`, compose).  
4) Validación (build / smoke).  
5) Siguientes pasos: migración en `database/`, CI, observabilidad.
