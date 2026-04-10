import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Índices para listar solicitudes por partner o por persona con orden típico por fecha.
 * El prefijo (partner_id / person_id) cubre filtros por FK; created_at DESC alinea con ORDER BY reciente.
 */
export class CreditApplicationsPartnerPersonListIndexes2010000000000
  implements MigrationInterface
{
  name = 'CreditApplicationsPartnerPersonListIndexes2010000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_credit_applications_partner_created_at"
      ON "products_schema"."credit_applications" ("partner_id", "created_at" DESC)
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_credit_applications_person_created_at"
      ON "products_schema"."credit_applications" ("person_id", "created_at" DESC)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_credit_applications_person_created_at"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_credit_applications_partner_created_at"
    `);
  }
}
