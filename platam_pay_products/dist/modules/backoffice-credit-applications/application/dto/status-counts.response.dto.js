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
exports.CreditApplicationStatusCountsResponseDto = exports.CreditApplicationStatusCountItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const credit_application_status_code_model_1 = require("../../domain/models/credit-application-status-code.model");
class CreditApplicationStatusCountItemDto {
    status_code;
    total;
}
exports.CreditApplicationStatusCountItemDto = CreditApplicationStatusCountItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: credit_application_status_code_model_1.CREDIT_APPLICATION_STATUS_CODES }),
    __metadata("design:type", String)
], CreditApplicationStatusCountItemDto.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], CreditApplicationStatusCountItemDto.prototype, "total", void 0);
class CreditApplicationStatusCountsResponseDto {
    total;
    counts;
}
exports.CreditApplicationStatusCountsResponseDto = CreditApplicationStatusCountsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 47 }),
    __metadata("design:type", Number)
], CreditApplicationStatusCountsResponseDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreditApplicationStatusCountItemDto, isArray: true }),
    __metadata("design:type", Array)
], CreditApplicationStatusCountsResponseDto.prototype, "counts", void 0);
//# sourceMappingURL=status-counts.response.dto.js.map