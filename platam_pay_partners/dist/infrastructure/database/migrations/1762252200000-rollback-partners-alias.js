"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollbackPartnersAlias1762252200000 = void 0;
class RollbackPartnersAlias1762252200000 {
    name = "RollbackPartnersAlias1762252200000";
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "partners"
      DROP CONSTRAINT IF EXISTS chk_partners_alias_format
    `);
        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_partners_alias
    `);
        await queryRunner.query(`
      ALTER TABLE "partners"
      DROP COLUMN IF EXISTS "alias"
    `);
    }
    async down(queryRunner) {
        void queryRunner;
        await Promise.resolve();
    }
}
exports.RollbackPartnersAlias1762252200000 = RollbackPartnersAlias1762252200000;
//# sourceMappingURL=1762252200000-rollback-partners-alias.js.map