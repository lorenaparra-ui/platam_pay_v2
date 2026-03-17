import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Crea la tabla categories (1:N con credit_facility).
 * - credit_facility_id (FK), name, discount_percentage, interest_rate,
 *   disbursement_fee_percent (nullable), minimum_disbursement_fee (nullable),
 *   delay_days, term_days, status_id (FK).
 * Tipos numéricos: numeric/decimal para montos y porcentajes.
 */
export class CreateCategories1773500005000 implements MigrationInterface {
  name = "CreateCategories1773500005000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "statuses" ("entity_type", "code", "display_name", "is_active", "created_at", "updated_at")
      SELECT 'categories', 'active', 'Activo', true, now(), now()
      WHERE NOT EXISTS (
        SELECT 1 FROM "statuses"
        WHERE "entity_type" = 'categories' AND "code" = 'active'
      )
    `);
    await queryRunner.query(`
      INSERT INTO "statuses" ("entity_type", "code", "display_name", "is_active", "created_at", "updated_at")
      SELECT 'categories', 'inactive', 'Inactivo', true, now(), now()
      WHERE NOT EXISTS (
        SELECT 1 FROM "statuses"
        WHERE "entity_type" = 'categories' AND "code" = 'inactive'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "credit_facility_id" BIGINT NOT NULL,
        "name" varchar(255) NOT NULL,
        "discount_percentage" numeric(8, 4) NOT NULL,
        "interest_rate" numeric(8, 4) NOT NULL,
        "disbursement_fee_percent" numeric(8, 4),
        "minimum_disbursement_fee" numeric(18, 4),
        "delay_days" int NOT NULL,
        "term_days" int NOT NULL,
        "status_id" BIGINT NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now())
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "categories"
      ADD CONSTRAINT "fk_categories_credit_facility_id"
      FOREIGN KEY ("credit_facility_id") REFERENCES "credit_facilities" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE
    `);
    await queryRunner.query(`
      ALTER TABLE "categories"
      ADD CONSTRAINT "fk_categories_status_id"
      FOREIGN KEY ("status_id") REFERENCES "statuses" ("id")
      ON DELETE RESTRICT ON UPDATE CASCADE
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_categories_external_id"
      ON "categories" ("external_id")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_categories_credit_facility_id"
      ON "categories" ("credit_facility_id")
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_categories_status_id"
      ON "categories" ("status_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "categories"
    `);
    await queryRunner.query(`
      DELETE FROM "statuses"
      WHERE "entity_type" = 'categories'
    `);
  }
}
