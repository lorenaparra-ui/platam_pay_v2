import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { DeleteCreditApplicationByExternalIdRequest } from './delete-credit-application-by-external-id.request';

@Injectable()
export class DeleteCreditApplicationByExternalIdUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(req: DeleteCreditApplicationByExternalIdRequest): Promise<void> {
    const ok = await this.credit_application_repository.delete_by_external_id(
      req.externalId,
    );
    if (!ok) {
      throw new NotFoundException('credit application not found');
    }
  }
}
