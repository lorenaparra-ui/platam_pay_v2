import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreditApplicationStatus } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { RejectCreditApplicationRequest } from './reject-credit-application.request';
import { RejectCreditApplicationResponse } from './reject-credit-application.response';

@Injectable()
export class RejectCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(req: RejectCreditApplicationRequest): Promise<RejectCreditApplicationResponse> {
    const updated = await this.credit_application_repository.update_by_external_id(
      req.externalId,
      {
        status: CreditApplicationStatus.REJECTED,
        rejection_reason: req.rejectionReason,
      },
    );
    if (updated === null) {
      throw new NotFoundException('credit application not found');
    }
    return new RejectCreditApplicationResponse(build_credit_application_public_fields(updated));
  }
}
