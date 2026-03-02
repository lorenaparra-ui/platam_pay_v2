"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("./base-external-id.entity");
let BusinessEntity = class BusinessEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    userId;
    countryCode;
    cityId;
    entityType;
    businessName;
    businessAddress;
    businessType;
    relationshipToBusiness;
    legalName;
    tradeName;
    taxId;
    yearOfEstablishment;
};
exports.BusinessEntity = BusinessEntity;
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "bigint" }),
    __metadata("design:type", Number)
], BusinessEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "country_code", type: "varchar", length: 2, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "city_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "entity_type",
        type: "varchar",
        length: 10,
    }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "entityType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_name", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_address", type: "text", nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_type", type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "businessType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "relationship_to_business",
        type: "varchar",
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "legal_name", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "trade_name", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "tradeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tax_id", type: "varchar", length: 50, unique: true, nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "taxId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "year_of_establishment", type: "int", nullable: true }),
    __metadata("design:type", Object)
], BusinessEntity.prototype, "yearOfEstablishment", void 0);
exports.BusinessEntity = BusinessEntity = __decorate([
    (0, typeorm_1.Entity)("businesses")
], BusinessEntity);
//# sourceMappingURL=business.entity.js.map