import { BaseExternalIdEntity } from './base-external-id.entity';
import { BankAccountEntity } from './bank-account.entity';
import { BusinessEntity } from './business.entity';
import { PartnerEntity } from './partner.entity';
import { SupplierState } from '@platam/shared';
export declare class SupplierEntity extends BaseExternalIdEntity {
    business: BusinessEntity;
    businessId: number;
    bankAccount: BankAccountEntity | null;
    partner: PartnerEntity | null;
    state: SupplierState;
}
