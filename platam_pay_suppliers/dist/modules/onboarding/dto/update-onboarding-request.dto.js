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
exports.UpdateOnboardingRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateOnboardingRequestDto {
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
}
exports.UpdateOnboardingRequestDto = UpdateOnboardingRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UpdateOnboardingRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "userProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "salesRepId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessRelationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessTypeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessTypeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "businessSeniorityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], UpdateOnboardingRequestDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UpdateOnboardingRequestDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], UpdateOnboardingRequestDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], UpdateOnboardingRequestDto.prototype, "privacyPolicyDate", void 0);
//# sourceMappingURL=update-onboarding-request.dto.js.map