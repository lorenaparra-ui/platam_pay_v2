import { CreditFacilityState } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { ContractEntity } from './contract.entity';
import { BusinessEntity } from '@app/suppliers-data';
import { CategoryEntity } from './category.entity';
export declare class CreditFacilityEntity extends BaseExternalIdEntity {
    contract: ContractEntity | null;
    state: CreditFacilityState;
    totalLimit: string;
    business: BusinessEntity;
    businessId: number;
    categories: CategoryEntity[];
}
