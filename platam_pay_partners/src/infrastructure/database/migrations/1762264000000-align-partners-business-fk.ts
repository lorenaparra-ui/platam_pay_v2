import { MigrationInterface, QueryRunner } from "typeorm";

export class AlignPartnersBusinessFk1762264000000 implements MigrationInterface {
  name = "AlignPartnersBusinessFk1762264000000";

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "business_id" BIGINT
    `)

    await queryRunner.query(`
    DO $$
    DECLARE
      fallback_business_id BIGINT;
      first_user_id BIGINT;
    BEGIN

      IF NOT EXISTS (SELECT 1 FROM "businesses") THEN
        SELECT id INTO first_user_id FROM "users" ORDER BY id LIMIT 1;
        IF first_user_id IS NOT NULL THEN
          INSERT INTO "businesses" (
            "user_id",
            "entity_type",
            "business_name",
            "created_at",
            "updated_at"
          )
          VALUES (
            first_user_id,
            'PJ',
            'default-business',
            NOW(),
            NOW()
          );
        END IF;
      END IF;

      SELECT id
      INTO fallback_business_id
      FROM "businesses"
      ORDER BY id
      LIMIT 1;

      IF fallback_business_id IS NOT NULL THEN
        UPDATE "partners"
        SET "business_id" = fallback_business_id
        WHERE "business_id" IS NULL;

        ALTER TABLE "partners"
        ALTER COLUMN "business_id" SET NOT NULL;
      END IF;

    END $$;
    `)

    await queryRunner.query(`
      ALTER TABLE "partners"
      ADD CONSTRAINT "partners_business_id_fkey"
      FOREIGN KEY ("business_id")
      REFERENCES "businesses"("id")
    `)
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
      DROP CONSTRAINT IF EXISTS "partners_business_id_fkey"
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      ALTER COLUMN "business_id" DROP NOT NULL
    `);
  }
}
