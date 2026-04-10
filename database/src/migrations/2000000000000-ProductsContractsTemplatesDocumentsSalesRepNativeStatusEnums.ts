import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Sustituye FK `status_id` / `verification_status_id` hacia `catalog_status_types`
 * por columnas ENUM nativas alineadas con `@platam/shared` (mismo patrón que `users.state`).
 *
 * - contract_templates.state → reutiliza `products_schema.credit_facility_state` (active | inactive).
 * - contracts.state → `products_schema.contract_catalog_status`.
 * - documents.verification_status → `products_schema.document_verification_status`.
 * - sales_representatives.state → `suppliers_schema.sales_representative_state` (columna ausente tras 187).
 */
export class ProductsContractsTemplatesDocumentsSalesRepNativeStatusEnums2000000000000
  implements MigrationInterface
{
  name = 'ProductsContractsTemplatesDocumentsSalesRepNativeStatusEnums2000000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.up_contract_catalog_status_type(queryRunner);
    await this.up_document_verification_status_type(queryRunner);
    await this.up_sales_rep_state_type(queryRunner);
    await this.up_contract_templates_state(queryRunner);
    await this.up_contracts_state(queryRunner);
    await this.up_documents_verification_status(queryRunner);
    await this.up_sales_representatives_state(queryRunner);
  }

  private async up_contract_catalog_status_type(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "products_schema"."contract_catalog_status" AS ENUM ('pending', 'signed', 'cancelled');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);
  }

  private async up_document_verification_status_type(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "products_schema"."document_verification_status" AS ENUM ('pending', 'verified', 'rejected');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);
  }

  private async up_sales_rep_state_type(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "suppliers_schema"."sales_representative_state" AS ENUM ('active', 'inactive');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END
      $$
    `);
  }

  private async up_contract_templates_state(queryRunner: QueryRunner): Promise<void> {
    const col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'contract_templates'
        AND column_name = 'state'
    `);
    if (col.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD COLUMN "state" "products_schema"."credit_facility_state" NOT NULL DEFAULT 'active'
    `);

    const has_status_id = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'contract_templates'
        AND column_name = 'status_id'
    `);
    if (has_status_id.length) {
      await queryRunner.query(`
        UPDATE "products_schema"."contract_templates" t
        SET "state" = s.code::"products_schema"."credit_facility_state"
        FROM "transversal_schema"."catalog_status_types" s
        WHERE t."status_id" = s.id AND s.entity_type = 'contract_templates'
      `);

      await queryRunner.query(`
        ALTER TABLE "products_schema"."contract_templates"
        DROP CONSTRAINT IF EXISTS "FK_contract_templates_status_id"
      `);
      await queryRunner.query(`
        DROP INDEX IF EXISTS "products_schema"."IDX_contract_templates_status_id"
      `);
      await queryRunner.query(`
        ALTER TABLE "products_schema"."contract_templates"
        DROP COLUMN "status_id"
      `);
    }

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_contract_templates_state"
      ON "products_schema"."contract_templates" ("state")
    `);
  }

  private async up_contracts_state(queryRunner: QueryRunner): Promise<void> {
    const col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'contracts'
        AND column_name = 'state'
    `);
    if (col.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      ADD COLUMN "state" "products_schema"."contract_catalog_status" NOT NULL DEFAULT 'pending'
    `);

    const has_status_id = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'contracts'
        AND column_name = 'status_id'
    `);
    if (has_status_id.length) {
      await queryRunner.query(`
        UPDATE "products_schema"."contracts" c
        SET "state" = s.code::"products_schema"."contract_catalog_status"
        FROM "transversal_schema"."catalog_status_types" s
        WHERE c."status_id" = s.id AND s.entity_type = 'contracts'
      `);

      await queryRunner.query(`
        ALTER TABLE "products_schema"."contracts"
        DROP CONSTRAINT IF EXISTS "FK_contracts_status_id"
      `);
      await queryRunner.query(`
        DROP INDEX IF EXISTS "products_schema"."IDX_contracts_status_id"
      `);
      await queryRunner.query(`
        ALTER TABLE "products_schema"."contracts"
        DROP COLUMN "status_id"
      `);
    }

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_contracts_state"
      ON "products_schema"."contracts" ("state")
    `);
  }

  private async up_documents_verification_status(queryRunner: QueryRunner): Promise<void> {
    const has_old = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'documents'
        AND column_name = 'verification_status_id'
    `);
    const has_new = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'products_schema'
        AND table_name = 'documents'
        AND column_name = 'verification_status'
    `);
    if (has_new.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "products_schema"."documents"
      ADD COLUMN "verification_status" "products_schema"."document_verification_status" NULL
    `);

    if (has_old.length) {
      await queryRunner.query(`
        UPDATE "products_schema"."documents" d
        SET "verification_status" = s.code::"products_schema"."document_verification_status"
        FROM "transversal_schema"."catalog_status_types" s
        WHERE d."verification_status_id" IS NOT NULL
          AND d."verification_status_id" = s.id
          AND s.entity_type = 'documents'
      `);

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

  private async up_sales_representatives_state(queryRunner: QueryRunner): Promise<void> {
    const col = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'sales_representatives'
        AND column_name = 'state'
    `);
    if (col.length) {
      return;
    }

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      ADD COLUMN "state" "suppliers_schema"."sales_representative_state" NOT NULL DEFAULT 'active'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'ProductsContractsTemplatesDocumentsSalesRepNativeStatusEnums2000000000000: reversión manual requerida (restaurar status_id y datos desde catálogo).',
    );
  }
}
