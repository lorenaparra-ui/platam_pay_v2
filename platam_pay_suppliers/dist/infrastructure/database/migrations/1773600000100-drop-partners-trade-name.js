"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropPartnersTradeName1773600000100 = void 0;
class DropPartnersTradeName1773600000100 {
    name = "DropPartnersTradeName1773600000100";
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_partners_trade_name"`);
        await queryRunner.query(`
      ALTER TABLE "partners" DROP CONSTRAINT IF EXISTS "partners_trade_name_unique"
    `);
        await queryRunner.query(`
      ALTER TABLE "partners" DROP COLUMN IF EXISTS "trade_name"
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "trade_name" varchar(255) NULL
    `);
        await queryRunner.query(`
      UPDATE "partners" p
      SET "trade_name" = LEFT(
        COALESCE(
          NULLIF(btrim(b."trade_name"), ''),
          NULLIF(btrim(b."legal_name"), ''),
          NULLIF(btrim(b."business_name"), ''),
          'partner_' || p."id"::text
        ),
        255
      )
      FROM "businesses" b
      WHERE b."id" = p."business_id"
        AND (p."trade_name" IS NULL OR btrim(p."trade_name") = '')
    `);
        await queryRunner.query(`
      UPDATE "partners" p
      SET "trade_name" = 'partner_' || p."id"::text
      WHERE p."trade_name" IS NULL OR btrim(p."trade_name") = ''
    `);
        await queryRunner.query(`
      WITH duplicated AS (
        SELECT
          p."id",
          p."trade_name",
          ROW_NUMBER() OVER (PARTITION BY p."trade_name" ORDER BY p."id") AS rn
        FROM "partners" p
      )
      UPDATE "partners" p
      SET "trade_name" = LEFT(p."trade_name" || '_' || duplicated.rn::text, 255)
      FROM duplicated
      WHERE p."id" = duplicated."id" AND duplicated.rn > 1
    `);
        await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "trade_name" SET NOT NULL
    `);
        await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_partners_trade_name"
      ON "partners" ("trade_name")
    `);
    }
}
exports.DropPartnersTradeName1773600000100 = DropPartnersTradeName1773600000100;
//# sourceMappingURL=1773600000100-drop-partners-trade-name.js.map