import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Catálogo geográfico transversal_schema.states (departamentos / subdivisiones).
 */
export class TransversalSchemaStates1760000000000 implements MigrationInterface {
  name = 'TransversalSchemaStates1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."states" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "country_code" character varying(2) NOT NULL,
        "state_name" character varying(120) NOT NULL,
        "state_code" character varying(3),
        CONSTRAINT "CHK_states_country_code" CHECK ("country_code" ~ '^[A-Z]{2}$'),
        CONSTRAINT "CHK_states_state_code" CHECK ("state_code" IS NULL OR "state_code" ~ '^[A-Z0-9]{2,3}$'),
        CONSTRAINT "UQ_states_country_state" UNIQUE ("country_code", "state_name"),
        CONSTRAINT "UQ_states_external_id" UNIQUE ("external_id"),
        CONSTRAINT "PK_states" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transversal_schema"."states"`);
  }
}
