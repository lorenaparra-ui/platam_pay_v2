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
exports.CreateSalesRepNaturalOpinionRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const base_1 = require("../base");
class CreateSalesRepNaturalOpinionRequestDto {
    context;
    opinion;
}
exports.CreateSalesRepNaturalOpinionRequestDto = CreateSalesRepNaturalOpinionRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.OnboardingContextDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.OnboardingContextDto),
    __metadata("design:type", base_1.OnboardingContextDto)
], CreateSalesRepNaturalOpinionRequestDto.prototype, "context", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: base_1.SalesRepOpinionDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => base_1.SalesRepOpinionDto),
    __metadata("design:type", base_1.SalesRepOpinionDto)
], CreateSalesRepNaturalOpinionRequestDto.prototype, "opinion", void 0);
//# sourceMappingURL=create-sales-rep-natural-opinion-request.dto.js.map