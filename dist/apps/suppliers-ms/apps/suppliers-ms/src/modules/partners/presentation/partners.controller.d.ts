import { ConfigService } from '@nestjs/config';
import { CreatePartnerOrchestratorUseCase } from '@modules/partners/application/use-cases/create-partner-orchestrator/create-partner-orchestrator.use-case';
import { UpdatePartnerByExternalIdUseCase } from '@modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.use-case';
import { type PartnerOnboardingFilesPort } from '@modules/partners/application/ports/partner-onboarding-files.port';
import { type PartnerOnboardingSagaRepository } from '@modules/partners/application/ports/partner-onboarding-saga.repository.port';
import type { UploadedMultipartFile } from './types/multer-file.type';
type PartnerMultipartFiles = {
    bankCertification?: UploadedMultipartFile[];
    logo?: UploadedMultipartFile[];
    coBranding?: UploadedMultipartFile[];
};
export declare class PartnersController {
    private readonly create_partner_orchestrator;
    private readonly update_partner;
    private readonly config_service;
    private readonly partner_files;
    private readonly saga_repository;
    constructor(create_partner_orchestrator: CreatePartnerOrchestratorUseCase, update_partner: UpdatePartnerByExternalIdUseCase, config_service: ConfigService, partner_files: PartnerOnboardingFilesPort, saga_repository: PartnerOnboardingSagaRepository);
    create(payload_raw: string, files: PartnerMultipartFiles): Promise<{
        saga_id: string;
        status: string;
        message: string;
    }>;
    get_saga_status(saga_id: string): Promise<unknown>;
    update(id: string, payload_raw: string | undefined, files: PartnerMultipartFiles): Promise<unknown>;
    private multipart_has_binary;
    private to_uploaded_meta;
}
export {};
