import { CityEntity } from './entities/city.entity';
import { CurrencyEntity } from './entities/currency.entity';
import { DocumentTypeEntity } from './entities/document-type.entity';
import { PermissionEntity } from './entities/permission.entity';
import { PersonEntity } from './entities/person.entity';
import { RoleEntity } from './entities/role.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { StatusEntity } from './entities/status.entity';
import { PartnerCreateUserSqsIdempotencyEntity } from './entities/partner-create-user-sqs-idempotency.entity';
import { UploadFilesIdempotencyEntity } from './entities/upload-files-idempotency.entity';
import { UserEntity } from './entities/user.entity';
export declare const TRANSVERSAL_DATA_ENTITIES: readonly [typeof CityEntity, typeof CurrencyEntity, typeof DocumentTypeEntity, typeof PermissionEntity, typeof PersonEntity, typeof RoleEntity, typeof RolePermissionEntity, typeof StatusEntity, typeof UploadFilesIdempotencyEntity, typeof PartnerCreateUserSqsIdempotencyEntity, typeof UserEntity];
export declare class TransversalDataModule {
}
