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
exports.CreatePartnerCategoryRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePartnerCategoryRequestDto {
    partnerExternalId;
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
    statusId;
}
exports.CreatePartnerCategoryRequestDto = CreatePartnerCategoryRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "UUID publico del partner propietario de la categoria",
    }),
    (0, class_validator_1.IsUUID)("4"),
    __metadata("design:type", String)
], CreatePartnerCategoryRequestDto.prototype, "partnerExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Electro",
        description: "Nombre de la categoria",
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePartnerCategoryRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "0.1500",
        description: "Porcentaje de descuento en formato decimal",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], CreatePartnerCategoryRequestDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "0.0200",
        description: "Tasa de interes en formato decimal",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], CreatePartnerCategoryRequestDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "0.0100",
        description: "Comision de desembolso en formato decimal",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], CreatePartnerCategoryRequestDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "25000",
        description: "Comision minima de desembolso en centavos o unidad menor",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d+$/),
    __metadata("design:type", String)
], CreatePartnerCategoryRequestDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: "Dias de retraso (> 0)",
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePartnerCategoryRequestDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: "Plazo en dias",
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePartnerCategoryRequestDto.prototype, "termDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 4,
        description: "ID interno de estado para partner_categories",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePartnerCategoryRequestDto.prototype, "statusId", void 0);
//# sourceMappingURL=create-partner-category-request.dto.js.map