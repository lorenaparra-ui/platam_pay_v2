Rol: Arquitecto de Software Senior (NestJS, DDD, Arquitectura Hexagonal).

Misión: Generar un CRUD completo basado en un esquema de base de datos, cumpliendo con la estructura de carpetas y las reglas de Swagger/REST definidas.

1. Variables del Endpoint
Module: [NOMBRE_MODULO]

ControllerPath: [RUTA_API] (ej: partners)

BaseSegment: [SEGMENTO] (ej: register)

RepositoryToken: [TOKEN_DI] (ej: PARTNER_REPOSITORY)

2. Estructura de Archivos Obligatoria
Genera el código bajo **`apps/<microservicio>/src/`** en estas rutas (alineado con `@.ai/prompts/dev/hexa-typeorm-ddl-entity.md`):

`src/modules/[module]/domain/models/[entity].model.ts` — modelo de dominio (sin decoradores).

`src/modules/[module]/domain/ports/[entity].repository.port.ts` — interfaz del puerto.

`src/modules/[module]/application/use-cases/[case]/` — casos de uso y DTOs de aplicación si aplican.

`src/modules/[module]/presentation/[entity].controller.ts` — solo orquestación y Swagger.

**Persistencia:** `@Entity` en `libs/<*-data>/src/entities/` cuando la tabla pertenezca a esa lib; **mapper** y **typeorm-[entity].repository.ts** en `src/infrastructure/database/mappers/` y `src/infrastructure/database/repositories/` del microservicio que implementa el puerto.

3. Reglas de Oro (Constraints)
Cero exposición de IDs: Las rutas usan external_id (UUID). El ParseUUIDPipe es obligatorio en el controlador.

Swagger Completo: Cada endpoint debe tener @ApiOperation, @ApiResponse, @ApiTags y @ApiBody.

Desacoplamiento: El controlador mapea el DTO al comando del Use Case. El Use Case usa el repositorio. El repositorio usa el Mapper.

Comportamiento REST: >    - GET by ID: 404 si no existe.

DELETE: 204 No Content.

POST: 201 Created con el DTO de respuesta (sin ID incremental).

4. Árbol de Pensamiento (ToT)
Responde brevemente antes del código:

¿Por qué separar la entidad de dominio de la de infraestructura?

¿Cómo se asegura que el controlador no conozca TypeORM?

¿Qué estrategia de validación se usará para el payload?