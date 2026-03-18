import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * 1) categories.partner_id nullable + backfill desde credit_facilities.partner_id.
 * 2) FK categories → partners.
 * 3) Elimina partner_id de credit_facilities (FK + índice + columna).
 *
 * Reversión (down): restaura partner_id en facilities desde una categoría por facility.
 */
export class RefactorCreditFacilityCategoriesPartner1773600000000
  implements MigrationInterface
{
  name = "RefactorCreditFacilityCategoriesPartner1773600000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "categories"
      ADD COLUMN IF NOT EXISTS "partner_id" BIGINT NULL
    `);

    await queryRunner.query(`
      UPDATE "categories" c
      SET "partner_id" = cf."partner_id"
      FROM "credit_facilities" cf
      WHERE c."credit_facility_id" = cf."id"
        AND cf."partner_id" IS NOT NULL
        AND c."partner_id" IS NULL
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'fk_categories_partner_id'
        ) THEN
          ALTER TABLE "categories"
          ADD CONSTRAINT "fk_categories_partner_id"
          FOREIGN KEY ("partner_id") REFERENCES "partners" ("id")
          ON DELETE SET NULL ON UPDATE CASCADE;
        END IF;
      END $$
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_categories_partner_id"
      ON "categories" ("partner_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "credit_facilities"
      DROP CONSTRAINT IF EXISTS "fk_credit_facilities_partner_id"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_credit_facilities_partner_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "credit_facilities"
      DROP COLUMN IF EXISTS "partner_id"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "credit_facilities"
      ADD COLUMN IF NOT EXISTS "partner_id" BIGINT NULL
    `);

    await queryRunner.query(`
      UPDATE "credit_facilities" cf
      SET "partner_id" = sub."partner_id"
      FROM (
        SELECT DISTINCT ON ("credit_facility_id") "credit_facility_id", "partner_id"
        FROM "categories"
        WHERE "partner_id" IS NOT NULL
        ORDER BY "credit_facility_id", "id"
      ) sub
      WHERE cf."id" = sub."credit_facility_id"
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'fk_credit_facilities_partner_id'
        ) THEN
          ALTER TABLE "credit_facilities"
          ADD CONSTRAINT "fk_credit_facilities_partner_id"
          FOREIGN KEY ("partner_id") REFERENCES "partners" ("id")
          ON DELETE SET NULL ON UPDATE CASCADE;
        END IF;
      END $$
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_facilities_partner_id"
      ON "credit_facilities" ("partner_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "categories"
      DROP CONSTRAINT IF EXISTS "fk_categories_partner_id"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_categories_partner_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "categories"
      DROP COLUMN IF EXISTS "partner_id"
    `);
  }
}
