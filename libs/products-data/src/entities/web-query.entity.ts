import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { WebQueryType } from '@platam/shared';
import { PersonEntity } from '@app/transversal-data';
import { BaseExternalIdEntity } from './base-external-id.entity';
import { CreditApplicationEntity } from './credit-application.entity';

@Entity({ name: 'web_queries', schema: 'products_schema' })
export class WebQueryEntity extends BaseExternalIdEntity {
  @ManyToOne(() => CreditApplicationEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'credit_application_id', referencedColumnName: 'id' })
  creditApplication: CreditApplicationEntity;

  @RelationId((q: WebQueryEntity) => q.creditApplication)
  creditApplicationId: number;

  @Column({
    name: 'query_type',
    type: 'enum',
    enum: WebQueryType,
    enumName: 'web_query_type',
  })
  queryType: WebQueryType;

  @ManyToOne(() => PersonEntity, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'person_id', referencedColumnName: 'id' })
  person: PersonEntity | null;

  @RelationId((q: WebQueryEntity) => q.person)
  personId: number | null;

  @Column({ name: 'consulted_at', type: 'timestamptz' })
  consultedAt: Date;

  @Column({ name: 'query_result', type: 'jsonb', nullable: true })
  queryResult: Record<string, unknown> | null;
}
