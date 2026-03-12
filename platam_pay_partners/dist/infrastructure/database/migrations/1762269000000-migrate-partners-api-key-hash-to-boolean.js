"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigratePartnersApiKeyHashToBoolean1762269000000 = void 0;
class MigratePartnersApiKeyHashToBoolean1762269000000 {
    name = "MigratePartnersApiKeyHashToBoolean1762269000000";
    async up(queryRunner) {
        await queryRunner.query(`
      DO $$
      DECLARE
        current_type text;
      BEGIN
        SELECT data_type
        INTO current_type
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'partners'
          AND column_name = 'api_key_hash';

        IF current_type IS NULL THEN
          ALTER TABLE "partners"
          ADD COLUMN "api_key_hash" boolean DEFAULT false;
        ELSIF current_type <> 'boolean' THEN
          ALTER TABLE "partners"
          ALTER COLUMN "api_key_hash" DROP DEFAULT;

          ALTER TABLE "partners"
          ALTER COLUMN "api_key_hash" TYPE boolean
          USING (
            CASE
              WHEN "api_key_hash" IS NULL THEN false
              WHEN btrim("api_key_hash"::text) = '' THEN false
              WHEN lower("api_key_hash"::text) IN ('false', 'f', '0', 'no', 'n') THEN false
              ELSE true
            END
          );
        END IF;

        ALTER TABLE "partners"
        ALTER COLUMN "api_key_hash" SET DEFAULT false;
      END $$;
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'partners'
            AND column_name = 'api_key_hash'
            AND data_type = 'boolean'
        ) THEN
          ALTER TABLE "partners"
          ALTER COLUMN "api_key_hash" DROP DEFAULT;

          ALTER TABLE "partners"
          ALTER COLUMN "api_key_hash" TYPE varchar
          USING (
            CASE
              WHEN "api_key_hash" IS NULL THEN NULL
              WHEN "api_key_hash" = true THEN 'true'
              ELSE 'false'
            END
          );
        END IF;
      END $$;
    `);
    }
}
exports.MigratePartnersApiKeyHashToBoolean1762269000000 = MigratePartnersApiKeyHashToBoolean1762269000000;
//# sourceMappingURL=1762269000000-migrate-partners-api-key-hash-to-boolean.js.map