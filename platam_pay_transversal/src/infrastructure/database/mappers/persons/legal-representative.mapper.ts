import { LegalRepresentative } from '@persons/domain/models/legal-representative.model';
import type { CreateLegalRepresentativePayload } from '@persons/domain/ports/legal-representative.repository.port';
import { LegalRepresentativeEntity } from '@libs/database';

export class LegalRepresentativeMapper {
  static toDomain(entity: LegalRepresentativeEntity): LegalRepresentative {
    return new LegalRepresentative(
      Number(entity.id),
      entity.externalId,
      Number(entity.companyId),
      Number(entity.personId),
      entity.isPrimary,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: LegalRepresentative): LegalRepresentativeEntity {
    const entity = new LegalRepresentativeEntity();
    entity.id = domain.id;
    entity.companyId = domain.companyId;
    entity.personId = domain.personId;
    entity.isPrimary = domain.isPrimary;
    return entity;
  }

  static toCreateEntity(
    payload: CreateLegalRepresentativePayload,
  ): LegalRepresentativeEntity {
    const entity = new LegalRepresentativeEntity();
    entity.companyId = payload.companyId;
    entity.personId = payload.personId;
    entity.isPrimary = payload.isPrimary ?? true;
    return entity;
  }
}
