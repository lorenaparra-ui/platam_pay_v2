import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity('documents')
export class DocumentTypeEntity extends BaseExternalIdEntity {
  @Column({ name: 'document_type', type: 'varchar' })
  documentType: string;
}