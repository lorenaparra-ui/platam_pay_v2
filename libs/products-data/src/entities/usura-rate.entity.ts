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
import { UsuraRateType } from '@platam/shared';
import { UserEntity } from '@app/transversal-data';

@Entity({ name: 'usura_rates', schema: 'products_schema' })
@Index('UQ_usura_rates_category_valid_from', ['category', 'validFrom'], {
  unique: true,
})
export class UsuraRateEntity {
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
    name: 'category',
    type: 'enum',
    enum: UsuraRateType,
    enumName: 'usura_rate_type',
  })
  category: UsuraRateType;

  @Column({
    name: 'rate_ea',
    type: 'decimal',
    precision: 8,
    scale: 6,
  })
  rateEa: string;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @Column({ name: 'resolution', type: 'varchar', length: 100, nullable: true })
  resolution: string | null;

  @ManyToOne(() => UserEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  createdBy: UserEntity;

  @RelationId((r: UsuraRateEntity) => r.createdBy)
  createdById: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    insert: false,
    update: false,
  })
  createdAt: Date;
}
