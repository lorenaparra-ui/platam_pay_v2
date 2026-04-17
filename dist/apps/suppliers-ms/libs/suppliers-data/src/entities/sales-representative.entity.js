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
exports.SalesRepresentativeEntity = void 0;
const typeorm_1 = require("typeorm");
const shared_1 = require("../../../shared/src");
const base_external_id_entity_1 = require("./base-external-id.entity");
const partner_entity_1 = require("./partner.entity");
const transversal_data_1 = require("../../../transversal-data/src");
let SalesRepresentativeEntity = class SalesRepresentativeEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    partner;
    partnerId;
    state;
    user;
    userId;
    is_default;
};
exports.SalesRepresentativeEntity = SalesRepresentativeEntity;
__decorate([
    (0, typeorm_1.ManyToOne)(() => partner_entity_1.PartnerEntity, (p) => p.salesRepresentatives, {
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'partner_id', referencedColumnName: 'id' }),
    __metadata("design:type", partner_entity_1.PartnerEntity)
], SalesRepresentativeEntity.prototype, "partner", void 0);
__decorate([
    (0, typeorm_1.RelationId)((sr) => sr.partner),
    __metadata("design:type", Number)
], SalesRepresentativeEntity.prototype, "partnerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: shared_1.SalesRepresentativeRecordState,
        enumName: 'sales_representative_state',
        default: shared_1.SalesRepresentativeRecordState.ACTIVE,
    }),
    __metadata("design:type", String)
], SalesRepresentativeEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => transversal_data_1.UserEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", transversal_data_1.UserEntity)
], SalesRepresentativeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.RelationId)((sr) => sr.user),
    __metadata("design:type", Number)
], SalesRepresentativeEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'is_default',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], SalesRepresentativeEntity.prototype, "is_default", void 0);
exports.SalesRepresentativeEntity = SalesRepresentativeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'sales_representatives', schema: 'suppliers_schema' })
], SalesRepresentativeEntity);
//# sourceMappingURL=sales-representative.entity.js.map