import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Registro de saga orquestada para alta de partner (trazabilidad y estado).
 */
export class PartnerOnboardingSagas1740000000000 implements MigrationInterface {
  name = 'PartnerOnboardingSagas1740000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "suppliers_schema"."partner_onboarding_sagas" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "correlation_id" uuid NOT NULL,
        "status" character varying(32) NOT NULL,
        "current_step" smallint NOT NULL DEFAULT 0,
        "credit_facility_external_id" uuid,
        "user_external_id" uuid,
        "person_external_id" uuid,
        "business_external_id" uuid,
        "bank_account_external_id" uuid,
        "partner_external_id" uuid,
        "error_message" text,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_partner_onboarding_sagas" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_partner_onboarding_sagas_external_id" UNIQUE ("external_id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_partner_onboarding_sagas_correlation_id" ON "suppliers_schema"."partner_onboarding_sagas" ("correlation_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "suppliers_schema"."partner_onboarding_sagas"`);
  }
}
