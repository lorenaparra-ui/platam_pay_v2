import { Column, Entity } from 'typeorm';
import { ContractTemplateCatalogStatus } from '@platam/shared';
import { BaseExternalIdEntity } from './base-external-id.entity';

@Entity({ name: 'contract_templates', schema: 'products_schema' })
export class ContractTemplateEntity extends BaseExternalIdEntity {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  @Column({ 
    name: 'template_url', 
    type: 'text', 
    nullable: false, 
    comment: 'URL del template en S3' 
  })
  templateUrl: string;

  @Column({ name: 'version', type: 'varchar', length: 50, nullable: true })
  version: string | null;

  @Column({
    name: 'state',
    type: 'enum',
    enum: ContractTemplateCatalogStatus,
    enumName: 'credit_facility_state',
    default: ContractTemplateCatalogStatus.ACTIVE,
  })
  state: ContractTemplateCatalogStatus;
}
