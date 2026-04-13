import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersDataModule } from '../../suppliers-data/src/suppliers-data.module';
import { SUPPLIERS_DATA_ENTITIES } from '../../suppliers-data/src/suppliers-data.entities';
import { TRANSVERSAL_DATA_ENTITIES } from '../../transversal-data/src/transversal-data.entities';
import { ProductsDataService } from './products-data.service';
import { PRODUCTS_DATA_ENTITIES } from './products-data.entities';

export { PRODUCTS_DATA_ENTITIES } from './products-data.entities';

/**
 * Entidades para `TypeOrmModule.forRoot` en products-ms.
 * Incluye el catálogo transversal completo: `PersonEntity` → `CityEntity`, `BusinessEntity` → `CityEntity`,
 * `UserEntity` → `RoleEntity`/`PersonEntity`, etc. Registrar solo `PersonEntity` deja metadata huérfana.
 */
export const PRODUCTS_MS_TYPEORM_ENTITIES = [
  ...TRANSVERSAL_DATA_ENTITIES,
  ...SUPPLIERS_DATA_ENTITIES,
  ...PRODUCTS_DATA_ENTITIES,
] as const;

@Module({
  imports: [SuppliersDataModule, TypeOrmModule.forFeature([...PRODUCTS_DATA_ENTITIES])],
  providers: [ProductsDataService],
  exports: [SuppliersDataModule, TypeOrmModule, ProductsDataService],
})
export class ProductsDataModule {}
