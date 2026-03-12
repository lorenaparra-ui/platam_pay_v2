import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type {
  UploadFilePayload,
  UploadFileResult,
  GetSignedUrlOptions,
  FileStoragePort,
} from '@transversal/domain/ports/storage/file-storage.port';
import { StorageDomainError } from '@transversal/domain/errors/storage.error';
import { S3ConfigService } from './s3.config';

@Injectable()
export class S3StorageAdapter implements FileStoragePort {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(private readonly s3Config: S3ConfigService) {
    const config = this.s3Config.getConfig();
    this.bucket = config.bucket;
    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      forcePathStyle: config.force_path_style,
      credentials: config.credentials
        ? {
            accessKeyId: config.credentials.access_key_id,
            secretAccessKey: config.credentials.secret_access_key,
          }
        : undefined,
    });
  }

  async upload(payload: UploadFilePayload): Promise<UploadFileResult> {
    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: payload.key,
          Body: payload.body,
          ContentType: payload.content_type,
          Metadata: payload.metadata,
        }),
      );
      const location = `s3://${this.bucket}/${payload.key}`;
      return { key: payload.key, location };
    } catch (error) {
      throw this.mapError(error, 'upload');
    }
  }

  async download(key: string): Promise<Buffer> {
    try {
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
      const body = response.Body;
      if (!body) {
        throw new StorageDomainError('STORAGE_NOT_FOUND', `Object not found: ${key}`);
      }
      const chunks: Uint8Array[] = [];
      for await (const chunk of body as AsyncIterable<Uint8Array>) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    } catch (error) {
      throw this.mapError(error, 'download');
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: key,
        }),
      );
    } catch (error) {
      throw this.mapError(error, 'delete');
    }
  }

  async getSignedUrl(options: GetSignedUrlOptions): Promise<string> {
    try {
      const method = options.method ?? 'GET';
      const command =
        method === 'GET'
          ? new GetObjectCommand({
              Bucket: this.bucket,
              Key: options.key,
            })
          : new PutObjectCommand({
              Bucket: this.bucket,
              Key: options.key,
            });
      const url = await getSignedUrl(this.client, command, {
        expiresIn: options.expires_in_seconds,
      });
      return url;
    } catch (error) {
      throw this.mapError(error, 'getSignedUrl');
    }
  }

  private mapError(error: unknown, operation: string): StorageDomainError {
    if (error instanceof StorageDomainError) {
      return error;
    }
    const code = this.getAwsErrorCode(error);
    if (code === 'NoSuchKey' || code === 'NotFound') {
      return new StorageDomainError(
        'STORAGE_NOT_FOUND',
        `Object not found during ${operation}`,
        error,
      );
    }
    if (
      code === 'AccessDenied' ||
      code === 'Forbidden' ||
      code === 'InvalidAccessKeyId' ||
      code === 'SignatureDoesNotMatch'
    ) {
      return new StorageDomainError(
        'STORAGE_ACCESS_DENIED',
        `Access denied during ${operation}`,
        error,
      );
    }
    if (code === 'InvalidArgument' || code === 'InvalidRequest') {
      return new StorageDomainError(
        'STORAGE_INVALID_INPUT',
        `Invalid input during ${operation}`,
        error,
      );
    }
    return new StorageDomainError(
      'STORAGE_UNKNOWN',
      `Storage error during ${operation}`,
      error,
    );
  }

  private getAwsErrorCode(error: unknown): string | undefined {
    if (
      typeof error === 'object' &&
      error !== null &&
      'name' in error &&
      typeof (error as { name: string }).name === 'string'
    ) {
      return (error as { name: string }).name;
    }
    return undefined;
  }
}
