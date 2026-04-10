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
exports.BankAccountEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("./base-external-id.entity");
const aes_256_transformer_1 = require("../transformers/aes-256.transformer");
let BankAccountEntity = class BankAccountEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    bankEntity;
    accountNumber;
    bankCertification;
};
exports.BankAccountEntity = BankAccountEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_entity', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], BankAccountEntity.prototype, "bankEntity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'account_number',
        type: 'varchar',
        length: 500,
        transformer: aes_256_transformer_1.BankAccountEncryptionTransformer,
    }),
    __metadata("design:type", String)
], BankAccountEntity.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bank_certification', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], BankAccountEntity.prototype, "bankCertification", void 0);
exports.BankAccountEntity = BankAccountEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'bank_accounts', schema: 'suppliers_schema' })
], BankAccountEntity);
//# sourceMappingURL=bank-account.entity.js.map