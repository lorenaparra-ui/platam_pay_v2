import "./dotenv.config";
import { DataSourceOptions } from "typeorm";
import { CategoryEntity } from "../../../../libs/products-data/src/entities/category.entity";
import { ContractEntity } from "../../../../libs/products-data/src/entities/contract.entity";
import { ContractTemplateEntity } from "../../../../libs/products-data/src/entities/contract-template.entity";
import { CreditFacilityEntity } from "../../../../libs/products-data/src/entities/credit-facility.entity";
import { SUPPLIERS_DATA_ENTITIES } from "@app/suppliers-data";
import {
  CityEntity,
  PartnerCreateUserSqsIdempotencyEntity,
  PersonEntity,
  RoleEntity,
  UserEntity,
} from "@app/transversal-data";

/** Entidades products_schema requeridas por `PartnerEntity#categories` y su grafo TypeORM. */
const PARTNER_CATEGORIES_RELATED_ENTITIES = [
  CategoryEntity,
  CreditFacilityEntity,
  ContractEntity,
  ContractTemplateEntity,
] as const;

const TypeormConfig = {
  type: "postgres" as const,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  port: Number(process.env.TYPEORM_PORT ?? 5432),
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    ...SUPPLIERS_DATA_ENTITIES,
    ...PARTNER_CATEGORIES_RELATED_ENTITIES,
    PersonEntity,
    RoleEntity,
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