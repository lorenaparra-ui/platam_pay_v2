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
exports.CreditApplicationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreditApplicationResponseDto {
    externalId;
    personId;
    partnerId;
    partnerCategoryId;
    businessId;
    numberOfLocations;
    numberOfEmployees;
    businessSeniority;
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
}
exports.CreditApplicationResponseDto = CreditApplicationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "UUID público de la solicitud",
    }),
    __metadata("design:type", String)
], CreditApplicationResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: "ID de la persona (titular)",
    }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3, description: "ID del partner" }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: "ID de categoría del partner",
    }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: "ID del negocio" }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "5-10" }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "5+" }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 800000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1500000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 300000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10000000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CreditApplicationResponseDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CreditApplicationResponseDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Documentación incompleta" }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 750.5 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "APPROVED" }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 4000000 }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "MEDIUM" }),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CreditApplicationResponseDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationResponseDto.prototype, "privacyPolicyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-02-27T12:00:00.000Z" }),
    __metadata("design:type", String)
], CreditApplicationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-02-27T12:00:00.000Z" }),
    __metadata("design:type", String)
], CreditApplicationResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=credit-application-response.dto.js.map