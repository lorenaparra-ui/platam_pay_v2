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
exports.BusinessInformationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class BusinessInformationDto {
    businessName;
    businessType;
    businessCity;
    businessAddress;
    numberOfEmployees;
    numberOfLocations;
    seniority;
    flagshipM2;
    hasRent;
    rentAmount;
}
exports.BusinessInformationDto = BusinessInformationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mi Negocio SAS' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BusinessInformationDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'retail' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BusinessInformationDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bogotá' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BusinessInformationDto.prototype, "businessCity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Calle 1 # 2-3' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BusinessInformationDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BusinessInformationDto.prototype, "numberOfEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BusinessInformationDto.prototype, "numberOfLocations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1-3' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BusinessInformationDto.prototype, "seniority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 150, minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BusinessInformationDto.prototype, "flagshipM2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], BusinessInformationDto.prototype, "hasRent", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.hasRent === true),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BusinessInformationDto.prototype, "rentAmount", void 0);
//# sourceMappingURL=business-information.dto.js.map