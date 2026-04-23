import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Solicitudes de crédito: FK opcional al representante de ventas que registró la solicitud
 * (suppliers_schema.sales_representatives).
 */
export class CreditApplicationsSalesRepresentativeFk1930000000000
  implements MigrationInterface
{
  name = 'CreditApplicationsSalesRepresentativeFk1930000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      ADD COLUMN IF NOT EXISTS "sales_representative_id" bigint
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      ADD CONSTRAINT "FK_credit_applications_sales_representative_id"
      FOREIGN KEY ("sales_representative_id")
      REFERENCES "suppliers_schema"."sales_representatives"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_apps_sales_representative_id"
      ON "products_schema"."credit_applications" ("sales_representative_id")
      WHERE "sales_representative_id" IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."idx_credit_apps_sales_representative_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      DROP CONSTRAINT IF EXISTS "FK_credit_applications_sales_representative_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      DROP COLUMN IF EXISTS "sales_representative_id"
    `);
  }
}
