import { SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { BusinessRepository } from '@modules/businesses/domain/repositories/business.repository';
import { ListBusinessesItemResponse } from './list-businesses.response';
export declare class ListBusinessesUseCase {
    private readonly business_repository;
    private readonly lookup;
    constructor(business_repository: BusinessRepository, lookup: SuppliersReferenceLookupPort);
    execute(): Promise<ListBusinessesItemResponse[]>;
}
