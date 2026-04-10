import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { GetPartnerByExternalIdRequest } from './get-partner-by-external-id.request';
import { GetPartnerByExternalIdResponse } from './get-partner-by-external-id.response';
export declare class GetPartnerByExternalIdUseCase {
    private readonly partner_repository;
    private readonly lookup;
    constructor(partner_repository: PartnerRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: GetPartnerByExternalIdRequest): Promise<GetPartnerByExternalIdResponse>;
}
