import "./dotenv.config";
import { DataSourceOptions } from "typeorm";
declare const TypeormConfig: {
    type: "postgres";
    host: string | undefined;
    username: string | undefined;
    port: number;
    database: string | undefined;
    password: string | undefined;
    entities: DataSourceOptions["entities"];
    synchronize: false;
    migrationsRun: false;
    migrationsTableName: string;
};
export default TypeormConfig;
