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
exports.PartnerResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PartnerResponseDto {
    externalId;
    countryCode;
    companyName;
    tradeName;
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
    createdAt;
    updatedAt;
}
exports.PartnerResponseDto = PartnerResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "550e8400-e29b-41d4-a716-446655440000",
        description: "UUID publico del partner",
    }),
    __metadata("design:type", String)
], PartnerResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "PL",
        nullable: true,
        description: "Codigo de pais del partner",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "countryCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Partner Demo S.A.S",
        description: "Razon social del partner",
    }),
    __metadata("design:type", String)
], PartnerResponseDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Partner Demo",
        nullable: true,
        description: "Nombre comercial del partner",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "PDP",
        nullable: true,
        description: "Acronimo del partner",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://cdn.platam.com/partners/logo.png",
        nullable: true,
        description: "URL del logo principal",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://cdn.platam.com/partners/cobranding-logo.png",
        nullable: true,
        description: "URL del logo co-branding",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "#123456",
        nullable: true,
        description: "Color primario del partner",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "#654321",
        nullable: true,
        description: "Color secundario del partner",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "#f5f5f5",
        nullable: true,
        description: "Color claro del partner",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Sales Rep",
        nullable: true,
        description: "Nombre singular del rol de vendedores",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "salesRepRoleName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Sales Reps",
        nullable: true,
        description: "Nombre plural del rol de vendedores",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "salesRepRoleNamePlural", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ops@partner.com",
        nullable: true,
        description: "Email de notificaciones",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "https://partner.com/webhooks/platam",
        nullable: true,
        description: "URL de webhook",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: false,
        description: "Indica si envia voucher al sales rep",
    }),
    __metadata("design:type", Boolean)
], PartnerResponseDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "payouts@partner.com",
        nullable: true,
        description: "Email de notificacion de desembolso",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        nullable: true,
        description: "ID interno del representante por defecto",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "defaultRepId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 3,
        nullable: true,
        description: "ID interno de categoria por defecto",
    }),
    __metadata("design:type", Object)
], PartnerResponseDto.prototype, "defaultCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "ID interno de estado",
    }),
    __metadata("design:type", Number)
], PartnerResponseDto.prototype, "statusId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2026-02-19T14:25:00.000Z",
        description: "Fecha de creacion",
    }),
    __metadata("design:type", String)
], PartnerResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2026-02-19T14:25:00.000Z",
        description: "Fecha de actualizacion",
    }),
    __metadata("design:type", String)
], PartnerResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=partner-response.dto.js.map