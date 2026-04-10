import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { CreateBusinessRequest } from './create-business.request';
import { CreateBusinessResponse } from './create-business.response';
export declare class CreateBusinessUseCase {
    private readonly business_repository;
    private readonly lookup;
    constructor(business_repository: BusinessRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: CreateBusinessRequest): Promise<CreateBusinessResponse>;
}
