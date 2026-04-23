import { Inject, Injectable, Optional } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { build_partner_public_fields } from '@modules/partners/application/mapping/partner-public-fields.builder';
import { PartnerCreatedEvent } from '@modules/partners/domain/events/partner-created.event';
import { DOMAIN_EVENT_BUS, type DomainEventBus } from '@platam/shared';
import { CreatePartnerRequest } from './create-partner.request';
import { CreatePartnerResponse } from './create-partner.response';

@Injectable()
export class CreatePartnerUseCase {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private readonly partner_repository: PartnerRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
    @Optional()
    @Inject(DOMAIN_EVENT_BUS)
    private readonly event_bus?: DomainEventBus,
  ) {}

  async execute(req: CreatePartnerRequest): Promise<CreatePartnerResponse> {
    const created = await this.partner_repository.create({
      supplier_id: req.supplier_internal_id,
      acronym: req.acronym,
      logo_url: req.logo_url,
      co_branding_logo_url: req.co_branding_logo_url,
      primary_color: req.primary_color,
      secondary_color: req.secondary_color,
      light_color: req.light_color,
      notification_email: req.notification_email,
      webhook_url: req.webhook_url,
      send_sales_rep_voucher: req.send_sales_rep_voucher,
      disbursement_notification_email: req.disbursement_notification_email,
    });

    await this.event_bus?.publish(
      new PartnerCreatedEvent(created.external_id, created.supplier_id),
    );

    const fields = await build_partner_public_fields(created, this.lookup);
    return new CreatePartnerResponse(fields);
  }
}
