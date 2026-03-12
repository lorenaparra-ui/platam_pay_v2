"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPartnersAlias1762246800000 = void 0;
class AddPartnersAlias1762246800000 {
    name = "AddPartnersAlias1762246800000";
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "alias" varchar(50)
    `);
        await queryRunner.query(`
      UPDATE "partners" p
      SET "alias" = COALESCE(
        NULLIF(
          LEFT(
            regexp_replace(
              regexp_replace(lower(COALESCE(p."trade_name", p."company_name")), '[^a-z0-9]+', '-', 'g'),
              '(^-|-$)', '', 'g'
            ),
            50
          ),
          ''
        ),
        'partner-' || p."id"::text
      )
      WHERE p."alias" IS NULL OR p."alias" = ''
    `);
        await queryRunner.query(`
      WITH duplicated_aliases AS (
        SELECT
          p."id",
          p."alias",
          ROW_NUMBER() OVER (PARTITION BY p."alias" ORDER BY p."id") AS rn
        FROM "partners" p
      )
      UPDATE "partners" p
      SET "alias" = LEFT(p."alias" || '-' || duplicated_aliases.rn::text, 50)
      FROM duplicated_aliases
      WHERE p."id" = duplicated_aliases."id"
        AND duplicated_aliases.rn > 1
    `);
        await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_partners_alias
      ON "partners" ("alias")
    `);
        await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'chk_partners_alias_format'
        ) THEN
          ALTER TABLE "partners"
          ADD CONSTRAINT chk_partners_alias_format
          CHECK ("alias" ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
        END IF;
      END $$;
    `);
        await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "alias" SET NOT NULL
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "alias" DROP NOT NULL
    `);
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
}
exports.AddPartnersAlias1762246800000 = AddPartnersAlias1762246800000;
//# sourceMappingURL=1762246800000-add-partners-alias.js.map