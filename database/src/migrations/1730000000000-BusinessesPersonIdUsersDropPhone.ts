import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * - businesses.user_id → businesses.person_id (FK transversal_schema.persons).
 * - users.phone eliminado (teléfono vive en persons.phone).
 */
export class BusinessesPersonIdUsersDropPhone1730000000000
  implements MigrationInterface
{
  name = 'BusinessesPersonIdUsersDropPhone1730000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" ADD "person_id" bigint`,
    );

    await queryRunner.query(`
      UPDATE "suppliers_schema"."businesses" b
      SET "person_id" = (
        SELECT p.id
        FROM "transversal_schema"."persons" p
        WHERE p.user_id = b.user_id
        ORDER BY p.id ASC
        LIMIT 1
      )
    `);

    const orphans = await queryRunner.query(`
      SELECT COUNT(*)::int AS c
      FROM "suppliers_schema"."businesses"
      WHERE "person_id" IS NULL
    `);
    const count = (orphans[0] as { c: number }).c;
    if (count > 0) {
      throw new Error(
        `businesses sin person_id resoluble (${count} filas); revisar persons.user_id`,
      );
    }

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" ALTER COLUMN "person_id" SET NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" ADD CONSTRAINT "FK_businesses_person_id" FOREIGN KEY ("person_id") REFERENCES "transversal_schema"."persons"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_businesses_person_id" ON "suppliers_schema"."businesses" ("person_id")`,
    );

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" DROP COLUMN "user_id"`,
    );

    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."users" DROP CONSTRAINT IF EXISTS "UQ_a000cca60bcf04454e727699490"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."users" DROP COLUMN "phone"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."users" ADD "phone" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "transversal_schema"."users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")`,
    );

    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" ADD "user_id" bigint`,
    );
    await queryRunner.query(`
      UPDATE "suppliers_schema"."businesses" b
      SET "user_id" = (
        SELECT p.user_id FROM "transversal_schema"."persons" p WHERE p.id = b.person_id LIMIT 1
      )
    `);
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" ALTER COLUMN "user_id" SET NOT NULL`,
    );

    await queryRunner.query(
      `DROP INDEX "suppliers_schema"."IDX_businesses_person_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" DROP CONSTRAINT "FK_businesses_person_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "suppliers_schema"."businesses" DROP COLUMN "person_id"`,
    );
  }
}
