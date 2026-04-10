import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CreditFacilityState,
  new_uuid,
  PartnerOnboardingSagaStatus,
} from '@platam/shared';
import { CreateBusinessUseCase } from '@modules/businesses/application/use-cases/create-business/create-business.use-case';
import { CreateBusinessRequest } from '@modules/businesses/application/use-cases/create-business/create-business.request';
import { CreateBankAccountUseCase } from '@modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.use-case';
import { CreateBankAccountRequest } from '@modules/bank-accounts/application/use-cases/create-bank-account/create-bank-account.request';
import { PublishCreatePersonCommandUseCase } from '@messaging/application/use-cases/publish-create-person-command.use-case';
import { PublishCreateCreditFacilityCommandUseCase } from '@messaging/application/use-cases/publish-create-credit-facility-command.use-case';
import { PublishCreateCategoriesCommandUseCase } from '@messaging/application/use-cases/publish-create-categories-command.use-case';
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
import {
  PRODUCTS_CREDIT_FACILITY_SYNC_PORT,
  type ProductsCreditFacilitySyncPort,
} from '@modules/partners/application/ports/products-credit-facility-sync.port';
import {
  PARTNER_SAGA_COMPENSATION_PORT,
  type PartnerSagaCompensationPort,
} from '@modules/partners/application/ports/partner-saga-compensation.port';
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

const TOTAL_STEPS = 9;

const PARTNER_ONBOARDING_FILE_FOLDERS = {
  bank_certification: 'bank-certifications',
  logo: 'logos/logo',
  co_branding: 'logos/co-branding',
} as const;

/**
 * Contexto de recursos creados durante la saga.
 * Permite a compensate() saber exactamente qué revertir.
 */
interface SagaCreatedResources {
  credit_facility_external_id?: string;
  bank_account_external_id?: string;
  business_external_id?: string;
  supplier_external_id?: string;
  partner_external_id?: string;
}

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
    @Inject(PRODUCTS_CREDIT_FACILITY_SYNC_PORT)
    private readonly credit_facility_sync: ProductsCreditFacilitySyncPort,
    @Inject(PARTNER_SAGA_COMPENSATION_PORT)
    private readonly compensation: PartnerSagaCompensationPort,
    private readonly create_bank_account: CreateBankAccountUseCase,
    private readonly create_business: CreateBusinessUseCase,
    private readonly create_supplier: CreateSupplierUseCase,
    private readonly create_partner: CreatePartnerUseCase,
    private readonly create_legal_representative: CreateLegalRepresentativeUseCase,
    private readonly publish_create_person: PublishCreatePersonCommandUseCase,
    private readonly publish_create_credit_facility: PublishCreateCreditFacilityCommandUseCase,
    private readonly publish_create_categories: PublishCreateCategoriesCommandUseCase,
  ) {}

  /**
   * Inicia la saga en segundo plano y retorna el saga_id de inmediato.
   * El llamador puede consultar el estado via GET /partners/sagas/:id.
   */
  async start_async(
    command: CreatePartnerOrchestratorCommand,
    files: Readonly<{
      bank_certification?: PartnerOnboardingUploadedFile;
      logo?: PartnerOnboardingUploadedFile;
      co_branding?: PartnerOnboardingUploadedFile;
    }>,
  ): Promise<string> {
    const saga_external_id = new_uuid();
    const correlation_id = new_uuid();

    await this.saga_repository.create_initial({
      external_id: saga_external_id,
      correlation_id,
      status: PartnerOnboardingSagaStatus.RUNNING,
      current_step: 0,
    });

    // Fire-and-forget: el error queda capturado y persistido en la saga
    void this.run(command, files, saga_external_id, correlation_id);

    return saga_external_id;
  }

  private async run(
    command: CreatePartnerOrchestratorCommand,
    files: Readonly<{
      bank_certification?: PartnerOnboardingUploadedFile;
      logo?: PartnerOnboardingUploadedFile;
      co_branding?: PartnerOnboardingUploadedFile;
    }>,
    saga_external_id: string,
    correlation_id: string,
  ): Promise<void> {
    const credit_facility_external_id = new_uuid();
    const created: SagaCreatedResources = {};

    try {
      this.log_step(0, correlation_id, 'archivos → S3 (transversal-ms)');
      const file_urls = await this.files_port.resolve_urls({
        correlation_id,
        idempotency_key: saga_external_id,
        bank_certification: files.bank_certification,
        logo: files.logo,
        co_branding: files.co_branding,
        file_folders: PARTNER_ONBOARDING_FILE_FOLDERS,
      });

      // Paso 1 — Crear credit_facility INACTIVE
      this.log_step(1, correlation_id, 'crear credit_facility INACTIVE → products_schema');
      const cf = await this.credit_facility_sync.create_credit_facility({
        credit_facility_external_id,
        contract_id: command.contract_id,
        total_limit: command.total_limit,
        state: CreditFacilityState.INACTIVE,
      });
      created.credit_facility_external_id = credit_facility_external_id;
      await this.publish_create_credit_facility.execute({
        correlation_id,
        external_id: credit_facility_external_id,
        contract_id: command.contract_id,
        total_limit: command.total_limit,
        state: CreditFacilityState.INACTIVE,
      });
      await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 1 });

      // Paso 2 — Crear cuenta bancaria
      this.log_step(2, correlation_id, 'crear bank_account');
      const bank_cert_url =
        file_urls.bank_certification_url.trim().length > 0
          ? file_urls.bank_certification_url.trim()
          : null;
      const bank_account = await this.create_bank_account.execute(
        new CreateBankAccountRequest(
          command.bank_entity,
          command.account_number,
          bank_cert_url,
        ),
      );
      created.bank_account_external_id = bank_account.external_id;
      await this.saga_repository.update_by_external_id(saga_external_id, {
        current_step: 2,
        bank_account_external_id: bank_account.external_id,
      });

      // Paso 3 — Crear persona del representante legal (SQS)
      this.log_step(3, correlation_id, 'publicar create-person (RL) → SQS');
      const lr = command.legal_representative;
      const lr_idempotency_key = `${saga_external_id}__legal_representative`;
      let lr_person_external_id: string | null = null;
      let person_internal_id: number | null = null;

      if (lr !== null) {
        await this.publish_create_person.execute({
          correlation_id,
          idempotency_key: lr_idempotency_key,
          country_code: command.country_code,
          first_name: lr.first_name,
          last_name: lr.last_name,
          doc_type: lr.doc_type,
          doc_number: lr.doc_number,
          phone: lr.phone,
          city_external_id: command.city_id,
        });
        const lr_sqs_result =
          await this.partner_user_sqs_result.wait_for_completed_result(lr_idempotency_key);
        lr_person_external_id = lr_sqs_result.person_external_id;
        person_internal_id =
          await this.suppliers_lookup.get_person_internal_id_by_external_id(
            lr_person_external_id,
          );
        await this.saga_repository.update_by_external_id(saga_external_id, {
          current_step: 3,
          person_external_id: lr_person_external_id,
        });
      } else {
        await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 3 });
      }

      // Paso 4 — Crear business
      this.log_step(4, correlation_id, 'crear business');
      if (person_internal_id === null) {
        throw new Error(
          'person_internal_id requerido para crear business (legal_representative es null)',
        );
      }
      const business = await this.create_business.execute(
        new CreateBusinessRequest(
          person_internal_id,
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
      created.business_external_id = business.external_id;
      await this.saga_repository.update_by_external_id(saga_external_id, {
        current_step: 4,
        business_external_id: business.external_id,
      });

      // Paso 5 — Crear supplier
      this.log_step(5, correlation_id, 'crear supplier');
      const supplier = await this.create_supplier.execute(
        new CreateSupplierRequest(business.internal_id, bank_account.internal_id),
      );
      created.supplier_external_id = supplier.external_id;
      await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 5 });

      // Paso 6 — Crear legal_representative
      this.log_step(6, correlation_id, 'crear legal_representative');
      let legal_representative_external_id: string | null = null;
      if (lr !== null) {
        const lr_row = await this.create_legal_representative.execute(
          new CreateLegalRepresentativeRequest(person_internal_id, true, business.internal_id),
        );
        legal_representative_external_id = lr_row.external_id;
      }
      await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 6 });

      // Paso 7 — Crear partner
      this.log_step(7, correlation_id, 'crear partner');
      const logo_stored =
        file_urls.logo_url.trim().length > 0 ? file_urls.logo_url.trim() : null;
      const co_branding_stored =
        file_urls.co_branding_url.trim().length > 0
          ? file_urls.co_branding_url.trim()
          : null;

      const partner = await this.create_partner.execute(
        new CreatePartnerRequest(
          supplier.internal_id,
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
      created.partner_external_id = partner.external_id;
      await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 7 });

      // Paso 8 — Publicar categorías
      this.log_step(8, correlation_id, 'publicar categorías → SQS');
      await this.publish_create_categories.execute({
        correlation_id,
        credit_facility_id: cf.internal_id,
        partner_id: partner.internal_id,
        categories: command.categories,
      });
      await this.saga_repository.update_by_external_id(saga_external_id, { current_step: 8 });

      // Paso 9 — Activar credit_facility
      this.log_step(9, correlation_id, 'activar credit_facility → ACTIVE');
      await this.credit_facility_sync.update_credit_facility_state(
        credit_facility_external_id,
        CreditFacilityState.ACTIVE,
      );
      await this.saga_repository.update_by_external_id(saga_external_id, {
        current_step: 9,
        status: PartnerOnboardingSagaStatus.COMPLETED,
        credit_facility_external_id,
        partner_external_id: partner.external_id,
      });

      this.logger.log(
        `[Saga][COMPLETED][correlation_id=${correlation_id}] partner=${partner.external_id}`,
      );

      void this.build_response(
        saga_external_id,
        correlation_id,
        credit_facility_external_id,
        lr_person_external_id,
        legal_representative_external_id,
        business.external_id,
        file_urls.bank_certification_url,
        file_urls.logo_url,
        file_urls.co_branding_url,
        bank_account.external_id,
        supplier.external_id,
        partner.external_id,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `[Saga][FAILED][correlation_id=${correlation_id}] ${message}`,
      );
      await this.saga_repository.update_by_external_id(saga_external_id, {
        status: PartnerOnboardingSagaStatus.COMPENSATING,
        error_message: message,
      });

      await this.compensate(correlation_id, created);

      await this.saga_repository.update_by_external_id(saga_external_id, {
        status: PartnerOnboardingSagaStatus.FAILED,
      });
    }
  }

  /**
   * Ejecuta las transacciones compensatorias en orden inverso.
   * Los errores individuales de compensación se loguean pero no detienen el proceso.
   */
  private async compensate(
    correlation_id: string,
    created: SagaCreatedResources,
  ): Promise<void> {
    this.logger.warn(
      `[Saga][COMPENSATING][correlation_id=${correlation_id}] iniciando rollback`,
    );

    if (created.partner_external_id) {
      await this.compensation.delete_partner(created.partner_external_id);
    }
    if (created.supplier_external_id) {
      await this.compensation.delete_supplier(created.supplier_external_id);
    }
    if (created.business_external_id) {
      await this.compensation.delete_business(created.business_external_id);
    }
    if (created.bank_account_external_id) {
      await this.compensation.delete_bank_account(created.bank_account_external_id);
    }
    if (created.credit_facility_external_id) {
      await this.compensation.delete_credit_facility(created.credit_facility_external_id);
    }
  }

  private build_response(
    saga_external_id: string,
    correlation_id: string,
    credit_facility_external_id: string,
    lr_person_external_id: string | null,
    legal_representative_external_id: string | null,
    business_external_id: string,
    bank_certification_url: string,
    logo_url: string,
    co_branding_url: string,
    bank_account_external_id: string,
    supplier_external_id: string,
    partner_external_id: string,
  ): CreatePartnerOrchestratorResponse {
    return new CreatePartnerOrchestratorResponse(
      saga_external_id,
      correlation_id,
      credit_facility_external_id,
      null,
      lr_person_external_id,
      legal_representative_external_id,
      business_external_id,
      bank_certification_url,
      logo_url,
      co_branding_url,
      bank_account_external_id,
      supplier_external_id,
      partner_external_id,
    );
  }

  private log_step(step_index: number, correlation_id: string, label: string): void {
    this.logger.debug(
      `[Saga][${step_index}/${TOTAL_STEPS}][correlation_id=${correlation_id}] ${label}`,
    );
  }
}
