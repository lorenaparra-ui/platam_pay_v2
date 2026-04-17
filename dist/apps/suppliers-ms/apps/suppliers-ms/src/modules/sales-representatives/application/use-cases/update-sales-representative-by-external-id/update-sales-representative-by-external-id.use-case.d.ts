import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { UpdateSalesRepresentativeUserByExternalIdRequest } from './update-sales-representative-by-external-id.request';
import { UpdateSalesRepresentativeByExternalIdResponse } from './update-sales-representative-by-external-id.response';
export declare class UpdateSalesRepresentativeByExternalIdUseCase {
    private readonly sales_representative_repository;
    private readonly lookup;
    constructor(sales_representative_repository: SalesRepresentativeRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: UpdateSalesRepresentativeUserByExternalIdRequest): Promise<UpdateSalesRepresentativeByExternalIdResponse>;
}
