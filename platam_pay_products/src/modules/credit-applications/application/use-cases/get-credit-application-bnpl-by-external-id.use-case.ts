import { Inject, Injectable } from '@nestjs/common';
import type { CreditApplicationBnplRepositoryPort } from '../../domain/ports/credit-application-bnpl.repository.port';
import { CREDIT_APPLICATION_BNPL_REPOSITORY } from '../../domain/ports/credit-application-bnpl.repository.port';
import type { CreditApplicationBnpl } from '../../domain/models/credit-application-bnpl.model';

@Injectable()
export class GetCreditApplicationBnplByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_BNPL_REPOSITORY)
    private readonly repository: CreditApplicationBnplRepositoryPort,
  ) {}

  async run(externalId: string): Promise<CreditApplicationBnpl | null> {
    return this.repository.findByExternalId(externalId);
  }
}
