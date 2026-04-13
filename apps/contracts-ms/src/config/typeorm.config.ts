import './dotenv.config';
import { DataSourceOptions } from 'typeorm';
import { ContractEntity, ContractTemplateEntity } from '@app/products-data';

/**
 * Plantilla antes que contrato: `ContractEntity#contractTemplate` → `ContractTemplateEntity`
 * debe existir en el mismo registro de entidades del DataSource.
 */
const TypeormConfig = {
  type: 'postgres' as const,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  port: Number(process.env.TYPEORM_PORT ?? 5432),
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [ContractTemplateEntity, ContractEntity],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'typeorm_migrations',
} satisfies DataSourceOptions;

export default TypeormConfig;
