import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Tabla transversal_schema.currencies (DBML schema_ppay_v1.6).
 * Semilla COP para alinear cities.currency_id antes de FK.
 */
export class CurrenciesTable1720000000000 implements MigrationInterface {
  name = 'CurrenciesTable1720000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."currencies" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "code" character varying(3) NOT NULL, "name" character varying(120) NOT NULL, "symbol" character varying(10), "decimal_places" integer NOT NULL DEFAULT 2, "thousand_separator" character varying(1), "decimal_separator" character varying(1), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_currencies_external_id" UNIQUE ("external_id"), CONSTRAINT "UQ_currencies_code" UNIQUE ("code"), CONSTRAINT "CHK_currencies_decimal_places" CHECK ("decimal_places" >= 0 AND "decimal_places" <= 6), CONSTRAINT "PK_currencies" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(`
      INSERT INTO "transversal_schema"."currencies" (
        "code", "name", "symbol", "decimal_places", "thousand_separator", "decimal_separator", "is_active"
      )
      VALUES ('COP', 'Peso colombiano', '$', 2, '.', ',', true)
      ON CONFLICT ("code") DO NOTHING
    `);

    await queryRunner.query(`
      UPDATE "transversal_schema"."cities" c
      SET "currency_id" = (
        SELECT cu.id FROM "transversal_schema"."currencies" cu WHERE cu.code = 'COP' LIMIT 1
      )
      WHERE NOT EXISTS (
        SELECT 1 FROM "transversal_schema"."currencies" cu WHERE cu.id = c.currency_id
      )
    `);

    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."cities" ADD CONSTRAINT "FK_cities_currency_id" FOREIGN KEY ("currency_id") REFERENCES "transversal_schema"."currencies"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."cities" DROP CONSTRAINT "FK_cities_currency_id"`,
    );
    await queryRunner.query(`DROP TABLE "transversal_schema"."currencies"`);
  }
}
