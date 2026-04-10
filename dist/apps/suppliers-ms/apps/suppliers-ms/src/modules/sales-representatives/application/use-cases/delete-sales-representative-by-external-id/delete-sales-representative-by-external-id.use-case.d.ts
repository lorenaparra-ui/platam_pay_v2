import { SalesRepresentativeRepository } from '@modules/sales-representatives/domain/repositories/sales-representative.repository';
import { DeleteSalesRepresentativeByExternalIdRequest } from './delete-sales-representative-by-external-id.request';
export declare class DeleteSalesRepresentativeByExternalIdUseCase {
    private readonly sales_representative_repository;
    constructor(sales_representative_repository: SalesRepresentativeRepository);
    execute(req: DeleteSalesRepresentativeByExternalIdRequest): Promise<void>;
}
