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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const base_external_id_entity_1 = require("../../../products-data/src/entities/base-external-id.entity");
let UserEntity = class UserEntity extends base_external_id_entity_1.BaseExternalIdEntity {
    cognitoSub;
    email;
    roleId;
    state;
    personId;
    lastLoginAt;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)({ name: 'cognito_sub', type: 'uuid', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "cognitoSub", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state',
        type: 'enum',
        enum: ['active', 'inactive'],
        enumName: 'user_state',
        default: 'active',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'person_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "personId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "lastLoginAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users', schema: 'transversal_schema' })
], UserEntity);
//# sourceMappingURL=user.entity.js.map