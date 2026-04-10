import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { GetBusinessByExternalIdRequest } from './get-business-by-external-id.request';
import { GetBusinessByExternalIdResponse } from './get-business-by-external-id.response';
export declare class GetBusinessByExternalIdUseCase {
    private readonly business_repository;
    private readonly lookup;
    constructor(business_repository: BusinessRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: GetBusinessByExternalIdRequest): Promise<GetBusinessByExternalIdResponse>;
}
