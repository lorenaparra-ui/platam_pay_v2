"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRepresentativesModule = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const typeorm_sales_representative_repository_1 = require("../../infrastructure/database/repositories/typeorm-sales-representative.repository");
const sales_representatives_tokens_1 = require("./sales-representatives.tokens");
const create_sales_representative_use_case_1 = require("./application/use-cases/create-sales-representative/create-sales-representative.use-case");
const get_sales_representative_by_external_id_use_case_1 = require("./application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case");
const list_sales_representatives_use_case_1 = require("./application/use-cases/list-sales-representatives/list-sales-representatives.use-case");
const update_sales_representative_by_external_id_use_case_1 = require("./application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case");
const delete_sales_representative_by_external_id_use_case_1 = require("./application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case");
const sales_representatives_controller_1 = require("./presentation/sales-representatives.controller");
let SalesRepresentativesModule = class SalesRepresentativesModule {
};
exports.SalesRepresentativesModule = SalesRepresentativesModule;
exports.SalesRepresentativesModule = SalesRepresentativesModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        controllers: [sales_representatives_controller_1.SalesRepresentativesController],
        providers: [
            {
                provide: sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY,
                useExisting: typeorm_sales_representative_repository_1.TypeormSalesRepresentativeRepository,
            },
            create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase,
            get_sales_representative_by_external_id_use_case_1.GetSalesRepresentativeByExternalIdUseCase,
            list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase,
            update_sales_representative_by_external_id_use_case_1.UpdateSalesRepresentativeByExternalIdUseCase,
            delete_sales_representative_by_external_id_use_case_1.DeleteSalesRepresentativeByExternalIdUseCase,
        ],
        exports: [
            sales_representatives_tokens_1.SALES_REPRESENTATIVE_REPOSITORY,
            create_sales_representative_use_case_1.CreateSalesRepresentativeUseCase,
            get_sales_representative_by_external_id_use_case_1.GetSalesRepresentativeByExternalIdUseCase,
            list_sales_representatives_use_case_1.ListSalesRepresentativesUseCase,
            update_sales_representative_by_external_id_use_case_1.UpdateSalesRepresentativeByExternalIdUseCase,
            delete_sales_representative_by_external_id_use_case_1.DeleteSalesRepresentativeByExternalIdUseCase,
        ],
    })
], SalesRepresentativesModule);
//# sourceMappingURL=sales-representatives.module.js.map