import { ConfigService } from "@nestjs/config";
import { ListCreditApplicationsUseCase } from "../application/use-cases/list-credit-applications.use-case";
import { GetStatusCountsUseCase } from "../application/use-cases/get-status-counts.use-case";
import { ListActivePartnersUseCase } from "../application/use-cases/list-active-partners.use-case";
import { ListCreditApplicationsQueryDto } from "../application/dto/list-credit-applications-query.dto";
import { ListCreditApplicationsResponseDto } from "../application/dto/list-credit-applications.response.dto";
import { CreditApplicationStatusCountsResponseDto } from "../application/dto/status-counts.response.dto";
import { StatusCountsQueryDto } from "../application/dto/status-counts-query.dto";
import { ActivePartnersListResponseDto } from "../application/dto/active-partner.response.dto";
import { ListActivePartnersQueryDto } from "../application/dto/list-active-partners-query.dto";
export declare class BackofficeCreditApplicationsController {
    private readonly listCreditApplicationsUseCase;
    private readonly getStatusCountsUseCase;
    private readonly listActivePartnersUseCase;
    private readonly configService;
    constructor(listCreditApplicationsUseCase: ListCreditApplicationsUseCase, getStatusCountsUseCase: GetStatusCountsUseCase, listActivePartnersUseCase: ListActivePartnersUseCase, configService: ConfigService);
    listCreditApplications(query: ListCreditApplicationsQueryDto): Promise<ListCreditApplicationsResponseDto>;
    getStatusCounts(query: StatusCountsQueryDto): Promise<CreditApplicationStatusCountsResponseDto>;
    listActivePartners(query: ListActivePartnersQueryDto): Promise<ActivePartnersListResponseDto>;
}
