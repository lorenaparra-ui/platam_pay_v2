Analiza la historia de usuario `@.ai/user-stories/HU-B03___Gestion_de_Partners___Backoffice.md` dentro de `@.ai/user-stories` y determina los cambios necesarios en el microservicio **`suppliers-ms`** (`apps/suppliers-ms/`, módulo `partners` y afines), alineados con el esquema de base de datos `@.ai/schemas/database-schema.sql`.

> En este monorepo no existe el carpeta/servicio legacy `platam_pay_partners`; el bounded context de partners/onboarding vive en **suppliers-ms**.

Objetivo:
- Identificar qué se debe crear, actualizar o refactorizar en el microservicio y en sus módulos existentes para cumplir la HU.
- Asegurar que la propuesta respete la arquitectura actual de la aplicación (hexagonal + buenas prácticas del proyecto).

Instrucciones obligatorias:
1. Usa como referencia los lineamientos de:
   - `@.ai/prompts/dev/hexa-typeorm-ddl-entity.md`
   - `@.ai/prompts/dev/create-endpoint-swagger.md`
2. Mapea explícitamente requerimientos funcionales de la HU contra tablas/campos del DDL.
3. Define impacto por capa:
   - Dominio (modelos, puertos, casos de uso)
   - Infraestructura (entidades TypeORM, repositorios, mappers)
   - Aplicación/API (controladores, DTOs, validaciones, Swagger, endpoints)
4. Señala brechas entre el estado actual y el requerido.
5. Propón un plan de implementación incremental (paso a paso), indicando dependencias y orden recomendado.
6. Incluye criterios de aceptación técnicos y casos de prueba mínimos por endpoint/caso de uso.

Formato de salida esperado:
- Resumen ejecutivo (máx. 10 líneas)
- Matriz Requerimiento HU ↔ DDL ↔ Componente afectado
- Lista de cambios por módulo/archivo (crear/actualizar)
- Contratos API propuestos (request/response, códigos HTTP, errores)
- Riesgos técnicos y supuestos
- Checklist final de implementación