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
exports.PartnerPublicCamelResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PartnerPublicCamelResponseDto {
    externalId;
    supplierExternalId;
    acronym;
    logoUrl;
    coBrandingLogoUrl;
    primaryColor;
    secondaryColor;
    lightColor;
    notificationEmail;
    webhookUrl;
    sendSalesRepVoucher;
    disbursementNotificationEmail;
    state;
    createdAt;
    updatedAt;
    static from(fields) {
        const d = new PartnerPublicCamelResponseDto();
        d.externalId = fields.external_id;
        d.supplierExternalId = fields.supplier_external_id;
        d.acronym = fields.acronym;
        d.logoUrl = fields.logo_url;
        d.coBrandingLogoUrl = fields.co_branding_logo_url;
        d.primaryColor = fields.primary_color;
        d.secondaryColor = fields.secondary_color;
        d.lightColor = fields.light_color;
        d.notificationEmail = fields.notification_email;
        d.webhookUrl = fields.webhook_url;
        d.sendSalesRepVoucher = fields.send_sales_rep_voucher;
        d.disbursementNotificationEmail = fields.disbursement_notification_email;
        d.state = fields.state;
        d.createdAt = fields.created_at;
        d.updatedAt = fields.updated_at;
        return d;
    }
}
exports.PartnerPublicCamelResponseDto = PartnerPublicCamelResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], PartnerPublicCamelResponseDto.prototype, "externalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], PartnerPublicCamelResponseDto.prototype, "supplierExternalId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PartnerPublicCamelResponseDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PartnerPublicCamelResponseDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PartnerPublicCamelResponseDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], PartnerPublicCamelResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'date-time' }),
    __metadata("design:type", Date)
], PartnerPublicCamelResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=partner-public-camel-response.dto.js.map