import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { UserEntity } from '@app/transversal-data';
import { COLLECTIONS_SCHEMA } from '../collections-schema.constants';

@Entity({ name: 'collection_fee_rules', schema: COLLECTIONS_SCHEMA })
@Index('UQ_collection_fee_rules_days_overdue_valid_from', [
  'daysOverdue',
  'validFrom',
], { unique: true })
export class CollectionFeeRuleEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({
    name: 'external_id',
    type: 'uuid',
    unique: true,
    insert: false,
    update: false,
  })
  externalId: string;

  @Column({ name: 'days_overdue', type: 'int' })
  daysOverdue: number;

  @Column({
    name: 'fee_rate',
    type: 'decimal',
    precision: 8,
    scale: 6,
  })
  feeRate: string;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  createdBy: UserEntity;

  @RelationId((r: CollectionFeeRuleEntity) => r.createdBy)
  createdById: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    insert: false,
    update: false,
  })
  createdAt: Date;
}
