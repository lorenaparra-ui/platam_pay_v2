import type { BackofficeActivePartner } from "../models/backoffice-active-partner.model";
import type { BackofficeCreditApplicationsPage } from "../models/backoffice-credit-applications-page.model";
import type { BackofficeCreditApplicationStatusCount } from "../models/backoffice-credit-application-status-count.model";
import type { CreditApplicationStatusCode } from "../models/credit-application-status-code.model";

export const BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY =
  "BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY";

export type BackofficeCreditApplicationsSortBy =
  | "most_recent"
  | "oldest"
  | "requested_credit_line_desc"
  | "requested_credit_line_asc"
  | "queue_days_desc";

export interface ListBackofficeCreditApplicationsQuery {
  limit: number;
  cursor: string | null;
  statusCodes: CreditApplicationStatusCode[];
  partnerExternalId: string | null;
  search: string | null;
  sortBy: BackofficeCreditApplicationsSortBy;
  warningQueueDays: number;
  criticalQueueDays: number;
}

export interface GetBackofficeStatusCountsQuery {
  partnerExternalId: string | null;
  search: string | null;
}

export interface ListBackofficeActivePartnersQuery {
  search: string | null;
}

export interface BackofficeCreditApplicationsReadRepositoryPort {
  listCreditApplications(
    query: ListBackofficeCreditApplicationsQuery,
  ): Promise<BackofficeCreditApplicationsPage>;
  getStatusCounts(
    query: GetBackofficeStatusCountsQuery,
  ): Promise<BackofficeCreditApplicationStatusCount[]>;
  listActivePartners(
    query: ListBackofficeActivePartnersQuery,
  ): Promise<BackofficeActivePartner[]>;
}
