import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { MessagingApplicationModule } from '@messaging/messaging-application.module';
import { BankAccountsModule } from '@modules/bank-accounts/bank-accounts.module';
import { BusinessesModule } from '@modules/businesses/businesses.module';
import { TypeormPartnerRepository } from '@infrastructure/database/repositories/typeorm-partner.repository';
import { PARTNER_REPOSITORY } from './partners.tokens';
import { CreatePartnerUseCase } from './application/use-cases/create-partner/create-partner.use-case';
import { GetPartnerByExternalIdUseCase } from './application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case';
import { ListPartnersUseCase } from './application/use-cases/list-partners/list-partners.use-case';
import { UpdatePartnerByExternalIdUseCase } from './application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case';
import { DeletePartnerByExternalIdUseCase } from './application/use-cases/delete-partner-by-external-id/delete-partner-by-external-id.use-case';
import { CreatePartnerOrchestratorUseCase } from './application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case';
import { PartnersController } from './presentation/partners.controller';

@Module({
  imports: [
    InfrastructureModule,
    MessagingApplicationModule,
    BankAccountsModule,
    BusinessesModule,
    MulterModule.register({
      storage: memoryStorage(),
      limits: { fileSize: 12 * 1024 * 1024 },
    }),
  ],
  controllers: [PartnersController],
  providers: [
    {
      provide: PARTNER_REPOSITORY,
      useExisting: TypeormPartnerRepository,
    },
    CreatePartnerUseCase,
    GetPartnerByExternalIdUseCase,
    ListPartnersUseCase,
    UpdatePartnerByExternalIdUseCase,
    DeletePartnerByExternalIdUseCase,
    CreatePartnerOrchestratorUseCase,
  ],
  exports: [
    PARTNER_REPOSITORY,
    CreatePartnerUseCase,
    GetPartnerByExternalIdUseCase,
    ListPartnersUseCase,
    UpdatePartnerByExternalIdUseCase,
    DeletePartnerByExternalIdUseCase,
  ],
})
export class PartnersModule {}
