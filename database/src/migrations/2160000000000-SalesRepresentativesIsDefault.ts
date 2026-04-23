import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Añade bandera de representante predeterminado por partner.
 * Valor inicial false para filas existentes; inserts sin columna usan DEFAULT false.
 */
export class SalesRepresentativesIsDefault2160000000000 implements MigrationInterface {
  name = 'SalesRepresentativesIsDefault2160000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      ADD COLUMN "is_default" boolean NOT NULL DEFAULT false
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      DROP COLUMN "is_default"
    `);
  }
}
