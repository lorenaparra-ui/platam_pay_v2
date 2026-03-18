import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Elimina trade_name de partners (fuente de verdad: businesses.trade_name / legal_name).
 * up: quita índices/unique y columna.
 * down: recrea columna, rellena desde businesses y deduplica para índice único.
 */
export class DropPartnersTradeName1773600000100 implements MigrationInterface {
  name = "DropPartnersTradeName1773600000100";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_partners_trade_name"`);
    await queryRunner.query(`
      ALTER TABLE "partners" DROP CONSTRAINT IF EXISTS "partners_trade_name_unique"
    `);
    await queryRunner.query(`
      ALTER TABLE "partners" DROP COLUMN IF EXISTS "trade_name"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
