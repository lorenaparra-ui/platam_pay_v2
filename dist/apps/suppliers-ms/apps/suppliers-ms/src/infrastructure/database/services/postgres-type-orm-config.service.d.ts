import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
export declare class PostgresTypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor();
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
