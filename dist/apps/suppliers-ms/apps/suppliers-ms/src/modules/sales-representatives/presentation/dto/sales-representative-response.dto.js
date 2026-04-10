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
exports.SalesRepresentativeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SalesRepresentativeResponseDto {
    internal_id;
    external_id;
    partner_external_id;
    user_external_id;
    created_at;
    updated_at;
}
exports.SalesRepresentativeResponseDto = SalesRepresentativeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesRepresentativeResponseDto.prototype, "internal_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], SalesRepresentativeResponseDto.prototype, "external_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid' }),
    __metadata("design:type", String)
], SalesRepresentativeResponseDto.prototype, "partner_external_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], SalesRepresentativeResponseDto.prototype, "user_external_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SalesRepresentativeResponseDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SalesRepresentativeResponseDto.prototype, "updated_at", void 0);
//# sourceMappingURL=sales-representative-response.dto.js.map