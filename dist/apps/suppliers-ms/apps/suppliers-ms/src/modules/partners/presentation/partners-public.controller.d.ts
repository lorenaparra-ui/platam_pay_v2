import { GetPartnerByExternalIdUseCase } from '@modules/partners/application/use-cases/get-partner-by-external-id/get-partner-by-external-id.use-case';
import { ListSalesRepresentativesUseCase } from '@modules/sales-representatives/application/use-cases/list-sales-representatives/list-sales-representatives.use-case';
import { PartnerPublicCamelResponseDto } from './dto/partner-public-camel-response.dto';
import { SalesRepresentativeResponseDto } from '@modules/sales-representatives/presentation/dto/sales-representative-response.dto';
export declare class PartnersPublicController {
    private readonly get_partner;
    private readonly list_sales_representatives;
    constructor(get_partner: GetPartnerByExternalIdUseCase, list_sales_representatives: ListSalesRepresentativesUseCase);
    list_sales_representatives_by_partner(partner_external_id: string): Promise<SalesRepresentativeResponseDto[]>;
    get_by_external_id(id: string): Promise<PartnerPublicCamelResponseDto>;
    private assert_active_partner;
}
