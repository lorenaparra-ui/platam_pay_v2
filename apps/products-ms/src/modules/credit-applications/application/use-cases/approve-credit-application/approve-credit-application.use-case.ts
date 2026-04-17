import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreditApplicationStatus } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { ApproveCreditApplicationRequest } from './approve-credit-application.request';
import { ApproveCreditApplicationResponse } from './approve-credit-application.response';

@Injectable()
export class ApproveCreditApplicationUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(req: ApproveCreditApplicationRequest): Promise<ApproveCreditApplicationResponse> {
    const updated = await this.credit_application_repository.update_by_external_id(
      req.externalId,
      {
        status: CreditApplicationStatus.AUTHORIZED,
        approved_credit_line: req.approvedCreditLine,
        approval_date: new Date(),
        analyst_report: req.analystReport,
      },
    );
    if (updated === null) {
      throw new NotFoundException('credit application not found');
    }
    return new ApproveCreditApplicationResponse(build_credit_application_public_fields(updated));
  }
}
