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
exports.CreateCategoryRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCategoryRequestDto {
    credit_facility_id;
    partner_id;
    name;
    delay_days;
    disbursement_fee_percent;
    discount_percentage;
    interest_rate;
    minimum_disbursement_fee;
    term_days;
    status_id;
}
exports.CreateCategoryRequestDto = CreateCategoryRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "ID interno de la línea de crédito" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCategoryRequestDto.prototype, "credit_facility_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, description: "ID de partner (opcional)" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Object)
], CreateCategoryRequestDto.prototype, "partner_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Retail estándar", maxLength: 255 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateCategoryRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: "Días de gracia" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCategoryRequestDto.prototype, "delay_days", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "0.0150",
        description: "Comisión desembolso (decimal como string)",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Object)
], CreateCategoryRequestDto.prototype, "disbursement_fee_percent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0.0500", description: "Descuento (decimal string)" }),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateCategoryRequestDto.prototype, "discount_percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0.0200", description: "Tasa (decimal string)" }),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", String)
], CreateCategoryRequestDto.prototype, "interest_rate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "10000.0000",
        description: "Comisión mínima desembolso",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)(),
    __metadata("design:type", Object)
], CreateCategoryRequestDto.prototype, "minimum_disbursement_fee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30, description: "Plazo en días" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCategoryRequestDto.prototype, "term_days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: "ID de estado" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCategoryRequestDto.prototype, "status_id", void 0);
//# sourceMappingURL=create-category-request.dto.js.map