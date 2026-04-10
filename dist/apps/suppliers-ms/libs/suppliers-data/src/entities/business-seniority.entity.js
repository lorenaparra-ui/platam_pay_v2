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
exports.BusinessSeniorityEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("./base-external-id.entity");
let BusinessSeniorityEntity = class BusinessSeniorityEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    description;
    rangeStart;
    rangeEnd;
};
exports.BusinessSeniorityEntity = BusinessSeniorityEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], BusinessSeniorityEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'range_start', type: 'int' }),
    __metadata("design:type", Number)
], BusinessSeniorityEntity.prototype, "rangeStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'range_end', type: 'int' }),
    __metadata("design:type", Number)
], BusinessSeniorityEntity.prototype, "rangeEnd", void 0);
exports.BusinessSeniorityEntity = BusinessSeniorityEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'business_seniority', schema: 'suppliers_schema' })
], BusinessSeniorityEntity);
//# sourceMappingURL=business-seniority.entity.js.map