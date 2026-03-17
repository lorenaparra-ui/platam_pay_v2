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
exports.ListCreditApplicationsQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const credit_application_status_code_model_1 = require("../../domain/models/credit-application-status-code.model");
function normalizeStringArray(value) {
    if (Array.isArray(value)) {
        return value
            .flatMap((item) => String(item)
            .split(",")
            .map((token) => token.trim()))
            .filter(Boolean);
    }
    if (typeof value === "string") {
        return value
            .split(",")
            .map((token) => token.trim())
            .filter(Boolean);
    }
    return [];
}
const SORT_BY_VALUES = [
    "most_recent",
    "oldest",
    "requested_credit_line_desc",
    "requested_credit_line_asc",
    "queue_days_desc",
];
class ListCreditApplicationsQueryDto {
    limit;
    cursor;
    status_codes;
    partner_external_id;
    search;
    sort_by;
}
exports.ListCreditApplicationsQueryDto = ListCreditApplicationsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Tamaño de página para infinite scroll",
        default: 20,
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (value != null ? Number(value) : undefined)),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ListCreditApplicationsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Cursor opaco para paginación keyset",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], ListCreditApplicationsQueryDto.prototype, "cursor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Códigos de estado a filtrar",
        isArray: true,
        enum: credit_application_status_code_model_1.CREDIT_APPLICATION_STATUS_CODES,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => normalizeStringArray(value)),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(credit_application_status_code_model_1.CREDIT_APPLICATION_STATUS_CODES, { each: true }),
    __metadata("design:type", Array)
], ListCreditApplicationsQueryDto.prototype, "status_codes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "UUID público del partner para filtrar",
        example: "550e8400-e29b-41d4-a716-446655440000",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)("4"),
    __metadata("design:type", String)
], ListCreditApplicationsQueryDto.prototype, "partner_external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Búsqueda multi-campo: cliente, documento, id solicitud y nombre de negocio",
        maxLength: 120,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], ListCreditApplicationsQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Ordenamiento de resultados",
        enum: SORT_BY_VALUES,
        default: "most_recent",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(SORT_BY_VALUES),
    __metadata("design:type", String)
], ListCreditApplicationsQueryDto.prototype, "sort_by", void 0);
//# sourceMappingURL=list-credit-applications-query.dto.js.map