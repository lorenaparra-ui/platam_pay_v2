import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { UpdatePartnerByExternalIdRequest } from './update-partner-by-external-id.request';
import { UpdatePartnerByExternalIdResponse } from './update-partner-by-external-id.response';
export declare class UpdatePartnerByExternalIdUseCase {
    private readonly partner_repository;
    private readonly lookup;
    constructor(partner_repository: PartnerRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: UpdatePartnerByExternalIdRequest): Promise<UpdatePartnerByExternalIdResponse>;
}
