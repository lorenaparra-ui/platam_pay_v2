import { Column, Entity } from 'typeorm';
import { BaseExternalIdEntity } from './base-external-id.entity';

/**
 * Plantilla de contrato versionada (products_schema.contract_templates).
 * Agrupación lógica por template_family_key (sin tabla de familias).
 */
@Entity({ name: 'contract_templates', schema: 'products_schema' })
export class ContractTemplateEntity extends BaseExternalIdEntity {
  @Column({ name: 'template_family_key', type: 'varchar', length: 120 })
  templateFamilyKey: string;

  @Column({ name: 'version', type: 'int' })
  version: number;

  @Column({ name: 'effective_from', type: 'timestamptz', nullable: true })
  effectiveFrom: Date | null;

  @Column({ name: 'effective_to', type: 'timestamptz', nullable: true })
  effectiveTo: Date | null;

  @Column({
    name: 'zapsign_template_ref',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  zapsignTemplateRef: string | null;

  @Column({ name: 'status_id', type: 'bigint' })
  statusId: number;
}
