import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import {
  PARTNER_EVENTS,
  type PartnerLogoUploadRequestedPayload,
  type PartnerLogoUploadCompletedPayload,
} from "../../../domain/events/partner.events";
import type { PartnerLogoStoragePort } from "../../../domain/ports/partner-logo-storage.port";
import { PARTNER_LOGO_STORAGE_PORT } from "../../../domain/ports/partner-logo-storage.port";
import {
  EVENT_BUS_PORT,
  type DomainEventEnvelope,
  type EventBusPort,
} from "../../../domain/ports/event-bus.port";
import { withRetry } from "../event-handler-retry.util";

const LOGO_PREFIX = "partners/logos";
const COBRANDING_PREFIX = "partners/cobranding";

@Injectable()
export class PartnerLogoUploadHandler implements OnModuleInit {
  private readonly logger = new Logger(PartnerLogoUploadHandler.name);

  constructor(
    @Inject(EVENT_BUS_PORT)
    private readonly eventBus: EventBusPort,
    @Inject(PARTNER_LOGO_STORAGE_PORT)
    private readonly logoStorage: PartnerLogoStoragePort,
  ) {}

  onModuleInit(): void {
    this.eventBus.subscribe(
      PARTNER_EVENTS.LOGO_UPLOAD_REQUESTED,
      this.handle.bind(this),
    );
  }

  async handle(envelope: DomainEventEnvelope<PartnerLogoUploadRequestedPayload>): Promise<void> {
    const { name, payload, correlation_id } = envelope;
    const pl = payload as PartnerLogoUploadRequestedPayload;

    this.logger.log(
      `Processing ${name} correlation_id=${correlation_id} business_id=${pl.business_id}`,
    );

    try {
      const logoKey = `${LOGO_PREFIX}/${pl.business_id}/${pl.logo_filename || "logo"}`;
      const coBrandingKey = `${COBRANDING_PREFIX}/${pl.business_id}/${pl.co_branding_logo_filename || "cobranding"}`;

      const [logoResult, coBrandingResult] = await withRetry(() =>
        Promise.all([
          this.logoStorage.upload({
            key: logoKey,
            body: pl.logo_buffer,
            content_type: pl.logo_content_type,
          }),
          this.logoStorage.upload({
            key: coBrandingKey,
            body: pl.co_branding_logo_buffer,
            content_type: pl.co_branding_logo_content_type,
          }),
        ]),
        { max_attempts: 3, initial_delay_ms: 500 },
      );

      const completed: DomainEventEnvelope<PartnerLogoUploadCompletedPayload> = {
        name: PARTNER_EVENTS.LOGO_UPLOAD_COMPLETED,
        payload: {
          correlation_id: pl.correlation_id,
          business_id: pl.business_id,
          logo_url: logoResult.location,
          co_branding_logo_url: coBrandingResult.location,
        },
        occurred_at: new Date().toISOString(),
        correlation_id: pl.correlation_id,
      };

      this.eventBus.publish(completed);
    } catch (err) {
      this.logger.warn(
        `Logo upload failed correlation_id=${correlation_id}: ${err instanceof Error ? err.message : String(err)}`,
      );
      this.eventBus.publish({
        name: PARTNER_EVENTS.LOGO_UPLOAD_FAILED,
        payload: { correlation_id: pl.correlation_id, business_id: pl.business_id, error: String(err) },
        occurred_at: new Date().toISOString(),
        correlation_id: pl.correlation_id,
      });
      throw err;
    }
  }
}
