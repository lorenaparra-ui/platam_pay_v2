import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';

@Entity({ name: 'documents', schema: 'transversal_schema' })
export class DocumentTypeEntity extends BaseExternalIdEntity {
  @Column({ name: 'document_type', type: 'varchar' })
  documentType: string;
}
