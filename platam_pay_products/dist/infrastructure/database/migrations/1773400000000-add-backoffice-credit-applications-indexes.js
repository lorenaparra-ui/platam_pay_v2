"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBackofficeCreditApplicationsIndexes1773400000000 = void 0;
class AddBackofficeCreditApplicationsIndexes1773400000000 {
    name = "AddBackofficeCreditApplicationsIndexes1773400000000";
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_credit_applications_submission_date_id
      ON "credit_applications_bnpl" ("submission_date" DESC, "id" DESC)
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_credit_applications_status_submission_date_id
      ON "credit_applications_bnpl" ("status_id", "submission_date" DESC, "id" DESC)
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_credit_applications_partner_submission_date_id
      ON "credit_applications_bnpl" ("partner_id", "submission_date" DESC, "id" DESC)
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_businesses_legal_name
      ON "businesses" ("legal_name")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_businesses_trade_name
      ON "businesses" ("trade_name")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_businesses_business_name
      ON "businesses" ("business_name")
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_businesses_business_name`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_businesses_trade_name`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_businesses_legal_name`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_credit_applications_partner_submission_date_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_credit_applications_status_submission_date_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_credit_applications_submission_date_id`);
    }
}
exports.AddBackofficeCreditApplicationsIndexes1773400000000 = AddBackofficeCreditApplicationsIndexes1773400000000;
//# sourceMappingURL=1773400000000-add-backoffice-credit-applications-indexes.js.map