import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuppliersDataModule, SUPPLIERS_DATA_ENTITIES } from '../../suppliers-data/src/suppliers-data.module';
import { PersonEntity } from '../../transversal-data/src/entities/person.entity';
import { CategoryEntity } from './entities/category.entity';
import { ContractEntity } from './entities/contract.entity';
import { CreditApplicationEntity } from './entities/credit-application.entity';
import { CreditFacilityEntity } from './entities/credit-facility.entity';
import { ProductsDataService } from './products-data.service';

export const PRODUCTS_DATA_ENTITIES = [
  CreditFacilityEntity,
  CategoryEntity,
  CreditApplicationEntity,
  ContractEntity,
] as const;

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
