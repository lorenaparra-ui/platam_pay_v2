import { Column, Entity, ManyToOne } from 'typeorm';
import { ContractCatalogStatus } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { ContractTemplateEntity } from './contract-template.entity';

@Entity({ name: 'contracts', schema: 'products_schema' })
export class ContractEntity extends BaseExternalIdEntity {
  @Column({ name: 'user_id', type: 'bigint', nullable: true })
  userId: number | null;

  @ManyToOne(() => ContractTemplateEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @Column({ name: 'contract_template_id', type: 'bigint', nullable: true })
  contractTemplate: ContractTemplateEntity | null;

  @Column({ name: 'zapsign_token', type: 'varchar', nullable: true, unique: true })
  zapsignToken: string | null;
  
  @Column({ name: 'original_file_url', type: 'text', nullable: true })
  originalFileUrl: string | null;

  @Column({ name: 'signed_file_url', type: 'text', nullable: true })
  signedFileUrl: string | null;

  @Column({ name: 'form_answers_json', type: 'jsonb', nullable: true })
  formAnswersJson: Record<string, unknown> | null;
  
  @Column({
    name: 'state',
    type: 'enum',
    enum: ContractCatalogStatus,
    enumName: 'contract_catalog_status',
    default: ContractCatalogStatus.PENDING,
  })
  state: ContractCatalogStatus;

}
