import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Expand (sin contract): plantillas versionadas, FK contracts.contract_template_id,
 * credit_applications.contract_id, backfill y plantilla semilla legacy_default.
 * No elimina contracts.application_id (Fase contract posterior).
 */
export class ContractTemplatesExpand1790000000000 implements MigrationInterface {
  name = 'ContractTemplatesExpand1790000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO transversal_schema.statuses ("external_id", "entity_type", "code", "display_name", "description", "is_active")
      SELECT gen_random_uuid(), 'contract_templates', v.code, v.display_name, NULL, true
      FROM (VALUES
        ('draft', 'Borrador'),
        ('active', 'Activo'),
        ('deprecated', 'Deprecado')
      ) AS v(code, display_name)
      WHERE NOT EXISTS (
        SELECT 1 FROM transversal_schema.statuses s
        WHERE s.entity_type = 'contract_templates' AND s.code = v.code
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "products_schema"."contract_template_families" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "code" character varying(120) NOT NULL,
        "name" character varying(255) NOT NULL,
        "category_id" bigint,
        CONSTRAINT "UQ_contract_template_families_external_id" UNIQUE ("external_id"),
        CONSTRAINT "UQ_contract_template_families_code" UNIQUE ("code"),
        CONSTRAINT "PK_contract_template_families" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "products_schema"."contract_templates" (
        "id" BIGSERIAL NOT NULL,
        "external_id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "template_family_id" bigint NOT NULL,
        "version" integer NOT NULL,
        "effective_from" TIMESTAMP WITH TIME ZONE,
        "effective_to" TIMESTAMP WITH TIME ZONE,
        "zapsign_template_ref" character varying(255),
        "status_id" bigint NOT NULL DEFAULT get_status_id('contract_templates', 'active'),
        CONSTRAINT "UQ_contract_templates_external_id" UNIQUE ("external_id"),
        CONSTRAINT "CHK_contract_templates_version_positive" CHECK ("version" > 0),
        CONSTRAINT "UQ_contract_templates_family_version" UNIQUE ("template_family_id", "version"),
        CONSTRAINT "PK_contract_templates" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_contract_templates_family_id"
      ON "products_schema"."contract_templates" ("template_family_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_contract_templates_status_id"
      ON "products_schema"."contract_templates" ("status_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      ADD CONSTRAINT "FK_contract_template_families_category_id"
      FOREIGN KEY ("category_id") REFERENCES "products_schema"."categories"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD CONSTRAINT "FK_contract_templates_template_family_id"
      FOREIGN KEY ("template_family_id") REFERENCES "products_schema"."contract_template_families"("id")
      ON DELETE RESTRICT ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      ADD CONSTRAINT "FK_contract_templates_status_id"
      FOREIGN KEY ("status_id") REFERENCES "transversal_schema"."statuses"("id")
      ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      INSERT INTO "products_schema"."contract_template_families" ("code", "name", "category_id")
      VALUES ('legacy_default', 'Familia semilla (contratos previos a plantillas)', NULL)
      ON CONFLICT ("code") DO NOTHING
    `);

    await queryRunner.query(`
      INSERT INTO "products_schema"."contract_templates" (
        "template_family_id", "version", "effective_from", "effective_to", "zapsign_template_ref", "status_id"
      )
      SELECT f."id", 1, NULL, NULL, NULL, get_status_id('contract_templates', 'active')
      FROM "products_schema"."contract_template_families" f
      WHERE f."code" = 'legacy_default'
      AND NOT EXISTS (
        SELECT 1 FROM "products_schema"."contract_templates" t
        WHERE t."template_family_id" = f."id" AND t."version" = 1
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      ADD COLUMN "contract_template_id" bigint
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_contracts_contract_template_id"
      ON "products_schema"."contracts" ("contract_template_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      ADD CONSTRAINT "FK_contracts_contract_template_id"
      FOREIGN KEY ("contract_template_id") REFERENCES "products_schema"."contract_templates"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."contracts" c
      SET "contract_template_id" = t."id"
      FROM "products_schema"."contract_templates" t
      INNER JOIN "products_schema"."contract_template_families" f ON f."id" = t."template_family_id"
      WHERE f."code" = 'legacy_default'
      AND t."version" = 1
      AND c."contract_template_id" IS NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      ADD COLUMN "contract_id" bigint
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_credit_applications_contract_id"
      ON "products_schema"."credit_applications" ("contract_id")
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      ADD CONSTRAINT "FK_credit_applications_contract_id"
      FOREIGN KEY ("contract_id") REFERENCES "products_schema"."contracts"("id")
      ON DELETE SET NULL ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      UPDATE "products_schema"."credit_applications" ca
      SET "contract_id" = s."contract_id"
      FROM (
        SELECT c."application_id" AS application_id, MIN(c."id") AS contract_id
        FROM "products_schema"."contracts" c
        WHERE c."application_id" IS NOT NULL
        GROUP BY c."application_id"
        HAVING COUNT(*) = 1
      ) s
      WHERE ca."id" = s."application_id"
      AND (ca."contract_id" IS NULL OR ca."contract_id" = s."contract_id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      DROP CONSTRAINT IF EXISTS "FK_credit_applications_contract_id"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_credit_applications_contract_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."credit_applications"
      DROP COLUMN IF EXISTS "contract_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      DROP CONSTRAINT IF EXISTS "FK_contracts_contract_template_id"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "products_schema"."IDX_contracts_contract_template_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contracts"
      DROP COLUMN IF EXISTS "contract_template_id"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP CONSTRAINT IF EXISTS "FK_contract_templates_status_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_templates"
      DROP CONSTRAINT IF EXISTS "FK_contract_templates_template_family_id"
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS "products_schema"."contract_templates"
    `);

    await queryRunner.query(`
      ALTER TABLE "products_schema"."contract_template_families"
      DROP CONSTRAINT IF EXISTS "FK_contract_template_families_category_id"
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS "products_schema"."contract_template_families"
    `);

    await queryRunner.query(`
      DELETE FROM transversal_schema.statuses WHERE entity_type = 'contract_templates'
    `);
  }
}
