import { Inject, Injectable } from "@nestjs/common";
import {
  BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY,
  type BackofficeCreditApplicationsReadRepositoryPort,
  type ListBackofficeCreditApplicationsQuery,
} from "../../domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeCreditApplicationsPage } from "../../domain/models/backoffice-credit-applications-page.model";

@Injectable()
export class ListCreditApplicationsUseCase {
  constructor(
    @Inject(BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY)
    private readonly repository: BackofficeCreditApplicationsReadRepositoryPort,
  ) {}

  async run(
    query: ListBackofficeCreditApplicationsQuery,
  ): Promise<BackofficeCreditApplicationsPage> {
    return this.repository.listCreditApplications(query);
  }
}
