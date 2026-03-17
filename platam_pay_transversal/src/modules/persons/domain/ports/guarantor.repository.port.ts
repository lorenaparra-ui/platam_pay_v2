import type { Guarantor } from '../models/guarantor.model';

export const GUARANTOR_REPOSITORY = 'GUARANTOR_REPOSITORY';

export interface CreateGuarantorPayload {
  creditApplicationId: number;
  personId: number;
  contractSignerId?: number | null;
  guarantorType: string;
  relationshipToApplicant?: string | null;
  isPrimaryGuarantor?: boolean;
  selectedAfterCreditCheck?: boolean;
  signatureUrl?: string | null;
  signatureDate?: Date | null;
}

export interface GuarantorRepositoryPort {
  findAll(): Promise<Guarantor[]>;
  findById(id: number): Promise<Guarantor | null>;
  findByExternalId(externalId: string): Promise<Guarantor | null>;
  findByCreditApplicationId(creditApplicationId: number): Promise<Guarantor[]>;
  findByPersonId(personId: number): Promise<Guarantor[]>;
  create(payload: CreateGuarantorPayload): Promise<Guarantor>;
}
