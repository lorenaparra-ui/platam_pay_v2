import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alinea transversal_schema.documents con el modelo operativo:
 * document_url (NOT NULL) y FK opcional a products_schema.credit_applications.
 */
export class DocumentsUrlCreditApplicationFk1910000000000
  implements MigrationInterface
{
  name = 'DocumentsUrlCreditApplicationFk1910000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents"
      ADD COLUMN IF NOT EXISTS "document_url" text
    `);
    await queryRunner.query(`
      UPDATE "transversal_schema"."documents"
      SET "document_url" = ''
      WHERE "document_url" IS NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents"
      ALTER COLUMN "document_url" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents"
      ADD COLUMN IF NOT EXISTS "credit_application_id" bigint
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents"
      ADD CONSTRAINT "FK_documents_credit_application_id"
      FOREIGN KEY ("credit_application_id")
      REFERENCES "products_schema"."credit_applications"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_documents_credit_application_id"
      ON "transversal_schema"."documents" ("credit_application_id")
      WHERE "credit_application_id" IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "transversal_schema"."IDX_documents_credit_application_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents"
      DROP CONSTRAINT IF EXISTS "FK_documents_credit_application_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents"
      DROP COLUMN IF EXISTS "credit_application_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."documents"
      DROP COLUMN IF EXISTS "document_url"
    `);
  }
}
