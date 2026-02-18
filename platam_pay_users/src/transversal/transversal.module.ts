import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { DocumentTypeEntity } from '@infrastructure/database/entities/document-type.entity';
import { BusinessSeniorityEntity } from '@infrastructure/database/entities/business-seniority.entity';
import { CreditApplicationBnplEntity } from '@infrastructure/database/entities/credit-application-bnpl.entity';

// Repositories (Implementations)
import { TypeOrmDocumentTypeRepository } from '@infrastructure/database/repositories/typeorm-document-type.repository';
import { TypeOrmBusinessSeniorityRepository } from '@infrastructure/database/repositories/typeorm-business-seniority.repository';
import { TypeOrmCreditApplicationBnplRepository } from '@infrastructure/database/repositories/typeorm-credit-application-bnpl.repository';

// Ports (Tokens)
import { DOCUMENT_TYPE_REPOSITORY } from '@transversal/domain/ports/document-type.repository.port';
import { BUSINESS_SENIORITY_REPOSITORY } from '@transversal/domain/ports/business-seniority.repository.port';
import { CREDIT_APPLICATION_BNPL_REPOSITORY } from '@transversal/domain/ports/credit-application-bnpl.repository.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentTypeEntity,
      BusinessSeniorityEntity,
      CreditApplicationBnplEntity,
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
      provide: CREDIT_APPLICATION_BNPL_REPOSITORY,
      useClass: TypeOrmCreditApplicationBnplRepository,
    },
  ],
  exports: [
    DOCUMENT_TYPE_REPOSITORY,
    BUSINESS_SENIORITY_REPOSITORY,
    CREDIT_APPLICATION_BNPL_REPOSITORY,
  ],
})
export class TransversalModule {}
