import 'reflect-metadata';
import './load-monorepo-env';

import { join } from 'path';
import { DataSource } from 'typeorm';
import { COLLECTIONS_DATA_ENTITIES } from '../../libs/collections-data/src/entities/collections-data.entities';
import { DISBURSEMENT_DATA_ENTITIES } from '../../libs/disbursement-data/src/entities/disbursement-data.entities';
import { PRODUCTS_DATA_ENTITIES } from '../../libs/products-data/src/products-data.entities';
import { SUPPLIERS_DATA_ENTITIES } from '../../libs/suppliers-data/src/suppliers-data.entities';
import { TRANSVERSAL_DATA_ENTITIES } from '../../libs/transversal-data/src/transversal-data.entities';

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
  ...DISBURSEMENT_DATA_ENTITIES,
  ...COLLECTIONS_DATA_ENTITIES,
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
