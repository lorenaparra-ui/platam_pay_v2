# CONTEXTO
Proyecto NestJS con arquitectura hexagonal y Swagger en `/docs`.
Quiero exponer un endpoint que consuma un repositorio de dominio y sea testeable desde http://localhost:3000/docs.

# ENDPOINT OBJETIVO
- RepositoryToken: <REEMPLAZAR> (ej: CREDIT_APPLICATION_BNPL_REPOSITORY)
- DomainPortName: <REEMPLAZAR> (ej: CreditApplicationBnplRepositoryPort)
- DomainModelName: <REEMPLAZAR> (ej: CreditApplicationBnpl)
- ControllerPath: <REEMPLAZAR> (ej: credit-applications)
- ParamName: <REEMPLAZAR> (ej: externalId)
- ResponseDtoName: <REEMPLAZAR> (ej: CreditApplicationBnplResponseDto)
- ApiTag: <REEMPLAZAR> (ej: credit-applications)

# OBJETIVO
Crear un endpoint público que:
1) Use el puerto del dominio (inyectado por token).
2) Exponga GET /<ControllerPath>/:externalId para consultar por externalId (nunca por id).
3) Responda con el modelo de dominio serializado a DTO (sin id).
4) Tenga documentación Swagger completa: @ApiOperation, @ApiParam, @ApiResponse, @ApiTags.
5) Retorne 404 cuando no exista el recurso.

# ÁRBOL DE PENSAMIENTO (ToT) - DECISIONES OBLIGATORIAS
Evalúa y decide brevemente (sin razonamiento largo):
1. ¿Controlador en módulo existente o módulo feature nuevo? -> justificar.
2. ¿DTO dedicado o respuesta inline? -> justificar.
3. ¿ParseUUIDPipe o validación custom? -> justificar.
4. ¿import type para puerto (interfaz) en constructor? -> justificar.

# REGLAS OBLIGATORIAS
- No exponer id incremental en la respuesta.
- Usar externalId (UUID) en la ruta.
- Validar formato UUID antes de consultar.
- Mantener dominio desacoplado; el controlador solo orquesta y mapea a DTO.
- El DTO no incluye id.

# DO
- Crear/actualizar:
  - <ControllerPath>/dto/<entity>-response.dto.ts (con @ApiProperty, sin id)
  - <ControllerPath>/<controller>.controller.ts
  - <ControllerPath>/<controller>.module.ts (si aplica módulo nuevo)
- Registrar el controlador en AppModule o en módulo que importe TransversalModule.
- Incluir: @ApiTags, @ApiOperation, @ApiParam, @ApiResponse(200|400|404).
- Validar param con ParseUUIDPipe.
- Lanzar NotFoundException cuando el recurso no exista.

# DON'T
- No usar id incremental en rutas públicas.
- No importar entidades ORM en el controlador.
- No exponer el modelo de dominio directamente (mapear a DTO).

# CRITERIOS DE ACEPTACIÓN
- [ ] Build sin errores.
- [ ] Endpoint visible en http://localhost:3000/docs.
- [ ] ParseUUIDPipe valida el param.
- [ ] Respuesta 200 sin id.
- [ ] Respuesta 404 con mensaje descriptivo.
- [ ] DTO con @ApiProperty para documentación Swagger.

# DEFINITION OF DONE (DoD)
- [ ] Código completo (DTO + controlador + módulo/registro).
- [ ] Build/lint ejecutados en verde.
- [ ] Endpoint probado desde Swagger UI.
- [ ] Resumen de cambios + siguientes pasos (tests e2e, auth, etc.).

# FORMATO DE RESPUESTA OBLIGATORIO
1) Decisiones ToT (breve, 3-5 bullets)
2) Archivos creados/modificados
3) Implementación (DTO -> controlador -> wiring)
4) Evidencia de validación (build/lint)
5) Cómo probar desde /docs y siguientes pasos
