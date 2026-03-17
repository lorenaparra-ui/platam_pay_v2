"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditApplicationsDropUserProductAndSalesRep1773500002000 = void 0;
class CreditApplicationsDropUserProductAndSalesRep1773500002000 {
    name = "CreditApplicationsDropUserProductAndSalesRep1773500002000";
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP CONSTRAINT IF EXISTS "credit_applications_bnpl_user_product_id_fkey"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP CONSTRAINT IF EXISTS "credit_applications_user_product_id_fkey"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_credit_applications_user_product_id"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP COLUMN IF EXISTS "user_product_id"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP CONSTRAINT IF EXISTS "credit_applications_bnpl_sales_rep_id_fkey"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP CONSTRAINT IF EXISTS "credit_applications_sales_rep_id_fkey"
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_credit_applications_sales_rep_id"
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      DROP COLUMN IF EXISTS "sales_rep_id"
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD COLUMN IF NOT EXISTS "user_product_id" BIGINT NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD CONSTRAINT "credit_applications_user_product_id_fkey"
      FOREIGN KEY ("user_product_id") REFERENCES "user_products" ("id")
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_applications_user_product_id"
      ON "credit_applications" ("user_product_id")
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD COLUMN IF NOT EXISTS "sales_rep_id" BIGINT NULL
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_applications"
      ADD CONSTRAINT "credit_applications_sales_rep_id_fkey"
      FOREIGN KEY ("sales_rep_id") REFERENCES "sales_representatives" ("id")
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_applications_sales_rep_id"
      ON "credit_applications" ("sales_rep_id")
    `);
    }
}
exports.CreditApplicationsDropUserProductAndSalesRep1773500002000 = CreditApplicationsDropUserProductAndSalesRep1773500002000;
//# sourceMappingURL=1773500002000-credit-applications-drop-user-product-and-sales-rep.js.map