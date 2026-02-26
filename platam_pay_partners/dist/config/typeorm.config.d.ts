import { DataSource, DataSourceOptions } from "typeorm";
import "./dotenv.config";
declare const typeormConfig: DataSourceOptions;
export default typeormConfig;
export declare const dataSource: DataSource;
