import { Column, Entity } from 'typeorm';
import { BaseSqsIdempotencyEntity } from './base-sqs-idempotency.entity';

export type UploadFilesIdempotencyResult = ReadonlyArray<
  Readonly<{ url: string; folder: string }>
>;

/**
 * Nota: la columna en BD se llama "result" desde la migración
 * `1890000000000-UploadFilesIdempotencyRenameResult` (antes "result_files").
 */
@Entity({ schema: 'transversal_schema', name: 'upload_files_idempotency' })
export class UploadFilesIdempotencyEntity extends BaseSqsIdempotencyEntity {
  @Column({ name: 'result', type: 'jsonb', nullable: true })
  override result!: UploadFilesIdempotencyResult | null;
}
