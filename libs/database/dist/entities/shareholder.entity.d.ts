import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class ShareholderEntity extends BaseExternalIdEntity {
    companyId: number;
    personId: number;
    ownershipPercentage: string | null;
    evaluationOrder: number | null;
    creditCheckRequired: boolean;
    creditCheckCompleted: boolean;
    isLegalRepresentative: boolean;
}
