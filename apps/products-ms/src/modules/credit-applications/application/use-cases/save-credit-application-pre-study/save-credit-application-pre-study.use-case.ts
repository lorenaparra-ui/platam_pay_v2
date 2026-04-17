import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreditApplicationStatus } from '@platam/shared';
import { CREDIT_APPLICATION_REPOSITORY } from '@modules/credit-applications/credit-applications.tokens';
import { CreditApplicationRepository } from '@modules/credit-applications/domain/ports/credit-application.ports';
import { build_credit_application_public_fields } from '@modules/credit-applications/application/mapping/credit-application-public-fields.builder';
import { SaveCreditApplicationPreStudyRequest } from './save-credit-application-pre-study.request';
import { SaveCreditApplicationPreStudyResponse } from './save-credit-application-pre-study.response';

@Injectable()
export class SaveCreditApplicationPreStudyUseCase {
  constructor(
    @Inject(CREDIT_APPLICATION_REPOSITORY)
    private readonly credit_application_repository: CreditApplicationRepository,
  ) {}

  async execute(
    req: SaveCreditApplicationPreStudyRequest,
  ): Promise<SaveCreditApplicationPreStudyResponse> {
    const updated = await this.credit_application_repository.update_by_external_id(
      req.externalId,
      {
        status: CreditApplicationStatus.UNDER_REVIEW,
        credit_score: req.creditScore,
        credit_decision: req.creditDecision,
        risk_profile: req.riskProfile,
        analyst_report: req.analystReport,
        credit_study_date: req.creditStudyDate ?? new Date(),
      },
    );
    if (updated === null) {
      throw new NotFoundException('credit application not found');
    }
    return new SaveCreditApplicationPreStudyResponse(
      build_credit_application_public_fields(updated),
    );
  }
}
