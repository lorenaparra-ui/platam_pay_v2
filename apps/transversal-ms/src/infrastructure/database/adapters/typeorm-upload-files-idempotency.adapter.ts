import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeormSqsIdempotencyBaseAdapter, UploadFilesIdempotencyEntity } from '@app/transversal-data';
import type {
  CachedUploadFilesResult,
  UploadFilesIdempotencyPort,
} from '@modules/transversal/domain/ports/storage/upload-files-idempotency.port';

@Injectable()
export class TypeormUploadFilesIdempotencyAdapter
  extends TypeormSqsIdempotencyBaseAdapter<
    UploadFilesIdempotencyEntity,
    CachedUploadFilesResult
  >
  implements UploadFilesIdempotencyPort
{
  constructor(
    @InjectRepository(UploadFilesIdempotencyEntity)
    repo: Repository<UploadFilesIdempotencyEntity>,
  ) {
    super(repo);
  }
}
