import { MigrationInterface, QueryRunner } from "typeorm";

export class RollbackPartnersAlias1762252200000 implements MigrationInterface {
  name = "RollbackPartnersAlias1762252200000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP CONSTRAINT IF EXISTS chk_partners_alias_format
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_partners_alias
    `);

    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP COLUMN IF EXISTS "alias"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    void queryRunner;
    await Promise.resolve();
  }
}
