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
exports.CreateOnboardingRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateOnboardingRequestDto {
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
exports.CreateOnboardingRequestDto = CreateOnboardingRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador interno del usuario' }),
    __metadata("design:type", Number)
], CreateOnboardingRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "userProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "salesRepId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessRelationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessTypeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessTypeCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "businessSeniorityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true, required: false }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    __metadata("design:type", Boolean)
], CreateOnboardingRequestDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], CreateOnboardingRequestDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, default: false }),
    __metadata("design:type", Boolean)
], CreateOnboardingRequestDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, nullable: true }),
    __metadata("design:type", Object)
], CreateOnboardingRequestDto.prototype, "privacyPolicyDate", void 0);
//# sourceMappingURL=create-onboarding-request.dto.js.map