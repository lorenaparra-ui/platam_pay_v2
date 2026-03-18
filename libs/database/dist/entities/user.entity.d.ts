import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class UserEntity extends BaseExternalIdEntity {
    cognitoSub: string;
    email: string;
    phone: string | null;
    roleId: number | null;
    statusId: number;
    lastLoginAt: Date | null;
}
