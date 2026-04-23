import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Esquema dedicado a desembolsos (`disbursement_schema`), alineado con `DISBURSEMENT_SCHEMA` en `@app/disbursement-data`.
 */
export class CreateDisbursementSchema2040000000000 implements MigrationInterface {
  name = 'CreateDisbursementSchema2040000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "disbursement_schema"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "disbursement_schema" CASCADE`);
  }
}
