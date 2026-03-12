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
exports.CreditApplicationBnplResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreditApplicationBnplResponseDto {
    externalId;
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
    createdAt;
    updatedAt;
    static fromDomain(model) {
        const dto = new CreditApplicationBnplResponseDto();
        dto.externalId = model.externalId;
        dto.userId = model.userId;
        dto.userProductId = model.userProductId;
        dto.partnerId = model.partnerId;
        dto.partnerCategoryId = model.partnerCategoryId;
        dto.salesRepId = model.salesRepId;
        dto.businessId = model.businessId;
        dto.numberOfLocations = model.numberOfLocations;
        dto.numberOfEmployees = model.numberOfEmployees;
        dto.businessSeniorityId = model.businessSeniorityId;
        dto.sectorExperience = model.sectorExperience;
        dto.businessFlagshipM2 = model.businessFlagshipM2;
        dto.businessHasRent = model.businessHasRent;
        dto.businessRentAmount = model.businessRentAmount;
        dto.monthlyIncome = model.monthlyIncome;
        dto.monthlyExpenses = model.monthlyExpenses;
        dto.monthlyPurchases = model.monthlyPurchases;
        dto.currentPurchases = model.currentPurchases;
        dto.totalAssets = model.totalAssets;
        dto.requestedCreditLine = model.requestedCreditLine;
        dto.isCurrentClient = model.isCurrentClient;
        dto.statusId = model.statusId;
        dto.submissionDate = model.submissionDate?.toISOString() ?? null;
        dto.approvalDate = model.approvalDate?.toISOString() ?? null;
        dto.rejectionReason = model.rejectionReason;
        dto.creditStudyDate = model.creditStudyDate?.toISOString() ?? null;
        dto.creditScore = model.creditScore;
        dto.creditDecision = model.creditDecision;
        dto.approvedCreditLine = model.approvedCreditLine;
        dto.analystReport = model.analystReport;
        dto.riskProfile = model.riskProfile;
        dto.privacyPolicyAccepted = model.privacyPolicyAccepted;
        dto.privacyPolicyDate = model.privacyPolicyDate?.toISOString() ?? null;
        dto.createdAt = model.createdAt.toISOString();
        dto.updatedAt = model.updatedAt.toISOString();
        return dto;
    }
}
exports.CreditApplicationBnplResponseDto = CreditApplicationBnplResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreditApplicationBnplResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreditApplicationBnplResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "userProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "salesRepId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessSeniorityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreditApplicationBnplResponseDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreditApplicationBnplResponseDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CreditApplicationBnplResponseDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "privacyPolicyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreditApplicationBnplResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreditApplicationBnplResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=credit-application-bnpl-response.dto.js.map