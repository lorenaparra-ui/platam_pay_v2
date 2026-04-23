import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Tabla `products_schema.experian_queries` y ENUMs alineados con `@platam/shared`
 * (`ExperianQueryTypes`, `ExperianQueryStatus`).
 */
export class ExperianQueriesTable2020000000000 implements MigrationInterface {
  name = 'ExperianQueriesTable2020000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "products_schema"."experian_query_type" AS ENUM ('hcpn', 'hcpj');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "products_schema"."experian_query_status" AS ENUM ('pending', 'completed', 'error');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);

    await queryRunner.query(`
      CREATE TABLE "products_schema"."experian_queries" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "credit_application_id" bigint NOT NULL,
        "person_id" bigint,
        "business_id" bigint,
        "query_type" "products_schema"."experian_query_type" NOT NULL,
        "credit_report" jsonb,
        "credit_score" decimal(8,2),
        "consulted_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "status" "products_schema"."experian_query_status" NOT NULL DEFAULT 'pending',
        "error_message" text,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_experian_queries" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_experian_queries_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_experian_queries_credit_application_id"
          FOREIGN KEY ("credit_application_id")
          REFERENCES "products_schema"."credit_applications"("id")
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_experian_queries_person_id"
          FOREIGN KEY ("person_id")
          REFERENCES "transversal_schema"."persons"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_experian_queries_business_id"
          FOREIGN KEY ("business_id")
          REFERENCES "suppliers_schema"."businesses"("id")
          ON DELETE SET NULL ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_experian_queries_credit_application_id"
      ON "products_schema"."experian_queries" ("credit_application_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_experian_queries_credit_application_id"
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS "products_schema"."experian_queries"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."experian_query_status"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."experian_query_type"
    `);
  }
}
