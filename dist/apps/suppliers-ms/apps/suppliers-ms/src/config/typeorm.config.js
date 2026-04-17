"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv.config");
const category_entity_1 = require("../../../../libs/products-data/src/entities/category.entity");
const contract_entity_1 = require("../../../../libs/products-data/src/entities/contract.entity");
const contract_template_entity_1 = require("../../../../libs/products-data/src/entities/contract-template.entity");
const credit_facility_entity_1 = require("../../../../libs/products-data/src/entities/credit-facility.entity");
const suppliers_data_1 = require("../../../../libs/suppliers-data/src");
const transversal_data_1 = require("../../../../libs/transversal-data/src");
const PARTNER_CATEGORIES_RELATED_ENTITIES = [
    category_entity_1.CategoryEntity,
    credit_facility_entity_1.CreditFacilityEntity,
    contract_entity_1.ContractEntity,
    contract_template_entity_1.ContractTemplateEntity,
];
const TypeormConfig = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    entities: [
        ...suppliers_data_1.SUPPLIERS_DATA_ENTITIES,
        ...PARTNER_CATEGORIES_RELATED_ENTITIES,
        transversal_data_1.PersonEntity,
        transversal_data_1.RoleEntity,
        transversal_data_1.UserEntity,
        transversal_data_1.CityEntity,
        transversal_data_1.PartnerCreateUserSqsIdempotencyEntity,
    ],
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "typeorm_migrations",
};
exports.default = TypeormConfig;
//# sourceMappingURL=typeorm.config.js.map