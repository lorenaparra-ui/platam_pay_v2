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
exports.CreditApplicationBnplResponseDto = CreditApplicationBnplResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '550e8400-e29b-41d4-a716-446655440000',
        description: 'UUID público de la solicitud',
    }),
    __metadata("design:type", String)
], CreditApplicationBnplResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID del usuario' }),
    __metadata("design:type", Number)
], CreditApplicationBnplResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, description: 'ID del producto de usuario' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "userProductId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3, description: 'ID del partner' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'ID de categoría del partner' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'ID del representante de ventas' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "salesRepId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: 'ID del negocio' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5-10' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5+' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 800000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1500000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 300000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10000000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CreditApplicationBnplResponseDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], CreditApplicationBnplResponseDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Documentación incompleta' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 750.5 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'APPROVED' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 4000000 }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MEDIUM' }),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CreditApplicationBnplResponseDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Object)
], CreditApplicationBnplResponseDto.prototype, "privacyPolicyDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-27T12:00:00.000Z' }),
    __metadata("design:type", String)
], CreditApplicationBnplResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-27T12:00:00.000Z' }),
    __metadata("design:type", String)
], CreditApplicationBnplResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=credit-application-bnpl-response.dto.js.map