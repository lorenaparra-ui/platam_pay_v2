import type { CreditApplicationStatus } from '@platam/shared';
import type { CreditApplicationPublicFields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';

export class ListCreditApplicationsItemResponse implements CreditApplicationPublicFields {
  externalId: string;
  personId: number | null;
  partnerId: number | null;
  partnerCategoryId: number | null;
  businessId: number | null;
  salesRepresentativeId: number | null;
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
  status: CreditApplicationStatus;
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
  createdAt: Date;
  updatedAt: Date;

  constructor(fields: CreditApplicationPublicFields) {
    Object.assign(this, fields);
  }
}
