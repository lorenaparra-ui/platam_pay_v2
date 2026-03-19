import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import {
  PARTNER_EVENTS,
  type PartnerCategoriesCreateRequestedPayload,
} from "../../domain/events/partner.events";
import {
  EVENT_BUS_PORT,
  type DomainEventEnvelope,
  type EventBusPort,
} from "@common/ports/event-bus.port";
import {
  PARTNER_CATEGORIES_SERVICE,
  type PartnerCategoriesServicePort,
} from "../../application/ports/partner-categories-service.port";

@Injectable()
export class PartnerCategoriesCreateHandler implements OnModuleInit {
  private readonly logger = new Logger(PartnerCategoriesCreateHandler.name);

  constructor(
    @Inject(EVENT_BUS_PORT)
    private readonly eventBus: EventBusPort,
    @Inject(PARTNER_CATEGORIES_SERVICE)
    private readonly categoriesService: PartnerCategoriesServicePort,
  ) {}

  onModuleInit(): void {
    this.eventBus.subscribe(
      PARTNER_EVENTS.CATEGORIES_CREATE_REQUESTED,
      this.handle.bind(this),
    );
  }

  async handle(
    envelope: DomainEventEnvelope<PartnerCategoriesCreateRequestedPayload>,
  ): Promise<void> {
    const payload = envelope.payload as PartnerCategoriesCreateRequestedPayload;
    this.logger.log(
      `Processing ${envelope.name} correlation_id=${payload.correlation_id} partner_id=${payload.partner_id}`,
    );

    try {
      await this.categoriesService.createCreditFacilityAndCategories({
        partner_id: payload.partner_id,
        partner_external_id: payload.partner_external_id,
        business_id: payload.business_id,
        categories: payload.categories.map((c) => ({
          name: c.name,
          term_days: c.term_days,
          delay_days: c.delay_days,
          discount_percentage: c.discount_percentage,
          interest_rate: c.interest_rate,
          disbursement_fee_percent: c.disbursement_fee_percent,
          minimum_disbursement_fee: c.minimum_disbursement_fee,
        })),
      });
    } catch (err) {
      this.logger.error(
        `Categories create failed correlation_id=${payload.correlation_id}: ${err instanceof Error ? err.message : String(err)}`,
      );
      throw err;
    }
  }
}
