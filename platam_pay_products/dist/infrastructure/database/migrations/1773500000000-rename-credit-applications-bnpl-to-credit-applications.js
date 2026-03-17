"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameCreditApplicationsBnplToCreditApplications1773500000000 = void 0;
class RenameCreditApplicationsBnplToCreditApplications1773500000000 {
    name = "RenameCreditApplicationsBnplToCreditApplications1773500000000";
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE IF EXISTS "credit_applications_bnpl"
      RENAME TO "credit_applications"
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE IF EXISTS "credit_applications"
      RENAME TO "credit_applications_bnpl"
    `);
    }
}
exports.RenameCreditApplicationsBnplToCreditApplications1773500000000 = RenameCreditApplicationsBnplToCreditApplications1773500000000;
//# sourceMappingURL=1773500000000-rename-credit-applications-bnpl-to-credit-applications.js.map