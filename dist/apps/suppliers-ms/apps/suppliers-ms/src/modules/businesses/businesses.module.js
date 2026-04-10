"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessesModule = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const typeorm_business_repository_1 = require("../../infrastructure/database/repositories/typeorm-business.repository");
const businesses_tokens_1 = require("./businesses.tokens");
const create_business_use_case_1 = require("./application/use-cases/create-business/create-business.use-case");
const get_business_by_external_id_use_case_1 = require("./application/use-cases/get-business-by-external-id/get-business-by-external-id.use-case");
const list_businesses_use_case_1 = require("./application/use-cases/list-businesses/list-businesses.use-case");
const update_business_by_external_id_use_case_1 = require("./application/use-cases/update-business-by-external-id/update-business-by-external-id.use-case");
const delete_business_by_external_id_use_case_1 = require("./application/use-cases/delete-business-by-external-id/delete-business-by-external-id.use-case");
let BusinessesModule = class BusinessesModule {
};
exports.BusinessesModule = BusinessesModule;
exports.BusinessesModule = BusinessesModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            {
                provide: businesses_tokens_1.BUSINESS_REPOSITORY,
                useExisting: typeorm_business_repository_1.TypeormBusinessRepository,
            },
            create_business_use_case_1.CreateBusinessUseCase,
            get_business_by_external_id_use_case_1.GetBusinessByExternalIdUseCase,
            list_businesses_use_case_1.ListBusinessesUseCase,
            update_business_by_external_id_use_case_1.UpdateBusinessByExternalIdUseCase,
            delete_business_by_external_id_use_case_1.DeleteBusinessByExternalIdUseCase,
        ],
        exports: [
            businesses_tokens_1.BUSINESS_REPOSITORY,
            create_business_use_case_1.CreateBusinessUseCase,
            get_business_by_external_id_use_case_1.GetBusinessByExternalIdUseCase,
            list_businesses_use_case_1.ListBusinessesUseCase,
            update_business_by_external_id_use_case_1.UpdateBusinessByExternalIdUseCase,
            delete_business_by_external_id_use_case_1.DeleteBusinessByExternalIdUseCase,
        ],
    })
], BusinessesModule);
//# sourceMappingURL=businesses.module.js.map