import { Inject, Injectable, Logger } from "@nestjs/common";
import type {
  PartnerLogoStoragePort,
  UploadLogoPayload,
  UploadLogoResult,
} from "../../domain/ports/partner-logo-storage.port";

export const FILE_UPLOADER = "FILE_UPLOADER";
export interface FileUploader {
  upload(payload: {
    key: string;
    body: Buffer | Uint8Array;
    content_type?: string;
  }): Promise<{ key: string; location: string }>;
}

@Injectable()
export class PartnerLogoStorageAdapter implements PartnerLogoStoragePort {
  private readonly logger = new Logger(PartnerLogoStorageAdapter.name);

  constructor(
    @Inject(FILE_UPLOADER)
    private readonly uploader: FileUploader,
  ) {}

  async upload(payload: UploadLogoPayload): Promise<UploadLogoResult> {
    this.logger.debug(`Uploading logo key=${payload.key}`);
    const result = await this.uploader.upload({
      key: payload.key,
      body: payload.body,
      content_type: payload.content_type,
    });
    return { key: result.key, location: result.location };
  }
}
