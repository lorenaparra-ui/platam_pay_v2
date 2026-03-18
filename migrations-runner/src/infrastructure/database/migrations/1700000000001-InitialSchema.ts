import { MigrationInterface, QueryRunner } from "typeorm";

/** Ancla inicial; DDL histórico en migraciones posteriores con timestamp mayor. */
export class InitialSchema1700000000001 implements MigrationInterface {
  name = "InitialSchema1700000000001";

  public async up(_queryRunner: QueryRunner): Promise<void> {}

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
