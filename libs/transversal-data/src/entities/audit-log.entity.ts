import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { ActionType, EntityType } from '@platam/shared';
import { UserEntity } from './user.entity';

@Entity({ name: 'audit_logs', schema: 'transversal_schema' })
@Index('IDX_audit_logs_entity_type_entity_id', ['entityType', 'entityId'])
@Index('IDX_audit_logs_performed_at', ['performedAt'])
export class AuditLogEntity {
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

  @Column({
    name: 'entity_type',
    type: 'enum',
    enum: EntityType,
    enumName: 'audit_log_entity_type',
  })
  entityType: EntityType;

  @Column({ name: 'entity_id', type: 'bigint' })
  entityId: number;

  @Column({
    name: 'action',
    type: 'enum',
    enum: ActionType,
    enumName: 'audit_log_action_type',
  })
  action: ActionType;

  @Column({ name: 'field_name', type: 'varchar', length: 100, nullable: true })
  fieldName: string | null;

  @Column({ name: 'old_value', type: 'jsonb', nullable: true })
  oldValue: unknown | null;

  @Column({ name: 'new_value', type: 'jsonb', nullable: true })
  newValue: unknown | null;

  @Column({ name: 'reason_code', type: 'varchar', length: 100, nullable: true })
  reasonCode: string | null;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string | null;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'performed_by', referencedColumnName: 'id' })
  performedBy: UserEntity;

  @RelationId((a: AuditLogEntity) => a.performedBy)
  performedById: number;

  @Column({ name: 'performed_at', type: 'timestamptz' })
  performedAt: Date;
}
