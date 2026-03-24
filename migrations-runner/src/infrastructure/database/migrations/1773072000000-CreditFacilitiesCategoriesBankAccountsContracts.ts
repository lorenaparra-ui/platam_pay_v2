import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Orden UP (dependencias):
 * 1) Catálogo statuses para nuevas entidades
 * 2) Elimina companies (CASCADE limpia FKs entrantes)
 * 3) bank_accounts → alter suppliers
 * 4) contracts → contract_signers → credit_facilities (FK contract_id) → categories
 *
 * Supuesto: la base ya tiene tablas users, statuses, suppliers, credit_applications, persons
 * y la función get_status_id. Si contracts/contract_signers ya existen, fallará el CREATE:
 * en ese caso omitir bloques 4–5 o adaptar a IF NOT EXISTS según el entorno.
 */
export class CreditFacilitiesCategoriesBankAccountsContracts1773072000000
  implements MigrationInterface
{
  name = "CreditFacilitiesCategoriesBankAccountsContracts1773072000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "statuses" ("entity_type", "code", "display_name")
      SELECT v.entity_type, v.code, v.display_name
      FROM (VALUES
        ('credit_facilities'::varchar(100), 'active'::varchar(50), 'Activo'::varchar(100)),
        ('credit_facilities', 'suspended', 'Suspendido'),
        ('credit_facilities', 'closed', 'Cerrado'),
        ('categories', 'active', 'Activo'),
        ('categories', 'inactive', 'Inactivo'),
        ('categories', 'archived', 'Archivado')
      ) AS v(entity_type, code, display_name)
      WHERE NOT EXISTS (
        SELECT 1 FROM "statuses" s
        WHERE s.entity_type = v.entity_type AND s.code = v.code
      );
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "companies" CASCADE;`);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "bank_accounts" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "bank_name" varchar(200) NOT NULL,
        "account_number" varchar(64) NOT NULL,
        "user_id" BIGINT NOT NULL,
        "certificate_url" text,
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now()),
        CONSTRAINT "fk_bank_accounts_user_id"
          FOREIGN KEY ("user_id") REFERENCES "users" ("id")
          ON DELETE RESTRICT
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_bank_accounts_user_id"
        ON "bank_accounts" ("user_id");
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers"
        ADD COLUMN IF NOT EXISTS "bank_account_id" BIGINT NULL;
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conname = 'fk_suppliers_bank_account_id'
        ) THEN
          ALTER TABLE "suppliers"
            ADD CONSTRAINT "fk_suppliers_bank_account_id"
            FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts" ("id")
            ON DELETE SET NULL;
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_suppliers_bank_account_id"
        ON "suppliers" ("bank_account_id");
    `);

    await queryRunner.query(`
      ALTER TABLE "suppliers" DROP COLUMN IF EXISTS "bank_account";
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "contracts" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "user_id" BIGINT NOT NULL,
        "application_id" BIGINT NULL,
        "zapsign_token" varchar(255) NULL,
        "status_id" BIGINT NOT NULL DEFAULT get_status_id('contracts', 'pending'),
        "original_file_url" text NULL,
        "signed_file_url" text NULL,
        "form_answers_json" jsonb NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now()),
        CONSTRAINT "fk_contracts_user_id"
          FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT,
        CONSTRAINT "fk_contracts_application_id"
          FOREIGN KEY ("application_id") REFERENCES "credit_applications" ("id")
          ON DELETE SET NULL,
        CONSTRAINT "fk_contracts_status_id"
          FOREIGN KEY ("status_id") REFERENCES "statuses" ("id") ON DELETE RESTRICT,
        CONSTRAINT "uq_contracts_zapsign_token" UNIQUE ("zapsign_token")
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_contracts_external_id"
        ON "contracts" ("external_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_contracts_user_id" ON "contracts" ("user_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_contracts_application_id" ON "contracts" ("application_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_contracts_status_id" ON "contracts" ("status_id");
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'trg_contracts_validate_status'
        ) THEN
          CREATE TRIGGER trg_contracts_validate_status
          BEFORE INSERT OR UPDATE OF status_id ON "contracts"
          FOR EACH ROW
          EXECUTE FUNCTION validate_status_entity('contracts', 'status_id');
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "contract_signers" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "contract_id" BIGINT NOT NULL,
        "person_id" BIGINT NULL,
        "zapsign_signer_token" varchar(255) NULL,
        "status_id" BIGINT NOT NULL DEFAULT get_status_id('contract_signers', 'pending'),
        "sign_url" text NULL,
        "ip_address" varchar(45) NULL,
        "geo_latitude" varchar(20) NULL,
        "geo_longitude" varchar(20) NULL,
        "signed_at" timestamptz NULL,
        "document_photo_url" text NULL,
        "document_verse_photo_url" text NULL,
        "selfie_photo_url" text NULL,
        "signature_image_url" text NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now()),
        CONSTRAINT "fk_contract_signers_contract_id"
          FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id") ON DELETE CASCADE,
        CONSTRAINT "fk_contract_signers_person_id"
          FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE SET NULL,
        CONSTRAINT "fk_contract_signers_status_id"
          FOREIGN KEY ("status_id") REFERENCES "statuses" ("id") ON DELETE RESTRICT
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_contract_signers_external_id"
        ON "contract_signers" ("external_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_contract_signers_contract_id"
        ON "contract_signers" ("contract_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_contract_signers_person_id"
        ON "contract_signers" ("person_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_contract_signers_status_id"
        ON "contract_signers" ("status_id");
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'trg_contract_signers_validate_status'
        ) THEN
          CREATE TRIGGER trg_contract_signers_validate_status
          BEFORE INSERT OR UPDATE OF status_id ON "contract_signers"
          FOR EACH ROW
          EXECUTE FUNCTION validate_status_entity('contract_signers', 'status_id');
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "credit_facilities" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "contract_id" BIGINT NULL,
        "status_id" BIGINT NOT NULL DEFAULT get_status_id('credit_facilities', 'active'),
        "total_limit" numeric(18, 2) NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now()),
        CONSTRAINT "fk_credit_facilities_contract_id"
          FOREIGN KEY ("contract_id") REFERENCES "contracts" ("id") ON DELETE SET NULL,
        CONSTRAINT "fk_credit_facilities_status_id"
          FOREIGN KEY ("status_id") REFERENCES "statuses" ("id") ON DELETE RESTRICT
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_credit_facilities_external_id"
        ON "credit_facilities" ("external_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_facilities_contract_id"
        ON "credit_facilities" ("contract_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_facilities_status_id"
        ON "credit_facilities" ("status_id");
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'trg_credit_facilities_validate_status'
        ) THEN
          CREATE TRIGGER trg_credit_facilities_validate_status
          BEFORE INSERT OR UPDATE OF status_id ON "credit_facilities"
          FOR EACH ROW
          EXECUTE FUNCTION validate_status_entity('credit_facilities', 'status_id');
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "credit_facility_id" BIGINT NOT NULL,
        "partner_id" BIGINT NULL,
        "name" varchar(200) NOT NULL,
        "discount_percentage" decimal(7, 4) NOT NULL,
        "interest_rate" decimal(7, 4) NOT NULL,
        "term_days" int NOT NULL CHECK ("term_days" > 0),
        "status_id" BIGINT NOT NULL DEFAULT get_status_id('categories', 'active'),
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now()),
        CONSTRAINT "fk_categories_credit_facility_id"
          FOREIGN KEY ("credit_facility_id") REFERENCES "credit_facilities" ("id")
          ON DELETE CASCADE,
        CONSTRAINT "fk_categories_partner_id"
          FOREIGN KEY ("partner_id") REFERENCES "suppliers" ("id")
          ON DELETE SET NULL,
        CONSTRAINT "fk_categories_status_id"
          FOREIGN KEY ("status_id") REFERENCES "statuses" ("id") ON DELETE RESTRICT
      );
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_categories_external_id"
        ON "categories" ("external_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_categories_credit_facility_id"
        ON "categories" ("credit_facility_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_categories_partner_id"
        ON "categories" ("partner_id");
    `);
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_categories_status_id"
        ON "categories" ("status_id");
    `);

    await queryRunner.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_trigger WHERE tgname = 'trg_categories_validate_status'
        ) THEN
          CREATE TRIGGER trg_categories_validate_status
          BEFORE INSERT OR UPDATE OF status_id ON "categories"
          FOR EACH ROW
          EXECUTE FUNCTION validate_status_entity('categories', 'status_id');
        END IF;
      END $$;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_categories_validate_status ON "categories";
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "categories" CASCADE;`);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_credit_facilities_validate_status ON "credit_facilities";
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "credit_facilities" CASCADE;`);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_contract_signers_validate_status ON "contract_signers";
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "contract_signers" CASCADE;`);

    await queryRunner.query(`
      DROP TRIGGER IF EXISTS trg_contracts_validate_status ON "contracts";
    `);
    await queryRunner.query(`DROP TABLE IF EXISTS "contracts" CASCADE;`);

    await queryRunner.query(`
      ALTER TABLE "suppliers" DROP CONSTRAINT IF EXISTS "fk_suppliers_bank_account_id";
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "idx_suppliers_bank_account_id";
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers" DROP COLUMN IF EXISTS "bank_account_id";
    `);
    await queryRunner.query(`
      ALTER TABLE "suppliers"
        ADD COLUMN IF NOT EXISTS "bank_account" varchar(500) NULL;
    `);

    await queryRunner.query(`DROP TABLE IF EXISTS "bank_accounts" CASCADE;`);

    await queryRunner.query(`
      DELETE FROM "statuses"
      WHERE "entity_type" IN ('credit_facilities', 'categories')
        AND "code" IN (
          'active', 'suspended', 'closed',
          'inactive', 'archived'
        );
    `);

    /**
     * companies: no se recrea en down (DDL legado no versionado en repo).
     * Restaurar desde backup si aplica.
     */
  }
}
