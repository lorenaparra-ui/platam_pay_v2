import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * `disbursement_schema`: tablas mínimas `loans` / `payments` (FK), `disbursement_batches`,
 * `adjustments`, `payment_allocations`, `disbursements` + ENUMs alineados a `@platam/shared`.
 */
export class DisbursementBatchesAdjustmentsPaymentAllocations2050000000000
  implements MigrationInterface
{
  name = 'DisbursementBatchesAdjustmentsPaymentAllocations2050000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.upEnums(queryRunner);
    await this.upLoansAndPayments(queryRunner);
    await this.upDisbursementBatches(queryRunner);
    await this.upAdjustments(queryRunner);
    await this.upPaymentAllocations(queryRunner);
    await this.upDisbursements(queryRunner);
  }

  private async upEnums(queryRunner: QueryRunner): Promise<void> {
    const stmts = [
      `CREATE TYPE "disbursement_schema"."disbursement_type" AS ENUM ('partner', 'supplier')`,
      `CREATE TYPE "disbursement_schema"."batch_type" AS ENUM ('manual', 'ach')`,
      `CREATE TYPE "disbursement_schema"."disbursement_batches_status" AS ENUM ('pending', 'generated', 'processing', 'disbursed', 'partial_failed')`,
      `CREATE TYPE "disbursement_schema"."adjustments_type" AS ENUM ('partial_return', 'total_return', 'client_pays_partner', 'category_change', 'other')`,
      `CREATE TYPE "disbursement_schema"."adjustments_status" AS ENUM ('pending', 'applied')`,
      `CREATE TYPE "disbursement_schema"."disbursement_status" AS ENUM ('pending', 'disbursed', 'failed')`,
    ];
    for (const sql of stmts) {
      await queryRunner.query(`
        DO $$
        BEGIN
          ${sql};
        EXCEPTION
          WHEN duplicate_object THEN NULL;
        END
        $$
      `);
    }
  }

  private async upLoansAndPayments(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "disbursement_schema"."loans" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_loans" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_loans_external_id" UNIQUE ("external_id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "disbursement_schema"."payments" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_payments" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_payments_external_id" UNIQUE ("external_id")
      )
    `);
  }

  private async upDisbursementBatches(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "disbursement_schema"."disbursement_batches" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "disbursement_type" "disbursement_schema"."disbursement_type" NOT NULL,
        "partner_id" bigint NOT NULL,
        "batch_type" "disbursement_schema"."batch_type" NOT NULL,
        "gross_amount" decimal(18,4) NOT NULL DEFAULT 0,
        "adjustments_amount" decimal(18,4) NOT NULL DEFAULT 0,
        "net_amount" decimal(18,4) NOT NULL DEFAULT 0,
        "total_count" integer NOT NULL DEFAULT 0,
        "success_count" integer NOT NULL DEFAULT 0,
        "failed_count" integer NOT NULL DEFAULT 0,
        "file_url" text,
        "response_file_url" text,
        "voucher_url" text,
        "disbursed_at" date,
        "generated_by" bigint NOT NULL,
        "status" "disbursement_schema"."disbursement_batches_status" NOT NULL DEFAULT 'pending',
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_disbursement_batches" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_disbursement_batches_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_disbursement_batches_partner_id"
          FOREIGN KEY ("partner_id")
          REFERENCES "suppliers_schema"."partners"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_disbursement_batches_generated_by"
          FOREIGN KEY ("generated_by")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
  }

  private async upAdjustments(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "disbursement_schema"."adjustments" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "loan_id" bigint NOT NULL,
        "partner_id" bigint NOT NULL,
        "disbursement_batch_id" bigint,
        "adjustment_type" "disbursement_schema"."adjustments_type" NOT NULL,
        "amount" decimal(18,4) NOT NULL,
        "event_date" date NOT NULL,
        "affects_loan_balance" boolean NOT NULL DEFAULT false,
        "notes" text[],
        "status" "disbursement_schema"."adjustments_status" NOT NULL DEFAULT 'pending',
        "applied_at" TIMESTAMP WITH TIME ZONE,
        "created_by" bigint NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_adjustments" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_adjustments_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_adjustments_loan_id"
          FOREIGN KEY ("loan_id")
          REFERENCES "disbursement_schema"."loans"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_adjustments_partner_id"
          FOREIGN KEY ("partner_id")
          REFERENCES "suppliers_schema"."partners"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_adjustments_disbursement_batch_id"
          FOREIGN KEY ("disbursement_batch_id")
          REFERENCES "disbursement_schema"."disbursement_batches"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_adjustments_created_by"
          FOREIGN KEY ("created_by")
          REFERENCES "transversal_schema"."users"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
  }

  private async upPaymentAllocations(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "disbursement_schema"."payment_allocations" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "payment_id" bigint NOT NULL,
        "loan_id" bigint NOT NULL,
        "allocated_amount" decimal(18,4) NOT NULL,
        "principal_allocated" decimal(18,4) NOT NULL DEFAULT 0,
        "current_interest_allocated" decimal(18,4) NOT NULL DEFAULT 0,
        "overdue_interest_allocated" decimal(18,4) NOT NULL DEFAULT 0,
        "mora_interest_allocated" decimal(18,4) NOT NULL DEFAULT 0,
        "fees_allocated" decimal(18,4) NOT NULL DEFAULT 0,
        "iva_allocated" decimal(18,4) NOT NULL DEFAULT 0,
        "loan_status_after" varchar(15) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_payment_allocations" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_payment_allocations_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_payment_allocations_payment_id"
          FOREIGN KEY ("payment_id")
          REFERENCES "disbursement_schema"."payments"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_payment_allocations_loan_id"
          FOREIGN KEY ("loan_id")
          REFERENCES "disbursement_schema"."loans"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_payment_allocations_payment_id"
      ON "disbursement_schema"."payment_allocations" ("payment_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_payment_allocations_loan_id"
      ON "disbursement_schema"."payment_allocations" ("loan_id")
    `);
  }

  private async upDisbursements(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "disbursement_schema"."disbursements" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "disbursement_type" "disbursement_schema"."disbursement_type" NOT NULL,
        "loan_id" bigint,
        "loan_request_id" bigint,
        "partner_id" bigint,
        "supplier_id" bigint,
        "bank_account_id" bigint NOT NULL,
        "amount" decimal(18,4) NOT NULL,
        "batch_id" bigint,
        "status" "disbursement_schema"."disbursement_status" NOT NULL DEFAULT 'pending',
        "disbursed_at" TIMESTAMP WITH TIME ZONE,
        "failure_reason" text,
        "voucher_url" text,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_disbursements" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_disbursements_external_id" UNIQUE ("external_id"),
        CONSTRAINT "FK_disbursements_batch_id"
          FOREIGN KEY ("batch_id")
          REFERENCES "disbursement_schema"."disbursement_batches"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_disbursements_loan_id"
          FOREIGN KEY ("loan_id")
          REFERENCES "disbursement_schema"."loans"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_disbursements_partner_id"
          FOREIGN KEY ("partner_id")
          REFERENCES "suppliers_schema"."partners"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_disbursements_supplier_id"
          FOREIGN KEY ("supplier_id")
          REFERENCES "suppliers_schema"."suppliers"("id")
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT "FK_disbursements_bank_account_id"
          FOREIGN KEY ("bank_account_id")
          REFERENCES "suppliers_schema"."bank_accounts"("id")
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "FK_disbursements_loan_request_id"
          FOREIGN KEY ("loan_request_id")
          REFERENCES "products_schema"."loan_requests"("id")
          ON DELETE SET NULL ON UPDATE CASCADE
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_disbursements_batch_id"
      ON "disbursement_schema"."disbursements" ("batch_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_disbursements_loan_id"
      ON "disbursement_schema"."disbursements" ("loan_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_disbursements_status"
      ON "disbursement_schema"."disbursements" ("status")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS "disbursement_schema"."idx_disbursements_status"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "disbursement_schema"."idx_disbursements_loan_id"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "disbursement_schema"."idx_disbursements_batch_id"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "disbursement_schema"."disbursements"`);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "disbursement_schema"."IDX_payment_allocations_loan_id"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "disbursement_schema"."IDX_payment_allocations_payment_id"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "disbursement_schema"."payment_allocations"`);

    await queryRunner.query(`DROP TABLE IF EXISTS "disbursement_schema"."adjustments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "disbursement_schema"."disbursement_batches"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "disbursement_schema"."payments"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "disbursement_schema"."loans"`);

    await queryRunner.query(`
      DROP TYPE IF EXISTS "disbursement_schema"."disbursement_status"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "disbursement_schema"."adjustments_status"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "disbursement_schema"."adjustments_type"
    `);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "disbursement_schema"."disbursement_batches_status"
    `);
    await queryRunner.query(`DROP TYPE IF EXISTS "disbursement_schema"."batch_type"`);
    await queryRunner.query(`
      DROP TYPE IF EXISTS "disbursement_schema"."disbursement_type"
    `);
  }
}
