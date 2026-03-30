import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { SqsModule } from './messaging/sqs/sqs.module';
import { ProductsDataModule } from '@app/products-data';
import { TypeormCategoryRepository } from '@infrastructure/database/repositories/typeorm-category.repository';
import { TypeormCreditFacilityRepository } from '@infrastructure/database/repositories/typeorm-credit-facility.repository';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import { PRODUCTS_REFERENCE_LOOKUP } from '@common/ports/products-reference-lookup.port';
import { CREDIT_FACILITY_STATUS_LOOKUP } from '@modules/credit-facilities/domain/ports/credit-facility-status-lookup.port';
import { TypeormProductsReferenceLookupAdapter } from '@infrastructure/database/common/typeorm-products-reference-lookup.adapter';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeOrmConfigService,
    }),
    ProductsDataModule,
    SqsModule,
  ],
  providers: [
    TypeormProductsReferenceLookupAdapter,
    {
      provide: PRODUCTS_REFERENCE_LOOKUP,
      useExisting: TypeormProductsReferenceLookupAdapter,
    },
    {
      provide: CREDIT_FACILITY_STATUS_LOOKUP,
      useExisting: TypeormProductsReferenceLookupAdapter,
    },
    {
      provide: CATEGORY_REPOSITORY,
      useClass: TypeormCategoryRepository,
    },
    {
      provide: CREDIT_FACILITY_REPOSITORY,
      useClass: TypeormCreditFacilityRepository,
    },
  ],
  exports: [
    CATEGORY_REPOSITORY,
    CREDIT_FACILITY_REPOSITORY,
    PRODUCTS_REFERENCE_LOOKUP,
    CREDIT_FACILITY_STATUS_LOOKUP,
  ],
})
export class InfrastructureModule {}
