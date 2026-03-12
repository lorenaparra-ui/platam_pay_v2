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
exports.CreditApplicationBnplEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("./base-external-id.entity");
let CreditApplicationBnplEntity = class CreditApplicationBnplEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    userId;
    userProductId;
    partnerId;
    partnerCategoryId;
    salesRepId;
    businessId;
    numberOfLocations;
    numberOfEmployees;
    businessSeniorityId;
    sectorExperience;
    businessFlagshipM2;
    businessHasRent;
    businessRentAmount;
    monthlyIncome;
    monthlyExpenses;
    monthlyPurchases;
    currentPurchases;
    totalAssets;
    requestedCreditLine;
    isCurrentClient;
    statusId;
    submissionDate;
    approvalDate;
    rejectionReason;
    creditStudyDate;
    creditScore;
    creditDecision;
    approvedCreditLine;
    analystReport;
    riskProfile;
    privacyPolicyAccepted;
    privacyPolicyDate;
};
exports.CreditApplicationBnplEntity = CreditApplicationBnplEntity;
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", type: "bigint" }),
    __metadata("design:type", Number)
], CreditApplicationBnplEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_product_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "userProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "partner_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "partner_category_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sales_rep_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "salesRepId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "businessId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "number_of_locations", type: "int", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "numberOfLocations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "number_of_employees", type: "int", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_seniority_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "businessSeniorityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "sector_experience", type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "sectorExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_flagship_m2", type: "int", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_has_rent", type: "boolean", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "businessHasRent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "business_rent_amount", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "businessRentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "monthly_income", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "monthlyIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "monthly_expenses", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "monthly_purchases", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "current_purchases", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "currentPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_assets", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "totalAssets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "requested_credit_line", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_current_client", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], CreditApplicationBnplEntity.prototype, "isCurrentClient", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "status_id",
        type: "bigint",
        nullable: false,
        insert: false,
    }),
    __metadata("design:type", Number)
], CreditApplicationBnplEntity.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "submission_date", type: "timestamptz", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "submissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "approval_date", type: "timestamptz", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rejection_reason", type: "varchar", length: 500, nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "credit_study_date", type: "timestamptz", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "creditStudyDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "credit_score", type: "decimal", precision: 8, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "creditScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "credit_decision", type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "creditDecision", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "approved_credit_line", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "analyst_report", type: "text", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "analystReport", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "risk_profile", type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "riskProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "privacy_policy_accepted", type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], CreditApplicationBnplEntity.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "privacy_policy_date", type: "timestamptz", nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplEntity.prototype, "privacyPolicyDate", void 0);
exports.CreditApplicationBnplEntity = CreditApplicationBnplEntity = __decorate([
    (0, typeorm_1.Entity)("credit_applications_bnpl")
], CreditApplicationBnplEntity);
//# sourceMappingURL=credit-application-bnpl.entity.js.map