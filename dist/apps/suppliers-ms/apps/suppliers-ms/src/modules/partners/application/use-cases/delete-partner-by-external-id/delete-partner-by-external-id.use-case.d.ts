import { PartnerRepository } from '@modules/partners/domain/repositories/partner.repository';
import { DeletePartnerByExternalIdRequest } from './delete-partner-by-external-id.request';
export declare class DeletePartnerByExternalIdUseCase {
    private readonly partner_repository;
    constructor(partner_repository: PartnerRepository);
    execute(req: DeletePartnerByExternalIdRequest): Promise<void>;
}
