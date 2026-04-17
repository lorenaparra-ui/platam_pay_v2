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
exports.UpdatePartnerPayloadDto = exports.UpdateCreditFacilityPayloadDto = exports.UpdateBankAccountPayloadDto = exports.UpdatePartnerSectionPayloadDto = exports.UpdateBusinessPayloadDto = exports.UpdateLegalRepresentativePayloadDto = exports.UpdateOperatingUserPayloadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const shared_1 = require("../../../../../../../libs/shared/src");
const create_partner_payload_dto_1 = require("./create-partner-payload.dto");
class UpdateOperatingUserPayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.UpdateOperatingUserPayloadDto = UpdateOperatingUserPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto (mismo criterio que POST).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], UpdateOperatingUserPayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateOperatingUserPayloadDto.prototype, "email", void 0);
class UpdateLegalRepresentativePayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.UpdateLegalRepresentativePayloadDto = UpdateLegalRepresentativePayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], UpdateLegalRepresentativePayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateLegalRepresentativePayloadDto.prototype, "email", void 0);
class UpdateBusinessPayloadDto {
    cityId;
    entityType;
    businessName;
    businessAddress;
    businessType;
    legalName;
    tradeName;
    taxId;
    yearOfEstablishment;
    legalRepresentative;
}
exports.UpdateBusinessPayloadDto = UpdateBusinessPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'UUID v4 ciudad (catálogo transversal). Parcial: solo si se actualiza ciudad.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBusinessPayloadDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: UpdateLegalRepresentativePayloadDto,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateLegalRepresentativePayloadDto),
    __metadata("design:type", Object)
], UpdateBusinessPayloadDto.prototype, "legalRepresentative", void 0);
class UpdatePartnerSectionPayloadDto {
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
}
exports.UpdatePartnerSectionPayloadDto = UpdatePartnerSectionPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Si se envía archivo `logo`, el archivo tiene prioridad sobre esta URL.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Si se envía archivo coBranding, el archivo tiene prioridad sobre esta URL.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePartnerSectionPayloadDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], UpdatePartnerSectionPayloadDto.prototype, "disbursementNotificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: shared_1.PartnerState,
        description: 'Estado operativo del partner (`active` | `inactive`).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)([shared_1.PartnerState.ACTIVE, shared_1.PartnerState.INACTIVE]),
    __metadata("design:type", String)
], UpdatePartnerSectionPayloadDto.prototype, "state", void 0);
class UpdateBankAccountPayloadDto {
    bankEntity;
    accountNumber;
}
exports.UpdateBankAccountPayloadDto = UpdateBankAccountPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBankAccountPayloadDto.prototype, "bankEntity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cuenta como string (mismo criterio que POST).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], UpdateBankAccountPayloadDto.prototype, "accountNumber", void 0);
class UpdateCreditFacilityPayloadDto {
    contractId;
    totalLimit;
}
exports.UpdateCreditFacilityPayloadDto = UpdateCreditFacilityPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.contractId !== null &&
        o.contractId !== undefined &&
        String(o.contractId).trim() !== ''),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], UpdateCreditFacilityPayloadDto.prototype, "contractId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Misma convención que POST (string no negativo tras normalización).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined) {
            return value;
        }
        if (typeof value === 'number' && Number.isFinite(value)) {
            return String(value);
        }
        if (typeof value === 'string') {
            return value.trim();
        }
        return String(value);
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(0|[1-9]\d*)(\.\d+)?$/, {
        message: 'totalLimit debe ser un número no negativo (número JSON o string decimal)',
    }),
    __metadata("design:type", String)
], UpdateCreditFacilityPayloadDto.prototype, "totalLimit", void 0);
class UpdatePartnerPayloadDto {
    operatingUser;
    business;
    partner;
    bankAccount;
    creditFacility;
    category;
}
exports.UpdatePartnerPayloadDto = UpdatePartnerPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateOperatingUserPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateOperatingUserPayloadDto),
    __metadata("design:type", UpdateOperatingUserPayloadDto)
], UpdatePartnerPayloadDto.prototype, "operatingUser", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateBusinessPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateBusinessPayloadDto),
    __metadata("design:type", UpdateBusinessPayloadDto)
], UpdatePartnerPayloadDto.prototype, "business", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdatePartnerSectionPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdatePartnerSectionPayloadDto),
    __metadata("design:type", UpdatePartnerSectionPayloadDto)
], UpdatePartnerPayloadDto.prototype, "partner", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateBankAccountPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateBankAccountPayloadDto),
    __metadata("design:type", UpdateBankAccountPayloadDto)
], UpdatePartnerPayloadDto.prototype, "bankAccount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UpdateCreditFacilityPayloadDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UpdateCreditFacilityPayloadDto),
    __metadata("design:type", UpdateCreditFacilityPayloadDto)
], UpdatePartnerPayloadDto.prototype, "creditFacility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [create_partner_payload_dto_1.PartnerCategoryPayloadDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_partner_payload_dto_1.PartnerCategoryPayloadDto),
    __metadata("design:type", Array)
], UpdatePartnerPayloadDto.prototype, "category", void 0);
//# sourceMappingURL=update-partner-payload.dto.js.map