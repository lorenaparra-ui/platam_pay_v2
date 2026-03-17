import { DataSource } from "typeorm";
import type { BackofficeCreditApplicationsReadRepositoryPort, GetBackofficeStatusCountsQuery, ListBackofficeActivePartnersQuery, ListBackofficeCreditApplicationsQuery } from "../../../modules/backoffice-credit-applications/domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeCreditApplicationStatusCount } from "../../../modules/backoffice-credit-applications/domain/models/backoffice-credit-application-status-count.model";
import type { BackofficeActivePartner } from "../../../modules/backoffice-credit-applications/domain/models/backoffice-active-partner.model";
import type { BackofficeCreditApplicationsPage } from "../../../modules/backoffice-credit-applications/domain/models/backoffice-credit-applications-page.model";
export declare class TypeOrmBackofficeCreditApplicationsReadRepository implements BackofficeCreditApplicationsReadRepositoryPort {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    listCreditApplications(query: ListBackofficeCreditApplicationsQuery): Promise<BackofficeCreditApplicationsPage>;
    getStatusCounts(query: GetBackofficeStatusCountsQuery): Promise<BackofficeCreditApplicationStatusCount[]>;
    listActivePartners(query: ListBackofficeActivePartnersQuery): Promise<BackofficeActivePartner[]>;
    private appendSharedFilters;
    private buildCursorCondition;
    private toListItem;
}
