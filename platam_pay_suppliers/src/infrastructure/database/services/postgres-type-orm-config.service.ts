import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import typeormConfig from "../../../config/typeorm.config";

@Injectable()
export class PostgresTypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return typeormConfig as TypeOrmModuleOptions;
  }
}
