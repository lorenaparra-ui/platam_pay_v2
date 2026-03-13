import { Inject, Injectable } from "@nestjs/common";
import {
  BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY,
  type BackofficeCreditApplicationsReadRepositoryPort,
  type GetBackofficeStatusCountsQuery,
} from "../../domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeCreditApplicationStatusCount } from "../../domain/models/backoffice-credit-application-status-count.model";

@Injectable()
export class GetStatusCountsUseCase {
  constructor(
    @Inject(BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY)
    private readonly repository: BackofficeCreditApplicationsReadRepositoryPort,
  ) {}

  async run(
    query: GetBackofficeStatusCountsQuery,
  ): Promise<BackofficeCreditApplicationStatusCount[]> {
    return this.repository.getStatusCounts(query);
  }
}
