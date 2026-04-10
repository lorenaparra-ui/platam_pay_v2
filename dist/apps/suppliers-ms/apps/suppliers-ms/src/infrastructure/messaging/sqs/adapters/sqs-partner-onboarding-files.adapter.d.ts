import { PublishUploadFilesEventUseCase } from '@messaging/application/use-cases/publish-upload-files-event.use-case';
import { FilesUploadedCorrelationAwaiter } from '@messaging/application/services/files-uploaded-correlation-awaiter.service';
import type { PartnerOnboardingFilesPort, PartnerOnboardingUploadedFile } from '@modules/partners/application/ports/partner-onboarding-files.port';
export declare class SqsPartnerOnboardingFilesAdapter implements PartnerOnboardingFilesPort {
    private readonly publish_upload_files;
    private readonly files_uploaded_awaiter;
    constructor(publish_upload_files: PublishUploadFilesEventUseCase, files_uploaded_awaiter: FilesUploadedCorrelationAwaiter);
    resolve_urls(input: Readonly<{
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
    }>>;
    private has_payload;
    private to_inline_payload;
}
