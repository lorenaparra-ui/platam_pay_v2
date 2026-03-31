import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Quita category_id y credit_facility_id de contract_templates (anclaje solo por template_family_key + version).
 * Requiere migración 180 (o equivalente con esas columnas). down() no soportado.
 */
export class ContractTemplatesDropCategoryAndFacilityFks1820000000000
  implements MigrationInterface
{
  name = 'ContractTemplatesDropCategoryAndFacilityFks1820000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_contract_templates_category_id"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_contract_templates_credit_facility_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP CONSTRAINT IF EXISTS "FK_contract_templates_category_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP CONSTRAINT IF EXISTS "FK_contract_templates_credit_facility_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP COLUMN IF EXISTS "category_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP COLUMN IF EXISTS "credit_facility_id"
    `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    throw new Error(
      'ContractTemplatesDropCategoryAndFacilityFks1820000000000 no es revertible automáticamente.',
    );
  }
}
