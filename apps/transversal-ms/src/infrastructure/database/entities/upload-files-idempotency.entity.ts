import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'transversal_schema', name: 'upload_files_idempotency' })
export class UploadFilesIdempotencyEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'idempotency_key', type: 'varchar', length: 512, unique: true })
  idempotency_key!: string;

  @Column({ name: 'correlation_id', type: 'uuid' })
  correlation_id!: string;

  @Column({ name: 'result_files', type: 'jsonb', nullable: true })
  result_files!: { url: string; folder: string }[] | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at!: Date;
}
