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
exports.RegisterPartnerRequestDto = exports.RegisterPartnerCategoryItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function toNumber(value) {
    if (typeof value === "number" && !Number.isNaN(value))
        return value;
    if (typeof value === "string") {
        const n = Number(value);
        return Number.isNaN(n) ? undefined : n;
    }
    return undefined;
}
class RegisterPartnerCategoryItemDto {
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
}
exports.RegisterPartnerCategoryItemDto = RegisterPartnerCategoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Electro", maxLength: 100 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterPartnerCategoryItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0.1500" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], RegisterPartnerCategoryItemDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "0.0200" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], RegisterPartnerCategoryItemDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], RegisterPartnerCategoryItemDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d+$/),
    __metadata("design:type", String)
], RegisterPartnerCategoryItemDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RegisterPartnerCategoryItemDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RegisterPartnerCategoryItemDto.prototype, "termDays", void 0);
class RegisterPartnerRequestDto {
    countryCode;
    legalName;
    tradeName;
    acronym;
    taxId;
    alias;
    cityId;
    businessAddress;
    yearOfEstablishment;
    firstName;
    lastName;
    documentType;
    documentNumber;
    email;
    phone;
    notificationEmail;
    webhookUrl;
    disbursementNotificationEmail;
    sendSalesRepVoucher;
    primaryColor;
    secondaryColor;
    lightColor;
    categories;
    defaultCategoryIndex;
}
exports.RegisterPartnerRequestDto = RegisterPartnerRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CO", description: "Código de país" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mi Empresa SAS" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Mi Marca" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "PDP", maxLength: 10 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "901548471" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "alias-comercial" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "alias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "ID de ciudad" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Calle 123 #45-67" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2020 }),
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1800),
    __metadata("design:type", Number)
], RegisterPartnerRequestDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Juan" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Pérez" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CC" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123456789" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "user@partner.com" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+573001112233" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "ops@partner.com" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://partner.com/webhooks/platam" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "payouts@partner.com" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RegisterPartnerRequestDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "#123456", maxLength: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "#654321", maxLength: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "#f5f5f5", maxLength: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], RegisterPartnerRequestDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [RegisterPartnerCategoryItemDto],
        description: "Categorías del partner",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RegisterPartnerCategoryItemDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], RegisterPartnerRequestDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 0,
        description: "Índice de la categoría por defecto",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RegisterPartnerRequestDto.prototype, "defaultCategoryIndex", void 0);
//# sourceMappingURL=register-partner-request.dto.js.map