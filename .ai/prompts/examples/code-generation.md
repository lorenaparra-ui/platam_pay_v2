# Prompts de generación de código

<!-- Prompts reutilizables para que la IA genere código alineado con el proyecto. -->

## Backend (NestJS en monorepo)
- Usar TypeScript estricto.
- Código por microservicio en `apps/<nombre>-ms/src/modules/<feature>/` (hexagonal: domain / application / presentation).
- Validación de entrada: `class-validator` + `ValidationPipe` global (ver `main.ts` del MS).
- Respuestas REST coherentes; no exponer `id` incremental en rutas públicas cuando el dominio use `external_id` (UUID).

## Frontend (React + TypeScript)
- Componentes funcionales con hooks.
- Estado: _especificar (Context, Redux, React Query, etc.)_.
- Estilos: _especificar (Tailwind, CSS modules, etc.)_.
- Accesibilidad y manejo de loading/error en todas las pantallas.

## Workers
- Jobs idempotentes cuando sea posible.
- Logs estructurados y correlación por `jobId` / `requestId`.
- Reintentos y dead-letter según `event-schemas` y reglas de negocio.

## Convenciones
- Nombres en inglés en código; textos de UI según locale.
- Variables de entorno documentadas en `api-integrations.md` y `.env.example`.
