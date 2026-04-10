import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { UpdateBusinessByExternalIdRequest } from './update-business-by-external-id.request';
import { UpdateBusinessByExternalIdResponse } from './update-business-by-external-id.response';
export declare class UpdateBusinessByExternalIdUseCase {
    private readonly business_repository;
    private readonly lookup;
    constructor(business_repository: BusinessRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: UpdateBusinessByExternalIdRequest): Promise<UpdateBusinessByExternalIdResponse>;
}
