import "reflect-metadata";
import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "./dotenv.config";
import { DATABASE_ENTITIES } from "../../../libs/database/index";

const migrationsGlob = path.join(
  __dirname,
  "..",
  "infrastructure",
  "database",
  "migrations",
  "*.{ts,js}"
);

const options: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST ?? "localhost",
  username: process.env.POSTGRES_USERNAME,
  port: Number(process.env.TYPEORM_PORT ?? process.env.POSTGRES_PORT ?? 5432),
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: DATABASE_ENTITIES as DataSourceOptions["entities"],
  migrations: [migrationsGlob],
  synchronize: false,
  migrationsTableName: "typeorm_migrations",
  logging: process.env.TYPEORM_LOGGING === "true",
};

/** Requerido por `typeorm -d ./src/config/typeorm.config.ts` */
const AppDataSource = new DataSource(options);

export default AppDataSource;
