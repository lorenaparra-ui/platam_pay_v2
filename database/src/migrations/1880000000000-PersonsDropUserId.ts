import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Elimina persons.user_id.
 * La relación persona↔usuario se gestiona ahora a través de users.person_id (FK inversa),
 * introducida en la migración 1860000000000-TransversalSuppliersProductsRealignment.
 *
 * down(): no reversible automáticamente; el campo se ha vuelto prescindible en el nuevo modelo.
 */
export class PersonsDropUserId1880000000000 implements MigrationInterface {
  name = 'PersonsDropUserId1880000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      ALTER COLUMN "user_id" DROP NOT NULL
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "transversal_schema"."IDX_persons_user_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      DROP CONSTRAINT IF EXISTS "FK_persons_user_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "transversal_schema"."persons"
      DROP COLUMN "user_id"
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'PersonsDropUserId1880000000000: migración irreversible. Para revertir, restaurar backup previo.',
    );
  }
}
