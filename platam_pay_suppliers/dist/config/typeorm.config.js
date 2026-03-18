"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv.config");
const database_1 = require("@libs/database");
const typeormConfig = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USERNAME,
    port: Number(process.env.TYPEORM_PORT ?? 5432),
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    entities: database_1.DATABASE_ENTITIES,
    migrations: [],
    logging: process.env.TYPEORM_LOGGING === "true",
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: "typeorm_migrations",
};
exports.default = typeormConfig;
//# sourceMappingURL=typeorm.config.js.map