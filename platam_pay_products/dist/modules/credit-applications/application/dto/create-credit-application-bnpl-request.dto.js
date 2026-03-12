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
exports.CreateCreditApplicationBnplRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCreditApplicationBnplRequestDto {
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
}
exports.CreateCreditApplicationBnplRequestDto = CreateCreditApplicationBnplRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID del usuario' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCreditApplicationBnplRequestDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, description: 'ID del producto de usuario' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "userProductId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3, description: 'ID del partner' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'ID de categoría del partner' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "partnerCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'ID del representante de ventas' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "salesRepId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: 'ID del negocio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3, description: 'Número de sucursales' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15, description: 'Número de empleados' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5-10', description: 'Antigüedad del negocio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "businessSeniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '5+', description: 'Experiencia en el sector' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "sectorExperience", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 120, description: 'M² local bandera' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "businessFlagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: '¿Tiene alquiler?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "businessHasRent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 500000, description: 'Monto alquiler (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "businessRentAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000000, description: 'Ingresos mensuales (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "monthlyIncome", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 800000, description: 'Gastos mensuales (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "monthlyExpenses", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1500000, description: 'Compras mensuales (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "monthlyPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 300000, description: 'Compras actuales (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "currentPurchases", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10000000, description: 'Activos totales (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "totalAssets", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000000, description: 'Línea de crédito solicitada (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "requestedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: '¿Es cliente actual?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCreditApplicationBnplRequestDto.prototype, "isCurrentClient", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID de estado' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCreditApplicationBnplRequestDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de envío' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "submissionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de aprobación' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "approvalDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Documentación incompleta', maxLength: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de estudio de crédito' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "creditStudyDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 750.5, description: 'Puntaje de crédito' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "creditScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'APPROVED', description: 'Decisión de crédito' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "creditDecision", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 4000000, description: 'Línea aprobada (centavos)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "approvedCreditLine", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Informe del analista' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "analystReport", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'MEDIUM', description: 'Perfil de riesgo' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "riskProfile", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Política de privacidad aceptada' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCreditApplicationBnplRequestDto.prototype, "privacyPolicyAccepted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Fecha de aceptación de política de privacidad' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCreditApplicationBnplRequestDto.prototype, "privacyPolicyDate", void 0);
//# sourceMappingURL=create-credit-application-bnpl-request.dto.js.map