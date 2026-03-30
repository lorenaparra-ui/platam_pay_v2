import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client, type S3ClientConfig } from '@aws-sdk/client-s3';
import type { StoragePort } from '@modules/transversal/domain/ports/storage/storage.port';
import { StorageDomainError } from '@modules/transversal/domain/errors/storage.error';

const CONFIG_KEY = 'config.storage.s3';

@Injectable()
export class S3Adapter implements StoragePort {
  private readonly logger = new Logger(S3Adapter.name);
  private readonly client: S3Client;

  constructor(private readonly config_service: ConfigService) {
    const region =
      this.config_service.get<string>(`${CONFIG_KEY}.region`) ?? 'us-east-1';
    const init: S3ClientConfig = { region };
    this.client = new S3Client(init);
  }

  async upload(params: {
    bucket: string;
    file: Buffer;
    path: string;
    content_type?: string;
  }): Promise<string> {
    const bucket = params.bucket.trim();
    if (bucket.length === 0) {
      throw new StorageDomainError('STORAGE_INVALID_INPUT', 'bucket vacío');
    }
    const key = params.path.replace(/^\/+/, '');
    if (key.length === 0) {
      throw new StorageDomainError('STORAGE_INVALID_INPUT', 'path vacío');
    }
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: params.file,
          ContentType: params.content_type ?? 'application/octet-stream',
        }),
      );
      return this.resolve_public_url(bucket, key);
    } catch (error) {
      throw this.map_error(error, 'upload', bucket, key);
    }
  }

  private resolve_public_url(bucket: string, key: string): string {
    const public_base = this.config_service.get<string>(`${CONFIG_KEY}.public_base_url`);
    const trimmed =
      typeof public_base === 'string' && public_base.trim().length > 0
        ? public_base.trim().replace(/\/$/, '')
        : undefined;
    if (trimmed !== undefined) {
      return `${trimmed}/${key}`;
    }
    return `s3://${bucket}/${key}`;
  }

  private map_error(
    error: unknown,
    operation: string,
    bucket: string,
    key: string,
  ): StorageDomainError {
    if (error instanceof StorageDomainError) {
      return error;
    }
    const code = this.aws_error_code(error);
    let domain: StorageDomainError;
    if (code === 'AccessDenied' || code === 'Forbidden') {
      domain = new StorageDomainError(
        'STORAGE_ACCESS_DENIED',
        `Access denied during ${operation}`,
        error,
      );
    } else if (code === 'InvalidArgument' || code === 'InvalidRequest') {
      domain = new StorageDomainError(
        'STORAGE_INVALID_INPUT',
        `Invalid input during ${operation}`,
        error,
      );
    } else {
      domain = new StorageDomainError(
        'STORAGE_UNKNOWN',
        `Storage error during ${operation}`,
        error,
      );
    }
    this.logger.warn(
      `[UploadFiles][step=s3_adapter][bucket=${bucket}][key=${key}] operation=${operation} code=${domain.code}`,
    );
    return domain;
  }

  private aws_error_code(error: unknown): string | undefined {
    if (typeof error !== 'object' || error === null) {
      return undefined;
    }
    const e = error as { name?: string; Code?: string; code?: string };
    return e.name ?? e.Code ?? e.code;
  }
}
