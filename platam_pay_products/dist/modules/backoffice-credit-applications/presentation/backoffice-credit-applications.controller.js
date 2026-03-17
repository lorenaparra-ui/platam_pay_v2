"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackofficeCreditApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const list_credit_applications_use_case_1 = require("../application/use-cases/list-credit-applications.use-case");
const get_status_counts_use_case_1 = require("../application/use-cases/get-status-counts.use-case");
const list_active_partners_use_case_1 = require("../application/use-cases/list-active-partners.use-case");
const list_credit_applications_query_dto_1 = require("../application/dto/list-credit-applications-query.dto");
const list_credit_applications_response_dto_1 = require("../application/dto/list-credit-applications.response.dto");
const credit_application_list_item_response_dto_1 = require("../application/dto/credit-application-list-item.response.dto");
const status_counts_response_dto_1 = require("../application/dto/status-counts.response.dto");
const status_counts_query_dto_1 = require("../application/dto/status-counts-query.dto");
const active_partner_response_dto_1 = require("../application/dto/active-partner.response.dto");
const list_active_partners_query_dto_1 = require("../application/dto/list-active-partners-query.dto");
const credit_application_status_code_model_1 = require("../domain/models/credit-application-status-code.model");
const backoffice_auth_guard_1 = require("./guards/backoffice-auth.guard");
let BackofficeCreditApplicationsController = class BackofficeCreditApplicationsController {
    listCreditApplicationsUseCase;
    getStatusCountsUseCase;
    listActivePartnersUseCase;
    configService;
    constructor(listCreditApplicationsUseCase, getStatusCountsUseCase, listActivePartnersUseCase, configService) {
        this.listCreditApplicationsUseCase = listCreditApplicationsUseCase;
        this.getStatusCountsUseCase = getStatusCountsUseCase;
        this.listActivePartnersUseCase = listActivePartnersUseCase;
        this.configService = configService;
    }
    async listCreditApplications(query) {
        const warningQueueDays = this.configService.get("config.backoffice.queueWarningDays");
        const criticalQueueDays = this.configService.get("config.backoffice.queueCriticalDays");
        if (warningQueueDays == null || criticalQueueDays == null) {
            throw new common_1.UnauthorizedException("Configuracion backoffice incompleta para umbrales de cola");
        }
        const statusCodes = query.status_codes && query.status_codes.length > 0
            ? query.status_codes
            : [];
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
        const pagination = new list_credit_applications_response_dto_1.CreditApplicationsPaginationDto();
        pagination.has_more = page.hasMore;
        pagination.next_cursor = page.nextCursor;
        pagination.page_size = page.pageSize;
        const response = new list_credit_applications_response_dto_1.ListCreditApplicationsResponseDto();
        response.items = page.items.map((item) => {
            const dto = new credit_application_list_item_response_dto_1.CreditApplicationListItemResponseDto();
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
    async getStatusCounts(query) {
        const counts = await this.getStatusCountsUseCase.run({
            partnerExternalId: query.partner_external_id ?? null,
            search: query.search ?? null,
        });
        const countByCode = new Map(counts.map((item) => [item.statusCode, item.total]));
        const orderedCounts = credit_application_status_code_model_1.CREDIT_APPLICATION_STATUS_CODES.map((statusCode) => {
            const dto = new status_counts_response_dto_1.CreditApplicationStatusCountItemDto();
            dto.status_code = statusCode;
            dto.total = countByCode.get(statusCode) ?? 0;
            return dto;
        });
        const response = new status_counts_response_dto_1.CreditApplicationStatusCountsResponseDto();
        response.counts = orderedCounts;
        response.total = orderedCounts.reduce((acc, item) => acc + item.total, 0);
        return response;
    }
    async listActivePartners(query) {
        const partners = await this.listActivePartnersUseCase.run({
            search: query.search ?? null,
        });
        const response = new active_partner_response_dto_1.ActivePartnersListResponseDto();
        response.items = partners.map((partner) => {
            const dto = new active_partner_response_dto_1.ActivePartnerResponseDto();
            dto.partner_external_id = partner.partnerExternalId;
            dto.partner_name = partner.partnerName;
            dto.logo_url = partner.logoUrl;
            return dto;
        });
        return response;
    }
};
exports.BackofficeCreditApplicationsController = BackofficeCreditApplicationsController;
__decorate([
    (0, common_1.Get)("credit-applications"),
    (0, swagger_1.ApiOperation)({
        summary: "Listado de solicitudes para HU-B06 con filtros, orden y paginacion keyset",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: list_credit_applications_response_dto_1.ListCreditApplicationsResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Parametros de consulta invalidos" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "No autenticado" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Rol no autorizado" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_credit_applications_query_dto_1.ListCreditApplicationsQueryDto]),
    __metadata("design:returntype", Promise)
], BackofficeCreditApplicationsController.prototype, "listCreditApplications", null);
__decorate([
    (0, common_1.Get)("credit-applications/status-counts"),
    (0, swagger_1.ApiOperation)({
        summary: "Conteos por estado para pills del header sticky",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: status_counts_response_dto_1.CreditApplicationStatusCountsResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Parametros de consulta invalidos" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "No autenticado" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Rol no autorizado" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [status_counts_query_dto_1.StatusCountsQueryDto]),
    __metadata("design:returntype", Promise)
], BackofficeCreditApplicationsController.prototype, "getStatusCounts", null);
__decorate([
    (0, common_1.Get)("partners/active"),
    (0, swagger_1.ApiOperation)({
        summary: "Lista de partners activos para filtro del backoffice",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, type: active_partner_response_dto_1.ActivePartnersListResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Parametros de consulta invalidos" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "No autenticado" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Rol no autorizado" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_active_partners_query_dto_1.ListActivePartnersQueryDto]),
    __metadata("design:returntype", Promise)
], BackofficeCreditApplicationsController.prototype, "listActivePartners", null);
exports.BackofficeCreditApplicationsController = BackofficeCreditApplicationsController = __decorate([
    (0, swagger_1.ApiTags)("backoffice-credit-applications"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeader)({
        name: "x-user-external-id",
        required: true,
        description: "UUID del usuario autenticado en backoffice",
    }),
    (0, common_1.UseGuards)(backoffice_auth_guard_1.BackofficeAuthGuard),
    (0, common_1.Controller)("backoffice"),
    __metadata("design:paramtypes", [list_credit_applications_use_case_1.ListCreditApplicationsUseCase,
        get_status_counts_use_case_1.GetStatusCountsUseCase,
        list_active_partners_use_case_1.ListActivePartnersUseCase,
        config_1.ConfigService])
], BackofficeCreditApplicationsController);
//# sourceMappingURL=backoffice-credit-applications.controller.js.map