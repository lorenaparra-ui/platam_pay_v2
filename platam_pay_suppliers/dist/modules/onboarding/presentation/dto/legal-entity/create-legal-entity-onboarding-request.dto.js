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
exports.CreateLegalEntityOnboardingRequestDto = exports.ShareholderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_1 = require("../base");
class ShareholderItemDto {
    firstName;
    lastName;
    documentType;
    documentNumber;
    percent;
}
exports.ShareholderItemDto = ShareholderItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShareholderItemDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShareholderItemDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShareholderItemDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ShareholderItemDto.prototype, "documentNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25.5, minimum: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ShareholderItemDto.prototype, "percent", void 0);
class CreateLegalEntityOnboardingRequestDto {
    context;
    companyName;
    yearOfEstablishment;
    legalRepresentative;
    business;
    financial;
    shareholders;
}
exports.CreateLegalEntityOnboardingRequestDto = CreateLegalEntityOnboardingRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.OnboardingContextDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.OnboardingContextDto),
    __metadata("design:type", base_1.OnboardingContextDto)
], CreateLegalEntityOnboardingRequestDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mi Empresa SAS' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLegalEntityOnboardingRequestDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2020 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1900),
    __metadata("design:type", Number)
], CreateLegalEntityOnboardingRequestDto.prototype, "yearOfEstablishment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.PersonInformationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.PersonInformationDto),
    __metadata("design:type", base_1.PersonInformationDto)
], CreateLegalEntityOnboardingRequestDto.prototype, "legalRepresentative", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.BusinessInformationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.BusinessInformationDto),
    __metadata("design:type", base_1.BusinessInformationDto)
], CreateLegalEntityOnboardingRequestDto.prototype, "business", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.FinancialInformationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.FinancialInformationDto),
    __metadata("design:type", base_1.FinancialInformationDto)
], CreateLegalEntityOnboardingRequestDto.prototype, "financial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ShareholderItemDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ShareholderItemDto),
    __metadata("design:type", Array)
], CreateLegalEntityOnboardingRequestDto.prototype, "shareholders", void 0);
//# sourceMappingURL=create-legal-entity-onboarding-request.dto.js.map