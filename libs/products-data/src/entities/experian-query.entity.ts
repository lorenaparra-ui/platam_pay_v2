import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { ExperianQueryStatus, ExperianQueryTypes } from '@platam/shared';
import { PersonEntity } from '@app/transversal-data';
import { BusinessEntity } from '@app/suppliers-data';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CreditApplicationEntity } from './credit-application.entity';

@Entity({ name: 'experian_queries', schema: 'products_schema' })
export class ExperianQueryEntity extends BaseExternalIdEntity {
  @ManyToOne(() => CreditApplicationEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'credit_application_id', referencedColumnName: 'id' })
  creditApplication: CreditApplicationEntity;

  @RelationId((q: ExperianQueryEntity) => q.creditApplication)
  creditApplicationId: number;

  @ManyToOne(() => PersonEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity | null;

  @RelationId((q: ExperianQueryEntity) => q.person)
  personId: number | null;

  @ManyToOne(() => BusinessEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  business: BusinessEntity | null;

  @RelationId((q: ExperianQueryEntity) => q.business)
  businessId: number | null;

  @Column({
    name: 'query_type',
    type: 'enum',
    enum: ExperianQueryTypes,
    enumName: 'experian_query_type',
  })
  queryType: ExperianQueryTypes;

  @Column({ name: 'credit_report', type: 'jsonb', nullable: true })
  creditReport: Record<string, unknown> | null;

  @Column({
    name: 'credit_score',
    type: 'decimal',
    precision: 8,
    scale: 2,
    nullable: true,
  })
  creditScore: string | null;

  @Column({ name: 'consulted_at', type: 'timestamptz' })
  consultedAt: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ExperianQueryStatus,
    enumName: 'experian_query_status',
    default: ExperianQueryStatus.PENDING,
  })
  status: ExperianQueryStatus;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;
}
