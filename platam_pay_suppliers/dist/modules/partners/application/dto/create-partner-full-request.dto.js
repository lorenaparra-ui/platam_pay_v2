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
exports.CreatePartnerFullRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const category_dto_1 = require("./category.dto");
class CreatePartnerFullRequestDto {
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
}
exports.CreatePartnerFullRequestDto = CreatePartnerFullRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CO", maxLength: 10 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Partner Legal SAS" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Partner Trade" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "PDP", maxLength: 10 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "901548471" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "alias-partner" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "alias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1", description: "ID de ciudad" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2020 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1800),
    __metadata("design:type", Number)
], CreatePartnerFullRequestDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CC" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "123456789" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePartnerFullRequestDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 20 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerFullRequestDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [category_dto_1.PartnerCategoryDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => category_dto_1.PartnerCategoryDto),
    __metadata("design:type", Array)
], CreatePartnerFullRequestDto.prototype, "categories", void 0);
//# sourceMappingURL=create-partner-full-request.dto.js.map