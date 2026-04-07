import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './entities/city.entity';
import { CurrencyEntity } from './entities/currency.entity';
import { PermissionEntity } from './entities/permission.entity';
import { PersonEntity } from './entities/person.entity';
import { RoleEntity } from './entities/role.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { StatusEntity } from './entities/status.entity';
import { PartnerCreateUserSqsIdempotencyEntity } from './entities/partner-create-user-sqs-idempotency.entity';
import { UploadFilesIdempotencyEntity } from './entities/upload-files-idempotency.entity';
import { UserEntity } from './entities/user.entity';
import { TransversalDataService } from './transversal-data.service';

/** Entidades TypeORM concretas del dominio transversal (excluye la base abstracta). */
export const TRANSVERSAL_DATA_ENTITIES = [
  CityEntity,
  CurrencyEntity,
  PermissionEntity,
  PersonEntity,
  RoleEntity,
  RolePermissionEntity,
  StatusEntity,
  UploadFilesIdempotencyEntity,
  PartnerCreateUserSqsIdempotencyEntity,
  UserEntity,
] as const;

@Module({
  imports: [TypeOrmModule.forFeature([...TRANSVERSAL_DATA_ENTITIES])],
  providers: [TransversalDataService],
  exports: [TypeOrmModule, TransversalDataService],
})
export class TransversalDataModule {}
