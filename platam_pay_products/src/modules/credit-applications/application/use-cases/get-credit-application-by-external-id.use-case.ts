import { Inject, Injectable } from "@nestjs/common";
import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
import { CREDIT_APPLICATION_REPOSITORY } from "../../domain/ports/credit-application.repository.port";
import type { CreditApplication } from "../../domain/models/credit-application.model";

@Injectable()
export class GetCreditApplicationByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly repository: CreditApplicationRepositoryPort,
  ) {}

  async run(externalId: string): Promise<CreditApplication | null> {
    return this.repository.findByExternalId(externalId);
  }
}
