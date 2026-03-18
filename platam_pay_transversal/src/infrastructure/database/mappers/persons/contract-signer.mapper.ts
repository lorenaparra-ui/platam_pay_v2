import { ContractSigner } from '@persons/domain/models/contract-signer.model';
import type { CreateContractSignerPayload } from '@persons/domain/ports/contract-signer.repository.port';
import { ContractSignerEntity } from '@libs/database';

export class ContractSignerMapper {
  static toDomain(entity: ContractSignerEntity): ContractSigner {
    return new ContractSigner(
      Number(entity.id),
      entity.externalId,
      entity.contractId != null ? Number(entity.contractId) : null,
      entity.personId != null ? Number(entity.personId) : null,
      entity.zapsignSignerToken,
      Number(entity.statusId),
      entity.signUrl,
      entity.ipAddress,
      entity.geoLatitude,
      entity.geoLongitude,
      entity.signedAt,
      entity.documentPhotoUrl,
      entity.documentVersePhotoUrl,
      entity.selfiePhotoUrl,
      entity.signatureImageUrl,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: ContractSigner): ContractSignerEntity {
    const entity = new ContractSignerEntity();
    entity.id = domain.id;
    entity.contractId = domain.contractId;
    entity.personId = domain.personId;
    entity.zapsignSignerToken = domain.zapsignSignerToken;
    entity.statusId = domain.statusId;
    entity.signUrl = domain.signUrl;
    entity.ipAddress = domain.ipAddress;
    entity.geoLatitude = domain.geoLatitude;
    entity.geoLongitude = domain.geoLongitude;
    entity.signedAt = domain.signedAt;
    entity.documentPhotoUrl = domain.documentPhotoUrl;
    entity.documentVersePhotoUrl = domain.documentVersePhotoUrl;
    entity.selfiePhotoUrl = domain.selfiePhotoUrl;
    entity.signatureImageUrl = domain.signatureImageUrl;
    return entity;
  }

  static toCreateEntity(
    payload: CreateContractSignerPayload,
  ): ContractSignerEntity {
    const entity = new ContractSignerEntity();
    entity.contractId = payload.contractId ?? null;
    entity.personId = payload.personId ?? null;
    entity.zapsignSignerToken = payload.zapsignSignerToken ?? null;
    entity.statusId = payload.statusId;
    entity.signUrl = payload.signUrl ?? null;
    entity.ipAddress = payload.ipAddress ?? null;
    entity.geoLatitude = payload.geoLatitude ?? null;
    entity.geoLongitude = payload.geoLongitude ?? null;
    entity.signedAt = payload.signedAt ?? null;
    entity.documentPhotoUrl = payload.documentPhotoUrl ?? null;
    entity.documentVersePhotoUrl = payload.documentVersePhotoUrl ?? null;
    entity.selfiePhotoUrl = payload.selfiePhotoUrl ?? null;
    entity.signatureImageUrl = payload.signatureImageUrl ?? null;
    return entity;
  }
}
