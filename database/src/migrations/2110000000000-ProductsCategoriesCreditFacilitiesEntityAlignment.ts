import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alinea DDL con entidades TypeORM actuales:
 * - `categories`: `modality`, `installment_frequency`, `installment_count`, `initial_payment_pct`
 *   (faltaban respecto a `CategoryEntity`).
 * - `credit_facilities`: `business_id` + FK a `suppliers_schema.businesses` (N:1; varias facilidades pueden compartir negocio).
 */
export class ProductsCategoriesCreditFacilitiesEntityAlignment2110000000000
  implements MigrationInterface
{
  name = 'ProductsCategoriesCreditFacilitiesEntityAlignment2110000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.ensureLoanRequestModalityType(queryRunner);
    await this.ensureCategoryInstallmentFrequencyType(queryRunner);
    await this.upCategoriesColumns(queryRunner);
    await this.upCreditFacilitiesBusinessId(queryRunner);
  }

  private async ensureLoanRequestModalityType(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "products_schema"."loan_request_modality" AS ENUM ('bullet', 'cuotas');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);
  }

  private async ensureCategoryInstallmentFrequencyType(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "products_schema"."category_installment_frequency" AS ENUM (
          'monthly',
          'biweekly',
          'weekly'
        );
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);
  }

  private async upCategoriesColumns(queryRunner: QueryRunner): Promise<void> {
    const modality = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'categories'
        AND column_name = 'modality'
    `);
    if (!modality.length) {
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ADD COLUMN "modality" "products_schema"."loan_request_modality" NOT NULL DEFAULT 'bullet'
      `);
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ALTER COLUMN "modality" DROP DEFAULT
      `);
    }

    const freq = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'categories'
        AND column_name = 'installment_frequency'
    `);
    if (!freq.length) {
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ADD COLUMN "installment_frequency" "products_schema"."category_installment_frequency" NOT NULL DEFAULT 'monthly'
      `);
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ALTER COLUMN "installment_frequency" DROP DEFAULT
      `);
    }

    const ic = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'categories'
        AND column_name = 'installment_count'
    `);
    if (!ic.length) {
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ADD COLUMN "installment_count" integer NOT NULL DEFAULT 1
      `);
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ALTER COLUMN "installment_count" DROP DEFAULT
      `);
    }

    const ip = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'categories'
        AND column_name = 'initial_payment_pct'
    `);
    if (!ip.length) {
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ADD COLUMN "initial_payment_pct" numeric(8,4) NOT NULL DEFAULT 0
      `);
      await queryRunner.query(`
        ALTER TABLE "products_schema"."categories"
        ALTER COLUMN "initial_payment_pct" DROP DEFAULT
      `);
    }
  }

  private async upCreditFacilitiesBusinessId(queryRunner: QueryRunner): Promise<void> {
    const col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'credit_facilities'
        AND column_name = 'business_id'
    `);
    if (col.length) {
      return;
    }

    const need = await queryRunner.query(`
      SELECT COUNT(*)::int AS c FROM "products_schema"."credit_facilities"
    `);
    const have = await queryRunner.query(`
      SELECT COUNT(*)::int AS c FROM "suppliers_schema"."businesses"
    `);
    if ((need[0]?.c ?? 0) > 0 && (have[0]?.c ?? 0) === 0) {
      throw new Error(
        'ProductsCategoriesCreditFacilitiesEntityAlignment2110000000000: hay credit_facilities pero no hay businesses; cree al menos un registro en suppliers_schema.businesses antes de migrar.',
      );
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ADD COLUMN "business_id" bigint NULL
    `);

    await queryRunner.query(`
      WITH f AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn
        FROM "products_schema"."credit_facilities"
        WHERE "business_id" IS NULL
      ),
      bc AS (
        SELECT COUNT(*)::bigint AS n FROM "suppliers_schema"."businesses"
      ),
      b AS (
        SELECT id, ROW_NUMBER() OVER (ORDER BY id) AS rn
        FROM "suppliers_schema"."businesses"
      )
      UPDATE "products_schema"."credit_facilities" cf
      SET "business_id" = b.id
      FROM f
      CROSS JOIN bc
      INNER JOIN b ON b.rn = ((f.rn - 1) % bc.n) + 1
      WHERE cf.id = f.id
    `);

    const stillNull = await queryRunner.query(`
      SELECT COUNT(*)::int AS c
      FROM "products_schema"."credit_facilities"
      WHERE "business_id" IS NULL
    `);
    if (stillNull[0]?.c > 0) {
      throw new Error(
        'ProductsCategoriesCreditFacilitiesEntityAlignment2110000000000: no se pudo asignar business_id a todas las credit_facilities.',
      );
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ALTER COLUMN "business_id" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ADD CONSTRAINT "FK_credit_facilities_business_id"
      FOREIGN KEY ("business_id")
      REFERENCES "suppliers_schema"."businesses"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_credit_facilities_business_id"
      ON "products_schema"."credit_facilities" ("business_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_credit_facilities_business_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      DROP CONSTRAINT IF EXISTS "FK_credit_facilities_business_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      DROP CONSTRAINT IF EXISTS "UQ_credit_facilities_business_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      DROP COLUMN IF EXISTS "business_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      DROP COLUMN IF EXISTS "initial_payment_pct"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      DROP COLUMN IF EXISTS "installment_count"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      DROP COLUMN IF EXISTS "installment_frequency"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      DROP COLUMN IF EXISTS "modality"
    `);

    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."category_installment_frequency"
    `);
  }
}
