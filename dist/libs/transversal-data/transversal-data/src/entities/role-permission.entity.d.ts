import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';
export declare class RolePermissionEntity extends BaseExternalIdEntity {
    role: RoleEntity;
    roleId: number;
    permission: PermissionEntity;
    permissionId: number;
}
