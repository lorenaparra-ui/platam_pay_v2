import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Representante legal ligado a negocio (suppliers) y persona (transversal).
 * Reemplaza transversal_schema.legal_representatives (company_id) por suppliers_schema (business_id).
 */
export class LegalRepresentativesSuppliersSchema1840000000000
  implements MigrationInterface
{
  name = 'LegalRepresentativesSuppliersSchema1840000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "suppliers_schema"."legal_representatives" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "business_id" bigint NOT NULL,
        "person_id" bigint NOT NULL,
        "is_primary" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_legal_representatives_external_id" UNIQUE ("external_id"),
        CONSTRAINT "PK_legal_representatives" PRIMARY KEY ("id"),
        CONSTRAINT "FK_legal_representatives_business" FOREIGN KEY ("business_id")
          REFERENCES "suppliers_schema"."businesses"("id")
          ON DELETE RESTRICT ON UPDATE NO ACTION,
        CONSTRAINT "FK_legal_representatives_person" FOREIGN KEY ("person_id")
          REFERENCES "transversal_schema"."persons"("id")
          ON DELETE RESTRICT ON UPDATE NO ACTION
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_legal_representatives_business_id" ON "suppliers_schema"."legal_representatives" ("business_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_legal_representatives_person_id" ON "suppliers_schema"."legal_representatives" ("person_id")`,
    );

    await queryRunner.query(`DROP TABLE IF EXISTS "transversal_schema"."legal_representatives"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "suppliers_schema"."legal_representatives"`);

    await queryRunner.query(`
      CREATE TABLE "transversal_schema"."legal_representatives" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "company_id" bigint NOT NULL,
        "person_id" bigint NOT NULL,
        "is_primary" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_635be261d470a3f79379bba55e8" UNIQUE ("external_id"),
        CONSTRAINT "PK_f33adfbb24667139dec2f9ca5e6" PRIMARY KEY ("id")
      )
    `);
  }
}
