import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Alinea plantillas al ER: familias con PK uuid (sin code/external_id bigint),
 * categoría y credit_facility en contract_templates, facility opcional en familia,
 * contracts.user_id nullable (firma antes de usuario).
 *
 * Requiere haber aplicado ContractTemplatesExpand1790000000000.
 * down(): no soportado; restaurar desde backup si se requiere volver atrás.
 */
export class ContractTemplatesErDiagramAlign1800000000000 implements MigrationInterface {
  name = 'ContractTemplatesErDiagramAlign1800000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD COLUMN "category_id" bigint,
      ADD COLUMN "credit_facility_id" bigint
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."contract_templates" t
      SET "category_id" = f."category_id"
      FROM "products_schema"."contract_template_families" f
      WHERE f."id" = t."template_family_id"
      AND f."category_id" IS NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      ADD COLUMN "credit_facility_id" bigint
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      ADD CONSTRAINT "FK_contract_template_families_credit_facility_id"
      FOREIGN KEY ("credit_facility_id") REFERENCES "products_schema"."credit_facilities"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP CONSTRAINT IF EXISTS "FK_contract_template_families_category_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP COLUMN IF EXISTS "category_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      ADD COLUMN "id_uuid" uuid
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."contract_template_families"
      SET "id_uuid" = "external_id"
      WHERE "id_uuid" IS NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      ALTER COLUMN "id_uuid" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      ADD CONSTRAINT "UQ_contract_template_families_id_uuid" UNIQUE ("id_uuid")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD COLUMN "template_family_uuid" uuid
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."contract_templates" t
      SET "template_family_uuid" = f."id_uuid"
      FROM "products_schema"."contract_template_families" f
      WHERE f."id" = t."template_family_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ALTER COLUMN "template_family_uuid" SET NOT NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP CONSTRAINT "FK_contract_templates_template_family_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP COLUMN "template_family_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      RENAME COLUMN "template_family_uuid" TO "template_family_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP CONSTRAINT "PK_contract_template_families"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP COLUMN "id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      RENAME COLUMN "id_uuid" TO "id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP CONSTRAINT IF EXISTS "UQ_contract_template_families_id_uuid"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      ADD CONSTRAINT "PK_contract_template_families" PRIMARY KEY ("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP CONSTRAINT IF EXISTS "UQ_contract_template_families_external_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP CONSTRAINT IF EXISTS "UQ_contract_template_families_code"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP COLUMN IF EXISTS "external_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP COLUMN IF EXISTS "code"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD CONSTRAINT "FK_contract_templates_template_family_id"
      FOREIGN KEY ("template_family_id") REFERENCES "products_schema"."contract_template_families"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD CONSTRAINT "FK_contract_templates_category_id"
      FOREIGN KEY ("category_id") REFERENCES "products_schema"."categories"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD CONSTRAINT "FK_contract_templates_credit_facility_id"
      FOREIGN KEY ("credit_facility_id") REFERENCES "products_schema"."credit_facilities"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_contract_templates_category_id"
      ON "products_schema"."contract_templates" ("category_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_contract_templates_credit_facility_id"
      ON "products_schema"."contract_templates" ("credit_facility_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      ALTER COLUMN "user_id" DROP NOT NULL
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'ContractTemplatesErDiagramAlign1800000000000 no es revertible automáticamente; use un backup anterior.',
    );
  }
}
