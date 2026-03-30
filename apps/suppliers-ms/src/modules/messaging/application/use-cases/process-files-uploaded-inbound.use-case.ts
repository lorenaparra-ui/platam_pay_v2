import { Injectable, Logger } from '@nestjs/common';
import type { UseCase } from '@platam/shared';
import { FilesUploadedInboundDto } from '../dto/files-uploaded-inbound.dto';
import {
  FilesUploadedCorrelationAwaiter,
  type FilesUploadedUrls,
} from '../services/files-uploaded-correlation-awaiter.service';

/** Carpetas publicadas en upload-files para onboarding (deben coincidir con create-partner-orchestrator). */
const FOLDER_BANK = 'bank-certifications';
const FOLDER_LOGO = 'logos/logo';
const FOLDER_CO_BRANDING = 'logos/co-branding';

@Injectable()
export class ProcessFilesUploadedInboundUseCase
  implements UseCase<FilesUploadedInboundDto, void>
{
  private readonly logger = new Logger(ProcessFilesUploadedInboundUseCase.name);

  constructor(private readonly awaiter: FilesUploadedCorrelationAwaiter) {}

  async execute(dto: FilesUploadedInboundDto): Promise<void> {
    const urls = this.map_payload_to_legacy_urls(dto.payload.files);
    this.logger.log(
      JSON.stringify({
        msg: 'files_uploaded_received',
        correlation_id: dto.correlation_id,
        file_count: dto.payload.files.length,
      }),
    );
    this.awaiter.complete(dto.correlation_id, urls);
  }

  private map_payload_to_legacy_urls(
    files: FilesUploadedInboundDto['payload']['files'],
  ): FilesUploadedUrls {
    const by_folder = new Map<string, string>();
    for (const f of files) {
      by_folder.set(f.folder.trim(), f.url);
    }
    const bank = by_folder.get(FOLDER_BANK);
    const logo = by_folder.get(FOLDER_LOGO);
    const cob = by_folder.get(FOLDER_CO_BRANDING);
    return {
      ...(bank !== undefined ? { bank_certification_url: bank } : {}),
      ...(logo !== undefined ? { logo_url: logo } : {}),
      ...(cob !== undefined ? { co_branding_url: cob } : {}),
    } satisfies FilesUploadedUrls;
  }
}
