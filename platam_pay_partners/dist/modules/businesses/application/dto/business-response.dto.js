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
exports.BusinessResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BusinessResponseDto {
    externalId;
    userId;
    cityId;
    entityType;
    businessName;
    businessAddress;
    businessType;
    relationshipToBusiness;
    legalName;
    tradeName;
    taxId;
    yearOfEstablishment;
    createdAt;
    updatedAt;
    static fromDomain(model) {
        const dto = new BusinessResponseDto();
        dto.externalId = model.externalId;
        dto.userId = model.userId;
        dto.cityId = model.cityId;
        dto.entityType = model.entityType;
        dto.businessName = model.businessName;
        dto.businessAddress = model.businessAddress;
        dto.businessType = model.businessType;
        dto.relationshipToBusiness = model.relationshipToBusiness;
        dto.legalName = model.legalName;
        dto.tradeName = model.tradeName;
        dto.taxId = model.taxId;
        dto.yearOfEstablishment = model.yearOfEstablishment;
        dto.createdAt = model.createdAt.toISOString();
        dto.updatedAt = model.updatedAt.toISOString();
        return dto;
    }
}
exports.BusinessResponseDto = BusinessResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'UUID público del negocio' }),
    __metadata("design:type", String)
], BusinessResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID del usuario asociado' }),
    __metadata("design:type", Number)
], BusinessResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, nullable: true, description: 'ID de la ciudad' }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PJ', enum: ['PN', 'PJ'] }),
    __metadata("design:type", String)
], BusinessResponseDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "relationshipToBusiness", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], BusinessResponseDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BusinessResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BusinessResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=business-response.dto.js.map