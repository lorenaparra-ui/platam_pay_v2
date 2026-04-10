import { type SuppliersReferenceLookupPort } from '@common/ports/suppliers-reference-lookup.port';
import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { CreateSalesRepresentativeRequest } from './create-sales-representative.request';
import { CreateSalesRepresentativeResponse } from './create-sales-representative.response';
export declare class CreateSalesRepresentativeUseCase {
    private readonly sales_representative_repository;
    private readonly lookup;
    constructor(sales_representative_repository: SalesRepresentativeRepository, lookup: SuppliersReferenceLookupPort);
    execute(req: CreateSalesRepresentativeRequest): Promise<CreateSalesRepresentativeResponse>;
}
