import type { Shareholder } from '../models/shareholder.model';

export const SHAREHOLDER_REPOSITORY = 'SHAREHOLDER_REPOSITORY';

export interface CreateShareholderPayload {
  companyId: number;
  personId: number;
  ownershipPercentage?: string | null;
  evaluationOrder?: number | null;
  creditCheckRequired?: boolean;
  creditCheckCompleted?: boolean;
  isLegalRepresentative?: boolean;
}

export interface ShareholderRepositoryPort {
  findAll(): Promise<Shareholder[]>;
  findById(id: number): Promise<Shareholder | null>;
  findByExternalId(externalId: string): Promise<Shareholder | null>;
  findByCompanyId(companyId: number): Promise<Shareholder[]>;
  findByPersonId(personId: number): Promise<Shareholder[]>;
  create(payload: CreateShareholderPayload): Promise<Shareholder>;
}
