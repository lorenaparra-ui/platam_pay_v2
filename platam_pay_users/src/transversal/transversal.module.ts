import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { DocumentTypeEntity } from '@infrastructure/database/entities/document-type.entity';
import { BusinessSeniorityEntity } from '@infrastructure/database/entities/business-seniority.entity';
import { OnboardingEntity } from '@infrastructure/database/entities/onboarding.entity';

// Repositories (Implementations)
import { TypeOrmDocumentTypeRepository } from '@infrastructure/database/repositories/typeorm-document-type.repository';
import { TypeOrmBusinessSeniorityRepository } from '@infrastructure/database/repositories/typeorm-business-seniority.repository';
import { TypeOrmOnboardingRepository } from '@infrastructure/database/repositories/typeorm-onboarding.repository';

// Ports (Tokens)
import { DOCUMENT_TYPE_REPOSITORY } from '@transversal/domain/ports/document-type.repository.port';
import { BUSINESS_SENIORITY_REPOSITORY } from '@transversal/domain/ports/business-seniority.repository.port';
import { ONBOARDING_REPOSITORY } from '@transversal/domain/ports/onboarding.repository.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentTypeEntity,
      BusinessSeniorityEntity,
      OnboardingEntity,
    ]),
  ],
  providers: [
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
  ],
  exports: [
    DOCUMENT_TYPE_REPOSITORY,
    BUSINESS_SENIORITY_REPOSITORY,
    ONBOARDING_REPOSITORY,
  ],
})
export class TransversalModule {}
