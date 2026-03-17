-- Script SQL seguro para eliminar la columna company_name de partners.
-- Ejecutar solo si no usas migraciones TypeORM o necesitas reproducir el cambio a mano.
-- Reversible: ver sección ROLLBACK al final.

BEGIN;

-- 1. (Opcional) Preservar datos en trade_name donde falten
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

-- 2. Eliminar columna
ALTER TABLE "partners"
DROP COLUMN IF EXISTS "company_name";

COMMIT;

-- ---------------
-- ROLLBACK (ejecutar en otro bloque si necesitas revertir):
-- BEGIN;
-- ALTER TABLE "partners" ADD COLUMN IF NOT EXISTS "company_name" varchar(255);
-- UPDATE "partners" p SET "company_name" = COALESCE(p."trade_name", 'partner_' || p."id"::text) WHERE p."company_name" IS NULL;
-- COMMIT;
