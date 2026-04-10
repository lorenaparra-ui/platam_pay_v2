import { BaseExternalIdEntity } from './base-external-id.entity';
import { BankAccountEntity } from './bank-account.entity';
import { BusinessEntity } from './business.entity';
import { PartnersEntity } from './partners.entity';
export declare class SupplierEntity extends BaseExternalIdEntity {
    business: BusinessEntity;
    businessId: number;
    bankAccount: BankAccountEntity | null;
    partner: PartnersEntity | null;
}
