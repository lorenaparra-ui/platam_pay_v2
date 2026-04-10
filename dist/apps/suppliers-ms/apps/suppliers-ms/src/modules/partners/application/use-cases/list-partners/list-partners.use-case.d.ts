import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { ListPartnersItemResponse } from './list-partners.response';
export declare class ListPartnersUseCase {
    private readonly partner_repository;
    private readonly lookup;
    constructor(partner_repository: PartnerRepository, lookup: SuppliersReferenceLookupPort);
    execute(): Promise<ListPartnersItemResponse[]>;
}
