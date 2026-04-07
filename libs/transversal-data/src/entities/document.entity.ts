import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseExternalIdEntity } from '../../../products-data/src/entities/base-external-id.entity';
import { CreditApplicationEntity } from '../../../products-data/src/entities/credit-application.entity';

@Entity({ name: 'documents', schema: 'transversal_schema' })
export class DocumentEntity extends BaseExternalIdEntity {
  @Column({ name: 'document_type', type: 'varchar', length: 100 })
  documentType: string;

  @Column({ name: 'document_url', type: 'text' })
  documentUrl: string;

  @ManyToOne(() => CreditApplicationEntity, { nullable: true })
  @JoinColumn({ name: 'credit_application_id', referencedColumnName: 'id' })
  creditApplication: CreditApplicationEntity | null;

  @RelationId((d: DocumentEntity) => d.creditApplication)
  creditApplicationId: number | null;
}
