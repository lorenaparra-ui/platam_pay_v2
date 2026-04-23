import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  SUPPLIERS_REFERENCE_LOOKUP,
  type SuppliersReferenceLookupPort,
} from '@common/ports/suppliers-reference-lookup.port';
import { PARTNER_REPOSITORY } from '@modules/partners/partners.tokens';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { UpdatePartnerProps } from '@modules/partners/domain/entities/partner.entity';
import { build_partner_public_fields } from '@modules/partners/application/mapping/partner-public-fields.builder';
import { UpdatePartnerByExternalIdRequest } from './update-partner-by-external-id.request';
import { UpdatePartnerByExternalIdResponse } from './update-partner-by-external-id.response';

@Injectable()
export class UpdatePartnerByExternalIdUseCase {
  constructor(
    @Inject(PARTNER_REPOSITORY)
    private readonly partner_repository: PartnerRepository,
    @Inject(SUPPLIERS_REFERENCE_LOOKUP)
    private readonly lookup: SuppliersReferenceLookupPort,
  ) {}

  async execute(
    req: UpdatePartnerByExternalIdRequest,
  ): Promise<UpdatePartnerByExternalIdResponse> {
    const patch: UpdatePartnerProps = {};

    if (req.acronym !== undefined) {
      patch.acronym = req.acronym;
    }
    if (req.logo_url !== undefined) {
      patch.logo_url = req.logo_url;
    }
    if (req.co_branding_logo_url !== undefined) {
      patch.co_branding_logo_url = req.co_branding_logo_url;
    }
    if (req.primary_color !== undefined) {
      patch.primary_color = req.primary_color;
    }
    if (req.secondary_color !== undefined) {
      patch.secondary_color = req.secondary_color;
    }
    if (req.light_color !== undefined) {
      patch.light_color = req.light_color;
    }
    if (req.notification_email !== undefined) {
      patch.notification_email = req.notification_email;
    }
    if (req.webhook_url !== undefined) {
      patch.webhook_url = req.webhook_url;
    }
    if (req.send_sales_rep_voucher !== undefined) {
      patch.send_sales_rep_voucher = req.send_sales_rep_voucher;
    }
    if (req.disbursement_notification_email !== undefined) {
      patch.disbursement_notification_email =
        req.disbursement_notification_email;
    }
    if (req.state !== undefined) {
      patch.state = req.state;
    }

    const updated = await this.partner_repository.update_by_external_id(
      req.external_id,
      patch,
    );
    if (updated === null) {
      throw new NotFoundException('partner not found');
    }

    const fields = await build_partner_public_fields(updated, this.lookup);
    return new UpdatePartnerByExternalIdResponse(fields);
  }
}
