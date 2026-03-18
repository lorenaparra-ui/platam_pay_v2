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
exports.OnboardingEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("./base-external-id.entity");
let OnboardingEntity = class OnboardingEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    userId;
    userProductId;
    partnerId;
    partnerCategoryId;
    salesRepId;
    businessName;
    businessRelationId;
    businessTypeName;
    businessTypeCode;
    businessAddress;
    businessCity;
    businessRentAmount;
    numberOfLocations;
    numberOfEmployees;
    businessSeniorityId;
    sectorExperience;
    relationshipToBusiness;
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
exports.OnboardingEntity = OnboardingEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'bigint' }),
    __metadata("design:type", Number)
], OnboardingEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_product_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "userProductId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'partner_category_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sales_rep_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "salesRepId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_name',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_relation_id',
        type: 'bigint',
        nullable: true,
        default: () => "get_status_id('credit_applications_bnpl', 'business_relation')",
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessRelationId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_type_name',
        type: 'varchar',
        length: 250,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessTypeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_type_code', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessTypeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_address', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'business_city',
        type: 'varchar',
        length: 120,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_rent_amount', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessRentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_of_locations', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "numberOfLocations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'number_of_employees', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'business_seniority_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "businessSeniorityId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sector_experience', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "sectorExperience", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'relationship_to_business', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_income', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "monthlyIncome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_expenses', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'monthly_purchases', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'current_purchases', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "currentPurchases", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_assets', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "totalAssets", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_credit_line', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_current_client', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OnboardingEntity.prototype, "isCurrentClient", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status_id',
        type: 'bigint',
        default: () => "get_status_id('credit_applications_bnpl', 'authorized')",
    }),
    __metadata("design:type", Number)
], OnboardingEntity.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'submission_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "submissionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approval_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "approvalDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rejection_reason',
        type: 'varchar',
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_study_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "creditStudyDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'credit_score',
        type: 'decimal',
        precision: 8,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "creditScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_decision', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "creditDecision", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'approved_credit_line', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'analyst_report', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "analystReport", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'risk_profile', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "riskProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy_accepted', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OnboardingEntity.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'privacy_policy_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], OnboardingEntity.prototype, "privacyPolicyDate", void 0);
exports.OnboardingEntity = OnboardingEntity = __decorate([
    (0, typeorm_1.Entity)('credit_applications_bnpl')
], OnboardingEntity);
