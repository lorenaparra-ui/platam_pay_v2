-- Refactor: partner a nivel categoría; credit_facilities sin partner_id
-- Ejecutar en el orden indicado (equivalente a migración TypeORM 1773600000000).

ALTER TABLE "categories"
  ADD COLUMN IF NOT EXISTS "partner_id" BIGINT NULL;

UPDATE "categories" c
SET "partner_id" = cf."partner_id"
FROM "credit_facilities" cf
WHERE c."credit_facility_id" = cf."id"
  AND cf."partner_id" IS NOT NULL
  AND c."partner_id" IS NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_categories_partner_id'
  ) THEN
    ALTER TABLE "categories"
    ADD CONSTRAINT "fk_categories_partner_id"
    FOREIGN KEY ("partner_id") REFERENCES "partners" ("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "idx_categories_partner_id"
  ON "categories" ("partner_id");

ALTER TABLE "credit_facilities"
  DROP CONSTRAINT IF EXISTS "fk_credit_facilities_partner_id";
DROP INDEX IF EXISTS "idx_credit_facilities_partner_id";
ALTER TABLE "credit_facilities"
  DROP COLUMN IF EXISTS "partner_id";
