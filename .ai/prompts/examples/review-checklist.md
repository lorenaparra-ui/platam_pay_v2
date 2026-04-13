# Checklist de revisión de código

<!-- Criterios de validación para PRs y revisión por IA. -->

## General
- [ ] Código compila / tests pasan
- [ ] Sin secretos ni datos sensibles en código
- [ ] Cambios alineados con `architecture.md` y `business-rules.md`

## Backend
- [ ] Validación de entrada en todos los endpoints
- [ ] Errores mapeados a códigos HTTP correctos
- [ ] Transacciones DB donde aplique (consistencia)
- [ ] Logs sin PII innecesario

## Frontend
- [ ] Estados de loading y error manejados
- [ ] Accesibilidad básica (labels, contraste, foco)
- [ ] Sin dependencias innecesarias

## Integraciones
- [ ] Clientes HTTP/SDK en el lugar acordado por el MS (p. ej. módulo `infrastructure` o lib compartida); sin credenciales en código
- [ ] Reintentos y timeouts configurados donde aplique
- [ ] Documentación actualizada en `.ai/context/api-integrations.md`

## Schemas y contratos
- [ ] Cambios en DB reflejados en `.ai/schemas/database-schema.sql` (o DBML vigente) y en `database/src/migrations/`
- [ ] Contratos HTTP/documentación OpenAPI al día (Swagger por MS en `/docs` donde esté habilitado)
- [ ] Si el proyecto define catálogo de eventos/mensajes SQS, actualizarlo en el artefacto que use el equipo (no asumir un archivo concreto si no existe en el repo)
