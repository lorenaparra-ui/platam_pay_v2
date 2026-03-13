import {
  Controller,
  Get,
  Query,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { ListCreditApplicationsUseCase } from "../application/use-cases/list-credit-applications.use-case";
import { GetStatusCountsUseCase } from "../application/use-cases/get-status-counts.use-case";
import { ListActivePartnersUseCase } from "../application/use-cases/list-active-partners.use-case";
import { ListCreditApplicationsQueryDto } from "../application/dto/list-credit-applications-query.dto";
import {
  CreditApplicationsPaginationDto,
  ListCreditApplicationsResponseDto,
} from "../application/dto/list-credit-applications.response.dto";
import { CreditApplicationListItemResponseDto } from "../application/dto/credit-application-list-item.response.dto";
import {
  CreditApplicationStatusCountItemDto,
  CreditApplicationStatusCountsResponseDto,
} from "../application/dto/status-counts.response.dto";
import { StatusCountsQueryDto } from "../application/dto/status-counts-query.dto";
import {
  ActivePartnerResponseDto,
  ActivePartnersListResponseDto,
} from "../application/dto/active-partner.response.dto";
import { ListActivePartnersQueryDto } from "../application/dto/list-active-partners-query.dto";
import {
  CREDIT_APPLICATION_STATUS_CODES,
  type CreditApplicationStatusCode,
} from "../domain/models/credit-application-status-code.model";
import { BackofficeAuthGuard } from "./guards/backoffice-auth.guard";

@ApiTags("backoffice-credit-applications")
@ApiBearerAuth()
@ApiHeader({
  name: "x-user-external-id",
  required: true,
  description: "UUID del usuario autenticado en backoffice",
})
@UseGuards(BackofficeAuthGuard)
@Controller("backoffice")
export class BackofficeCreditApplicationsController {
  constructor(
    private readonly listCreditApplicationsUseCase: ListCreditApplicationsUseCase,
    private readonly getStatusCountsUseCase: GetStatusCountsUseCase,
    private readonly listActivePartnersUseCase: ListActivePartnersUseCase,
    private readonly configService: ConfigService,
  ) {}

  @Get("credit-applications")
  @ApiOperation({
    summary:
      "Listado de solicitudes para HU-B06 con filtros, orden y paginacion keyset",
  })
  @ApiResponse({ status: 200, type: ListCreditApplicationsResponseDto })
  @ApiResponse({ status: 400, description: "Parametros de consulta invalidos" })
  @ApiResponse({ status: 401, description: "No autenticado" })
  @ApiResponse({ status: 403, description: "Rol no autorizado" })
  async listCreditApplications(
    @Query() query: ListCreditApplicationsQueryDto,
  ): Promise<ListCreditApplicationsResponseDto> {
    const warningQueueDays = this.configService.get<number>(
      "config.backoffice.queueWarningDays",
    );
    const criticalQueueDays = this.configService.get<number>(
      "config.backoffice.queueCriticalDays",
    );

    if (warningQueueDays == null || criticalQueueDays == null) {
      throw new UnauthorizedException(
        "Configuracion backoffice incompleta para umbrales de cola",
      );
    }

    const statusCodes =
      query.status_codes && query.status_codes.length > 0
        ? query.status_codes
        : ([] as CreditApplicationStatusCode[]);

    const page = await this.listCreditApplicationsUseCase.run({
      limit: query.limit ?? 20,
      cursor: query.cursor ?? null,
      statusCodes,
      partnerExternalId: query.partner_external_id ?? null,
      search: query.search ?? null,
      sortBy: query.sort_by ?? "most_recent",
      warningQueueDays,
      criticalQueueDays,
    });

    const pagination = new CreditApplicationsPaginationDto();
    pagination.has_more = page.hasMore;
    pagination.next_cursor = page.nextCursor;
    pagination.page_size = page.pageSize;

    const response = new ListCreditApplicationsResponseDto();
    response.items = page.items.map((item) => {
      const dto = new CreditApplicationListItemResponseDto();
      dto.application_id = item.applicationId;
      dto.application_external_id = item.applicationExternalId;
      dto.partner_external_id = item.partnerExternalId;
      dto.partner_logo_url = item.partnerLogoUrl;
      dto.customer_full_name = item.customerFullName;
      dto.customer_type = item.customerType;
      dto.doc_type = item.docType;
      dto.doc_number = item.docNumber;
      dto.phone = item.phone;
      dto.email = item.email;
      dto.sales_rep_name = item.salesRepName;
      dto.requested_credit_line = item.requestedCreditLine;
      dto.submission_date = item.submissionDate?.toISOString() ?? null;
      dto.queue_days = item.queueDays;
      dto.queue_level = item.queueLevel;
      dto.status_code = item.statusCode;
      dto.status_display_name = item.statusDisplayName;
      return dto;
    });
    response.pagination = pagination;
    return response;
  }

  @Get("credit-applications/status-counts")
  @ApiOperation({
    summary: "Conteos por estado para pills del header sticky",
  })
  @ApiResponse({ status: 200, type: CreditApplicationStatusCountsResponseDto })
  @ApiResponse({ status: 400, description: "Parametros de consulta invalidos" })
  @ApiResponse({ status: 401, description: "No autenticado" })
  @ApiResponse({ status: 403, description: "Rol no autorizado" })
  async getStatusCounts(
    @Query() query: StatusCountsQueryDto,
  ): Promise<CreditApplicationStatusCountsResponseDto> {
    const counts = await this.getStatusCountsUseCase.run({
      partnerExternalId: query.partner_external_id ?? null,
      search: query.search ?? null,
    });

    const countByCode = new Map(
      counts.map((item) => [item.statusCode, item.total]),
    );
    const orderedCounts = CREDIT_APPLICATION_STATUS_CODES.map((statusCode) => {
      const dto = new CreditApplicationStatusCountItemDto();
      dto.status_code = statusCode;
      dto.total = countByCode.get(statusCode) ?? 0;
      return dto;
    });

    const response = new CreditApplicationStatusCountsResponseDto();
    response.counts = orderedCounts;
    response.total = orderedCounts.reduce((acc, item) => acc + item.total, 0);
    return response;
  }

  @Get("partners/active")
  @ApiOperation({
    summary: "Lista de partners activos para filtro del backoffice",
  })
  @ApiResponse({ status: 200, type: ActivePartnersListResponseDto })
  @ApiResponse({ status: 400, description: "Parametros de consulta invalidos" })
  @ApiResponse({ status: 401, description: "No autenticado" })
  @ApiResponse({ status: 403, description: "Rol no autorizado" })
  async listActivePartners(
    @Query() query: ListActivePartnersQueryDto,
  ): Promise<ActivePartnersListResponseDto> {
    const partners = await this.listActivePartnersUseCase.run({
      search: query.search ?? null,
    });

    const response = new ActivePartnersListResponseDto();
    response.items = partners.map((partner) => {
      const dto = new ActivePartnerResponseDto();
      dto.partner_external_id = partner.partnerExternalId;
      dto.partner_name = partner.partnerName;
      dto.logo_url = partner.logoUrl;
      return dto;
    });
    return response;
  }
}
