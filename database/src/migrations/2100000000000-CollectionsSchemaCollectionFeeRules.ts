import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Esquema `collections_schema` y tabla `collection_fee_rules` (reglas de comisión de cobranza por mora).
 */
export class CollectionsSchemaCollectionFeeRules2100000000000
  implements MigrationInterface
{
  name = 'CollectionsSchemaCollectionFeeRules2100000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "collections_schema"`);

    await queryRunner.query(`
      CREATE TABLE "collections_schema"."collection_fee_rules" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "days_overdue" integer NOT NULL,
        "fee_rate" decimal(8,6) NOT NULL,
        "valid_from" date NOT NULL,
        "created_by" bigint NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_collection_fee_rules" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_collection_fee_rules_external_id" UNIQUE ("external_id"),
        CONSTRAINT "UQ_collection_fee_rules_days_overdue_valid_from" UNIQUE ("days_overdue", "valid_from"),
        CONSTRAINT "FK_collection_fee_rules_created_by"
          FOREIGN KEY ("created_by")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS "collections_schema"."collection_fee_rules"
    `);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "collections_schema" CASCADE`);
  }
}
