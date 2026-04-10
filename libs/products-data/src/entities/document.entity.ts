import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { DocumentVerificationStatus } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CreditApplicationEntity } from './credit-application.entity';

@Entity({ name: 'documents', schema: 'products_schema' })
export class DocumentEntity extends BaseExternalIdEntity {
  @Column({ name: 'document_type', type: 'varchar', length: 100 })
  documentType: string;

  @Column({ name: 'document_url', type: 'text' })
  documentUrl: string;

  @Column({
    name: 'verification_status',
    type: 'enum',
    enum: DocumentVerificationStatus,
    enumName: 'document_verification_status',
    nullable: true,
  })
  verificationStatus: DocumentVerificationStatus | null;

  @ManyToOne(() => CreditApplicationEntity, { nullable: true })
  @JoinColumn({ name: 'credit_application_id', referencedColumnName: 'id' })
  creditApplication: CreditApplicationEntity | null;

  @RelationId((d: DocumentEntity) => d.creditApplication)
  creditApplicationId: number | null;
}
