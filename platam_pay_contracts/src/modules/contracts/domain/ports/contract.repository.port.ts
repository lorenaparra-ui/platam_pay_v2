import type { Contract } from "../models/contract.model";

export const CONTRACT_REPOSITORY = Symbol("CONTRACT_REPOSITORY");

export interface CreateContractInput {
  userId: number;
  applicationId?: number | null;
  providerToken?: string | null;
  statusId: number;
  originalFileUrl?: string | null;
  signedFileUrl?: string | null;
  formAnswersJson?: Record<string, unknown> | null;
}

export interface MarkContractSignedInput {
  signedFileUrl?: string | null;
  formAnswersJson?: Record<string, unknown> | null;
  statusId: number;
}

export interface ContractRepositoryPort {
  create(input: CreateContractInput): Promise<Contract>;
  findByExternalId(externalId: string): Promise<Contract | null>;
  findByProviderToken(providerToken: string): Promise<Contract | null>;
  updateSignedDataById(
    id: number,
    input: MarkContractSignedInput,
  ): Promise<Contract | null>;
  updateStatusById(id: number, statusId: number): Promise<Contract | null>;
}
