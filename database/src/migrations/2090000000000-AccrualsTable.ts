import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Devengos diarios por préstamo (`accruals`) en `disbursement_schema`.
 */
export class AccrualsTable2090000000000 implements MigrationInterface {
  name = 'AccrualsTable2090000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "disbursement_schema"."accruals" (
        "id" BIGSERIAL NOT NULL,
        "loan_id" bigint NOT NULL,
        "calculation_date" date NOT NULL,
        "balance_principal_overdue" decimal(18,4) NOT NULL DEFAULT 0,
        "daily_interest_current" decimal(18,4) NOT NULL DEFAULT 0,
        "daily_interest_mora" decimal(18,4) NOT NULL DEFAULT 0,
        "daily_fees" decimal(18,4) NOT NULL DEFAULT 0,
        "status_after" varchar(15) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_accruals" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_accruals_loan_id_calculation_date" UNIQUE ("loan_id", "calculation_date"),
        CONSTRAINT "FK_accruals_loan_id"
          FOREIGN KEY ("loan_id")
          REFERENCES "disbursement_schema"."loans"("id")
          ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_accruals_calculation_date"
      ON "disbursement_schema"."accruals" ("calculation_date")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "disbursement_schema"."IDX_accruals_calculation_date"
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "disbursement_schema"."accruals"`);
  }
}
