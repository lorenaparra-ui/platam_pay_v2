import { Injectable } from '@nestjs/common';
import { PublishUploadFilesEventUseCase } from '@messaging/application/use-cases/publish-upload-files-event.use-case';
import { FilesUploadedCorrelationAwaiter } from '@messaging/application/services/files-uploaded-correlation-awaiter.service';
import type {
  PartnerOnboardingFilesPort,
  PartnerOnboardingUploadedFile,
} from '@modules/partners/application/ports/partner-onboarding-files.port';

const DEFAULT_UPLOAD_AWAIT_MS = 120_000;

@Injectable()
export class SqsPartnerOnboardingFilesAdapter implements PartnerOnboardingFilesPort {
  constructor(
    private readonly publish_upload_files: PublishUploadFilesEventUseCase,
    private readonly files_uploaded_awaiter: FilesUploadedCorrelationAwaiter,
  ) {}

  async resolve_urls(input: Readonly<{
    correlation_id: string;
    idempotency_key: string;
    bank_certification: PartnerOnboardingUploadedFile | undefined;
    logo: PartnerOnboardingUploadedFile | undefined;
    co_branding: PartnerOnboardingUploadedFile | undefined;
    file_folders?: Readonly<{
      bank_certification?: string;
      logo?: string;
      co_branding?: string;
    }>;
  }>): Promise<Readonly<{
    bank_certification_url: string;
    logo_url: string;
    co_branding_url: string;
  }>> {
    const has_any =
      this.has_payload(input.bank_certification) ||
      this.has_payload(input.logo) ||
      this.has_payload(input.co_branding);
    if (!has_any) {
      return {
        bank_certification_url: '',
        logo_url: '',
        co_branding_url: '',
      };
    }

    await this.publish_upload_files.execute({
      correlation_id: input.correlation_id,
      idempotency_key: input.idempotency_key,
      files: {
        bank_certification: this.to_inline_payload(input.bank_certification),
        logo: this.to_inline_payload(input.logo),
        co_branding: this.to_inline_payload(input.co_branding),
      },
      file_folders: input.file_folders,
    });

    const timeout_ms = Number(process.env.PARTNER_FILES_UPLOAD_AWAIT_MS ?? DEFAULT_UPLOAD_AWAIT_MS);
    const urls = await this.files_uploaded_awaiter.wait(input.correlation_id, timeout_ms);

    return {
      bank_certification_url: urls.bank_certification_url ?? '',
      logo_url: urls.logo_url ?? '',
      co_branding_url: urls.co_branding_url ?? '',
    };
  }

  private has_payload(f: PartnerOnboardingUploadedFile | undefined): boolean {
    return (
      f !== undefined &&
      typeof f.content_base64 === 'string' &&
      f.content_base64.trim().length > 0
    );
  }

  private to_inline_payload(f: PartnerOnboardingUploadedFile | undefined): string | undefined {
    if (!this.has_payload(f) || f === undefined) {
      return undefined;
    }
    const mime = f.mimetype.trim().length > 0 ? f.mimetype : 'application/octet-stream';
    return `data:${mime};base64,${f.content_base64}`;
  }
}
