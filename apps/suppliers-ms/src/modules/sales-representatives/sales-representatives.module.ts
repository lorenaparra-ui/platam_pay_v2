import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { TypeormSalesRepresentativeRepository } from '@infrastructure/database/repositories/typeorm-sales-representative.repository';
import { SALES_REPRESENTATIVE_REPOSITORY } from './sales-representatives.tokens';
import { CreateSalesRepresentativeUseCase } from './application/use-cases/create-sales-representative/create-sales-representative.use-case';
import { GetSalesRepresentativeByExternalIdUseCase } from './application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case';
import { ListSalesRepresentativesUseCase } from './application/use-cases/list-sales-representatives/list-sales-representatives.use-case';
import { UpdateSalesRepresentativeByExternalIdUseCase } from './application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case';
import { DeleteSalesRepresentativeByExternalIdUseCase } from './application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case';
import { SalesRepresentativesController } from './presentation/sales-representatives.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [SalesRepresentativesController],
  providers: [
    {
      provide: SALES_REPRESENTATIVE_REPOSITORY,
      useExisting: TypeormSalesRepresentativeRepository,
    },
    CreateSalesRepresentativeUseCase,
    GetSalesRepresentativeByExternalIdUseCase,
    ListSalesRepresentativesUseCase,
    UpdateSalesRepresentativeByExternalIdUseCase,
    DeleteSalesRepresentativeByExternalIdUseCase,
  ],
  exports: [
    SALES_REPRESENTATIVE_REPOSITORY,
    CreateSalesRepresentativeUseCase,
    GetSalesRepresentativeByExternalIdUseCase,
    ListSalesRepresentativesUseCase,
    UpdateSalesRepresentativeByExternalIdUseCase,
    DeleteSalesRepresentativeByExternalIdUseCase,
  ],
})
export class SalesRepresentativesModule {}
