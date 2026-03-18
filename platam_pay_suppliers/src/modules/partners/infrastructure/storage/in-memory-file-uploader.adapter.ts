import { Injectable, Logger } from "@nestjs/common";
import type { FileUploader } from "./partner-logo-storage.adapter";

@Injectable()
export class InMemoryFileUploaderAdapter implements FileUploader {
  private readonly logger = new Logger(InMemoryFileUploaderAdapter.name);

  async upload(payload: {
    key: string;
    body: Buffer | Uint8Array;
    content_type?: string;
  }): Promise<{ key: string; location: string }> {
    this.logger.warn(
      `InMemoryFileUploader: simulating upload for key=${payload.key}. Configure FILE_UPLOADER with S3/transversal in production.`,
    );
    return {
      key: payload.key,
      location: `https://storage.example.com/${payload.key}`,
    };
  }
}
