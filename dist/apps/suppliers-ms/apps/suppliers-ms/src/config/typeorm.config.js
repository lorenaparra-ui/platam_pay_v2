"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv.config");
const suppliers_data_1 = require("../../../../libs/suppliers-data/src");
const transversal_data_1 = require("../../../../libs/transversal-data/src");
const TypeormConfig = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    entities: [
        ...suppliers_data_1.SUPPLIERS_DATA_ENTITIES,
        transversal_data_1.PersonEntity,
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