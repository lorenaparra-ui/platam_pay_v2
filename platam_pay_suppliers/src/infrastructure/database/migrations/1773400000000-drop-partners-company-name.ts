import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Elimina la columna company_name de la tabla partners.
 * - Los datos ya fueron migrados a trade_name y alias en migraciones anteriores
 *   (1762246800000-add-partners-alias, 1762255000000-enforce-partners-trade-name).
 * - up: preserva datos en trade_name si faltaran, luego elimina la columna.
 * - down: restaura la columna y rellena desde trade_name.
 */
export class DropPartnersCompanyName1773400000000 implements MigrationInterface {
  name = "DropPartnersCompanyName1773400000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Preservar datos: copiar company_name a trade_name donde trade_name sea nulo o vacío (solo si la columna existe)
    await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'partners' AND column_name = 'company_name'
        ) THEN
          UPDATE "partners" p
          SET "trade_name" = COALESCE(
            NULLIF(btrim(p."trade_name"), ''),
            btrim(p."company_name"),
            'partner_' || p."id"::text
          )
          WHERE (p."trade_name" IS NULL OR btrim(p."trade_name") = '')
            AND p."company_name" IS NOT NULL;
        END IF;
      END $$;
    `);

    // 2. Eliminar columna (IF EXISTS para no fallar si ya fue eliminada)
    await queryRunner.query(`
      ALTER TABLE "partners"
      DROP COLUMN IF EXISTS "company_name"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Recrear la columna si no existe
    await queryRunner.query(`
      ALTER TABLE "partners"
      ADD COLUMN IF NOT EXISTS "company_name" varchar(255)
    `);

    // 2. Rellenar desde trade_name para reversibilidad
    await queryRunner.query(`
      UPDATE "partners" p
      SET "company_name" = COALESCE(p."trade_name", 'partner_' || p."id"::text)
      WHERE p."company_name" IS NULL
    `);
  }
}
