import type { LegalRepresentative } from '../models/legal-representative.model';

export const LEGAL_REPRESENTATIVE_REPOSITORY = 'LEGAL_REPRESENTATIVE_REPOSITORY';

export interface CreateLegalRepresentativePayload {
  companyId: number;
  personId: number;
  isPrimary?: boolean;
}

export interface LegalRepresentativeRepositoryPort {
  findAll(): Promise<LegalRepresentative[]>;
  findById(id: number): Promise<LegalRepresentative | null>;
  findByExternalId(externalId: string): Promise<LegalRepresentative | null>;
  findByCompanyId(companyId: number): Promise<LegalRepresentative[]>;
  findByPersonId(personId: number): Promise<LegalRepresentative[]>;
  create(payload: CreateLegalRepresentativePayload): Promise<LegalRepresentative>;
}
