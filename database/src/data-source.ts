import 'reflect-metadata';
import './load-monorepo-env';

import { join } from 'path';
import { DataSource } from 'typeorm';
import { TRANSVERSAL_DATA_ENTITIES } from '@libs/transversal-data';
import { PRODUCTS_DATA_ENTITIES } from '@libs/products-data';
import { SUPPLIERS_DATA_ENTITIES } from '@libs/suppliers-data';

/**
 * Orquestación DDL para la CLI de TypeORM (no duplicar listas: cada lib exporta su arreglo).
 *
 * Generar migración (desde la raíz; el nombre va después de `--`; salida en alias `@migrations`):
 *   npm run migration:generate -w @platam/database -- src/migrations/1730000000000-Descripcion
 *   (o `cd database` y `npm run migration:generate -- src/migrations/...`)
 */
export const ALL_DATA_ENTITIES = [
  ...TRANSVERSAL_DATA_ENTITIES,
  ...PRODUCTS_DATA_ENTITIES,
  ...SUPPLIERS_DATA_ENTITIES,
];

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.TYPEORM_PORT ?? 5432),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [...ALL_DATA_ENTITIES],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  migrationsTableName: 'typeorm_migrations',
});

export default AppDataSource;
