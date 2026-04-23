import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import type { UseCase } from '@platam/shared';
import {
  AsyncJobStatus,
  AsyncJobStep,
  CategoryState,
  CreditApplicationStatus,
  CreditFacilityState,
} from '@platam/shared';
import { TransversalInboundMessageDto } from '../dto/transversal-inbound-message.dto';
import { TransversalEventType } from '../dto/transversal-outbound-event.dto';
import { CreateCreditFacilityUseCase } from '@modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case';
import { CreateCreditFacilityRequest } from '@modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.request';
import { CreateCategoryUseCase } from '@modules/categories/application/use-cases/create-category/create-category.use-case';
import { CreateCategoryRequest } from '@modules/categories/application/use-cases/create-category/create-category.request';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import type { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';
import { CREDIT_APPLICATION_JOB_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import type { CreditApplicationJobRepository } from '@modules/credit-applications/domain/ports/credit-application-job.port';
import { CreateCreditApplicationUseCase } from '@modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.use-case';
import { CreateCreditApplicationRequest } from '@modules/credit-applications/application/use-cases/create-credit-application/create-credit-application.request';

type CreditFacilityPayload = Readonly<{
  credit_facility_external_id?: string;
  /** Compatibilidad con mensajes antiguos de suppliers-ms. */
  external_id?: string;
  contract_id?: string | null;
  total_limit?: string;
  /** `active` | `inactive` (alineado con ENUM PostgreSQL). */
  state?: string;
  /** FK interna `suppliers_schema.businesses.id`. */
  business_id?: number;
}>;

type CategoryItemPayload = Readonly<{
  name?: string;
  discount_percentage?: string;
  interest_rate?: string;
  disbursement_fee_percent?: string | null;
  minimum_disbursement_fee?: string | null;
  delay_days?: number;
  term_days?: number;
}>;

type CategoryBatchPayload = Readonly<{
  credit_facility_external_id?: string;
  /** FK interna `suppliers_schema.partners.id`. */
  partner_id?: number | null;
  state?: string;
  categories?: CategoryItemPayload[];
}>;

type BusinessCreatedPayload = Readonly<{
  job_id?: unknown;
  business_internal_id?: unknown;
  business_external_id?: unknown;
}>;

function parse_credit_facility_state(
  raw: string | undefined,
): CreditFacilityState | null {
  if (raw === undefined) {
    return null;
  }
  const v = raw.trim().toLowerCase();
  if (v === CreditFacilityState.ACTIVE) {
    return CreditFacilityState.ACTIVE;
  }
  if (v === CreditFacilityState.INACTIVE) {
    return CreditFacilityState.INACTIVE;
  }
  return null;
}

function parse_category_state(raw: string | undefined): CategoryState | null {
  const cf = parse_credit_facility_state(raw);
  if (cf === null) {
    return null;
  }
  return cf === CreditFacilityState.ACTIVE
    ? CategoryState.ACTIVE
    : CategoryState.INACTIVE;
}

@Injectable()
export class ProcessProductsInboundMessageUseCase
  implements UseCase<TransversalInboundMessageDto, void>
{
  private readonly logger = new Logger(ProcessProductsInboundMessageUseCase.name);

  constructor(
    @Inject(CREDIT_FACILITY_REPOSITORY)
    private readonly credit_facility_repository: CreditFacilityRepository,
    private readonly create_credit_facility: CreateCreditFacilityUseCase,
    private readonly create_category: CreateCategoryUseCase,
    @Inject(CREDIT_APPLICATION_JOB_REPOSITORY)
    private readonly job_repository: CreditApplicationJobRepository,
    private readonly create_credit_application: CreateCreditApplicationUseCase,
    @InjectDataSource()
    private readonly ds: DataSource,
  ) {}

  async execute(dto: TransversalInboundMessageDto): Promise<void> {
    switch (dto.event_type) {
      case TransversalEventType.partner_onboarding_credit_facility_requested:
        await this.handle_credit_facility(dto);
        return;
      case TransversalEventType.partner_onboarding_category_batch_requested:
        await this.handle_category_batch(dto);
        return;
      case TransversalEventType.credit_application_business_created:
        await this.handle_business_created(dto);
        return;
      default:
        this.logger.log(
          `Mensaje products-ms recibido: event_type=${dto.event_type} correlation_id=${dto.correlation_id}`,
        );
    }
  }

  private async handle_credit_facility(
    dto: TransversalInboundMessageDto,
  ): Promise<void> {
    const payload = dto.payload as CreditFacilityPayload;
    const external_id =
      payload.credit_facility_external_id ?? payload.external_id;
    const total_limit = payload.total_limit;
    const state = parse_credit_facility_state(payload.state);
    const business_id = payload.business_id;
    if (
      external_id === undefined ||
      external_id.length === 0 ||
      total_limit === undefined ||
      state === null ||
      business_id === undefined ||
      typeof business_id !== 'number' ||
      !Number.isFinite(business_id)
    ) {
      this.logger.warn(
        `Payload inválido para credit_facility correlation_id=${dto.correlation_id}`,
      );
      return;
    }

    const existing =
      await this.credit_facility_repository.find_by_external_id(external_id);
    if (existing !== null) {
      this.logger.debug(
        `[Saga][products] credit facility ya existe external_id=${external_id} correlation_id=${dto.correlation_id}`,
      );
      return;
    }

    await this.create_credit_facility.execute(
      new CreateCreditFacilityRequest(
        payload.contract_id ?? null,
        total_limit,
        state,
        business_id,
        external_id,
      ),
    );
    this.logger.debug(
      `[Saga][products] credit facility creada external_id=${external_id} correlation_id=${dto.correlation_id}`,
    );
  }

  private async handle_category_batch(
    dto: TransversalInboundMessageDto,
  ): Promise<void> {
    const payload = dto.payload as CategoryBatchPayload;
    const cf = payload.credit_facility_external_id;
    const state = parse_category_state(payload.state);
    const categories = payload.categories;
    if (
      cf === undefined ||
      cf.length === 0 ||
      state === null ||
      !Array.isArray(categories) ||
      categories.length === 0
    ) {
      this.logger.warn(
        `Payload inválido para category_batch correlation_id=${dto.correlation_id}`,
      );
      return;
    }

    const partner_id =
      payload.partner_id === undefined ? null : payload.partner_id;

    for (const item of categories) {
      if (
        item.name === undefined ||
        item.discount_percentage === undefined ||
        item.interest_rate === undefined ||
        item.delay_days === undefined ||
        item.term_days === undefined
      ) {
        this.logger.warn(
          `Ítem de categoría incompleto correlation_id=${dto.correlation_id}`,
        );
        continue;
      }

      await this.create_category.execute(
        new CreateCategoryRequest(
          cf,
          partner_id,
          item.name,
          item.discount_percentage,
          item.interest_rate,
          item.disbursement_fee_percent ?? null,
          item.minimum_disbursement_fee ?? null,
          item.delay_days,
          item.term_days,
          state,
        ),
      );
    }

    this.logger.debug(
      `[Saga][products] categorías creadas count=${categories.length} correlation_id=${dto.correlation_id}`,
    );
  }

  private async handle_business_created(
    dto: TransversalInboundMessageDto,
  ): Promise<void> {
    const p = dto.payload as BusinessCreatedPayload;

    const job_id = typeof p.job_id === 'string' ? p.job_id : null;
    const business_internal_id =
      typeof p.business_internal_id === 'number' ? p.business_internal_id : null;

    if (!job_id || business_internal_id === null) {
      this.logger.warn(
        `[BusinessCreated] payload inválido correlation_id=${dto.correlation_id}`,
      );
      return;
    }

    const job = await this.job_repository.find_by_external_id(job_id);
    if (!job) {
      this.logger.warn(`[BusinessCreated] job no encontrado job_id=${job_id}`);
      return;
    }

    if (job.step === AsyncJobStep.COMPLETED || job.step === AsyncJobStep.FAILED) {
      this.logger.debug(`[BusinessCreated] job ya finalizado step=${job.step} job_id=${job_id}`);
      return;
    }

    const partner_internal_id = job.resolvedIds.partner_internal_id ?? null;
    const person_internal_id = job.resolvedIds.person_internal_id ?? null;
    const sales_rep_internal_id = job.resolvedIds.sales_rep_internal_id ?? null;

    if (sales_rep_internal_id === null) {
      this.logger.error(`[BusinessCreated] sales_rep_internal_id no resuelto job_id=${job_id}`);
      await this.job_repository.update_failed(job.id, 'sales_rep_internal_id no resuelto');
      return;
    }

    let partner_category_id: number | null = null;
    const explicit_category_ids = Array.isArray(job.payload.partner_category_ids)
      ? job.payload.partner_category_ids
      : null;

    if (explicit_category_ids !== null && explicit_category_ids.length > 0) {
      // Flujo sales rep: usar la primera categoría enviada explícitamente en la petición
      const rows: Array<{ id: number }> = await this.ds.query(
        `SELECT id FROM products_schema.categories
         WHERE external_id = $1
         LIMIT 1`,
        [explicit_category_ids[0]],
      );
      if (rows.length > 0) {
        partner_category_id = rows[0].id;
      }
    } else if (partner_internal_id !== null) {
      // Flujo público: asignar la categoría default del partner
      const rows: Array<{ id: number }> = await this.ds.query(
        `SELECT id FROM products_schema.categories
         WHERE partner_id = $1 AND is_default = true
         LIMIT 1`,
        [partner_internal_id],
      );
      if (rows.length > 0) {
        partner_category_id = rows[0].id;
      }
    }

    const payload = job.payload;
    await this.create_credit_application.execute(
      new CreateCreditApplicationRequest(
        person_internal_id,
        partner_internal_id,
        partner_category_id,
        business_internal_id,
        sales_rep_internal_id,
        CreditApplicationStatus.IN_PROGRESS,
        false,
        payload.privacy_policy_accepted ?? false,
        payload.number_of_locations,
        payload.number_of_employees,
        payload.business_seniority,
        null,
        payload.business_flagship_m2,
        payload.business_has_rent,
        payload.business_rent_amount,
        payload.monthly_income,
        payload.monthly_expenses,
        payload.monthly_purchases,
        payload.current_purchases,
        payload.total_assets,
        payload.requested_credit_line,
      ),
    );

    await this.job_repository.update_status_and_step(
      job.id,
      AsyncJobStatus.COMPLETED,
      AsyncJobStep.COMPLETED,
      { business_internal_id },
    );

    this.logger.log(
      `[BusinessCreated] solicitud de crédito creada job_id=${job_id} business_id=${business_internal_id}`,
    );
  }
}
