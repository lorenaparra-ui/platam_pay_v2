import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Idempotencia SQS create-partner-user (reintentos / entregas duplicadas).
 */
export class PartnerCreateUserSqsIdempotency1770000000000 implements MigrationInterface {
  name = 'PartnerCreateUserSqsIdempotency1770000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."partner_create_user_sqs_idempotency" (
        "id" BIGSERIAL NOT NULL,
        "idempotency_key" character varying(512) NOT NULL,
        "correlation_id" uuid NOT NULL,
        "result" jsonb,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_partner_create_user_sqs_idempotency" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_partner_create_user_sqs_idempotency_key" UNIQUE ("idempotency_key")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_partner_create_user_sqs_idempotency_correlation_id" ON "transversal_schema"."partner_create_user_sqs_idempotency" ("correlation_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE "transversal_schema"."partner_create_user_sqs_idempotency"`,
    );
  }
}
