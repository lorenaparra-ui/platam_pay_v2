"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCreditFacilities1773500004000 = void 0;
class CreateCreditFacilities1773500004000 {
    name = "CreateCreditFacilities1773500004000";
    async up(queryRunner) {
        await queryRunner.query(`
      INSERT INTO "statuses" ("entity_type", "code", "display_name", "is_active", "created_at", "updated_at")
      SELECT 'credit_facilities', 'active', 'Activo', true, now(), now()
      WHERE NOT EXISTS (
        SELECT 1 FROM "statuses"
        WHERE "entity_type" = 'credit_facilities' AND "code" = 'active'
      )
    `);
        await queryRunner.query(`
      INSERT INTO "statuses" ("entity_type", "code", "display_name", "is_active", "created_at", "updated_at")
      SELECT 'credit_facilities', 'inactive', 'Inactivo', true, now(), now()
      WHERE NOT EXISTS (
        SELECT 1 FROM "statuses"
        WHERE "entity_type" = 'credit_facilities' AND "code" = 'inactive'
      )
    `);
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "credit_facilities" (
        "id" BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        "external_id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "partner_id" BIGINT,
        "contract_id" varchar(255),
        "status_id" BIGINT NOT NULL,
        "total_limit" numeric(18, 4) NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now()),
        "updated_at" timestamptz NOT NULL DEFAULT (now())
      )
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_facilities"
      ADD CONSTRAINT "fk_credit_facilities_partner_id"
      FOREIGN KEY ("partner_id") REFERENCES "partners" ("id")
      ON DELETE SET NULL ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      ALTER TABLE "credit_facilities"
      ADD CONSTRAINT "fk_credit_facilities_status_id"
      FOREIGN KEY ("status_id") REFERENCES "statuses" ("id")
      ON DELETE RESTRICT ON UPDATE CASCADE
    `);
        await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "idx_credit_facilities_external_id"
      ON "credit_facilities" ("external_id")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_facilities_partner_id"
      ON "credit_facilities" ("partner_id")
    `);
        await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "idx_credit_facilities_status_id"
      ON "credit_facilities" ("status_id")
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE IF EXISTS "credit_facilities"
    `);
        await queryRunner.query(`
      DELETE FROM "statuses"
      WHERE "entity_type" = 'credit_facilities'
    `);
    }
}
exports.CreateCreditFacilities1773500004000 = CreateCreditFacilities1773500004000;
//# sourceMappingURL=1773500004000-create-credit-facilities.js.map