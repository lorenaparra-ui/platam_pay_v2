"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSVERSAL_DATA_ENTITIES = void 0;
const city_entity_1 = require("./entities/city.entity");
const currency_entity_1 = require("./entities/currency.entity");
const permission_entity_1 = require("./entities/permission.entity");
const person_entity_1 = require("./entities/person.entity");
const role_entity_1 = require("./entities/role.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const catalog_status_types_entity_1 = require("./entities/catalog-status-types.entity");
const partner_create_user_sqs_idempotency_entity_1 = require("./entities/partner-create-user-sqs-idempotency.entity");
const upload_files_idempotency_entity_1 = require("./entities/upload-files-idempotency.entity");
const audit_log_entity_1 = require("./entities/audit-log.entity");
const global_param_entity_1 = require("./entities/global-param.entity");
const user_entity_1 = require("./entities/user.entity");
exports.TRANSVERSAL_DATA_ENTITIES = [
    city_entity_1.CityEntity,
    currency_entity_1.CurrencyEntity,
    permission_entity_1.PermissionEntity,
    person_entity_1.PersonEntity,
    role_entity_1.RoleEntity,
    role_permission_entity_1.RolePermissionEntity,
    catalog_status_types_entity_1.StatusEntity,
    upload_files_idempotency_entity_1.UploadFilesIdempotencyEntity,
    partner_create_user_sqs_idempotency_entity_1.PartnerCreateUserSqsIdempotencyEntity,
    user_entity_1.UserEntity,
    global_param_entity_1.GlobalParamEntity,
    audit_log_entity_1.AuditLogEntity,
];
//# sourceMappingURL=transversal-data.entities.js.map