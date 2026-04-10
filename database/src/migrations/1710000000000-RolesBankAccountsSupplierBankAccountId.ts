import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * - Tabla transversal_schema.roles (RBAC); `name` es VARCHAR hasta 2150000000000-RolesNamePostgreSqlEnum
 *   (tipo `transversal_schema.roles_name` ↔ enum `Roles` en `@platam/shared`).
 * - Tabla suppliers_schema.bank_accounts y suppliers.bank_account_id (1:1).
 * - Migra datos de suppliers.bank_account (varchar cifrado) a bank_accounts.account_number.
 * - FKs: role_permissions.role_id → roles, users.role_id → roles, suppliers.bank_account_id → bank_accounts.
 */
export class RolesBankAccountsSupplierBankAccountId1710000000000
  implements MigrationInterface
{
  name = 'RolesBankAccountsSupplierBankAccountId1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transversal_schema"."roles" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying(80) NOT NULL, "description" text, CONSTRAINT "UQ_roles_external_id" UNIQUE ("external_id"), CONSTRAINT "UQ_roles_name" UNIQUE ("name"), CONSTRAINT "PK_roles" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `CREATE TABLE "suppliers_schema"."bank_accounts" ("id" BIGSERIAL NOT NULL, "external_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "bank_entity" character varying(255) NOT NULL, "account_number" character varying(500) NOT NULL, "bank_certification" text, CONSTRAINT "UQ_bank_accounts_external_id" UNIQUE ("external_id"), CONSTRAINT "PK_bank_accounts" PRIMARY KEY ("id"))`,
    );

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."suppliers" ADD "bank_account_id" bigint`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_suppliers_bank_account_id" ON "suppliers_schema"."suppliers" ("bank_account_id") WHERE "bank_account_id" IS NOT NULL`,
    );

    await queryRunner.query(`
      DO $$
      DECLARE
        rec RECORD;
        new_ba_id bigint;
      BEGIN
        FOR rec IN
          SELECT id, bank_account, created_at, updated_at
          FROM suppliers_schema.suppliers
          WHERE bank_account IS NOT NULL AND btrim(bank_account::text) <> ''
        LOOP
          INSERT INTO suppliers_schema.bank_accounts (
            external_id, bank_entity, account_number, created_at, updated_at
          ) VALUES (
            gen_random_uuid(),
            'LEGACY',
            rec.bank_account,
            rec.created_at,
            rec.updated_at
          )
          RETURNING id INTO new_ba_id;

          UPDATE suppliers_schema.suppliers
          SET bank_account_id = new_ba_id
          WHERE id = rec.id;
        END LOOP;
      END $$;
    `);

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."suppliers" DROP COLUMN "bank_account"`,
    );

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."suppliers" ADD CONSTRAINT "FK_suppliers_bank_account_id" FOREIGN KEY ("bank_account_id") REFERENCES "suppliers_schema"."bank_accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."role_permissions" ADD CONSTRAINT "FK_role_permissions_role_id" FOREIGN KEY ("role_id") REFERENCES "transversal_schema"."roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."users" ADD CONSTRAINT "FK_users_role_id" FOREIGN KEY ("role_id") REFERENCES "transversal_schema"."roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."users" DROP CONSTRAINT "FK_users_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."role_permissions" DROP CONSTRAINT "FK_role_permissions_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."suppliers" DROP CONSTRAINT "FK_suppliers_bank_account_id"`,
    );

    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."UQ_suppliers_bank_account_id"`,
    );

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."suppliers" ADD "bank_account" character varying(500)`,
    );

    await queryRunner.query(`
      UPDATE "suppliers_schema"."suppliers" s
      SET "bank_account" = b."account_number"
      FROM "suppliers_schema"."bank_accounts" b
      WHERE s."bank_account_id" = b."id"
    `);

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."suppliers" DROP COLUMN "bank_account_id"`,
    );

    await queryRunner.query(`DROP TABLE "suppliers_schema"."bank_accounts"`);
    await queryRunner.query(`DROP TABLE "transversal_schema"."roles"`);
  }
}
