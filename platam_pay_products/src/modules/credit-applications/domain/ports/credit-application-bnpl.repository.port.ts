import type { CreditApplicationBnpl } from "../models/credit-application-bnpl.model";

export const CREDIT_APPLICATION_BNPL_REPOSITORY =
  "CREDIT_APPLICATION_BNPL_REPOSITORY";

/** Input para creación; sin id, externalId, createdAt, updatedAt (los asigna la persistencia). */
export type CreditApplicationBnplCreateInput = Omit<
  CreditApplicationBnpl,
  "id" | "externalId" | "createdAt" | "updatedAt"
>;

/** Input para actualización parcial. */
export type CreditApplicationBnplUpdateInput =
  Partial<CreditApplicationBnplCreateInput>;

export interface CreditApplicationBnplRepositoryPort {
  findAll(): Promise<CreditApplicationBnpl[]>;
  findById(id: number): Promise<CreditApplicationBnpl | null>;
  findByExternalId(externalId: string): Promise<CreditApplicationBnpl | null>;
  create(
    input: CreditApplicationBnplCreateInput,
  ): Promise<CreditApplicationBnpl>;
  updateByExternalId(
    externalId: string,
    input: CreditApplicationBnplUpdateInput,
  ): Promise<CreditApplicationBnpl | null>;
  deleteByExternalId(externalId: string): Promise<boolean>;
}
