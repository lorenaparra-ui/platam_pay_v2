import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Tasas de usura por categoría y vigencia (`usura_rates`), alineado con `UsuraRateType` en `@platam/shared`.
 */
export class UsuraRatesTable2070000000000 implements MigrationInterface {
  name = 'UsuraRatesTable2070000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "products_schema"."usura_rate_type" AS ENUM (
          'usury',
          'fixed',
          'ordinary',
          'consumption',
          'productive_urban',
          'productive_rural',
          'popular_urban',
          'popular_rural',
          'high_amount'
        );
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);

    await queryRunner.query(`
      CREATE TABLE "products_schema"."usura_rates" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "category" "products_schema"."usura_rate_type" NOT NULL,
        "rate_ea" decimal(8,6) NOT NULL,
        "valid_from" date NOT NULL,
        "resolution" varchar(100),
        "created_by" bigint NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_usura_rates" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_usura_rates_external_id" UNIQUE ("external_id"),
        CONSTRAINT "UQ_usura_rates_category_valid_from" UNIQUE ("category", "valid_from"),
        CONSTRAINT "FK_usura_rates_created_by"
          FOREIGN KEY ("created_by")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "products_schema"."usura_rates"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "products_schema"."usura_rate_type"`);
  }
}
