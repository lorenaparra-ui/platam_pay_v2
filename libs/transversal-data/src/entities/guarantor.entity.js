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
exports.GuarantorEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("../../../products-data/src/entities/base-external-id.entity");
let GuarantorEntity = class GuarantorEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.GuarantorEntity = GuarantorEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'credit_application_id', type: 'bigint' }),
    __metadata("design:type", Number)
], GuarantorEntity.prototype, "creditApplicationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint' }),
    __metadata("design:type", Number)
], GuarantorEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_signer_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "contractSignerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'guarantor_type',
        type: 'varchar',
        length: 20,
    }),
    __metadata("design:type", String)
], GuarantorEntity.prototype, "guarantorType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'relationship_to_applicant',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "relationshipToApplicant", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_primary_guarantor', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], GuarantorEntity.prototype, "isPrimaryGuarantor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selected_after_credit_check', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], GuarantorEntity.prototype, "selectedAfterCreditCheck", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "signatureUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_date', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], GuarantorEntity.prototype, "signatureDate", void 0);
exports.GuarantorEntity = GuarantorEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'guarantors', schema: 'transversal_schema' })
], GuarantorEntity);
//# sourceMappingURL=guarantor.entity.js.map