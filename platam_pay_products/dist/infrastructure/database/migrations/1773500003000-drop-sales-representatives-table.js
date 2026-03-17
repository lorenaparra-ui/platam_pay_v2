"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropSalesRepresentativesTable1773500003000 = void 0;
class DropSalesRepresentativesTable1773500003000 {
    name = "DropSalesRepresentativesTable1773500003000";
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE IF EXISTS "sales_representatives"
      DROP CONSTRAINT IF EXISTS "sales_representatives_partner_id_fkey"
    `);
        await queryRunner.query(`
      ALTER TABLE IF EXISTS "sales_representatives"
      DROP CONSTRAINT IF EXISTS "sales_representatives_user_id_fkey"
    `);
        await queryRunner.query(`
      ALTER TABLE IF EXISTS "sales_representatives"
      DROP CONSTRAINT IF EXISTS "sales_representatives_status_id_fkey"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_sales_representatives_partner_id"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_sales_representatives_user_id"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_sales_representatives_status_id"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_sales_representatives_external_id"
    `);
        await queryRunner.query(`
      DROP TABLE IF EXISTS "sales_representatives"
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "sales_representatives" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "partner_id" BIGINT NOT NULL,
        "user_id" BIGINT,
        "name" varchar NOT NULL,
        "role" varchar NOT NULL,
        "status_id" BIGINT NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now())
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "sales_representatives"
      ADD CONSTRAINT "sales_representatives_partner_id_fkey"
      FOREIGN KEY ("partner_id") REFERENCES "partners" ("id")
    `);
        await queryRunner.query(`
      ALTER TABLE "sales_representatives"
      ADD CONSTRAINT "sales_representatives_user_id_fkey"
      FOREIGN KEY ("user_id") REFERENCES "users" ("id")
    `);
        await queryRunner.query(`
      ALTER TABLE "sales_representatives"
      ADD CONSTRAINT "sales_representatives_status_id_fkey"
      FOREIGN KEY ("status_id") REFERENCES "statuses" ("id")
    `);
        await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_sales_representatives_external_id"
      ON "sales_representatives" ("external_id")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_sales_representatives_partner_id"
      ON "sales_representatives" ("partner_id")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_sales_representatives_user_id"
      ON "sales_representatives" ("user_id")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_sales_representatives_status_id"
      ON "sales_representatives" ("status_id")
    `);
    }
}
exports.DropSalesRepresentativesTable1773500003000 = DropSalesRepresentativesTable1773500003000;
//# sourceMappingURL=1773500003000-drop-sales-representatives-table.js.map