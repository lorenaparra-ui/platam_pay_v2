import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { StoragePort } from '@modules/transversal/domain/ports/storage/storage.port';
import type { RemoteFileFetchPort } from '@modules/transversal/domain/ports/storage/remote-file-fetch.port';
import { REMOTE_FILE_FETCH_PORT, STORAGE_PORT } from '@modules/transversal/transversal.tokens';
import { UploadFilesValidationError } from '../../exceptions/upload-files.validation.error';
import {
  decode_file_input,
  extension_for_content_type,
} from '../../services/file-input.decoder';

export type UploadFilesItemInput = Readonly<{
  raw_file: string;
  folder: string;
}>;

export type UploadFilesCommand = Readonly<{
  correlation_id: string;
  idempotency_key: string;
  bucket: string;
  files: ReadonlyArray<UploadFilesItemInput>;
}>;

export type UploadedFileResult = Readonly<{
  url: string;
  folder: string;
}>;

@Injectable()
export class UploadFilesUseCase {
  private readonly logger = new Logger(UploadFilesUseCase.name);

  constructor(
    @Inject(STORAGE_PORT)
    private readonly storage: StoragePort,
    @Inject(REMOTE_FILE_FETCH_PORT)
    private readonly remote_fetch: RemoteFileFetchPort,
  ) {}

  async execute(command: UploadFilesCommand): Promise<ReadonlyArray<UploadedFileResult>> {
    const bucket = command.bucket.trim();
    if (bucket.length === 0) {
      throw new UploadFilesValidationError('bucket inválido', 'BUCKET_INVALID');
    }
    if (command.files.length === 0) {
      throw new UploadFilesValidationError('debe enviarse al menos un archivo', 'FILES_NONE');
    }

    const results: UploadedFileResult[] = [];

    for (let index = 0; index < command.files.length; index += 1) {
      const item = command.files[index];
      const folder = this.sanitize_folder(item.folder);
      if (folder.length === 0) {
        throw new UploadFilesValidationError(
          `folder inválido en índice ${index}`,
          'FOLDER_INVALID',
        );
      }

      const { buffer, content_type } = await decode_file_input(item.raw_file, this.remote_fetch);
      const ext = extension_for_content_type(content_type);
      const object_name = `${randomUUID()}${ext}`;
      const path = `${folder}/${object_name}`;

      this.logger.log(
        `[UploadFiles][correlationId=${command.correlation_id}][step=upload][index=${index}][path=${path}]`,
      );

      const url = await this.storage.upload({
        bucket,
        file: buffer,
        path,
        content_type,
      });

      results.push({ url, folder: item.folder.trim() });
    }

    return results;
  }

  private sanitize_folder(raw: string): string {
    const trimmed = raw.trim().replace(/\\/g, '/');
    const segments = trimmed
      .split('/')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const safe: string[] = [];
    for (const seg of segments) {
      if (seg === '..' || seg === '.') {
        return '';
      }
      const part = seg
        .replace(/[^a-zA-Z0-9._-]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 120);
      if (part.length === 0) {
        return '';
      }
      safe.push(part);
    }
    return safe.join('/');
  }
}
