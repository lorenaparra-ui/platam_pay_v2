import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * El vínculo categoría ↔ facilidad correcto es M:N vía `client_category_assignments`
 * (`@ManyToMany` + `@JoinTable` en `CreditFacilityEntity`, migración 214).
 * Una tabla `credit_facility_categories` solo aparecería por un mapeo erróneo; se elimina si existe.
 *
 * Columnas de `credit_facilities` (contract_id, state, total_limit, business_id) ya están
 * cubiertas por migraciones 183, 185 y 211.
 */
export class CreditFacilitiesDropSpuriousJoinTable2130000000000
  implements MigrationInterface
{
  name = 'CreditFacilitiesDropSpuriousJoinTable2130000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TABLE IF EXISTS "products_schema"."credit_facility_categories"`,
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // No se recrea `credit_facility_categories`; el vínculo válido es `client_category_assignments`.
  }
}
