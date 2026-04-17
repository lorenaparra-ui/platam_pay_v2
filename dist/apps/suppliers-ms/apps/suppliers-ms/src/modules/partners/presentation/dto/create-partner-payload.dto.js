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
exports.CreatePartnerPayloadDto = exports.PartnerCategoryPayloadDto = exports.CreatePartnerCreditFacilityPayloadDto = exports.CreatePartnerBankAccountPayloadDto = exports.CreatePartnerPartnerSectionPayloadDto = exports.CreatePartnerBusinessPayloadDto = exports.LegalRepresentativePayloadDto = exports.OperatingUserPayloadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const UUID_V4_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function trim_optional_string(v) {
    if (v === null || v === undefined) {
        return null;
    }
    const t = String(v).trim();
    return t.length > 0 ? t : null;
}
let BusinessCityReferenceV4Constraint = class BusinessCityReferenceV4Constraint {
    validate(business, _args) {
        if (business === null || business === undefined || typeof business !== 'object') {
            return false;
        }
        const o = business;
        const primary = trim_optional_string(o.cityId);
        const legacy = trim_optional_string(o.cityExternalId);
        const valid_primary = primary !== null && UUID_V4_RE.test(primary);
        const valid_legacy = legacy !== null && UUID_V4_RE.test(legacy);
        return valid_primary || valid_legacy;
    }
    defaultMessage() {
        return 'business requiere cityId (UUID v4) o cityExternalId legado con UUID v4.';
    }
};
BusinessCityReferenceV4Constraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'business_city_reference_v4', async: false })
], BusinessCityReferenceV4Constraint);
class OperatingUserPayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.OperatingUserPayloadDto = OperatingUserPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de documento (catálogo / código).' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto (p. ej. E.164 o número local).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], OperatingUserPayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], OperatingUserPayloadDto.prototype, "email", void 0);
class LegalRepresentativePayloadDto {
    firstName;
    lastName;
    docType;
    docNumber;
    phone;
    email;
}
exports.LegalRepresentativePayloadDto = LegalRepresentativePayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "docType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "docNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'Teléfono como texto (p. ej. E.164 o número local).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(32),
    __metadata("design:type", Object)
], LegalRepresentativePayloadDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LegalRepresentativePayloadDto.prototype, "email", void 0);
class CreatePartnerBusinessPayloadDto {
    cityId;
    cityExternalId;
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
exports.CreatePartnerBusinessPayloadDto = CreatePartnerBusinessPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'UUID v4 de ciudad en catálogo transversal (contrato HTTP). Si aún migra desde cityExternalId, puede omitirse si envía el legado.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(36),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Alias legado de cityId; mismo UUID v4. Preferir cityId en clientes nuevos.',
        deprecated: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(36),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "cityExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "businessName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "businessAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "businessType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "legalName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "tradeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: false,
        description: 'Identificación fiscal (NIT, etc.) como string; evitar number.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], CreatePartnerBusinessPayloadDto.prototype, "taxId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: false }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePartnerBusinessPayloadDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: LegalRepresentativePayloadDto, nullable: false }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LegalRepresentativePayloadDto),
    __metadata("design:type", LegalRepresentativePayloadDto)
], CreatePartnerBusinessPayloadDto.prototype, "legalRepresentative", void 0);
class CreatePartnerPartnerSectionPayloadDto {
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
}
exports.CreatePartnerPartnerSectionPayloadDto = CreatePartnerPartnerSectionPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "acronym", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'URL inicial si no se sube archivo `logo`. Si hay archivo, el archivo tiene prioridad.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        nullable: true,
        description: 'URL inicial si no se sube `coBranding`. Si hay archivo, el archivo tiene prioridad.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "coBrandingLogoUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "primaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "secondaryColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "lightColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "notificationEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "webhookUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Por defecto `false` si se omite.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePartnerPartnerSectionPayloadDto.prototype, "sendSalesRepVoucher", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", Object)
], CreatePartnerPartnerSectionPayloadDto.prototype, "disbursementNotificationEmail", void 0);
class CreatePartnerBankAccountPayloadDto {
    bankEntity;
    accountNumber;
}
exports.CreatePartnerBankAccountPayloadDto = CreatePartnerBankAccountPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePartnerBankAccountPayloadDto.prototype, "bankEntity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cuenta como string; no usar number para evitar precisión.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    __metadata("design:type", String)
], CreatePartnerBankAccountPayloadDto.prototype, "accountNumber", void 0);
class CreatePartnerCreditFacilityPayloadDto {
    contractId;
    totalLimit;
}
exports.CreatePartnerCreditFacilityPayloadDto = CreatePartnerCreditFacilityPayloadDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((o) => o.contractId !== null &&
        o.contractId !== undefined &&
        String(o.contractId).trim() !== ''),
    (0, class_validator_1.IsUUID)('4'),
    __metadata("design:type", Object)
], CreatePartnerCreditFacilityPayloadDto.prototype, "contractId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Límite total: entero JSON o string decimal no negativo, sin notación científica. ' +
            'Se serializa a string hacia dominio/integraciones; convención monetaria: unidad mínima (p. ej. centavos) acordada con producto.',
    }),
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
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(0|[1-9]\d*)(\.\d+)?$/, {
        message: 'totalLimit debe ser un número no negativo (número JSON o string decimal)',
    }),
    __metadata("design:type", String)
], CreatePartnerCreditFacilityPayloadDto.prototype, "totalLimit", void 0);
class PartnerCategoryPayloadDto {
    name;
    discountPercentage;
    interestRate;
    disbursementFeePercent;
    minimumDisbursementFee;
    delayDays;
    termDays;
}
exports.PartnerCategoryPayloadDto = PartnerCategoryPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerCategoryPayloadDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "discountPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "interestRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], PartnerCategoryPayloadDto.prototype, "disbursementFeePercent", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ allowNaN: false, allowInfinity: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], PartnerCategoryPayloadDto.prototype, "minimumDisbursementFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "delayDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PartnerCategoryPayloadDto.prototype, "termDays", void 0);
class CreatePartnerPayloadDto {
    operatingUser;
    business;
    partner;
    bankAccount;
    creditFacility;
    category;
    countryCode;
}
exports.CreatePartnerPayloadDto = CreatePartnerPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: OperatingUserPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OperatingUserPayloadDto),
    __metadata("design:type", OperatingUserPayloadDto)
], CreatePartnerPayloadDto.prototype, "operatingUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerBusinessPayloadDto }),
    (0, class_validator_1.Validate)(BusinessCityReferenceV4Constraint),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerBusinessPayloadDto),
    __metadata("design:type", CreatePartnerBusinessPayloadDto)
], CreatePartnerPayloadDto.prototype, "business", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerPartnerSectionPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerPartnerSectionPayloadDto),
    __metadata("design:type", CreatePartnerPartnerSectionPayloadDto)
], CreatePartnerPayloadDto.prototype, "partner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerBankAccountPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerBankAccountPayloadDto),
    __metadata("design:type", CreatePartnerBankAccountPayloadDto)
], CreatePartnerPayloadDto.prototype, "bankAccount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreatePartnerCreditFacilityPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CreatePartnerCreditFacilityPayloadDto),
    __metadata("design:type", CreatePartnerCreditFacilityPayloadDto)
], CreatePartnerPayloadDto.prototype, "creditFacility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PartnerCategoryPayloadDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PartnerCategoryPayloadDto),
    __metadata("design:type", Array)
], CreatePartnerPayloadDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Sobrescribe PARTNER_ONBOARDING_DEFAULT_COUNTRY_CODE (p. ej. ISO 3166-1 alpha-2).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(8),
    __metadata("design:type", Object)
], CreatePartnerPayloadDto.prototype, "countryCode", void 0);
//# sourceMappingURL=create-partner-payload.dto.js.map