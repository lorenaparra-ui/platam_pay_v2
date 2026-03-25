import type { ContractSigner } from "../models/contract-signer.model";

export const CONTRACT_SIGNER_REPOSITORY = Symbol("CONTRACT_SIGNER_REPOSITORY");

export interface CreateContractSignerInput {
  contractId?: number | null;
  personId?: number | null;
  providerSignerToken?: string | null;
  statusId: number;
  signUrl?: string | null;
  ipAddress?: string | null;
  geoLatitude?: string | null;
  geoLongitude?: string | null;
  signedAt?: Date | null;
  documentPhotoUrl?: string | null;
  documentVersePhotoUrl?: string | null;
  selfiePhotoUrl?: string | null;
  signatureImageUrl?: string | null;
}

export interface MarkContractSignerSignedInput {
  statusId: number;
  signedAt?: Date | null;
  signUrl?: string | null;
  ipAddress?: string | null;
  geoLatitude?: string | null;
  geoLongitude?: string | null;
  documentPhotoUrl?: string | null;
  documentVersePhotoUrl?: string | null;
  selfiePhotoUrl?: string | null;
  signatureImageUrl?: string | null;
}

export interface ContractSignerRepositoryPort {
  create(input: CreateContractSignerInput): Promise<ContractSigner>;
  findByContractId(contractId: number): Promise<ContractSigner | null>;
  findByProviderSignerToken(providerSignerToken: string): Promise<ContractSigner | null>;
  updateSignedByProviderToken(
    providerSignerToken: string,
    input: MarkContractSignerSignedInput,
  ): Promise<ContractSigner | null>;
}
