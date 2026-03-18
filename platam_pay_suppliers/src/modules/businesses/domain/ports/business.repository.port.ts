import { Business } from '../models/business.model';

export const BUSINESS_REPOSITORY = 'BUSINESS_REPOSITORY';

export interface CreateBusinessPayload {
  userId: number;
  cityId?: number | null;
  entityType: 'PN' | 'PJ';
  businessName?: string | null;
  businessAddress?: string | null;
  businessType?: string | null;
  relationshipToBusiness?: string | null;
  legalName?: string | null;
  tradeName?: string | null;
  taxId?: string | null;
  yearOfEstablishment?: number | null;
}

export type UpdateBusinessPayload = Partial<CreateBusinessPayload>;

export interface BusinessRepositoryPort {
  findAll(): Promise<Business[]>;
  findById(id: number): Promise<Business | null>;
  findByExternalId(externalId: string): Promise<Business | null>;
  create(payload: CreateBusinessPayload): Promise<Business>;
  updateByExternalId(
    externalId: string,
    payload: UpdateBusinessPayload,
  ): Promise<Business | null>;
  deleteByExternalId(externalId: string): Promise<boolean>;
}
