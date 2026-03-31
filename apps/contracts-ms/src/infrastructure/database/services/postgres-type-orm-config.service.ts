import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import TypeormConfig from '@config/typeorm.config';

@Injectable()
export class PostgresTypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return TypeormConfig as TypeOrmModuleOptions;
  }
}
