import { MigrationInterface, QueryRunner } from "typeorm";

export class DropTradeNameRegexCheck1762259000000 implements MigrationInterface {
  name = "DropTradeNameRegexCheck1762259000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP CONSTRAINT IF EXISTS chk_partners_trade_name_format
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    void queryRunner;
    await Promise.resolve();
  }
}
