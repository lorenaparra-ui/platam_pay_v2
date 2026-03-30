import { Inject, Injectable, Logger } from '@nestjs/common';
import type { UseCase } from '@platam/shared';
import { TransversalInboundMessageDto } from '../dto/transversal-inbound-message.dto';
import { TransversalEventType } from '../dto/transversal-outbound-event.dto';
import { CreateCreditFacilityUseCase } from '@modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.use-case';
import { CreateCreditFacilityRequest } from '@modules/credit-facilities/application/use-cases/create-credit-facility/create-credit-facility.request';
import { CreateCategoryUseCase } from '@modules/categories/application/use-cases/create-category/create-category.use-case';
import { CreateCategoryRequest } from '@modules/categories/application/use-cases/create-category/create-category.request';
import { CREDIT_FACILITY_REPOSITORY } from '@modules/credit-facilities/credit-facilities.tokens';
import type { CreditFacilityRepository } from '@modules/credit-facilities/domain/ports/credit-facility.ports';

type CreditFacilityPayload = Readonly<{
  credit_facility_external_id?: string;
  contract_id?: string | null;
  total_limit?: string;
  status_external_id?: string;
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
  status_external_id?: string;
  categories?: CategoryItemPayload[];
}>;

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
  ) {}

  async execute(dto: TransversalInboundMessageDto): Promise<void> {
    switch (dto.event_type) {
      case TransversalEventType.partner_onboarding_credit_facility_requested:
        await this.handle_credit_facility(dto);
        return;
      case TransversalEventType.partner_onboarding_category_batch_requested:
        await this.handle_category_batch(dto);
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
    const external_id = payload.credit_facility_external_id;
    const total_limit = payload.total_limit;
    const status_external_id = payload.status_external_id;
    if (
      external_id === undefined ||
      external_id.length === 0 ||
      total_limit === undefined ||
      status_external_id === undefined
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
        status_external_id,
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
    const status_external_id = payload.status_external_id;
    const categories = payload.categories;
    if (
      cf === undefined ||
      cf.length === 0 ||
      status_external_id === undefined ||
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
          status_external_id,
        ),
      );
    }

    this.logger.debug(
      `[Saga][products] categorías creadas count=${categories.length} correlation_id=${dto.correlation_id}`,
    );
  }
}
