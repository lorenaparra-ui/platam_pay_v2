import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreditApplicationEntity } from '@libs/database';
import { TypeOrmCreditApplicationRepository } from "@infrastructure/database/repositories/typeorm-credit-application.repository";
import { CREDIT_APPLICATION_REPOSITORY } from "./domain/ports/credit-application.repository.port";
import { CreditApplicationsController } from "./presentation/credit-applications.controller";
import { CreateCreditApplicationUseCase } from "./application/use-cases/create-credit-application.use-case";
import { GetAllCreditApplicationsUseCase } from "./application/use-cases/get-all-credit-applications.use-case";
import { GetCreditApplicationByExternalIdUseCase } from "./application/use-cases/get-credit-application-by-external-id.use-case";
import { UpdateCreditApplicationUseCase } from "./application/use-cases/update-credit-application.use-case";
import { DeleteCreditApplicationUseCase } from "./application/use-cases/delete-credit-application.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([CreditApplicationEntity])],
  controllers: [CreditApplicationsController],
  providers: [
    {
      provide: CREDIT_APPLICATION_REPOSITORY,
      useClass: TypeOrmCreditApplicationRepository,
    },
    CreateCreditApplicationUseCase,
    GetAllCreditApplicationsUseCase,
    GetCreditApplicationByExternalIdUseCase,
    UpdateCreditApplicationUseCase,
    DeleteCreditApplicationUseCase,
  ],
  exports: [CREDIT_APPLICATION_REPOSITORY],
})
export class CreditApplicationsModule {}
