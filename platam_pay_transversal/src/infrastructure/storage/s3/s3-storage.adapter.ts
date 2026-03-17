import { Injectable, Logger } from '@nestjs/common';
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

const S3_NOT_CONFIGURED_MESSAGE =
  'S3 no está configurado. Configure AWS_S3_BUCKET (y opcionalmente AWS_S3_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) para usar almacenamiento de archivos.';

/**
 * Adaptador S3 para FileStoragePort.
 * Si AWS_S3_BUCKET no está definido o la creación del cliente falla, el adaptador
 * queda en modo "no configurado" y la aplicación arranca igual; las operaciones
 * de almacenamiento fallarán con STORAGE_NOT_CONFIGURED al usarse.
 */
@Injectable()
export class S3StorageAdapter implements FileStoragePort {
  private readonly client: S3Client | null;
  private readonly bucket: string | null;
  private readonly logger = new Logger(S3StorageAdapter.name);

  constructor(private readonly s3Config: S3ConfigService) {
    const config = this.s3Config.getConfigOrNull();
    if (!config) {
      this.client = null;
      this.bucket = null;
      return;
    }
    try {
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
    } catch (error) {
      this.logger.warn(
        'S3 client no inicializado; el almacenamiento de archivos no estará disponible. ' +
          'Verifique AWS_S3_BUCKET y credenciales si desea usarlo.',
      );
      this.client = null;
      this.bucket = null;
    }
  }

  private getClientAndBucket(): { client: S3Client; bucket: string } {
    if (!this.bucket || !this.client) {
      throw new StorageDomainError(
        'STORAGE_NOT_CONFIGURED',
        S3_NOT_CONFIGURED_MESSAGE,
      );
    }
    return { client: this.client, bucket: this.bucket };
  }

  async upload(payload: UploadFilePayload): Promise<UploadFileResult> {
    const { client, bucket } = this.getClientAndBucket();
    try {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: payload.key,
          Body: payload.body,
          ContentType: payload.content_type,
          Metadata: payload.metadata,
        }),
      );
      const location = `s3://${bucket}/${payload.key}`;
      return { key: payload.key, location };
    } catch (error) {
      throw this.mapError(error, 'upload');
    }
  }

  async download(key: string): Promise<Buffer> {
    const { client, bucket } = this.getClientAndBucket();
    try {
      const response = await client.send(
        new GetObjectCommand({
          Bucket: bucket,
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
    const { client, bucket } = this.getClientAndBucket();
    try {
      await client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );
    } catch (error) {
      throw this.mapError(error, 'delete');
    }
  }

  async getSignedUrl(options: GetSignedUrlOptions): Promise<string> {
    const { client, bucket } = this.getClientAndBucket();
    try {
      const method = options.method ?? 'GET';
      const command =
        method === 'GET'
          ? new GetObjectCommand({
              Bucket: bucket,
              Key: options.key,
            })
          : new PutObjectCommand({
              Bucket: bucket,
              Key: options.key,
            });
      const url = await getSignedUrl(client, command, {
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
