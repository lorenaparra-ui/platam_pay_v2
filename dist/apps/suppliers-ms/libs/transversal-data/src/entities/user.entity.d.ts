import { RoleEntity } from './role.entity';
import { PersonEntity } from './person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { UserState } from '@platam/shared';
export declare class UserEntity extends BaseExternalIdEntity {
    cognitoSub: string;
    email: string;
    role: RoleEntity;
    roleId: number;
    parent: UserEntity | null;
    parent_id: number | null;
    hierarchyPath: string;
    children: UserEntity[];
    state: UserState;
    person: PersonEntity;
    personId: number | null;
    lastLoginAt: Date | null;
}
