import { UpdatePartnerByExternalIdRequest } from '@modules/partners/application/use-cases/update-partner-by-external-id/update-partner-by-external-id.request';
import type { UpdatePartnerPayloadDto } from '../dto/update-partner-payload.dto';
export interface UpdatePartnerUrlMerge {
    readonly logo_url: string | null | undefined;
    readonly co_branding_logo_url: string | null | undefined;
}
export declare function map_update_partner_payload_to_request(external_id: string, dto: UpdatePartnerPayloadDto, urls: UpdatePartnerUrlMerge): UpdatePartnerByExternalIdRequest;
