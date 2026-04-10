import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alineación con libs (suppliers-data / transversal-data):
 * - suppliers_schema.bank_accounts.account_type → enum saving | checking (@platam/shared AccountTypes).
 * - transversal_schema.persons.bank_account_id → FK opcional 1:1 a bank_accounts (PersonEntity).
 * - Limpieza legado: tabla puente partner_default_categories y columna partners.default_category_ids
 *   si existen (modelo actual: CategoryEntity.partner_id 1—N).
 */
export class UpdateSuppliersEntitiesAlignment1970000000000
  implements MigrationInterface
{
  name = 'UpdateSuppliersEntitiesAlignment1970000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const bank_accounts_account_type = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'bank_accounts'
        AND column_name = 'account_type'
    `);

    if (!bank_accounts_account_type.length) {
      await queryRunner.query(`
        CREATE TYPE "suppliers_schema"."bank_account_account_type_enum" AS ENUM ('saving', 'checking')
      `);
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."bank_accounts"
        ADD COLUMN "account_type" "suppliers_schema"."bank_account_account_type_enum" NOT NULL DEFAULT 'saving'
      `);
    }

    const persons_bank_account = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'persons'
        AND column_name = 'bank_account_id'
    `);

    if (!persons_bank_account.length) {
      await queryRunner.query(`
        ALTER TABLE "transversal_schema"."persons"
        ADD COLUMN "bank_account_id" bigint NULL
      `);
      await queryRunner.query(`
        ALTER TABLE "transversal_schema"."persons"
        ADD CONSTRAINT "FK_persons_bank_account_id"
        FOREIGN KEY ("bank_account_id")
        REFERENCES "suppliers_schema"."bank_accounts"("id")
        ON DELETE SET NULL
        ON UPDATE NO ACTION
      `);
      await queryRunner.query(`
        CREATE UNIQUE INDEX "UQ_persons_bank_account_id"
        ON "transversal_schema"."persons" ("bank_account_id")
        WHERE "bank_account_id" IS NOT NULL
      `);
    }

    await queryRunner.query(`
      DROP INDEX IF EXISTS "suppliers_schema"."IDX_partner_default_categories_category_id"
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS "suppliers_schema"."partner_default_categories"
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      DROP COLUMN IF EXISTS "default_category_ids"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      ADD COLUMN IF NOT EXISTS "default_category_ids" jsonb NULL
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "suppliers_schema"."partner_default_categories" (
        "partner_id" bigint NOT NULL,
        "category_id" bigint NOT NULL,
        CONSTRAINT "PK_partner_default_categories"
          PRIMARY KEY ("partner_id", "category_id"),
        CONSTRAINT "FK_partner_default_categories_partner_id"
          FOREIGN KEY ("partner_id")
          REFERENCES "suppliers_schema"."partners"("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        CONSTRAINT "FK_partner_default_categories_category_id"
          FOREIGN KEY ("category_id")
          REFERENCES "products_schema"."categories"("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_partner_default_categories_category_id"
      ON "suppliers_schema"."partner_default_categories" ("category_id")
    `);

    const fk = await queryRunner.query(`
      SELECT 1
      FROM information_schema.table_constraints
      WHERE constraint_schema = 'transversal_schema'
        AND table_name = 'persons'
        AND constraint_name = 'FK_persons_bank_account_id'
    `);

    if (fk.length) {
      await queryRunner.query(`
        ALTER TABLE "transversal_schema"."persons"
        DROP CONSTRAINT "FK_persons_bank_account_id"
      `);
    }

    await queryRunner.query(`
      DROP INDEX IF EXISTS "transversal_schema"."UQ_persons_bank_account_id"
    `);

    const persons_bank_account = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'transversal_schema'
        AND table_name = 'persons'
        AND column_name = 'bank_account_id'
    `);

    if (persons_bank_account.length) {
      await queryRunner.query(`
        ALTER TABLE "transversal_schema"."persons"
        DROP COLUMN "bank_account_id"
      `);
    }

    const bank_accounts_account_type = await queryRunner.query(`
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'suppliers_schema'
        AND table_name = 'bank_accounts'
        AND column_name = 'account_type'
    `);

    if (bank_accounts_account_type.length) {
      await queryRunner.query(`
        ALTER TABLE "suppliers_schema"."bank_accounts"
        DROP COLUMN "account_type"
      `);
    }

    await queryRunner.query(`
      DROP TYPE IF EXISTS "suppliers_schema"."bank_account_account_type_enum"
    `);
  }
}
