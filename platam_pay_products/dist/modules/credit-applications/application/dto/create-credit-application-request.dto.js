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
exports.CreateCreditApplicationRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCreditApplicationRequestDto {
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
}
exports.CreateCreditApplicationRequestDto = CreateCreditApplicationRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: "ID de la persona (titular de la solicitud)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "personId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3, description: "ID del partner" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: "ID de categoría del partner",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: "ID del negocio" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3, description: "Número de sucursales" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15, description: "Número de empleados" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "5-10",
        description: "Antigüedad del negocio",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "5+",
        description: "Experiencia en el sector",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120, description: "M² local bandera" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: "¿Tiene alquiler?" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 500000,
        description: "Monto alquiler (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 2000000,
        description: "Ingresos mensuales (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 800000,
        description: "Gastos mensuales (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1500000,
        description: "Compras mensuales (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 300000,
        description: "Compras actuales (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10000000,
        description: "Activos totales (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 5000000,
        description: "Línea de crédito solicitada (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: "¿Es cliente actual?" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCreditApplicationRequestDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "ID de estado" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCreditApplicationRequestDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Fecha de envío" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Fecha de aprobación" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Documentación incompleta", maxLength: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Fecha de estudio de crédito" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 750.5, description: "Puntaje de crédito" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "APPROVED",
        description: "Decisión de crédito",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 4000000,
        description: "Línea aprobada (centavos)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Informe del analista" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "MEDIUM", description: "Perfil de riesgo" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: "Política de privacidad aceptada",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCreditApplicationRequestDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fecha de aceptación de política de privacidad",
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationRequestDto.prototype, "privacyPolicyDate", void 0);
//# sourceMappingURL=create-credit-application-request.dto.js.map