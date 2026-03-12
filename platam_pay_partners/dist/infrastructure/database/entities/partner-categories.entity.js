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
exports.PartnerCategoriesEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("./base-external-id.entity");
let PartnerCategoriesEntity = class PartnerCategoriesEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    partnerId;
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
    statusId;
};
exports.PartnerCategoriesEntity = PartnerCategoriesEntity;
__decorate([
    (0, typeorm_1.Column)({ name: "partner_id", type: "bigint" }),
    __metadata("design:type", Number)
], PartnerCategoriesEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], PartnerCategoriesEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "discount_percentage",
        type: "decimal",
        precision: 5,
        scale: 4,
    }),
    __metadata("design:type", String)
], PartnerCategoriesEntity.prototype, "discountPercentage", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "interest_rate", type: "decimal", precision: 5, scale: 4 }),
    __metadata("design:type", String)
], PartnerCategoriesEntity.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "disbursement_fee_percent",
        type: "decimal",
        precision: 5,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnerCategoriesEntity.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "minimum_disbursement_fee", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], PartnerCategoriesEntity.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "delay_days", type: "int" }),
    __metadata("design:type", Number)
], PartnerCategoriesEntity.prototype, "delayDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "term_days", type: "int" }),
    __metadata("design:type", Number)
], PartnerCategoriesEntity.prototype, "termDays", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "status_id",
        type: "bigint",
        nullable: false,
        default: () => "get_status_id('partner_categories', 'active')",
    }),
    __metadata("design:type", Number)
], PartnerCategoriesEntity.prototype, "statusId", void 0);
exports.PartnerCategoriesEntity = PartnerCategoriesEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "partner_categories" })
], PartnerCategoriesEntity);
//# sourceMappingURL=partner-categories.entity.js.map