-- Eliminar trade_name de partners (nombre comercial vive en businesses)

DROP INDEX IF EXISTS "idx_partners_trade_name";
ALTER TABLE "partners" DROP CONSTRAINT IF EXISTS "partners_trade_name_unique";
ALTER TABLE "partners" DROP COLUMN IF EXISTS "trade_name";
