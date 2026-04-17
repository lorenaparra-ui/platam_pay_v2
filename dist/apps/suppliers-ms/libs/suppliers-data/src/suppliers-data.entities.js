"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPLIERS_DATA_ENTITIES = void 0;
const bank_account_entity_1 = require("./entities/bank-account.entity");
const business_entity_1 = require("./entities/business.entity");
const business_seniority_entity_1 = require("./entities/business-seniority.entity");
const legal_representative_entity_1 = require("./entities/legal-representative.entity");
const partner_entity_1 = require("./entities/partner.entity");
const order_entity_1 = require("./entities/order.entity");
const sales_representative_entity_1 = require("./entities/sales-representative.entity");
const shareholder_entity_1 = require("./entities/shareholder.entity");
const supplier_entity_1 = require("./entities/supplier.entity");
const partner_onboarding_saga_entity_1 = require("./entities/partner-onboarding-saga.entity");
exports.SUPPLIERS_DATA_ENTITIES = [
    bank_account_entity_1.BankAccountEntity,
    business_entity_1.BusinessEntity,
    business_seniority_entity_1.BusinessSeniorityEntity,
    legal_representative_entity_1.LegalRepresentativeEntity,
    partner_entity_1.PartnerEntity,
    partner_onboarding_saga_entity_1.PartnerOnboardingSagaEntity,
    order_entity_1.PurchaseOrderEntity,
    sales_representative_entity_1.SalesRepresentativeEntity,
    shareholder_entity_1.ShareholderEntity,
    supplier_entity_1.SupplierEntity,
];
//# sourceMappingURL=suppliers-data.entities.js.map