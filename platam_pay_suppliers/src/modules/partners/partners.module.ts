import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnersEntity } from "@infrastructure/database/entities/partners.entity";
import { TypeOrmPartnersRepository } from "@infrastructure/database/repositories/typeorm-partners.repository";
import { BusinessesModule } from "@businesses/businesses.module";
import { PARTNERS_REPOSITORY } from "./domain/ports/partner.repository.port";
import { EVENT_BUS_PORT } from "./domain/ports/event-bus.port";
import { PARTNER_LOGO_STORAGE_PORT } from "./domain/ports/partner-logo-storage.port";
import { EventEmitterEventBusAdapter } from "./infrastructure/events/event-emitter-event-bus.adapter";
import { PartnerLogoStorageAdapter } from "./infrastructure/storage/partner-logo-storage.adapter";
import { FILE_UPLOADER } from "./infrastructure/storage/partner-logo-storage.adapter";
import { InMemoryFileUploaderAdapter } from "./infrastructure/storage/in-memory-file-uploader.adapter";
import { PartnerLogoUploadHandler } from "./infrastructure/events/handlers/partner-logo-upload.handler";
import {
  PartnerCategoriesCreateHandler,
  PARTNER_CATEGORIES_SERVICE,
} from "./infrastructure/events/handlers/partner-categories-create.handler";
import {
  PartnerUserCreateHandler,
  PARTNER_USER_CREATOR,
} from "./infrastructure/events/handlers/partner-user-create.handler";
import { PartnerCategoriesServiceStubAdapter } from "./infrastructure/services/partner-categories-service-stub.adapter";
import { PartnerUserCreatorStubAdapter } from "./infrastructure/services/partner-user-creator-stub.adapter";
import { CreatePartnerUseCase } from "./application/use-cases/create-partner.use-case";
import { CreatePartnerEventDrivenUseCase } from "./application/use-cases/create-partner-event-driven.use-case";
import { FindAllPartnersUseCase } from "./application/use-cases/find-all-partners.use-case";
import { FindPartnerByExternalIdUseCase } from "./application/use-cases/find-partner-by-external-id.use-case";
import { UpdatePartnerByExternalIdUseCase } from "./application/use-cases/update-partner-by-external-id.use-case";
import { DeletePartnerByExternalIdUseCase } from "./application/use-cases/delete-partner-by-external-id.use-case";
import { ChangePartnerStatusUseCase } from "./application/use-cases/change-partner-status.use-case";

/**
 * Módulo de partners: contiene toda la lógica de negocio (casos de uso, dominio, infraestructura).
 * No expone controladores; la capa HTTP queda en management (controlador delgado).
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([PartnersEntity]),
    BusinessesModule,
  ],
  controllers: [],
  providers: [
    { provide: PARTNERS_REPOSITORY, useClass: TypeOrmPartnersRepository },
    { provide: EVENT_BUS_PORT, useClass: EventEmitterEventBusAdapter },
    { provide: FILE_UPLOADER, useClass: InMemoryFileUploaderAdapter },
    { provide: PARTNER_LOGO_STORAGE_PORT, useClass: PartnerLogoStorageAdapter },
    { provide: PARTNER_CATEGORIES_SERVICE, useClass: PartnerCategoriesServiceStubAdapter },
    { provide: PARTNER_USER_CREATOR, useClass: PartnerUserCreatorStubAdapter },
    CreatePartnerUseCase,
    CreatePartnerEventDrivenUseCase,
    FindAllPartnersUseCase,
    FindPartnerByExternalIdUseCase,
    UpdatePartnerByExternalIdUseCase,
    DeletePartnerByExternalIdUseCase,
    ChangePartnerStatusUseCase,
    PartnerLogoUploadHandler,
    PartnerCategoriesCreateHandler,
    PartnerUserCreateHandler,
  ],
  exports: [
    PARTNERS_REPOSITORY,
    CreatePartnerUseCase,
    CreatePartnerEventDrivenUseCase,
    FindAllPartnersUseCase,
    FindPartnerByExternalIdUseCase,
    UpdatePartnerByExternalIdUseCase,
    DeletePartnerByExternalIdUseCase,
    ChangePartnerStatusUseCase,
  ],
})
export class PartnersModule {}
