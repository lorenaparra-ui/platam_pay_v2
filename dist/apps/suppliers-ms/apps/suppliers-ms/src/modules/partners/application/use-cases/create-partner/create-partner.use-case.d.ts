import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { type DomainEventBus } from '@platam/shared';
import { CreatePartnerRequest } from './create-partner.request';
import { CreatePartnerResponse } from './create-partner.response';
export declare class CreatePartnerUseCase {
    private readonly partner_repository;
    private readonly lookup;
    private readonly event_bus?;
    constructor(partner_repository: PartnerRepository, lookup: SuppliersReferenceLookupPort, event_bus?: DomainEventBus | undefined);
    execute(req: CreatePartnerRequest): Promise<CreatePartnerResponse>;
}
