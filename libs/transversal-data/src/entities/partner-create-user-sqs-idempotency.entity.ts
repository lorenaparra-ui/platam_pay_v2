import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'transversal_schema', name: 'partner_create_user_sqs_idempotency' })
export class PartnerCreateUserSqsIdempotencyEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'idempotency_key', type: 'varchar', length: 512, unique: true })
  idempotency_key!: string;

  @Column({ name: 'correlation_id', type: 'uuid' })
  correlation_id!: string;

  @Column({ name: 'result', type: 'jsonb', nullable: true })
  result!: { user_external_id: string; person_external_id: string } | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;
}
