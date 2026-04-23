import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * credit_facilities.contract_id → products_schema.contracts(id): tipo bigint + FK.
 * Convierte valores varchar numéricos; valores no numéricos u huérfanos → NULL antes del FK.
 */
export class CreditFacilitiesContractFk1830000000000 implements MigrationInterface {
  name = 'CreditFacilitiesContractFk1830000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ALTER COLUMN "contract_id" TYPE bigint
      USING (
        CASE
          WHEN "contract_id" IS NULL THEN NULL
          WHEN trim("contract_id"::text) = '' THEN NULL
          WHEN trim("contract_id"::text) ~ '^[0-9]+$' THEN trim("contract_id"::text)::bigint
          ELSE NULL
        END
      )
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."credit_facilities" cf
      SET "contract_id" = NULL
      WHERE cf."contract_id" IS NOT NULL
      AND NOT EXISTS (
        SELECT 1 FROM "products_schema"."contracts" c WHERE c."id" = cf."contract_id"
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_credit_facilities_contract_id"
      ON "products_schema"."credit_facilities" ("contract_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ADD CONSTRAINT "FK_credit_facilities_contract_id"
      FOREIGN KEY ("contract_id") REFERENCES "products_schema"."contracts"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'CreditFacilitiesContractFk1830000000000 no es revertible automáticamente.',
    );
  }
}
