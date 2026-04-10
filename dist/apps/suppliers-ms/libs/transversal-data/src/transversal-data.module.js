"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransversalDataModule = exports.TRANSVERSAL_DATA_ENTITIES = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const city_entity_1 = require("./entities/city.entity");
const currency_entity_1 = require("./entities/currency.entity");
const permission_entity_1 = require("./entities/permission.entity");
const person_entity_1 = require("./entities/person.entity");
const role_entity_1 = require("./entities/role.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const status_entity_1 = require("./entities/status.entity");
const partner_create_user_sqs_idempotency_entity_1 = require("./entities/partner-create-user-sqs-idempotency.entity");
const upload_files_idempotency_entity_1 = require("./entities/upload-files-idempotency.entity");
const user_entity_1 = require("./entities/user.entity");
const transversal_data_service_1 = require("./transversal-data.service");
exports.TRANSVERSAL_DATA_ENTITIES = [
    city_entity_1.CityEntity,
    currency_entity_1.CurrencyEntity,
    permission_entity_1.PermissionEntity,
    person_entity_1.PersonEntity,
    role_entity_1.RoleEntity,
    role_permission_entity_1.RolePermissionEntity,
    status_entity_1.StatusEntity,
    upload_files_idempotency_entity_1.UploadFilesIdempotencyEntity,
    partner_create_user_sqs_idempotency_entity_1.PartnerCreateUserSqsIdempotencyEntity,
    user_entity_1.UserEntity,
];
let TransversalDataModule = class TransversalDataModule {
};
exports.TransversalDataModule = TransversalDataModule;
exports.TransversalDataModule = TransversalDataModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([...exports.TRANSVERSAL_DATA_ENTITIES])],
        providers: [transversal_data_service_1.TransversalDataService],
        exports: [typeorm_1.TypeOrmModule, transversal_data_service_1.TransversalDataService],
    })
], TransversalDataModule);
//# sourceMappingURL=transversal-data.module.js.map