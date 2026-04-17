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
exports.CreatePartnerOrchestratorResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatePartnerOrchestratorResponseDto {
    sagaExternalId;
    correlationId;
    creditFacilityExternalId;
    userExternalId;
    personExternalId;
    legalRepresentativeExternalId;
    businessExternalId;
    bankCertificationUrl;
    logoUrl;
    coBrandingUrl;
    bankAccountExternalId;
    supplierExternalId;
    partnerExternalId;
}
exports.CreatePartnerOrchestratorResponseDto = CreatePartnerOrchestratorResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "sagaExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "correlationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "creditFacilityExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Pendiente hasta que transversal-ms complete create-partner-user (mensaje SQS). Correlación: correlationId.',
    }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "userExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Pendiente hasta creación asíncrona de persona en transversal-ms.',
    }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "personExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
        description: 'Representante legal registrado en suppliers_schema (si vino en el payload).',
    }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "legalRepresentativeExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "businessExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "bankCertificationUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "coBrandingUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ nullable: true }),
    __metadata("design:type", Object)
], CreatePartnerOrchestratorResponseDto.prototype, "bankAccountExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "supplierExternalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatePartnerOrchestratorResponseDto.prototype, "partnerExternalId", void 0);
//# sourceMappingURL=create-partner-orchestrator-response.dto.js.map