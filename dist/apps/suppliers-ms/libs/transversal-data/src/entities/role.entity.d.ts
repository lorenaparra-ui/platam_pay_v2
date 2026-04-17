import { Roles } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class RoleEntity extends BaseExternalIdEntity {
    name: Roles;
    description: string | null;
}
