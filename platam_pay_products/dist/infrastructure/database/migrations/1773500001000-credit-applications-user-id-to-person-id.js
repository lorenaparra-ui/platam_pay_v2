"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditApplicationsUserIdToPersonId1773500001000 = void 0;
class CreditApplicationsUserIdToPersonId1773500001000 {
    name = "CreditApplicationsUserIdToPersonId1773500001000";
    async up(queryRunner) {
        const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'credit_applications'
    `);
        if (!Array.isArray(tableExists) || tableExists.length === 0) {
            return;
        }
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD COLUMN IF NOT EXISTS "person_id" BIGINT NULL
    `);
        await queryRunner.query(`
      UPDATE "credit_applications" ca
      SET "person_id" = (
        SELECT p.id FROM "persons" p
        WHERE p.user_id = ca.user_id
        ORDER BY p.id DESC
        LIMIT 1
      )
      WHERE ca."user_id" IS NOT NULL
        AND ca."person_id" IS NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP CONSTRAINT IF EXISTS "credit_applications_bnpl_user_id_fkey"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP CONSTRAINT IF EXISTS "credit_applications_user_id_fkey"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_credit_applications_user_id"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP COLUMN IF EXISTS "user_id"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD CONSTRAINT "fk_credit_applications_person_id"
      FOREIGN KEY ("person_id") REFERENCES "persons" ("id")
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_applications_person_id"
      ON "credit_applications" ("person_id")
    `);
    }
    async down(queryRunner) {
        const tableExists = await queryRunner.query(`
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'credit_applications'
    `);
        if (!Array.isArray(tableExists) || tableExists.length === 0) {
            return;
        }
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP CONSTRAINT IF EXISTS "fk_credit_applications_person_id"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_credit_applications_person_id"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD COLUMN IF NOT EXISTS "user_id" BIGINT NULL
    `);
        await queryRunner.query(`
      UPDATE "credit_applications" ca
      SET "user_id" = (SELECT p.user_id FROM "persons" p WHERE p.id = ca.person_id LIMIT 1)
      WHERE ca."person_id" IS NOT NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD CONSTRAINT "credit_applications_user_id_fkey"
      FOREIGN KEY ("user_id") REFERENCES "users" ("id")
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_applications_user_id"
      ON "credit_applications" ("user_id")
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP COLUMN IF EXISTS "person_id"
    `);
    }
}
exports.CreditApplicationsUserIdToPersonId1773500001000 = CreditApplicationsUserIdToPersonId1773500001000;
//# sourceMappingURL=1773500001000-credit-applications-user-id-to-person-id.js.map