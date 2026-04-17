import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';
export declare class ShareholderEntity extends BaseExternalIdEntity {
    businessId: BusinessEntity;
    person: PersonEntity;
    personId: number;
    shareholder_business: BusinessEntity | null;
    shareholder_business_id: number | null;
    ownershipPercentage: string | null;
    evaluationOrder: number | null;
    creditCheckRequired: boolean;
    creditCheckCompleted: boolean;
    created_at: Date;
    updated_at: Date;
}
