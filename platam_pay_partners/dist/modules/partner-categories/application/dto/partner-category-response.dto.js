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
exports.PartnerCategoryResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PartnerCategoryResponseDto {
    externalId;
    partnerId;
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
    statusId;
    createdAt;
    updatedAt;
}
exports.PartnerCategoryResponseDto = PartnerCategoryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "UUID publico de la categoria",
    }),
    __metadata("design:type", String)
], PartnerCategoryResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: "ID interno del partner propietario",
    }),
    __metadata("design:type", Number)
], PartnerCategoryResponseDto.prototype, "partnerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Electro" }),
    __metadata("design:type", String)
], PartnerCategoryResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0.1500" }),
    __metadata("design:type", String)
], PartnerCategoryResponseDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0.0200" }),
    __metadata("design:type", String)
], PartnerCategoryResponseDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0.0100", nullable: true }),
    __metadata("design:type", Object)
], PartnerCategoryResponseDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "25000", nullable: true }),
    __metadata("design:type", Object)
], PartnerCategoryResponseDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], PartnerCategoryResponseDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], PartnerCategoryResponseDto.prototype, "termDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PartnerCategoryResponseDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-02-19T14:25:00.000Z" }),
    __metadata("design:type", String)
], PartnerCategoryResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2026-02-19T14:25:00.000Z" }),
    __metadata("design:type", String)
], PartnerCategoryResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=partner-category-response.dto.js.map