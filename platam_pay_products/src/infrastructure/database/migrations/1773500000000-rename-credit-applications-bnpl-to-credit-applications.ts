import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Renombra la tabla credit_applications_bnpl → credit_applications.
 * Sin pérdida de datos; índices y FKs asociados a la tabla se mantienen
 * (en PostgreSQL el rename solo afecta el nombre de la tabla).
 */
export class RenameCreditApplicationsBnplToCreditApplications1773500000000
  implements MigrationInterface
{
  name = "RenameCreditApplicationsBnplToCreditApplications1773500000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE IF EXISTS "credit_applications_bnpl"
      RENAME TO "credit_applications"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE IF EXISTS "credit_applications"
      RENAME TO "credit_applications_bnpl"
    `);
  }
}
