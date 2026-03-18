"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_ENTITIES = exports.CreditApplicationEntity = exports.CategoryEntity = exports.CreditFacilityEntity = exports.PurchaseOrderEntity = exports.SupplierEntity = exports.PartnersEntity = exports.BusinessEntity = exports.StatusEntity = exports.SalesRepresentativeEntity = exports.ShareholderEntity = exports.BusinessSeniorityEntity = exports.OnboardingEntity = exports.CityEntity = exports.ContractSignerEntity = exports.DocumentTypeEntity = exports.PermissionEntity = exports.LegalRepresentativeEntity = exports.RolePermissionEntity = exports.GuarantorEntity = exports.PersonEntity = exports.UserEntity = exports.BaseExternalIdEntity = void 0;
/**
 * Barrel: entidades TypeORM compartidas (única fuente para migraciones y microservicios).
 */
var base_external_id_entity_1 = require("./entities/base-external-id.entity");
Object.defineProperty(exports, "BaseExternalIdEntity", { enumerable: true, get: function () { return base_external_id_entity_1.BaseExternalIdEntity; } });
var user_entity_1 = require("./entities/user.entity");
Object.defineProperty(exports, "UserEntity", { enumerable: true, get: function () { return user_entity_1.UserEntity; } });
var person_entity_1 = require("./entities/person.entity");
Object.defineProperty(exports, "PersonEntity", { enumerable: true, get: function () { return person_entity_1.PersonEntity; } });
var guarantor_entity_1 = require("./entities/guarantor.entity");
Object.defineProperty(exports, "GuarantorEntity", { enumerable: true, get: function () { return guarantor_entity_1.GuarantorEntity; } });
var role_permission_entity_1 = require("./entities/role-permission.entity");
Object.defineProperty(exports, "RolePermissionEntity", { enumerable: true, get: function () { return role_permission_entity_1.RolePermissionEntity; } });
var legal_representative_entity_1 = require("./entities/legal-representative.entity");
Object.defineProperty(exports, "LegalRepresentativeEntity", { enumerable: true, get: function () { return legal_representative_entity_1.LegalRepresentativeEntity; } });
var permission_entity_1 = require("./entities/permission.entity");
Object.defineProperty(exports, "PermissionEntity", { enumerable: true, get: function () { return permission_entity_1.PermissionEntity; } });
var document_type_entity_1 = require("./entities/document-type.entity");
Object.defineProperty(exports, "DocumentTypeEntity", { enumerable: true, get: function () { return document_type_entity_1.DocumentTypeEntity; } });
var contract_signer_entity_1 = require("./entities/contract-signer.entity");
Object.defineProperty(exports, "ContractSignerEntity", { enumerable: true, get: function () { return contract_signer_entity_1.ContractSignerEntity; } });
var city_entity_1 = require("./entities/city.entity");
Object.defineProperty(exports, "CityEntity", { enumerable: true, get: function () { return city_entity_1.CityEntity; } });
var onboarding_entity_1 = require("./entities/onboarding.entity");
Object.defineProperty(exports, "OnboardingEntity", { enumerable: true, get: function () { return onboarding_entity_1.OnboardingEntity; } });
var business_seniority_entity_1 = require("./entities/business-seniority.entity");
Object.defineProperty(exports, "BusinessSeniorityEntity", { enumerable: true, get: function () { return business_seniority_entity_1.BusinessSeniorityEntity; } });
var shareholder_entity_1 = require("./entities/shareholder.entity");
Object.defineProperty(exports, "ShareholderEntity", { enumerable: true, get: function () { return shareholder_entity_1.ShareholderEntity; } });
var sales_representative_entity_1 = require("./entities/sales-representative.entity");
Object.defineProperty(exports, "SalesRepresentativeEntity", { enumerable: true, get: function () { return sales_representative_entity_1.SalesRepresentativeEntity; } });
var status_entity_1 = require("./entities/status.entity");
Object.defineProperty(exports, "StatusEntity", { enumerable: true, get: function () { return status_entity_1.StatusEntity; } });
var business_entity_1 = require("./entities/business.entity");
Object.defineProperty(exports, "BusinessEntity", { enumerable: true, get: function () { return business_entity_1.BusinessEntity; } });
var partners_entity_1 = require("./entities/partners.entity");
Object.defineProperty(exports, "PartnersEntity", { enumerable: true, get: function () { return partners_entity_1.PartnersEntity; } });
var supplier_entity_1 = require("./entities/supplier.entity");
Object.defineProperty(exports, "SupplierEntity", { enumerable: true, get: function () { return supplier_entity_1.SupplierEntity; } });
var order_entity_1 = require("./entities/order.entity");
Object.defineProperty(exports, "PurchaseOrderEntity", { enumerable: true, get: function () { return order_entity_1.PurchaseOrderEntity; } });
var credit_facility_entity_1 = require("./entities/credit-facility.entity");
Object.defineProperty(exports, "CreditFacilityEntity", { enumerable: true, get: function () { return credit_facility_entity_1.CreditFacilityEntity; } });
var product_entity_1 = require("./entities/product.entity");
Object.defineProperty(exports, "CategoryEntity", { enumerable: true, get: function () { return product_entity_1.CategoryEntity; } });
var credit_application_entity_1 = require("./entities/credit-application.entity");
Object.defineProperty(exports, "CreditApplicationEntity", { enumerable: true, get: function () { return credit_application_entity_1.CreditApplicationEntity; } });
const user_entity_2 = require("./entities/user.entity");
const person_entity_2 = require("./entities/person.entity");
const guarantor_entity_2 = require("./entities/guarantor.entity");
const role_permission_entity_2 = require("./entities/role-permission.entity");
const legal_representative_entity_2 = require("./entities/legal-representative.entity");
const permission_entity_2 = require("./entities/permission.entity");
const document_type_entity_2 = require("./entities/document-type.entity");
const contract_signer_entity_2 = require("./entities/contract-signer.entity");
const city_entity_2 = require("./entities/city.entity");
const onboarding_entity_2 = require("./entities/onboarding.entity");
const business_seniority_entity_2 = require("./entities/business-seniority.entity");
const shareholder_entity_2 = require("./entities/shareholder.entity");
const sales_representative_entity_2 = require("./entities/sales-representative.entity");
const status_entity_2 = require("./entities/status.entity");
const business_entity_2 = require("./entities/business.entity");
const partners_entity_2 = require("./entities/partners.entity");
const supplier_entity_2 = require("./entities/supplier.entity");
const order_entity_2 = require("./entities/order.entity");
const credit_facility_entity_2 = require("./entities/credit-facility.entity");
const product_entity_2 = require("./entities/product.entity");
const credit_application_entity_2 = require("./entities/credit-application.entity");
/** Registro único para DataSource (migrations-runner) y TypeOrmModule.forRoot. */
exports.DATABASE_ENTITIES = [
    user_entity_2.UserEntity,
    person_entity_2.PersonEntity,
    guarantor_entity_2.GuarantorEntity,
    role_permission_entity_2.RolePermissionEntity,
    legal_representative_entity_2.LegalRepresentativeEntity,
    permission_entity_2.PermissionEntity,
    document_type_entity_2.DocumentTypeEntity,
    contract_signer_entity_2.ContractSignerEntity,
    city_entity_2.CityEntity,
    onboarding_entity_2.OnboardingEntity,
    business_seniority_entity_2.BusinessSeniorityEntity,
    shareholder_entity_2.ShareholderEntity,
    sales_representative_entity_2.SalesRepresentativeEntity,
    status_entity_2.StatusEntity,
    business_entity_2.BusinessEntity,
    partners_entity_2.PartnersEntity,
    supplier_entity_2.SupplierEntity,
    order_entity_2.PurchaseOrderEntity,
    credit_facility_entity_2.CreditFacilityEntity,
    product_entity_2.CategoryEntity,
    credit_application_entity_2.CreditApplicationEntity,
];
