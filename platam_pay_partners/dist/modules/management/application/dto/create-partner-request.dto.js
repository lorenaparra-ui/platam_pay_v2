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
exports.CreatePartnerRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreatePartnerInlineCategoryRequestDto {
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
}
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Electro",
        description: "Nombre de la categoria",
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreatePartnerInlineCategoryRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "0.1500",
        description: "Porcentaje de descuento en formato decimal",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], CreatePartnerInlineCategoryRequestDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "0.0200",
        description: "Tasa de interes en formato decimal",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], CreatePartnerInlineCategoryRequestDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "0.0100",
        description: "Comision de desembolso en formato decimal",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d{1,2}(\.\d{1,4})?$/),
    __metadata("design:type", String)
], CreatePartnerInlineCategoryRequestDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "25000",
        description: "Comision minima de desembolso en centavos o unidad menor",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\d+$/),
    __metadata("design:type", String)
], CreatePartnerInlineCategoryRequestDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        description: "Dias de retraso (> 0)",
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePartnerInlineCategoryRequestDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 30,
        description: "Plazo en dias (> 0)",
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePartnerInlineCategoryRequestDto.prototype, "termDays", void 0);
class CreatePartnerRequestDto {
    businessId;
    acronym;
    logoUrl;
    coBrandingLogoUrl;
    primaryColor;
    secondaryColor;
    lightColor;
    salesRepRoleName;
    salesRepRoleNamePlural;
    notificationEmail;
    webhookUrl;
    sendSalesRepVoucher;
    disbursementNotificationEmail;
    defaultRepId;
    defaultCategoryId;
    statusId;
    categories;
    defaultCategoryIndex;
}
exports.CreatePartnerRequestDto = CreatePartnerRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 42,
        description: "ID interno del negocio asociado",
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePartnerRequestDto.prototype, "businessId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "PDP",
        description: "Acronimo del partner",
        maxLength: 10,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "https://cdn.platam.com/partners/logo.png",
        description: "URL del logo principal",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "https://cdn.platam.com/partners/cobranding-logo.png",
        description: "URL del logo co-branding",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "#123456",
        description: "Color primario del partner",
        maxLength: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "#654321",
        description: "Color secundario del partner",
        maxLength: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "#f5f5f5",
        description: "Color claro del partner",
        maxLength: 20,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Sales Rep",
        description: "Nombre del rol singular para vendedores",
        maxLength: 50,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "salesRepRoleName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "Sales Reps",
        description: "Nombre del rol plural para vendedores",
        maxLength: 50,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "salesRepRoleNamePlural", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "ops@partner.com",
        description: "Email de notificaciones",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "https://partner.com/webhooks/platam",
        description: "URL de webhook del partner",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        description: "Indica si se envia voucher al sales rep",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePartnerRequestDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "payouts@partner.com",
        description: "Email para notificaciones de desembolso",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePartnerRequestDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 10,
        description: "ID interno del representante por defecto",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePartnerRequestDto.prototype, "defaultRepId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: "ID interno de categoria por defecto",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePartnerRequestDto.prototype, "defaultCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: "ID interno de estado",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePartnerRequestDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [CreatePartnerInlineCategoryRequestDto],
        description: "Categorias a crear en el mismo flujo del partner",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreatePartnerInlineCategoryRequestDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreatePartnerRequestDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 0,
        description: "Indice de la categoria enviada en categories que se marcara como predeterminada",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePartnerRequestDto.prototype, "defaultCategoryIndex", void 0);
//# sourceMappingURL=create-partner-request.dto.js.map