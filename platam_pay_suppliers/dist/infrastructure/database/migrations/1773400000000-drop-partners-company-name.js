"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropPartnersCompanyName1773400000000 = void 0;
class DropPartnersCompanyName1773400000000 {
    name = "DropPartnersCompanyName1773400000000";
    async up(queryRunner) {
        await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'partners' AND column_name = 'company_name'
        ) THEN
          UPDATE "partners" p
          SET "trade_name" = COALESCE(
            NULLIF(btrim(p."trade_name"), ''),
            btrim(p."company_name"),
            'partner_' || p."id"::text
          )
          WHERE (p."trade_name" IS NULL OR btrim(p."trade_name") = '')
            AND p."company_name" IS NOT NULL;
        END IF;
      END $$;
    `);
        await queryRunner.query(`
      ALTER TABLE "partners"
      DROP COLUMN IF EXISTS "company_name"
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "company_name" varchar(255)
    `);
        await queryRunner.query(`
      UPDATE "partners" p
      SET "company_name" = COALESCE(p."trade_name", 'partner_' || p."id"::text)
      WHERE p."company_name" IS NULL
    `);
    }
}
exports.DropPartnersCompanyName1773400000000 = DropPartnersCompanyName1773400000000;
//# sourceMappingURL=1773400000000-drop-partners-company-name.js.map