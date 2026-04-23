import { UpdatePartnerByExternalIdRequest } from '@modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request';
import type { UpdatePartnerPayloadDto } from '../dto/update-partner-payload.dto';

export interface UpdatePartnerUrlMerge {
  readonly logo_url: string | null | undefined;
  readonly co_branding_logo_url: string | null | undefined;
}

export function map_update_partner_payload_to_request(
  external_id: string,
  dto: UpdatePartnerPayloadDto,
  urls: UpdatePartnerUrlMerge,
): UpdatePartnerByExternalIdRequest {
  const p = dto.partner;
  return new UpdatePartnerByExternalIdRequest(
    external_id,
    p?.acronym,
    urls.logo_url,
    urls.co_branding_logo_url,
    p?.primaryColor,
    p?.secondaryColor,
    p?.lightColor,
    p?.notificationEmail,
    p?.webhookUrl,
    p?.sendSalesRepVoucher,
    p?.disbursementNotificationEmail,
    p?.state,
  );
}
