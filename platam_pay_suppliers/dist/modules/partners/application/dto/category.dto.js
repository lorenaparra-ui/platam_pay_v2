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
exports.PartnerCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PartnerCategoryDto {
    name;
    termDays;
    delayDays;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
}
exports.PartnerCategoryDto = PartnerCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Standard", maxLength: 255 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], PartnerCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, description: "Días de plazo" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PartnerCategoryDto.prototype, "termDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: "Días de demora para desembolso" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.5, description: "Porcentaje de descuento" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], PartnerCategoryDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.5, description: "Tasa de interés" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.5, description: "Porcentaje de comisión de desembolso" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: "Comisión mínima de desembolso" }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryDto.prototype, "minimumDisbursementFee", void 0);
//# sourceMappingURL=category.dto.js.map