"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersDataModule = exports.SUPPLIERS_DATA_ENTITIES = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bank_account_entity_1 = require("./entities/bank-account.entity");
const business_entity_1 = require("./entities/business.entity");
const business_seniority_entity_1 = require("./entities/business-seniority.entity");
const legal_representative_entity_1 = require("./entities/legal-representative.entity");
const partners_entity_1 = require("./entities/partners.entity");
const order_entity_1 = require("./entities/order.entity");
const sales_representative_entity_1 = require("./entities/sales-representative.entity");
const shareholder_entity_1 = require("./entities/shareholder.entity");
const supplier_entity_1 = require("./entities/supplier.entity");
const partner_onboarding_saga_entity_1 = require("./entities/partner-onboarding-saga.entity");
const suppliers_data_service_1 = require("./suppliers-data.service");
exports.SUPPLIERS_DATA_ENTITIES = [
    bank_account_entity_1.BankAccountEntity,
    business_entity_1.BusinessEntity,
    business_seniority_entity_1.BusinessSeniorityEntity,
    legal_representative_entity_1.LegalRepresentativeEntity,
    partners_entity_1.PartnersEntity,
    partner_onboarding_saga_entity_1.PartnerOnboardingSagaEntity,
    order_entity_1.PurchaseOrderEntity,
    sales_representative_entity_1.SalesRepresentativeEntity,
    shareholder_entity_1.ShareholderEntity,
    supplier_entity_1.SupplierEntity,
];
let SuppliersDataModule = class SuppliersDataModule {
};
exports.SuppliersDataModule = SuppliersDataModule;
exports.SuppliersDataModule = SuppliersDataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...exports.SUPPLIERS_DATA_ENTITIES])],
        providers: [suppliers_data_service_1.SuppliersDataService],
        exports: [typeorm_1.TypeOrmModule, suppliers_data_service_1.SuppliersDataService],
    })
], SuppliersDataModule);
//# sourceMappingURL=suppliers-data.module.js.map