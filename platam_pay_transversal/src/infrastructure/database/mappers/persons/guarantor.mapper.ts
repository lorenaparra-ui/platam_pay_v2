import { Guarantor } from '@persons/domain/models/guarantor.model';
import type { CreateGuarantorPayload } from '@persons/domain/ports/guarantor.repository.port';
import { GuarantorEntity } from '@libs/database';

export class GuarantorMapper {
  static toDomain(entity: GuarantorEntity): Guarantor {
    return new Guarantor(
      Number(entity.id),
      entity.externalId,
      Number(entity.creditApplicationId),
      Number(entity.personId),
      entity.contractSignerId != null ? Number(entity.contractSignerId) : null,
      entity.guarantorType,
      entity.relationshipToApplicant,
      entity.isPrimaryGuarantor,
      entity.selectedAfterCreditCheck,
      entity.signatureUrl,
      entity.signatureDate,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(domain: Guarantor): GuarantorEntity {
    const entity = new GuarantorEntity();
    entity.id = domain.id;
    entity.creditApplicationId = domain.creditApplicationId;
    entity.personId = domain.personId;
    entity.contractSignerId = domain.contractSignerId;
    entity.guarantorType = domain.guarantorType;
    entity.relationshipToApplicant = domain.relationshipToApplicant;
    entity.isPrimaryGuarantor = domain.isPrimaryGuarantor;
    entity.selectedAfterCreditCheck = domain.selectedAfterCreditCheck;
    entity.signatureUrl = domain.signatureUrl;
    entity.signatureDate = domain.signatureDate;
    return entity;
  }

  static toCreateEntity(payload: CreateGuarantorPayload): GuarantorEntity {
    const entity = new GuarantorEntity();
    entity.creditApplicationId = payload.creditApplicationId;
    entity.personId = payload.personId;
    entity.contractSignerId = payload.contractSignerId ?? null;
    entity.guarantorType = payload.guarantorType;
    entity.relationshipToApplicant = payload.relationshipToApplicant ?? null;
    entity.isPrimaryGuarantor = payload.isPrimaryGuarantor ?? false;
    entity.selectedAfterCreditCheck =
      payload.selectedAfterCreditCheck ?? false;
    entity.signatureUrl = payload.signatureUrl ?? null;
    entity.signatureDate = payload.signatureDate ?? null;
    return entity;
  }
}
