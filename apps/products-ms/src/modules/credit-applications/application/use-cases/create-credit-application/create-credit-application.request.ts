import type { CreditApplicationStatus } from '@platam/shared';

export class CreateCreditApplicationRequest {
  constructor(
    readonly personId: number | null,
    readonly partnerId: number | null,
    readonly partnerCategoryId: number | null,
    readonly businessId: number | null,
    readonly salesRepresentativeId: number,
    readonly status: CreditApplicationStatus,
    readonly isCurrentClient: boolean,
    readonly privacyPolicyAccepted: boolean,
    readonly numberOfLocations?: number | null,
    readonly numberOfEmployees?: number | null,
    readonly businessSeniority?: string | null,
    readonly sectorExperience?: string | null,
    readonly businessFlagshipM2?: number | null,
    readonly businessHasRent?: boolean | null,
    readonly businessRentAmount?: number | null,
    readonly monthlyIncome?: number | null,
    readonly monthlyExpenses?: number | null,
    readonly monthlyPurchases?: number | null,
    readonly currentPurchases?: number | null,
    readonly totalAssets?: number | null,
    readonly requestedCreditLine?: number | null,
    readonly submissionDate?: Date | null,
    readonly privacyPolicyDate?: Date | null,
    readonly externalId?: string,
  ) {}
}
