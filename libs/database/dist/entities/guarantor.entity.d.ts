import { BaseExternalIdEntity } from './base-external-id.entity';
export declare class GuarantorEntity extends BaseExternalIdEntity {
    creditApplicationId: number;
    personId: number;
    contractSignerId: number | null;
    guarantorType: string;
    relationshipToApplicant: string | null;
    isPrimaryGuarantor: boolean;
    selectedAfterCreditCheck: boolean;
    signatureUrl: string | null;
    signatureDate: Date | null;
}
