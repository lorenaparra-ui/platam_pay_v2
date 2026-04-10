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
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const messaging_application_module_1 = require("../messaging/messaging-application.module");
const bank_accounts_module_1 = require("../bank-accounts/bank-accounts.module");
const businesses_module_1 = require("../businesses/businesses.module");
const legal_representatives_module_1 = require("../legal-representatives/legal-representatives.module");
const suppliers_module_1 = require("../suppliers/suppliers.module");
const typeorm_partner_repository_1 = require("../../infrastructure/database/repositories/typeorm-partner.repository");
const partners_tokens_1 = require("./partners.tokens");
const create_partner_use_case_1 = require("./application/use-cases/create-partner/create-partner.use-case");
const get_partner_by_external_id_use_case_1 = require("./application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case");
const list_partners_use_case_1 = require("./application/use-cases/list-partners/list-partners.use-case");
const update_partner_by_external_id_use_case_1 = require("./application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case");
const delete_partner_by_external_id_use_case_1 = require("./application/use-cases/delete-partner-by-external-id/delete-partner-by-external-id.use-case");
const create_partner_orchestrator_use_case_1 = require("./application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case");
const partners_controller_1 = require("./presentation/partners.controller");
let PartnersModule = class PartnersModule {
};
exports.PartnersModule = PartnersModule;
exports.PartnersModule = PartnersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            infrastructure_module_1.InfrastructureModule,
            messaging_application_module_1.MessagingApplicationModule,
            bank_accounts_module_1.BankAccountsModule,
            businesses_module_1.BusinessesModule,
            legal_representatives_module_1.LegalRepresentativesModule,
            suppliers_module_1.SuppliersModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.memoryStorage)(),
                limits: { fileSize: 12 * 1024 * 1024 },
            }),
        ],
        controllers: [partners_controller_1.PartnersController],
        providers: [
            {
                provide: partners_tokens_1.PARTNER_REPOSITORY,
                useExisting: typeorm_partner_repository_1.TypeormPartnerRepository,
            },
            create_partner_use_case_1.CreatePartnerUseCase,
            get_partner_by_external_id_use_case_1.GetPartnerByExternalIdUseCase,
            list_partners_use_case_1.ListPartnersUseCase,
            update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
            delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
            create_partner_orchestrator_use_case_1.CreatePartnerOrchestratorUseCase,
        ],
        exports: [
            partners_tokens_1.PARTNER_REPOSITORY,
            create_partner_use_case_1.CreatePartnerUseCase,
            get_partner_by_external_id_use_case_1.GetPartnerByExternalIdUseCase,
            list_partners_use_case_1.ListPartnersUseCase,
            update_partner_by_external_id_use_case_1.UpdatePartnerByExternalIdUseCase,
            delete_partner_by_external_id_use_case_1.DeletePartnerByExternalIdUseCase,
        ],
    })
], PartnersModule);
//# sourceMappingURL=partners.module.js.map