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
exports.CreateNaturalPersonOnboardingRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_1 = require("../base");
class CreateNaturalPersonOnboardingRequestDto {
    context;
    applicant;
    business;
    financial;
    isPartnerClient;
}
exports.CreateNaturalPersonOnboardingRequestDto = CreateNaturalPersonOnboardingRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.OnboardingContextDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.OnboardingContextDto),
    __metadata("design:type", base_1.OnboardingContextDto)
], CreateNaturalPersonOnboardingRequestDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.PersonInformationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.PersonInformationDto),
    __metadata("design:type", base_1.PersonInformationDto)
], CreateNaturalPersonOnboardingRequestDto.prototype, "applicant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.BusinessInformationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.BusinessInformationDto),
    __metadata("design:type", base_1.BusinessInformationDto)
], CreateNaturalPersonOnboardingRequestDto.prototype, "business", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.FinancialInformationDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.FinancialInformationDto),
    __metadata("design:type", base_1.FinancialInformationDto)
], CreateNaturalPersonOnboardingRequestDto.prototype, "financial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNaturalPersonOnboardingRequestDto.prototype, "isPartnerClient", void 0);
//# sourceMappingURL=create-natural-person-onboarding-request.dto.js.map