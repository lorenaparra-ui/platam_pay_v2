import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import type { SalesRepresentativePublicFields } from '@modules/sales-representatives/application/mapping/sales-representative-public-fields.builder';
import { ListSalesRepresentativesRequest } from './list-sales-representatives.request';
export declare class ListSalesRepresentativesUseCase {
    private readonly sales_representative_repository;
    private readonly lookup;
    constructor(sales_representative_repository: SalesRepresentativeRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: ListSalesRepresentativesRequest): Promise<SalesRepresentativePublicFields[]>;
}
