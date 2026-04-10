import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class BankAccountEntity extends BaseExternalIdEntity {
    bankEntity: string;
    accountNumber: string;
    bankCertification: string | null;
}
