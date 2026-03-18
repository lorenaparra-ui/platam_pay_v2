import { BaseExternalIdEntity } from "./base-external-id.entity";
/**
 * Entidad TypeORM para credit_applications (antes credit_applications_bnpl).
 * FKs: person_id -> persons.id, partner_id -> partners.id,
 * partner_category_id -> partner_categories.id, business_id -> businesses.id,
 * status_id -> statuses.id.
 */
export declare class CreditApplicationEntity extends BaseExternalIdEntity {
    personId: number | null;
    partnerId: number | null;
    partnerCategoryId: number | null;
    businessId: number | null;
    numberOfLocations: number | null;
    numberOfEmployees: number | null;
    businessSeniority: string | null;
    sectorExperience: string | null;
    businessFlagshipM2: number | null;
    businessHasRent: boolean | null;
    businessRentAmount: number | null;
    monthlyIncome: number | null;
    monthlyExpenses: number | null;
    monthlyPurchases: number | null;
    currentPurchases: number | null;
    totalAssets: number | null;
    requestedCreditLine: number | null;
    isCurrentClient: boolean;
    statusId: number;
    submissionDate: Date | null;
    approvalDate: Date | null;
    rejectionReason: string | null;
    creditStudyDate: Date | null;
    creditScore: string | null;
    creditDecision: string | null;
    approvedCreditLine: number | null;
    analystReport: string | null;
    riskProfile: string | null;
    privacyPolicyAccepted: boolean;
    privacyPolicyDate: Date | null;
}
