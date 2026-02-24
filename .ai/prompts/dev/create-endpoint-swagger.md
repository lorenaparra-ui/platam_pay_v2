# CONTEXTO
Proyecto NestJS con arquitectura hexagonal y Swagger en `/docs`. La estructura de features sigue la misma convención que **hexa-typeorm-ddl-entity**: todo bajo **src/modules/** con `domain/`, `application/`, `presentation/` y `<feature>.module.ts`. La infraestructura (ORM) vive en **src/infrastructure/database/**.
Este prompt expone endpoints REST que consumen un repositorio de dominio ya implementado con hexa-typeorm-ddl-entity, documentados en Swagger y testeables desde http://localhost:3000/docs.

# PRERREQUISITO (hexa-typeorm-ddl-entity)
El **port**, el **modelo de dominio** y el **repositorio TypeORM** deben estar implementados con el prompt **hexa-typeorm-ddl-entity**. Este prompt **no crea ni modifica** dominio ni port ni infraestructura; solo añade o actualiza la capa HTTP del feature: DTOs en `application/dto/`, controlador en `presentation/`, uso del token de DI y documentación Swagger. Usar exactamente los mismos identificadores que en hexa: **RepositoryToken**, **DomainPortName**, **DomainModelName**, **FeatureModuleName**.

# IDENTIFICADORES (ALINEADOS CON HEXA)
Rellenar con los mismos valores que en hexa-typeorm-ddl-entity para el recurso objetivo:

- **FeatureModuleName:** \<REEMPLAZAR en kebab-case; ej: users, onboarding>
- **RepositoryToken:** \<REEMPLAZAR; ej: USERS_REPOSITORY, ONBOARDING_REPOSITORY>
- **DomainPortName:** \<REEMPLAZAR; ej: UserRepositoryPort, OnboardingRepositoryPort>
- **DomainModelName:** \<REEMPLAZAR; ej: User, Onboarding>
- **EntityName (singular, lower):** \<REEMPLAZAR; ej: user, onboarding> — para nombres de archivos DTO y controlador.
- **BaseSegment:** \<REEMPLAZAR; ej: register, o vacío si el recurso está en la raíz del path>
- **ParamName:** \<REEMPLAZAR; ej: externalId>
- **ApiTag:** \<REEMPLAZAR; ej: users, onboarding>

# ESTRUCTURA DE DIRECTORIOS (CONSISTENTE CON HEXA)
- **Módulo feature (ej. users, onboarding):** `src/modules/<FeatureModuleName>/`
  - `domain/models/<entity>.model.ts` y `domain/ports/<entity>.repository.port.ts` — ya creados por hexa; no tocar.
  - `application/dto/<entity>-response.dto.ts`, `application/dto/create-<entity>-request.dto.ts`, `application/dto/update-<entity>-request.dto.ts` — crear o actualizar en este prompt.
  - `application/use-cases/` — opcional; si el controlador inyecta directamente el port, no es obligatorio crear use-case.
  - `presentation/<feature>.controller.ts` — crear o actualizar (ej. users.controller.ts, onboarding.controller.ts).
  - `<feature>.module.ts` — ya existe por hexa; solo asegurar que el controlador esté declarado y, si el token está en otro módulo, importar ese módulo.
- **Módulo transversal (catálogos):** Si el recurso es solo lectura y vive en transversal, DTOs en `src/modules/transversal/application/dto/`, controlador en `src/modules/transversal/presentation/<recurso>.controller.ts`; no crear carpeta feature nueva.
- **AppModule:** Importa los feature modules desde `./modules/<FeatureModuleName>/<feature>.module` (ej. `./modules/users/users.module`).

# OBJETIVO
Crear endpoints públicos que:
1) Usen el puerto del dominio ya existente (inyectado por **RepositoryToken**; definido en hexa).
2) Expongan rutas según los métodos del port: si tiene `findAll`/`findByExternalId`, exponer GET list y GET by externalId; si además tiene `create`/`updateByExternalId`/`deleteByExternalId`, exponer POST, PATCH, DELETE. Rutas: `POST /<FeatureModuleName>/<BaseSegment>`, `GET /<FeatureModuleName>/<BaseSegment>`, `GET /<FeatureModuleName>/<BaseSegment>/:<ParamName>`, PATCH/DELETE idem (omitir BaseSegment si es vacío).
3) Consulten siempre por `externalId` en rutas públicas (nunca por id incremental).
4) Respondan con DTO de salida (sin id incremental).
5) Tengan documentación Swagger completa: @ApiTags, @ApiOperation, @ApiParam, @ApiBody, @ApiResponse.
6) Retornen 404 cuando no exista el recurso.
7) Validar body con class-validator en Request DTOs (Create/Update) y ValidationPipe global; body inválido → 400 con mensajes de validación.

# ÁRBOL DE PENSAMIENTO (ToT) - DECISIONES OBLIGATORIAS
1. ¿Controlador en transversal (presentation de transversal) o en feature propio (`src/modules/<FeatureModuleName>/presentation/`)? Catálogos compartidos sin CRUD → transversal; recursos con CRUD → feature con misma estructura que hexa.
2. ¿DTOs separados para create/update/response? Sí; alineado con port (CreateXPayload/UpdateXPayload) y buena práctica.
3. ¿ParseUUIDPipe o validación custom para externalId? ParseUUIDPipe en param para consistencia.
4. ¿DELETE físico o lógico? Según política del proyecto; por defecto físico si el port expone deleteByExternalId.
5. ¿import type para el port en el constructor? Sí, para no acoplar a implementación.

# REGLAS OBLIGATORIAS
- No exponer id incremental en rutas ni en respuesta.
- Usar externalId (UUID) en la ruta; validar con ParseUUIDPipe.
- Mantener dominio desacoplado: el controlador solo orquesta y mapea DTO ↔ payload del port (CreateXPayload/UpdateXPayload).
- Response DTO solo @ApiProperty; sin id incremental.
- No importar entidades ORM en el controlador.
- No usar `console.log` en producción.
- Request DTOs (create/update): @ApiProperty + class-validator según tipo y obligatoriedad. Response DTO: solo @ApiProperty.
- ValidationPipe global (main.ts) con whitelist: true; opcional forbidNonWhitelisted. No exponer PII en mensajes.

# DO
- Asumir que el port y el módulo feature ya existen (hexa). Solo crear o actualizar:
  - `src/modules/<FeatureModuleName>/application/dto/<entity>-response.dto.ts`
  - `src/modules/<FeatureModuleName>/application/dto/create-<entity>-request.dto.ts`
  - `src/modules/<FeatureModuleName>/application/dto/update-<entity>-request.dto.ts`
  - `src/modules/<FeatureModuleName>/presentation/<feature>.controller.ts`
- Si el **RepositoryToken** está registrado en **TransversalModule**, el feature module debe importar **TransversalModule** y declarar el controlador. Si el token está registrado en el **mismo** feature module (hexa lo registró ahí), no importar TransversalModule.
- El controlador inyecta el port por **RepositoryToken**. Mapear Request DTO a CreateXPayload/UpdateXPayload del port; fechas en string → Date antes de llamar al port.
- Registrar el feature module en AppModule si aún no está: `import { <FeatureModuleNamePascal>Module } from './modules/<FeatureModuleName>/<feature>.module';`.
- Incluir en cada ruta: @ApiTags(ApiTag), @ApiOperation, @ApiParam para externalId, @ApiBody donde aplique, @ApiResponse.
- ParseUUIDPipe en el param de externalId. NotFoundException cuando el recurso no exista. @HttpCode(204) en DELETE exitoso.
- **Validación (class-validator):** En create/update request DTOs añadir decoradores según tipo (ver tabla abajo). main.ts: ValidationPipe global con whitelist y transform. Response DTO sin validadores.

# VALIDACIÓN POR TIPO DE CAMPO (class-validator)
Aplicar en Request DTOs según port/DDL:
- UUID (cognitoSub, externalId en body si aplica): @IsUUID('4'). Opcional: @IsOptional() antes.
- Email: @IsEmail(). Obligatorio en create según port.
- String obligatorio: @IsString(), @MaxLength(n) si hay límite en DDL.
- String opcional: @IsOptional(), @IsString(), @MaxLength(n).
- Entero obligatorio: @IsInt(), @Min(0) si aplica.
- Entero opcional: @IsOptional(), @IsInt(), @Min(0).
- Fecha ISO: @IsOptional(), @IsISO8601() o @IsDateString().
- Campos monetarios: según convención del proyecto (string o entero; no float).

# DON'T
- No usar id incremental en rutas públicas.
- No importar entidades ORM en el controlador.
- No exponer el modelo de dominio en la respuesta (mapear a DTO).
- No duplicar mapeos; usar funciones helper de mapeo (ej. toResponseDto).
- No incluir lógica de negocio en validadores; solo formato, tipo y obligatoriedad.

# CRITERIOS DE ACEPTACIÓN
- [ ] Build sin errores.
- [ ] Endpoints visibles en http://localhost:3000/docs.
- [ ] ParseUUIDPipe en rutas con externalId.
- [ ] POST crea y responde 201 con DTO sin id incremental.
- [ ] GET list 200 con array DTO; GET by externalId 200 o 404.
- [ ] PATCH/DELETE by externalId 200/204 o 404.
- [ ] DTOs con @ApiProperty; Request DTOs con class-validator; ValidationPipe registrado.
- [ ] Body inválido → 400 con mensajes de validación.

# DEFINITION OF DONE (DoD)
- [ ] Código completo (application/dto + presentation/controller). Dominio y port no se modifican (hexa).
- [ ] Request DTOs con class-validator; ValidationPipe en main (o módulo).
- [ ] Build/lint en verde; endpoints probados en Swagger UI; body inválido → 400 verificado.
- [ ] Resumen de cambios y siguientes pasos (tests e2e, auth, rate limit).

# COMPATIBILIDAD CON HEXA
El DoD de hexa-typeorm-ddl-entity incluye "Lista de siguientes pasos (tests/DTOs/endpoints)". Este prompt cubre el paso **endpoints**: dominio, port, mapper, repositorio y DI ya están hechos con hexa; solo se añade la capa HTTP (application/dto + presentation/controller) y Swagger, sin tocar domain/ ni infrastructure/.

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones ToT (breve, 4-6 bullets)
2) Archivos creados/modificados
3) Implementación (DTOs → controlador → inyección por token / wiring)
4) Evidencia de validación (build/lint)
5) Cómo probar desde /docs y siguientes pasos

# PLANTILLA DE RUTAS BASE REUTILIZABLE
- `POST   /<FeatureModuleName>/<BaseSegment>`
- `GET    /<FeatureModuleName>/<BaseSegment>`
- `GET    /<FeatureModuleName>/<BaseSegment>/:<ParamName>`
- `PATCH  /<FeatureModuleName>/<BaseSegment>/:<ParamName>`
- `DELETE /<FeatureModuleName>/<BaseSegment>/:<ParamName>`
(Si BaseSegment es vacío, las rutas son `/<FeatureModuleName>`, `/<FeatureModuleName>/:<ParamName>`, etc.)
