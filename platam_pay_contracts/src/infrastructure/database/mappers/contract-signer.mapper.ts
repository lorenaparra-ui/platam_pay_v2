import { ContractSignerEntity } from "@libs/database";
import type {
  CreateContractSignerInput,
  MarkContractSignerSignedInput,
} from "@contracts/domain/ports/contract-signer.repository.port";
import type { ContractSigner } from "@contracts/domain/models/contract-signer.model";

export class ContractSignerMapper {
  static toDomain(entity: ContractSignerEntity): ContractSigner {
    return {
      id: Number(entity.id),
      externalId: entity.externalId,
      contractId: entity.contractId != null ? Number(entity.contractId) : null,
      personId: entity.personId != null ? Number(entity.personId) : null,
      providerSignerToken: entity.zapsignSignerToken,
      statusId: Number(entity.statusId),
      signUrl: entity.signUrl,
      ipAddress: entity.ipAddress,
      geoLatitude: entity.geoLatitude,
      geoLongitude: entity.geoLongitude,
      signedAt: entity.signedAt,
      documentPhotoUrl: entity.documentPhotoUrl,
      documentVersePhotoUrl: entity.documentVersePhotoUrl,
      selfiePhotoUrl: entity.selfiePhotoUrl,
      signatureImageUrl: entity.signatureImageUrl,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toCreateEntity(input: CreateContractSignerInput): ContractSignerEntity {
    const entity = new ContractSignerEntity();
    entity.contractId = input.contractId ?? null;
    entity.personId = input.personId ?? null;
    entity.zapsignSignerToken = input.providerSignerToken ?? null;
    entity.statusId = input.statusId;
    entity.signUrl = input.signUrl ?? null;
    entity.ipAddress = input.ipAddress ?? null;
    entity.geoLatitude = input.geoLatitude ?? null;
    entity.geoLongitude = input.geoLongitude ?? null;
    entity.signedAt = input.signedAt ?? null;
    entity.documentPhotoUrl = input.documentPhotoUrl ?? null;
    entity.documentVersePhotoUrl = input.documentVersePhotoUrl ?? null;
    entity.selfiePhotoUrl = input.selfiePhotoUrl ?? null;
    entity.signatureImageUrl = input.signatureImageUrl ?? null;
    return entity;
  }

  static applySignedData(
    entity: ContractSignerEntity,
    input: MarkContractSignerSignedInput,
  ): ContractSignerEntity {
    entity.statusId = input.statusId;
    if (input.signedAt !== undefined) {
      entity.signedAt = input.signedAt;
    }
    if (input.signUrl !== undefined) {
      entity.signUrl = input.signUrl;
    }
    if (input.ipAddress !== undefined) {
      entity.ipAddress = input.ipAddress;
    }
    if (input.geoLatitude !== undefined) {
      entity.geoLatitude = input.geoLatitude;
    }
    if (input.geoLongitude !== undefined) {
      entity.geoLongitude = input.geoLongitude;
    }
    if (input.documentPhotoUrl !== undefined) {
      entity.documentPhotoUrl = input.documentPhotoUrl;
    }
    if (input.documentVersePhotoUrl !== undefined) {
      entity.documentVersePhotoUrl = input.documentVersePhotoUrl;
    }
    if (input.selfiePhotoUrl !== undefined) {
      entity.selfiePhotoUrl = input.selfiePhotoUrl;
    }
    if (input.signatureImageUrl !== undefined) {
      entity.signatureImageUrl = input.signatureImageUrl;
    }
    return entity;
  }
}
