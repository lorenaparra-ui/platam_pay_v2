import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "./dotenv.config";

const typeormConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  port: Number(process.env.TYPEORM_PORT ?? 5432),
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  migrations: [
    path.join(__dirname, "../infrastructure/database/migrations/*.{js,ts}"),
  ],
  entities: [path.join(__dirname, "../../**/*.entity.js")],
  logging: true,
  synchronize: process.env.TYPEORM_SYNC === "true",
  migrationsTableName: "typeorm_migrations",
};

export default typeormConfig;
export const dataSource = new DataSource(typeormConfig);
