# CONTEXTO
Proyecto NestJS + TypeORM con arquitectura hexagonal y migraciones centralizadas en:
- `migrations-runner/src/infrastructure/database/migrations/`
- DataSource: `migrations-runner/src/config/typeorm.config.ts`

Objetivo: crear migraciones **seguras, reversibles y compatibles** con datos existentes.

## Objetivo del prompt
Generar una migración TypeORM que:
1) no rompa datos existentes,  
2) sea reversible (`up/down`),  
3) siga patrón expand/contract,  
4) deje evidencia de validación y rollback.

## Inputs obligatorios
- HU/ticket y cambio funcional.
- Tabla(s)/columna(s) impactadas.
- Tipo de cambio (add/alter/index/fk/rename/drop).
- Volumen estimado de datos.
- Ventana de despliegue (con o sin downtime).

## Reglas obligatorias
- Nunca usar `synchronize` en producción.
- Toda migración debe tener `up` y `down`.
- Evitar `ADD COLUMN ... NOT NULL` directo con datos existentes.
- No ejecutar cambios destructivos sin estrategia explícita.
- Validar duplicados antes de `UNIQUE`.
- No exponer PII en logs/resultados.

## Flujo estándar
### 1) Pre-check SQL
```sql
SELECT table_schema, table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = '<table_name>'
  AND column_name IN ('<column_1>', '<column_2>');
```

```sql
SELECT
  COUNT(*) AS total_rows,
  COUNT(*) FILTER (WHERE <column_name> IS NULL) AS null_rows
FROM <table_name>;
```

```sql
SELECT <column_name>, COUNT(*) AS qty
FROM <table_name>
GROUP BY <column_name>
HAVING COUNT(*) > 1
ORDER BY qty DESC
LIMIT 50;
```

```sql
SELECT COUNT(*) AS orphan_rows
FROM <child_table> c
LEFT JOIN <parent_table> p ON p.id = c.<fk_column>
WHERE c.<fk_column> IS NOT NULL
  AND p.id IS NULL;
```

### 2) Estrategia de cambio
Aplicar 3 fases:
1. **Expand** (nullable/index no bloqueante)
2. **Backfill** (migración de histórico)
3. **Enforce** (`NOT NULL`, `UNIQUE`, `CHECK`, `FK`)

### 3) Crear migración
Ruta:
`migrations-runner/src/infrastructure/database/migrations/<timestamp>-<change-name>.ts`

Plantilla:
```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeName1700000000000 implements MigrationInterface {
  name = "ChangeName1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Expand
    // Backfill
    // Enforce
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback seguro e inverso
  }
}
```

### 4) Alinear capas si aplica
- Dominio: `domain/models`, `domain/ports`
- Infra: `entities`, `mappers`, `repositories`
- API: DTOs, use-cases, docs

### 5) Post-check SQL
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = '<table_name>'
ORDER BY ordinal_position;
```

```sql
SELECT conname, pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'public.<table_name>'::regclass;
```

```sql
SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = '<table_name>';
```

## Comandos operativos
```bash
cd migrations-runner
npm run migration:create --name=<change-name>
```

```bash
cd migrations-runner
npm run migration:run
```

```bash
cd migrations-runner
npm run migration:revert
```

## Checklist
- [ ] Backup/snapshot validado
- [ ] Pre-check ejecutado y guardado
- [ ] Rollback probado en entorno previo
- [ ] Build/lint/tests relevantes en verde
- [ ] Validación post-migración ejecutada

## Formato de salida esperado
1) Resumen y riesgo  
2) Pre-check + hallazgos  
3) Código `up/down`  
4) Validación post-check  
5) Rollback plan  
6) Próximos pasos  
