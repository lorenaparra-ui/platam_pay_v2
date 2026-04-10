import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersDataModule } from '../../suppliers-data/src/suppliers-data.module';
import { SUPPLIERS_DATA_ENTITIES } from '../../suppliers-data/src/suppliers-data.entities';
import { PersonEntity } from '../../transversal-data/src/entities/person.entity';
import { ProductsDataService } from './products-data.service';
import { PRODUCTS_DATA_ENTITIES } from './products-data.entities';

export { PRODUCTS_DATA_ENTITIES } from './products-data.entities';

/** Entidades para `TypeOrmModule.forRoot` en microservicios products-ms (incl. relación Business→Person). */
export const PRODUCTS_MS_TYPEORM_ENTITIES = [
  PersonEntity,
  ...SUPPLIERS_DATA_ENTITIES,
  ...PRODUCTS_DATA_ENTITIES,
] as const;

@Module({
  imports: [SuppliersDataModule, TypeOrmModule.forFeature([...PRODUCTS_DATA_ENTITIES])],
  providers: [ProductsDataService],
  exports: [SuppliersDataModule, TypeOrmModule, ProductsDataService],
})
export class ProductsDataModule {}
