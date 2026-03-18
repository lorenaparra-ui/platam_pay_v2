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
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("@libs/database");
const database_2 = require("@libs/database");
const typeorm_supplier_repository_1 = require("../../infrastructure/database/repositories/typeorm-supplier.repository");
const typeorm_purchase_order_repository_1 = require("../../infrastructure/database/repositories/typeorm-purchase-order.repository");
const supplier_repository_port_1 = require("./domain/ports/supplier.repository.port");
const purchase_order_repository_port_1 = require("./domain/ports/purchase-order.repository.port");
const suppliers_controller_1 = require("./presentation/suppliers.controller");
const create_supplier_use_case_1 = require("./application/use-cases/create-supplier.use-case");
const find_supplier_by_business_id_use_case_1 = require("./application/use-cases/find-supplier-by-business-id.use-case");
const create_purchase_order_use_case_1 = require("./application/use-cases/create-purchase-order.use-case");
let SuppliersModule = class SuppliersModule {
};
exports.SuppliersModule = SuppliersModule;
exports.SuppliersModule = SuppliersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([database_1.SupplierEntity, database_2.PurchaseOrderEntity]),
        ],
        controllers: [suppliers_controller_1.SuppliersController],
        providers: [
            {
                provide: supplier_repository_port_1.SUPPLIER_REPOSITORY,
                useClass: typeorm_supplier_repository_1.TypeOrmSupplierRepository,
            },
            {
                provide: purchase_order_repository_port_1.PURCHASE_ORDER_REPOSITORY,
                useClass: typeorm_purchase_order_repository_1.TypeOrmPurchaseOrderRepository,
            },
            create_supplier_use_case_1.CreateSupplierUseCase,
            find_supplier_by_business_id_use_case_1.FindSupplierByBusinessIdUseCase,
            create_purchase_order_use_case_1.CreatePurchaseOrderUseCase,
        ],
        exports: [
            supplier_repository_port_1.SUPPLIER_REPOSITORY,
            purchase_order_repository_port_1.PURCHASE_ORDER_REPOSITORY,
            create_supplier_use_case_1.CreateSupplierUseCase,
            find_supplier_by_business_id_use_case_1.FindSupplierByBusinessIdUseCase,
            create_purchase_order_use_case_1.CreatePurchaseOrderUseCase,
        ],
    })
], SuppliersModule);
//# sourceMappingURL=suppliers.module.js.map