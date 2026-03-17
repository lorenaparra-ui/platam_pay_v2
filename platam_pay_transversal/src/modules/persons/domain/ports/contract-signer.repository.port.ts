import type { ContractSigner } from '../models/contract-signer.model';

export const CONTRACT_SIGNER_REPOSITORY = 'CONTRACT_SIGNER_REPOSITORY';

export interface CreateContractSignerPayload {
  contractId?: number | null;
  personId?: number | null;
  zapsignSignerToken?: string | null;
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

export interface ContractSignerRepositoryPort {
  findAll(): Promise<ContractSigner[]>;
  findById(id: number): Promise<ContractSigner | null>;
  findByExternalId(externalId: string): Promise<ContractSigner | null>;
  findByContractId(contractId: number): Promise<ContractSigner[]>;
  findByPersonId(personId: number): Promise<ContractSigner[]>;
  create(payload: CreateContractSignerPayload): Promise<ContractSigner>;
}
