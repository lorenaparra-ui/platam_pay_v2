import { Injectable, Inject, Logger } from '@nestjs/common';
import type {
  FileStoragePort,
  UploadFilePayload,
  UploadFileResult,
  GetSignedUrlOptions,
} from '@transversal/domain/ports/storage/file-storage.port';
import { FILE_STORAGE_PORT } from '@transversal/domain/ports/storage/file-storage.port';
import { StorageDomainError } from '@transversal/domain/errors/storage.error';

@Injectable()
export class FileStorageService {
  private readonly logger = new Logger(FileStorageService.name);

  constructor(
    @Inject(FILE_STORAGE_PORT)
    private readonly storage: FileStoragePort,
  ) {}

  async upload(payload: UploadFilePayload): Promise<UploadFileResult> {
    this.logger.debug(`Uploading file: ${payload.key}`);
    try {
      const result = await this.storage.upload(payload);
      this.logger.debug(`Uploaded: ${result.location}`);
      return result;
    } catch (error) {
      this.logger.warn(`Upload failed for ${payload.key}: ${this.messageOf(error)}`);
      throw error;
    }
  }

  async download(key: string): Promise<Buffer> {
    this.logger.debug(`Downloading file: ${key}`);
    try {
      return await this.storage.download(key);
    } catch (error) {
      this.logger.warn(`Download failed for ${key}: ${this.messageOf(error)}`);
      throw error;
    }
  }

  async delete(key: string): Promise<void> {
    this.logger.debug(`Deleting file: ${key}`);
    try {
      await this.storage.delete(key);
    } catch (error) {
      this.logger.warn(`Delete failed for ${key}: ${this.messageOf(error)}`);
      throw error;
    }
  }

  async getSignedUrl(options: GetSignedUrlOptions): Promise<string> {
    this.logger.debug(`Generating signed URL for: ${options.key}`);
    try {
      return await this.storage.getSignedUrl(options);
    } catch (error) {
      this.logger.warn(`GetSignedUrl failed for ${options.key}: ${this.messageOf(error)}`);
      throw error;
    }
  }

  private messageOf(error: unknown): string {
    if (error instanceof StorageDomainError) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  }
}
