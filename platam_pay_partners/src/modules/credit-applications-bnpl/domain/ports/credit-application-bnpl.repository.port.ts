import { CreditApplicationBnpl } from "../models/credit-application-bnpl.model";

export const CREDIT_APPLICATION_BNPL_REPOSITORY = "CREDIT_APPLICATION_BNPL_REPOSITORY";

export interface CreateCreditApplicationBnplPayload {
  userId: number;
  userProductId?: number | null;
  partnerId?: number | null;
  partnerCategoryId?: number | null;
  salesRepId?: number | null;
  businessId?: number | null;
  numberOfLocations?: number | null;
  numberOfEmployees?: number | null;
  businessSeniorityId?: number | null;
  sectorExperience?: string | null;
  businessFlagshipM2?: number | null;
  businessHasRent?: boolean | null;
  businessRentAmount?: number | null;
  monthlyIncome?: number | null;
  monthlyExpenses?: number | null;
  monthlyPurchases?: number | null;
  currentPurchases?: number | null;
  totalAssets?: number | null;
  requestedCreditLine?: number | null;
  isCurrentClient?: boolean;
  statusId?: number;
  submissionDate?: Date | null;
  approvalDate?: Date | null;
  rejectionReason?: string | null;
  creditStudyDate?: Date | null;
  creditScore?: string | null;
  creditDecision?: string | null;
  approvedCreditLine?: number | null;
  analystReport?: string | null;
  riskProfile?: string | null;
  privacyPolicyAccepted?: boolean;
  privacyPolicyDate?: Date | null;
}

export type UpdateCreditApplicationBnplPayload = Partial<CreateCreditApplicationBnplPayload>;

export interface CreditApplicationBnplRepositoryPort {
  findAll(): Promise<CreditApplicationBnpl[]>;
  findById(id: number): Promise<CreditApplicationBnpl | null>;
  findByExternalId(externalId: string): Promise<CreditApplicationBnpl | null>;
  create(payload: CreateCreditApplicationBnplPayload): Promise<CreditApplicationBnpl>;
  updateByExternalId(
    externalId: string,
    payload: UpdateCreditApplicationBnplPayload,
  ): Promise<CreditApplicationBnpl | null>;
  deleteByExternalId(externalId: string): Promise<boolean>;
}
