import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Contacto en persona (PII). Nullable para filas existentes y flujos sin correo en persons.
 */
export class PersonsAddEmail1940000000000 implements MigrationInterface {
  name = 'PersonsAddEmail1940000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ADD COLUMN IF NOT EXISTS "email" character varying(320)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      DROP COLUMN IF EXISTS "email"
    `);
  }
}
