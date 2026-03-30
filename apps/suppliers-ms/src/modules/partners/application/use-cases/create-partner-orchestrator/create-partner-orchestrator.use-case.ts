import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateBusinessUseCase } from '@modules/businesses/application/use-cases/create-business/create-business.use-case';
import { CreateBusinessRequest } from '@modules/businesses/application/use-cases/create-business/create-business.request';
import { CreateBankAccountUseCase } from '@modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case';
import { CreateBankAccountRequest } from '@modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.request';
import { CreatePartnerUseCase } from '@modules/partners/application/use-cases/create-partner/create-partner.use-case';
import { CreatePartnerRequest } from '@modules/partners/application/use-cases/create-partner/create-partner.request';
import { PublishTransversalEventUseCase } from '@messaging/application/use-cases/publish-transversal-event.use-case';
import { PublishProductsEventUseCase } from '@messaging/application/use-cases/publish-products-event.use-case';
import { TransversalEventType } from '@messaging/application/dto/transversal-outbound-event.dto';
import {
  PARTNER_ONBOARDING_SAGA_REPOSITORY,
  type PartnerOnboardingSagaRepository,
} from '@modules/partners/application/ports/partner-onboarding-saga.repository.port';
import {
  PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
  type ProductsCreditFacilitySyncPort,
} from '@modules/partners/application/ports/products-credit-facility-sync.port';
import {
  TRANSVERSAL_USER_PERSON_WRITER_PORT,
  type TransversalUserPersonWriterPort,
} from '@modules/partners/application/ports/transversal-user-person-writer.port';
import {
  PARTNER_ONBOARDING_FILES_PORT,
  type PartnerOnboardingFilesPort,
  type PartnerOnboardingUploadedFile,
} from '@modules/partners/application/ports/partner-onboarding-files.port';
import type { CreatePartnerOrchestratorCommand } from './create-partner-orchestrator.command';
import { CreatePartnerOrchestratorResponse } from './create-partner-orchestrator.response';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';

const TOTAL_STEPS = 8;

/** Carpetas lógicas por tipo de archivo (contrato upload-files / mapeo files-uploaded). */
const PARTNER_ONBOARDING_FILE_FOLDERS = {
  bank_certification: 'bank-certifications',
  logo: 'logos/logo',
  co_branding: 'logos/co-branding',
} as const;

@Injectable()
export class CreatePartnerOrchestratorUseCase {
  private readonly logger = new Logger(CreatePartnerOrchestratorUseCase.name);

  constructor(
    @Inject(PARTNER_ONBOARDING_SAGA_REPOSITORY)
    private readonly saga_repository: PartnerOnboardingSagaRepository,
    @Inject(PRODUCTS_CREDIT_FACILITY_SYNC_PORT)
    private readonly credit_facility_sync: ProductsCreditFacilitySyncPort,
    @Inject(TRANSVERSAL_USER_PERSON_WRITER_PORT)
    private readonly user_person_writer: TransversalUserPersonWriterPort,
    @Inject(PARTNER_ONBOARDING_FILES_PORT)
    private readonly files_port: PartnerOnboardingFilesPort,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly suppliers_lookup: SuppliersReferenceLookupPort,
    private readonly create_business: CreateBusinessUseCase,
    private readonly create_bank_account: CreateBankAccountUseCase,
    private readonly create_partner: CreatePartnerUseCase,
    private readonly publish_transversal: PublishTransversalEventUseCase,
    private readonly publish_products: PublishProductsEventUseCase,
  ) {}

  async execute(
    command: CreatePartnerOrchestratorCommand,
    files: Readonly<{
      bank_certification?: PartnerOnboardingUploadedFile;
      logo?: PartnerOnboardingUploadedFile;
      co_branding?: PartnerOnboardingUploadedFile;
    }>,
  ): Promise<CreatePartnerOrchestratorResponse> {
    const correlation_id = randomUUID();
    const saga_external_id = randomUUID();
    const credit_facility_external_id = randomUUID();

    await this.saga_repository.create_initial({
      external_id: saga_external_id,
      correlation_id,
      status: 'RUNNING',
      current_step: 0,
    });

    try {
      this.log_step(
        1,
        correlation_id,
        'archivos: cola TRANSVERSAL_SQS_UPLOAD_FILES_QUEUE_URL → S3 (transversal-ms)',
      );
      const file_urls = await this.files_port.resolve_urls({
        correlation_id,
        idempotency_key: saga_external_id,
        bank_certification: files.bank_certification,
        logo: files.logo,
        co_branding: files.co_branding,
        file_folders: PARTNER_ONBOARDING_FILE_FOLDERS,
      });

      await this.publish_transversal.execute({
        correlation_id,
        event_type:
          TransversalEventType.partner_onboarding_files_upload_requested,
        payload: {
          bank_certification_url: file_urls.bank_certification_url,
          logo_url: file_urls.logo_url,
          co_branding_url: file_urls.co_branding_url,
        },
      });
      await this.saga_repository.update_by_external_id(saga_external_id, {
        current_step: 1,
      });

      /** Respuesta de ejemplo (stub); sustituir por IDs reales al completar la saga. */
      const example_user_external_id = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d';
      const example_person_external_id = 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e';
      const example_business_external_id = 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f';
      const example_bank_account_external_id = 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a';
      const example_partner_external_id = 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b';

      return new CreatePartnerOrchestratorResponse(
        saga_external_id,
        correlation_id,
        credit_facility_external_id,
        example_user_external_id,
        example_person_external_id,
        example_business_external_id,
        file_urls.bank_certification_url,
        file_urls.logo_url,
        file_urls.co_branding_url,
        example_bank_account_external_id,
        example_partner_external_id,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      await this.saga_repository.update_by_external_id(saga_external_id, {
        status: 'FAILED',
        error_message: message,
      });
      throw err;
    }
  }

  private log_step(
    step_index: number,
    correlation_id: string,
    label: string,
  ): void {
    this.logger.debug(
      `[Saga][${step_index}/${TOTAL_STEPS}][correlation_id=${correlation_id}] ${label}`,
    );
  }
}
