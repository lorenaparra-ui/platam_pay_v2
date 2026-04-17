import { PartnerOnboardingSagaStatus } from '@platam/shared';
export declare class PartnerOnboardingSagaEntity {
    id: string;
    externalId: string;
    correlationId: string;
    status: PartnerOnboardingSagaStatus;
    currentStep: number;
    creditFacilityExternalId: string | null;
    userExternalId: string | null;
    personExternalId: string | null;
    businessExternalId: string | null;
    bankAccountExternalId: string | null;
    partnerExternalId: string | null;
    errorMessage: string | null;
    createdAt: Date;
    updatedAt: Date;
}
