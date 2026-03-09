import { MigrationInterface, QueryRunner } from "typeorm";

export class AlignPartnersBusinessFk1762264000000 implements MigrationInterface {
  name = "AlignPartnersBusinessFk1762264000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "business_id" BIGINT
    `);

    await queryRunner.query(`
      DO $$
      DECLARE
        fallback_business_id BIGINT;
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'partners'
            AND column_name = 'business_id'
        ) THEN
          SELECT id
          INTO fallback_business_id
          FROM "businesses"
          ORDER BY id
          LIMIT 1;

          IF fallback_business_id IS NULL THEN
            IF EXISTS (
              SELECT 1
              FROM "partners"
              WHERE "business_id" IS NULL
            ) THEN
              RAISE EXCEPTION
                'Cannot enforce partners.business_id NOT NULL without businesses records';
            END IF;
          ELSE
            UPDATE "partners"
            SET "business_id" = fallback_business_id
            WHERE "business_id" IS NULL;
          END IF;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "business_id" SET NOT NULL
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'fk_partners_business_id'
        ) THEN
          ALTER TABLE "partners"
          ADD CONSTRAINT "fk_partners_business_id"
          FOREIGN KEY ("business_id") REFERENCES "businesses" ("id");
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_partners_business_id"
      ON "partners" ("business_id")
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_partners_trade_name"
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP CONSTRAINT IF EXISTS "chk_partners_trade_name_format"
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP COLUMN IF EXISTS "country_code"
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP COLUMN IF EXISTS "company_name"
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP COLUMN IF EXISTS "trade_name"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "country_code" varchar(2)
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "company_name" varchar(255)
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "trade_name" varchar(255)
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_partners_business_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP CONSTRAINT IF EXISTS "fk_partners_business_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "business_id" DROP NOT NULL
    `);
  }
}
