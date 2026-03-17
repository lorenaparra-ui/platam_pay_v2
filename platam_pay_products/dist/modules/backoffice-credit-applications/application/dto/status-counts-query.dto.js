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
exports.StatusCountsQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class StatusCountsQueryDto {
    partner_external_id;
    search;
}
exports.StatusCountsQueryDto = StatusCountsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "UUID público del partner para filtrar",
        example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("4"),
    __metadata("design:type", String)
], StatusCountsQueryDto.prototype, "partner_external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Búsqueda multi-campo: cliente, documento, id solicitud y nombre de negocio",
        maxLength: 120,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], StatusCountsQueryDto.prototype, "search", void 0);
//# sourceMappingURL=status-counts-query.dto.js.map