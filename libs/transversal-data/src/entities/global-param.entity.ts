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
import { UserEntity } from './user.entity';

@Entity({ name: 'global_params', schema: 'transversal_schema' })
@Index('UQ_global_params_code_valid_from', ['code', 'validFrom'], { unique: true })
export class GlobalParamEntity {
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

  @Column({ name: 'code', type: 'varchar', length: 100 })
  code: string;

  @Column({ name: 'value', type: 'jsonb' })
  value: unknown;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  createdBy: UserEntity;

  @RelationId((g: GlobalParamEntity) => g.createdBy)
  createdById: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    insert: false,
    update: false,
  })
  createdAt: Date;
}
