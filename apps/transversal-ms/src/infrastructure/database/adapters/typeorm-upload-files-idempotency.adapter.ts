import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import type {
  CachedUploadFilesResult,
  UploadFilesIdempotencyPort,
  UploadIdempotencyBeginResult,
} from '@modules/transversal/domain/ports/storage/upload-files-idempotency.port';
import { UploadFilesIdempotencyEntity } from '@app/transversal-data';

const PG_UNIQUE_VIOLATION = '23505';
const STALE_PROCESSING_MS = 30 * 60 * 1000;

@Injectable()
export class TypeormUploadFilesIdempotencyAdapter implements UploadFilesIdempotencyPort {
  constructor(
    @InjectRepository(UploadFilesIdempotencyEntity)
    private readonly repo: Repository<UploadFilesIdempotencyEntity>,
  ) {}

  async begin(key: string, correlation_id: string): Promise<UploadIdempotencyBeginResult> {
    const row = this.repo.create({
      idempotency_key: key,
      correlation_id,
      result_files: null,
    });
    try {
      await this.repo.save(row);
      return { status: 'proceed' };
    } catch (err: unknown) {
      if (!this.is_unique_violation(err)) {
        throw err;
      }
    }
    const existing = await this.repo.findOne({
      where: { idempotency_key: key },
    });
    if (existing === null) {
      return { status: 'conflict' };
    }
    if (existing.result_files !== null) {
      return {
        status: 'duplicate',
        result: { files: existing.result_files },
      };
    }
    const age_ms = Date.now() - existing.created_at.getTime();
    if (age_ms > STALE_PROCESSING_MS) {
      await this.repo.delete({ idempotency_key: key });
      return this.begin(key, correlation_id);
    }
    return { status: 'conflict' };
  }

  async complete(key: string, result: CachedUploadFilesResult): Promise<void> {
    await this.repo.update(
      { idempotency_key: key },
      { result_files: [...result.files] },
    );
  }

  async release(key: string): Promise<void> {
    await this.repo.delete({ idempotency_key: key });
  }

  private is_unique_violation(err: unknown): boolean {
    return err instanceof QueryFailedError && err.driverError !== undefined
      ? String((err.driverError as { code?: string }).code) === PG_UNIQUE_VIOLATION
      : false;
  }
}
