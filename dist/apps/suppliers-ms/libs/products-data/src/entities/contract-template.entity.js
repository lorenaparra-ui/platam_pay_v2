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
exports.ContractTemplateEntity = void 0;
const typeorm_1 = require("typeorm");
const shared_1 = require("../../../shared/src");
const base_external_id_entity_1 = require("./base-external-id.entity");
let ContractTemplateEntity = class ContractTemplateEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    name;
    description;
    templateUrl;
    version;
    state;
};
exports.ContractTemplateEntity = ContractTemplateEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], ContractTemplateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ContractTemplateEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'template_url',
        type: 'text',
        nullable: false,
        comment: 'URL del template en S3'
    }),
    __metadata("design:type", String)
], ContractTemplateEntity.prototype, "templateUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'version', type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], ContractTemplateEntity.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.ContractTemplateCatalogStatus,
        enumName: 'credit_facility_state',
        default: shared_1.ContractTemplateCatalogStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], ContractTemplateEntity.prototype, "state", void 0);
exports.ContractTemplateEntity = ContractTemplateEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'contract_templates', schema: 'products_schema' })
], ContractTemplateEntity);
//# sourceMappingURL=contract-template.entity.js.map