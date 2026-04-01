import "./dotenv.config";
import { DataSourceOptions } from "typeorm";
import { SUPPLIERS_DATA_ENTITIES } from "@app/suppliers-data";
import {
  CityEntity,
  PartnerCreateUserSqsIdempotencyEntity,
  PersonEntity,
  UserEntity,
} from "@app/transversal-data";

const TypeormConfig = {
  type: "postgres" as const,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  port: Number(process.env.TYPEORM_PORT ?? 5432),
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    ...SUPPLIERS_DATA_ENTITIES,
    PersonEntity,
    UserEntity,
    CityEntity,
    PartnerCreateUserSqsIdempotencyEntity,
  ] as DataSourceOptions["entities"],
  // Sin schema global: cada @Entity define schema; migraciones viven en @platam/database.
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: "typeorm_migrations",
} satisfies DataSourceOptions;

export default TypeormConfig;