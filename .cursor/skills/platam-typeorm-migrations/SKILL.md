---
name: platam-typeorm-migrations
description: Flujo operativo para migraciones TypeORM en @platam/database: alinear DDL/DBML, generar migración, expand/contract, revert y coordinación con entidades en libs. Usar al cambiar esquema PostgreSQL o al preparar despliegues.
---

# Migraciones TypeORM en Platam Pay (`@platam/database`)

## Cuándo usar esta skill

- Cambios de esquema (tablas, columnas, índices, constraints) que deban versionarse.
- Revisión de coherencia entre **`.ai/schemas/database-schema.sql`**, DBML y código de migración.
- Dudas sobre **expand/contract**, rollback o orden de despliegue código ↔ migración.

## Reglas de referencia (no duplicar aquí el detalle)

- **`.cursor/rules/03-migrations.mdc`** — lineamientos obligatorios (sin `synchronize: true` en prod, DROP controlado, zero-downtime).
- **`.cursor/rules/04-dba.mdc`** — rol DBA, matriz de diferencias DDL/DBML, SQL explícito.

## Flujo recomendado

1. **Leer fuentes:** `database-schema.sql`, DBML vigente en `.ai/schemas/`, migraciones recientes en `database/src/migrations/`, y `database/src/data-source.ts` (cómo se agregan entidades vía `ALL_DATA_ENTITIES`).
2. **Planificar fases:** si el cambio rompe compatibilidad, diseñar expand → doble escritura / backfill → lectura nueva → contract (ver regla 03).
3. **Implementar:** archivo nuevo en `database/src/migrations/<Timestamp>-<Nombre>.ts` con `up()` y `down()` coherentes y reversibles cuando el producto lo exija.
4. **Coordinar:** si la migración añade tablas/columnas usadas por TypeORM, alinear **entidades** en `libs/<lib>/src/entities/` en el mismo PR o fase explícita documentada.
5. **Validar:** `npm run migration:show` y revisión de SQL generado; no ejecutar `migration:run` en entornos ajenos al del usuario sin confirmación.

## Comandos (desde la raíz del monorepo)

```bash
npm run migration:show
npm run migration:run
npm run migration:revert
npm run migration:generate -w @platam/database -- src/migrations/DescripcionEnPascalCase
```

(Detalle y alternativas en comentarios de `database/src/data-source.ts`.)

## Checklist rápido

- [ ] Cambio trazado a DDL/DBML o decisión de producto documentada
- [ ] `down()` definido o limitación documentada si no es reversible
- [ ] Sin `synchronize: true` para “arreglar” el esquema
- [ ] Entidades / `data-source` alineados si afectan a la CLI
- [ ] Usuario avisado de ejecutar `migration:run` donde corresponda

## Don't

- No proponer `DROP TABLE` / `DROP COLUMN` sin plan de contract y rollback.
- No duplicar listas de entidades fuera del patrón central de `data-source.ts`.
- No asumir datos existentes sin validar nullability y volúmenes en tablas grandes.
