import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Brechas libs ↔ DDL acumuladas:
 * - StatusEntity: tabla `transversal_schema.statuses` → `catalog_status_types` + `get_status_id`.
 * - PersonEntity: `doc_type` como ENUM alineado con DocTypes; elimina columnas no mapeadas (`country_code`, `business_address`).
 * - PartnersEntity: restaura `business_id` (185 lo eliminó), columnas `alias`, `country_code`, `api_key_hash` (text).
 */
export class LibsSchemaAlignmentCatalogStatusPartnersPersons1980000000000
  implements MigrationInterface
{
  name = 'LibsSchemaAlignmentCatalogStatusPartnersPersons1980000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.up_catalog_status_types(queryRunner);
    await this.up_persons_columns(queryRunner);
    await this.up_persons_doc_type_enum(queryRunner);
    await this.up_partners_alignment(queryRunner);
  }

  private async up_catalog_status_types(queryRunner: QueryRunner): Promise<void> {
    const catalog = await queryRunner.query(`
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'catalog_status_types'
    `);
    if (catalog.length) {
      await queryRunner.query(`
        CREATE OR REPLACE FUNCTION get_status_id(p_entity_type varchar, p_code varchar)
        RETURNS bigint
        LANGUAGE sql
        STABLE
        AS $$
          SELECT s.id FROM transversal_schema.catalog_status_types s
          WHERE s.entity_type = p_entity_type AND s.code = p_code
          LIMIT 1;
        $$
      `);
      return;
    }

    const legacy = await queryRunner.query(`
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'statuses'
    `);
    if (!legacy.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."statuses"
      RENAME TO "catalog_status_types"
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION get_status_id(p_entity_type varchar, p_code varchar)
      RETURNS bigint
      LANGUAGE sql
      STABLE
      AS $$
        SELECT s.id FROM transversal_schema.catalog_status_types s
        WHERE s.entity_type = p_entity_type AND s.code = p_code
        LIMIT 1;
      $$
    `);
  }

  private async up_persons_columns(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      DROP COLUMN IF EXISTS "country_code"
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      DROP COLUMN IF EXISTS "business_address"
    `);
  }

  private async up_persons_doc_type_enum(queryRunner: QueryRunner): Promise<void> {
    const col = await queryRunner.query(`
      SELECT data_type, udt_schema, udt_name
      FROM information_schema.columns
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'persons'
        AND column_name = 'doc_type'
    `);
    if (!col.length) {
      return;
    }
    const row = col[0] as { data_type: string; udt_schema: string; udt_name: string };
    if (row.data_type === 'USER-DEFINED' && row.udt_name === 'persons_doc_type_enum') {
      return;
    }

    await queryRunner.query(`
      UPDATE "transversal_schema"."persons"
      SET "doc_type" = lower(btrim("doc_type"::text))
      WHERE "doc_type" IS NOT NULL
    `);

    await queryRunner.query(`
      UPDATE "transversal_schema"."persons"
      SET "doc_type" = 'other'
      WHERE "doc_type" IS NULL
         OR "doc_type" NOT IN ('citizenship', 'passport', 'other')
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "transversal_schema"."persons_doc_type_enum" AS ENUM ('citizenship', 'passport', 'other');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ALTER COLUMN "doc_type" DROP DEFAULT
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ALTER COLUMN "doc_type" TYPE "transversal_schema"."persons_doc_type_enum"
      USING "doc_type"::text::"transversal_schema"."persons_doc_type_enum"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ALTER COLUMN "doc_type" SET NOT NULL
    `);
  }

  private async up_partners_alignment(queryRunner: QueryRunner): Promise<void> {
    const business_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'partners'
        AND column_name = 'business_id'
    `);

    if (!business_col.length) {
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."partners"
        ADD COLUMN "business_id" bigint NULL
      `);
      await queryRunner.query(`
        UPDATE "suppliers_schema"."partners" p
        SET "business_id" = s."business_id"
        FROM "suppliers_schema"."suppliers" s
        WHERE p."supplier_id" = s."id"
      `);
      const bad = await queryRunner.query(`
        SELECT COUNT(*)::int AS c
        FROM "suppliers_schema"."partners"
        WHERE "business_id" IS NULL
      `);
      if ((bad[0] as { c: number }).c > 0) {
        throw new Error(
          'LibsSchemaAlignment1980000000000: partners con business_id NULL tras backfill desde suppliers; revise datos.',
        );
      }
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."partners"
        ALTER COLUMN "business_id" SET NOT NULL
      `);
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."partners"
        ADD CONSTRAINT "FK_partners_business_id"
        FOREIGN KEY ("business_id")
        REFERENCES "suppliers_schema"."businesses"("id")
        ON DELETE RESTRICT
        ON UPDATE NO ACTION
      `);
      await queryRunner.query(`
        CREATE INDEX IF NOT EXISTS "IDX_partners_business_id"
        ON "suppliers_schema"."partners" ("business_id")
      `);
    }

    const alias_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'partners'
        AND column_name = 'alias'
    `);
    if (!alias_col.length) {
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."partners"
        ADD COLUMN "alias" character varying(100) NULL
      `);
      await queryRunner.query(`
        CREATE UNIQUE INDEX "UQ_partners_alias"
        ON "suppliers_schema"."partners" ("alias")
        WHERE "alias" IS NOT NULL
      `);
    }

    const cc_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'partners'
        AND column_name = 'country_code'
    `);
    if (!cc_col.length) {
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."partners"
        ADD COLUMN "country_code" character varying(2) NULL
      `);
    }

    const api_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'partners'
        AND column_name = 'api_key_hash'
    `);
    if (!api_col.length) {
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."partners"
        ADD COLUMN "api_key_hash" text NULL
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      DROP CONSTRAINT IF EXISTS "FK_partners_business_id"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."IDX_partners_business_id"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."UQ_partners_alias"`,
    );
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      DROP COLUMN IF EXISTS "business_id",
      DROP COLUMN IF EXISTS "alias",
      DROP COLUMN IF EXISTS "country_code",
      DROP COLUMN IF EXISTS "api_key_hash"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ALTER COLUMN "doc_type" TYPE character varying(100)
      USING "doc_type"::text
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "transversal_schema"."persons_doc_type_enum"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ADD COLUMN IF NOT EXISTS "country_code" character varying(2) NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ADD COLUMN IF NOT EXISTS "business_address" text NULL
    `);

    const catalog = await queryRunner.query(`
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'catalog_status_types'
    `);
    if (catalog.length) {
      await queryRunner.query(`
        ALTER TABLE "transversal_schema"."catalog_status_types"
        RENAME TO "statuses"
      `);
      await queryRunner.query(`
        CREATE OR REPLACE FUNCTION get_status_id(p_entity_type varchar, p_code varchar)
        RETURNS bigint
        LANGUAGE sql
        STABLE
        AS $$
          SELECT s.id FROM transversal_schema.statuses s
          WHERE s.entity_type = p_entity_type AND s.code = p_code
          LIMIT 1;
        $$
      `);
    }
  }
}
