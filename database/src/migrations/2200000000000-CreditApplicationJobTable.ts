import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Tabla de jobs asíncronos para solicitudes de crédito.
 * Modelo: 202+job_id en lugar de respuesta síncrona.
 */
export class CreditApplicationJobTable2200000000000 implements MigrationInterface {
  name = 'CreditApplicationJobTable2200000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    const existing = await queryRunner.query(`
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'products_schema'
        AND table_name   = 'credit_application_jobs'
    `);
    if (existing.length) {
      return;
    }

    await queryRunner.query(`
      CREATE TABLE products_schema.credit_application_jobs (
        id               bigserial PRIMARY KEY,
        external_id      uuid        NOT NULL DEFAULT gen_random_uuid() UNIQUE,
        status           varchar(32) NOT NULL DEFAULT 'PENDING',
        step             varchar(64) NOT NULL DEFAULT 'ENQUEUED',
        payload          jsonb       NOT NULL DEFAULT '{}',
        resolved_ids     jsonb       NOT NULL DEFAULT '{}',
        error_message    text,
        idempotency_key  varchar(512) UNIQUE,
        created_at       timestamptz NOT NULL DEFAULT now(),
        updated_at       timestamptz NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_credit_application_jobs_status"
        ON products_schema.credit_application_jobs (status)
    `);

    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION products_schema.credit_application_jobs_set_updated_at()
      RETURNS trigger LANGUAGE plpgsql AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$
    `);

    await queryRunner.query(`
      CREATE TRIGGER "TRG_credit_application_jobs_updated_at"
      BEFORE UPDATE ON products_schema.credit_application_jobs
      FOR EACH ROW EXECUTE FUNCTION products_schema.credit_application_jobs_set_updated_at()
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS "TRG_credit_application_jobs_updated_at"
        ON products_schema.credit_application_jobs
    `);
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS products_schema.credit_application_jobs_set_updated_at`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS products_schema."IDX_credit_application_jobs_status"`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS products_schema.credit_application_jobs`,
    );
  }
}
