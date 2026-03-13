import { Inject, Injectable } from "@nestjs/common";
import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CREDIT_APPLICATION_BNPL_REPOSITORY } from "../../domain/ports/credit-application-bnpl.repository.port";

@Injectable()
export class DeleteCreditApplicationBnplUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_BNPL_REPOSITORY)
    private readonly repository: CreditApplicationBnplRepositoryPort,
  ) {}

  async run(externalId: string): Promise<boolean> {
    return this.repository.deleteByExternalId(externalId);
  }
}
