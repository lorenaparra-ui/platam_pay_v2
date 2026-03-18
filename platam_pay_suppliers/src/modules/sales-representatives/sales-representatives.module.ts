import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesRepresentativeEntity } from '@libs/database';
import { TypeOrmSalesRepresentativeRepository } from '@infrastructure/database/repositories/typeorm-sales-representative.repository';
import { SALES_REPRESENTATIVE_REPOSITORY } from './domain/ports/sales-representative.repository.port';
import { CreateSalesRepresentativeUseCase } from './application/use-cases/create-sales-representative.use-case';
import { SalesRepresentativesController } from './presentation/sales-representatives.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SalesRepresentativeEntity])],
  controllers: [SalesRepresentativesController],
  providers: [
    {
      provide: SALES_REPRESENTATIVE_REPOSITORY,
      useClass: TypeOrmSalesRepresentativeRepository,
    },
    CreateSalesRepresentativeUseCase,
  ],
  exports: [SALES_REPRESENTATIVE_REPOSITORY, CreateSalesRepresentativeUseCase],
})
export class SalesRepresentativesModule {}
