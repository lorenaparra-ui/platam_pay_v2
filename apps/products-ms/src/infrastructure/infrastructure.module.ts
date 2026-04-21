import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { SqsModule } from './messaging/sqs/sqs.module';
import { ProductsDataModule } from '@app/products-data';
import { TypeormCategoryRepository } from '@infrastructure/database/repositories/typeorm-category.repository';
import { TypeormCreditFacilityRepository } from '@infrastructure/database/repositories/typeorm-credit-facility.repository';
import { TypeormCreditApplicationRepository } from '@infrastructure/database/repositories/typeorm-credit-application.repository';
import { TypeormCreditApplicationJobRepository } from '@infrastructure/database/repositories/typeorm-credit-application-job.repository';
import { CATEGORY_REPOSITORY } from '@modules/categories/categories.tokens';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import { CREDIT_APPLICATION_REPOSITORY, CREDIT_APPLICATION_JOB_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CLIENT_REGISTRATION_PORT } from '@modules/credit-applications/application/ports/client-registration.port';
import { CREDIT_APPLICATION_DOCUMENT_STORAGE } from '@modules/credit-applications/application/ports/credit-application-document-storage.port';
import { PRODUCTS_REFERENCE_LOOKUP } from '@common/ports/products-reference-lookup.port';
import { TypeormProductsReferenceLookupAdapter } from '@infrastructure/database/common/typeorm-products-reference-lookup.adapter';
import { TypeormClientRegistrationAdapter } from '@infrastructure/database/adapters/typeorm-client-registration.adapter';
import { StubCreditApplicationDocumentStorageAdapter } from '@infrastructure/database/adapters/stub-credit-application-document-storage.adapter';
import { PartnerCreateUserSqsIdempotencyEntity } from '@app/transversal-data';
import { ConfigTransversalCreatePersonQueueUrlAdapter } from '@infrastructure/messaging/sqs/adapters/config-transversal-create-person-queue-url.adapter';
import { TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT } from '@messaging/domain/ports/transversal-create-person-queue-url.port';
import { PublishCreatePersonCommandUseCase } from '@messaging/application/use-cases/publish-create-person-command.use-case';
import { TypeormCreatePersonSqsResultPollAdapter } from '@infrastructure/database/adapters/typeorm-create-person-sqs-result-poll.adapter';
import { CREATE_PERSON_SQS_RESULT_READER_PORT } from '@modules/credit-applications/application/ports/create-person-sqs-result-reader.port';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([PartnerCreateUserSqsIdempotencyEntity]),
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
    TypeormCreditApplicationJobRepository,
    {
      provide: CREDIT_APPLICATION_JOB_REPOSITORY,
      useExisting: TypeormCreditApplicationJobRepository,
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
    ConfigTransversalCreatePersonQueueUrlAdapter,
    {
      provide: TRANSVERSAL_CREATE_PERSON_QUEUE_URL_PORT,
      useExisting: ConfigTransversalCreatePersonQueueUrlAdapter,
    },
    PublishCreatePersonCommandUseCase,
    TypeormCreatePersonSqsResultPollAdapter,
    {
      provide: CREATE_PERSON_SQS_RESULT_READER_PORT,
      useExisting: TypeormCreatePersonSqsResultPollAdapter,
    },
  ],
  exports: [
    CATEGORY_REPOSITORY,
    CREDIT_FACILITY_REPOSITORY,
    CREDIT_APPLICATION_REPOSITORY,
    CREDIT_APPLICATION_JOB_REPOSITORY,
    CLIENT_REGISTRATION_PORT,
    CREDIT_APPLICATION_DOCUMENT_STORAGE,
    PRODUCTS_REFERENCE_LOOKUP,
    PublishCreatePersonCommandUseCase,
    CREATE_PERSON_SQS_RESULT_READER_PORT,
  ],
})
export class InfrastructureModule {}
