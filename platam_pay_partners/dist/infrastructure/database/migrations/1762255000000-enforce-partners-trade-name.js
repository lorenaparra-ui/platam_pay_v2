"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnforcePartnersTradeName1762255000000 = void 0;
class EnforcePartnersTradeName1762255000000 {
    name = "EnforcePartnersTradeName1762255000000";
    async up(queryRunner) {
        await queryRunner.query(`
      UPDATE "partners" p
      SET "trade_name" = COALESCE("trade_name", "company_name")
      WHERE "trade_name" IS NULL OR btrim("trade_name") = ''
    `);
        await queryRunner.query(`
      UPDATE "partners" p
      SET "trade_name" = COALESCE(
        NULLIF(
          regexp_replace(
            regexp_replace(lower(p."trade_name"), '[^a-z0-9]+', '_', 'g'),
            '(^_+|_+$)', '', 'g'
          ),
          ''
        ),
        'partner_' || p."id"::text
      )
    `);
        await queryRunner.query(`
      WITH duplicated_trade_names AS (
        SELECT
          p."id",
          p."trade_name",
          ROW_NUMBER() OVER (PARTITION BY p."trade_name" ORDER BY p."id") AS rn
        FROM "partners" p
      )
      UPDATE "partners" p
      SET "trade_name" = LEFT(p."trade_name" || '_' || duplicated_trade_names.rn::text, 255)
      FROM duplicated_trade_names
      WHERE p."id" = duplicated_trade_names."id"
        AND duplicated_trade_names.rn > 1
    `);
        await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "trade_name" SET NOT NULL
    `);
        await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_partners_trade_name
      ON "partners" ("trade_name")
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_partners_trade_name
    `);
        await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "trade_name" DROP NOT NULL
    `);
    }
}
exports.EnforcePartnersTradeName1762255000000 = EnforcePartnersTradeName1762255000000;
//# sourceMappingURL=1762255000000-enforce-partners-trade-name.js.map