import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { build_partner_public_fields } from '@modules/partners/application/mapping/partner-public-fields.builder';
import { CreatePartnerRequest } from './create-partner.request';
import { CreatePartnerResponse } from './create-partner.response';

@Injectable()
export class CreatePartnerUseCase {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private readonly partner_repository: PartnerRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(req: CreatePartnerRequest): Promise<CreatePartnerResponse> {
    const business_id =
      await this.lookup.get_business_internal_id_by_external_id(
        req.business_external_id,
      );
    if (business_id === null) {
      throw new NotFoundException('business not found');
    }

    const created = await this.partner_repository.create({
      business_id,
      acronym: req.acronym,
      logo_url: req.logo_url,
      co_branding_logo_url: req.co_branding_logo_url,
      primary_color: req.primary_color,
      secondary_color: req.secondary_color,
      light_color: req.light_color,
      sales_rep_role_name: req.sales_rep_role_name,
      sales_rep_role_name_plural: req.sales_rep_role_name_plural,
      notification_email: req.notification_email,
      webhook_url: req.webhook_url,
      send_sales_rep_voucher: req.send_sales_rep_voucher,
      disbursement_notification_email: req.disbursement_notification_email,
    });

    const fields = await build_partner_public_fields(created, this.lookup);
    return new CreatePartnerResponse(fields);
  }
}
