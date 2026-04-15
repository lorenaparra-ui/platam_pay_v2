---
name: nestjs-sqs-messaging
description: Añadir o extender mensajería Amazon SQS en microservicios Nest: puertos en dominio/messaging, adaptadores de URL y cliente, publicación y consumo, configuración por env. Copiar el patrón del MS existente antes de inventar uno nuevo.
---

# Mensajería SQS en microservicios Nest (Platam Pay)

## Cuándo usar esta skill

- Nueva cola, publicador o consumidor SQS en un MS bajo `apps/<ms>/`.
- Ajuste de idempotencia, manejo de errores o wiring de `ConfigService` para URLs de cola.
- Integración con LocalStack (`AWS_SQS_ENDPOINT`, etc.) en desarrollo.

## Principios (hexagonal)

- **Dominio / capa messaging del MS:** puertos (`*.port.ts`) para publicar mensajes, resolver URLs de cola, y casos de uso que orquesten el envío o la interpretación del payload — **sin** importar el SDK de AWS ahí.
- **Infraestructura:** `apps/<ms>/src/infrastructure/messaging/sqs/` (o ruta equivalente ya usada en ese MS): adaptadores que implementan los puertos, `useFactory` para `SQSClient` / config compartida (`@platam/shared` cuando aplique), **consumers** Nest que hagan `ReceiveMessage` / long polling según el patrón del repo.
- **Configuración:** variables de entorno y `registerAs` / `sqs.config.ts` alineados al resto del microservicio; no hardcodear URLs de cola en código.

## Flujo recomendado

1. **Abrir un MS que ya tenga SQS** (p. ej. `suppliers-ms`, `transversal-ms`) y localizar `infrastructure/messaging/sqs/`, `sqs.module.ts`, `messaging` bajo `src/modules/`.
2. **Copiar estructura:** nuevos puertos en el módulo messaging; nuevos adapters; registro en el `Module` con `provide` / `useClass` o `useFactory` como el MS de referencia.
3. **Colas:** nombres y URLs desde env (`*.env.example`, `docker-compose` si aplica); en local, coherencia con LocalStack y scripts de bootstrap de colas si el repo los define.
4. **Consumidor:** delegar en casos de uso; **idempotencia** cuando el mismo mensaje pueda reprocesarse (`messageId`, clave de negocio, tabla de deduplicación — según patrón existente en `libs/shared` o el MS).
5. **Seguridad:** no loguear cuerpo completo de mensajes con PII; errores hacia observabilidad sin exponer secretos.

## Checklist rápido

- [ ] Puertos y DTOs de mensajería sin dependencia del SDK AWS en dominio
- [ ] URLs y región desde configuración, no literales en lógica
- [ ] Provider de cliente SQS registrado una sola vez (patrón Global/local del MS)
- [ ] Consumidor con manejo de visibilidad / borrado acorde al MS de referencia
- [ ] Reglas de **02-backend** y seguridad respetadas

## Don't

- No publicar/consumir desde controllers sin pasar por casos de uso cuando el MS sigue hexagonal.
- No ignorar fallos de deserialización o validación sin métrica o log seguro.
- No introducir polling agresivo distinto al patrón ya configurado (`wait time`, batch size) sin revisar impacto.
