# CONTEXTO
Proyecto NestJS con arquitectura hexagonal y Swagger en `/docs`.
Quiero exponer endpoints REST base (CRUD) que consuman un repositorio de dominio y sean testeables desde http://localhost:3000/docs.

# ENDPOINT OBJETIVO
- RepositoryToken: <REEMPLAZAR> (ej: ONBOARDING_REPOSITORY)
- DomainPortName: <REEMPLAZAR> (ej: OnboardingRepositoryPort)
- DomainModelName: <REEMPLAZAR> (ej: Onboarding)
- ControllerPath: <REEMPLAZAR> (ej: onboarding)
- BaseSegment: <REEMPLAZAR> (ej: register)
- ParamName: <REEMPLAZAR> (ej: externalId)
- ResponseDtoName: <REEMPLAZAR> (ej: OnboardingResponseDto)
- CreateDtoName: <REEMPLAZAR> (ej: CreateOnboardingRequestDto)
- UpdateDtoName: <REEMPLAZAR> (ej: UpdateOnboardingRequestDto)
- ApiTag: <REEMPLAZAR> (ej: onboarding)

# OBJETIVO
Crear endpoints públicos base que:
1) Use el puerto del dominio (inyectado por token).
2) Exponga rutas base:
   - POST `/ <ControllerPath>/<BaseSegment>`
   - GET `/ <ControllerPath>/<BaseSegment>`
   - GET `/ <ControllerPath>/<BaseSegment>/:<ParamName>`
   - PATCH `/ <ControllerPath>/<BaseSegment>/:<ParamName>`
   - DELETE `/ <ControllerPath>/<BaseSegment>/:<ParamName>`
3) Consulte siempre recurso público por `externalId` (nunca por id incremental).
4) Responda con DTO de salida (sin id incremental).
5) Tenga documentación Swagger completa: @ApiTags, @ApiOperation, @ApiParam, @ApiBody, @ApiResponse.
6) Retorne 404 cuando no exista el recurso.

# ÁRBOL DE PENSAMIENTO (ToT) - DECISIONES OBLIGATORIAS
Evalúa y decide brevemente (sin razonamiento largo):
1. ¿Controlador en módulo existente o módulo feature nuevo? -> justificar.
2. ¿DTOs separados para create/update/response? -> justificar.
3. ¿ParseUUIDPipe o validación custom para externalId? -> justificar.
4. ¿DELETE físico o lógico? -> justificar.
5. ¿import type para puerto (interfaz) en constructor? -> justificar.

# REGLAS OBLIGATORIAS
- No exponer id incremental en rutas públicas ni en respuesta.
- Usar externalId (UUID) en la ruta.
- Validar formato UUID antes de consultar.
- Mantener dominio desacoplado; el controlador solo orquesta y mapea DTO <-> payload de puerto.
- El Response DTO no incluye id incremental.
- No importar entidades ORM en el controlador.
- No usar `console.log` en producción.

# DO
- Crear/actualizar:
  - <ControllerPath>/dto/<entity>-response.dto.ts (con @ApiProperty, sin id incremental)
  - <ControllerPath>/dto/create-<entity>-request.dto.ts
  - <ControllerPath>/dto/update-<entity>-request.dto.ts
  - <ControllerPath>/<controller>.controller.ts
  - <ControllerPath>/<controller>.module.ts (si aplica módulo nuevo)
  - Puerto de dominio con métodos base: `findAll`, `findByExternalId`, `create`, `updateByExternalId`, `deleteByExternalId`
- Registrar el controlador en AppModule o en módulo que importe TransversalModule.
- Incluir: @ApiTags, @ApiOperation, @ApiParam, @ApiBody, @ApiResponse.
- Validar param con ParseUUIDPipe.
- Lanzar NotFoundException cuando el recurso no exista (GET/PATCH/DELETE).
- Usar `@HttpCode(204)` para DELETE exitoso.

# DON'T
- No usar id incremental en rutas públicas.
- No importar entidades ORM en el controlador.
- No exponer el modelo de dominio directamente (mapear a DTO).
- No duplicar mapeos en múltiples métodos; crear funciones helper de mapeo.

# CRITERIOS DE ACEPTACIÓN
- [ ] Build sin errores.
- [ ] Endpoint visible en http://localhost:3000/docs.
- [ ] ParseUUIDPipe valida el param en rutas con externalId.
- [ ] POST crea y responde 201 con DTO sin id incremental.
- [ ] GET list responde 200 con array DTO.
- [ ] GET by externalId responde 200 o 404.
- [ ] PATCH by externalId responde 200 o 404.
- [ ] DELETE by externalId responde 204 o 404.
- [ ] DTOs documentados con @ApiProperty.

# DEFINITION OF DONE (DoD)
- [ ] Código completo (DTOs + controlador + módulo/registro + puerto).
- [ ] Build/lint ejecutados en verde.
- [ ] Endpoints probados desde Swagger UI.
- [ ] Resumen de cambios + siguientes pasos (tests e2e, auth, rate limit, etc.).

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones ToT (breve, 4-6 bullets)
2) Archivos creados/modificados
3) Implementación (DTOs -> controlador -> puerto/wiring)
4) Evidencia de validación (build/lint)
5) Cómo probar desde /docs y siguientes pasos

# PLANTILLA DE RUTAS BASE REUTILIZABLE
- `POST   /<ControllerPath>/<BaseSegment>`
- `GET    /<ControllerPath>/<BaseSegment>`
- `GET    /<ControllerPath>/<BaseSegment>/:<ParamName>`
- `PATCH  /<ControllerPath>/<BaseSegment>/:<ParamName>`
- `DELETE /<ControllerPath>/<BaseSegment>/:<ParamName>`
