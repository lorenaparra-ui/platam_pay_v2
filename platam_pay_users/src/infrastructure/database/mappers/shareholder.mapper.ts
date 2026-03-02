import { Shareholder } from 'src/modules/persons/domain/models/shareholder.model';
import type { CreateShareholderPayload } from 'src/modules/persons/domain/ports/shareholder.repository.port';
import { ShareholderEntity } from '../entities/shareholder.entity';

export class ShareholderMapper {
  static toDomain(entity: ShareholderEntity): Shareholder {
    const ownershipPercentage =
      entity.ownershipPercentage != null
        ? String(entity.ownershipPercentage)
        : null;
    return new Shareholder(
      Number(entity.id),
      entity.externalId,
      Number(entity.companyId),
      Number(entity.personId),
      ownershipPercentage,
      entity.evaluationOrder,
      entity.creditCheckRequired,
      entity.creditCheckCompleted,
      entity.isLegalRepresentative,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: Shareholder): ShareholderEntity {
    const entity = new ShareholderEntity();
    entity.id = domain.id;
    entity.companyId = domain.companyId;
    entity.personId = domain.personId;
    entity.ownershipPercentage = domain.ownershipPercentage;
    entity.evaluationOrder = domain.evaluationOrder;
    entity.creditCheckRequired = domain.creditCheckRequired;
    entity.creditCheckCompleted = domain.creditCheckCompleted;
    entity.isLegalRepresentative = domain.isLegalRepresentative;
    return entity;
  }

  static toCreateEntity(payload: CreateShareholderPayload): ShareholderEntity {
    const entity = new ShareholderEntity();
    entity.companyId = payload.companyId;
    entity.personId = payload.personId;
    entity.ownershipPercentage = payload.ownershipPercentage ?? null;
    entity.evaluationOrder = payload.evaluationOrder ?? null;
    entity.creditCheckRequired = payload.creditCheckRequired ?? false;
    entity.creditCheckCompleted = payload.creditCheckCompleted ?? false;
    entity.isLegalRepresentative = payload.isLegalRepresentative ?? false;
    return entity;
  }
}
