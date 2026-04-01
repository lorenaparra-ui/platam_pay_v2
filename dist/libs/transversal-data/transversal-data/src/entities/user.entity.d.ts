import { CreditFacilitiesStatuses } from '@platam/shared';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
export declare class UserEntity extends BaseExternalIdEntity {
    cognitoSub: string;
    email: string;
    roleId: number | null;
    state: CreditFacilitiesStatuses;
    personId: number | null;
    lastLoginAt: Date | null;
}
