import { Inject, Injectable } from "@nestjs/common";
import { CREDIT_APPLICATION_BNPL_REPOSITORY } from "../../domain/ports/credit-application-bnpl.repository.port";
import type { CreditApplicationBnplRepositoryPort } from "../../domain/ports/credit-application-bnpl.repository.port";
import { CreditApplicationBnplResponseDto } from "../dto/credit-application-bnpl-response.dto";

@Injectable()
export class GetCreditApplicationBnplByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_BNPL_REPOSITORY)
    private readonly repository: CreditApplicationBnplRepositoryPort,
  ) {}

  async execute(externalId: string): Promise<CreditApplicationBnplResponseDto | null> {
    const entity = await this.repository.findByExternalId(externalId);
    return entity ? CreditApplicationBnplResponseDto.fromDomain(entity) : null;
  }
}
