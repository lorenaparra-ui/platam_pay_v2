import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { DocumentTypeEntity } from '@infrastructure/database/entities/document-type.entity';
import { BusinessSeniorityEntity } from '@infrastructure/database/entities/business-seniority.entity';
import { OnboardingEntity } from '@infrastructure/database/entities/onboarding.entity';
import { StatusEntity } from '@infrastructure/database/entities/status.entity';
import { CityEntity } from '@infrastructure/database/entities/city.entity';

// Repositories (Implementations)
import { TypeOrmDocumentTypeRepository } from '@infrastructure/database/repositories/typeorm-document-type.repository';
import { TypeOrmBusinessSeniorityRepository } from '@infrastructure/database/repositories/typeorm-business-seniority.repository';
import { TypeOrmOnboardingRepository } from '@infrastructure/database/repositories/typeorm-onboarding.repository';
import { TypeOrmStatusRepository } from '@infrastructure/database/repositories/typeorm-status.repository';
import { TypeOrmCityRepository } from '@infrastructure/database/repositories/typeorm-city.repository';
import { RuesBusinessInformationApi } from '@infrastructure/external-apis/rues-business-information.api';

// Ports (Tokens)
import { DOCUMENT_TYPE_REPOSITORY } from 'src/modules/transversal/domain/ports/document-type.repository.port';
import { BUSINESS_SENIORITY_REPOSITORY } from '@transversal/domain/ports/repository/business-seniority.repository.port';
import { ONBOARDING_REPOSITORY } from 'src/modules/transversal/domain/ports/onboarding.repository.port';
import { STATUS_REPOSITORY } from 'src/modules/transversal/domain/ports/status.repository.port';
import { CITY_REPOSITORY } from 'src/modules/transversal/domain/ports/city.repository.port';
import { BUSINESS_INFORMATION_API } from 'src/modules/transversal/domain/ports/business-information-api.port';

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
