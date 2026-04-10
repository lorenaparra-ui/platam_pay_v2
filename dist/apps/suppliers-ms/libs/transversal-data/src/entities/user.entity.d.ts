import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
export type UserState = 'active' | 'inactive';
export declare class UserEntity extends BaseExternalIdEntity {
    cognitoSub: string;
    email: string;
    roleId: number | null;
    state: UserState;
    personId: number | null;
    lastLoginAt: Date | null;
}
