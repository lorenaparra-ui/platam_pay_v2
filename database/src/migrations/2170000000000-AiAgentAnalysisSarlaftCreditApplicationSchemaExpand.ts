import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alineación HU-06 / HU-07:
 * - `ai_agent_analysis`: URL HTML en S3 y LOC recomendado por el agente.
 * - `ai_agent_analysis_recommendation`: valor `interview`.
 * - `credit_application_status`: `approved_pending_signature` + fila en catálogo transversal.
 * - `sarlaft_checks.status`: de ciclo de consulta (`pending`/`completed`/`error`) a resultado
 *   de negocio (`clean`/`alert`/`blocked`), conservando el nombre de tipo `sarlaft_check_status`.
 * - `categories.is_default`: categoría predeterminada por partner (`CategoryEntity`).
 * - `suppliers_schema.partners`: índice `IDX_partners_state` alineado con `PartnerEntity` / DBML
 *   (la 198 solo garantiza `IDX_partners_business_id`).
 *
 * Mapeo de datos existentes en Sarlaft:
 * - `completed` + sin match → `clean`
 * - `completed` + con match → `alert`
 * - `error` → `blocked`
 * - `pending` → `alert` (consulta sin resultado definitivo; revisión manual)
 */
export class AiAgentAnalysisSarlaftCreditApplicationSchemaExpand2170000000000
  implements MigrationInterface
{
  name = 'AiAgentAnalysisSarlaftCreditApplicationSchemaExpand2170000000000';

  private async upCategoriesIsDefault(queryRunner: QueryRunner): Promise<void> {
    const cols = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'categories'
        AND column_name = 'is_default'
    `);
    if (cols.length) {
      return;
    }
    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      ADD COLUMN "is_default" boolean NOT NULL DEFAULT false
    `);
  }

  /** Índice `IDX_partners_state` (PartnerEntity / DBML; no creado en la 198). */
  private async upPartnersStateIndex(queryRunner: QueryRunner): Promise<void> {
    const partners_table = await queryRunner.query(`
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'partners'
    `);
    if (!partners_table.length) {
      return;
    }

    const state_col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'partners'
        AND column_name = 'state'
    `);
    if (!state_col.length) {
      return;
    }

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_partners_state"
      ON "suppliers_schema"."partners" ("state")
    `);
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.upCategoriesIsDefault(queryRunner);
    await this.upPartnersStateIndex(queryRunner);
    await this.upAiAgentAnalysisColumns(queryRunner);
    await this.upAiAgentRecommendationInterview(queryRunner);
    await this.upCreditApplicationStatusPendingSignature(queryRunner);
    await this.upSarlaftCheckStatusBusinessResult(queryRunner);
  }

  private async upAiAgentAnalysisColumns(queryRunner: QueryRunner): Promise<void> {
    const cols = await queryRunner.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'ai_agent_analysis'
        AND column_name IN ('html_url_agent_analysis', 'agent_recommended_loc')
    `);
    const existing = new Set(cols.map((r: { column_name: string }) => r.column_name));

    if (!existing.has('html_url_agent_analysis')) {
      await queryRunner.query(`
        ALTER TABLE "products_schema"."ai_agent_analysis"
        ADD COLUMN "html_url_agent_analysis" text
      `);
    }
    if (!existing.has('agent_recommended_loc')) {
      await queryRunner.query(`
        ALTER TABLE "products_schema"."ai_agent_analysis"
        ADD COLUMN "agent_recommended_loc" decimal(18,4)
      `);
    }
  }

  private async upAiAgentRecommendationInterview(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_enum e
          JOIN pg_type t ON e.enumtypid = t.oid
          JOIN pg_namespace n ON t.typnamespace = n.oid
          WHERE n.nspname = 'products_schema'
            AND t.typname = 'ai_agent_analysis_recommendation'
            AND e.enumlabel = 'interview'
        ) THEN
          EXECUTE 'ALTER TYPE "products_schema"."ai_agent_analysis_recommendation" ADD VALUE ''interview''';
        END IF;
      END
      $$
    `);
  }

  private async upCreditApplicationStatusPendingSignature(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_enum e
          JOIN pg_type t ON e.enumtypid = t.oid
          JOIN pg_namespace n ON t.typnamespace = n.oid
          WHERE n.nspname = 'products_schema'
            AND t.typname = 'credit_application_status'
            AND e.enumlabel = 'approved_pending_signature'
        ) THEN
          EXECUTE 'ALTER TYPE "products_schema"."credit_application_status" ADD VALUE ''approved_pending_signature''';
        END IF;
      END
      $$
    `);

    const catalog = await queryRunner.query(`
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'catalog_status_types'
    `);
    const legacy_statuses = await queryRunner.query(`
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'statuses'
    `);

    const insert_sql = `
      INSERT INTO transversal_schema.TARGET (
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
        'approved_pending_signature',
        'Aprobado pendiente de firma',
        NULL,
        true
      ON CONFLICT ("entity_type", "code") DO UPDATE SET
        "display_name" = EXCLUDED."display_name",
        "is_active" = true,
        "updated_at" = now()
    `;

    if (catalog.length) {
      await queryRunner.query(insert_sql.replace('TARGET', '"catalog_status_types"'));
    } else if (legacy_statuses.length) {
      await queryRunner.query(insert_sql.replace('TARGET', '"statuses"'));
    }
  }

  private async upSarlaftCheckStatusBusinessResult(queryRunner: QueryRunner): Promise<void> {
    const hasLegacySarlaftStatusType = await queryRunner.query(`
      SELECT 1
      FROM pg_enum e
      JOIN pg_type t ON e.enumtypid = t.oid
      JOIN pg_namespace n ON t.typnamespace = n.oid
      WHERE n.nspname = 'products_schema'
        AND t.typname = 'sarlaft_check_status'
        AND e.enumlabel IN ('pending', 'completed', 'error')
      LIMIT 1
    `);
    if (!hasLegacySarlaftStatusType.length) {
      return;
    }

    const v2Exists = await queryRunner.query(`
      SELECT 1
      FROM pg_type t
      JOIN pg_namespace n ON t.typnamespace = n.oid
      WHERE n.nspname = 'products_schema'
        AND t.typname = 'sarlaft_check_status_v2'
    `);
    if (!v2Exists.length) {
      await queryRunner.query(`
        CREATE TYPE "products_schema"."sarlaft_check_status_v2" AS ENUM ('clean', 'alert', 'blocked')
      `);
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."sarlaft_checks"
      ALTER COLUMN "status" DROP DEFAULT
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."sarlaft_checks"
      ALTER COLUMN "status" TYPE "products_schema"."sarlaft_check_status_v2"
      USING (
        CASE
          WHEN "status"::text = 'completed' AND NOT COALESCE("has_match", false)
            THEN 'clean'::"products_schema"."sarlaft_check_status_v2"
          WHEN "status"::text = 'completed' AND COALESCE("has_match", false)
            THEN 'alert'::"products_schema"."sarlaft_check_status_v2"
          WHEN "status"::text = 'error'
            THEN 'blocked'::"products_schema"."sarlaft_check_status_v2"
          WHEN "status"::text = 'pending'
            THEN 'alert'::"products_schema"."sarlaft_check_status_v2"
          ELSE 'alert'::"products_schema"."sarlaft_check_status_v2"
        END
      )
    `);

    await queryRunner.query(`
      DROP TYPE "products_schema"."sarlaft_check_status"
    `);

    await queryRunner.query(`
      ALTER TYPE "products_schema"."sarlaft_check_status_v2"
      RENAME TO sarlaft_check_status
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."sarlaft_checks"
      ALTER COLUMN "status" SET DEFAULT 'clean'::"products_schema"."sarlaft_check_status"
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'AiAgentAnalysisSarlaftCreditApplicationSchemaExpand2170000000000: reversión no soportada (valores ENUM y sustitución de tipo Sarlaft).',
    );
  }
}
