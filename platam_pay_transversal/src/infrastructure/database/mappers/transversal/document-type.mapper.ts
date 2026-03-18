import { DocumentTypeEntity } from '@libs/database';
import { DocumentType } from '@transversal/domain/models/document-type.model';

export class DocumentTypeMapper {
  static toDomain(entity: DocumentTypeEntity): DocumentType {
    return new DocumentType(
      entity.id,
      entity.externalId,
      entity.documentType,
      entity.documentType,
      true,
    );
  }

  static toEntity(domain: DocumentType): DocumentTypeEntity {
    const entity = new DocumentTypeEntity();
    entity.id = domain.id;
    entity.documentType = domain.name || domain.code;
    return entity;
  }
}