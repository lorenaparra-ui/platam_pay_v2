import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Solicitudes de crédito: columna nativa `status` (ENUM en products_schema),
 * alineada con `StatusesCreditApplications` / catálogo transversal.
 *
 * - Mantiene `transversal_schema.statuses` (entity_type = credit_applications) para APIs/catálogo.
 * - Crea `products_schema.credit_application_status`, migra datos desde `status_id`, elimina `status_id`.
 * - Remapeo: in_study → under_review, delinquent → closed; huérfanos → in_progress.
 */
export class CreditApplicationsStatusesCatalog1900000000000
  implements MigrationInterface
{
  name = 'CreditApplicationsStatusesCatalog1900000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO transversal_schema.statuses (
        "external_id",
        "entity_type",
        "code",
        "display_name",
        "description",
        "is_active"
      )
      SELECT
        gen_random_uuid(),
        'credit_applications',
        v.code,
        v.display_name,
        NULL,
        true
      FROM (VALUES
        ('in_progress', 'En proceso'),
        ('duplicate', 'Duplicado'),
        ('under_review', 'En estudio'),
        ('sarlaft_match', 'Coincidencia Sarlaft'),
        ('experian_query_error', 'Error consulta Experian'),
        ('ai_agent_error', 'Error agente IA'),
        ('in_interview', 'En entrevista'),
        ('hcpj_query_error', 'Error consulta HCPJ'),
        ('pending_authorization', 'Pendiente autorización'),
        ('authorized', 'Autorizado'),
        ('rejected', 'Rechazado'),
        ('cancelled', 'Cancelado'),
        ('closed', 'Cerrado')
      ) AS v(code, display_name)
      ON CONFLICT ("entity_type", "code") DO UPDATE SET
        "display_name" = EXCLUDED."display_name",
        "is_active" = true,
        "updated_at" = now()
    `);

    await queryRunner.query(`
      CREATE TYPE "products_schema"."credit_application_status" AS ENUM (
        'in_progress',
        'duplicate',
        'under_review',
        'sarlaft_match',
        'experian_query_error',
        'ai_agent_error',
        'in_interview',
        'hcpj_query_error',
        'pending_authorization',
        'authorized',
        'rejected',
        'cancelled',
        'closed'
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      ADD COLUMN "status" "products_schema"."credit_application_status"
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."credit_applications" ca
      SET "status" = COALESCE(
        (
          SELECT (
            CASE
              WHEN s."code" = 'in_study' THEN 'under_review'
              WHEN s."code" = 'delinquent' THEN 'closed'
              WHEN s."code" IN (
                'in_progress', 'duplicate', 'under_review', 'sarlaft_match',
                'experian_query_error', 'ai_agent_error', 'in_interview',
                'hcpj_query_error', 'pending_authorization', 'authorized',
                'rejected', 'cancelled', 'closed'
              ) THEN s."code"
              ELSE 'in_progress'
            END
          )::"products_schema"."credit_application_status"
          FROM "transversal_schema"."statuses" s
          WHERE s."id" = ca."status_id"
            AND s."entity_type" = 'credit_applications'
        ),
        'in_progress'::"products_schema"."credit_application_status"
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      ALTER COLUMN "status" SET DEFAULT 'in_progress'::"products_schema"."credit_application_status"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      ALTER COLUMN "status" SET NOT NULL
    `);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS "trg_credit_applications_validate_status"
      ON "products_schema"."credit_applications"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      DROP CONSTRAINT IF EXISTS "FK_credit_applications_status_id"
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."idx_credit_apps_status_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      DROP COLUMN "status_id"
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_credit_applications_status"
      ON "products_schema"."credit_applications" ("status")
    `);

    await queryRunner.query(`
      DELETE FROM "transversal_schema"."statuses" s
      WHERE s."entity_type" = 'credit_applications'
        AND s."code" IN ('in_study', 'delinquent')
        AND NOT EXISTS (
          SELECT 1 FROM "products_schema"."credit_applications" ca
          WHERE ca."status"::text = s."code"
        )
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'CreditApplicationsStatusesCatalog1900000000000: migración irreversible.',
    );
  }
}
