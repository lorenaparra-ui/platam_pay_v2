import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * - partners: supplier_id NOT NULL UNIQUE + FK suppliers (cada partner tiene un supplier; supplier puede existir sin partner).
 * - businesses: business_seniority_id nullable FK business_seniority.
 * - sales_representatives: elimina name, role, status_id.
 *
 * Si existen filas en partners, deben tener supplier_id resuelto (UPDATE manual) antes del ALTER NOT NULL;
 * de lo contrario la migración falla de forma explícita.
 */
export class SuppliersPartnerSupplierSenioritySalesRep1870000000000
  implements MigrationInterface
{
  name = 'SuppliersPartnerSupplierSenioritySalesRep1870000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      ADD COLUMN "supplier_id" bigint NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."businesses"
      ADD COLUMN "business_seniority_id" bigint NULL
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_businesses_business_seniority_id"
      ON "suppliers_schema"."businesses" ("business_seniority_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."businesses"
      ADD CONSTRAINT "FK_businesses_business_seniority_id"
      FOREIGN KEY ("business_seniority_id")
      REFERENCES "suppliers_schema"."business_seniority"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."sales_representatives" DROP COLUMN IF EXISTS "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."sales_representatives" DROP COLUMN IF EXISTS "role"`,
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."sales_representatives" DROP COLUMN IF EXISTS "status_id"`,
    );

    const pending = await queryRunner.query(`
      SELECT COUNT(*)::int AS c
      FROM "suppliers_schema"."partners"
      WHERE "supplier_id" IS NULL
    `);
    const pending_count = (pending[0] as { c: number }).c;
    if (pending_count > 0) {
      throw new Error(
        `Migración 1870000000000: ${pending_count} fila(s) en partners sin supplier_id. ` +
          'Ejecute UPDATE suppliers_schema.partners SET supplier_id = ... y reintente.',
      );
    }

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      ALTER COLUMN "supplier_id" SET NOT NULL
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "UQ_partners_supplier_id"
      ON "suppliers_schema"."partners" ("supplier_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      ADD CONSTRAINT "FK_partners_supplier_id"
      FOREIGN KEY ("supplier_id")
      REFERENCES "suppliers_schema"."suppliers"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      DROP CONSTRAINT IF EXISTS "FK_partners_supplier_id"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."UQ_partners_supplier_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."partners"
      DROP COLUMN IF EXISTS "supplier_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."businesses"
      DROP CONSTRAINT IF EXISTS "FK_businesses_business_seniority_id"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."IDX_businesses_business_seniority_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."businesses"
      DROP COLUMN IF EXISTS "business_seniority_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      ADD COLUMN "name" character varying(255) NOT NULL DEFAULT '',
      ADD COLUMN "role" character varying(100) NOT NULL DEFAULT '',
      ADD COLUMN "status_id" bigint NOT NULL DEFAULT 0
    `);
  }
}
