import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostgresTypeOrmConfigService } from './database/services/postgres-type-orm-config.service';
import { SqsModule } from './messaging/sqs/sqs.module';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { TypeormBusinessRepository } from './database/repositories/typeorm-business.repository';
import { TypeormPartnerRepository } from './database/repositories/typeorm-partner.repository';
import { TypeormSupplierRepository } from './database/repositories/typeorm-supplier.repository';
import { TypeormBankAccountRepository } from './database/repositories/typeorm-bank-account.repository';
import { TypeormSuppliersReferenceLookupAdapter } from './database/common/typeorm-suppliers-reference-lookup.adapter';
import { TypeormPartnerOnboardingSagaRepository } from './database/repositories/typeorm-partner-onboarding-saga.repository';
import { SqlProductsCreditFacilitySyncAdapter } from './database/adapters/sql-products-credit-facility-sync.adapter';
import { TypeormPartnerUserSqsResultPollAdapter } from './database/adapters/typeorm-partner-user-sqs-result-poll.adapter';
import { PartnerSagaCompensationAdapter } from './database/adapters/partner-saga-compensation.adapter';
import { TypeormLegalRepresentativeRepository } from './database/repositories/typeorm-legal-representative.repository';
import { TypeormSalesRepresentativeRepository } from './database/repositories/typeorm-sales-representative.repository';
import { SqsTransversalUserPersonWriterAdapter } from './messaging/sqs/adapters/sqs-transversal-user-person-writer.adapter';
import { PARTNER_ONBOARDING_SAGA_REPOSITORY } from '@modules/partners/application/ports/partner-onboarding-saga.repository.port';
import { PRODUCTS_CREDIT_FACILITY_SYNC_PORT } from '@modules/partners/application/ports/products-credit-facility-sync.port';
import { TRANSVERSAL_USER_PERSON_WRITER_PORT } from '@modules/partners/application/ports/transversal-user-person-writer.port';
import { PARTNER_USER_SQS_RESULT_READER_PORT } from '@modules/partners/application/ports/partner-user-sqs-result-reader.port';
import { PARTNER_ONBOARDING_FILES_PORT } from '@modules/partners/application/ports/partner-onboarding-files.port';
import { PARTNER_SAGA_COMPENSATION_PORT } from '@modules/partners/application/ports/partner-saga-compensation.port';

import { SqsPartnerOnboardingFilesAdapter } from './messaging/sqs/adapters/sqs-partner-onboarding-files.adapter';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
} from '@common/ports/suppliers-reference-lookup.port';
import {
  BankAccountEntity,
  BusinessEntity,
  LegalRepresentativeEntity,
  PartnerOnboardingSagaEntity,
  PartnersEntity,
  SalesRepresentativeEntity,
  SupplierEntity,
} from '@app/suppliers-data';
import {
  CityEntity,
  PartnerCreateUserSqsIdempotencyEntity,
  PersonEntity,
  UserEntity,
} from '@app/transversal-data';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: PostgresTypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([
      BankAccountEntity,
      BusinessEntity,
      PartnerOnboardingSagaEntity,
      PartnersEntity,
      SupplierEntity,
      LegalRepresentativeEntity,
      SalesRepresentativeEntity,
      PartnerCreateUserSqsIdempotencyEntity,
      PersonEntity,
      UserEntity,
      CityEntity,
    ]),
    SqsModule,
    MessagingApplicationModule,
  ],
  providers: [
    TypeormBusinessRepository,
    TypeormPartnerRepository,
    TypeormSupplierRepository,
    TypeormBankAccountRepository,
    TypeormPartnerOnboardingSagaRepository,
    TypeormLegalRepresentativeRepository,
    TypeormSalesRepresentativeRepository,
    TypeormPartnerUserSqsResultPollAdapter,
    SqlProductsCreditFacilitySyncAdapter,
    SqsTransversalUserPersonWriterAdapter,
    TypeormSuppliersReferenceLookupAdapter,
    {
      provide: SUPPLIERS_REFERENCE_LOOKUP,
      useExisting: TypeormSuppliersReferenceLookupAdapter,
    },
    {
      provide: PARTNER_ONBOARDING_SAGA_REPOSITORY,
      useExisting: TypeormPartnerOnboardingSagaRepository,
    },
    {
      provide: PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
      useExisting: SqlProductsCreditFacilitySyncAdapter,
    },
    {
      provide: TRANSVERSAL_USER_PERSON_WRITER_PORT,
      useExisting: SqsTransversalUserPersonWriterAdapter,
    },
    {
      provide: PARTNER_USER_SQS_RESULT_READER_PORT,
      useExisting: TypeormPartnerUserSqsResultPollAdapter,
    },
    SqsPartnerOnboardingFilesAdapter,
    {
      provide: PARTNER_ONBOARDING_FILES_PORT,
      useExisting: SqsPartnerOnboardingFilesAdapter,
    },
    PartnerSagaCompensationAdapter,
    {
      provide: PARTNER_SAGA_COMPENSATION_PORT,
      useExisting: PartnerSagaCompensationAdapter,
    },
  ],
  exports: [
    TypeormBusinessRepository,
    TypeormPartnerRepository,
    TypeormSupplierRepository,
    TypeormBankAccountRepository,
    TypeormPartnerOnboardingSagaRepository,
    TypeormLegalRepresentativeRepository,
    TypeormSalesRepresentativeRepository,
    TypeormPartnerUserSqsResultPollAdapter,
    SUPPLIERS_REFERENCE_LOOKUP,
    PARTNER_ONBOARDING_SAGA_REPOSITORY,
    PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
    TRANSVERSAL_USER_PERSON_WRITER_PORT,
    PARTNER_USER_SQS_RESULT_READER_PORT,
    PARTNER_ONBOARDING_FILES_PORT,
    PARTNER_SAGA_COMPENSATION_PORT,
  ],
})
export class InfrastructureModule {}
