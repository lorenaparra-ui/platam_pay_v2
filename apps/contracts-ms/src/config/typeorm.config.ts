import './dotenv.config';
import { DataSourceOptions } from 'typeorm';
import { ContractEntity } from '@app/products-data';

const TypeormConfig = {
  type: 'postgres' as const,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  port: Number(process.env.TYPEORM_PORT ?? 5432),
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  entities: [ContractEntity],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'typeorm_migrations',
} satisfies DataSourceOptions;

export default TypeormConfig;
