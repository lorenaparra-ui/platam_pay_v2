import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alinea `sales_representatives.user_id` con `SalesRepresentativeEntity` ↔ `UserEntity`:
 * columna NOT NULL, FK a `transversal_schema.users` e índice para joins.
 *
 * El esquema inicial (170) creó `user_id` nullable sin FK; 186 solo añadió FK de `partner_id`.
 */
export class SalesRepresentativesUserIdFkToUsers2190000000000
  implements MigrationInterface
{
  name = 'SalesRepresentativesUserIdFkToUsers2190000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const nullRows = await queryRunner.query(`
      SELECT COUNT(*)::int AS c
      FROM "suppliers_schema"."sales_representatives"
      WHERE "user_id" IS NULL
    `);
    const nullCount = (nullRows[0] as { c: number }).c;
    if (nullCount > 0) {
      throw new Error(
        `Migración 2190000000000: ${nullCount} fila(s) en sales_representatives con user_id NULL. ` +
          'Asigne user_id válidos y reintente.',
      );
    }

    const orphanRows = await queryRunner.query(`
      SELECT COUNT(*)::int AS c
      FROM "suppliers_schema"."sales_representatives" sr
      WHERE NOT EXISTS (
        SELECT 1 FROM "transversal_schema"."users" u WHERE u.id = sr.user_id
      )
    `);
    const orphanCount = (orphanRows[0] as { c: number }).c;
    if (orphanCount > 0) {
      throw new Error(
        `Migración 2190000000000: ${orphanCount} fila(s) con user_id inexistente en transversal_schema.users. ` +
          'Corrija referencias y reintente.',
      );
    }

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      ALTER COLUMN "user_id" SET NOT NULL
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_sales_representatives_user_id"
      ON "suppliers_schema"."sales_representatives" ("user_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      ADD CONSTRAINT "FK_sales_representatives_user_id"
      FOREIGN KEY ("user_id")
      REFERENCES "transversal_schema"."users"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      DROP CONSTRAINT IF EXISTS "FK_sales_representatives_user_id"
    `);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "suppliers_schema"."IDX_sales_representatives_user_id"`,
    );
    await queryRunner.query(`
      ALTER TABLE "suppliers_schema"."sales_representatives"
      ALTER COLUMN "user_id" DROP NOT NULL
    `);
  }
}
