import { Module } from "@nestjs/common";
import { BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY } from "./domain/ports/backoffice-credit-applications-read.repository.port";
import { TypeOrmBackofficeCreditApplicationsReadRepository } from "@infrastructure/database/repositories/typeorm-backoffice-credit-applications-read.repository";
import { ListCreditApplicationsUseCase } from "./application/use-cases/list-credit-applications.use-case";
import { GetStatusCountsUseCase } from "./application/use-cases/get-status-counts.use-case";
import { ListActivePartnersUseCase } from "./application/use-cases/list-active-partners.use-case";
import { BackofficeCreditApplicationsController } from "./presentation/backoffice-credit-applications.controller";
import { BackofficeAuthGuard } from "./presentation/guards/backoffice-auth.guard";

@Module({
  controllers: [BackofficeCreditApplicationsController],
  providers: [
    {
      provide: BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY,
      useClass: TypeOrmBackofficeCreditApplicationsReadRepository,
    },
    ListCreditApplicationsUseCase,
    GetStatusCountsUseCase,
    ListActivePartnersUseCase,
    BackofficeAuthGuard,
  ],
})
export class BackofficeCreditApplicationsModule {}
