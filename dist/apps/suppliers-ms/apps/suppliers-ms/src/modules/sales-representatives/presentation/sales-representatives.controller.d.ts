import { CreateSalesRepresentativeUseCase } from '@modules/sales-representatives/application/use-cases/create-sales-representative/create-sales-representative.use-case';
import { GetSalesRepresentativeByExternalIdUseCase } from '@modules/sales-representatives/application/use-cases/get-sales-representative-by-external-id/get-sales-representative-by-external-id.use-case';
import { ListSalesRepresentativesUseCase } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case';
import { UpdateSalesRepresentativeByExternalIdUseCase } from '@modules/sales-representatives/application/use-cases/update-sales-representative-by-external-id/update-sales-representative-by-external-id.use-case';
import { DeleteSalesRepresentativeByExternalIdUseCase } from '@modules/sales-representatives/application/use-cases/delete-sales-representative-by-external-id/delete-sales-representative-by-external-id.use-case';
import { CreateSalesRepresentativeBodyDto } from './dto/create-sales-representative-body.dto';
import { PatchSalesRepresentativeBodyDto } from './dto/patch-sales-representative-body.dto';
import { ListSalesRepresentativesQueryDto } from './dto/list-sales-representatives-query.dto';
import { SalesRepresentativeResponseDto } from './dto/sales-representative-response.dto';
export declare class SalesRepresentativesController {
    private readonly create_sales_representative;
    private readonly get_by_external_id;
    private readonly list_sales_representatives;
    private readonly update_by_external_id;
    private readonly delete_by_external_id;
    constructor(create_sales_representative: CreateSalesRepresentativeUseCase, get_by_external_id: GetSalesRepresentativeByExternalIdUseCase, list_sales_representatives: ListSalesRepresentativesUseCase, update_by_external_id: UpdateSalesRepresentativeByExternalIdUseCase, delete_by_external_id: DeleteSalesRepresentativeByExternalIdUseCase);
    list(query: ListSalesRepresentativesQueryDto): Promise<SalesRepresentativeResponseDto[]>;
    create(body: CreateSalesRepresentativeBodyDto): Promise<SalesRepresentativeResponseDto>;
    get_one(external_id: string): Promise<SalesRepresentativeResponseDto>;
    patch(external_id: string, body: PatchSalesRepresentativeBodyDto): Promise<SalesRepresentativeResponseDto>;
    remove(external_id: string): Promise<void>;
}
