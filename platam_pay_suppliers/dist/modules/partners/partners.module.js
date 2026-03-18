"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("@libs/database");
const typeorm_partners_repository_1 = require("../../infrastructure/database/repositories/typeorm-partners.repository");
const businesses_module_1 = require("../businesses/businesses.module");
const partner_repository_port_1 = require("./domain/ports/partner.repository.port");
const event_bus_port_1 = require("./domain/ports/event-bus.port");
const partner_logo_storage_port_1 = require("./domain/ports/partner-logo-storage.port");
const event_emitter_event_bus_adapter_1 = require("./infrastructure/events/event-emitter-event-bus.adapter");
const partner_logo_storage_adapter_1 = require("./infrastructure/storage/partner-logo-storage.adapter");
const partner_logo_storage_adapter_2 = require("./infrastructure/storage/partner-logo-storage.adapter");
const in_memory_file_uploader_adapter_1 = require("./infrastructure/storage/in-memory-file-uploader.adapter");
const partner_logo_upload_handler_1 = require("./infrastructure/events/handlers/partner-logo-upload.handler");
const partner_categories_create_handler_1 = require("./infrastructure/events/handlers/partner-categories-create.handler");
const partner_user_create_handler_1 = require("./infrastructure/events/handlers/partner-user-create.handler");
const partner_categories_service_stub_adapter_1 = require("./infrastructure/services/partner-categories-service-stub.adapter");
const partner_user_creator_stub_adapter_1 = require("./infrastructure/services/partner-user-creator-stub.adapter");
const create_partner_use_case_1 = require("./application/use-cases/create-partner.use-case");
const create_partner_event_driven_use_case_1 = require("./application/use-cases/create-partner-event-driven.use-case");
const find_all_partners_use_case_1 = require("./application/use-cases/find-all-partners.use-case");
const find_partner_by_external_id_use_case_1 = require("./application/use-cases/find-partner-by-external-id.use-case");
const update_partner_by_external_id_use_case_1 = require("./application/use-cases/update-partner-by-external-id.use-case");
const delete_partner_by_external_id_use_case_1 = require("./application/use-cases/delete-partner-by-external-id.use-case");
const change_partner_status_use_case_1 = require("./application/use-cases/change-partner-status.use-case");
let PartnersModule = class PartnersModule {
};
exports.PartnersModule = PartnersModule;
exports.PartnersModule = PartnersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([database_1.PartnersEntity]),
            businesses_module_1.BusinessesModule,
        ],
        controllers: [],
        providers: [
            { provide: partner_repository_port_1.PARTNERS_REPOSITORY, useClass: typeorm_partners_repository_1.TypeOrmPartnersRepository },
            { provide: event_bus_port_1.EVENT_BUS_PORT, useClass: event_emitter_event_bus_adapter_1.EventEmitterEventBusAdapter },
            { provide: partner_logo_storage_adapter_2.FILE_UPLOADER, useClass: in_memory_file_uploader_adapter_1.InMemoryFileUploaderAdapter },
            { provide: partner_logo_storage_port_1.PARTNER_LOGO_STORAGE_PORT, useClass: partner_logo_storage_adapter_1.PartnerLogoStorageAdapter },
            { provide: partner_categories_create_handler_1.PARTNER_CATEGORIES_SERVICE, useClass: partner_categories_service_stub_adapter_1.PartnerCategoriesServiceStubAdapter },
            { provide: partner_user_create_handler_1.PARTNER_USER_CREATOR, useClass: partner_user_creator_stub_adapter_1.PartnerUserCreatorStubAdapter },
            create_partner_use_case_1.CreatePartnerUseCase,
            create_partner_event_driven_use_case_1.CreatePartnerEventDrivenUseCase,
            find_all_partners_use_case_1.FindAllPartnersUseCase,
            find_partner_by_external_id_use_case_1.FindPartnerByExternalIdUseCase,
            update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
            delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
            change_partner_status_use_case_1.ChangePartnerStatusUseCase,
            partner_logo_upload_handler_1.PartnerLogoUploadHandler,
            partner_categories_create_handler_1.PartnerCategoriesCreateHandler,
            partner_user_create_handler_1.PartnerUserCreateHandler,
        ],
        exports: [
            partner_repository_port_1.PARTNERS_REPOSITORY,
            create_partner_use_case_1.CreatePartnerUseCase,
            create_partner_event_driven_use_case_1.CreatePartnerEventDrivenUseCase,
            find_all_partners_use_case_1.FindAllPartnersUseCase,
            find_partner_by_external_id_use_case_1.FindPartnerByExternalIdUseCase,
            update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
            delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
            change_partner_status_use_case_1.ChangePartnerStatusUseCase,
        ],
    })
], PartnersModule);
//# sourceMappingURL=partners.module.js.map