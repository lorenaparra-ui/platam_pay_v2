/**
 * Runner sin HTTP: advisory lock → migraciones → exit.
 */
import "reflect-metadata";
import AppDataSource from "./config/typeorm.config";

const ADVISORY_LOCK_KEY = "7482918374658123";

async function run(): Promise<void> {
  await AppDataSource.initialize();
  const qr = AppDataSource.createQueryRunner();
  await qr.connect();
  try {
    const rows = await qr.query(
      `SELECT pg_try_advisory_lock($1::bigint) AS acquired`,
      [ADVISORY_LOCK_KEY]
    );
    if (rows[0]?.acquired !== true) {
      // eslint-disable-next-line no-console -- runner CLI
      console.error(
        "[migrations-runner] pg_try_advisory_lock no adquirido; otra instancia en curso."
      );
      process.exit(1);
      return;
    }
    try {
      const done = await AppDataSource.runMigrations({ transaction: "all" });
      // eslint-disable-next-line no-console -- runner CLI
      console.log(
        "[migrations-runner] OK:",
        done.map((m) => m.name).join(", ") || "(sin pendientes)"
      );
    } finally {
      await qr.query(`SELECT pg_advisory_unlock($1::bigint)`, [
        ADVISORY_LOCK_KEY,
      ]);
    }
  } finally {
    await qr.release();
    await AppDataSource.destroy();
  }
  process.exit(0);
}

run().catch((e: unknown) => {
  // eslint-disable-next-line no-console -- runner CLI
  console.error("[migrations-runner]", e);
  process.exit(1);
});
