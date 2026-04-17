import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { GetSalesRepresentativeByExternalIdRequest } from './get-sales-representative-by-external-id.request';
import { GetSalesRepresentativeByExternalIdResponse } from './get-sales-representative-by-external-id.response';
export declare class GetSalesRepresentativeByExternalIdUseCase {
    private readonly sales_representative_repository;
    private readonly lookup;
    constructor(sales_representative_repository: SalesRepresentativeRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: GetSalesRepresentativeByExternalIdRequest): Promise<GetSalesRepresentativeByExternalIdResponse>;
}
