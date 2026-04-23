import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Registro de idempotencia para el flujo upload-files → S3 (reintentos SQS).
 */
export class UploadFilesIdempotency1750000000000 implements MigrationInterface {
  name = 'UploadFilesIdempotency1750000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."upload_files_idempotency" (
        "id" BIGSERIAL NOT NULL,
        "idempotency_key" character varying(512) NOT NULL,
        "correlation_id" uuid NOT NULL,
        "result_files" jsonb,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_upload_files_idempotency" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_upload_files_idempotency_key" UNIQUE ("idempotency_key")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_upload_files_idempotency_correlation_id" ON "transversal_schema"."upload_files_idempotency" ("correlation_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transversal_schema"."upload_files_idempotency"`);
  }
}
