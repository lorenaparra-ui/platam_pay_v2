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
exports.ContractSignerEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("../../../products-data/src/entities/base-external-id.entity");
let ContractSignerEntity = class ContractSignerEntity extends base_external_id_entity_1.BaseExternalIdEntity {
};
exports.ContractSignerEntity = ContractSignerEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'contract_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "contractId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'zapsign_signer_token', type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "zapsignSignerToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id', type: 'bigint' }),
    __metadata("design:type", Number)
], ContractSignerEntity.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sign_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "signUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', type: 'varchar', length: 45, nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'geo_latitude', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "geoLatitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'geo_longitude', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "geoLongitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "signedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "documentPhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'document_verse_photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "documentVersePhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'selfie_photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "selfiePhotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'signature_image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractSignerEntity.prototype, "signatureImageUrl", void 0);
exports.ContractSignerEntity = ContractSignerEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contract_signers', schema: 'transversal_schema' })
], ContractSignerEntity);
//# sourceMappingURL=contract-signer.entity.js.map