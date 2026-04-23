import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Bitácora de auditoría (`audit_logs`), alineada con `EntityType` y `ActionType` en `@platam/shared`.
 */
export class AuditLogsTable2080000000000 implements MigrationInterface {
  name = 'AuditLogsTable2080000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "transversal_schema"."audit_log_entity_type" AS ENUM (
          'loan',
          'payment',
          'loan_request'
        );
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "transversal_schema"."audit_log_action_type" AS ENUM (
          'field_update',
          'reversal',
          'recalculation'
        );
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);

    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."audit_logs" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "entity_type" "transversal_schema"."audit_log_entity_type" NOT NULL,
        "entity_id" bigint NOT NULL,
        "action" "transversal_schema"."audit_log_action_type" NOT NULL,
        "field_name" varchar(100),
        "old_value" jsonb,
        "new_value" jsonb,
        "reason_code" varchar(100),
        "notes" text,
        "performed_by" bigint NOT NULL,
        "performed_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_audit_logs" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_audit_logs_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_audit_logs_performed_by"
          FOREIGN KEY ("performed_by")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_audit_logs_entity_type_entity_id"
      ON "transversal_schema"."audit_logs" ("entity_type", "entity_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_audit_logs_performed_at"
      ON "transversal_schema"."audit_logs" ("performed_at")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "transversal_schema"."IDX_audit_logs_performed_at"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "transversal_schema"."IDX_audit_logs_entity_type_entity_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "transversal_schema"."audit_logs"`);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "transversal_schema"."audit_log_action_type"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "transversal_schema"."audit_log_entity_type"
    `);
  }
}
