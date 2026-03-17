import { MigrationInterface, QueryRunner } from "typeorm";

export class SuppliersAndPurchaseOrders1773300000000
  implements MigrationInterface
{
  name = "SuppliersAndPurchaseOrders1773300000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto"
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "suppliers" (
        "id" BIGSERIAL NOT NULL,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "business_id" BIGINT NOT NULL,
        "bank_account" VARCHAR(500),
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_suppliers" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_suppliers_business_id" UNIQUE ("business_id"),
        CONSTRAINT "FK_suppliers_business_id" FOREIGN KEY ("business_id")
          REFERENCES "businesses"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_suppliers_business_id"
      ON "suppliers" ("business_id")
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "purchase_orders" (
        "id" BIGSERIAL NOT NULL,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "user_id" VARCHAR(255) NOT NULL,
        "supplier_id" BIGINT NOT NULL,
        "amount" DECIMAL(18,2) NOT NULL,
        "document_url" TEXT,
        "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT "PK_purchase_orders" PRIMARY KEY ("id"),
        CONSTRAINT "FK_purchase_orders_supplier_id" FOREIGN KEY ("supplier_id")
          REFERENCES "suppliers"("id") ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_purchase_orders_supplier_id"
      ON "purchase_orders" ("supplier_id")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_purchase_orders_user_id"
      ON "purchase_orders" ("user_id")
    `);

    const partnersFkDefaultCategory = await queryRunner.query(`
      SELECT constraint_name FROM information_schema.table_constraints
      WHERE table_name = 'partners' AND constraint_type = 'FOREIGN KEY'
      AND constraint_name LIKE '%default_category%'
    `);
    if (Array.isArray(partnersFkDefaultCategory) && partnersFkDefaultCategory.length > 0) {
      const name = partnersFkDefaultCategory[0]?.constraint_name;
      if (name) {
        await queryRunner.query(
          `ALTER TABLE "partners" DROP CONSTRAINT IF EXISTS "${name}"`
        );
      }
    }

    await queryRunner.query(
      `ALTER TABLE "partners" DROP COLUMN IF EXISTS "default_category_id"`
    );

    await queryRunner.query(`DROP TABLE IF EXISTS "partner_categories" CASCADE`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS "credit_applications_bnpl" CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "purchase_orders" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "suppliers" CASCADE`);
  }
}
