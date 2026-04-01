import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateBusinessUseCase } from '@modules/businesses/application/use-cases/create-business/create-business.use-case';
import { CreateBusinessRequest } from '@modules/businesses/application/use-cases/create-business/create-business.request';
import { PublishTransversalEventUseCase } from '@messaging/application/use-cases/publish-transversal-event.use-case';
import { PublishCreatePartnerUserCommandUseCase } from '@messaging/application/use-cases/publish-create-partner-user-command.use-case';
import { PublishCreatePersonCommandUseCase } from '@messaging/application/use-cases/publish-create-person-command.use-case';
import { TransversalEventType } from '@messaging/application/dto/transversal-outbound-event.dto';
import {
  PARTNER_ONBOARDING_SAGA_REPOSITORY,
  type PartnerOnboardingSagaRepository,
} from '@modules/partners/application/ports/partner-onboarding-saga.repository.port';
import {
  PARTNER_USER_SQS_RESULT_READER_PORT,
  type PartnerUserSqsResultReaderPort,
} from '@modules/partners/application/ports/partner-user-sqs-result-reader.port';
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
import { CreateLegalRepresentativeUseCase } from '@modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.use-case';
import { CreateLegalRepresentativeRequest } from '@modules/legal-representatives/application/use-cases/create-legal-representative/create-legal-representative.request';
import { CreateSupplierUseCase } from '@modules/suppliers/application/use-cases/create-supplier/create-supplier.use-case';
import { CreateSupplierRequest } from '@modules/suppliers/application/use-cases/create-supplier/create-supplier.request';
import { CreatePartnerUseCase } from '@modules/partners/application/use-cases/create-partner/create-partner.use-case';
import { CreatePartnerRequest } from '@modules/partners/application/use-cases/create-partner/create-partner.request';

const TOTAL_STEPS = 8;

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
    @Inject(PARTNER_USER_SQS_RESULT_READER_PORT)
    private readonly partner_user_sqs_result: PartnerUserSqsResultReaderPort,
    @Inject(PARTNER_ONBOARDING_FILES_PORT)
    private readonly files_port: PartnerOnboardingFilesPort,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly suppliers_lookup: SuppliersReferenceLookupPort,
    private readonly create_business: CreateBusinessUseCase,
    private readonly create_supplier: CreateSupplierUseCase,
    private readonly create_partner: CreatePartnerUseCase,
    private readonly create_legal_representative: CreateLegalRepresentativeUseCase,
    private readonly publish_create_partner_user: PublishCreatePartnerUserCommandUseCase,
    private readonly publish_create_person: PublishCreatePersonCommandUseCase,
    private readonly publish_transversal: PublishTransversalEventUseCase,
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

      this.log_step(
        2,
        correlation_id,
        'usuario operativo (SQS create-user) → persona; negocio; representante legal (SQS create-person)',
      );

     

      await this.publish_create_partner_user.execute({
        correlation_id,
        idempotency_key: saga_external_id,
        email: command.email,
        country_code: command.country_code,
        first_name: command.first_name,
        last_name: command.last_name,
        doc_type: command.doc_type,
        doc_number: command.doc_number,
        phone: command.phone,
        city_external_id: command.city_id,
      });

      const operating_user_result =
        await this.partner_user_sqs_result.wait_for_completed_result(saga_external_id);

      await this.saga_repository.update_by_external_id(saga_external_id, {
        current_step: 2,
        person_external_id: operating_user_result.person_external_id,
      });

      const business = await this.create_business.execute(
        new CreateBusinessRequest(
          operating_user_result.person_external_id,
          command.city_id,
          command.entity_type,
          command.business_name,
          command.business_address,
          command.business_type,
          command.relationship_to_business,
          command.legal_name,
          command.trade_name,
          command.tax_id,
          command.year_of_establishment,
        ),
      );

      let legal_representative_external_id: string | null = null;
      const lr = command.legal_representative;
      if (lr !== null) {
        const lr_idempotency_key = `${saga_external_id}__legal_representative`;
        await this.publish_create_person.execute({
          correlation_id,
          idempotency_key: lr_idempotency_key,
          email: lr.email,
          country_code: command.country_code,
          first_name: lr.first_name,
          last_name: lr.last_name,
          doc_type: lr.doc_type,
          doc_number: lr.doc_number,
          phone: lr.phone,
          city_external_id: command.city_id,
        });
        const lr_person = await this.partner_user_sqs_result.wait_for_completed_result(
          lr_idempotency_key,
        );
        const lr_row = await this.create_legal_representative.execute(
          new CreateLegalRepresentativeRequest(lr_person.person_external_id, true),
        );
        legal_representative_external_id = lr_row.external_id;
      }

      const bank_certification_stored =
        file_urls.bank_certification_url.trim().length > 0
          ? file_urls.bank_certification_url.trim()
          : null;

      const supplier_res = await this.create_supplier.execute(
        new CreateSupplierRequest(business.external_id, {
          bank_entity: command.bank_entity,
          account_number: command.account_number,
          bank_certification: bank_certification_stored,
        }),
      );

      const logo_stored =
        file_urls.logo_url.trim().length > 0
          ? file_urls.logo_url.trim()
          : null;
      const co_branding_stored =
        file_urls.co_branding_url.trim().length > 0
          ? file_urls.co_branding_url.trim()
          : null;

      const partner_res = await this.create_partner.execute(
        new CreatePartnerRequest(
          supplier_res.external_id,
          command.acronym,
          logo_stored,
          co_branding_stored,
          command.primary_color,
          command.secondary_color,
          command.light_color,
          command.notification_email,
          command.webhook_url,
          command.send_sales_rep_voucher,
          command.disbursement_notification_email,
        ),
      );

      return new CreatePartnerOrchestratorResponse(
        saga_external_id,
        correlation_id,
        credit_facility_external_id,
        operating_user_result.user_external_id,
        operating_user_result.person_external_id,
        legal_representative_external_id,
        business.external_id,
        file_urls.bank_certification_url,
        file_urls.logo_url,
        file_urls.co_branding_url,
        supplier_res.bank_account_external_id,
        supplier_res.external_id,
        partner_res.external_id,
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
