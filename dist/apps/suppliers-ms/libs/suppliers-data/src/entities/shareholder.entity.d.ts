import { PersonEntity } from '../../../transversal-data/src/entities/person.entity';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { BusinessEntity } from './business.entity';
export declare class ShareholderEntity extends BaseExternalIdEntity {
    business: BusinessEntity;
    businessId: number;
    person: PersonEntity;
    personId: number;
    ownershipPercentage: string | null;
    evaluationOrder: number | null;
    creditCheckRequired: boolean;
    creditCheckCompleted: boolean;
    isLegalRepresentative: boolean;
}
