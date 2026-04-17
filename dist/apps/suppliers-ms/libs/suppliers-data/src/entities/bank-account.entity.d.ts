import { BaseExternalIdEntity } from './base-external-id.entity';
import { AccountTypes } from '@platam/shared';
export declare class BankAccountEntity extends BaseExternalIdEntity {
    bankEntity: string;
    accountNumber: string;
    bankCertification: string | null;
    accountType: AccountTypes;
}
