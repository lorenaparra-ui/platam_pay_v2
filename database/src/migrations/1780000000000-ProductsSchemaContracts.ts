import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Tabla products_schema.contracts alineada con DBML/DDL y catálogo de estados para entity_type `contracts`.
 * Añade FK desde transversal_schema.contract_signers hacia contracts (antes contract_id quedaba sin referencia).
 */
export class ProductsSchemaContracts1780000000000 implements MigrationInterface {
  name = 'ProductsSchemaContracts1780000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO transversal_schema.statuses ("external_id", "entity_type", "code", "display_name", "description", "is_active")
      SELECT gen_random_uuid(), 'contracts', v.code, v.display_name, NULL, true
      FROM (VALUES
        ('pending', 'Pendiente'),
        ('signed', 'Firmado'),
        ('cancelled', 'Cancelado')
      ) AS v(code, display_name)
      WHERE NOT EXISTS (
        SELECT 1 FROM transversal_schema.statuses s
        WHERE s.entity_type = 'contracts' AND s.code = v.code
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "products_schema"."contracts" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "user_id" bigint NOT NULL,
        "application_id" bigint,
        "zapsign_token" character varying,
        "status_id" bigint NOT NULL DEFAULT get_status_id('contracts', 'pending'),
        "original_file_url" text,
        "signed_file_url" text,
        "form_answers_json" jsonb,
        CONSTRAINT "UQ_contracts_external_id" UNIQUE ("external_id"),
        CONSTRAINT "UQ_contracts_zapsign_token" UNIQUE ("zapsign_token"),
        CONSTRAINT "PK_contracts" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_contracts_user_id" ON "products_schema"."contracts" ("user_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_contracts_application_id" ON "products_schema"."contracts" ("application_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_contracts_status_id" ON "products_schema"."contracts" ("status_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      ADD CONSTRAINT "FK_contracts_user_id"
      FOREIGN KEY ("user_id") REFERENCES "transversal_schema"."users"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      ADD CONSTRAINT "FK_contracts_application_id"
      FOREIGN KEY ("application_id") REFERENCES "products_schema"."credit_applications"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      ADD CONSTRAINT "FK_contracts_status_id"
      FOREIGN KEY ("status_id") REFERENCES "transversal_schema"."statuses"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."contract_signers"
      ADD CONSTRAINT "FK_contract_signers_contract_id"
      FOREIGN KEY ("contract_id") REFERENCES "products_schema"."contracts"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."contract_signers" DROP CONSTRAINT IF EXISTS "FK_contract_signers_contract_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "products_schema"."contracts"`);
    await queryRunner.query(`
      DELETE FROM transversal_schema.statuses WHERE entity_type = 'contracts'
    `);
  }
}
