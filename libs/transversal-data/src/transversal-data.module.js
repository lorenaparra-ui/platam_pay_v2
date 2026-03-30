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
const business_seniority_entity_1 = require("./entities/business-seniority.entity");
const city_entity_1 = require("./entities/city.entity");
const contract_signer_entity_1 = require("./entities/contract-signer.entity");
const document_type_entity_1 = require("./entities/document-type.entity");
const guarantor_entity_1 = require("./entities/guarantor.entity");
const legal_representative_entity_1 = require("./entities/legal-representative.entity");
const permission_entity_1 = require("./entities/permission.entity");
const person_entity_1 = require("./entities/person.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const shareholder_entity_1 = require("./entities/shareholder.entity");
const status_entity_1 = require("./entities/status.entity");
const user_entity_1 = require("./entities/user.entity");
const transversal_data_service_1 = require("./transversal-data.service");
exports.TRANSVERSAL_DATA_ENTITIES = [
    business_seniority_entity_1.BusinessSeniorityEntity,
    city_entity_1.CityEntity,
    contract_signer_entity_1.ContractSignerEntity,
    document_type_entity_1.DocumentTypeEntity,
    guarantor_entity_1.GuarantorEntity,
    legal_representative_entity_1.LegalRepresentativeEntity,
    permission_entity_1.PermissionEntity,
    person_entity_1.PersonEntity,
    role_permission_entity_1.RolePermissionEntity,
    shareholder_entity_1.ShareholderEntity,
    status_entity_1.StatusEntity,
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