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
exports.PartnersEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("./base-external-id.entity");
let PartnersEntity = class PartnersEntity extends base_external_id_entity_1.BaseExternalIdEntity {
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
    apiKeyHash;
    notificationEmail;
    webhookUrl;
    sendSalesRepVoucher;
    disbursementNotificationEmail;
    defaultRepId;
    defaultCategoryId;
    statusId;
};
exports.PartnersEntity = PartnersEntity;
__decorate([
    (0, typeorm_1.Column)({ name: "country_code", type: "varchar", length: 2, nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "company_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], PartnersEntity.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "trade_name", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "tradeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "acronym", type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "acronym", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "logo_url", type: "text", nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "co_branding_logo_url", type: "text", nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "primary_color",
        type: "varchar",
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "primaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "secondary_color",
        type: "varchar",
        length: 20,
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "secondaryColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "light_color", type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "lightColor", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "sales_rep_role_name",
        type: "varchar",
        length: 50,
        default: "Sales Rep",
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "salesRepRoleName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "sales_rep_role_name_plural",
        type: "varchar",
        length: 50,
        default: "Sales Reps",
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "salesRepRoleNamePlural", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "api_key_hash", type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "apiKeyHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "notification_email", type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "notificationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "webhook_url", type: "text", nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "webhookUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "send_sales_rep_voucher",
        type: "boolean",
        default: false,
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], PartnersEntity.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "disbursement_notification_email",
        type: "varchar",
        nullable: true,
    }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "default_rep_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "defaultRepId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "default_category_id", type: "bigint", nullable: true }),
    __metadata("design:type", Object)
], PartnersEntity.prototype, "defaultCategoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "status_id",
        type: "bigint",
        nullable: false,
        default: () => "get_status_id('partners', 'active')",
    }),
    __metadata("design:type", Number)
], PartnersEntity.prototype, "statusId", void 0);
exports.PartnersEntity = PartnersEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "partners" })
], PartnersEntity);
//# sourceMappingURL=partners.entity.js.map