import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Documentos: FK opcional a catálogo de estados de verificación (`entity_type = documents`).
 * Backfill con `get_status_id('documents','pending')` cuando exista la función y el catálogo.
 */
export class DocumentsVerificationStatusId1990000000000
  implements MigrationInterface
{
  name = 'DocumentsVerificationStatusId1990000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'documents'
        AND column_name = 'verification_status_id'
    `);
    if (col.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."documents"
      ADD COLUMN "verification_status_id" bigint NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."documents"
      ADD CONSTRAINT "FK_documents_verification_status_id"
      FOREIGN KEY ("verification_status_id")
      REFERENCES "transversal_schema"."catalog_status_types"("id")
      ON DELETE SET NULL
      ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."documents" d
      SET "verification_status_id" = get_status_id('documents', 'pending')
      WHERE d."verification_status_id" IS NULL
        AND get_status_id('documents', 'pending') IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'documents'
        AND column_name = 'verification_status_id'
    `);
    if (!col.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."documents"
      DROP CONSTRAINT IF EXISTS "FK_documents_verification_status_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."documents"
      DROP COLUMN "verification_status_id"
    `);
  }
}
