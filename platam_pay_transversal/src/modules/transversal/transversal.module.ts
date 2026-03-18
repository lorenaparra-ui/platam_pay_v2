import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { DocumentTypeEntity } from '@libs/database';
import { BusinessSeniorityEntity } from '@libs/database';
import { OnboardingEntity } from '@libs/database';
import { StatusEntity } from '@libs/database';
import { CityEntity } from '@libs/database';

// Repositories (Implementations)
import { TypeOrmDocumentTypeRepository } from '@infrastructure/database/repositories/transversal/typeorm-document-type.repository';
import { TypeOrmBusinessSeniorityRepository } from '@infrastructure/database/repositories/transversal/typeorm-business-seniority.repository';
import { TypeOrmOnboardingRepository } from '@infrastructure/database/repositories/typeorm-onboarding.repository';
import { TypeOrmStatusRepository } from '@infrastructure/database/repositories/transversal/typeorm-status.repository';
import { TypeOrmCityRepository } from '@infrastructure/database/repositories/transversal/typeorm-city.repository';
import { RuesBusinessInformationApi } from '@infrastructure/external-apis/rues-business-information.api';

// Ports (Tokens)
import { DOCUMENT_TYPE_REPOSITORY } from '@transversal/domain/ports/repository/document-type.repository.port';
import { BUSINESS_SENIORITY_REPOSITORY } from '@transversal/domain/ports/repository/business-seniority.repository.port';
import { ONBOARDING_REPOSITORY } from '@transversal/domain/ports/repository/onboarding.repository.port';
import { STATUS_REPOSITORY } from '@transversal/domain/ports/repository/status.repository.port';
import { CITY_REPOSITORY } from '@transversal/domain/ports/repository/city.repository.port';
import { BUSINESS_INFORMATION_API } from '@transversal/domain/ports/repository/business-information-api.port';

// Use Cases
import { GetBusinessSenioritiesUseCase } from './application/use-cases/get-business-seniorities.use-case';
import { GetCitiesUseCase } from './application/use-cases/get-cities.use-case';
import { GetDocumentTypesUseCase } from './application/use-cases/get-document-types.use-case';
import { GetStatusesUseCase } from './application/use-cases/get-statuses.use-case';
import { GetBusinessInformationUseCase } from './application/use-cases/get-business-information.use-case';

// Controllers
import { BusinessSeniorityController } from './presentation/business-seniority.controller';
import { CityController } from './presentation/city.controller';
import { DocumentTypeController } from './presentation/document-type.controller';
import { StatusController } from './presentation/status.controller';
import { BusinessInformationController } from './presentation/business-information.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentTypeEntity,
      BusinessSeniorityEntity,
      OnboardingEntity,
      StatusEntity,
      CityEntity,
    ]),
  ],
  controllers: [
    BusinessSeniorityController,
    CityController,
    DocumentTypeController,
    StatusController,
    BusinessInformationController,
  ],
  providers: [
    // Repository bindings
    {
      provide: DOCUMENT_TYPE_REPOSITORY,
      useClass: TypeOrmDocumentTypeRepository,
    },
    {
      provide: BUSINESS_SENIORITY_REPOSITORY,
      useClass: TypeOrmBusinessSeniorityRepository,
    },
    {
      provide: ONBOARDING_REPOSITORY,
      useClass: TypeOrmOnboardingRepository,
    },
    {
      provide: STATUS_REPOSITORY,
      useClass: TypeOrmStatusRepository,
    },
    {
      provide: CITY_REPOSITORY,
      useClass: TypeOrmCityRepository,
    },
    {
      provide: BUSINESS_INFORMATION_API,
      useClass: RuesBusinessInformationApi,
    },
    // Use Cases
    GetBusinessSenioritiesUseCase,
    GetCitiesUseCase,
    GetDocumentTypesUseCase,
    GetStatusesUseCase,
    GetBusinessInformationUseCase,
  ],
  exports: [
    DOCUMENT_TYPE_REPOSITORY,
    BUSINESS_SENIORITY_REPOSITORY,
    ONBOARDING_REPOSITORY,
    STATUS_REPOSITORY,
    CITY_REPOSITORY,
    BUSINESS_INFORMATION_API,
    GetBusinessSenioritiesUseCase,
    GetCitiesUseCase,
    GetDocumentTypesUseCase,
    GetStatusesUseCase,
    GetBusinessInformationUseCase,
  ],
})
export class TransversalModule {}
