import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { TypeormBusinessRepository } from '@infrastructure/database/repositories/typeorm-business.repository';
import { BUSINESS_REPOSITORY } from './businesses.tokens';
import { CreateBusinessUseCase } from './application/use-cases/create-business/create-business.use-case';
import { GetBusinessByExternalIdUseCase } from './application/use-cases/get-business-by-external-id/get-business-by-external-id.use-case';
import { ListBusinessesUseCase } from './application/use-cases/list-businesses/list-businesses.use-case';
import { UpdateBusinessByExternalIdUseCase } from './application/use-cases/update-business-by-external-id/update-business-by-external-id.use-case';
import { DeleteBusinessByExternalIdUseCase } from './application/use-cases/delete-business-by-external-id/delete-business-by-external-id.use-case';
import { ListBusinessSenioritiesUseCase } from './application/use-cases/list-business-seniorities/list-business-seniorities.use-case';
import { BusinessSeniorityPublicController } from './presentation/controllers/business-seniority-public.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [BusinessSeniorityPublicController],
  providers: [
    {
      provide: BUSINESS_REPOSITORY,
      useExisting: TypeormBusinessRepository,
    },
    CreateBusinessUseCase,
    GetBusinessByExternalIdUseCase,
    ListBusinessesUseCase,
    UpdateBusinessByExternalIdUseCase,
    DeleteBusinessByExternalIdUseCase,
    ListBusinessSenioritiesUseCase,
  ],
  exports: [
    BUSINESS_REPOSITORY,
    CreateBusinessUseCase,
    GetBusinessByExternalIdUseCase,
    ListBusinessesUseCase,
    UpdateBusinessByExternalIdUseCase,
    DeleteBusinessByExternalIdUseCase,
    ListBusinessSenioritiesUseCase,
  ],
})
export class BusinessesModule {}
