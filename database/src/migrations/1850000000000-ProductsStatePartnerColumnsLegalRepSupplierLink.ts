import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * - products_schema: credit_facilities + categories `status_id` → `state` (ENUM active/inactive).
 * - suppliers_schema: partners elimina business_id, columnas obsoletas y `status_id` → `state` (ENUM).
 * - legal_representatives: elimina `business_id`; suppliers añade `legal_representative_id` (1:1 opcional).
 */
export class ProductsStatePartnerColumnsLegalRepSupplierLink1850000000000
  implements MigrationInterface
{
  name = 'ProductsStatePartnerColumnsLegalRepSupplierLink1850000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "products_schema"."credit_facility_state" AS ENUM ('active', 'inactive')
    `);
    await queryRunner.query(`
      CREATE TYPE "suppliers_schema"."partner_state" AS ENUM ('active', 'inactive')
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ADD COLUMN "state" "products_schema"."credit_facility_state" NOT NULL DEFAULT 'active'
    `);
    await queryRunner.query(`
      UPDATE "products_schema"."credit_facilities" cf
      SET "state" = CASE
        WHEN EXISTS (
          SELECT 1 FROM "transversal_schema"."statuses" s
          WHERE s.id = cf.status_id AND s.code = 'active'
        ) THEN 'active'::"products_schema"."credit_facility_state"
        ELSE 'inactive'::"products_schema"."credit_facility_state"
      END
    `);
    await queryRunner.query(
      `ALTER TABLE "products_schema"."credit_facilities" DROP COLUMN "status_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ALTER COLUMN "state" SET DEFAULT 'active'::"products_schema"."credit_facility_state"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      ADD COLUMN "state" "products_schema"."credit_facility_state" NOT NULL DEFAULT 'active'
    `);
    await queryRunner.query(`
      UPDATE "products_schema"."categories" c
      SET "state" = CASE
        WHEN EXISTS (
          SELECT 1 FROM "transversal_schema"."statuses" s
          WHERE s.id = c.status_id AND s.code = 'active'
        ) THEN 'active'::"products_schema"."credit_facility_state"
        ELSE 'inactive'::"products_schema"."credit_facility_state"
      END
    `);
    await queryRunner.query(
      `ALTER TABLE "products_schema"."categories" DROP COLUMN "status_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      ALTER COLUMN "state" SET DEFAULT 'active'::"products_schema"."credit_facility_state"
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      ADD COLUMN "legal_representative_id" bigint NULL
    `);
    await queryRunner.query(`
      UPDATE "suppliers_schema"."suppliers" s
      SET "legal_representative_id" = sub.lr_id
      FROM (
        SELECT DISTINCT ON (lr.business_id) lr.id AS lr_id, lr.business_id
        FROM "suppliers_schema"."legal_representatives" lr
        ORDER BY lr.business_id, lr.is_primary DESC, lr.id ASC
      ) sub
      WHERE s.business_id = sub.business_id
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_suppliers_legal_representative_id"
      ON "suppliers_schema"."suppliers" ("legal_representative_id")
      WHERE "legal_representative_id" IS NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      DROP CONSTRAINT "FK_legal_representatives_business"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."IDX_legal_representatives_business_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      DROP COLUMN "business_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      ADD CONSTRAINT "FK_suppliers_legal_representative_id"
      FOREIGN KEY ("legal_representative_id")
      REFERENCES "suppliers_schema"."legal_representatives"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      ADD COLUMN "state" "suppliers_schema"."partner_state" NOT NULL DEFAULT 'active'
    `);
    await queryRunner.query(`
      UPDATE "suppliers_schema"."partners" p
      SET "state" = CASE
        WHEN EXISTS (
          SELECT 1 FROM "transversal_schema"."statuses" s
          WHERE s.id = p.status_id AND s.entity_type = 'partners' AND s.code = 'active'
        ) THEN 'active'::"suppliers_schema"."partner_state"
        ELSE 'inactive'::"suppliers_schema"."partner_state"
      END
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      DROP COLUMN "business_id",
      DROP COLUMN "sales_rep_role_name",
      DROP COLUMN "sales_rep_role_name_plural",
      DROP COLUMN "api_key_hash",
      DROP COLUMN "default_rep_id",
      DROP COLUMN "status_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      ALTER COLUMN "state" SET DEFAULT 'active'::"suppliers_schema"."partner_state"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      ADD COLUMN "business_id" bigint NOT NULL DEFAULT 0,
      ADD COLUMN "sales_rep_role_name" character varying(50) DEFAULT 'Sales Rep',
      ADD COLUMN "sales_rep_role_name_plural" character varying(50) DEFAULT 'Sales Reps',
      ADD COLUMN "api_key_hash" boolean DEFAULT false,
      ADD COLUMN "default_rep_id" bigint,
      ADD COLUMN "status_id" bigint NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      UPDATE "suppliers_schema"."partners" p
      SET "status_id" = COALESCE(
        (SELECT s.id FROM transversal_schema.statuses s
         WHERE s.entity_type = 'partners' AND s.code = 'active' LIMIT 1),
        0
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."partners" DROP COLUMN "state"`,
    );
    await queryRunner.query(
      `DROP TYPE "suppliers_schema"."partner_state"`,
    );

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      DROP CONSTRAINT "FK_suppliers_legal_representative_id"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."UQ_suppliers_legal_representative_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      ADD COLUMN "business_id" bigint NULL
    `);
    await queryRunner.query(`
      UPDATE "suppliers_schema"."legal_representatives" lr
      SET "business_id" = s.business_id
      FROM "suppliers_schema"."suppliers" s
      WHERE s.legal_representative_id = lr.id
    `);
    await queryRunner.query(`
      UPDATE "suppliers_schema"."legal_representatives" lr
      SET "business_id" = (SELECT b.id FROM "suppliers_schema"."businesses" b ORDER BY b.id LIMIT 1)
      WHERE lr.business_id IS NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      ALTER COLUMN "business_id" SET NOT NULL
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      DROP COLUMN "legal_representative_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."legal_representatives"
      ADD CONSTRAINT "FK_legal_representatives_business"
      FOREIGN KEY ("business_id")
      REFERENCES "suppliers_schema"."businesses"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_legal_representatives_business_id"
      ON "suppliers_schema"."legal_representatives" ("business_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      ADD COLUMN "status_id" bigint NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      UPDATE "products_schema"."categories" SET "status_id" = 0
    `);
    await queryRunner.query(
      `ALTER TABLE "products_schema"."categories" DROP COLUMN "state"`,
    );

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_facilities"
      ADD COLUMN "status_id" bigint NOT NULL DEFAULT 0
    `);
    await queryRunner.query(`
      UPDATE "products_schema"."credit_facilities" SET "status_id" = 0
    `);
    await queryRunner.query(
      `ALTER TABLE "products_schema"."credit_facilities" DROP COLUMN "state"`,
    );

    await queryRunner.query(
      `DROP TYPE "products_schema"."credit_facility_state"`,
    );
  }
}
