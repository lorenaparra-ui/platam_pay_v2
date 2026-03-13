import { Inject, Injectable } from "@nestjs/common";
import {
  BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY,
  type BackofficeCreditApplicationsReadRepositoryPort,
  type ListBackofficeActivePartnersQuery,
} from "../../domain/ports/backoffice-credit-applications-read.repository.port";
import type { BackofficeActivePartner } from "../../domain/models/backoffice-active-partner.model";

@Injectable()
export class ListActivePartnersUseCase {
  constructor(
    @Inject(BACKOFFICE_CREDIT_APPLICATIONS_READ_REPOSITORY)
    private readonly repository: BackofficeCreditApplicationsReadRepositoryPort,
  ) {}

  async run(
    query: ListBackofficeActivePartnersQuery,
  ): Promise<BackofficeActivePartner[]> {
    return this.repository.listActivePartners(query);
  }
}
