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
exports.CreditApplicationListItemResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const credit_application_status_code_model_1 = require("../../domain/models/credit-application-status-code.model");
class CreditApplicationListItemResponseDto {
    application_id;
    application_external_id;
    partner_external_id;
    partner_logo_url;
    customer_full_name;
    customer_type;
    doc_type;
    doc_number;
    phone;
    email;
    sales_rep_name;
    requested_credit_line;
    submission_date;
    queue_days;
    queue_level;
    status_code;
    status_display_name;
}
exports.CreditApplicationListItemResponseDto = CreditApplicationListItemResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 847 }),
    __metadata("design:type", Number)
], CreditApplicationListItemResponseDto.prototype, "application_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "550e8400-e29b-41d4-a716-446655440000" }),
    __metadata("design:type", String)
], CreditApplicationListItemResponseDto.prototype, "application_external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "550e8400-e29b-41d4-a716-446655440000" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "partner_external_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "https://cdn.example.com/logo.png" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "partner_logo_url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Carlos Alberto Munoz" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "customer_full_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ["PN", "PJ"] }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "customer_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "CC" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "doc_type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "3102759655" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "doc_number", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "3102759655" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "cliente@correo.com" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "Laura Perez" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "sales_rep_name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Monto en unidad mínima (COP)",
        example: 8000000,
    }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "requested_credit_line", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Fecha de registro en formato ISO 8601",
        example: "2026-03-10T14:12:00.000Z",
    }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "submission_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Días en cola; solo para in_study",
        example: 4,
    }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "queue_days", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Nivel visual de cola; solo para in_study",
        enum: ["neutral", "warning", "critical"],
    }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "queue_level", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: credit_application_status_code_model_1.CREDIT_APPLICATION_STATUS_CODES }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "En estudio" }),
    __metadata("design:type", Object)
], CreditApplicationListItemResponseDto.prototype, "status_display_name", void 0);
//# sourceMappingURL=credit-application-list-item.response.dto.js.map