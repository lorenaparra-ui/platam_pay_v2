import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { SarlaftCheckStatus } from '@platam/shared';
import { PersonEntity } from '@app/transversal-data';
import { BusinessEntity } from '@app/suppliers-data';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CreditApplicationEntity } from './credit-application.entity';

@Entity({ name: 'sarlaft_checks', schema: 'products_schema' })
export class SarlaftCheckEntity extends BaseExternalIdEntity {
  @ManyToOne(() => CreditApplicationEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'credit_application_id', referencedColumnName: 'id' })
  creditApplication: CreditApplicationEntity;

  @RelationId((r: SarlaftCheckEntity) => r.creditApplication)
  creditApplicationId: number;

  @ManyToOne(() => PersonEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity;

  @RelationId((r: SarlaftCheckEntity) => r.person)
  personId: number;

  @ManyToOne(() => BusinessEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity | null;

  @RelationId((r: SarlaftCheckEntity) => r.business)
  businessId: number | null;

  @Column({ name: 'has_match', type: 'boolean' })
  hasMatch: boolean;

  @Column({
    name: 'status',
    type: 'enum',
    enum: SarlaftCheckStatus,
    enumName: 'sarlaft_check_status',
    default: SarlaftCheckStatus.PENDING,
  })
  status: SarlaftCheckStatus;

  @Column({ name: 'consulted_at', type: 'timestamptz' })
  consultedAt: Date;

  @Column({ name: 'sources', type: 'jsonb', nullable: true })
  sources: Record<string, unknown> | null;

  @Column({ name: 'detail', type: 'text', nullable: true })
  detail: string | null;
}
