"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersModule = void 0;
const common_1 = require("@nestjs/common");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const typeorm_supplier_repository_1 = require("../../infrastructure/database/repositories/typeorm-supplier.repository");
const suppliers_tokens_1 = require("./suppliers.tokens");
const create_supplier_use_case_1 = require("./application/use-cases/create-supplier/create-supplier.use-case");
const get_supplier_by_external_id_use_case_1 = require("./application/use-cases/get-supplier-by-external-id/get-supplier-by-external-id.use-case");
const list_suppliers_use_case_1 = require("./application/use-cases/list-suppliers/list-suppliers.use-case");
const update_supplier_by_external_id_use_case_1 = require("./application/use-cases/update-supplier-by-external-id/update-supplier-by-external-id.use-case");
const delete_supplier_by_external_id_use_case_1 = require("./application/use-cases/delete-supplier-by-external-id/delete-supplier-by-external-id.use-case");
let SuppliersModule = class SuppliersModule {
};
exports.SuppliersModule = SuppliersModule;
exports.SuppliersModule = SuppliersModule = __decorate([
    (0, common_1.Module)({
        imports: [infrastructure_module_1.InfrastructureModule],
        providers: [
            { provide: suppliers_tokens_1.SUPPLIER_REPOSITORY, useExisting: typeorm_supplier_repository_1.TypeormSupplierRepository },
            create_supplier_use_case_1.CreateSupplierUseCase,
            get_supplier_by_external_id_use_case_1.GetSupplierByExternalIdUseCase,
            list_suppliers_use_case_1.ListSuppliersUseCase,
            update_supplier_by_external_id_use_case_1.UpdateSupplierByExternalIdUseCase,
            delete_supplier_by_external_id_use_case_1.DeleteSupplierByExternalIdUseCase,
        ],
        exports: [
            suppliers_tokens_1.SUPPLIER_REPOSITORY,
            create_supplier_use_case_1.CreateSupplierUseCase,
            get_supplier_by_external_id_use_case_1.GetSupplierByExternalIdUseCase,
            list_suppliers_use_case_1.ListSuppliersUseCase,
            update_supplier_by_external_id_use_case_1.UpdateSupplierByExternalIdUseCase,
            delete_supplier_by_external_id_use_case_1.DeleteSupplierByExternalIdUseCase,
        ],
    })
], SuppliersModule);
//# sourceMappingURL=suppliers.module.js.map