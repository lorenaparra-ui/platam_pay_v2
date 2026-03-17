import type { CreditApplication } from "../models/credit-application.model";

export const CREDIT_APPLICATION_REPOSITORY = "CREDIT_APPLICATION_REPOSITORY";

/** Input para creación; sin id, externalId, createdAt, updatedAt (los asigna la persistencia). */
export type CreditApplicationCreateInput = Omit<
  CreditApplication,
  "id" | "externalId" | "createdAt" | "updatedAt"
>;

/** Input para actualización parcial. */
export type CreditApplicationUpdateInput =
  Partial<CreditApplicationCreateInput>;

export interface CreditApplicationRepositoryPort {
  findAll(): Promise<CreditApplication[]>;
  findById(id: number): Promise<CreditApplication | null>;
  findByExternalId(externalId: string): Promise<CreditApplication | null>;
  create(input: CreditApplicationCreateInput): Promise<CreditApplication>;
  updateByExternalId(
    externalId: string,
    input: CreditApplicationUpdateInput,
  ): Promise<CreditApplication | null>;
  deleteByExternalId(externalId: string): Promise<boolean>;
}
