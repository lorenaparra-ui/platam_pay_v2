import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Mueve el vínculo categoría ↔ facilidad desde `categories.credit_facility_id` a
 * `products_schema.client_category_assignments`, tabla usada por TypeORM `@ManyToMany` +
 * `@JoinTable` en `CreditFacilityEntity.categories`.
 *
 * La tabla solo expone las columnas que TypeORM escribe en un join M:N: las dos FK y
 * PK compuesta (sin fila surrogate). `UNIQUE(category_id)` conserva la regla previa
 * (una categoría enlazada a una sola facilidad).
 */
export class ClientCategoryAssignmentsReplaceCategoryFacilityFk2140000000000
  implements MigrationInterface
{
  name = 'ClientCategoryAssignmentsReplaceCategoryFacilityFk2140000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "products_schema"."client_category_assignments" (
        "credit_facility_id" bigint NOT NULL,
        "category_id" bigint NOT NULL,
        CONSTRAINT "PK_client_category_assignments"
          PRIMARY KEY ("credit_facility_id", "category_id"),
        CONSTRAINT "UQ_client_category_assignments_category_id" UNIQUE ("category_id"),
        CONSTRAINT "FK_client_category_assignments_credit_facility_id"
          FOREIGN KEY ("credit_facility_id")
          REFERENCES "products_schema"."credit_facilities"("id")
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT "FK_client_category_assignments_category_id"
          FOREIGN KEY ("category_id")
          REFERENCES "products_schema"."categories"("id")
          ON DELETE CASCADE ON UPDATE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_client_category_assignments_credit_facility_id"
      ON "products_schema"."client_category_assignments" ("credit_facility_id")
    `);

    await queryRunner.query(`
      INSERT INTO "products_schema"."client_category_assignments" (
        "credit_facility_id",
        "category_id"
      )
      SELECT c."credit_facility_id", c."id"
      FROM "products_schema"."categories" c
      WHERE c."credit_facility_id" IS NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      DROP CONSTRAINT IF EXISTS "FK_cf7729ece42f4135b4dddeee8c6"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      DROP COLUMN "credit_facility_id"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      ADD COLUMN "credit_facility_id" bigint NULL
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."categories" c
      SET "credit_facility_id" = a."credit_facility_id"
      FROM "products_schema"."client_category_assignments" a
      WHERE a."category_id" = c."id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      ALTER COLUMN "credit_facility_id" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."categories"
      ADD CONSTRAINT "FK_cf7729ece42f4135b4dddeee8c6"
      FOREIGN KEY ("credit_facility_id")
      REFERENCES "products_schema"."credit_facilities"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_client_category_assignments_credit_facility_id"
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "products_schema"."client_category_assignments"
    `);
  }
}
