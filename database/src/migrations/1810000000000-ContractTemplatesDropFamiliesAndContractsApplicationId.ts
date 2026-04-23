import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * - Elimina contract_template_families; versionado por template_family_key en contract_templates.
 * - Quita contracts.application_id (enlace solo vía credit_applications.contract_id).
 * - Índice único parcial: una solicitud por contrato en contract_id no nulo.
 *
 * Requiere migraciones 179 y 180 aplicadas. down() no soportado.
 */
export class ContractTemplatesDropFamiliesAndContractsApplicationId1810000000000
  implements MigrationInterface
{
  name = 'ContractTemplatesDropFamiliesAndContractsApplicationId1810000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD COLUMN "template_family_key" character varying(120) NOT NULL DEFAULT 'legacy'
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."contract_templates"
      SET "template_family_key" = 'fam_' || "template_family_id"::text
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ALTER COLUMN "template_family_key" DROP DEFAULT
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_contract_templates_family_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP CONSTRAINT IF EXISTS "FK_contract_templates_template_family_id"
    `);

    // El nombre del UNIQUE (template_family_id + version) puede no ser el de TypeORM en BD creadas a mano o versiones antiguas.
    await queryRunner.query(`
      DO $migration$
      DECLARE
        r record;
      BEGIN
        FOR r IN
          SELECT c.conname AS name
          FROM pg_constraint c
          JOIN pg_class t ON c.conrelid = t.oid
          JOIN pg_namespace n ON t.relnamespace = n.oid
          WHERE n.nspname = 'products_schema'
            AND t.relname = 'contract_templates'
            AND c.contype = 'u'
            AND pg_get_constraintdef(c.oid) LIKE '%template_family_id%'
            AND pg_get_constraintdef(c.oid) LIKE '%version%'
        LOOP
          EXECUTE format(
            'ALTER TABLE products_schema.contract_templates DROP CONSTRAINT %I',
            r.name
          );
        END LOOP;
      END $migration$
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP COLUMN "template_family_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP CONSTRAINT IF EXISTS "UQ_contract_templates_family_key_version"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD CONSTRAINT "UQ_contract_templates_family_key_version"
      UNIQUE ("template_family_key", "version")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_contract_templates_template_family_key"
      ON "products_schema"."contract_templates" ("template_family_key")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP CONSTRAINT IF EXISTS "FK_contract_template_families_credit_facility_id"
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS "products_schema"."contract_template_families"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      DROP CONSTRAINT IF EXISTS "FK_contracts_application_id"
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_contracts_application_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      DROP COLUMN IF EXISTS "application_id"
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_credit_applications_contract_id"
      ON "products_schema"."credit_applications" ("contract_id")
      WHERE "contract_id" IS NOT NULL
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'ContractTemplatesDropFamiliesAndContractsApplicationId1810000000000 no es revertible automáticamente.',
    );
  }
}
