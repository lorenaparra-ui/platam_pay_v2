import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Expand → datos → contract:
 * - transversal: users `status_id` → `state` (ENUM active/inactive), `person_id` FK persons;
 *   role_permissions FK → permissions; elimina `states`.
 * - Mueve tablas: guarantors, shareholders, business_seniority → suppliers_schema;
 *   contract_signers → products_schema.
 * - suppliers: FK suppliers.business_id → businesses; purchase_orders.supplier_id → suppliers;
 *   sales_representatives.partner_id → partners; shareholders.company_id → business_id + FK businesses.
 * - Elimina credit_applications_bnpl y filas de statuses asociadas.
 * - guarantors: FK credit_application_id → products_schema.credit_applications (tras limpieza de huérfanos).
 *
 * down(): no soportado (movimiento de esquemas y drops).
 */
export class TransversalSuppliersProductsRealignment1860000000000
  implements MigrationInterface
{
  name = 'TransversalSuppliersProductsRealignment1860000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."role_permissions"
      ADD CONSTRAINT "FK_role_permissions_permission_id"
      FOREIGN KEY ("permission_id")
      REFERENCES "transversal_schema"."permissions"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      CREATE TYPE "transversal_schema"."user_state" AS ENUM ('active', 'inactive')
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD COLUMN "state" "transversal_schema"."user_state" NOT NULL DEFAULT 'active'
    `);

    await queryRunner.query(`
      UPDATE "transversal_schema"."users" u
      SET "state" = CASE
        WHEN EXISTS (
          SELECT 1 FROM "transversal_schema"."statuses" s
          WHERE s.id = u.status_id AND s.entity_type = 'users' AND s.code = 'active'
        ) THEN 'active'::"transversal_schema"."user_state"
        ELSE 'inactive'::"transversal_schema"."user_state"
      END
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD COLUMN "person_id" bigint NULL
    `);

    await queryRunner.query(`
      UPDATE "transversal_schema"."users" u
      SET "person_id" = sub.pid
      FROM (
        SELECT DISTINCT ON (p.user_id) p.user_id AS uid, p.id AS pid
        FROM "transversal_schema"."persons" p
        ORDER BY p.user_id, p.id ASC
      ) sub
      WHERE u.id = sub.uid
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."contract_signers"
      DROP CONSTRAINT IF EXISTS "FK_contract_signers_contract_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."contract_signers"
      SET SCHEMA "products_schema"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_signers"
      ADD CONSTRAINT "FK_contract_signers_contract_id"
      FOREIGN KEY ("contract_id")
      REFERENCES "products_schema"."contracts"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."business_seniority"
      SET SCHEMA "suppliers_schema"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."guarantors"
      SET SCHEMA "suppliers_schema"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."shareholders"
      SET SCHEMA "suppliers_schema"
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."shareholders"
      RENAME COLUMN "company_id" TO "business_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."shareholders"
      ADD CONSTRAINT "FK_shareholders_business_id"
      FOREIGN KEY ("business_id")
      REFERENCES "suppliers_schema"."businesses"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_shareholders_business_id"
      ON "suppliers_schema"."shareholders" ("business_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."shareholders"
      ADD CONSTRAINT "FK_shareholders_person_id"
      FOREIGN KEY ("person_id")
      REFERENCES "transversal_schema"."persons"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      DELETE FROM "suppliers_schema"."guarantors" g
      USING "suppliers_schema"."credit_applications_bnpl" b
      WHERE g.credit_application_id = b.id
    `);

    await queryRunner.query(`
      DELETE FROM "suppliers_schema"."guarantors" g
      WHERE NOT EXISTS (
        SELECT 1 FROM "products_schema"."credit_applications" ca
        WHERE ca.id = g.credit_application_id
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."guarantors"
      ADD CONSTRAINT "FK_guarantors_credit_application_id"
      FOREIGN KEY ("credit_application_id")
      REFERENCES "products_schema"."credit_applications"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."guarantors"
      ADD CONSTRAINT "FK_guarantors_person_id"
      FOREIGN KEY ("person_id")
      REFERENCES "transversal_schema"."persons"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."suppliers"
      ADD CONSTRAINT "FK_suppliers_business_id"
      FOREIGN KEY ("business_id")
      REFERENCES "suppliers_schema"."businesses"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."purchase_orders"
      ADD CONSTRAINT "FK_purchase_orders_supplier_id"
      FOREIGN KEY ("supplier_id")
      REFERENCES "suppliers_schema"."suppliers"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      ADD CONSTRAINT "FK_sales_representatives_partner_id"
      FOREIGN KEY ("partner_id")
      REFERENCES "suppliers_schema"."partners"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "suppliers_schema"."credit_applications_bnpl"
    `);

    await queryRunner.query(`
      DELETE FROM "transversal_schema"."statuses"
      WHERE "entity_type" = 'credit_applications_bnpl'
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      DROP COLUMN "status_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ALTER COLUMN "state" SET DEFAULT 'active'::"transversal_schema"."user_state"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."users"
      ADD CONSTRAINT "FK_users_person_id"
      FOREIGN KEY ("person_id")
      REFERENCES "transversal_schema"."persons"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_users_person_id"
      ON "transversal_schema"."users" ("person_id")
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "transversal_schema"."states"
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_contract_signers_contract_id"
      ON "products_schema"."contract_signers" ("contract_id")
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'TransversalSuppliersProductsRealignment1860000000000: migración irreversible',
    );
  }
}
