import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
import { TypeOrmPartnersRepository } from "@infrastructure/database/repositories/typeorm-partners.repository";
import { ChangePartnerStatusUseCase } from "./application/use-cases/change-partner-status.use-case";
import { CreatePartnerUseCase } from "./application/use-cases/create-partner.use-case";
import { DeletePartnerByExternalIdUseCase } from "./application/use-cases/delete-partner-by-external-id.use-case";
import { FindAllPartnersUseCase } from "./application/use-cases/find-all-partners.use-case";
import { FindPartnerByExternalIdUseCase } from "./application/use-cases/find-partner-by-external-id.use-case";
import { UpdatePartnerByExternalIdUseCase } from "./application/use-cases/update-partner-by-external-id.use-case";
import { PARTNERS_REPOSITORY } from "./domain/ports/partner.repository.port";
import { PartnersController } from "./presentation/partners.controller";

@Module({
  imports: [TypeOrmModule.forFeature([PartnersEntity])],
  controllers: [PartnersController],
  providers: [
    {
      provide: PARTNERS_REPOSITORY,
      useClass: TypeOrmPartnersRepository,
    },
    CreatePartnerUseCase,
    FindAllPartnersUseCase,
    FindPartnerByExternalIdUseCase,
    UpdatePartnerByExternalIdUseCase,
    DeletePartnerByExternalIdUseCase,
    ChangePartnerStatusUseCase,
  ],
  exports: [PARTNERS_REPOSITORY],
})
export class PartnersModule {}
