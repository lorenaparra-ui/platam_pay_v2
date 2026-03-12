import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditApplicationBnplEntity } from '@infrastructure/database/entities/credit-application-bnpl.entity';
import { TypeOrmCreditApplicationBnplRepository } from '@infrastructure/database/repositories/typeorm-credit-application-bnpl.repository';
import { CREDIT_APPLICATION_BNPL_REPOSITORY } from './domain/ports/credit-application-bnpl.repository.port';
import { CreditApplicationsBnplController } from './presentation/credit-applications-bnpl.controller';
import { CreateCreditApplicationBnplUseCase } from './application/use-cases/create-credit-application-bnpl.use-case';
import { GetAllCreditApplicationsBnplUseCase } from './application/use-cases/get-all-credit-applications-bnpl.use-case';
import { GetCreditApplicationBnplByExternalIdUseCase } from './application/use-cases/get-credit-application-bnpl-by-external-id.use-case';
import { UpdateCreditApplicationBnplUseCase } from './application/use-cases/update-credit-application-bnpl.use-case';
import { DeleteCreditApplicationBnplUseCase } from './application/use-cases/delete-credit-application-bnpl.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreditApplicationBnplEntity]),
  ],
  controllers: [CreditApplicationsBnplController],
  providers: [
    {
      provide: CREDIT_APPLICATION_BNPL_REPOSITORY,
      useClass: TypeOrmCreditApplicationBnplRepository,
    },
    CreateCreditApplicationBnplUseCase,
    GetAllCreditApplicationsBnplUseCase,
    GetCreditApplicationBnplByExternalIdUseCase,
    UpdateCreditApplicationBnplUseCase,
    DeleteCreditApplicationBnplUseCase,
  ],
  exports: [CREDIT_APPLICATION_BNPL_REPOSITORY],
})
export class CreditApplicationsModule {}
