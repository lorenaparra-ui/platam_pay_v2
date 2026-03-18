import { Inject, Injectable } from "@nestjs/common";
import type { CreditApplicationRepositoryPort } from "../../domain/ports/credit-application.repository.port";
import { CREDIT_APPLICATION_REPOSITORY } from "../../domain/ports/credit-application.repository.port";

@Injectable()
export class DeleteCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly repository: CreditApplicationRepositoryPort,
  ) {}

  async run(externalId: string): Promise<boolean> {
    return this.repository.deleteByExternalId(externalId);
  }
}
