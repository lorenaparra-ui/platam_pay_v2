import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alinea `transversal_schema.roles.name` con el enum `Roles` (`@platam/shared`):
 * tipo PostgreSQL `transversal_schema.roles_name` en lugar de VARCHAR.
 */
export class RolesNamePostgreSqlEnum2150000000000 implements MigrationInterface {
  name = 'RolesNamePostgreSqlEnum2150000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "transversal_schema"."roles_name" AS ENUM (
        'PARTNER_ADMIN',
        'PARTNER_OPERATIONS',
        'CUSTOMER',
        'SALES_MANAGER',
        'SALES_REPRESENTATIVE',
        'BACK_OFFICE_ADMIN',
        'BACK_OFFICE_ANALYST'
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."roles"
      ALTER COLUMN "name" TYPE "transversal_schema"."roles_name"
      USING "name"::text::"transversal_schema"."roles_name"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."roles"
      ALTER COLUMN "name" TYPE character varying(80)
      USING "name"::text
    `);

    await queryRunner.query(`
      DROP TYPE "transversal_schema"."roles_name"
    `);
  }
}
