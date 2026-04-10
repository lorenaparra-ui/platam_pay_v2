import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alinea el esquema con `@libs/suppliers-data` y DBML v2.1:
 * - `legal_representatives.business_id` NOT NULL → `businesses.id`
 * - Elimina `suppliers.legal_representative_id` (vínculo queda negocio → representantes).
 *
 * Revierte la parte de representante legal de la migración 1850000000000 cuando esa columna existe.
 * Si la base ya está en el estado objetivo (sin `legal_representative_id` en suppliers), `up` no hace cambios.
 */
export class LegalRepresentativesBusinessIdAlignSuppliers1950000000000
  implements MigrationInterface
{
  name = 'LegalRepresentativesBusinessIdAlignSuppliers1950000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const supplier_lr_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'suppliers'
        AND column_name = 'legal_representative_id'
    `);

    if (!supplier_lr_col.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      DROP CONSTRAINT IF EXISTS "FK_suppliers_legal_representative_id"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."UQ_suppliers_legal_representative_id"`,
    );

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      ADD COLUMN IF NOT EXISTS "business_id" bigint NULL
    `);

    await queryRunner.query(`
      UPDATE "suppliers_schema"."legal_representatives" lr
      SET "business_id" = s."business_id"
      FROM "suppliers_schema"."suppliers" s
      WHERE s."legal_representative_id" = lr."id"
    `);

    const orphan_count_rows = await queryRunner.query(`
      SELECT COUNT(*)::text AS c
      FROM "suppliers_schema"."legal_representatives"
      WHERE "business_id" IS NULL
    `);
    const orphan_count = Number(orphan_count_rows[0]?.c ?? 0);
    if (orphan_count > 0) {
      throw new Error(
        `LegalRepresentativesBusinessIdAlignSuppliers1950000000000: existen ${orphan_count} filas en legal_representatives sin business_id ` +
          `(no referenciadas desde suppliers.legal_representative_id). Corrija datos o elimine huérfanos antes de continuar.`,
      );
    }

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      ALTER COLUMN "business_id" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      DROP CONSTRAINT IF EXISTS "FK_legal_representatives_business"
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      ADD CONSTRAINT "FK_legal_representatives_business"
      FOREIGN KEY ("business_id")
      REFERENCES "suppliers_schema"."businesses"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_legal_representatives_business_id"
      ON "suppliers_schema"."legal_representatives" ("business_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      DROP COLUMN "legal_representative_id"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const supplier_lr_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'suppliers'
        AND column_name = 'legal_representative_id'
    `);

    if (supplier_lr_col.length) {
      return;
    }

    const lr_business_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'legal_representatives'
        AND column_name = 'business_id'
    `);

    if (!lr_business_col.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      ADD COLUMN "legal_representative_id" bigint NULL
    `);
    await queryRunner.query(`
      UPDATE "suppliers_schema"."suppliers" s
      SET "legal_representative_id" = sub.lr_id
      FROM (
        SELECT DISTINCT ON (lr."business_id") lr."id" AS lr_id, lr."business_id"
        FROM "suppliers_schema"."legal_representatives" lr
        ORDER BY lr."business_id", lr."is_primary" DESC, lr."id" ASC
      ) sub
      WHERE s."business_id" = sub."business_id"
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_suppliers_legal_representative_id"
      ON "suppliers_schema"."suppliers" ("legal_representative_id")
      WHERE "legal_representative_id" IS NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      DROP CONSTRAINT IF EXISTS "FK_legal_representatives_business"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."IDX_legal_representatives_business_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      DROP COLUMN "business_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      ADD CONSTRAINT "FK_suppliers_legal_representative_id"
      FOREIGN KEY ("legal_representative_id")
      REFERENCES "suppliers_schema"."legal_representatives"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }
}
