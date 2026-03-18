import { Onboarding } from '../models/onboarding.model';
export declare const ONBOARDING_REPOSITORY = "ONBOARDING_REPOSITORY";
export interface CreateOnboardingPayload {
    userId: number;
    userProductId?: number | null;
    partnerId?: number | null;
    partnerCategoryId?: number | null;
    salesRepId?: number | null;
    businessName?: string | null;
    businessRelationId?: number | null;
    businessTypeName?: string | null;
    businessTypeCode?: number | null;
    businessAddress?: string | null;
    businessCity?: string | null;
    businessRentAmount?: string | null;
    numberOfLocations?: number | null;
    numberOfEmployees?: number | null;
    businessSeniorityId?: number | null;
    sectorExperience?: string | null;
    relationshipToBusiness?: string | null;
    monthlyIncome?: string | null;
    monthlyExpenses?: string | null;
    monthlyPurchases?: string | null;
    currentPurchases?: string | null;
    totalAssets?: string | null;
    requestedCreditLine?: string | null;
    isCurrentClient?: boolean;
    statusId?: number;
    submissionDate?: Date | null;
    approvalDate?: Date | null;
    rejectionReason?: string | null;
    creditStudyDate?: Date | null;
    creditScore?: string | null;
    creditDecision?: string | null;
    approvedCreditLine?: string | null;
    analystReport?: string | null;
    riskProfile?: string | null;
    privacyPolicyAccepted?: boolean;
    privacyPolicyDate?: Date | null;
}
export type UpdateOnboardingPayload = Partial<CreateOnboardingPayload>;
export interface OnboardingRepositoryPort {
    findAll(): Promise<Onboarding[]>;
    findById(id: number): Promise<Onboarding | null>;
    findByExternalId(externalId: string): Promise<Onboarding | null>;
    create(payload: CreateOnboardingPayload): Promise<Onboarding>;
    updateByExternalId(externalId: string, payload: UpdateOnboardingPayload): Promise<Onboarding | null>;
    deleteByExternalId(externalId: string): Promise<boolean>;
}
