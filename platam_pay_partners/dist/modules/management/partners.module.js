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
const partners_entity_1 = require("../../infrastructure/database/entities/partners.entity");
const typeorm_partners_repository_1 = require("../../infrastructure/database/repositories/typeorm-partners.repository");
const http_create_partner_user_adapter_1 = require("../../infrastructure/external-apis/http-create-partner-user.adapter");
const http_file_storage_adapter_1 = require("../../infrastructure/external-apis/http-file-storage.adapter");
const businesses_module_1 = require("../businesses/businesses.module");
const change_partner_status_use_case_1 = require("./application/use-cases/change-partner-status.use-case");
const create_partner_use_case_1 = require("./application/use-cases/create-partner.use-case");
const register_partner_use_case_1 = require("./application/use-cases/register-partner.use-case");
const delete_partner_by_external_id_use_case_1 = require("./application/use-cases/delete-partner-by-external-id.use-case");
const find_all_partners_use_case_1 = require("./application/use-cases/find-all-partners.use-case");
const find_partner_by_external_id_use_case_1 = require("./application/use-cases/find-partner-by-external-id.use-case");
const update_partner_by_external_id_use_case_1 = require("./application/use-cases/update-partner-by-external-id.use-case");
const create_partner_user_port_1 = require("./domain/ports/create-partner-user.port");
const file_storage_port_1 = require("./domain/ports/file-storage.port");
const partner_repository_port_1 = require("./domain/ports/partner.repository.port");
const partners_controller_1 = require("./presentation/partners.controller");
let PartnersModule = class PartnersModule {
};
exports.PartnersModule = PartnersModule;
exports.PartnersModule = PartnersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([partners_entity_1.PartnersEntity]),
            businesses_module_1.BusinessesModule,
        ],
        controllers: [partners_controller_1.PartnersController],
        providers: [
            {
                provide: partner_repository_port_1.PARTNERS_REPOSITORY,
                useClass: typeorm_partners_repository_1.TypeOrmPartnersRepository,
            },
            {
                provide: create_partner_user_port_1.CREATE_PARTNER_USER_PORT,
                useClass: http_create_partner_user_adapter_1.HttpCreatePartnerUserAdapter,
            },
            {
                provide: file_storage_port_1.FILE_STORAGE_PORT,
                useClass: http_file_storage_adapter_1.HttpFileStorageAdapter,
            },
            create_partner_use_case_1.CreatePartnerUseCase,
            register_partner_use_case_1.RegisterPartnerUseCase,
            find_all_partners_use_case_1.FindAllPartnersUseCase,
            find_partner_by_external_id_use_case_1.FindPartnerByExternalIdUseCase,
            update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
            delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
            change_partner_status_use_case_1.ChangePartnerStatusUseCase,
        ],
        exports: [partner_repository_port_1.PARTNERS_REPOSITORY],
    })
], PartnersModule);
//# sourceMappingURL=partners.module.js.map