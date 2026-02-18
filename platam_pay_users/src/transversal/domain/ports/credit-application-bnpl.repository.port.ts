import { CreditApplicationBnpl } from '../models/credit-application-bnpl.model';

export const CREDIT_APPLICATION_BNPL_REPOSITORY =
  'CREDIT_APPLICATION_BNPL_REPOSITORY';

export interface CreditApplicationBnplRepositoryPort {
  findAll(): Promise<CreditApplicationBnpl[]>;
  findById(id: number): Promise<CreditApplicationBnpl | null>;
  findByExternalId(externalId: string): Promise<CreditApplicationBnpl | null>;
}
