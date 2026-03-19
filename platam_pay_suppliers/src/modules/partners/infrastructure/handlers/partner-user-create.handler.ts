import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import {
  PARTNER_EVENTS,
  type PartnerUserCreateRequestedPayload,
} from "../../domain/events/partner.events";
import {
  EVENT_BUS_PORT,
  type DomainEventEnvelope,
  type EventBusPort,
} from "@common/ports/event-bus.port";
import {
  PARTNER_USER_CREATOR,
  type PartnerUserCreatorPort,
} from "../../application/ports/partner-user-creator.port";

@Injectable()
export class PartnerUserCreateHandler implements OnModuleInit {
  private readonly logger = new Logger(PartnerUserCreateHandler.name);

  constructor(
    @Inject(EVENT_BUS_PORT)
    private readonly eventBus: EventBusPort,
    @Inject(PARTNER_USER_CREATOR)
    private readonly userCreator: PartnerUserCreatorPort,
  ) {}

  onModuleInit(): void {
    this.eventBus.subscribe(
      PARTNER_EVENTS.USER_CREATE_REQUESTED,
      this.handle.bind(this),
    );
  }

  async handle(
    envelope: DomainEventEnvelope<PartnerUserCreateRequestedPayload>,
  ): Promise<void> {
    const payload = envelope.payload as PartnerUserCreateRequestedPayload;
    this.logger.log(
      `Processing ${envelope.name} correlation_id=${payload.correlation_id} business_id=${payload.business_id}`,
    );

    try {
      await this.userCreator.createUser({
        first_name: payload.first_name,
        last_name: payload.last_name,
        document_type: payload.document_type,
        document_number: payload.document_number,
        email: payload.email,
        phone: payload.phone,
        business_id: payload.business_id,
        partner_external_id: payload.partner_external_id,
      });
    } catch (err) {
      this.logger.error(
        `User create failed correlation_id=${payload.correlation_id}: ${err instanceof Error ? err.message : String(err)}`,
      );
      throw err;
    }
  }
}
