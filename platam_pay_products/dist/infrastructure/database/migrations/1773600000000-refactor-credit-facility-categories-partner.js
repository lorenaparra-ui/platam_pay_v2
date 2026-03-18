"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefactorCreditFacilityCategoriesPartner1773600000000 = void 0;
class RefactorCreditFacilityCategoriesPartner1773600000000 {
    name = "RefactorCreditFacilityCategoriesPartner1773600000000";
    async up(queryRunner) {
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
    async down(queryRunner) {
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
exports.RefactorCreditFacilityCategoriesPartner1773600000000 = RefactorCreditFacilityCategoriesPartner1773600000000;
//# sourceMappingURL=1773600000000-refactor-credit-facility-categories-partner.js.map