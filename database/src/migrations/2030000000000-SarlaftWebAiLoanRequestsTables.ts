import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Tablas en `products_schema`: sarlaft_checks, web_queries, ai_agent_analysis, loan_requests,
 * con ENUMs alineados a `@platam/shared`.
 */
export class SarlaftWebAiLoanRequestsTables2030000000000
  implements MigrationInterface
{
  name = 'SarlaftWebAiLoanRequestsTables2030000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.createEnumTypes(queryRunner);
    await this.createSarlaftChecks(queryRunner);
    await this.createWebQueries(queryRunner);
    await this.createAiAgentAnalysis(queryRunner);
    await this.createLoanRequests(queryRunner);
  }

  private async createEnumTypes(queryRunner: QueryRunner): Promise<void> {
    const enums: string[] = [
      `CREATE TYPE "products_schema"."sarlaft_check_status" AS ENUM ('pending', 'completed', 'error')`,
      `CREATE TYPE "products_schema"."web_query_type" AS ENUM ('bdme', 'rama_judicial')`,
      `CREATE TYPE "products_schema"."ai_agent_analysis_recommendation" AS ENUM ('hitl', 'auto_approve', 'auto_reject')`,
      `CREATE TYPE "products_schema"."loan_request_product_type" AS ENUM ('bnpl_partner', 'bnpl_supplier')`,
      `CREATE TYPE "products_schema"."loan_request_modality" AS ENUM ('bullet', 'cuotas')`,
      `CREATE TYPE "products_schema"."loan_request_channel" AS ENUM ('sr_portal', 'client_portal', 'api')`,
      `CREATE TYPE "products_schema"."loan_request_status" AS ENUM (
        'draft',
        'pending_client_approval',
        'pending_partner_approval',
        'pending_platam_review',
        'approved',
        'rejected',
        'cancelled'
      )`,
    ];
    for (const ddl of enums) {
      await queryRunner.query(`
        DO $$
        BEGIN
          ${ddl};
        EXCEPTION
          WHEN duplicate_object THEN NULL;
        END
        $$
      `);
    }
  }

  private async createSarlaftChecks(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products_schema"."sarlaft_checks" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "credit_application_id" bigint NOT NULL,
        "person_id" bigint NOT NULL,
        "business_id" bigint,
        "has_match" boolean NOT NULL,
        "status" "products_schema"."sarlaft_check_status" NOT NULL DEFAULT 'pending',
        "consulted_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "sources" jsonb,
        "detail" text,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sarlaft_checks" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_sarlaft_checks_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_sarlaft_checks_credit_application_id"
          FOREIGN KEY ("credit_application_id")
          REFERENCES "products_schema"."credit_applications"("id")
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_sarlaft_checks_person_id"
          FOREIGN KEY ("person_id")
          REFERENCES "transversal_schema"."persons"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_sarlaft_checks_business_id"
          FOREIGN KEY ("business_id")
          REFERENCES "suppliers_schema"."businesses"("id")
          ON DELETE SET NULL ON UPDATE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_sarlaft_checks_credit_application_id"
      ON "products_schema"."sarlaft_checks" ("credit_application_id")
    `);
  }

  private async createWebQueries(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products_schema"."web_queries" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "credit_application_id" bigint NOT NULL,
        "query_type" "products_schema"."web_query_type" NOT NULL,
        "person_id" bigint,
        "consulted_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "query_result" jsonb,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_web_queries" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_web_queries_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_web_queries_credit_application_id"
          FOREIGN KEY ("credit_application_id")
          REFERENCES "products_schema"."credit_applications"("id")
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_web_queries_person_id"
          FOREIGN KEY ("person_id")
          REFERENCES "transversal_schema"."persons"("id")
          ON DELETE SET NULL ON UPDATE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_web_queries_credit_application_id"
      ON "products_schema"."web_queries" ("credit_application_id")
    `);
  }

  private async createAiAgentAnalysis(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products_schema"."ai_agent_analysis" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "credit_application_id" bigint NOT NULL,
        "analysis_result" jsonb NOT NULL,
        "recommendation" "products_schema"."ai_agent_analysis_recommendation" NOT NULL,
        "confidence_score" decimal(5,4),
        "analyzed_at" TIMESTAMP WITH TIME ZONE NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_ai_agent_analysis" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_ai_agent_analysis_external_id" UNIQUE ("external_id"),
        CONSTRAINT "UQ_ai_agent_analysis_credit_application_id" UNIQUE ("credit_application_id"),
        CONSTRAINT "FK_ai_agent_analysis_credit_application_id"
          FOREIGN KEY ("credit_application_id")
          REFERENCES "products_schema"."credit_applications"("id")
          ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);
  }

  private async createLoanRequests(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products_schema"."loan_requests" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "credit_facility_id" bigint NOT NULL,
        "category_id" bigint NOT NULL,
        "partner_id" bigint,
        "supplier_id" bigint,
        "sales_representative_id" bigint,
        "product_type" "products_schema"."loan_request_product_type" NOT NULL,
        "loan_modality" "products_schema"."loan_request_modality" NOT NULL,
        "channel" "products_schema"."loan_request_channel" NOT NULL,
        "order_reference" varchar(255),
        "requested_amount" decimal(18,4) NOT NULL,
        "confirmed_amount" decimal(18,4),
        "installment_count" integer,
        "initial_payment_amount" decimal(18,4),
        "initial_payment_paid" boolean NOT NULL DEFAULT false,
        "requires_client_approval" boolean NOT NULL DEFAULT false,
        "client_approved_at" TIMESTAMP WITH TIME ZONE,
        "client_rejection_reason" text,
        "partner_confirmed_at" TIMESTAMP WITH TIME ZONE,
        "partner_rejection_reason" text,
        "invoice_url" text,
        "notes" text,
        "status" "products_schema"."loan_request_status" NOT NULL DEFAULT 'draft',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_loan_requests" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_loan_requests_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_loan_requests_credit_facility_id"
          FOREIGN KEY ("credit_facility_id")
          REFERENCES "products_schema"."credit_facilities"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_loan_requests_category_id"
          FOREIGN KEY ("category_id")
          REFERENCES "products_schema"."categories"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_loan_requests_partner_id"
          FOREIGN KEY ("partner_id")
          REFERENCES "suppliers_schema"."partners"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_loan_requests_supplier_id"
          FOREIGN KEY ("supplier_id")
          REFERENCES "suppliers_schema"."suppliers"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_loan_requests_sales_representative_id"
          FOREIGN KEY ("sales_representative_id")
          REFERENCES "suppliers_schema"."sales_representatives"("id")
          ON DELETE SET NULL ON UPDATE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_loan_requests_credit_facility_id"
      ON "products_schema"."loan_requests" ("credit_facility_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_loan_requests_status"
      ON "products_schema"."loan_requests" ("status")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_loan_requests_partner_id"
      ON "products_schema"."loan_requests" ("partner_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_loan_requests_partner_id"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_loan_requests_status"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_loan_requests_credit_facility_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "products_schema"."loan_requests"`);

    await queryRunner.query(`DROP TABLE IF EXISTS "products_schema"."ai_agent_analysis"`);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_web_queries_credit_application_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "products_schema"."web_queries"`);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_sarlaft_checks_credit_application_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "products_schema"."sarlaft_checks"`);

    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."loan_request_status"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."loan_request_channel"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."loan_request_modality"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."loan_request_product_type"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."ai_agent_analysis_recommendation"
    `);
    await queryRunner.query(`DROP TYPE IF EXISTS "products_schema"."web_query_type"`);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "products_schema"."sarlaft_check_status"
    `);
  }
}
