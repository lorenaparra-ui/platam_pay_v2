import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Parámetros globales versionados por vigencia (`code` + `valid_from` único).
 */
export class GlobalParamsTable2060000000000 implements MigrationInterface {
  name = 'GlobalParamsTable2060000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."global_params" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "code" varchar(100) NOT NULL,
        "value" jsonb NOT NULL,
        "description" text,
        "valid_from" date NOT NULL,
        "created_by" bigint NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_global_params" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_global_params_external_id" UNIQUE ("external_id"),
        CONSTRAINT "UQ_global_params_code_valid_from" UNIQUE ("code", "valid_from"),
        CONSTRAINT "FK_global_params_created_by"
          FOREIGN KEY ("created_by")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "transversal_schema"."global_params"`);
  }
}
