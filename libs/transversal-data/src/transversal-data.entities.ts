import { CityEntity } from './entities/city.entity';
import { CurrencyEntity } from './entities/currency.entity';
import { PermissionEntity } from './entities/permission.entity';
import { PersonEntity } from './entities/person.entity';
import { RoleEntity } from './entities/role.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { StatusEntity } from './entities/catalog-status-types.entity';
import { PartnerCreateUserSqsIdempotencyEntity } from './entities/partner-create-user-sqs-idempotency.entity';
import { UploadFilesIdempotencyEntity } from './entities/upload-files-idempotency.entity';
import { AuditLogEntity } from './entities/audit-log.entity';
import { GlobalParamEntity } from './entities/global-param.entity';
import { UserEntity } from './entities/user.entity';

/** Lista de entidades TypeORM (sin Nest); usada por `TransversalDataModule` y por la CLI de migraciones. */
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
  GlobalParamEntity,
  AuditLogEntity,
] as const;
