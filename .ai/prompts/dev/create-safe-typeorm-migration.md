# CONTEXTO
Monorepo NestJS + TypeORM con arquitectura hexagonal en cada MS (`apps/<ms>/src/modules/...`).

Las **migraciones ejecutables por CLI** viven en el workspace **`database/`** (`@platam/database`), no dentro de cada app:

- Archivos: `database/src/migrations/<timestamp>-<nombre>.ts`
- DataSource: `database/src/data-source.ts` (agrega entidades desde `libs/*-data` según corresponda para `migration:generate`)

Las entidades ORM de negocio suelen estar en **`libs/*-data/src/entities/`**; tras cambiar columnas allí, alinear dominio/mappers/repos en el MS que implementa el puerto.

Objetivo: crear migraciones seguras cuando cambia el DDL y ya existen datos en base.

---

# OBJETIVO DEL PROMPT
Generar una migración TypeORM **segura, idempotente y reversible** que:
1) no rompa datos existentes,
2) respete arquitectura hexagonal,
3) incluya validaciones previas y posteriores,
4) documente riesgo, rollback y plan de ejecución.

---

# INPUTS OBLIGATORIOS
- Cambio funcional requerido (HU/ticket).
- Tabla(s) y columna(s) impactadas.
- Tipo de cambio:
  - Add column
  - Alter column type/nullability/default
  - Add/remove index
  - Add/remove FK/constraint
  - Rename column/table
  - Soft delete / hard delete
- Volumen de datos esperado.
- Ventana de despliegue (downtime permitido o no).

---

# REGLAS OBLIGATORIAS
- No usar `synchronize` para producción.
- Toda migración debe tener `up` y `down`.
- Si existe data: evitar `ADD COLUMN ... NOT NULL` directo sin backfill.
- Evitar operaciones destructivas sin estrategia explícita (`DROP COLUMN`, `DROP TABLE`).
- Validar unicidad/duplicados antes de crear índices unique.
- Usar transacciones cuando aplique (si el motor/operación lo permite).
- No exponer PII en logs ni en respuestas HTTP.
- Mantener dominio desacoplado de TypeORM (los cambios de schema se reflejan en dominio mediante modelos/puertos, no al revés).

---

# FLUJO ESTÁNDAR (PASO A PASO)

## 1) Diagnóstico previo (SQL de pre-check)
Ejecutar SIEMPRE consultas previas antes de crear la migración.

### 1.1 Estado de la columna/tabla objetivo
```sql
SELECT table_schema, table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = '<table_name>'
  AND column_name IN ('<column_1>', '<column_2>');
```

### 1.2 Conteos y nulos
```sql
SELECT
  COUNT(*) AS total_rows,
  COUNT(*) FILTER (WHERE <column_name> IS NULL) AS null_rows
FROM <table_name>;
```

### 1.3 Duplicados (si habrá UNIQUE)
```sql
SELECT <column_name>, COUNT(*) AS qty
FROM <table_name>
GROUP BY <column_name>
HAVING COUNT(*) > 1
ORDER BY qty DESC
LIMIT 50;
```

### 1.4 Integridad referencial (si habrá FK)
```sql
SELECT COUNT(*) AS orphan_rows
FROM <child_table> c
LEFT JOIN <parent_table> p ON p.id = c.<fk_column>
WHERE c.<fk_column> IS NOT NULL
  AND p.id IS NULL;
```

## 2) Estrategia de migración segura
Para cambios con datos existentes, aplicar patrón de 3 fases:

1. **Expand**: agregar columna nullable/índice no bloqueante.
2. **Backfill**: poblar datos históricos en lotes o con SQL controlado.
3. **Enforce**: aplicar `NOT NULL`, `UNIQUE`, `CHECK`, `FK`.

> Nunca pasar directo a fase Enforce si hay data legacy.

## 3) Implementación de migración TypeORM
Crear archivo en:
`database/src/migrations/<timestamp>-<change-name>.ts`

TypeORM descubre migraciones por glob (`migrations: [.../migrations/*.ts]` en `database/src/data-source.ts`); basta con que el archivo exporte una clase que implemente `MigrationInterface`.

Plantilla base:
```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeName1700000000000 implements MigrationInterface {
  name = "ChangeName1700000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Fase 1: Expand
    // Fase 2: Backfill
    // Fase 3: Enforce
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rollback inverso y seguro
  }
}
```

## 4) Alineación por capas (hexagonal)
Después de migración, actualizar:

### Dominio
- `domain/models/*` (propiedades nuevas o cambios de tipo).
- `domain/ports/*` si cambia contrato.

### Infraestructura
- Entidades en `libs/<context>-data/src/entities/*` o equivalente (`@Column`, `nullable`, `default`, `name` snake_case).
- `apps/<ms>/src/infrastructure/database/mappers/*` (`toDomain`, `toEntity`).
- `apps/<ms>/src/infrastructure/database/repositories/*` (queries y filtros por nuevas columnas).

### Aplicación/API
- DTOs request/response.
- casos de uso (validaciones de negocio).
- swagger/docs.

## 5) Validaciones post-migración

### 5.1 Estructura aplicada
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = '<table_name>'
ORDER BY ordinal_position;
```

### 5.2 Restricciones e índices
```sql
SELECT conname, pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'public.<table_name>'::regclass;

SELECT indexname, indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = '<table_name>';
```

### 5.3 Calidad de datos
```sql
SELECT COUNT(*) FILTER (WHERE <column_name> IS NULL) AS null_rows
FROM <table_name>;
```

## 6) Pruebas de aplicación
- `npm run build`
- `npm run lint`
- pruebas unit/e2e impactadas
- smoke de endpoints impactados en `/docs`

---

# ESTRATEGIAS SEGÚN TIPO DE CAMBIO

## A) Add column NOT NULL con data existente
1. `ADD COLUMN` nullable.
2. backfill.
3. `ALTER COLUMN SET NOT NULL`.
4. agregar índice/constraint final.

## B) Add UNIQUE con data existente
1. detectar duplicados.
2. resolver duplicados con regla explícita.
3. crear índice unique.

## C) Cambio de tipo de columna
1. crear columna temporal nueva.
2. migrar data (`UPDATE ... SET new_col = CAST(...)`).
3. validar conteos.
4. renombrar columnas o reemplazar.

## D) Rename columna
Preferir estrategia expand-contract si hay múltiples servicios:
1. crear columna nueva,
2. escribir ambas temporalmente,
3. migrar lectura,
4. retirar antigua en release posterior.

---

# PLANTILLA: CASO REAL `sample_table.sample_column`

## Up (resumen)
1. Add columna nullable.
2. Backfill desde `trade_name/company_name` normalizado.
3. Resolver duplicados.
4. Crear índice unique.
5. Agregar check regex.
6. Set NOT NULL.

## Down (resumen)
1. Drop NOT NULL.
2. Drop check.
3. Drop índice unique.
4. Drop columna.

---

# CHECKLIST ANTES DE EJECUTAR EN PROD
- [ ] Backup o snapshot reciente validado.
- [ ] Tamaño de tabla y duración estimada.
- [ ] SQL pre-check ejecutadas y guardadas.
- [ ] Rollback validado en entorno previo.
- [ ] Comunicación de ventana de cambio.
- [ ] Monitoreo post-deploy definido.

---

# COMANDOS OPERATIVOS

## Generar migración a partir del diff (TypeORM)
Desde la raíz del monorepo (el nombre de salida va **después de `--`**; ver comentario en `database/src/data-source.ts`):

```bash
npm run migration:generate -w @platam/database -- src/migrations/1730000000000-DescripcionCambio
```

Equivalente desde la carpeta `database/`:

```bash
npm run migration:generate -- src/migrations/1730000000000-DescripcionCambio
```

Si necesitas una migración **vacía** manual, crear el archivo en `database/src/migrations/` con timestamp y nombre coherentes con el resto del directorio (no hay script `migration:create` en el `package.json` actual).

## Ejecutar migraciones
```bash
npm run migration:run
```

## Revertir última migración
```bash
npm run migration:revert
```

## Listar estado
```bash
npm run migration:show
```

---

# FORMATO DE ENTREGA ESPERADO (CUANDO USES ESTE PROMPT)
1) Resumen del cambio y riesgo  
2) SQL pre-check y hallazgos  
3) Archivo de migración (`up/down`)  
4) Cambios por capa (domain/infra/application)  
5) Validación post-migración (SQL + build/lint/tests)  
6) Plan de rollback y siguientes pasos  
