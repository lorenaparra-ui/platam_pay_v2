"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropTradeNameRegexCheck1762259000000 = void 0;
class DropTradeNameRegexCheck1762259000000 {
    name = "DropTradeNameRegexCheck1762259000000";
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "partners"
      DROP CONSTRAINT IF EXISTS chk_partners_trade_name_format
    `);
    }
    async down(queryRunner) {
        void queryRunner;
        await Promise.resolve();
    }
}
exports.DropTradeNameRegexCheck1762259000000 = DropTradeNameRegexCheck1762259000000;
//# sourceMappingURL=1762259000000-drop-trade-name-regex-check.js.map