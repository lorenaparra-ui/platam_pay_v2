import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { SqsModule } from './messaging/sqs/sqs.module';
import { ProductsDataModule } from '@app/products-data';
import { TypeormCategoryRepository } from '@infrastructure/database/repositories/typeorm-category.repository';
import { TypeormCreditFacilityRepository } from '@infrastructure/database/repositories/typeorm-credit-facility.repository';
import { TypeormCreditApplicationRepository } from '@infrastructure/database/repositories/typeorm-credit-application.repository';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CLIENT_REGISTRATION_PORT } from '@modules/credit-applications/application/ports/client-registration.port';
import { CREDIT_APPLICATION_DOCUMENT_STORAGE } from '@modules/credit-applications/application/ports/credit-application-document-storage.port';
import { PRODUCTS_REFERENCE_LOOKUP } from '@common/ports/products-reference-lookup.port';
import { TypeormProductsReferenceLookupAdapter } from '@infrastructure/database/common/typeorm-products-reference-lookup.adapter';
import { TypeormClientRegistrationAdapter } from '@infrastructure/database/adapters/typeorm-client-registration.adapter';
import { StubCreditApplicationDocumentStorageAdapter } from '@infrastructure/database/adapters/stub-credit-application-document-storage.adapter';

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
      provide: CATEGORY_REPOSITORY,
      useClass: TypeormCategoryRepository,
    },
    {
      provide: CREDIT_FACILITY_REPOSITORY,
      useClass: TypeormCreditFacilityRepository,
    },
    {
      provide: CREDIT_APPLICATION_REPOSITORY,
      useClass: TypeormCreditApplicationRepository,
    },
    TypeormClientRegistrationAdapter,
    {
      provide: CLIENT_REGISTRATION_PORT,
      useExisting: TypeormClientRegistrationAdapter,
    },
    StubCreditApplicationDocumentStorageAdapter,
    {
      provide: CREDIT_APPLICATION_DOCUMENT_STORAGE,
      useExisting: StubCreditApplicationDocumentStorageAdapter,
    },
  ],
  exports: [
    CATEGORY_REPOSITORY,
    CREDIT_FACILITY_REPOSITORY,
    CREDIT_APPLICATION_REPOSITORY,
    CLIENT_REGISTRATION_PORT,
    CREDIT_APPLICATION_DOCUMENT_STORAGE,
    PRODUCTS_REFERENCE_LOOKUP,
  ],
})
export class InfrastructureModule {}
